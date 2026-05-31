// Derives a "production readiness" scorecard per app from the in-memory store.
// Everything here is pure and deterministic: given the same store snapshot it
// always yields the same checklist and tier, so the demo screen is stable.
//
// The seven checks mirror the platform's golden-path expectations. Pass/fail is
// inferred from real seed relations where possible (SLOs, secrets, on-call,
// repo licence) and otherwise from a stable per-app rule so the picture stays
// plausible and varied.

// Tier thresholds expressed as a fraction of checks passed. The app's own
// `maturity` field acts as a floor: a goud app never drops below goud even if a
// check happens to fail, because the field is the authoritative human grade.
export const TIERS = ['brons', 'zilver', 'goud'];

const TIER_META = {
  brons: { label: 'Brons', color: 'warning', icon: 'starburst-filled', accent: '#a9743b' },
  zilver: { label: 'Zilver', color: 'neutral', icon: 'starburst-filled', accent: '#8a93a6' },
  goud: { label: 'Goud', color: 'success', icon: 'starburst-filled', accent: '#c9a227' },
};

export function tierMeta(tier) {
  return TIER_META[tier] || TIER_META.brons;
}

// The catalogue of checks. Each builds a single check object for a given app,
// reading from the store. `to`/`fixLabel` point at the screen that resolves a
// failing check, so missing items click through to where you fix them.
const CHECKS = [
  {
    key: 'oncall',
    label: 'On-call ingericht',
    desc: 'Het team heeft een actieve on-call-rotatie voor deze service.',
    icon: 'person-circle',
    evaluate: (app, ctx) => {
      const team = ctx.teams.find((t) => t.id === app.team);
      const rota = team && ctx.oncall.find((o) => o.team === team.id && o.person);
      return { pass: Boolean(rota), detail: rota ? `Piket: ${ctx.personName(rota.person)}` : 'Geen piket-rotatie gevonden' };
    },
    to: '/teams/on-call',
    fixLabel: 'Richt on-call in',
  },
  {
    key: 'runbook',
    label: 'Runbook aanwezig',
    desc: 'Een actueel runbook beschrijft hoe je de service draait en herstelt.',
    icon: 'books-vertical',
    evaluate: (app, ctx) => {
      // Inferred from repo CI health: a red pipeline tends to ship without docs.
      const repo = ctx.repos.find((r) => r.id === app.repo);
      const pass = repo ? repo.ci === 'green' : false;
      return { pass, detail: pass ? 'Runbook gelinkt vanuit repo' : 'Geen actueel runbook' };
    },
    to: '/leren',
    fixLabel: 'Schrijf een runbook',
  },
  {
    key: 'slo',
    label: 'SLO gedefinieerd',
    desc: 'Er is een meetbare SLO met foutbudget voor deze service.',
    icon: 'arrow-up-arrow-down',
    evaluate: (app, ctx) => {
      const slo = ctx.slos.find((s) => s.service === app.id);
      return { pass: Boolean(slo), detail: slo ? `Doel ${slo.target}% · budget ${slo.budgetLeft}% over` : 'Geen SLO vastgelegd' };
    },
    to: '/incidenten',
    fixLabel: 'Definieer een SLO',
  },
  {
    key: 'backups',
    label: 'Back-ups getest',
    desc: 'Stateful infra heeft geteste, herstelbare back-ups.',
    icon: 'cylinder-split',
    evaluate: (app, ctx) => {
      const insts = ctx.instances.filter((i) => i.app === app.id);
      const stateful = insts.filter((i) => ['postgres', 'kafka', 'redis', 'objectstore'].includes(i.kind));
      if (stateful.length === 0) return { pass: true, detail: 'Geen stateful infra (n.v.t.)' };
      // Plausible rule: prod-stateful counts as backed up, acc/dev not yet.
      const pass = stateful.every((i) => i.env === 'prod');
      return { pass, detail: pass ? `${stateful.length} datastore(s) in back-upschema` : 'Back-up niet getest in alle omgevingen' };
    },
    to: '/infra/instances',
    fixLabel: 'Stel back-ups in',
  },
  {
    key: 'security',
    label: 'Security-baseline (BIO)',
    desc: 'Geen openstaande kritieke kwetsbaarheden; secrets recent geroteerd.',
    icon: 'shield-check-mark',
    evaluate: (app, ctx) => {
      const openVuln = ctx.vulnerabilities.find((v) => v.app === app.id && v.status !== 'opgelost');
      const teamSecret = ctx.secrets.find((s) => s.team === app.team);
      const pass = !openVuln && Boolean(teamSecret);
      let detail;
      if (openVuln) detail = `Open ${openVuln.severity}: ${openVuln.cve}`;
      else if (!teamSecret) detail = 'Geen beheerde secrets';
      else detail = 'Geen open kwetsbaarheden';
      return { pass, detail };
    },
    to: '/secrets',
    fixLabel: 'Los baseline op',
  },
  {
    key: 'a11y',
    label: 'Toegankelijk (WCAG 2.2 AA)',
    desc: 'Frontends voldoen aan WCAG 2.2 AA; services zijn vrijgesteld.',
    icon: 'eye',
    evaluate: (app) => {
      if (app.type !== 'website') return { pass: true, detail: 'Geen UI (n.v.t.)' };
      // Websites use the NLDD design system, which ships AA-tested components.
      const pass = app.stack.includes('NLDD');
      return { pass, detail: pass ? 'NLDD-componenten, AA getest' : 'WCAG-audit nog niet gedaan' };
    },
    to: '/leren',
    fixLabel: 'Doe een WCAG-audit',
  },
  {
    key: 'license',
    label: 'Open-source-licentie',
    desc: 'Open repo onder EUPL-1.2 conform open-source-tenzij.',
    icon: 'certificate',
    evaluate: (app, ctx) => {
      const repo = ctx.repos.find((r) => r.id === app.repo);
      if (!repo) return { pass: false, detail: 'Geen repo gekoppeld' };
      const pass = repo.license === 'EUPL-1.2' && repo.visibility !== 'gesloten';
      return { pass, detail: `${repo.visibility} · ${repo.license || 'geen licentie'}` };
    },
    to: '/code',
    fixLabel: 'Zet EUPL-licentie',
  },
];

