// The nine layers of the platform, from the physical iron at the bottom to law
// and policy at the top. Single source of truth for the exploded view: the
// stack-zoom viewer and the presentation route's slides both read from here.
//
// The visual is ONE big hand-drawn vertical illustration (img/stack.png, a
// ~3072x5504 ink blueprint of the whole Begane Grond stack with one traceable
// "zorgtoeslag" thread running top to bottom). We zoom INTO this single image,
// one layer at a time. So each layer carries `focusY`: the vertical center of
// that layer within the image, as a fraction 0..1 (0 = top / wet, 1 = bottom /
// iron). These were measured from the label bands in stack.png.
//
// Array order is bottom-to-top of the physical stack (index 0 = iron), which is
// also the order we WALK the tour: we climb from infrastructure up to law.
//
// Each layer carries:
//   key         stable id, used as the slide's `layer` field
//   title       Dutch display name
//   sub         one-line duiding
//   route       the live Begane Grond page shown on the right when active
//   hue         a Rijks-adjacent accent colour (for the progress rail / pill)
//   focusY      vertical center of this layer in stack.png (0=top .. 1=bottom)
//   count/chips live numbers and example names from the Pinia store

export const lagen = [
  {
    key: 'ijzer',
    title: 'Datacenter & ijzer',
    sub: 'Stroom, koeling, netwerk — fysiek staal',
    route: '/fysiek/netwerk',
    hue: '#7c4a23',
    focusY: 0.877,
    count: (s) => s.datacenters.length,
    countLabel: 'datacenters',
    chips: (s) => s.datacenters.slice(0, 3).map((d) => d.name),
  },
  {
    key: 'fundament',
    title: 'Fundament (soevereine cloud)',
    sub: 'De metal-stack op eigen ijzer: racks, machines, bekabeling',
    route: '/fysiek',
    hue: '#b3541e',
    focusY: 0.789,
    count: (s) => s.racks.length,
    countLabel: 'racks',
    chips: (s) => s.datacenters.slice(0, 3).map((d) => d.name),
  },
  {
    key: 'kubernetes',
    title: 'Kubernetes & virtualisatie',
    sub: 'Containers en orchestratie op het fundament',
    // The service catalogus: the "menu" of self-service building blocks, with
    // tier badges and Afnemen-cards. Diensten then shows one being ordered.
    route: '/infra',
    hue: '#1f6f8b',
    focusY: 0.673,
    count: (s) => s.serviceCatalog.length,
    countLabel: 'diensten in catalogus',
    chips: (s) => s.serviceCatalog.slice(0, 3).map((c) => c.name || c.title || c.id),
  },
  {
    key: 'diensten',
    title: 'PaaS: gedeelde diensten',
    sub: 'Golden-path-bouwstenen: FSC, FTV, PostgreSQL, Haven-standaard, CertManager',
    // The order wizard auto-runs here: a PostgreSQL database is taken in a few
    // clicks, live, while we talk — "zelf afnemen, geen ticket" made visible.
    route: '/infra/order/postgres',
    drive: 'order',
    hue: '#0d9488',
    focusY: 0.576,
    count: (s) => s.instances.length,
    countLabel: 'instances',
    chips: (s) => s.instances.slice(0, 3).map((i) => i.name),
  },
  {
    key: 'koppelvlakken',
    title: 'Koppelvlakken & data',
    sub: "API's, datacontracten en basisregistraties",
    route: '/koppelvlakken',
    hue: '#3b6db3',
    focusY: 0.49,
    count: (s) => s.apis.length,
    countLabel: "API's",
    chips: (s) => s.apis.slice(0, 3).map((a) => a.name || a.title || a.id),
  },
  {
    key: 'paden',
    title: 'Gebaande paden & compliance',
    sub: 'Compliance-by-default: gates, standaarden, vangrails',
    route: '/standaarden',
    hue: '#b8860b',
    focusY: 0.4,
    count: (s) => s.standards.length,
    countLabel: 'standaarden',
    chips: (s) => s.standards.slice(0, 3).map((st) => st.name || st.title || st.id),
  },
  {
    key: 'apps',
    title: 'Applicaties & UI',
    sub: 'Wat de burger en ambtenaar gebruikt',
    // The new-app wizard auto-runs: a service is scaffolded from a golden-path
    // template, with repo, CI and infra in one go.
    route: '/apps/nieuw',
    drive: 'app',
    hue: '#2563eb',
    focusY: 0.3,
    count: (s) => s.apps.length,
    countLabel: 'applicaties',
    chips: (s) => s.apps.slice(0, 3).map((a) => a.name),
  },
  {
    key: 'mens',
    title: 'Mens, team & werkplek',
    sub: 'Wie het bouwt en draait, op autonome werkplekken',
    // The workplace wizard auto-runs: an autonomous Linux laptop is rolled out
    // for a colleague, from order to ready.
    route: '/werkplekken/nieuw',
    drive: 'werkplek',
    hue: '#7c3aed',
    focusY: 0.211,
    count: (s) => s.teams.length,
    countLabel: 'teams',
    chips: (s) => s.teams.slice(0, 3).map((t) => t.name),
  },
  {
    key: 'wet',
    title: 'Wet & beleid',
    sub: 'De bron: regels die het systeem uitvoert, als code',
    // The showcase: the law wizard turns a statute into a running service in a
    // few steps — wet-als-code, the summit of the climb.
    route: '/wetten/nieuw',
    drive: 'wet',
    hue: '#9d174d',
    focusY: 0.109,
    count: (s) => s.wetten.length,
    countLabel: 'wetten',
    chips: (s) => s.wetten.slice(0, 3).map((w) => w.name || w.title || w.id),
  },
];

// The single hand-drawn stack illustration that the viewer zooms into. White
// ink on a transparent background, so it floats over the deck's Rijksblauw.
import stackUrl from './img/stack.png';
export const stackImage = stackUrl;

// Lookup a layer (and its array index) by key. Returns null for an unknown key
// (e.g. the hero slide, which has layer: null).
export function layerByKey(key) {
  const index = lagen.findIndex((l) => l.key === key);
  if (index === -1) return null;
  return { ...lagen[index], index };
}

export const LAYER_COUNT = lagen.length;
