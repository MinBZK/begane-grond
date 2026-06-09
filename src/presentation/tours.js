// Tours: a generalisation of the stage deck. The presentation overlay was built
// to play one linear `slides` deck; a tour is the same mechanism — an ordered
// list of slides that navigate, emit events, auto-drive wizards and highlight UI
// — but there are several, and you choose one. Each tour declares an `audience`
// (which personas it is written for, or 'any') and a `theme`, so the launcher
// can offer "tours for you" (matching your active persona) alongside thematic
// tours (the pitch, the compliance walk, the engineer's path).
//
// The existing 58-slide stage talk is wrapped verbatim as the `pitch` tour, so
// nothing about that deck changes. The other tours are short (5–8 slides) and
// reuse real routes and the same `drive`/`emit`/`highlight` slide fields.
//
// Slide shape is identical to slides.js (see its header). A tour is:
//   { id, title, lead, theme, audience: [personaId,…] | 'any', icon, slides: [] }
//
// All UI text is Dutch; identifiers and comments are English. No clock/random.
import { slides as pitchSlides } from './slides.js';

// --- Persona-driven: "je werkt bij Logius en wilt een koppelvlak maken" -------
// The quest that started this: where do I have to go to ship a compliant API?
// It threads grondslag → koppelvlak-wizard → standaarden → datacontract →
// compliance, each step a real page, the wizard auto-driving on stage.
const apiBouwenSlides = [
  {
    id: 'api-intro',
    title: 'Een koppelvlak bouwen bij Logius',
    lead: 'Stel: je bent data-engineer bij Logius en je wilt een nieuwe API publiceren. Waar moet je allemaal langs?',
    bullets: [
      'Een koppelvlak is meer dan een endpoint: er hoort een grondslag, standaarden en een contract bij.',
      'Het platform rijgt die stappen aan elkaar tot één gebaand pad.',
    ],
    route: '/koppelvlakken',
    full: true,
  },
  {
    id: 'api-grondslag',
    title: 'Begin bij de grondslag',
    lead: 'Verwerk je persoonsgegevens, dan hoort daar een wet bij. Die grondslag bepaalt straks de standaarden.',
    bullets: [
      'De wetten staan als machine-leesbare uitvoering in het platform (RegelRecht).',
      'Dezelfde grondslag verschijnt later in het verwerkingenregister en op het datacontract.',
    ],
    route: '/wetten',
  },
  {
    id: 'api-wizard',
    title: 'Het gebaande pad: nieuw koppelvlak',
    lead: 'De wizard stelt twee vragen — blootstelling en persoonsgegevens — en zet de juiste standaarden vast.',
    bullets: [
      'Je benoemt de resources; het platform genereert een ADR-conforme OpenAPI-specificatie.',
      'De grondslag koppel je aan een wet, de standaarden volgen uit je antwoorden.',
    ],
    route: '/koppelvlakken/nieuw',
    drive: { wizard: 'api' },
  },
  {
    id: 'api-standaarden',
    title: 'De standaarden volgen vanzelf',
    lead: 'ADR, problem+json, OAuth NL GOV, rate-limiting — en bij persoonsgegevens het Logboek Dataverwerkingen.',
    route: '/standaarden',
    skippable: true,
  },
  {
    id: 'api-contract',
    title: 'Leg de afspraak vast in een datacontract',
    lead: 'Wie jouw koppelvlak gebruikt, doet dat onder een datacontract: doelbinding, grondslag, bewaartermijn.',
    route: '/datacontracten',
  },
  {
    id: 'api-compliance',
    title: 'Compliant-by-default, aantoonbaar',
    lead: 'De compliance-scorecard toont per standaard de status. Geen losse checklist achteraf, maar ingebouwd.',
    route: '/koppelvlakken/compliance',
    emit: {
      type: 'api.created',
      title: 'Nieuw koppelvlak compliant opgeleverd',
      severity: 'success',
    },
  },
];

// --- Thematic: de compliance-kant van het platform ----------------------------
const complianceSlides = [
  {
    id: 'comp-intro',
    title: 'Een rondleiding langs compliance',
    lead: 'Niet vanuit één rol, maar langs de governance-kant: privacy, security, algoritmen, toegankelijkheid, standaarden.',
    bullets: [
      'Alles wat de overheid uniek maakt zit in deze laag.',
      'En het is allemaal aan elkaar geknoopt in het platform.',
    ],
    route: '/nerds',
    full: true,
  },
  {
    id: 'comp-verwerkingen',
    title: 'Verwerkingenregister (AVG art. 30)',
    lead: 'Elke verwerking van persoonsgegevens met doel, grondslag, bewaartermijn en DPIA-status.',
    route: '/verwerkingen',
  },
  {
    id: 'comp-api',
    title: 'API-compliance',
    lead: 'Koppelvlakken voldoen aantoonbaar aan de overheidsstandaarden — per API een scorecard.',
    route: '/koppelvlakken/compliance',
  },
  {
    id: 'comp-security',
    title: 'Security & kwetsbaarheden',
    lead: 'BIO-controls, kwetsbaarheden per app, en de gates die een release tegenhouden tot het klopt.',
    route: '/security',
  },
  {
    id: 'comp-algoritmes',
    title: 'Algoritmeregister',
    lead: 'Welke algoritmen draaien er, met welk doel, hoe uitlegbaar, en met welke menselijke controle.',
    route: '/algoritmes',
    skippable: true,
  },
  {
    id: 'comp-toegankelijkheid',
    title: 'Toegankelijkheid (WCAG)',
    lead: 'Toegankelijkheidsverklaringen per dienst, getoetst tegen EN 301 549.',
    route: '/toegankelijkheid',
    skippable: true,
  },
  {
    id: 'comp-standaarden',
    title: 'Open standaarden',
    lead: 'Pas-toe-of-leg-uit, ingebouwd in de gebaande paden in plaats van een audit achteraf.',
    route: '/standaarden',
  },
];

