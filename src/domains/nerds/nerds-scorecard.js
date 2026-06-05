// Per-app NeRDS scorecard. Thirteen richtlijnen, each a binary verdict, derived
// live from the store. The whole point of this module is that it does NOT
// invent a second compliance truth: where a richtlijn maps onto an existing
// gate or production-readiness check, it delegates to that exact logic
// (governance/gates.js, scorecards/scorecard.js). The remaining richtlijnen are
// "derived": small deterministic rules over seed relations that already exist
// (verwerkingen, apis, datacontracten, algoritmes, componenten, softwareInkoop,
// instances). NeRDS is a charter, not a maturity ladder, so the aggregate is an
// honest "N van de 13 voldaan", not brons/zilver/goud.
import { evalGate } from '../governance/gates.js';
import { runCheck } from '../scorecards/scorecard.js';

// Map a gate verdict to a binary check. 'exempt' counts as pass (n.v.t.): a
// richtlijn that does not apply is not a failure.
function fromGate(app, gateId, ctx) {
  const r = evalGate(app, gateId, ctx.store);
  return { pass: r.verdict !== 'fail', detail: r.why, nvt: r.verdict === 'exempt' };
}

function fromCheck(key, app, ctx) {
  const c = runCheck(key, app, ctx);
  return { pass: c.pass, detail: c.detail };
}

// One evaluator per richtlijn id. Each returns { pass, detail, nvt? }.
const EVALUATORS = {
  // 1 — proxy: a service with a green pipeline/runbook has done the work to
  // understand and document who it serves.
  gebruikersbehoeften: (app, ctx) => fromCheck('runbook', app, ctx),

  // 2 — delegate to the WCAG gate (frontends only; backends are n.v.t.).
  toegankelijkheid: (app, ctx) => fromGate(app, 'gate-wcag', ctx),

  // 3 — delegate to open-source-tenzij.
  'open-source': (app, ctx) => fromGate(app, 'gate-open', ctx),

  // 4 — open standaarden. For API-exposing apps this is the ADR standard; for
  // the rest it is the platform's open-standards posture (pass).
  'open-standaarden': (app, ctx) => {
    const api = ctx.apis.find((a) => a.owner === app.team);
    const adrStd = ctx.standards.find((s) => s.id === 'std-adr');
    if (!api) return { pass: true, detail: 'Geen eigen API; erft platformstandaarden', nvt: true };
    if (api.adr) return { pass: true, detail: `${api.name} volgt API Design Rules` };
    return {
      pass: false,
      detail: `${api.name} voldoet nog niet aan ADR (${adrStd?.status || 'deels'})`,
    };
  },

  // 5 — cloudstrategie: draait op Haven (Kubernetes) of op de platform-native
  // stack (NLDD), dus cloud native en daarmee portabel en operationeel autonoom.
  cloudstrategie: (app, ctx) => {
    const onK8s = ctx.instances.some((i) => i.app === app.id && i.kind === 'kubernetes');
    const native = app.stack?.includes('NLDD') || app.stack?.includes('Vue');
    if (onK8s) return { pass: true, detail: 'Cloud native op Haven (Kubernetes)' };
    if (native) return { pass: true, detail: 'Cloud native (NLDD-stack)' };
    return { pass: false, detail: 'Nog niet cloud native / operationeel autonoom (Haven+)' };
  },

  // 6 — delegate to the BIO security baseline gate.
  veiligheid: (app, ctx) => fromGate(app, 'gate-bio', ctx),

  // 7 — privacy: DPIA uitgevoerd voor de verwerking(en) van dit team. Geen
  // verwerking met persoonsgegevens => n.v.t.
  privacy: (app, ctx) => {
    const vwks = ctx.verwerkingen.filter((v) => v.team === app.team);
    if (!vwks.length)
      return { pass: true, detail: 'Geen persoonsgegevensverwerking (n.v.t.)', nvt: true };
    const open = vwks.filter((v) => v.dpiaStatus !== 'uitgevoerd');
    if (!open.length)
      return { pass: true, detail: `${vwks.length} verwerking(en), DPIA uitgevoerd` };
    return { pass: false, detail: `DPIA open voor ${open.length} verwerking(en)` };
  },

  // 8 — samenwerking & hergebruik: het team levert of gebruikt herbruikbare
  // componenten in plaats van zelf te bouwen.
  samenwerking: (app, ctx) => {
    const owns = ctx.componenten.filter((c) => c.owner === app.team);
    const uses = ctx.componenten.filter((c) => (c.usedBy || []).includes(app.team));
    if (owns.length)
      return { pass: true, detail: `Levert ${owns.length} herbruikbare component(en)` };
    if (uses.length)
      return { pass: true, detail: `Hergebruikt ${uses.length} platformcomponent(en)` };
    return { pass: false, detail: 'Geen gedeelde componenten geleverd of hergebruikt' };
  },

  // 9 — integratie: het team biedt een ADR-conforme API aan. Geen API => n.v.t.
  integratie: (app, ctx) => {
    const api = ctx.apis.find((a) => a.owner === app.team);
    if (!api) return { pass: true, detail: 'Geen koppelvlak aangeboden (n.v.t.)', nvt: true };
    if (api.adr && api.status === 'productie')
      return { pass: true, detail: `${api.name} in productie, ADR-conform` };
    return { pass: false, detail: `${api.name}: ${api.adr ? api.status : 'niet ADR-conform'}` };
  },

  // 10 — datagebruik: de app consumeert data via een getekend datacontract.
  // Geen dataconsumptie => n.v.t.
  datagebruik: (app, ctx) => {
    const contracts = ctx.datacontracten.filter((c) => c.consumer === app.id);
    if (!contracts.length)
      return { pass: true, detail: 'Geen externe dataconsumptie (n.v.t.)', nvt: true };
    const active = contracts.filter((c) => c.status === 'actief');
    if (active.length === contracts.length)
      return { pass: true, detail: `${active.length} actief datacontract` };
    return {
      pass: false,
      detail: `${contracts.length - active.length} datacontract(en) niet actief`,
    };
  },

  // 11 — algoritmen: geregistreerd met impact- en discriminatietoets. Geen
  // algoritmische besluitvorming => n.v.t.
  algoritmen: (app, ctx) => {
    const algs = ctx.algoritmes.filter((a) => a.app === app.id);
    if (!algs.length)
      return { pass: true, detail: 'Geen algoritmische besluitvorming (n.v.t.)', nvt: true };
    const untested = algs.filter(
      (a) => a.impacttoets !== 'uitgevoerd' || a.discriminatietoets !== 'uitgevoerd'
    );
    if (!untested.length)
      return { pass: true, detail: `${algs.length} algoritme(n) getoetst en geregistreerd` };
    return { pass: false, detail: `${untested.length} algoritme(n) zonder volledige toets` };
  },

  // 12 — inkoopstrategie: geen vendor lock-in. Open source of een geborgd
  // exit-pad. Geen inkoop op naam van dit team => n.v.t.
  inkoopstrategie: (app, ctx) => {
    const buys = ctx.softwareInkoop.filter((o) => o.team === app.team && o.status === 'actief');
    if (!buys.length)
      return { pass: true, detail: 'Geen actieve software-inkoop (n.v.t.)', nvt: true };
    const locked = buys.filter((o) => o.lockin === 'hoog' && !o.openSource);
    if (!locked.length)
      return { pass: true, detail: `${buys.length} contract(en) zonder hoge lock-in` };
    return { pass: false, detail: `${locked.length} contract(en) met hoge lock-in` };
  },

  // 13 — duurzaamheid: geen infra-sprawl. Stateful kopieën over dev/acc/prod
  // verspillen energie; geconsolideerde productie-infra is groener.
  duurzaamheid: (app, ctx) => {
    const insts = ctx.instances.filter((i) => i.app === app.id);
    if (!insts.length) return { pass: true, detail: 'Geen toegewezen infra (n.v.t.)', nvt: true };
    const nonProd = insts.filter((i) => i.env !== 'prod');
    if (nonProd.length <= 1)
      return { pass: true, detail: `${insts.length} instantie(s), geconsolideerd` };
    return { pass: false, detail: `${nonProd.length} niet-productie-instanties (sprawl)` };
  },
};

