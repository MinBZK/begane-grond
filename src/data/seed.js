// Rich, interrelated seed data with a Rijksoverheid flavour. This is the
// backbone of the whole demo: every domain reads from here and the entities
// reference each other by id so the cross-layer "click through from X to Y"
// flows work. IDs are stable, human-readable slugs.
//
// Relation model (see plan): person -> team -> app -> instance -> rack ->
// alley -> datacenter; app -> repo -> findings; team -> oncall/incidents/cost.

export const organisations = [
  { id: 'bzk', name: 'Ministerie van BZK', short: 'BZK' },
  { id: 'dictu', name: 'DICTU', short: 'DICTU' },
  { id: 'logius', name: 'Logius', short: 'Logius' },
  { id: 'rvig', name: 'RvIG', short: 'RvIG' },
  { id: 'rijksict', name: 'RijksICT Gilde', short: 'Gilde' },
];

// --- Datacenters / physical ---
export const datacenters = [
  {
    id: 'dc-denhaag', name: 'DC Den Haag', city: 'Den Haag', status: 'operationeel',
    pue: 1.28, redundancy: 'N+1', capacityKw: 1200, usedKw: 740, racks: 48, uplinks: '2× 100GbE',
  },
  {
    id: 'dc-apeldoorn', name: 'DC Apeldoorn', city: 'Apeldoorn', status: 'operationeel',
    pue: 1.34, redundancy: 'N+1', capacityKw: 900, usedKw: 410, racks: 36, uplinks: '2× 100GbE',
  },
  {
    id: 'dc-zwolle', name: 'DC Zwolle', city: 'Zwolle', status: 'in aanbouw',
    pue: 1.22, redundancy: '2N', capacityKw: 1500, usedKw: 0, racks: 0, uplinks: 'gepland',
  },
];

// Alleys (rows) per datacenter with hot/cold aisle orientation.
export const alleys = [
  { id: 'dh-a', dc: 'dc-denhaag', name: 'Rij A', aisle: 'cold', racks: ['r-dh-a1', 'r-dh-a2', 'r-dh-a3'] },
  { id: 'dh-b', dc: 'dc-denhaag', name: 'Rij B', aisle: 'hot', racks: ['r-dh-b1', 'r-dh-b2'] },
  { id: 'ap-a', dc: 'dc-apeldoorn', name: 'Rij A', aisle: 'cold', racks: ['r-ap-a1', 'r-ap-a2'] },
];

// Racks with a unit layout (bottom=1). type: server|switch|pdu|patch|blank.
function units(spec) {
  // spec: array of {u, height, type, label, team, watts, status}
  return spec;
}
export const racks = [
  {
    id: 'r-dh-a1', dc: 'dc-denhaag', alley: 'dh-a', label: 'DH-A1', heightU: 42, team: 'team-platform',
    units: units([
      { u: 1, height: 1, type: 'pdu', label: 'PDU-A', watts: 0, status: 'ok' },
      { u: 2, height: 2, type: 'switch', label: 'leaf-sw-01', watts: 180, status: 'ok' },
      { u: 4, height: 1, type: 'patch', label: 'patchpanel-01', watts: 0, status: 'ok' },
      { u: 6, height: 2, type: 'server', label: 'k8s-node-01', team: 'team-platform', watts: 420, status: 'ok' },
      { u: 8, height: 2, type: 'server', label: 'k8s-node-02', team: 'team-platform', watts: 415, status: 'ok' },
      { u: 10, height: 2, type: 'server', label: 'pg-primary-01', team: 'team-data', watts: 380, status: 'warn' },
      { u: 20, height: 4, type: 'server', label: 'storage-01', team: 'team-platform', watts: 600, status: 'ok' },
    ]),
  },
  {
    id: 'r-dh-a2', dc: 'dc-denhaag', alley: 'dh-a', label: 'DH-A2', heightU: 42, team: 'team-data',
    units: units([
      { u: 1, height: 1, type: 'pdu', label: 'PDU-A', watts: 0, status: 'ok' },
      { u: 2, height: 2, type: 'switch', label: 'leaf-sw-02', watts: 180, status: 'ok' },
      { u: 6, height: 2, type: 'server', label: 'kafka-broker-01', team: 'team-data', watts: 360, status: 'ok' },
      { u: 8, height: 2, type: 'server', label: 'kafka-broker-02', team: 'team-data', watts: 360, status: 'ok' },
      { u: 12, height: 2, type: 'server', label: 'pg-replica-01', team: 'team-data', watts: 370, status: 'ok' },
    ]),
  },
  { id: 'r-dh-a3', dc: 'dc-denhaag', alley: 'dh-a', label: 'DH-A3', heightU: 42, team: 'team-platform', units: units([
      { u: 1, height: 1, type: 'pdu', label: 'PDU-A', watts: 0, status: 'ok' },
      { u: 6, height: 2, type: 'server', label: 'k8s-node-03', team: 'team-platform', watts: 410, status: 'ok' },
  ]) },
  { id: 'r-dh-b1', dc: 'dc-denhaag', alley: 'dh-b', label: 'DH-B1', heightU: 42, team: 'team-burgerzaken', units: units([
      { u: 2, height: 2, type: 'switch', label: 'leaf-sw-03', watts: 175, status: 'ok' },
      { u: 6, height: 2, type: 'server', label: 'app-node-01', team: 'team-burgerzaken', watts: 330, status: 'ok' },
  ]) },
  { id: 'r-dh-b2', dc: 'dc-denhaag', alley: 'dh-b', label: 'DH-B2', heightU: 42, team: 'team-burgerzaken', units: units([]) },
  { id: 'r-ap-a1', dc: 'dc-apeldoorn', alley: 'ap-a', label: 'AP-A1', heightU: 42, team: 'team-platform', units: units([
      { u: 6, height: 2, type: 'server', label: 'k8s-node-ap-01', team: 'team-platform', watts: 400, status: 'ok' },
  ]) },
  { id: 'r-ap-a2', dc: 'dc-apeldoorn', alley: 'ap-a', label: 'AP-A2', heightU: 42, team: 'team-data', units: units([]) },
];

