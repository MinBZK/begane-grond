# Begane Grond

> [!WARNING]
> **Dit is een verkenning, geen product.** Begane Grond is een proof of concept:
> een klikbare demo om een idee te laten zien en het gesprek erover te voeren.
> Het is **geen werkend platform**, er is **geen backend**, en niets hiervan
> draait in productie of is door iemand vastgesteld als beleid of richting.
> Lees dit als een schets aan de muur, niet als een aankondiging.

Een klikbare demo van een **internal developer platform** voor de Nederlandse
Rijksoverheid. Het laat zien hoe Platform Engineering bij de overheid eruit
*zou kunnen* zien: van fysieke racks en kabels, via self-service
infrastructuurdiensten, tot applicaties, teams, on-call en autonome
Linux-werkplekken. Gebouwd met het
[NLDD design system](https://www.npmjs.com/package/@nldd/design-system).

## Wat dit wél is

- Een **idee**, uitgewerkt ver genoeg om het te kunnen aanwijzen en bespreken.
- Een **proof of concept** die laat zien hoe de stukken in elkaar zouden grijpen.
- Een **demo** die je doorheen kunt klikken om het verhaal te volgen.
- Een **gespreksstarter** voor wie nadenkt over platform engineering bij de overheid.

## Wat dit niet is

- **Geen product.** Er zit geen team, roadmap of support achter.
- **Geen backend.** Alle data leeft in een in-memory store. Edits muteren live
  en **resetten bij een refresh**. Wizards en provisioning-acties lopen
  end-to-end door met gefakede status-overgangen. Er gebeurt niets echts.
- **Geen beleid of besluit.** Dit vertegenwoordigt geen standpunt, richting of
  toezegging van het ministerie van BZK of welke organisatie dan ook.
- **Geen architectuurvoorstel om te bouwen.** De keuzes hierin zijn gemaakt om
  het verhaal te vertellen, niet om productie-rijp te zijn.

Het bevat ook een **presentatiemodus** (`Shift+P`): een slide-deck dat de live
demo aanstuurt. Het deck navigeert mee, draait wizards af en licht delen van het
scherm op, zodat het verhaal en de werkende demo naast elkaar lopen.

## Draaien

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # productie-build naar dist/
npm run preview  # serveer de productie-build
```

## Wat zit erin

Eén SPA met een wave-gegroepeerde navigatie over ruim veertig domeinen, ingedeeld
in zeven groepen. De ruggengraat is één cross-laag relatie-model, zodat je door
kunt klikken van persoon naar team naar app naar instance naar rack naar datacenter.

**Bouwen & draaien** — Fysieke infra (datacenter-floorplan met hot/cold-aisle,
rack-elevatie, bekabeling, netwerk, inkoop), Infra-diensten (k8s/Postgres/Kafka/mail/LLM,
self-service afname-wizard), Applicaties (software-catalogus, golden-path
scaffolding-wizard), Code (code.overheid.nl), Componenten.

**Uitrollen & draaien** — Omgevingen & promotie, CI-pijplijn, CI-runners, Artefacten
(SBOM, handtekeningen), Feature flags, Observability, Incidenten & changes.

**Mensen & werkplek** — Teams & mensen (org, on-call, Matrix), Werkplekken (autonome
Linux-laptops, hardware, provisioning), Leren.

**Toegang & beveiliging** — Inloggen, Domeinen & DNS, Certificaten, Secrets, Security.

**Data & koppelvlakken** — Basisregistraties, Datasets, Datacontracten, Koppelvlakken
(Digikoppeling/FSC), Notificaties.

**Governance & standaarden** — Governance & audit-log, Wet uitvoeren (wet als code),
Standaarden, Algoritmeregister, Privacy & DPIA, Woo & archief, Toegankelijkheid, Duurzaamheid.

**Platform, kosten & AI** — Infra als code, Kosten/FinOps, Software-inkoop, Scorecards, Tech
radar, AI & AI-assisted coding + LLM-API's, CLI & API-first, Fleet-shift (vloot-brede
code-transformaties, naar het model van [stuc](https://github.com/RijksICTGilde/stuc) en
Spotify Fleetshift).

**Alles is code.** Elke wizard en elke knop schrijft een commit naar één config-repo
(`platform-config`): infra afnemen, een release promoten, een secret roteren. De pagina
**Infra als code** toont die commit-log met diffs en de gewenste staat versus drift; vanaf
elke commit klik je door naar de repository op `/code`. Niets verandert buiten een commit om.
(Ook dit is gefaked, het illustreert het patroon.)

Een terugkerend patroon: onder elke actie en wizard-eindscherm staat het equivalente
`bg`-CLI-commando met copy-knop. Het portaal is maar één interface; het idee is dat alles
ook API-first zou zijn.

## Stack

Vue 3 (SFC, `<script setup>`) + Vite + `@nldd/design-system` (Lit web components) + Pinia +
vue-router + `@vue-flow/core` voor grafen.

## Structuur

```
src/
  main.js, App.vue, router.js, nav.js   # bootstrap, routing, navigatie-bron
  components/
    AppShell.vue                        # chrome: nav, thema, command-palette
    shared/                             # PageHeader, StatusBadge, MetricCard,
                                        # CliHint, RelationLinks, DataTable, Wizard
  domains/<domein>/                     # één map per domein met zijn views
  stores/index.js                       # in-memory Pinia store + fake provisioning
  data/seed.js                          # rijke, onderling gerelateerde seed-data
  styles/app.css                        # fonts + app-chrome CSS
```

## Status & contact

Een experiment van [Anne Schuth](https://github.com/anneschuth). Vragen, ideeën of
kritiek zijn welkom via een issue. Verwacht geen onderhoud, releases of antwoorden
binnen een bepaalde termijn: dit is en blijft een verkenning.
