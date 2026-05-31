# Rijksplatform

Een klikbare demo van een **internal developer platform** voor de Nederlandse
Rijksoverheid. Het laat zien hoe Platform Engineering bij de overheid kan werken: van
fysieke racks en kabels, via self-service infrastructuurdiensten, tot applicaties, teams,
on-call en autonome Linux-werkplekken. Gebouwd met het
[NLDD design system](https://www.npmjs.com/package/@nldd/design-system).

> Dit is een **mock-up**: er is geen echte backend. Alle data leeft in een in-memory store,
> edits muteren live en resetten bij een refresh. Wizards en provisioning-acties lopen
> end-to-end door met gefakede status-overgangen.

## Draaien

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # productie-build naar dist/
npm run preview  # serveer de productie-build
```

## Wat zit erin

Eén SPA met een wave-gegroepeerde navigatie over 25 domeinen. De ruggengraat is één
cross-laag relatie-model, zodat je door kunt klikken van persoon naar team naar app naar
instance naar rack naar datacenter.

**Bouwen & draaien** — Overzicht, Fysieke infra (datacenter-floorplan met hot/cold-aisle,
rack-elevatie, bekabeling, netwerk, inkoop), Infra-diensten (k8s/Postgres/Kafka/mail/LLM,
self-service afname-wizard), Applicaties (software-catalogus, golden-path scaffolding-wizard),
Code (code.overheid.nl), Teams & mensen (org, on-call, Matrix), Werkplekken (autonome
Linux-laptops, hardware, provisioning).

**Beheren** — Omgevingen & promotie, Observability, Incidenten & changes, Secrets, Security.

**Governance & standaarden** — Kosten/FinOps, Koppelvlakken (Digikoppeling/FSC), Governance
& audit-log, Standaarden-marktplaats, Notificaties, Duurzaamheid.

**Platform & AI** — Mijn spullen, Fleet-shift (vloot-brede code-transformaties, naar het
model van [stuc](https://github.com/RijksICTGilde/stuc) en Spotify Fleetshift), AI &
AI-assisted coding + LLM-API's, CLI & API-first, Tech radar, Scorecards, Leren.

Een terugkerend patroon: onder elke actie en wizard-eindscherm staat het equivalente
`rp`-CLI-commando met copy-knop. Het portaal is maar één interface; alles is ook API-first.

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