export const cables = [
  { id: 'cab-1', from: 'leaf-sw-01:1', to: 'k8s-node-01:nic0', type: 'DAC', length: '1m', color: 'blauw', status: 'ok' },
  { id: 'cab-2', from: 'leaf-sw-01:2', to: 'k8s-node-02:nic0', type: 'DAC', length: '1m', color: 'blauw', status: 'ok' },
  { id: 'cab-3', from: 'leaf-sw-01:48', to: 'spine-01:12', type: 'OM4', length: '15m', color: 'geel', status: 'ok' },
  { id: 'cab-4', from: 'patchpanel-01:1', to: 'pg-primary-01:nic0', type: 'Cat6a', length: '2m', color: 'groen', status: 'warn' },
];

export const procurement = [
  { id: 'po-2024-031', supplier: 'Dell Technologies', item: '6× R760 server', amount: 84000, lead: '8 wk', status: 'geleverd', dc: 'dc-denhaag' },
  { id: 'po-2024-044', supplier: 'Arista', item: '4× 7050X switch', amount: 52000, lead: '10 wk', status: 'besteld', dc: 'dc-zwolle' },
  { id: 'po-2024-058', supplier: 'Rittal', item: '12× 42U rack', amount: 36000, lead: '6 wk', status: 'offerte', dc: 'dc-zwolle' },
  { id: 'po-2024-061', supplier: 'Schleifenbauer', item: '24× PDU', amount: 19200, lead: '4 wk', status: 'geïnstalleerd', dc: 'dc-apeldoorn' },
];

// --- Infra service catalog + instances ---
export const serviceCatalog = [
  { kind: 'kubernetes', name: 'Kubernetes', icon: 'ship-wheel', tagline: 'Cluster of namespace', tier: 'Gold', priceHint: 'vanaf €120/mnd' },
  { kind: 'postgres', name: 'PostgreSQL', icon: 'cylinder-split', tagline: 'Managed database', tier: 'Gold', priceHint: 'vanaf €60/mnd' },
  { kind: 'kafka', name: 'Kafka', icon: 'folder-stack', tagline: 'Message broker / event streaming', tier: 'Silver', priceHint: 'vanaf €90/mnd' },
  { kind: 'mail', name: 'Mail / SMTP-relay', icon: 'envelope', tagline: 'Transactionele mail', tier: 'Silver', priceHint: 'vanaf €20/mnd' },
  { kind: 'objectstore', name: 'Object storage', icon: 'cloud', tagline: 'S3-compatible opslag', tier: 'Silver', priceHint: 'vanaf €15/mnd' },
  { kind: 'redis', name: 'Redis cache', icon: 'cylinder-split', tagline: 'In-memory cache', tier: 'Bronze', priceHint: 'vanaf €25/mnd' },
  { kind: 'llm', name: 'LLM-API', icon: 'sparkles', tagline: 'Overheids-LLM-gateway', tier: 'Gold', priceHint: 'per 1M tokens' },
];

export const instances = [
  { id: 'pg-burgerzaken-prod', kind: 'postgres', name: 'pg-burgerzaken-prod', team: 'team-burgerzaken', app: 'app-paspoort', env: 'prod', size: 'L', status: 'ready', rack: 'r-dh-a1', dc: 'dc-denhaag', costMonth: 240 },
  { id: 'pg-toeslagen-acc', kind: 'postgres', name: 'pg-toeslagen-acc', team: 'team-toeslagen', app: 'app-toeslagen', env: 'acc', size: 'M', status: 'ready', rack: 'r-dh-a2', dc: 'dc-denhaag', costMonth: 120 },
  { id: 'k8s-platform-prod', kind: 'kubernetes', name: 'k8s-platform-prod', team: 'team-platform', app: null, env: 'prod', size: 'XL', status: 'ready', rack: 'r-dh-a1', dc: 'dc-denhaag', costMonth: 980 },
  { id: 'kafka-toeslagen-prod', kind: 'kafka', name: 'kafka-toeslagen-prod', team: 'team-toeslagen', app: 'app-toeslagen', env: 'prod', size: 'M', status: 'ready', rack: 'r-dh-a2', dc: 'dc-denhaag', costMonth: 180 },
  { id: 'llm-gilde-prod', kind: 'llm', name: 'llm-gilde-prod', team: 'team-platform', app: 'app-platformportaal', env: 'prod', size: 'overheids-llm-l', status: 'ready', rack: null, dc: 'dc-denhaag', costMonth: 320 },
];

// --- Apps / software catalog ---
export const apps = [
  { id: 'app-paspoort', name: 'Paspoortaanvraag', team: 'team-burgerzaken', type: 'service', stack: ['Rust', 'Postgres'], repo: 'repo-paspoort', maturity: 'goud', health: 'ok' },
  { id: 'app-toeslagen', name: 'Toeslagenmotor', team: 'team-toeslagen', type: 'service', stack: ['Rust', 'Kafka', 'Postgres'], repo: 'repo-toeslagen', maturity: 'zilver', health: 'warn' },
  { id: 'app-platformportaal', name: 'Platformportaal', team: 'team-platform', type: 'website', stack: ['Vue', 'NLDD'], repo: 'repo-platformportaal', maturity: 'goud', health: 'ok' },
  { id: 'app-datadeling', name: 'Datadeling-API', team: 'team-data', type: 'service', stack: ['Python', 'Postgres'], repo: 'repo-datadeling', maturity: 'brons', health: 'ok' },
];

export const templates = [
  { id: 'tpl-vue-nldd', name: 'Vue + NLDD frontend', desc: 'SPA met design system, router, CI, a11y-checks', provides: ['Vite', 'NLDD', 'vitest', 'pa11y'] },
  { id: 'tpl-rust-api', name: 'Rust API', desc: 'Axum service met OpenAPI, migrations, BDD', provides: ['axum', 'sqlx', 'cucumber'] },
  { id: 'tpl-python-job', name: 'Python data-job', desc: 'uv-managed batch job met scheduling', provides: ['uv', 'ruff', 'pytest'] },
  { id: 'tpl-astro-docs', name: 'Astro docs-site', desc: 'Documentatiesite met NLDD + Pagefind', provides: ['Astro', 'NLDD', 'Pagefind'] },
];

