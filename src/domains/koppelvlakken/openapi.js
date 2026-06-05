// Turn a handful of resources into a real, ADR-conforme OpenAPI 3.0 document.
// The wizard collects resources ("vergunning", "aanvraag") and this module
// expands each into the standard CRUD collection the REST API Design Rules
// prescribe: a paginated list, a create, a read/update/delete by id, plus a
// shared problem+json error response. Pure and dependency-free: we serialise
// YAML by hand so the output matches the ADR conventions (versie in de server-
// URL, plurale collectie-paden, problem+json) exactly, and so the same module
// can both render the spec and lint it without a YAML parser in the bundle.

// --- naming helpers -------------------------------------------------------

// A resource the user typed is a singular Dutch noun ("vergunning"). ADR wants
// plural, kebab-case collection names ("vergunningen"). Dutch plurals are not a
// simple "+s": they hinge on syllable stress and vowel length. This applies the
// main rules (default -en, the -s class for unstressed light endings, consonant
// doubling after a short stressed vowel, vowel shortening in open syllables)
// plus a small list of irregulars. Good enough for a generated example spec;
// the ADR-check still nudges the user toward clean singular nouns.
const IRREGULAR_PLURALS = {
  kind: 'kinderen',
  ei: 'eieren',
  koe: 'koeien',
  stad: 'steden',
  schip: 'schepen',
  lid: 'leden',
  blad: 'bladeren',
  been: 'beenderen',
  ambtenaar: 'ambtenaren',
  museum: 'musea',
  medium: 'media',
};

const VOWELS = 'aeiou';
function isVowel(c) {
  return VOWELS.includes(c);
}

export function pluralize(singular) {
  const s = singular.trim().toLowerCase().replace(/\s+/g, '-');
  if (!s) return s;
  if (IRREGULAR_PLURALS[s]) return IRREGULAR_PLURALS[s];

  // Words ending in a single vowel: loanword-ish -> +'s (auto's would need an
  // apostrophe; for a URL slug we keep it simple with a plain s). -e -> +n? No:
  // Dutch "-e" usually takes -s or -n; default to -s here (methode->methodes).
  if (/[aeiou]$/.test(s)) return s + 's';

  // The unstressed light endings that take -s: -el, -em, -en, -er, -erd, -aar,
  // -eur (loan). These only apply when the word is polysyllabic; a one-syllable
  // word like "bier" or "muur" is stressed and takes -en, not -s.
  const syllables = (s.match(/[aeiou]+/g) || []).length;
  if (syllables >= 2 && /(el|em|en|erd|er|aar)$/.test(s)) return s + 's';

  // Consonant doubling: a short stressed vowel (single vowel letter) followed by
  // a single consonant doubles that consonant before -en. kat->katten, bus->
  // bussen, app->apps stays (double consonant already). Skip if the vowel is
  // part of a digraph (two vowels = long, no doubling: boek->boeken).
  const last = s[s.length - 1];
  const prev = s[s.length - 2];
  const prev2 = s[s.length - 3];
  if (!isVowel(last) && isVowel(prev) && prev2 !== undefined && !isVowel(prev2)) {
    // single short vowel + single final consonant -> double the consonant
    if (!'jwxy'.includes(last)) return s + last + 'en';
  }

  // Vowel shortening in an open syllable: a long vowel written double (aa/ee/oo/
  // uu) before a single final consonant drops one vowel. aanvraag->aanvragen,
  // taal->talen, muur->muren.
  const m = s.match(/(aa|ee|oo|uu)([bcdfghjklmnpqrstvwxz])$/);
  if (m) return s.slice(0, -3) + m[1][0] + m[2] + 'en';

  return s + 'en'; // vergunning->vergunningen, bier->bieren (default)
}

