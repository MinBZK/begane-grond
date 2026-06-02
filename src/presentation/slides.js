// Slide deck for the "Begane Grond" stage talk about what platform engineering
// is. The left rail (the deck) tells the story; the right side drives the live
// demo app to the matching route, optionally emits an event, runs a wizard, or
// highlights part of the screen.
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
//     note?,               // short speaker note (Dutch), not projected
//   }
//
// All UI text is Dutch; identifiers and comments are English. No clock or
// random APIs are used here (the codebase forbids them); the deck is fully
// static data.

export const slides = [
  {
    id: 'titel',
    title: 'Begane Grond',
    lead: 'Het ontwikkelplatform van de Rijksoverheid.',
    bullets: [
      'Ruig terrein wordt begaanbaar, bergen worden heuvels.',
      'Een vaste laag waarop iedereen bouwt, in plaats van elke keer opnieuw beginnen.',
      'Vandaag: wat platform engineering is, en waarom de overheid het nodig heeft.',
    ],
    route: '/',
    full: true,
    note: 'Rustig openen. De naam is de belofte: de grond onder iedereens voeten effen maken.',
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
    note: 'These van het essay, bijna letterlijk. Begin bij iets dat iedereen kent: een toeslag, een paspoort. Daar zit code achter.',
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
    note: 'Eerste keer dat ik "platform" definieer. Doe het langzaam: de basislaag, niet de app zelf.',
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
    note: 'De kanteling uit het essay. Zelf bouwen wint, mits er een platform onder ligt dat het veilig houdt.',
  },
  {
    id: 'geplaveide-weg',
    title: 'De geplaveide weg',
    lead: 'Golden paths: de makkelijke route is meteen de juiste route.',
    bullets: [
      'Begin niet bij een leeg scherm, maar bij een werkend startpunt.',
      'Nu duurt het 93 dagen om een nieuwe dienst in productie te krijgen.',
      'Met een platform eronder: minuten in plaats van maanden.',
    ],
    route: '/apps/templates',
    note: 'Wijs op de templates rechts. De geplaveide weg is letterlijk klikbaar.',
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
    note: 'De multiplier is het zakelijke argument. 2,3x meer output uit dezelfde mensen.',
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
    note: 'Korte ophanger naar het fysieke deel. We dalen nu af naar de onderste laag.',
  },
  {
    id: 'fysiek-ijzer',
    title: 'Fysiek: het ijzer',
    lead: 'Onder de software staat echte hardware.',
    bullets: [
      'Eigen datacenters, geen black box bij een onbekende leverancier.',
      'Je kunt het rack aanwijzen waarin de dienst draait.',
      'De basis is van onszelf, dus controle blijft binnen.',
    ],
    gov: 'Data blijft in Nederland. Soevereiniteit begint bij het ijzer dat je zelf bezit.',
    route: '/fysiek',
    note: 'Het verrast mensen dat een platform ook tastbaar is. Laat de datacenters zien.',
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
    note: 'Inzoomen op rack r-dh-a1 in Den Haag. Dit is de bodem van de stack.',
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
    note: 'Laat de wizard zelf doorlopen en wijs naar de bel op het moment van de emit.',
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
    note: 'Bruggetje: hoe komt zo’n app er eigenlijk? Dat doen we nu live.',
  },
  {
    id: 'nieuwe-app',
    title: 'Nieuwe app via de geplaveide weg',
    lead: 'Van niets naar een werkend project, live.',
    bullets: [
      'Kies een golden path en de rest staat klaar.',
      'Repository, pipeline en standaarden zitten er al in.',
      'De makkelijke keuze is meteen de veilige keuze.',
    ],
    route: '/apps/nieuw',
    drive: { wizard: 'app' },
    note: 'Laat de NewAppWizard automatisch doorlopen. Benadruk dat compliance al ingebakken is.',
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
    note: 'Forgejo is open source en zelf-gehost. Dat is het hele punt: geen afhankelijkheid van een platform van een ander.',
  },
  {
    id: 'ci-runners',
    title: 'CI-runners',
    lead: 'De machines die de code bouwen en testen.',
    bullets: [
      'Elke wijziging wordt automatisch gebouwd en gecontroleerd.',
      'Capaciteit die je deelt in plaats van per team opnieuw optuigt.',
      'De lopende band onder de geplaveide weg.',
    ],
    route: '/environments/runners',
    note: 'Kort houden. Dit is de motor, niet de show.',
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
    note: 'De gates worden automatisch bevestigd en de deploy-pijplijn draait. Laat de stages oplichten.',
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
    note: 'Het mensen-argument: betere tools houden betere ontwikkelaars binnen.',
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
    note: 'Laat de werkplek-wizard zelf lopen. Het punt: ook hardware-uitrol hoort bij het platform.',
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
    note: 'Opmaat naar het incident. Eerst laten zien dat we kunnen kijken, dan gaat er iets stuk.',
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
    note: 'Wacht even op de rode bel voordat je doorpraat. Dat moment is de demo.',
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
    note: 'Self-service kan eng klinken voor controllers. Dit is het antwoord: volledige kostentransparantie.',
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
    gov: 'BIO als default. Compliance ingebakken in de geplaveide weg, niet als bijlage bij een rapport.',
    route: '/security',
    note: 'Kernzin van het essay: compliance als default. Dit is het hart van het overheidsverhaal.',
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
    highlight: '.rp-page',
    note: 'Paradepaardje één. Het punt: standaarden als code verslaan een stapel beleids-PDF’s.',
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
    note: 'Laat de campagne-wizard lopen. Dit maakt "standaarden als code" concreet: een PR in elke repo.',
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
    note: 'Paradepaardje twee. Wijs op de BRP-velden: bsn, geboortedatum, verblijfadres. Niet "leeftijd", dat staat er niet.',
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
    note: 'De bouwstenen bestaan al. Wat ontbrak is de verbindende laag. Dat is precies wat een platform doet.',
  },
  {
    id: 'wet-naar-systeem',
    title: 'Van wet naar systeem',
    lead: 'De wet zelf is de bron.',
    bullets: [
      'Geharvest uit wetten.overheid.nl, rechtstreeks uit de BWB.',
      'Machine-leesbaar gemaakt, getest en uitgerold.',
      'Bijvoorbeeld de Huurtoeslagwet (BWBR0008659), van tekst naar dienst.',
    ],
    gov: 'De wettekst als single source of truth. Verandert de wet, dan verandert de dienst, herleidbaar.',
    route: '/wetten',
    note: 'Het paradepaardje. De wet is geen los document meer maar de bron van de code.',
  },
  {
    id: 'wet-draaiende-dienst',
    title: 'Wet als draaiende dienst, live',
    lead: 'Van wettekst tot geteste draaiende dienst.',
    bullets: [
      'Selecteer de wet en het platform leidt je naar een werkend systeem.',
      'Regels, tests en uitrol, in één doorlopende flow.',
      'De afstand tussen wetgever en uitvoering wordt klein.',
    ],
    route: '/wetten/nieuw',
    drive: { wizard: 'wet' },
    note: 'Laat de NewWetWizard automatisch lopen. Dit is de meest verrassende demo, geef hem ruimte.',
  },
  {
    id: 'cli-rp',
    title: 'De CLI: rp',
    lead: 'Het hele platform in één commando.',
    bullets: [
      'Alles wat je klikt kun je ook scripten.',
      'Voor wie liever in de terminal woont dan in een dashboard.',
      'Eén tool die de geplaveide weg in tekstvorm geeft.',
    ],
    route: '/cli',
    note: 'Voor de developers in de zaal. rp is het bewijs dat alles ook automatiseerbaar is.',
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
    note: 'Laat de LLM-wizard zelf lopen. Het punt: zelfs AI is een afdwingbare, soevereine platformdienst.',
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
    note: 'De AI-wending uit het essay. Het platform is juist nu cruciaal: het maakt goedkope code ook veilig.',
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
    note: 'Afsluiten waar we begonnen. Terug naar de naam: de begane grond onder de hele Rijksoverheid.',
  },
];