// --- Code platform (code.overheid.nl) ---
export const repos = [
  { id: 'repo-paspoort', name: 'minbzk/paspoort', visibility: 'intern', lang: 'Rust', stars: 12, openPrs: 2, openIssues: 5, ci: 'green', license: 'EUPL-1.2', app: 'app-paspoort' },
  { id: 'repo-toeslagen', name: 'minbzk/toeslagenmotor', visibility: 'open', lang: 'Rust', stars: 84, openPrs: 6, openIssues: 14, ci: 'red', license: 'EUPL-1.2', app: 'app-toeslagen' },
  { id: 'repo-platformportaal', name: 'rijksict/platformportaal', visibility: 'open', lang: 'Vue', stars: 41, openPrs: 3, openIssues: 7, ci: 'green', license: 'EUPL-1.2', app: 'app-platformportaal' },
  { id: 'repo-datadeling', name: 'logius/datadeling-api', visibility: 'open', lang: 'Python', stars: 23, openPrs: 1, openIssues: 9, ci: 'green', license: 'EUPL-1.2', app: 'app-datadeling' },
  { id: 'repo-stuc', name: 'rijksict/stuc', visibility: 'open', lang: 'Python', stars: 67, openPrs: 0, openIssues: 3, ci: 'green', license: 'EUPL-1.2', app: null },
];

// --- People & teams ---
export const people = [
  { id: 'ans', name: 'Ans Bakker', role: 'Platform engineer', org: 'rijksict', team: 'team-platform', matrix: '@ans:rijk.chat', avatar: 'AB', history: [
    { period: '2023–nu', what: 'Platform engineer, RijksICT Gilde' },
    { period: '2020–2023', what: 'DevOps engineer, DICTU' },
  ] },
  { id: 'joost', name: 'Joost de Vries', role: 'Tech lead', org: 'bzk', team: 'team-burgerzaken', matrix: '@joost:rijk.chat', avatar: 'JV', history: [
    { period: '2021–nu', what: 'Tech lead Burgerzaken, BZK' },
  ] },
  { id: 'fatima', name: 'Fatima El Amrani', role: 'SRE', org: 'rijksict', team: 'team-platform', matrix: '@fatima:rijk.chat', avatar: 'FA', history: [
    { period: '2022–nu', what: 'SRE, RijksICT Gilde' },
  ] },
  { id: 'pieter', name: 'Pieter Jansen', role: 'Data engineer', org: 'logius', team: 'team-data', matrix: '@pieter:rijk.chat', avatar: 'PJ', history: [
    { period: '2019–nu', what: 'Data engineer, Logius' },
  ] },
  { id: 'sanne', name: 'Sanne Visser', role: 'Backend developer', org: 'bzk', team: 'team-toeslagen', matrix: '@sanne:rijk.chat', avatar: 'SV', history: [
    { period: '2023–nu', what: 'Backend developer Toeslagen, BZK' },
  ] },
];

export const teams = [
  { id: 'team-platform', name: 'Platform Engineering', org: 'rijksict', matrix: '#platform:rijk.chat', members: ['ans', 'fatima'], owns: { apps: ['app-platformportaal'], instances: ['k8s-platform-prod', 'llm-gilde-prod'], racks: ['r-dh-a1', 'r-dh-a3', 'r-ap-a1'] }, oncall: 'fatima' },
  { id: 'team-burgerzaken', name: 'Burgerzaken', org: 'bzk', matrix: '#burgerzaken:rijk.chat', members: ['joost'], owns: { apps: ['app-paspoort'], instances: ['pg-burgerzaken-prod'], racks: ['r-dh-b1'] }, oncall: 'joost' },
  { id: 'team-toeslagen', name: 'Toeslagen', org: 'bzk', matrix: '#toeslagen:rijk.chat', members: ['sanne'], owns: { apps: ['app-toeslagen'], instances: ['pg-toeslagen-acc', 'kafka-toeslagen-prod'], racks: [] }, oncall: 'sanne' },
  { id: 'team-data', name: 'Data & koppelvlakken', org: 'logius', matrix: '#data:rijk.chat', members: ['pieter'], owns: { apps: ['app-datadeling'], instances: [], racks: ['r-dh-a2', 'r-ap-a2'] }, oncall: 'pieter' },
];

export const oncall = [
  { team: 'team-platform', person: 'fatima', until: 'ma 9:00', escalation: ['ans'] },
  { team: 'team-burgerzaken', person: 'joost', until: 'ma 9:00', escalation: [] },
  { team: 'team-toeslagen', person: 'sanne', until: 'ma 9:00', escalation: [] },
  { team: 'team-data', person: 'pieter', until: 'ma 9:00', escalation: [] },
];

// --- Workplaces / laptops ---
// Hardware-catalogus over meerdere device-categorieën. `category` groepeert
// (laptop | framework | workstation | tablet | phone); `illustration` kiest de
// gestileerde SVG. Framework- en circulaire modellen dragen duurzaamheidsvelden
// (repareerbaarheidsscore, circulair) die aansluiten op /duurzaamheid en MVI.
export const hardware = [
  // Standaard Linux-laptops
  { id: 'rijkslaptop-linux-14', name: 'Rijkslaptop Linux 14"', category: 'laptop', illustration: 'laptop', cpu: 'AMD Ryzen 7', ram: '32 GB', storage: '1 TB NVMe', stock: 23, lead: '1 wk', price: 1450, repairScore: 7, circular: false },
  { id: 'rijkslaptop-linux-13', name: 'Rijkslaptop Linux 13"', category: 'laptop', illustration: 'laptop', cpu: 'AMD Ryzen 5', ram: '16 GB', storage: '512 GB NVMe', stock: 8, lead: '2 wk', price: 1150, repairScore: 7, circular: false },
  // Framework: modulair en repareerbaar (recht-op-reparatie, circulair)
  { id: 'framework-13', name: 'Framework Laptop 13', category: 'framework', illustration: 'framework', cpu: 'AMD Ryzen 7 7840U', ram: '32 GB', storage: '1 TB NVMe', stock: 14, lead: '1 wk', price: 1599, repairScore: 10, circular: true, note: 'Modulair, onderdelen zelf vervangbaar' },
  { id: 'framework-16', name: 'Framework Laptop 16', category: 'framework', illustration: 'framework', cpu: 'AMD Ryzen 7 7840HS', ram: '64 GB', storage: '2 TB NVMe', stock: 6, lead: '3 wk', price: 2299, repairScore: 10, circular: true, note: 'Uitwisselbare poorten en GPU-module' },
  // Zware developer-workstations
  { id: 'dev-workstation-xl', name: 'Dev-workstation XL', category: 'workstation', illustration: 'workstation', cpu: 'AMD Threadripper (32 cores)', ram: '128 GB', storage: '4 TB NVMe', gpu: 'NVIDIA RTX (24 GB)', stock: 3, lead: '4 wk', price: 4850, repairScore: 8, circular: false, note: 'Voor zware builds, data en ML' },
  { id: 'dev-workstation-m', name: 'Dev-workstation M', category: 'workstation', illustration: 'workstation', cpu: 'AMD Ryzen 9 (16 cores)', ram: '64 GB', storage: '2 TB NVMe', gpu: 'iGPU', stock: 9, lead: '2 wk', price: 2650, repairScore: 8, circular: false },
  // Tablets (veldwerk, inspecteurs) — MDM-beheerd
  { id: 'rijkstablet-11', name: 'Rijkstablet 11"', category: 'tablet', illustration: 'tablet', cpu: 'ARM (8 cores)', ram: '8 GB', storage: '256 GB', stock: 31, lead: '1 wk', price: 720, repairScore: 5, circular: false, note: 'Veldwerk en inspectie, MDM-beheerd' },
  // Diensttelefoons — secure-profiel
  { id: 'rijkstelefoon', name: 'Rijkstelefoon', category: 'phone', illustration: 'phone', cpu: 'ARM (8 cores)', ram: '8 GB', storage: '256 GB', stock: 47, lead: '1 wk', price: 640, repairScore: 6, circular: false, note: 'Secure-profiel, versleuteld' },
];