// Build the NeRDS scorecard for one app: a binary check per richtlijn, in the
// canonical richtlijn order from the store.
export function buildNerdsScorecard(app, ctx) {
  const checks = ctx.richtlijnen.map((r) => {
    const res = EVALUATORS[r.id]
      ? EVALUATORS[r.id](app, ctx)
      : { pass: false, detail: 'Geen evaluatie' };
    return {
      key: r.id,
      number: r.number,
      label: r.title,
      icon: r.icon,
      to: r.to,
      fixLabel: `Naar ${r.toLabel}`,
      pass: res.pass,
      nvt: Boolean(res.nvt),
      detail: res.detail,
    };
  });

  const passed = checks.filter((c) => c.pass).length;
  const total = checks.length;
  const ratio = total ? passed / total : 0;
  const blocking = checks.filter((c) => !c.pass);

  return { app, checks, passed, total, ratio, compliant: passed === total, blocking };
}

// Build all NeRDS scorecards plus a fleet roll-up: averages and a per-richtlijn
// adoption percentage that the hub renders on each card.
export function buildNerdsFleet(ctx) {
  const cards = ctx.apps.map((a) => buildNerdsScorecard(a, ctx));
  const total = cards.length;

  const perRichtlijn = ctx.richtlijnen.map((r) => {
    let pass = 0;
    for (const card of cards) {
      const c = card.checks.find((x) => x.key === r.id);
      if (c && c.pass) pass++;
    }
    return {
      id: r.id,
      number: r.number,
      title: r.title,
      appsPass: pass,
      appsTotal: total,
      pct: total ? Math.round((pass / total) * 100) : 0,
    };
  });

  const summary = {
    total,
    fullyCompliant: cards.filter((c) => c.compliant).length,
    avgPassed: total ? cards.reduce((s, c) => s + c.passed, 0) / total : 0,
    avgRatio: total ? cards.reduce((s, c) => s + c.ratio, 0) / total : 0,
    perRichtlijn,
  };

  return { cards, summary };
}
