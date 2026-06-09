// Grondslag: a thin reference to RegelRecht, the source of truth for the law.
//
// The Dutch legality principle (legaliteitsbeginsel) says the government may do
// nothing unless a law allows it. Every artefact with external impact — an API
// exposing data, an algorithm deciding, a law run as a service — must answer
// three questions: which legal task, which competent authority, which article.
//
// RegelRecht (regelrecht.rijks.app, MinBZK/regelrecht) already models the law
// machine-readably. We DO NOT copy that. An artefact carries only a thin
// reference: a corpus slug + bwb_id + article, from which we derive a juriconnect
// (the canonical NL citation) and a deep-link into RegelRecht. RegelRecht stays
// the owner of the law; Begane Grond owns "what we do with it" plus the pointer.
//
// This module is pure compute + references — no law logic, no law text. All
// identifiers/comments English; UI labels Dutch (Dutch-government project).

// Demo wet id -> RegelRecht corpus slug (the lawId you deep-link with). Only the
// wetten that exist in the RegelRecht corpus (corpus/regulation/nl/wet/<slug>)
// get a slug; the rest degrade to a juriconnect-only reference (no RR deep-link).
export const RR_LAW_SLUGS = {
  zorgtoeslagwet: 'wet_op_de_zorgtoeslag',
  awir: 'algemene_wet_inkomensafhankelijke_regelingen',
  participatiewet: 'participatiewet',
  kieswet: 'kieswet',
  'wet-brp': 'wet_basisregistratie_personen',
  vreemdelingenwet: 'vreemdelingenwet_2000',
  woo: 'wet_open_overheid',
  awb: 'algemene_wet_bestuursrecht',
  'inkomstenbelasting-2001': 'wet_inkomstenbelasting_2001',
  zorgverzekeringswet: 'zorgverzekeringswet',
};

const REGELRECHT_BASE = 'https://regelrecht.rijks.app';

// RegelRecht's legal_character enum (schema v0.5.2) with Dutch display labels.
// The demo seed uses a simplified set (BESCHIKKING/REGELING/TOETS); we map the
// demo value onto the RegelRecht vocabulary for display.
export const LEGAL_CHARACTERS = {
  BESCHIKKING: 'Beschikking',
  TOETS: 'Toets',
  WAARDEBEPALING: 'Waardebepaling',
  BESLUIT_VAN_ALGEMENE_STREKKING: 'Besluit van algemene strekking',
  REGELING: 'Regeling', // demo-only; ~ besluit van algemene strekking
  INFORMATIEF: 'Informatief',
};

export const DECISION_TYPES = {
  TOEKENNING: 'Toekenning',
  AFWIJZING: 'Afwijzing',
  GOEDKEURING: 'Goedkeuring',
  GEEN_BESLUIT: 'Geen besluit',
  ALGEMEEN_VERBINDEND_VOORSCHRIFT: 'Algemeen verbindend voorschrift',
  BELEIDSREGEL: 'Beleidsregel',
  VOORBEREIDINGSBESLUIT: 'Voorbereidingsbesluit',
  ANDERE_HANDELING: 'Andere handeling',
  AANSLAG: 'Aanslag',
};

// Build the canonical juriconnect citation (jci1.3) from a reference. This is
// the official NL standard for pointing at a law article/paragraph/sentence.
// e.g. { bwb_id: 'BWBR0018451', article: '2', paragraph: '1' }
//   -> 'jci1.3:c:BWBR0018451&artikel=2&lid=1'
export function juriconnectFor({ bwb_id, article, paragraph, sentence } = {}) {
  if (!bwb_id) return '';
  let s = `jci1.3:c:${bwb_id}`;
  if (article) s += `&artikel=${article}`;
  if (paragraph) s += `&lid=${paragraph}`;
  if (sentence) s += `&zin=${sentence}`;
  return s;
}

// Deep-link into RegelRecht for a grondslag reference, or '' when the law is not
// in the corpus (then there is no RR page to link to — degrade gracefully).
export function regelrechtUrl({ lawId, article } = {}) {
  if (!lawId) return '';
  return article
    ? `${REGELRECHT_BASE}/library/${lawId}/${article}`
    : `${REGELRECHT_BASE}/library/${lawId}`;
}

