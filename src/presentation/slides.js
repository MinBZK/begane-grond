// Slide deck for the "Platform engineering" stage talk. The talk positions the
// government as the largest software shop in the country; "Begane Grond" (the
// demo app) is the running example used to make that concrete. The left rail
// (the deck) tells the story; the right side drives the live demo app to the
// matching route, optionally emits an event, runs a wizard, or highlights part
// of the screen.
//
// Each slide is a plain data object consumed by the presentation overlay:
//   {
//     id,                  // stable string key
//     title,               // slide heading (Dutch UI string)
//     lead?,               // one-line framing under the title (Dutch)
//     bullets: [...],      // short persuasive points (Dutch)
//     gov?,                // government-specific callout (Dutch), shown apart
//     route?,              // demo route to navigate to (router.push)
//     emit?,               // { type, title, severity? } -> store.emit(...)
//     drive?,              // { wizard: 'order'|'app'|'wet'|'werkplek'|
//                          //   'promotie'|'campagne'|'llm' } auto-run flow
//     highlight?,          // CSS selector to pulse on the demo side
//     link?,               // { href, label } shown as a closing link on the slide
//     speaker?,            // presenter name (title slide)
//     affiliation?,        // presenter affiliation (title slide)
//     showDate?,           // render today's date on the slide (title slide)
//   }
//
// All UI text is Dutch; identifiers and comments are English. No clock or
// random APIs are used here (the codebase forbids them); the deck is fully
// static data.

