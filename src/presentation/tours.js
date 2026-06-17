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
import { routeById } from './routes.js';

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

// --- Aanloop: the runway before the chooser ----------------------------------
// The pitch's own opening sets up the whole talk: the title slide and "de
// overheid is een techbedrijf" (software at scale, Toeslagen you can't buy).
// We reuse those two verbatim from the pitch deck (single source of truth: edit
// the pitch and the runway follows), then end on the chooser (kind: 'choice'),
// so Shift+P plays runway -> chooser -> pick a route as one continuous flow.
const introSlides = [
  ...pitchSlides.slice(0, 2),
  { id: 'intro-chooser', kind: 'choice', full: true },
];

// --- "De keten die je niet kunt kopen" ---------------------------------------
// The talk for an audience that already believes build-over-buy (developers).
// Structure: titelslide -> the 8 arguments (the case that the government is a
// tech company, from anneschuth.nl/.../techbedrijf) -> a bridge -> a short
// Begane Grond demo (proof the base is real, with two live wizards) -> the
// estafette: AWIR art. 3 through five roles (wet -> code -> data -> audit). The
// estafette IS the chain you can't buy.
//
// The demo slides reuse real pitch slides by id (single source of truth: edit
// the pitch and they follow). The estafette slides are pulled verbatim from the
// route, so their `becomePersona` hand-overs still work: the engine resolves the
// persona as a pure function of slide index, regardless of tour vs route.
const pitchById = Object.fromEntries(pitchSlides.map((s) => [s.id, s]));

// The thesis slide: the blog's opening framing. The question Anne gets, the
// thesis as the answer, and the promise of eight arguments. Sets up the eight
// argument slides that follow.
const ketenThese = {
  id: 'keten-these',
  title: 'Waarom platform engineering?',
  lead: 'Ik krijg vaak de vraag: wat is platform engineering, en waarom zou de overheid zich daar druk om maken? Mijn antwoord begint bij een these.',
  bullets: [
    'De overheid is de facto het grootste en meest complexe softwarebedrijf van Nederland.',
    'En ze moet zich ook zo organiseren. Platform engineering is de manier om dat te doen.',
    'Hier acht argumenten.',
  ],
  full: true,
};

// The 8 arguments, one tight full-screen slide each. Title = the argument, lead
// = the claim, bullets = the sharpest fact. Numbers are from the blog post, not
// rounded. The demo afterwards shows several of these working, so the bridge
// names that as deliberate setup rather than repetition.
const argumentSlides = [
  {
    id: 'arg-softwarebedrijf',
    title: '1. De overheid is een softwarebedrijf*',
    lead: 'Het grootste en meest complexe van Nederland. Alleen noemt niemand het zo.',
    bullets: [
      'De Belastingdienst draait software die complexer is dan wat de gemiddelde scale-up bouwt.',
      'UWV, SVB, DUO, RvIG: meer dan 10 miljoen aangiftes per jaar, honderden wijzigingen in tientallen regelingen.',
      'Voor de Toeslagenberekening of een WIA-beoordeling bestaat geen SaaS. Je kunt het niet kopen.',
    ],
    aside:
      'Op heel veel vlakken gaat de vergelijking met een techbedrijf mank, zeker qua missie. Maar qua software-complexiteit helpt de vergelijking wel.',
    full: true,
  },
  {
    id: 'arg-inkopen',
    title: '2. Inkopen werkt niet',
    lead: 'De klassieke route is uitbesteden. Bij software op deze schaal loopt dat keer op keer vast.',
    bullets: [
      'Twee op de drie grote IT-projecten lopen vertraging op (Rapportage Grote ICT 2024).',
      '1,6 miljard euro aan budgetoverschrijding over 184 projecten.',
      'De wereld is te ingewikkeld om vooraf dicht te timmeren in een bestek.',
    ],
    full: true,
  },
  {
    id: 'arg-ai-kantelt',
    title: '3. AI kantelt koop versus bouw',
    lead: 'Code wordt goedkoper om te schrijven. Dat verandert de rekensom.',
    bullets: [
      'Empirisch: 26% meer afgeronde taken, 27-39% winst bij junior developers (Microsoft/Accenture).',
      'Kleinere teams kunnen significant meer dan een paar jaar geleden.',
      'De 4x-claim is niet onderbouwd, maar de richting is duidelijk: bouwen wordt aantrekkelijker.',
    ],
    full: true,
  },
  {
    id: 'arg-multiplier',
    title: '4. De multiplier',
    lead: 'Een platform onder een team vermenigvuldigt wat datzelfde team aankan.',
    bullets: [
      'Teams met een platform eronder: 2,3x actiever op code, 2x zo vaak deployen (Spotify/Backstage).',
      '2x zoveel wijzigingen in 17% minder cycle time.',
      'Correlatie, geen bewijs, maar het patroon is consistent: de basislaag doet het zware werk.',
    ],
    full: true,
  },
  {
    id: 'arg-bijzonder',
    title: '5. Bijzonder genoeg',
    lead: 'De overheid heeft eisen die geen enkel commercieel product standaard invult.',
    bullets: [
      'BIO, AVG, data-soevereiniteit, DigiD, archivering, toegankelijkheid.',
      'Elke organisatie lost dit nu apart op, keer op keer opnieuw.',
      'Een platform regelt het één keer goed, voor iedereen.',
    ],
    full: true,
  },
  {
    id: 'arg-standaarden',
    title: '6. Standaarden in code',
    lead: 'Een standaard is pas echt als hij is afgedwongen, niet als hij is opgeschreven.',
    bullets: [
      "In plaats van een PDF die zegt 'gebruik TLS 1.3', een platform waar TLS 1.3 de default is.",
      'In plaats van een memo over een nieuwe versie, een automatische pull request naar alle repos.',
      'API Design Rules, WCAG, BIO: als check in de pijplijn, niet als wens.',
    ],
    full: true,
  },
  {
    id: 'arg-talent',
    title: '7. Talent',
    lead: 'Het tekort aan IT-specialisten bij de overheid is nijpend. Goed gereedschap is het antwoord.',
    bullets: [
      'Engineers kiezen werkgevers waar de tooling goed is en de bureaucratie klein.',
      'Goed gereedschap trekt goed vakmanschap aan, en houdt het binnen.',
      'Een platform is niet alleen techniek, het is wervingskracht.',
    ],
    full: true,
  },
  {
    id: 'arg-bouwblokken',
    title: '8. Versnipperde bouwblokken',
    lead: 'De stukken bestaan al. Ze passen alleen nog niet op elkaar.',
    bullets: [
      'Haven, FSC, Common Ground, OpenZaak, Open Formulieren, NL Design System.',
      'Onafhankelijk gebouwd, met eigen aannames over authenticatie, datamodellen en deployment.',
      'Geen developer portal, geen service catalog, geen golden paths. Die verbindende laag ontbreekt.',
    ],
    full: true,
  },
];