// Device-categorie-metadata voor groepering/filtering in de catalogus.
export const deviceCategories = [
  { id: 'laptop', label: 'Laptops', icon: 'rectangle-stack' },
  { id: 'framework', label: 'Framework (modulair)', icon: 'puzzle-piece' },
  { id: 'workstation', label: 'Dev-workstations', icon: 'cylinder-split' },
  { id: 'tablet', label: 'Tablets', icon: 'rectangle-stack' },
  { id: 'phone', label: 'Telefoons', icon: 'person' },
];
export const images = [
  { id: 'autonoom-13', name: 'Autonome werkplek 13', base: 'Fedora Silverblue', desc: 'Immutable, MDM, full-disk-encryptie' },
  { id: 'autonoom-12', name: 'Autonome werkplek 12', base: 'Ubuntu LTS', desc: 'Vorige generatie' },
];
export const workplaces = [
  { id: 'wp-0001', person: 'ans', model: 'rijkslaptop-linux-14', image: 'autonoom-13', status: 'in gebruik', lastSeen: '2 min geleden', encrypted: true, updated: true },
  { id: 'wp-0002', person: 'fatima', model: 'rijkslaptop-linux-14', image: 'autonoom-13', status: 'in gebruik', lastSeen: '1 uur geleden', encrypted: true, updated: true },
  { id: 'wp-0003', person: 'sanne', model: 'rijkslaptop-linux-13', image: 'autonoom-13', status: 'provisioning', lastSeen: '—', encrypted: true, updated: false },
];

// --- Operational: environments, incidents, observability, security ---
export const environments = ['dev', 'test', 'acc', 'prod'];
export const deployments = [
  { app: 'app-paspoort', dev: 'v2.4.1', test: 'v2.4.1', acc: 'v2.4.0', prod: 'v2.3.9' },
  { app: 'app-toeslagen', dev: 'v1.9.0', test: 'v1.8.4', acc: 'v1.8.4', prod: 'v1.8.2' },
  { app: 'app-platformportaal', dev: 'v0.7.0', test: 'v0.7.0', acc: 'v0.6.5', prod: 'v0.6.5' },
];
export const releases = [
  { id: 'rel-1', app: 'app-paspoort', version: 'v2.3.9', env: 'prod', by: 'joost', when: 'gisteren 14:22', notes: 'Bugfix in BSN-validatie' },
  { id: 'rel-2', app: 'app-platformportaal', version: 'v0.6.5', env: 'prod', by: 'ans', when: 'gisteren 10:05', notes: 'NLDD bump + nieuwe rack-view' },
];

// CI runner pools (Forgejo Actions runners). The link the platform makes that a
// generic CI host does not: each pool runs on real nodes in a rack in a
// datacenter. `node` is a device label inside `rack`; jobs/capacity drive the
// load bar; `labels` are the runner labels jobs select with (runs-on: ...).
export const runners = [
  {
    id: 'pool-shared', name: 'shared', team: 'team-platform', kind: 'gedeeld',
    labels: ['rijksict-runner', 'linux', 'x64'], status: 'operationeel',
    capacity: 12, running: 7, queued: 3, node: 'k8s-node-01', rack: 'r-dh-a1', dc: 'dc-denhaag',
    os: 'Fedora CoreOS', autoscale: true,
  },
  {
    id: 'pool-arm', name: 'arm64', team: 'team-platform', kind: 'gedeeld',
    labels: ['rijksict-runner', 'linux', 'arm64'], status: 'operationeel',
    capacity: 4, running: 1, queued: 0, node: 'k8s-node-03', rack: 'r-dh-a3', dc: 'dc-denhaag',
    os: 'Fedora CoreOS', autoscale: true,
  },
  {
    id: 'pool-toeslagen', name: 'toeslagen-isolated', team: 'team-toeslagen', kind: 'team',
    labels: ['toeslagen-runner', 'linux', 'x64'], status: 'operationeel',
    capacity: 6, running: 6, queued: 4, node: 'app-node-01', rack: 'r-dh-b1', dc: 'dc-denhaag',
    os: 'Fedora CoreOS', autoscale: false,
  },
  {
    id: 'pool-apeldoorn', name: 'apeldoorn-dr', team: 'team-platform', kind: 'gedeeld',
    labels: ['rijksict-runner', 'linux', 'x64', 'dr'], status: 'stand-by',
    capacity: 8, running: 0, queued: 0, node: 'k8s-node-ap-01', rack: 'r-ap-a1', dc: 'dc-apeldoorn',
    os: 'Fedora CoreOS', autoscale: true,
  },
];

