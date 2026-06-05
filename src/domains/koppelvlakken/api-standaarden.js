// Pure evaluation of the government API standards against a single koppelvlak.
// The sibling of governance/gates.js: one pure function, store-free, so the
// API-catalogus, the compliance-scorecard and the wizard preview all share the
// exact same verdicts instead of forking three drifting copies.
//
// A koppelvlak is judged on seven building blocks, each backed by a Logius/IAM
// standard (the installed skills are the source of truth). Per standard a
// verdict:
//   'pass' - the building block is in place
//   'fail' - applicable but missing, must be remediated
//   'nvt'  - not applicable to this koppelvlak (intern API has no FSC, an API
//            without persoonsgegevens needs no Logboek). 'nvt' is not a failure.
//
// Two kinds of API flow through here. Wizard-created koppelvlakken carry an
// explicit `standaarden` object plus `exposure`/`persoonsgegevens`/`events`
// flags. Seed koppelvlakken predate that model and only carry `adr`/`status`,
// so their profile is DERIVED deterministically from a keyed hash on the id:
// stable across reloads (the seed is deterministic, no Math.random), biased so
// production koppelvlakken score better than planned ones.

// The seven building blocks, in display order. `key` matches the api.standaarden
// object; `bron` points at the governing standard for a "lees meer" link.
export const STANDAARDEN = [
  { key: 'adr', label: 'API Design Rules', skill: 'ls-api', bron: 'REST API Design Rules / NL GOV API-profiel (Spectral)' },
  { key: 'problemJson', label: 'problem+json', skill: 'ls-api', bron: 'RFC 7807 application/problem+json foutformat' },
  { key: 'oauth', label: 'OAuth / OIDC NL GOV', skill: 'ls-iam', bron: 'OAuth 2.0 / OIDC NL GOV-profiel, private_key_jwt, scopes' },
  { key: 'rateLimit', label: 'Rate-limiting', skill: 'ls-api', bron: 'Rate-limit headers + 429 Too Many Requests + Retry-After' },
  { key: 'logboek', label: 'Logboek Dataverwerkingen', skill: 'ls-logboek', bron: 'Logboek Dataverwerkingen, NEN 7513, OTLP' },
  { key: 'cloudevents', label: 'CloudEvents', skill: 'ls-notif', bron: 'CloudEvents 1.0 voor notificaties / abonnementen' },
  { key: 'fsc', label: 'Digikoppeling / FSC', skill: 'ls-dk', bron: 'Digikoppeling / FSC, PKIoverheid (overheid-overheid)' },
];

// Stable string hash (djb2). Same id => same number, every reload.
function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return h;
}

// Derive the applicability profile + standards posture for a seed koppelvlak
// that has no explicit fields. Deterministic and biased by lifecycle status.
function deriveProfile(api) {
  const h = hash(api.id);
  const prod = api.status === 'productie';
  // Exposure: a third intern, a third b2b (overheid-overheid), a third publiek.
  const exposure = ['intern', 'b2b', 'publiek'][h % 3];
  const persoonsgegevens = (h >> 2) % 5 !== 0; // ~80% raken persoonsgegevens
  const events = (h >> 4) % 3 === 0; // ~33% publiceert gebeurtenissen
  // Per-standard "in place?": ADR follows the seed flag; the rest pass more
  // often for production koppelvlakken. A planned/beta API legitimately has
  // gaps, which is exactly what the scorecard should surface.
  const ok = (salt) => (prod ? ((h >> salt) % 4 !== 0) : ((h >> salt) % 2 === 0));
  return {
    exposure,
    persoonsgegevens,
    events,
    standaarden: {
      problemJson: ok(1),
      oauth: ok(3),
      rateLimit: Boolean(api.rateLimit) && ok(5),
      logboek: ok(7),
      cloudevents: ok(9),
      fsc: ok(11),
    },
  };
}

// The single profile for an API: explicit (wizard) wins, derived (seed) fills in.
function profile(api) {
  if (api.standaarden && api.exposure) {
    return {
      exposure: api.exposure,
      persoonsgegevens: Boolean(api.persoonsgegevens),
      events: Boolean(api.events),
      standaarden: api.standaarden,
    };
  }
  return deriveProfile(api);
}

// Is a standard applicable to this koppelvlak?
//   logboek      - only when it processes persoonsgegevens
//   cloudevents  - only when it publishes events
//   fsc          - only for b2b (overheid-overheid) koppelvlakken
// The other four are always applicable.
function applicable(key, prof) {
  if (key === 'logboek') return prof.persoonsgegevens;
  if (key === 'cloudevents') return prof.events;
  if (key === 'fsc') return prof.exposure === 'b2b';
  return true;
}

// Whether the building block is in place. ADR delegates to the existing seed
// flag so the catalogus column and the scorecard never disagree.
function present(key, api, prof) {
  if (key === 'adr') return Boolean(api.adr);
  return Boolean(prof.standaarden[key]);
}

function why(key, verdict, api) {
  if (verdict === 'nvt') {
    if (key === 'logboek') return 'Geen persoonsgegevens (n.v.t.)';
    if (key === 'cloudevents') return 'Publiceert geen gebeurtenissen (n.v.t.)';
    if (key === 'fsc') return 'Geen overheid-overheid-koppelvlak (n.v.t.)';
  }
  const std = STANDAARDEN.find((s) => s.key === key);
  if (verdict === 'pass') return `Voldoet aan ${std?.label}`;
  return `${std?.label} nog niet ingericht`;
}

// Evaluate all seven standards for one koppelvlak.
// Returns [{ key, label, skill, bron, verdict, why }] in STANDAARDEN order.
export function evalApiStandaarden(api) {
  const prof = profile(api);
  return STANDAARDEN.map((s) => {
    if (!applicable(s.key, prof)) {
      return { ...s, verdict: 'nvt', why: why(s.key, 'nvt', api) };
    }
    const verdict = present(s.key, api, prof) ? 'pass' : 'fail';
    return { ...s, verdict, why: why(s.key, verdict, api) };
  });
}

// Roll a koppelvlak up to a score: passed of the applicable standards.
// 'nvt' standards drop out of both numerator and denominator.
export function apiScore(api) {
  const checks = evalApiStandaarden(api);
  const applicableChecks = checks.filter((c) => c.verdict !== 'nvt');
  const passed = applicableChecks.filter((c) => c.verdict === 'pass').length;
  const total = applicableChecks.length;
  return {
    passed,
    total,
    ratio: total ? passed / total : 1,
    compliant: passed === total,
    failing: applicableChecks.filter((c) => c.verdict === 'fail').length,
  };
}