// Bridge: that was the argument; now what it looks like. A pure turn from the
// case to the tool; the next slide (the Begane Grond landing) introduces the
// platform itself, so this one does not pre-empt it.
const ketenBridge = {
  id: 'keten-brug',
  title: 'Genoeg betoog. Hoe ziet dat eruit?',
  lead: 'Acht argumenten voor één conclusie: de overheid moet bouwen, op een platform. Om dat concreet te maken, heb ik een prototype in elkaar gezet.',
  bullets: [
    'De komende minuten lopen we er samen doorheen.',
    'We zien de argumenten terug als werkende dingen: gebaande paden, gates, standaarden in code.',
    'Geen plaatjes om naar te wijzen, maar iets dat klikt en draait.',
  ],
  full: true,
};

// Short demo: land on the tool as a whole first (Begane Grond's front page),
// then zoom into the paved path and two live wizards. Kept lean because the 8
// arguments already made the case; this only needs to show it works.
const ketenDemo = [
  'voorbeeld-begane-grond', // landing: de voorkant van de tool (route /)
  'geplaveide-weg', // het gebaande pad: 93 dagen -> minuten
  'self-service', // zelf afnemen, geen ticket
  'nieuwe-app', // live: een dienst uit het niets (drive=app)
  'pijplijn-by-default', // gates en compliance by default
  'promoten', // live: gates groen voor je ogen (drive=promotie)
].map((id) => pitchById[id]);

// Hand-off into the estafette: the pure turn. The base any modern software shop
// could build; now the part unique to the state. The estafette-intro that
// follows does the actual set-up (article 3, the five roles), so this slide
// stays lean and does not pre-empt it.
const ketenHandoff = {
  id: 'keten-overgang',
  title: 'En nu het deel dat je niet kunt kopen',
  lead: 'Dit was de basis: een platform dat elk modern softwarebedrijf zou herkennen. Dit deel kun je kopen.',
  bullets: [
    'Een wet uitvoeren, herleidbaar van tekst tot besluit: daar bestaat geen kant-en-klaar product voor.',
    'Dat bouw je. En dat is precies wat we nu gaan volgen.',
  ],
  full: true,
};

// Closing slide: a centered thank-you with a large QR to the live platform.
// kind 'closing' gives it its own centered composition (not the left-aligned
// content layout). The QR SVG is a static asset (generated offline, decodes to
// https://bg.rijks.app/), so it shows without a network call on stage.
const ketenDank = {
  id: 'keten-dank',
  kind: 'closing',
  title: 'Dank',
  lead: 'De overheid is een techbedrijf. Laten we ons ook zo organiseren.',
  qr: {
    src: '/qr-bg-rijks-app.svg',
    url: 'https://bg.rijks.app',
    caption: 'Scan en loop er zelf doorheen.',
  },
  full: true,
};

const ketenSlides = [
  pitchById['titel'], // titelslide: naam + datum
  ketenThese, // these + aankondiging van de acht argumenten
  ...argumentSlides, // de 8 argumenten (het betoog)
  ketenBridge, // brug: van betoog naar demo
  ...ketenDemo, // korte demo: de basis staat, twee live wizards
  ketenHandoff, // brug: van demo naar de estafette
  ...routeById('awir-estafette').slides, // de keten die je niet kunt kopen
  ketenDank, // bedankt + QR naar het live platform
];

export const tours = [
  {
    id: 'intro',
    title: 'Aanloop',
    lead: 'De aanloop naar de keuze: de pitch-opening, dan kies je een rol.',
    theme: 'intro',
    audience: 'any',
    icon: 'sparkles',
    slides: introSlides,
  },
  {
    id: 'keten',
    title: 'De keten die je niet kunt kopen',
    lead: 'Korte basis, dan de estafette: één wetsartikel van wet tot audit, door vijf rollen.',
    theme: 'keten',
    audience: 'any',
    icon: 'link',
    slides: ketenSlides,
  },
  {
    id: 'pitch',
    title: 'De pitch',
    lead: 'Waarom de overheid het grootste softwarebedrijf van Nederland is — het volledige podiumverhaal.',
    theme: 'pitch',
    audience: 'any',
    icon: 'books-vertical',
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