// Recent and running CI jobs across the runner pools (Forgejo Actions).
export const ciJobs = [
  { id: 'job-7781', repo: 'repo-toeslagen', workflow: 'ci.yml', branch: 'feat/kafka-retry', pool: 'pool-toeslagen', status: 'failing', duration: '3m12s', by: 'sanne', at: 'vandaag 09:07' },
  { id: 'job-7780', repo: 'repo-platformportaal', workflow: 'ci.yml', branch: 'main', pool: 'pool-shared', status: 'running', duration: '1m40s', by: 'ans', at: 'zojuist' },
  { id: 'job-7779', repo: 'repo-paspoort', workflow: 'ci.yml', branch: 'feat/machtigingen', pool: 'pool-shared', status: 'queued', duration: '—', by: 'joost', at: 'zojuist' },
  { id: 'job-7778', repo: 'repo-datadeling', workflow: 'ci.yml', branch: 'main', pool: 'pool-shared', status: 'passed', duration: '2m05s', by: 'pieter', at: '12 min geleden' },
  { id: 'job-7777', repo: 'repo-paspoort', workflow: 'deploy.yml', branch: 'main', pool: 'pool-shared', status: 'passed', duration: '4m31s', by: 'joost', at: '1 uur geleden' },
];

export const incidents = [
  { id: 'inc-2024-017', title: 'Verhoogde latency Toeslagenmotor', severity: 'sev2', status: 'mitigated', service: 'app-toeslagen', team: 'team-toeslagen', opened: 'vandaag 09:14', oncall: 'sanne', timeline: [
    { at: '09:14', what: 'Alert: p99 latency > 2s' },
    { at: '09:21', what: 'Kafka-consumer lag vastgesteld' },
    { at: '09:40', what: 'Extra replica bijgeschaald, gemitigeerd' },
  ] },
  { id: 'inc-2024-016', title: 'pg-burgerzaken-prod hoge temperatuur', severity: 'sev3', status: 'resolved', service: 'pg-burgerzaken-prod', team: 'team-burgerzaken', opened: 'gisteren 16:02', oncall: 'joost', timeline: [
    { at: '16:02', what: 'Koeling-alert rack DH-A1 (eigenaar Platform Engineering)' },
    { at: '16:30', what: 'Airflow hersteld, opgelost' },
  ] },
];

export const changes = [
  { id: 'chg-221', title: 'Postgres major upgrade 15→16', risk: 'middel', status: 'goedgekeurd', window: 'za 02:00–04:00', team: 'team-platform' },
  { id: 'chg-222', title: 'Nieuwe leaf-switch DH-A3', risk: 'laag', status: 'in beoordeling', window: 'wo 20:00', team: 'team-platform' },
];

export const alerts = [
  { id: 'al-1', service: 'app-toeslagen', severity: 'warning', text: 'p99 latency boven SLO', since: '34 min' },
  { id: 'al-2', service: 'pg-burgerzaken-prod', severity: 'warning', text: 'disk 78% vol', since: '2 uur' },
];
export const slos = [
  { service: 'app-paspoort', target: 99.9, current: 99.95, budgetLeft: 62 },
  { service: 'app-toeslagen', target: 99.5, current: 99.2, budgetLeft: 8 },
  { service: 'app-platformportaal', target: 99.9, current: 99.99, budgetLeft: 91 },
];

export const vulnerabilities = [
  { id: 'cve-1', cve: 'CVE-2024-3094', severity: 'critical', repo: 'repo-toeslagen', app: 'app-toeslagen', team: 'team-toeslagen', status: 'in behandeling' },
  { id: 'cve-2', cve: 'CVE-2023-44487', severity: 'high', repo: 'repo-datadeling', app: 'app-datadeling', team: 'team-data', status: 'opgelost' },
];
export const complianceControls = ['encryptie', 'logging', 'toegang', 'patch-status', 'back-ups', 'toegankelijkheid'];

// --- Secrets ---
export const secrets = [
  { id: 'sec-1', name: 'paspoort/db-password', type: 'DB-wachtwoord', team: 'team-burgerzaken', rotated: '12 dagen geleden', expires: 'over 78 dagen' },
  { id: 'sec-2', name: 'toeslagen/kafka-api-key', type: 'API-key', team: 'team-toeslagen', rotated: '3 dagen geleden', expires: 'over 87 dagen' },
  { id: 'sec-3', name: 'platform/llm-gateway-key', type: 'API-key', team: 'team-platform', rotated: '1 dag geleden', expires: 'over 89 dagen' },
];
export const certificates = [
  { id: 'cert-1', cn: '*.rijks.app', ca: 'PKIoverheid', expires: 'over 120 dagen', service: 'app-platformportaal' },
  { id: 'cert-2', cn: 'api.datadeling.overheid.nl', ca: 'PKIoverheid', expires: 'over 30 dagen', service: 'app-datadeling' },
];

// --- Koppelvlakken / APIs ---
export const apis = [
  { id: 'api-1', name: 'Paspoort API', version: 'v2', owner: 'team-burgerzaken', adr: true, rateLimit: '100/s', status: 'productie' },
  { id: 'api-2', name: 'Datadeling API', version: 'v1', owner: 'team-data', adr: true, rateLimit: '50/s', status: 'productie' },
  { id: 'api-3', name: 'Toeslagen API', version: 'v1', owner: 'team-toeslagen', adr: false, rateLimit: '20/s', status: 'beta' },
];
export const fscPeers = [
  { id: 'oin-1', org: 'BZK', oin: '00000001823288444000', services: ['Paspoort API'], mode: 'inway' },
  { id: 'oin-2', org: 'Logius', oin: '00000001821002193000', services: ['Datadeling API'], mode: 'inway' },
];

// --- Cost / FinOps ---
export const costByTeam = [
  { team: 'team-platform', month: 1300, trend: '+4%' },
  { team: 'team-burgerzaken', month: 240, trend: '0%' },
  { team: 'team-toeslagen', month: 300, trend: '+12%' },
  { team: 'team-data', month: 0, trend: '0%' },
];
export const budgets = [
  { team: 'team-platform', budget: 1500, spent: 1300 },
  { team: 'team-toeslagen', budget: 280, spent: 300 },
];

// --- Governance ---
export const gates = [
  { id: 'gate-open', name: 'Open-source-tenzij', desc: 'Repo is open of heeft motivatie' },
  { id: 'gate-eupl', name: 'EUPL-licentie', desc: 'Open repos hebben EUPL-1.2' },
  { id: 'gate-wcag', name: 'Toegankelijkheid (WCAG)', desc: 'Frontend voldoet aan WCAG 2.2 AA' },
  { id: 'gate-bio', name: 'Security-baseline (BIO)', desc: 'BIO-controls groen' },
];
export const rfcs = [
  { id: 'rfc-012', title: 'Soevereine LLM-gateway', status: 'geaccepteerd' },
  { id: 'rfc-018', title: 'Autonome Linux-werkplek standaard', status: 'in beoordeling' },
  { id: 'rfc-019', title: 'Fleet-shift campagne-governance', status: 'concept' },
];
export const auditLog = [
  { id: 'a1', actor: 'ans', action: 'infra afgenomen', resource: 'llm-gilde-prod', at: 'di 10:02' },
  { id: 'a2', actor: 'fatima', action: 'secret geroteerd', resource: 'platform/llm-gateway-key', at: 'di 09:40' },
  { id: 'a3', actor: 'joost', action: 'release gepromoot', resource: 'app-paspoort → prod', at: 'gisteren 14:22' },
];