// --- Thematic: langs de as van de engineer ------------------------------------
// The counterpart to the compliance walk: the same platform, but the way an
// engineer lives it — build, run, ship, observe.
const engineeringSlides = [
  {
    id: 'eng-intro',
    title: 'Langs de as van de engineer',
    lead: 'Hoe voelt het platform vanaf de werkvloer? Van een leeg scherm naar een draaiende dienst in productie.',
    bullets: [
      'Gebaande paden, self-service infra, CI/CD, observability — de hele keten.',
      'Geen tickets, geen wachten: je doet het zelf.',
    ],
    route: '/',
    full: true,
  },
  {
    id: 'eng-nieuwe-app',
    title: 'Genereer een dienst uit een gebaand pad',
    lead: 'Geen lege repo, maar een werkende service met CI, observability en standaarden ingebakken.',
    route: '/apps/nieuw',
    drive: { wizard: 'app' },
  },
  {
    id: 'eng-infra',
    title: 'Neem infra af, self-service',
    lead: 'Postgres, Kafka, een Kubernetes-cluster — uit de catalogus, in minuten, niet weken.',
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
    id: 'eng-promotie',
    title: 'Promoot je release naar productie',
    lead: 'Stap voor stap van test naar acceptatie naar productie, met een goedkeuring waar dat moet.',
    route: '/environments/promotie/app-toeslagen',
    drive: { wizard: 'promotie' },
  },
  {
    id: 'eng-observability',
    title: 'Zie wat er draait',
    lead: 'Metrics, logs, traces en SLO-alerts — en als het misgaat, een incident met een piketrooster eronder.',
    route: '/observability',
    emit: { type: 'alert.firing', title: 'SLO-alert: latency app-toeslagen', severity: 'warning' },
  },
  {
    id: 'eng-incident',
    title: 'En als het misgaat: incidenten',
    lead: 'Een incident is geen chaos maar een proces: piket, statuspagina, changes, postmortem.',
    route: '/incidenten',
    skippable: true,
  },
  {
    id: 'eng-cli',
    title: 'Alles ook via de CLI en API',
    lead: 'Elke klik heeft een `bg`-commando eronder. Het platform is een product met een API, geen portaal.',
    route: '/cli',
  },
];

export const tours = [
  {
    id: 'pitch',
    title: 'De pitch',
    lead: 'Waarom de overheid het grootste softwarebedrijf van Nederland is — het volledige podiumverhaal.',
    theme: 'pitch',
    audience: 'any',
    icon: 'presentation',
    slides: pitchSlides,
  },
  {
    id: 'api-bouwen',
    title: 'Een koppelvlak bouwen',
    lead: 'Je werkt bij Logius en wilt een API publiceren. Waar moet je allemaal langs?',
    theme: 'quest',
    audience: ['pieter'],
    icon: 'link',
    slides: apiBouwenSlides,
  },
  {
    id: 'engineering',
    title: 'Langs de as van de engineer',
    lead: 'Van leeg scherm naar productie: bouwen, draaien, uitrollen en observeren zoals een engineer het beleeft.',
    theme: 'engineering',
    audience: 'any',
    icon: 'terminal',
    slides: engineeringSlides,
  },
  {
    id: 'compliance',
    title: 'Langs de compliance-kant',
    lead: 'Privacy, security, algoritmen, toegankelijkheid en standaarden — de governance-laag van de overheid.',
    theme: 'compliance',
    audience: 'any',
    icon: 'shield-check-mark',
    slides: complianceSlides,
  },
];

export function tourById(id) {
  return tours.find((t) => t.id === id) || tours[0];
}

// Tours whose audience matches one of the active persona ids, for the "tours
// for you" section. 'any'-audience tours are universal and excluded here (they
// show under the thematic section instead).
export function toursForPersonas(personaIds) {
  const ids = new Set(personaIds || []);
  return tours.filter((t) => Array.isArray(t.audience) && t.audience.some((a) => ids.has(a)));
}
