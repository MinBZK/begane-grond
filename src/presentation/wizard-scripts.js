// Auto-walkthrough scripts per wizard, used by the presentation overlay to
// drive a wizard flow step by step (the "drive" action of a slide).
//
// Each script is an ordered list of steps. The presentation runner reads the
// wizard's reactive `form` plus its exposed helpers/finish handler and applies
// one step at a time:
//
//   { set, value }     assign value to form[set] (dot-path, e.g. 'inputs.0.register')
//                      add { type: true } to type a free-text value out live;
//                      omit it for <select>/choice-grid values (set instantly)
//   { toggle, value }  call the wizard's toggle helper with value
//   { call, args }     call a named exposed helper with the given args array
//   { next: true }     advance to the next wizard step
//   { go: n }          jump to wizard step index n
//   { finish: true }   call the wizard's exposed finish handler
//   { wait: ms }       pause ms milliseconds before the next step
//
// The toggle helper name and call helper names are wizard-specific and resolved
// by the runner from the wizard's defineExpose surface.

export const wizardScripts = {
  // OrderWizard: 6 steps (Eigenaar, Omgeving, Grootte, Datacenter, Naam, Samenvatting).
  order: [
    { wait: 600 },
    { set: 'team', value: 'team-platform' },
    { next: true },
    { set: 'env', value: 'acc' },
    { next: true },
    { set: 'size', value: 'M' },
    { next: true },
    { set: 'dc', value: 'dc-denhaag' },
    { next: true },
    { set: 'name', value: 'postgres-demo-acc', type: true },
    { next: true },
    { wait: 500 },
    { finish: true },
  ],

  // NewAppWizard: 5 steps (Golden path, Basis, Infra, Repository, Samenvatting).
  app: [
    { wait: 600 },
    { call: 'pickTemplate', args: ['tpl-rust-api'] },
    { next: true },
    { set: 'name', value: 'Demo-dienst', type: true },
    { set: 'team', value: 'team-platform' },
    { set: 'description', value: 'Demo-microservice', type: true },
    { next: true },
    // The chosen golden path (tpl-rust-api) already pre-selects postgres and
    // kubernetes via pickTemplate, so we add kafka here to show a live tick.
    { call: 'toggleInfra', args: ['kafka'] },
    { next: true },
    { set: 'visibility', value: 'open' },
    { next: true },
    { wait: 500 },
    { finish: true },
  ],

  // NewWetWizard: the showcase. 6 steps (Bron, Traject, Machine-leesbaar,
  // Scenario, Uitvoeren, Publiceren). Every step is populated visibly so the
  // audience sees a law turn into a running, tested service end to end. The
  // story: the Huurtoeslagwet, whose right-to-allowance reads income from the
  // inkomensregister and household from the BRP.
  wet: [
    { wait: 900 },
    // Step 0: Bron. Re-type the BWB id and the law name so the harvest reads live.
    { set: 'bwbId', value: 'BWBR0008659', type: true },
    { wait: 300 },
    { set: 'harvestName', value: 'Wet op de huurtoeslag', type: true },
    { wait: 700 },
    { next: true },
    // Step 1: Traject. Name the working space and add a jurist next to the dev.
    { set: 'trajectName', value: 'Huurtoeslag machine-leesbaar', type: true },
    { wait: 300 },
    { call: 'toggleMember', args: ['joost'] },
    { wait: 300 },
    { set: 'team', value: 'team-toeslagen' },
    { wait: 600 },
    { next: true },
    // Step 2: Machine-leesbaar. Two outcomes, two inputs bound to registers.
    { set: 'outputs.0.name', value: 'heeft_recht_op_huurtoeslag', type: true },
    { wait: 300 },
    { call: 'addOutput' },
    { set: 'outputs.1.name', value: 'hoogte_toeslag', type: true },
    { wait: 400 },
    { set: 'inputs.0.register', value: 'inkomen' },
    { wait: 350 },
    { set: 'inputs.0.output', value: 'toetsingsinkomen' },
    { wait: 500 },
    { call: 'addInput' },
    { wait: 350 },
    { set: 'inputs.1.register', value: 'brp' },
    { wait: 350 },
    { set: 'inputs.1.output', value: 'partner' },
    { wait: 800 },
    { next: true },
    // Step 3: Scenario. A concrete Given/When/Then, typed out.
    { set: 'scenario.name', value: 'Alleenstaande met laag inkomen', type: true },
    { wait: 300 },
    { set: 'scenario.given', value: 'geen partner, toetsingsinkomen 22.000 euro', type: true },
    { wait: 300 },
    { set: 'scenario.then', value: 'recht op huurtoeslag, hoogte berekend', type: true },
    { wait: 800 },
    { next: true },
    // Step 4: Uitvoeren. The engine runs the scenario green; let it land.
    { wait: 2000 },
    { next: true },
    // Step 5: Publiceren and deploy as a running service.
    { wait: 900 },
    { finish: true },
  ],

  // WetDetail (the estafette's first leg, Bram): open the Uitvoeren tab and run
  // the law on a casus. The BSN is prefilled, so we only switch tab and run, so
  // "is dit uitvoerbaar?" is answered live with an uitkomst and a trace.
  'wet-uitvoeren': [
    { wait: 900 },
    { call: 'openUitvoeren' },
    { wait: 1400 },
    { call: 'runEngine' },
    { wait: 1200 },
  ],

  // WetDetail (the estafette's second leg, Lieke), choreographed so each beat is
  // visible: show the rule (one condition) -> propose a change (inline panel, not
  // a modal which renders 0x0 in the scaled layout) -> confirm, and the extra
  // condition slides into the rule on Machine-leesbaar -> only then move to
  // Scenario's, where the LAT case now fails. The jurist catching a case.
  'wet-review': [
    { wait: 900 },
    { call: 'openMachine' },
    { wait: 2400 },
    { call: 'proposeChange' },
    { wait: 2400 },
    { call: 'confirmChange' },
    { wait: 2600 },
    { call: 'showScenarios' },
    { wait: 1400 },
  ],

  // AlgoritmeDetail (the estafette's fourth leg, Samira): re-run the
  // discrimination assessment live; the result (geslaagd + trace) appears
  // inline. One keer goedkeuren is niet genoeg — the toets runs at each release.
  'alg-toets': [{ wait: 1200 }, { call: 'rerunToets' }, { wait: 1800 }],

  // DatasetDetail (the estafette's fifth leg, Daan): scroll the refresh section
  // into view (it sits low on the page), then pull a fresh refresh; the new run
  // appears on top, confirming the data the whole chain rests on is current.
  'data-refresh': [
    { wait: 900 },
    { call: 'scrollToRefresh' },
    { wait: 1300 },
    { call: 'refreshSource' },
    { wait: 1800 },
  ],

  // NewWorkplaceWizard: 6 steps (Medewerker, Hardware, Image, Profiel, Policy, Bevestigen).
  // The form is a ref; the driver mutates the inner object.
  werkplek: [
    { wait: 600 },
    { set: 'person', value: 'fatima' },
    { next: true },
    { set: 'model', value: 'framework-13' },
    { next: true },
    { set: 'image', value: 'autonoom-13' },
    { next: true },
    { set: 'profile', value: 'developer' },
    { next: true },
    { set: 'encrypted', value: true },
    { set: 'mdm', value: true },
    { next: true },
    { wait: 500 },
    { finish: true },
  ],

  // NewCampaignWizard: 5 steps (Type, Doel-repos, Definitie, Preview, Uitrollen).
  // Defaults already set a regex codemod over a couple of repos.
  campagne: [
    { wait: 600 },
    { set: 'title', value: 'NLDD 0.9 over de hele vloot', type: true },
    { next: true },
    { next: true },
    { next: true },
    { next: true },
    { wait: 500 },
    { finish: true },
  ],

  // PromotionWizard: 3 steps (Omgevingen, Gates, Deploy). No single form: we
  // acknowledge the gates and run the deploy pipeline via exposed helpers.
  promotie: [
    { wait: 800 },
    { next: true },
    { wait: 400 },
    { call: 'ackAll' },
    { next: true },
    { wait: 400 },
    { call: 'runDeploy' },
  ],

  // Certificates: gated behind a request panel, then 3 steps (Domein, TSP en
  // OIN, Uitgeven). Open the panel, fill the domain and TSP live, then run the
  // issuance pipeline (CSR -> TSP -> uitgifte -> installatie) so the audience
  // sees a PKIoverheid certificate go from request to installed in seconds.
  cert: [
    { wait: 600 },
    { call: 'openRequest' },
    { wait: 700 },
    { set: 'cn', value: '*.nieuwedienst.overheid.nl', type: true },
    { wait: 400 },
    { set: 'service', value: 'app-omgevingsloket' },
    { wait: 500 },
    { next: true },
    { set: 'tsp', value: 'KPN' },
    { wait: 600 },
    { next: true },
    { wait: 500 },
    { call: 'runIssue' },
  ],

  // SubdomeinWizard (the domeinen-estafette's first leg, Sanne): the gov.nl
  // path has 5 steps (Naamruimte, Organisatie, Tier, Label, Controleer). We
  // pick gov.nl, request for Belastingdienst on the service-tier, type the
  // label so the fqdn composes live, and submit. The request lands "in
  // beoordeling" with the BD domeinbeheerder as approver — the baton Maud picks
  // up in the next leg.
  subdomein: [
    { wait: 800 },
    // Step 0: namespace. gov.nl is the default; set it explicitly so a replay
    // from any state lands right.
    { set: 'namespaceId', value: 'ns-gov' },
    { wait: 700 },
    { next: true },
    // Step 1: organisation = Belastingdienst.
    { set: 'org', value: 'bd' },
    { wait: 700 },
    { next: true },
    // Step 2: tier = dienst-tier (delegated approval).
    { set: 'tier', value: 'service' },
    { wait: 700 },
    { next: true },
    // Step 3: label, typed out so the composed fqdn grows live.
    { set: 'service', value: 'kindgebonden-budget', type: true },
    { wait: 900 },
    { next: true },
    // Step 4: controleer — the summary names the approver, then submit.
    { wait: 1200 },
    { finish: true },
  ],

  // Aanvragen (the domeinen-estafette's approver leg, Maud): approve every
  // pending request live so "Wacht op jou" empties row by row, the metrics tick
  // over and the new domains appear. Each approval pulses the Goedkeuren button
  // first. A page-style drive: one call helper, no form.
  'dns-goedkeuren': [{ wait: 900 }, { call: 'approveAll' }, { wait: 1200 }],

  // DomeinDetail (the domeinen-estafette's migration leg, Julia): play the whole
  // redirect flow live — open the migration panel, request it (verified via team
  // ownership), then approve it as DUO's domeinbeheerder so the HTTP 301 goes
  // live. Page-style drive: named helpers, no form.
  'dns-migratie': [{ wait: 900 }, { call: 'runMigration' }, { wait: 1400 }],

  // LlmCatalog: gated behind wizardOpen, then 4 steps (Model, Eigenaar,
  // Doel & classificatie, Samenvatting). Open it first, then walk through.
  llm: [
    { wait: 600 },
    { call: 'openWizard' },
    { wait: 700 },
    { next: true },
    { set: 'team', value: 'team-platform' },
    { next: true },
    { set: 'purpose', value: 'AI-assistent in de IDE', type: true },
    { next: true },
    { wait: 500 },
    { finish: true },
  ],
};