// --- Standards marketplace ---
export const standards = [
  { id: 'std-nldd', name: 'NLDD Design System', kind: 'Design', status: 'voldoet' },
  { id: 'std-internetnl', name: 'internet.nl (web/mail)', kind: 'Internet', status: 'voldoet' },
  { id: 'std-adr', name: 'API Design Rules', kind: 'API', status: 'deels' },
  { id: 'std-bio', name: 'BIO', kind: 'Security', status: 'voldoet' },
  { id: 'std-wcag', name: 'WCAG 2.2 AA', kind: 'Toegankelijkheid', status: 'voldoet' },
];

// --- Notifications ---
export const channels = [
  { id: 'ch-1', team: 'team-platform', type: 'Matrix', target: '#platform:rijk.chat' },
  { id: 'ch-2', team: 'team-toeslagen', type: 'webhook', target: 'https://hooks.toeslagen/…' },
];
export const subscriptions = [
  { id: 'sub-1', team: 'team-platform', event: 'deploy.completed' },
  { id: 'sub-2', team: 'team-platform', event: 'incident.opened' },
  { id: 'sub-3', team: 'team-toeslagen', event: 'cost.budget-exceeded' },
];

// --- Fleet-shift / stuc ---
export const campaigns = [
  { id: 'camp-securitytxt', title: 'Voeg security.txt toe (RFC 9116)', type: 'file-creation', owner: 'team-platform', repos: ['repo-paspoort', 'repo-toeslagen', 'repo-platformportaal', 'repo-datadeling'], status: 'actief', progress: { open: 1, merged: 2, failing: 1 } },
  { id: 'camp-nldd-bump', title: 'Bump NLDD design-system naar 0.9', type: 'regex', owner: 'team-platform', repos: ['repo-platformportaal'], status: 'afgerond', progress: { open: 0, merged: 1, failing: 0 } },
  { id: 'camp-eupl', title: 'Zet EUPL-licentie in elke open repo', type: 'file-creation', owner: 'team-platform', repos: ['repo-toeslagen', 'repo-platformportaal', 'repo-datadeling', 'repo-stuc'], status: 'concept', progress: { open: 0, merged: 0, failing: 0 } },
];

// --- Tech radar ---
export const techRadar = [
  { name: 'Rust', quadrant: 'talen', ring: 'adopt' },
  { name: 'Vue 3', quadrant: 'talen', ring: 'adopt' },
  { name: 'NLDD Design System', quadrant: 'tools', ring: 'adopt' },
  { name: 'Kubernetes', quadrant: 'platforms', ring: 'adopt' },
  { name: 'Kafka', quadrant: 'platforms', ring: 'trial' },
  { name: 'stuc (fleet-shift)', quadrant: 'tools', ring: 'trial' },
  { name: 'Soevereine LLM', quadrant: 'technieken', ring: 'assess' },
  { name: 'Service mesh', quadrant: 'technieken', ring: 'assess' },
  { name: 'Eigen CI-runners', quadrant: 'platforms', ring: 'hold' },
];

// --- LLM models ---
export const llmModels = [
  { id: 'overheids-llm-l', name: 'Overheids-LLM L', host: 'NL (soeverein)', context: '128k', pricePer1m: 2.5, residency: 'Nederland', classification: 'tot Departementaal Vertrouwelijk' },
  { id: 'overheids-llm-s', name: 'Overheids-LLM S', host: 'NL (soeverein)', context: '32k', pricePer1m: 0.8, residency: 'Nederland', classification: 'tot Departementaal Vertrouwelijk' },
  { id: 'claude-gateway', name: 'Claude (via gateway)', host: 'EU', context: '200k', pricePer1m: 9.0, residency: 'EU', classification: 'tot Intern' },
];

// --- Skills-marketplace ---
// Catalogus van AI-assistent-plugins die generatieve AI naar naleving van
// overheidsstandaarden sturen. Naar github.com/developer-overheid-nl/skills-marketplace:
// neutrale marketplace.json als bron, installeerbaar in Claude Code / Cursor.
// Elke plugin bundelt "skills" (geen developer-vaardigheden maar AI-capabilities).
// install: het platform-commando via de rp-CLI (voegt team-context, governance
// en audit toe). altInstall: dezelfde plugin direct in Claude Code / Cursor,
// buiten het platform om. rp gebruikt onder water dezelfde marketplace.
export const skillPlugins = [
  {
    id: 'standaarden', name: 'Logius-standaarden', publisher: 'developer-overheid-nl', skills: 10,
    desc: 'API Design Rules, Digikoppeling, OAuth NL, FSC en andere Logius-standaarden als AI-skills.',
    install: 'rp ai skill install standaarden --team team-platform',
    altInstall: 'claude plugin install standaarden@overheid-plugins',
    standards: ['std-adr'], platforms: ['Claude Code', 'Cursor'], installs: 34,
  },
  {
    id: 'nerds', name: 'NeRDS-richtlijnen', publisher: 'developer-overheid-nl', skills: 14,
    desc: 'De 14 richtlijnen van de Nederlandse Richtlijn Digitale Systemen, van privacy tot open source.',
    install: 'rp ai skill install nerds --team team-platform',
    altInstall: 'claude plugin install nerds@overheid-plugins',
    standards: ['std-bio', 'std-wcag'], platforms: ['Claude Code', 'Cursor'], installs: 28,
  },
  {
    id: 'geo', name: 'Geo-standaarden', publisher: 'developer-overheid-nl', skills: 6,
    desc: 'Geonovum geo-standaarden: OGC API, metadata, informatiemodellen (NEN 3610, IMGeo).',
    install: 'rp ai skill install geo --team team-data',
    altInstall: 'claude plugin install geo@overheid-plugins',
    standards: [], platforms: ['Claude Code', 'Cursor'], installs: 9,
  },
  {
    id: 'internet', name: 'Internetstandaarden', publisher: 'developer-overheid-nl', skills: 5,
    desc: 'internet.nl web- en mailstandaarden: HTTPS, DNSSEC, DMARC, DKIM, SPF, security.txt.',
    install: 'rp ai skill install internet --team team-platform',
    altInstall: 'claude plugin install internet@overheid-plugins',
    standards: ['std-internetnl'], platforms: ['Claude Code', 'Cursor'], installs: 21,
  },
  {
    id: 'design', name: 'NLDD Design System', publisher: 'rijksict', skills: 4,
    desc: 'Skills voor het NLDD design system: componenten kiezen, tokens en toegankelijke patronen.',
    install: 'rp ai skill install design --team team-platform',
    altInstall: 'claude plugin install design@overheid-plugins',
    standards: ['std-nldd'], platforms: ['Claude Code', 'Cursor'], installs: 31,
  },
  {
    id: 'marketplace', name: 'Marketplace-meta', publisher: 'developer-overheid-nl', skills: 2,
    desc: 'Skills om zelf plugins te publiceren en de marketplace.json gesynchroniseerd te houden.',
    install: 'rp ai skill install marketplace --team team-platform',
    altInstall: 'claude plugin install marketplace@overheid-plugins',
    standards: [], platforms: ['Claude Code', 'Cursor'], installs: 6,
  },
];
// Welke teams welke plugins hebben geinstalleerd (per team in de demo).
export const skillInstalls = [
  { team: 'team-platform', plugins: ['standaarden', 'nerds', 'design', 'internet'] },
  { team: 'team-burgerzaken', plugins: ['standaarden', 'nerds'] },
  { team: 'team-toeslagen', plugins: ['standaarden', 'design'] },
  { team: 'team-data', plugins: ['geo', 'standaarden'] },
];