// PascalCase schema name from a singular resource. "vergunning" → "Vergunning".
function schemaName(singular) {
  const s = singular
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

// operationId per ADR: verb + Resource(s). listVergunningen, createVergunning.
function opId(verb, singular, plural) {
  const Sing = schemaName(singular);
  const Plur = schemaName(plural);
  return verb === 'list' ? `list${Plur}` : `${verb}${Sing}`;
}

// The five CRUD operations a resource can expose, in display order. `key` is
// what the wizard toggles and what buildSpecModel honours; `on` is the default
// (golden path = full CRUD). `scope` picks the collection vs the item path.
export const OPERATIONS = [
  { key: 'list', method: 'GET', scope: 'collection', label: 'Lijst' },
  { key: 'create', method: 'POST', scope: 'collection', label: 'Aanmaken' },
  { key: 'get', method: 'GET', scope: 'item', label: 'Ophalen' },
  { key: 'update', method: 'PUT', scope: 'item', label: 'Bijwerken' },
  { key: 'delete', method: 'DELETE', scope: 'item', label: 'Verwijderen' },
];

// Default op-set for a fresh resource: full CRUD (the golden path).
export function defaultOps() {
  return OPERATIONS.reduce((acc, o) => ((acc[o.key] = true), acc), {});
}

// A resource's enabled ops, defaulting to full CRUD when unspecified so seed
// and older callers (no `ops`) keep generating the complete contract.
function opsOf(r) {
  return r.ops || defaultOps();
}

// --- spec model -----------------------------------------------------------

// Build the spec as a plain JS object first (easy to lint), then serialise.
// `api` carries name/version/exposure; `resources` is [{ singular }].
export function buildSpecModel(api, resources) {
  const slug = (api.name || 'api').toLowerCase().replace(/api$/, '').trim().replace(/\s+/g, '-');
  const version = api.version || 'v1';
  const paths = {};
  const schemas = {
    // The shared ADR error envelope (RFC 7807).
    Foutbericht: {
      type: 'object',
      description: 'Gestandaardiseerd foutbericht (application/problem+json, RFC 7807).',
      properties: {
        type: { type: 'string', format: 'uri' },
        title: { type: 'string' },
        status: { type: 'integer' },
        detail: { type: 'string' },
        instance: { type: 'string', format: 'uri' },
      },
    },
  };

  for (const r of resources) {
    const singular = r.singular.trim();
    if (!singular) continue;
    const ops = opsOf(r);
    // A resource with no enabled operations contributes nothing to the contract.
    if (!OPERATIONS.some((o) => ops[o.key])) continue;
    const plural = pluralize(singular);
    const Schema = schemaName(singular);
    const collPath = `/${plural}`;
    const itemPath = `/${plural}/{id}`;

    // A minimal but realistic resource schema. ADR wants an id and timestamps.
    schemas[Schema] = {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', readOnly: true },
        naam: { type: 'string' },
        status: { type: 'string' },
        aangemaaktOp: { type: 'string', format: 'date-time', readOnly: true },
      },
      required: ['naam'],
    };

    // Build the two paths op by op, so only enabled operations are emitted.
    const coll = {};
    if (ops.list) {
      coll.get = {
        operationId: opId('list', singular, plural),
        summary: `Lijst ${plural}`,
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', default: 1 },
            description: 'Paginanummer (ADR-paginatie).',
          },
          { name: 'pageSize', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } },
        ],
        responses: {
          200: {
            description: `Een pagina ${plural}.`,
            content: {
              'application/json': { schema: { $ref: `#/components/schemas/${Schema}Pagina` } },
            },
          },
          default: errorResponse(),
        },
      };
    }
    if (ops.create) {
      coll.post = {
        operationId: opId('create', singular, plural),
        summary: `Maak een ${singular}`,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: `#/components/schemas/${Schema}` } } },
        },
        responses: {
          201: {
            description: `De aangemaakte ${singular}.`,
            content: { 'application/json': { schema: { $ref: `#/components/schemas/${Schema}` } } },
          },
          default: errorResponse(),
        },
      };
    }
    if (Object.keys(coll).length) paths[collPath] = coll;

    const item = {};
    if (ops.get) {
      item.get = {
        operationId: opId('get', singular, plural),
        summary: `Haal één ${singular} op`,
        responses: {
          200: {
            description: `De ${singular}.`,
            content: { 'application/json': { schema: { $ref: `#/components/schemas/${Schema}` } } },
          },
          404: errorResponse('Niet gevonden.'),
          default: errorResponse(),
        },
      };
    }
    if (ops.update) {
      item.put = {
        operationId: opId('update', singular, plural),
        summary: `Werk een ${singular} bij`,
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: `#/components/schemas/${Schema}` } } },
        },
        responses: {
          200: {
            description: `De bijgewerkte ${singular}.`,
            content: { 'application/json': { schema: { $ref: `#/components/schemas/${Schema}` } } },
          },
          default: errorResponse(),
        },
      };
    }
    if (ops.delete) {
      item.delete = {
        operationId: opId('delete', singular, plural),
        summary: `Verwijder een ${singular}`,
        responses: { 204: { description: 'Verwijderd, geen inhoud.' }, default: errorResponse() },
      };
    }
    if (Object.keys(item).length) {
      item.parameters = [
        { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
      ];
      paths[itemPath] = item;
    }

    // The paginated list envelope, only needed when the list operation exists.
    if (ops.list) {
      schemas[`${Schema}Pagina`] = {
        type: 'object',
        properties: {
          items: { type: 'array', items: { $ref: `#/components/schemas/${Schema}` } },
          page: { type: 'integer' },
          pageSize: { type: 'integer' },
          total: { type: 'integer' },
        },
      };
    }
  }

  const spec = {
    openapi: '3.0.3',
    info: {
      title: api.name || 'Naamloze API',
      version,
      description: `Koppelvlak van het Begane Grond. Gegenereerd conform de REST API Design Rules.`,
    },
    servers: [{ url: `https://api.${slug}.overheid.nl/${version}`, description: 'Productie' }],
    paths,
    components: {
      schemas,
      securitySchemes:
        api.standaarden?.oauth !== false
          ? {
              oauth2: {
                type: 'oauth2',
                description: 'OAuth 2.0 volgens het NL GOV-profiel.',
                flows: {
                  clientCredentials: { tokenUrl: `https://auth.overheid.nl/token`, scopes: {} },
                },
              },
            }
          : {},
    },
  };
  if (api.standaarden?.oauth !== false) spec.security = [{ oauth2: [] }];
  return spec;
}

