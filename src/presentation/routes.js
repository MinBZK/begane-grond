// Routes: "wie ben je vandaag". A route is a role on one example team
// (team-toeslagen). Choosing a route makes you that person (store.setPersona)
// and plays a slide-path tailored to that role — different screens, order,
// driven wizard and examples, but transparently the same platform.
//
// A route reuses the exact slide shape from slides.js/tours.js, so the
// presentation engine (usePresentation.js) stays unchanged: it only reads
// `.slides`. A route adds two fields the launcher uses: `role` and `persona`.
//
// Slide shape (see slides.js header): { id, title, lead?, bullets?, route?,
// drive?:{wizard}, emit?:{type,title,severity?}, highlight?, full?, skippable? }
//
// All route paths and drive.wizard names below already exist (nav.js /
// wizard-scripts.js) and are reused verbatim. The per-role language lives in the
// slide lead/bullets. Identifiers/comments English; UI text Dutch.

export const EXAMPLE_TEAM = 'team-toeslagen';

export const routes = [
  // --- Engineer (Sanne Visser, Backend developer) -------------------------
  // From an empty screen to a running toeslagen-service: scaffold, take infra,
  // pipeline green, observe. Drives the app wizard.
  {
    id: 'engineer',
    role: 'Backend developer',
    persona: 'sanne',
    icon: 'terminal',
    lead: 'Je bouwt en draait de toeslagen-dienst.',
    slides: [
      {
        id: 'eng-intro',
        title: 'Een dag als engineer bij Toeslagen',
        lead: 'Je bent Sanne, backend developer. Van een leeg scherm naar een draaiende dienst — zonder tickets, zonder wachten.',
        bullets: [
          'Het platform geeft je een gebaand pad: een werkende service met CI, observability en standaarden ingebakken.',
          'Alles wat je nodig hebt neem je zelf af.',
        ],
        route: '/zelf',
        full: true,
      },
      {
        id: 'eng-nieuwe-app',
        title: 'Genereer een dienst uit een gebaand pad',
        lead: 'Geen lege repo, maar een service die meteen voldoet aan de standaarden.',
        bullets: [
          'Kies een template, benoem de dienst, en het platform scaffolt repo, CI en infra.',
          'De standaarden volgen uit het pad — je hoeft ze niet zelf op te zoeken.',
        ],
        route: '/apps/nieuw',
        drive: { wizard: 'app' },
      },
      {
        id: 'eng-infra',
        title: 'Neem infra af, self-service',
        lead: 'Postgres, Kafka, een Kubernetes-cluster — uit de catalogus, in minuten.',
        bullets: [
          'Je team-context staat al ingevuld; je kiest de omgeving en de maat.',
          'Geen aanvraagformulier, geen weken wachten.',
        ],
        route: '/infra',
      },
      {
        id: 'eng-pijplijn',
        title: 'De pijplijn draait groen',
        lead: 'Bouwen, testen, scannen — op gedeelde runners, met de gates die compliance bewaken.',
        route: '/environments/pijplijn',
        skippable: true,
      },
      {
        id: 'eng-observability',
        title: 'Zie wat er draait',
        lead: 'Metrics, logs, traces en SLO-alerts. En als het misgaat is er een incident met een piket eronder.',
        route: '/observability',
        emit: { type: 'alert.firing', title: 'SLO-alert: latency app-toeslagen', severity: 'warning' },
      },
    ],
  },

  // --- Tech lead (Noor Bakker) --------------------------------------------
  {
    id: 'tech-lead',
    role: 'Tech lead',
    persona: 'noor-bakker',
    icon: 'person-2',
    lead: 'Je bewaakt kwaliteit en zet releases door.',
    slides: [
      {
        id: 'tl-intro',
        title: 'Een dag als tech lead bij Toeslagen',
        lead: 'Je bent Noor. Je bewaakt de kwaliteit van de dienst en beslist wat naar productie gaat.',
        route: '/zelf',
        full: true,
      },
      { id: 'tl-compliance', title: 'Voldoet de dienst?', lead: 'De compliance-scorecard toont per standaard de status.', route: '/koppelvlakken/compliance' },
      {
        id: 'tl-promotie',
        title: 'Zet de release door naar productie',
        lead: 'Stap voor stap van test naar acceptatie naar productie, met goedkeuring waar dat moet.',
        route: '/environments/promotie/app-toeslagen',
        drive: { wizard: 'promotie' },
      },
    ],
  },

  // --- Jurist (Lieke Jansen) ----------------------------------------------
  {
    id: 'jurist',
    role: 'Jurist',
    persona: 'lieke-jansen',
    icon: 'certificate',
    lead: 'Je legt de grondslag onder een dienst vast.',
    slides: [
      {
        id: 'jur-intro',
        title: 'Een dag als jurist bij Toeslagen',
        lead: 'Je bent Lieke, wetgevingsjurist. De overheid mag een handeling alleen verrichten als een wet die toestaat — jij legt die grondslag vast.',
        route: '/wetten',
        full: true,
      },
      {
        id: 'jur-wet',
        title: 'Maak een wet machine-leesbaar',
        lead: 'Van wetstekst naar uitvoerbare logica, met scenario’s die hem toetsen.',
        route: '/wetten/nieuw',
        drive: { wizard: 'wet' },
      },
      { id: 'jur-verwerking', title: 'De verwerking en haar grondslag', lead: 'Elke verwerking van persoonsgegevens rust op een wettelijke grondslag.', route: '/verwerkingen' },
      { id: 'jur-keten', title: 'De bevoegdheidsketen', lead: 'Van wetsartikel naar bevoegd gezag naar de artefacten die zich erop beroepen.', route: '/governance/bevoegdheid' },
    ],
  },

  // --- Beleidsmaker (Bram de Wit) -----------------------------------------
  {
    id: 'beleidsmaker',
    role: 'Beleidsmaker',
    persona: 'bram-de-wit',
    icon: 'clipboard',
    lead: 'Je vertaalt beleid naar een uitvoerbare wet.',
    slides: [
      {
        id: 'bel-intro',
        title: 'Een dag als beleidsmaker bij Toeslagen',
        lead: 'Je bent Bram. Beleid is pas echt als het uitvoerbaar is — jij ziet de lijn van wet naar dienst naar besluit.',
        route: '/wetten',
        full: true,
      },
      { id: 'bel-wet', title: 'Beleid wordt uitvoerbare wet', lead: 'De wet als machine-leesbare logica, niet als losse PDF.', route: '/wetten/nieuw', drive: { wizard: 'wet' } },
      { id: 'bel-algoritme', title: 'Welke algoritmen beslissen mee?', lead: 'Met doel, uitlegbaarheid en menselijke controle.', route: '/algoritmes' },
      { id: 'bel-keten', title: 'De bevoegdheidsketen', lead: 'De legitimiteit van elke handeling, traceerbaar tot het wetsartikel.', route: '/governance/bevoegdheid' },
    ],
  },

  // --- Information security officer (Samira Haddad) ------------------------
  {
    id: 'security-officer',
    role: 'Information security officer',
    persona: 'samira-haddad',
    icon: 'lock-closed',
    lead: 'Je bewaakt de beveiliging en de gates.',
    slides: [
      {
        id: 'sec-intro',
        title: 'Een dag als security officer bij Toeslagen',
        lead: 'Je bent Samira. Jij bewaakt dat niets onveiligs naar productie glipt.',
        route: '/security',
        full: true,
      },
      { id: 'sec-gates', title: 'De gates die een release tegenhouden', lead: 'Beleid als code: een release komt er pas door als het klopt.', route: '/governance' },
      { id: 'sec-algoritme', title: 'Algoritmen onder toezicht', lead: 'Risicomodellen met impacttoets en menselijke controle.', route: '/algoritmes', skippable: true },
      { id: 'sec-cert', title: 'Certificaten, self-service', lead: 'PKIoverheid-certificaten aanvragen en uitrollen zonder ticket.', route: '/secrets/certificaten', drive: { wizard: 'cert' } },
    ],
  },

  // --- Scrum master (Wouter Stam) -----------------------------------------
  {
    id: 'scrum-master',
    role: 'Scrum master',
    persona: 'wouter-stam',
    icon: 'list-decreasing-lines',
    lead: 'Je houdt het team en de levering op koers.',
    slides: [
      {
        id: 'scr-intro',
        title: 'Een dag als scrum master bij Toeslagen',
        lead: 'Je bent Wouter. Jij houdt het team, het werk en de levering op koers.',
        route: '/zelf',
        full: true,
      },
      { id: 'scr-team', title: 'Het team en wie wat doet', lead: 'Mensen, rollen en het piketrooster op één plek.', route: '/teams' },
      { id: 'scr-incidenten', title: 'Wat staat er open?', lead: 'Incidenten, changes en de status van de dienst.', route: '/incidenten' },
      { id: 'scr-alerts', title: 'Alerts & SLO', lead: 'Loopt het nog binnen de afspraken?', route: '/observability/alerts', skippable: true },
    ],
  },

  // --- Business analist (Daan Koster) -------------------------------------
  {
    id: 'analist',
    role: 'Business analist',
    persona: 'daan-koster',
    icon: 'chart-x-y-axis-line',
    lead: 'Je werkt met de data en de basisregistraties.',
    slides: [
      {
        id: 'ana-intro',
        title: 'Een dag als analist bij Toeslagen',
        lead: 'Je bent Daan. Jij werkt met de gegevens waar de dienst op draait.',
        route: '/registers',
        full: true,
      },
      { id: 'ana-datasets', title: 'De datasetcatalogus', lead: 'Welke data is er, met welke kwaliteit en grondslag.', route: '/data' },
      { id: 'ana-contracten', title: 'Datacontracten', lead: 'Wie mag welke data gebruiken, voor welk doel.', route: '/datacontracten' },
      { id: 'ana-verwerking', title: 'Verwerkingen', lead: 'Hoe de data verwerkt wordt, en op welke grondslag.', route: '/verwerkingen', skippable: true },
    ],
  },
];

export function routeById(id) {
  return routes.find((r) => r.id === id) || routes[0];
}