// --- Learning paths ---
export const learningPaths = [
  { id: 'lp-newdev', name: 'Nieuwe developer', steps: ['Account & werkplek', 'Eerste repo clonen', 'Lokaal draaien', 'Eerste PR'] },
  { id: 'lp-prod', name: 'Eerste service in productie', steps: ['App via golden path', 'Infra afnemen', 'CI groen', 'Promoten naar prod'] },
];

// --- Basisregistraties / databronnen ---
// The authoritative data sources that laws and services read from. This is the
// stelsel van basisregistraties: a machine-readable law's `input.source` points
// at one of these (or another law) for values like income or insurance status.
// `kind`: basisregistratie | sectoraal. `fields` are the attributes provided.
export const registers = [
  { id: 'brp', name: 'BRP — Basisregistratie Personen', authority: 'rvig', kind: 'basisregistratie', oin: '00000001003214345001', classification: 'persoonsgegevens (AVG)', availability: '99.95%', status: 'operationeel',
    fields: ['bsn', 'geboortedatum', 'verblijfadres', 'nationaliteit', 'partner', 'overlijdensdatum'] },
  { id: 'brk', name: 'BRK — Basisregistratie Kadaster', authority: 'rvig', kind: 'basisregistratie', oin: '00000001821002193000', classification: 'openbaar met beperkingen', availability: '99.9%', status: 'operationeel',
    fields: ['perceel', 'eigenaar', 'oppervlakte', 'beperkingen'] },
  { id: 'bag', name: 'BAG — Adressen en Gebouwen', authority: 'logius', kind: 'basisregistratie', oin: '00000001821002193001', classification: 'openbaar', availability: '99.9%', status: 'operationeel',
    fields: ['adres', 'verblijfsobject', 'bouwjaar', 'gebruiksdoel', 'oppervlakte'] },
  { id: 'hr', name: 'Handelsregister (KVK)', authority: 'logius', kind: 'basisregistratie', oin: '00000003244440010000', classification: 'openbaar', availability: '99.8%', status: 'operationeel',
    fields: ['kvk-nummer', 'rechtsvorm', 'vestiging', 'sbi-code', 'bestuurders'] },
  { id: 'inkomen', name: 'Inkomensgegevens', authority: 'bzk', kind: 'sectoraal', oin: '00000001823288444000', classification: 'bijzondere persoonsgegevens (AVG)', availability: '99.5%', status: 'operationeel',
    fields: ['toetsingsinkomen', 'verzamelinkomen', 'fiscaal_partner', 'belastingjaar'] },
  { id: 'zorgpolis', name: 'Zorgpolis-status', authority: 'rvig', kind: 'sectoraal', oin: '00000001003214345099', classification: 'bijzondere persoonsgegevens (AVG)', availability: '99.7%', status: 'operationeel',
    fields: ['is_verzekerd', 'polis_status', 'verzekeraar', 'ingangsdatum'] },
  { id: 'kenteken', name: 'Kentekenregister (RDW)', authority: 'logius', kind: 'sectoraal', oin: '00000001809000000001', classification: 'openbaar met beperkingen', availability: '99.6%', status: 'operationeel',
    fields: ['kenteken', 'voertuigsoort', 'tenaamstelling', 'apk-vervaldatum'] },
];

// Which app/law reads which field from which register (the traceability spine).
// `consumer` is an app id or wet id; `via` names the field consumed.
export const registerConsumers = [
  { id: 'rc-1', register: 'inkomen', consumer: 'zorgtoeslagwet', via: 'toetsingsinkomen', type: 'wet' },
  { id: 'rc-2', register: 'zorgpolis', consumer: 'zorgtoeslagwet', via: 'is_verzekerd', type: 'wet' },
  { id: 'rc-3', register: 'brp', consumer: 'zorgtoeslagwet', via: 'partner', type: 'wet' },
  { id: 'rc-4', register: 'brp', consumer: 'app-paspoort', via: 'verblijfadres', type: 'app' },
  { id: 'rc-5', register: 'brp', consumer: 'app-toeslagen', via: 'geboortedatum', type: 'app' },
  { id: 'rc-6', register: 'inkomen', consumer: 'app-toeslagen', via: 'toetsingsinkomen', type: 'app' },
  { id: 'rc-7', register: 'hr', consumer: 'app-datadeling', via: 'kvk-nummer', type: 'app' },
];