// The reusable problem+json error response object.
function errorResponse(description = 'Foutbericht (problem+json).') {
  return {
    description,
    content: {
      'application/problem+json': { schema: { $ref: '#/components/schemas/Foutbericht' } },
    },
  };
}

// --- YAML serialisation ---------------------------------------------------

// Hand-rolled YAML emitter for the plain-object spec. Handles the subset we
// emit: nested maps, arrays of maps/scalars, strings, numbers, booleans. Keeps
// key order (insertion order) so the document reads top-down like a real spec.
function toYaml(value, indent = 0) {
  const pad = '  '.repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return ' []\n';
    let out = '\n';
    for (const item of value) {
      if (isMap(item)) {
        const inner = toYaml(item, indent + 1).replace(/^\s+/, ''); // first key inline after "- "
        out += `${pad}- ${inner}`;
      } else {
        out += `${pad}- ${scalar(item)}\n`;
      }
    }
    return out;
  }
  if (isMap(value)) {
    const keys = Object.keys(value);
    if (!keys.length) return ' {}\n';
    let out = indent === 0 ? '' : '\n';
    keys.forEach((k, _i) => {
      const v = value[k];
      const key = yamlKey(k);
      if (isMap(v) || Array.isArray(v)) {
        out += `${pad}${key}:${toYaml(v, indent + 1)}`;
      } else {
        out += `${pad}${key}: ${scalar(v)}\n`;
      }
    });
    return out;
  }
  return ` ${scalar(value)}\n`;
}

function isMap(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

// Quote keys that aren't plain (e.g. "200", "application/json", "$ref").
function yamlKey(k) {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(k) ? k : `'${k}'`;
}

function scalar(v) {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return String(v);
  const s = String(v);
  // Quote strings that could be misread as YAML (refs, urls, leading specials).
  if (s === '' || /[:#{}[\],&*!|>'"%@`]/.test(s) || /^[\s-]/.test(s) || /^\d/.test(s)) {
    return `'${s.replace(/'/g, "''")}'`;
  }
  return s;
}

// The public entry point: resources → OpenAPI YAML string.
export function generateOpenApiYaml(api, resources) {
  return toYaml(buildSpecModel(api, resources), 0).trimEnd() + '\n';
}

// --- ADR lint -------------------------------------------------------------

// A light ADR check over the design the user assembled. Not a full Spectral
// run; it surfaces the handful of rules a generated spec can plausibly miss,
// with the same pass/fail shape the standards evaluator uses. Because the
// generator is ADR-conform by construction, a clean design lints green — the
// value is that it flags a user's bad resource name before it ships.
export function lintAdr(api, resources) {
  const named = resources.filter((r) => r.singular.trim());
  const rules = [];

  rules.push({
    rule: 'Minstens één resource',
    pass: named.length > 0,
    detail: named.length
      ? `${named.length} resource(s) gedefinieerd`
      : 'Voeg minstens één resource toe',
  });

  // Resource names should be nouns, lowercase, no spaces/uppercase/plurals typed
  // by hand (the generator pluralises). Flag obviously off names.
  const badNames = named.filter(
    (r) => /[A-Z]/.test(r.singular) || /\d/.test(r.singular) || r.singular.trim().includes(' ')
  );
  rules.push({
    rule: 'Resourcenamen: enkelvoud, kleine letters',
    pass: badNames.length === 0,
    detail: badNames.length
      ? `Pas aan: ${badNames.map((r) => r.singular).join(', ')}`
      : 'Alle namen zijn nette zelfstandige naamwoorden',
  });

  rules.push({
    rule: 'Versie in de server-URL',
    pass: Boolean(api.version),
    detail: api.version
      ? `Major versie ${api.version} in /${api.version}`
      : 'Geen versie opgegeven',
  });

  rules.push({
    rule: 'problem+json foutformat',
    pass: true, // generator always emits the Foutbericht schema + problem+json
    detail: 'Gegenereerd met application/problem+json en een Foutbericht-schema',
  });

  rules.push({
    rule: 'Plurale collectie-paden',
    pass: true, // generator pluralises every collection path
    detail: named.length ? named.map((r) => `/${pluralize(r.singular)}`).join(', ') : 'n.v.t.',
  });

  return rules;
}