// Normalise the various legacy shapes into one grondslag reference object.
// Accepts:
//  - a string wet-id (the flat form on api/datacontract: grondslag: 'awir')
//  - a record with { grondslag: '<wet-id>', wet?: '<wet-id>' } (verwerking)
//  - an already-structured reference { lawId, bwb_id, article, ... }
// Resolves bwb_id/lawId via the store so GrondslagBlock works everywhere without
// touching the seed. Returns null when there is no legal basis at all.
export function readGrondslag(store, input) {
  if (!input) return null;

  // Already a structured reference.
  if (typeof input === 'object' && (input.lawId || input.bwb_id)) {
    return enrich(store, input);
  }

  // A record carrying a flat grondslag/wet field.
  if (typeof input === 'object') {
    const wetId = input.wet || (isWetId(store, input.grondslag) ? input.grondslag : null);
    if (!wetId) {
      // No law reference, but maybe a free-text AVG grondslag string.
      return input.grondslag ? { avgCategorie: input.grondslag } : null;
    }
    return enrich(store, { wetId, article: input.article });
  }

  // A bare string: either a wet-id or a free-text grondslag.
  if (typeof input === 'string') {
    if (isWetId(store, input)) return enrich(store, { wetId: input });
    return { avgCategorie: input };
  }
  return null;
}

function isWetId(store, id) {
  return !!(id && store.wetById && store.wetById(id));
}

// Fill in bwb_id, lawId, juriconnect and rrUrl from the store's wet record.
function enrich(store, ref) {
  const wetId = ref.wetId || ref.lawId; // demo wet id
  const wet = wetId && store.wetById ? store.wetById(wetId) : null;
  const bwb_id = ref.bwb_id || wet?.bwbId || null;
  const lawId = RR_LAW_SLUGS[wetId] || ref.lawId || null;
  const article = ref.article ?? null;
  const out = {
    wetId,
    wetName: wet?.name || null,
    lawId,
    bwb_id,
    article,
    paragraph: ref.paragraph ?? null,
    sentence: ref.sentence ?? null,
    competent_authority: ref.competent_authority || defaultAuthority(store, wet),
    avgCategorie: ref.avgCategorie || null,
  };
  out.juriconnect = juriconnectFor(out);
  out.rrUrl = regelrechtUrl(out);
  return out;
}

// Sensible default competent authority: the org that owns the law, via the
// owning team. RegelRecht's competent_authority shape: { name, type }.
function defaultAuthority(store, wet) {
  if (!wet?.owner || !store.teamById) return null;
  const team = store.teamById(wet.owner);
  const org = team?.org && store.orgById ? store.orgById(team.org) : null;
  if (!org) return null;
  return { name: org.name, type: 'INSTANCE', orgId: org.id };
}

// Resolve a competent_authority to a display name (and org id when INSTANCE).
export function competentAuthorityName(store, ca) {
  if (!ca) return null;
  if (typeof ca === 'string') return ca.replace(/^#/, '');
  if (ca.orgId && store.orgById) return store.orgById(ca.orgId)?.name || ca.name;
  return ca.name || null;
}

// A grondslag reference is "complete enough" to cite when it can produce a
// juriconnect — i.e. it has a bwb_id and an article.
export function grondslagComplete(g) {
  return !!(g && g.bwb_id && g.article);
}

// The legal character of the cited article, read from the demo wet's articles
// (the seed carries legalCharacter/decisionType per article). Used to show the
// nature of the handeling — "BESCHIKKING · TOEKENNING" — with a pointer to the
// real article on RegelRecht.
export function produceFor(store, g) {
  if (!g?.wetId || !store.wetById) return null;
  const wet = store.wetById(g.wetId);
  if (!wet) return null;
  const art =
    (wet.articles || []).find((a) => String(a.number) === String(g.article)) || wet.articles?.[0];
  if (!art) return null;
  return {
    legal_character: art.legalCharacter || null,
    decision_type: art.decisionType || null,
  };
}

export function describeProduces(produces) {
  if (!produces) return '';
  const lc = produces.legal_character
    ? LEGAL_CHARACTERS[produces.legal_character] || produces.legal_character
    : '';
  const dt = produces.decision_type
    ? DECISION_TYPES[produces.decision_type] || produces.decision_type
    : '';
  return [lc, dt].filter(Boolean).join(' · ');
}