// --- Wetten (RegelRecht corpus) ---
// Machine-readable laws. `status`: harvested | in bewerking | enriched |
// gepubliceerd. `coverage` = fraction of the law with executable logic. Each
// article summary carries definitions, open_terms (IoC delegation), inputs with
// a `source` (another wet or a register), and outputs. `service` is the app that
// executes this law; `traject` the active edit workspace.
export const wetten = [
  {
    id: 'zorgtoeslagwet', name: 'Wet op de zorgtoeslag', layer: 'WET', bwbId: 'BWBR0018451',
    url: 'https://wetten.overheid.nl/BWBR0018451/2025-01-01', validFrom: '2025-01-01', version: '2025-01-01',
    status: 'gepubliceerd', coverage: 0.92, owner: 'team-toeslagen', service: 'app-toeslagen', traject: null,
    articles: [
      {
        number: '2', title: 'Hoogte van de zorgtoeslag', legalCharacter: 'BESCHIKKING', decisionType: 'TOEKENNING',
        definitions: [
          { name: 'drempelinkomen_alleenstaande', value: '€ 39.719' },
          { name: 'percentage_toetsingsinkomen', value: '13,7%' },
        ],
        parameters: [{ name: 'bsn', type: 'string', required: true }],
        inputs: [
          { name: 'is_verzekerde', type: 'boolean', source: { kind: 'register', id: 'zorgpolis', output: 'is_verzekerd' } },
          { name: 'toetsingsinkomen', type: 'bedrag', source: { kind: 'register', id: 'inkomen', output: 'toetsingsinkomen' } },
          { name: 'heeft_toeslagpartner', type: 'boolean', source: { kind: 'wet', id: 'awir', output: 'heeft_toeslagpartner' } },
          { name: 'standaardpremie', type: 'bedrag', source: { kind: 'wet', id: 'regeling-standaardpremie', output: 'standaardpremie' } },
        ],
        outputs: [
          { name: 'heeft_recht_op_zorgtoeslag', type: 'boolean' },
          { name: 'hoogte_zorgtoeslag', type: 'bedrag' },
        ],
        openTerms: [{ id: 'standaardpremie', delegatedTo: 'minister', delegationType: 'MINISTERIELE_REGELING' }],
      },
    ],
  },
  {
    id: 'regeling-standaardpremie', name: 'Regeling standaardpremie en bestuursrechtelijke premie', layer: 'MINISTERIELE_REGELING', bwbId: 'BWBR0036515',
    url: 'https://wetten.overheid.nl/BWBR0036515/2025-01-01', validFrom: '2025-01-01', version: '2025-01-01',
    status: 'gepubliceerd', coverage: 1.0, owner: 'team-toeslagen', service: null, traject: null,
    implements: { law: 'zorgtoeslagwet', article: '4', openTerm: 'standaardpremie' },
    articles: [
      {
        number: '1', title: 'Standaardpremie', legalCharacter: 'REGELING', decisionType: null,
        definitions: [{ name: 'standaardpremie', value: '€ 2.112' }],
        parameters: [], inputs: [],
        outputs: [{ name: 'standaardpremie', type: 'bedrag' }],
        openTerms: [],
      },
    ],
  },
  {
    id: 'awir', name: 'Algemene wet inkomensafhankelijke regelingen', layer: 'WET', bwbId: 'BWBR0018472',
    url: 'https://wetten.overheid.nl/BWBR0018472/2025-01-01', validFrom: '2025-01-01', version: '2025-01-01',
    status: 'enriched', coverage: 0.64, owner: 'team-toeslagen', service: null, traject: null,
    articles: [
      {
        number: '3', title: 'Toeslagpartner', legalCharacter: 'TOETS', decisionType: null,
        definitions: [],
        parameters: [{ name: 'bsn', type: 'string', required: true }],
        inputs: [{ name: 'partner', type: 'string', source: { kind: 'register', id: 'brp', output: 'partner' } }],
        outputs: [{ name: 'heeft_toeslagpartner', type: 'boolean' }],
        openTerms: [],
      },
    ],
  },
  {
    id: 'huurtoeslagwet', name: 'Wet op de huurtoeslag', layer: 'WET', bwbId: 'BWBR0008659',
    url: 'https://wetten.overheid.nl/BWBR0008659/2025-01-01', validFrom: '2025-01-01', version: '2025-01-01',
    status: 'harvested', coverage: 0.0, owner: 'team-toeslagen', service: null, traject: null,
    articles: [
      {
        number: '1', title: 'Begripsbepalingen', legalCharacter: null, decisionType: null,
        definitions: [], parameters: [], inputs: [], outputs: [], openTerms: [],
      },
    ],
  },
];

// --- Trajecten (RegelRecht edit workspaces) ---
export const trajecten = [
  { id: 'awir-3f2a9c01', name: 'AWIR toeslagpartner-logica', wet: 'awir', status: 'in review', branch: 'awir-3f2a9c01', members: ['sanne', 'joost'], team: 'team-toeslagen', opened: 'di 11:00' },
  { id: 'huurtoeslag-7b1e4d22', name: 'Huurtoeslagwet machine-leesbaar', wet: 'huurtoeslagwet', status: 'concept', branch: 'huurtoeslag-7b1e4d22', members: ['sanne'], team: 'team-toeslagen', opened: 'vandaag 08:30' },
];

// --- BDD-scenario's per wet (Given/When/Then) ---
export const scenarios = [
  { id: 'sc-1', wet: 'zorgtoeslagwet', name: 'Alleenstaande boven 18 heeft recht (2025)', given: ['rekendatum 2025-01-01', 'verzekerd via zorgpolis', 'toetsingsinkomen € 25.000', 'geen toeslagpartner'], then: 'recht op zorgtoeslag, hoogte € 2.096,92', status: 'pass' },
  { id: 'sc-2', wet: 'zorgtoeslagwet', name: 'Inkomen boven grens: geen recht', given: ['rekendatum 2025-01-01', 'verzekerd', 'toetsingsinkomen € 45.000'], then: 'geen recht op zorgtoeslag', status: 'pass' },
  { id: 'sc-3', wet: 'zorgtoeslagwet', name: 'Niet verzekerd: geen recht', given: ['rekendatum 2025-01-01', 'niet verzekerd via zorgpolis'], then: 'geen recht op zorgtoeslag', status: 'pass' },
  { id: 'sc-4', wet: 'awir', name: 'Gehuwd: heeft toeslagpartner', given: ['partner geregistreerd in BRP'], then: 'heeft_toeslagpartner = waar', status: 'pass' },
];
