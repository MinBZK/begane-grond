// Single source of truth for the platform's navigation + routing.
//
// Each top-level domain has: a key, a path, a label, an NLDD icon name, the
// build "wave" it belongs to (A core / B operational / C governance / D
// modern), and its sub-routes. The router (router.js) and the side navigation
// (AppShell.vue) both read this so adding a screen is a one-line change.
//
// `component` is a lazy import of a Vue view under src/domains/<domain>/. The
// foundation ships placeholder views; domain agents replace them in place.

export const domains = [
  {
    key: 'home',
    path: '/',
    label: 'Overzicht',
    icon: 'house',
    wave: 'A',
    routes: [
      { path: '/', name: 'home', view: () => import('./domains/home/Dashboard.vue'), title: 'Overzicht' },
    ],
  },
  {
    key: 'zelf',
    path: '/zelf',
    label: 'Mijn spullen',
    icon: 'person',
    wave: 'D',
    routes: [
      { path: '/zelf', name: 'zelf', view: () => import('./domains/zelf/MyDashboard.vue'), title: 'Mijn spullen' },
    ],
  },
  {
    key: 'fysiek',
    path: '/fysiek',
    label: 'Fysieke infra',
    icon: 'apartment-building',
    wave: 'A',
    routes: [
      { path: '/fysiek', name: 'fysiek', view: () => import('./domains/fysiek/Datacenters.vue'), title: 'Datacenters' },
      { path: '/fysiek/datacenters/:dc', name: 'fysiek-dc', view: () => import('./domains/fysiek/DatacenterDetail.vue'), title: 'Datacenter' },
      { path: '/fysiek/datacenters/:dc/floor', name: 'fysiek-floor', view: () => import('./domains/fysiek/Floorplan.vue'), title: 'Zaalindeling' },
      { path: '/fysiek/racks/:rack', name: 'fysiek-rack', view: () => import('./domains/fysiek/RackElevation.vue'), title: 'Rack' },
      { path: '/fysiek/netwerk', name: 'fysiek-netwerk', view: () => import('./domains/fysiek/NetworkTopology.vue'), title: 'Netwerk' },
      { path: '/fysiek/inkoop', name: 'fysiek-inkoop', view: () => import('./domains/fysiek/Inkoop.vue'), title: 'Inkoop & planning' },
    ],
  },
  {
    key: 'infra',
    path: '/infra',
    label: 'Infra-diensten',
    icon: 'cylinder-split',
    wave: 'A',
    routes: [
      { path: '/infra', name: 'infra', view: () => import('./domains/infra/Catalog.vue'), title: 'Service-catalogus' },
      { path: '/infra/order/:kind', name: 'infra-order', view: () => import('./domains/infra/OrderWizard.vue'), title: 'Dienst afnemen' },
      { path: '/infra/instances', name: 'infra-instances', view: () => import('./domains/infra/Instances.vue'), title: 'Instances' },
      { path: '/infra/instances/:id', name: 'infra-instance', view: () => import('./domains/infra/InstanceDetail.vue'), title: 'Instance' },
    ],
  },
  {
    key: 'apps',
    path: '/apps',
    label: 'Applicaties',
    icon: 'rectangle-stack',
    wave: 'A',
    routes: [
      { path: '/apps', name: 'apps', view: () => import('./domains/apps/Catalog.vue'), title: 'Software-catalogus' },
      { path: '/apps/nieuw', name: 'apps-nieuw', view: () => import('./domains/apps/NewAppWizard.vue'), title: 'Nieuwe applicatie' },
      { path: '/apps/templates', name: 'apps-templates', view: () => import('./domains/apps/Templates.vue'), title: 'Golden paths' },
      { path: '/apps/:id', name: 'apps-detail', view: () => import('./domains/apps/AppDetail.vue'), title: 'Applicatie' },
    ],
  },
  {
    key: 'code',
    path: '/code',
    label: 'Code',
    icon: 'chevron-left-forward-slash-chevron-right',
    wave: 'A',
    routes: [
      { path: '/code', name: 'code', view: () => import('./domains/code/RepoList.vue'), title: 'code.overheid.nl' },
      { path: '/code/:repo', name: 'code-repo', view: () => import('./domains/code/RepoDetail.vue'), title: 'Repository' },
    ],
  },
  {
    key: 'teams',
    path: '/teams',
    label: 'Teams & mensen',
    icon: 'person-2',
    wave: 'A',
    routes: [
      { path: '/teams', name: 'teams', view: () => import('./domains/teams/Teams.vue'), title: 'Teams' },
      { path: '/teams/mensen', name: 'teams-mensen', view: () => import('./domains/teams/People.vue'), title: 'Mensen' },
      { path: '/teams/mensen/:id', name: 'teams-persoon', view: () => import('./domains/teams/PersonDetail.vue'), title: 'Persoon' },
      { path: '/teams/organisatie', name: 'teams-org', view: () => import('./domains/teams/OrgGraph.vue'), title: 'Organisatie' },
      { path: '/teams/on-call', name: 'teams-oncall', view: () => import('./domains/teams/OnCall.vue'), title: 'On-call' },
      { path: '/teams/:id', name: 'teams-detail', view: () => import('./domains/teams/TeamDetail.vue'), title: 'Team' },
    ],
  },
  {
    key: 'werkplekken',
    path: '/werkplekken',
    label: 'Werkplekken',
    icon: 'rectangle-stack',
    wave: 'A',
    routes: [
      { path: '/werkplekken', name: 'werkplekken', view: () => import('./domains/werkplekken/Fleet.vue'), title: 'Werkplek-vloot' },
      { path: '/werkplekken/hardware', name: 'werkplekken-hardware', view: () => import('./domains/werkplekken/Hardware.vue'), title: 'Hardware-catalogus' },
      { path: '/werkplekken/nieuw', name: 'werkplekken-nieuw', view: () => import('./domains/werkplekken/NewWorkplaceWizard.vue'), title: 'Werkplek uitrollen' },
      { path: '/werkplekken/:id', name: 'werkplekken-detail', view: () => import('./domains/werkplekken/WorkplaceDetail.vue'), title: 'Werkplek' },
    ],
  },
  {
    key: 'environments',
    path: '/environments',
    label: 'Omgevingen',
    icon: 'arrow-up-arrow-down',
    wave: 'B',
    routes: [
      { path: '/environments', name: 'environments', view: () => import('./domains/environments/EnvMatrix.vue'), title: 'Omgevingen' },
      { path: '/environments/promotie/:app', name: 'environments-promotie', view: () => import('./domains/environments/PromotionWizard.vue'), title: 'Promoten' },
      { path: '/environments/releases', name: 'environments-releases', view: () => import('./domains/environments/Releases.vue'), title: 'Releases' },
    ],
  },
  {
    key: 'observability',
    path: '/observability',
    label: 'Observability',
    icon: 'eye',
    wave: 'B',
    routes: [
      { path: '/observability', name: 'observability', view: () => import('./domains/observability/Dashboards.vue'), title: 'Dashboards' },
      { path: '/observability/logs', name: 'observability-logs', view: () => import('./domains/observability/Logs.vue'), title: 'Logs' },
      { path: '/observability/traces', name: 'observability-traces', view: () => import('./domains/observability/Traces.vue'), title: 'Traces' },
      { path: '/observability/alerts', name: 'observability-alerts', view: () => import('./domains/observability/Alerts.vue'), title: 'Alerts & SLO' },
    ],
  },
  {
    key: 'incidenten',
    path: '/incidenten',
    label: 'Incidenten',
    icon: 'exclamation-triangle',
    wave: 'B',
    routes: [
      { path: '/incidenten', name: 'incidenten', view: () => import('./domains/incidenten/Incidents.vue'), title: 'Incidenten' },
      { path: '/incidenten/status', name: 'incidenten-status', view: () => import('./domains/incidenten/StatusPage.vue'), title: 'Status' },
      { path: '/incidenten/changes', name: 'incidenten-changes', view: () => import('./domains/incidenten/Changes.vue'), title: 'Changes' },
      { path: '/incidenten/:id', name: 'incidenten-detail', view: () => import('./domains/incidenten/IncidentDetail.vue'), title: 'Incident' },
    ],
  },
  {
    key: 'secrets',
    path: '/secrets',
    label: 'Secrets',
    icon: 'lock-closed',
    wave: 'B',
    routes: [
      { path: '/secrets', name: 'secrets', view: () => import('./domains/secrets/Vault.vue'), title: 'Secrets-kluis' },
      { path: '/secrets/certificaten', name: 'secrets-certs', view: () => import('./domains/secrets/Certificates.vue'), title: 'Certificaten' },
    ],
  },
  {
    key: 'security',
    path: '/security',
    label: 'Security',
    icon: 'shield-check-mark',
    wave: 'B',
    routes: [
      { path: '/security', name: 'security', view: () => import('./domains/security/ComplianceScorecards.vue'), title: 'Compliance' },
      { path: '/security/kwetsbaarheden', name: 'security-vulns', view: () => import('./domains/security/Vulnerabilities.vue'), title: 'Kwetsbaarheden' },
      { path: '/security/scans', name: 'security-scans', view: () => import('./domains/security/Scans.vue'), title: 'Scans & audits' },
    ],
  },
  {
    key: 'kosten',
    path: '/kosten',
    label: 'Kosten',
    icon: 'euro-sign',
    wave: 'C',
    routes: [
      { path: '/kosten', name: 'kosten', view: () => import('./domains/kosten/CostOverview.vue'), title: 'Kosten' },
      { path: '/kosten/budgetten', name: 'kosten-budgetten', view: () => import('./domains/kosten/Budgets.vue'), title: 'Budgetten' },
    ],
  },
  {
    key: 'koppelvlakken',
    path: '/koppelvlakken',
    label: 'Koppelvlakken',
    icon: 'link',
    wave: 'C',
    routes: [
      { path: '/koppelvlakken', name: 'koppelvlakken', view: () => import('./domains/koppelvlakken/ApiCatalog.vue'), title: 'API-catalogus' },
      { path: '/koppelvlakken/fsc', name: 'koppelvlakken-fsc', view: () => import('./domains/koppelvlakken/Digikoppeling.vue'), title: 'Digikoppeling / FSC' },
    ],
  },
  {
    key: 'governance',
    path: '/governance',
    label: 'Governance',
    icon: 'certificate',
    wave: 'C',
    routes: [
      { path: '/governance', name: 'governance', view: () => import('./domains/governance/Gates.vue'), title: 'Beleids-gates' },
      { path: '/governance/rfcs', name: 'governance-rfcs', view: () => import('./domains/governance/Rfcs.vue'), title: "RFC's" },
      { path: '/governance/audit', name: 'governance-audit', view: () => import('./domains/governance/AuditLog.vue'), title: 'Audit-log' },
    ],
  },
  {
    key: 'standaarden',
    path: '/standaarden',
    label: 'Standaarden',
    icon: 'check-mark-circle',
    wave: 'C',
    routes: [
      { path: '/standaarden', name: 'standaarden', view: () => import('./domains/standaarden/ComplianceMarketplace.vue'), title: 'Standaarden' },
    ],
  },
  {
    key: 'notificaties',
    path: '/notificaties',
    label: 'Notificaties',
    icon: 'envelope',
    wave: 'C',
    routes: [
      { path: '/notificaties', name: 'notificaties', view: () => import('./domains/notificaties/Channels.vue'), title: 'Notificaties' },
    ],
  },
  {
    key: 'fleet',
    path: '/fleet',
    label: 'Fleet-shift',
    icon: 'folder-stack',
    wave: 'D',
    routes: [
      { path: '/fleet', name: 'fleet', view: () => import('./domains/fleet/Campaigns.vue'), title: 'Campagnes' },
      { path: '/fleet/nieuw', name: 'fleet-nieuw', view: () => import('./domains/fleet/NewCampaignWizard.vue'), title: 'Nieuwe campagne' },
      { path: '/fleet/:id', name: 'fleet-detail', view: () => import('./domains/fleet/CampaignDetail.vue'), title: 'Campagne' },
    ],
  },
  {
    key: 'ai',
    path: '/ai',
    label: 'AI & LLM',
    icon: 'sparkles',
    wave: 'D',
    routes: [
      { path: '/ai', name: 'ai', view: () => import('./domains/ai/AiCoding.vue'), title: 'AI-assisted coding' },
      { path: '/ai/llm', name: 'ai-llm', view: () => import('./domains/ai/LlmCatalog.vue'), title: 'LLM-API’s' },
    ],
  },
  {
    key: 'cli',
    path: '/cli',
    label: 'CLI & API',
    icon: 'terminal',
    wave: 'D',
    routes: [
      { path: '/cli', name: 'cli', view: () => import('./domains/cli/CliShowcase.vue'), title: 'CLI' },
      { path: '/cli/api', name: 'cli-api', view: () => import('./domains/cli/ApiExplorer.vue'), title: 'API-explorer' },
    ],
  },
  {
    key: 'tech-radar',
    path: '/tech-radar',
    label: 'Tech radar',
    icon: 'ship-wheel',
    wave: 'D',
    routes: [
      { path: '/tech-radar', name: 'tech-radar', view: () => import('./domains/tech-radar/Radar.vue'), title: 'Tech radar' },
    ],
  },
  {
    key: 'scorecards',
    path: '/scorecards',
    label: 'Scorecards',
    icon: 'starburst-filled',
    wave: 'D',
    routes: [
      { path: '/scorecards', name: 'scorecards', view: () => import('./domains/scorecards/MaturityScorecards.vue'), title: 'Scorecards' },
    ],
  },
  {
    key: 'leren',
    path: '/leren',
    label: 'Leren',
    icon: 'books-vertical',
    wave: 'D',
    routes: [
      { path: '/leren', name: 'leren', view: () => import('./domains/leren/Onboarding.vue'), title: 'Leren & onboarding' },
    ],
  },
  {
    key: 'duurzaamheid',
    path: '/duurzaamheid',
    label: 'Duurzaamheid',
    icon: 'heart',
    wave: 'C',
    routes: [
      { path: '/duurzaamheid', name: 'duurzaamheid', view: () => import('./domains/duurzaamheid/GreenIt.vue'), title: 'Green IT' },
    ],
  },
];

// Flatten to vue-router route records.
export const routes = domains.flatMap((d) =>
  d.routes.map((r) => ({
    path: r.path,
    name: r.name,
    component: r.view,
    meta: { title: r.title, domain: d.key },
  })),
);

// Wave labels for grouping in the side navigation.
export const waveLabels = {
  A: 'Bouwen & draaien',
  B: 'Beheren',
  C: 'Governance & standaarden',
  D: 'Platform & AI',
};