export const slides = [
  {
    id: 'titel',
    title: 'Platform engineering',
    lead: 'Waarom de Nederlandse overheid misschien wel het grootste softwarebedrijf van Nederland is. En waarom we ons ook zo moeten organiseren.',
    speaker: 'Anne Schuth',
    affiliation: 'Nederlandse Digitale Dienst',
    showDate: true,
    route: '/',
    full: true,
  },
  {
    id: 'overheid-techbedrijf',
    title: 'De overheid is een techbedrijf',
    lead: 'Het grootste en meest complexe softwarebedrijf van Nederland. Alleen noemt niemand het zo.',
    bullets: [
      'Belasting, toeslagen, uitkeringen, paspoorten: dat is software, op enorme schaal.',
      'De Belastingdienst verwerkt jaarlijks meer dan 10 miljoen aangiftes, met honderden wijzigingen per jaar.',
      'Er is geen kant-en-klaar product voor de Toeslagenberekening. Je kunt het niet kopen.',
    ],
    full: true,
  },
  {
    id: 'uitbesteden-vastloopt',
    title: 'Inkopen werkt niet',
    lead: 'Een platform is de gedeelde basislaag waarop teams hun software bouwen.',
    bullets: [
      'Twee op de drie grote IT-projecten van de overheid lopen vertraging op.',
      'Miljarden aan budgetoverschrijding, en dan werkt het vaak nog niet.',
      'De wereld is te ingewikkeld om vooraf dicht te timmeren in een bestek.',
      'Vendor lock-in: eenmaal binnen kom je er niet meer uit.',
    ],
    full: true,
  },
  {
    id: 'ai-kantelt',
    title: 'AI kantelt koop versus bouw',
    lead: 'Code wordt goedkoop. Dat verandert de rekensom.',
    bullets: [
      'Wat je vroeger kocht omdat zelf bouwen te duur was, bouw je nu zelf.',
      'AI-assistentie maakt een klein team verrassend productief.',
      'Maar goedkope code zonder platform is een berg techniek-schuld in wording.',
    ],
    full: true,
  },
  {
    id: 'voorbeeld-begane-grond',
    title: 'Een voorbeeld: Begane Grond',
    lead: 'Om concreet te maken wat ik bedoel, lopen we door één platform heen.',
    bullets: [
      'Begane Grond: een ontwikkelplatform voor de Rijksoverheid.',
      'Ruig terrein wordt begaanbaar, bergen worden heuvels.',
      'Een vaste laag waarop teams bouwen, in plaats van elke keer opnieuw beginnen.',
    ],
    route: '/',
  },
  {
    id: 'geplaveide-weg',
    title: 'Het gebaande pad',
    lead: 'Gebaande paden: de makkelijke route is meteen de juiste route.',
    bullets: [
      'Begin niet bij een leeg scherm, maar bij een werkend startpunt.',
      'Nu duurt het 93 dagen om een nieuwe dienst in productie te krijgen.',
      'Met een platform eronder: minuten in plaats van maanden.',
    ],
    route: '/apps/templates',
    emit: { type: 'repo.created', title: 'Nieuwe dienst opgezet via gebaand pad' },
  },
  {
    id: 'self-service',
    title: 'Self-service',
    lead: 'Zelf afnemen, niet wachten op een ander team.',
    bullets: [
      'Een database nodig? Bestel hem zelf, hij staat er binnen minuten.',
      'Geen ticket, geen wachtrij, geen e-mail naar beheer.',
      'Op Spotify waren teams met een platform eronder 2,3 keer zo actief, met dezelfde mensen.',
    ],
    route: '/infra',
    emit: { type: 'infra.instance.requested', title: 'PostgreSQL aangevraagd uit de catalogus' },
  },
  {
    id: 'gelaagde-stack',
    title: 'De gelaagde stack',
    lead: 'Alles hangt samen, van persoon tot ijzer.',
    bullets: [
      'Persoon, team, applicatie, instance, rack, datacenter.',
      'Elke laag is zichtbaar en herleidbaar, geen blinde vlekken.',
      'Klik op een app en je ziet tot in welk rack hij draait.',
    ],
    route: '/',
  },
  {
    id: 'fysiek-ijzer',
    title: 'Fundament: het ijzer',
    lead: 'Onder de software staat echte hardware.',
    bullets: [
      'Eigen datacenters, geen black box bij een onbekende leverancier.',
      'Je kunt het rack aanwijzen waarin de dienst draait.',
      'De basis is van onszelf, dus controle blijft binnen.',
    ],
    gov: 'Data blijft in Nederland. Soevereiniteit begint bij het ijzer dat je zelf bezit.',
    route: '/fysiek',
    emit: { type: 'capacity.warning', title: 'Datacenter Den Haag: 78% rackcapaciteit' },
  },
  {
    id: 'tot-in-het-rack',
    title: 'Tot in het rack',
    lead: 'Van een abstract dienstje naar een concrete plek in een kast.',
    bullets: [
      'Elke unit in het rack is bekend en gekoppeld aan een dienst.',
      'Storing? Je weet meteen welke hardware en welk team erbij hoort.',
      'Transparantie van wettekst tot stroomstekker.',
    ],
    route: '/fysiek/racks/r-dh-a1',
    emit: { type: 'cooling.alert', title: 'Rack r-dh-a1: koeling binnen marge' },
  },
  {
    id: 'infra-afnemen',
    title: 'Infra afnemen, live',
    lead: 'Een database bestellen, voor uw ogen.',
    bullets: [
      'Kies de dienst, vul wat in, bevestig.',
      'Geen formulier dat ergens in een postbus belandt.',
      'Let op de bel rechtsboven als de instance gereed is.',
    ],
    route: '/infra/order/postgres',
    drive: { wizard: 'order' },
    emit: { type: 'infra.instance.ready', title: 'Demo-instance is gereed' },
  },
  {
    id: 'applicaties',
    title: 'Applicaties',
    lead: 'De diensten die burgers en ambtenaren echt gebruiken.',
    bullets: [
      'Elke applicatie heeft een eigenaar, een team en een herkomst.',
      'Geen schaduw-IT, geen verweesde systemen meer.',
      'Eén catalogus voor alles wat er draait.',
    ],
    route: '/apps',
    emit: { type: 'app.created', title: 'Nieuwe applicatie geregistreerd in de catalogus' },
  },
  {
    id: 'nieuwe-app',
    title: 'Nieuwe app via het gebaande pad',
    lead: 'Van niets naar een werkend project, live.',
    bullets: [
      'Kies een gebaand pad en de rest staat klaar.',
      'Repository, pipeline en standaarden zitten er al in.',
      'De makkelijke keuze is meteen de veilige keuze.',
    ],
    route: '/apps/nieuw',
    drive: { wizard: 'app' },
  },
  {
    id: 'code-forgejo',
    title: 'Code op Forgejo',
    lead: 'De broncode draait op eigen grond.',
    bullets: [
      'Eén plek voor alle repositories van het Rijk.',
      'Pull requests, reviews en geschiedenis, volledig in eigen beheer.',
      'Open waar het kan, dicht waar het moet.',
    ],
    gov: 'Open-tenzij, op een eigen forge. Geen broncode in een buitenlandse cloud, soevereiniteit by design.',
    route: '/code',
    emit: { type: 'pr.opened', title: 'Pull request geopend op code.overheid.nl' },
  },
  {
    id: 'ci-runners',
    title: 'CI-runners',
    lead: 'De machines die de code bouwen en testen.',
    bullets: [
      'Elke wijziging wordt automatisch gebouwd en gecontroleerd.',
      'Capaciteit die je deelt in plaats van per team opnieuw optuigt.',
      'De lopende band onder het gebaande pad.',
    ],
    route: '/environments/runners',
    emit: { type: 'runner.scaled', title: 'Runner-pool opgeschaald naar de wachtrij' },
  },
  {
    id: 'promoten',
    title: 'Promoten met gates, live',
    lead: 'Een release een stap opschuiven, met de controles erbij.',
    bullets: [
      'Van acceptatie naar productie, maar alleen als de gates groen zijn.',
      'Tests, security en een goedgekeurde wijziging worden afgevinkt.',
      'De pijplijn bouwt, test, scant en deployt voor je ogen.',
    ],
    gov: 'Kwaliteit en governance als afdwingbare gates, niet als handtekening op een formulier.',
    route: '/environments/promotie/app-toeslagen',
    drive: { wizard: 'promotie' },
  },
  {
    id: 'teams-oncall',
    title: 'Teams, mensen en on-call',
    lead: 'Achter elke dienst staan mensen.',
    bullets: [
      'Een matrix die laat zien wie waarvoor bereikbaar is.',
      'Geen losse telefoonlijst in een la, maar onderdeel van het platform.',
      'Goed gereedschap trekt goed vakmanschap aan.',
    ],
    route: '/teams/on-call',
    emit: { type: 'oncall.handover', title: 'On-call overgedragen aan het volgende team' },
  },
  {
    id: 'werkplek-uitrollen',
    title: 'Werkplek uitrollen, live',
    lead: 'Een nieuwe collega, op dag één productief.',
    bullets: [
      'Kies de medewerker, het toestel en het profiel.',
      'Versleuteld en MDM-beheerd, want de BIO schrijft het voor.',
      'Van bestelling tot werkende laptop, in één doorlopende stroom.',
    ],
    gov: 'Encryptie en MDM staan standaard aan. De Rijksbaseline is ingebouwd, niet optioneel.',
    route: '/werkplekken/nieuw',
    drive: { wizard: 'werkplek' },
  },
  {
    id: 'observability',
    title: 'Observability',
    lead: 'Zien wat er gebeurt, voordat een burger het merkt.',
    bullets: [
      'Logs, metrics en traces op één plek.',
      'Niet gokken bij een storing, maar kijken.',
      'Inzicht standaard aan, niet als duur achteraf-project.',
    ],
    route: '/observability',
    emit: { type: 'alert.firing', title: 'SLO-alert: latency boven de drempel' },
  },
  {
    id: 'incident',
    title: 'Incident, live',
    lead: 'Er gaat nu iets mis. Expres.',
    bullets: [
      'Verhoogde latency op productie, en het platform weet het meteen.',
      'De bel rechtsboven kleurt rood.',
      'Wie, wat en waar staan direct klaar voor wie het oppakt.',
    ],
    route: '/incidenten',
    emit: {
      type: 'incident.opened',
      title: 'Verhoogde latency op productie',
      severity: 'critical',
    },
  },
  {
    id: 'finops',
    title: 'FinOps: kosten',
    lead: 'Wat het kost en aan wie het toe te rekenen is.',
    bullets: [
      'Kosten per team zichtbaar, niet pas op de jaarrekening.',
      'Zelf afnemen betekent ook zelf de rekening zien.',
      'Sturen op geld zonder de innovatie af te knijpen.',
    ],
    route: '/kosten',
    emit: { type: 'cost.anomaly', title: 'Kostenanomalie gedetecteerd bij een team' },
  },
  {
    id: 'security-compliance',
    title: 'Security en compliance',
    lead: 'Veiligheid is geen bijlage achteraf.',
    bullets: [
      'Niet een PDF over TLS 1.3, maar de platform-default.',
      'Afgedwongen via pull requests, niet via goede voornemens.',
      'Eenmaal goed ingeregeld, voor iedereen tegelijk.',
    ],
    gov: 'BIO als default. Compliance ingebakken in het gebaande pad, niet als bijlage bij een rapport.',
    route: '/security',
    emit: { type: 'compliance.dropped', title: 'Compliance-score gedaald, actie vereist' },
  },
  {
    id: 'standaarden',
    title: 'Standaarden',
    lead: 'Standaard als code, afgedwongen via pull requests.',
    bullets: [
      'NLDD design system, API Design Rules, internet.nl.',
      'WCAG 2.2 AA en BIO, niet als wens maar als check.',
      'Wat nu inconsistent is, embed je één keer als default.',
    ],
    gov: 'Open standaarden van de Rijksoverheid, eenmalig ingebouwd en overal afgedwongen.',
    route: '/standaarden',
    emit: { type: 'standard.updated', title: 'NLDD design system bijgewerkt naar 0.9' },
    highlight: '.rp-page',
    highlight: '.rp-page',
  },
  {
    id: 'fleet-campagne',
    title: 'Eén wijziging, hele vloot, live',
    lead: 'Een nieuwe standaard uitrollen over alle repositories tegelijk.',
    bullets: [
      'Beschrijf de wijziging één keer, het platform opent overal een pull request.',
      'Een versie-bump of een security.txt, in honderden repos in één keer.',
      'Zo wordt een standaard echt afgedwongen, niet alleen opgeschreven.',
    ],
    gov: 'Een beleidswijziging wordt een codewijziging die je over de hele Rijksvloot uitrolt.',
    route: '/fleet/nieuw',
    drive: { wizard: 'campagne' },
  },
  {
    id: 'basisregistraties',
    title: 'Basisregistraties',
    lead: 'De bronnen van waarheid van de overheid.',
    bullets: [
      'BRP, BRK, BAG, HR en het Kentekenregister, ontsloten via één laag.',
      'Identificatie via OIN en TOOI, herkomst altijd traceerbaar.',
      'Niet zelf data overtikken, maar bevragen bij de bron.',
    ],
    gov: 'AVG-proof bevragen: alleen wat mag, met OIN-authenticatie en een spoor terug naar de bron.',
    route: '/registers',
    emit: { type: 'register.connected', title: 'Dienst aangesloten op de BRP' },
    highlight: '.rp-page',
  },
  {
    id: 'digikoppeling-fsc',
    title: 'Digikoppeling en FSC',
    lead: 'Vertrouwde koppelvlakken tussen organisaties.',
    bullets: [
      'Veilig berichten uitwisselen zonder elke keer opnieuw afspraken maken.',
      'Versnipperde bouwstenen als Haven, FSC en OpenZaak, eindelijk verbonden.',
      'De ontbrekende laag die de losse stukken aan elkaar knoopt.',
    ],
    gov: 'Een verbindende platformlaag over bestaande overheidsbouwstenen heen. Daarvoor is mandaat nodig.',
    route: '/koppelvlakken/fsc',
    emit: { type: 'register.connected', title: 'Vertrouwde koppeling via FSC tot stand gebracht' },
  },
  {
    id: 'wet-naar-systeem',
    title: 'Wet- en regelgeving uitvoeren',
    lead: 'Een applicatie die een wet of beleidsregel uitvoert, met de wettekst als bron.',
    bullets: [
      'Geharvest uit wetten.overheid.nl, rechtstreeks uit de BWB.',
      'Machine-leesbaar gemaakt, getest en uitgerold.',
      'Bijvoorbeeld de Huurtoeslagwet (BWBR0008659), van tekst naar dienst.',
    ],
    gov: 'De wettekst als single source of truth. Verandert de wet, dan verandert de dienst, herleidbaar.',
    route: '/wetten',
    emit: { type: 'wet.published', title: 'Wet gepubliceerd in het corpus' },
  },
  {
    id: 'wet-draaiende-dienst',
    title: 'Wet of beleid uitvoeren, live',
    lead: 'Van wettekst tot geteste draaiende dienst.',
    bullets: [
      'Selecteer de wet en het platform leidt je naar een werkend systeem.',
      'Regels, tests en uitrol, in één doorlopende flow.',
      'De afstand tussen wetgever en uitvoering wordt klein.',
    ],
    route: '/wetten/nieuw',
    drive: { wizard: 'wet' },
  },
  {
    id: 'cli-rp',
    title: 'De CLI: rp',
    lead: 'Het hele platform in één commando.',
    bullets: [
      'Alles wat je klikt kun je ook scripten.',
      'Voor wie liever in de terminal woont dan in een dashboard.',
      'Eén tool die het gebaande pad in tekstvorm geeft.',
    ],
    route: '/cli',
  },
  {
    id: 'llm-afnemen',
    title: 'Soevereine LLM, live',
    lead: 'Een AI-sleutel afnemen die binnen het Rijk blijft.',
    bullets: [
      'Kies een model, een team en het doel, en de gateway regelt de rest.',
      'Prompts en data verlaten de eigen omgeving niet.',
      'AI als platformdienst, met classificatie en herkomst ingebouwd.',
    ],
    gov: 'Een eigen LLM-gateway: geen overheidsdata naar een model van een ander.',
    route: '/ai/llm',
    drive: { wizard: 'llm' },
  },
  {
    id: 'ai-skills',
    title: 'AI en skills',
    lead: 'Code wordt goedkoper, zelf bouwen aantrekkelijker.',
    bullets: [
      'AI maakt zelf bouwen goedkoper dan ooit.',
      'Maar alleen veilig met een goed platform eronder.',
      'Ruig terrein wordt begaanbaar, bergen worden heuvels.',
    ],
    route: '/ai/skills',
    emit: { type: 'ai.skill.installed', title: 'Skill geïnstalleerd voor het team' },
  },
  {
    id: 'platform-als-product',
    title: 'Platform als product',
    lead: 'De begane grond waar iedereen op bouwt.',
    bullets: [
      'Een platform is geen project dat af is, maar een product dat blijft.',
      'Het vergt mandaat en structurele financiering, geen eenmalig budget.',
      'Goed gereedschap trekt goed vakmanschap aan, en houdt het binnen.',
    ],
    route: '/',
    emit: { type: 'deploy.completed', title: 'Platform-release uitgerold' },
  },
  {
    id: 'wrap-up',
    title: 'Dank',
    lead: 'De overheid is een techbedrijf. Laten we ons ook zo organiseren.',
    bullets: [
      'Platform engineering: de gedeelde basislaag waarop teams bouwen.',
      'Begane Grond liet zien hoe dat er voor de Rijksoverheid uitziet.',
    ],
    link: { href: 'https://anneschuth.nl', label: 'anneschuth.nl' },
    full: true,
  },
];