// Build the full scorecard for one app against a store context.
export function buildScorecard(app, ctx) {
  const checks = CHECKS.map((c) => {
    const res = c.evaluate(app, ctx);
    return {
      key: c.key,
      label: c.label,
      desc: c.desc,
      icon: c.icon,
      to: c.to,
      fixLabel: c.fixLabel,
      pass: res.pass,
      detail: res.detail,
    };
  });

  const passed = checks.filter((c) => c.pass).length;
  const total = checks.length;
  const ratio = passed / total;

  // Tier earned purely on checks, then floored by the app's human-graded
  // maturity so the authoritative field can only raise, never lower.
  let earned = 'brons';
  if (ratio >= 0.85) earned = 'goud';
  else if (ratio >= 0.6) earned = 'zilver';
  const tier = maxTier(earned, app.maturity);

  // Next tier and which failing checks block it (the "to do" list).
  const nextTier = tier === 'goud' ? null : TIERS[TIERS.indexOf(tier) + 1];
  const blocking = checks.filter((c) => !c.pass);

  return { app, checks, passed, total, ratio, earned, tier, nextTier, blocking };
}

function maxTier(a, b) {
  const ia = TIERS.indexOf(a);
  const ib = TIERS.indexOf(b);
  return TIERS[Math.max(ia < 0 ? 0 : ia, ib < 0 ? 0 : ib)];
}

// Build all scorecards for the store and a tiny fleet summary on top.
export function buildFleet(ctx) {
  const cards = ctx.apps.map((a) => buildScorecard(a, ctx));
  const summary = {
    total: cards.length,
    goud: cards.filter((c) => c.tier === 'goud').length,
    zilver: cards.filter((c) => c.tier === 'zilver').length,
    brons: cards.filter((c) => c.tier === 'brons').length,
    avgRatio: cards.length ? cards.reduce((s, c) => s + c.ratio, 0) / cards.length : 0,
  };
  return { cards, summary };
}
