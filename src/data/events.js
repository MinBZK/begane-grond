// The platform event catalog: every event type the platform can emit, grouped
// by the domain (source) it comes from. This is the registry that makes the
// notification system feel complete: it is fed by ALL of the platform.
//
// Each entry: { type, source, label, severity, icon }. `severity` is the
// default; an emitter may override it (a deploy that fails is critical). The
// CloudEvents `type` follows reverse-dotted naming (domain.action).

export const SEVERITIES = ['info', 'success', 'warning', 'critical'];

export const eventCatalog = [
  // Infra
  {
    type: 'infra.instance.requested',
    source: 'infra',
    label: 'Dienst aangevraagd',
    severity: 'info',
    icon: 'cylinder-split',
  },
  {
    type: 'infra.instance.ready',
    source: 'infra',
    label: 'Dienst gereed',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'infra.instance.scaled',
    source: 'infra',
    label: 'Dienst geschaald',
    severity: 'info',
    icon: 'arrow-up-arrow-down',
  },
  {
    type: 'infra.instance.deleted',
    source: 'infra',
    label: 'Dienst verwijderd',
    severity: 'warning',
    icon: 'dismiss-circle',
  },
  // Apps / golden path
  {
    type: 'app.created',
    source: 'apps',
    label: 'Applicatie aangemaakt',
    severity: 'success',
    icon: 'rectangle-stack',
  },
  // Koppelvlakken / API golden path
  {
    type: 'api.created',
    source: 'koppelvlakken',
    label: 'Koppelvlak aangemaakt',
    severity: 'success',
    icon: 'link',
  },
  // Environments / deploy
  {
    type: 'deploy.started',
    source: 'environments',
    label: 'Deploy gestart',
    severity: 'info',
    icon: 'arrow-up-arrow-down',
  },
  {
    type: 'deploy.completed',
    source: 'environments',
    label: 'Deploy voltooid',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'deploy.failed',
    source: 'environments',
    label: 'Deploy mislukt',
    severity: 'critical',
    icon: 'exclamation-triangle',
  },
  {
    type: 'release.promoted',
    source: 'environments',
    label: 'Release gepromoot',
    severity: 'info',
    icon: 'arrow-up-arrow-down',
  },
  {
    type: 'pipeline.passed',
    source: 'environments',
    label: 'Pijplijn groen',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'pipeline.failed',
    source: 'environments',
    label: 'Pijplijn rood',
    severity: 'critical',
    icon: 'exclamation-triangle',
  },
  // CI runners (Forgejo Actions runners on physical nodes)
  {
    type: 'runner.scaled',
    source: 'environments',
    label: 'Runner-pool geschaald',
    severity: 'info',
    icon: 'gear',
  },
  {
    type: 'runner.online',
    source: 'environments',
    label: 'Runner-pool online',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'runner.offline',
    source: 'environments',
    label: 'Runner-pool offline',
    severity: 'warning',
    icon: 'exclamation-triangle',
  },
  {
    type: 'runner.saturated',
    source: 'environments',
    label: 'Runner-pool vol',
    severity: 'warning',
    icon: 'exclamation-circle',
  },
  // Incidents
  {
    type: 'incident.opened',
    source: 'incidenten',
    label: 'Incident geopend',
    severity: 'critical',
    icon: 'exclamation-triangle',
  },
  {
    type: 'incident.acknowledged',
    source: 'incidenten',
    label: 'Incident bevestigd',
    severity: 'warning',
    icon: 'eye',
  },
  {
    type: 'incident.mitigated',
    source: 'incidenten',
    label: 'Incident gemitigeerd',
    severity: 'warning',
    icon: 'shield-check-mark',
  },
  {
    type: 'incident.resolved',
    source: 'incidenten',
    label: 'Incident opgelost',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'change.requested',
    source: 'incidenten',
    label: 'Wijziging aangevraagd',
    severity: 'info',
    icon: 'calendar-event',
  },
  {
    type: 'change.approved',
    source: 'incidenten',
    label: 'Wijziging goedgekeurd',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  // Observability
  {
    type: 'alert.firing',
    source: 'observability',
    label: 'Alert actief',
    severity: 'warning',
    icon: 'eye',
  },
  {
    type: 'alert.resolved',
    source: 'observability',
    label: 'Alert opgelost',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'slo.budget-low',
    source: 'observability',
    label: 'SLO-budget laag',
    severity: 'warning',
    icon: 'exclamation-circle',
  },
  // Security
  {
    type: 'vuln.detected',
    source: 'security',
    label: 'Kwetsbaarheid gevonden',
    severity: 'critical',
    icon: 'shield-check-mark',
  },
  {
    type: 'vuln.resolved',
    source: 'security',
    label: 'Kwetsbaarheid opgelost',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'scan.completed',
    source: 'security',
    label: 'Scan voltooid',
    severity: 'info',
    icon: 'magnifier',
  },
  {
    type: 'compliance.dropped',
    source: 'security',
    label: 'Compliance mislukt',
    severity: 'warning',
    icon: 'exclamation-triangle',
  },
  // Secrets
  {
    type: 'secret.rotated',
    source: 'secrets',
    label: 'Secret geroteerd',
    severity: 'info',
    icon: 'lock-closed',
  },
  {
    type: 'secret.expiring',
    source: 'secrets',
    label: 'Secret verloopt binnenkort',
    severity: 'warning',
    icon: 'clock',
  },
  {
    type: 'cert.expiring',
    source: 'secrets',
    label: 'Certificaat verloopt binnenkort',
    severity: 'warning',
    icon: 'certificate',
  },
  // Cost / FinOps
  {
    type: 'cost.budget-exceeded',
    source: 'kosten',
    label: 'Budget overschreden',
    severity: 'warning',
    icon: 'euro-sign',
  },
  {
    type: 'cost.anomaly',
    source: 'kosten',
    label: 'Kosten-afwijking',
    severity: 'warning',
    icon: 'euro-sign',
  },
  // Fleet
  {
    type: 'fleet.campaign.started',
    source: 'fleet',
    label: 'Fleet-campagne gestart',
    severity: 'info',
    icon: 'ship-wheel',
  },
  {
    type: 'fleet.pr.opened',
    source: 'fleet',
    label: 'Fleet-PR geopend',
    severity: 'info',
    icon: 'folder-stack',
  },
  {
    type: 'fleet.pr.merged',
    source: 'fleet',
    label: 'Fleet-PR gemerged',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'fleet.pr.failing',
    source: 'fleet',
    label: 'Fleet-PR faalt op CI',
    severity: 'warning',
    icon: 'exclamation-triangle',
  },
  // Code: pull requests, reviews, issues, commits, CI — the full code-host feed
  {
    type: 'pr.opened',
    source: 'code',
    label: 'Pull request geopend',
    severity: 'info',
    icon: 'chevron-left-forward-slash-chevron-right',
  },
  {
    type: 'pr.review-requested',
    source: 'code',
    label: 'Review gevraagd',
    severity: 'info',
    icon: 'eye',
  },
  { type: 'pr.reviewed', source: 'code', label: 'Review geplaatst', severity: 'info', icon: 'eye' },
  {
    type: 'pr.changes-requested',
    source: 'code',
    label: 'Wijzigingen gevraagd',
    severity: 'warning',
    icon: 'pencil',
  },
  {
    type: 'pr.approved',
    source: 'code',
    label: 'PR goedgekeurd',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'pr.merged',
    source: 'code',
    label: 'PR gemerged',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'pr.closed',
    source: 'code',
    label: 'PR gesloten',
    severity: 'info',
    icon: 'dismiss-circle',
  },
  {
    type: 'ci.passed',
    source: 'code',
    label: 'CI groen',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'ci.failed',
    source: 'code',
    label: 'CI rood',
    severity: 'critical',
    icon: 'exclamation-triangle',
  },
  {
    type: 'issue.opened',
    source: 'code',
    label: 'Issue geopend',
    severity: 'info',
    icon: 'exclamation-circle',
  },
  {
    type: 'issue.assigned',
    source: 'code',
    label: 'Issue toegewezen',
    severity: 'info',
    icon: 'person',
  },
  {
    type: 'issue.closed',
    source: 'code',
    label: 'Issue gesloten',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'commit.pushed',
    source: 'code',
    label: 'Commit gepusht',
    severity: 'info',
    icon: 'chevron-left-forward-slash-chevron-right',
  },
  {
    type: 'config.committed',
    source: 'code',
    label: 'Config-commit',
    severity: 'info',
    icon: 'chevron-left-forward-slash-chevron-right',
  },
  {
    type: 'branch.created',
    source: 'code',
    label: 'Branch aangemaakt',
    severity: 'info',
    icon: 'folder',
  },
  {
    type: 'repo.created',
    source: 'code',
    label: 'Repository aangemaakt',
    severity: 'success',
    icon: 'folder-stack',
  },
  {
    type: 'ai.pr-review.posted',
    source: 'code',
    label: 'AI-PR-review geplaatst',
    severity: 'info',
    icon: 'sparkles',
  },
  // Werkplekken
  {
    type: 'workplace.provisioned',
    source: 'werkplekken',
    label: 'Werkplek uitgerold',
    severity: 'success',
    icon: 'rectangle-stack',
  },
  {
    type: 'workplace.non-compliant',
    source: 'werkplekken',
    label: 'Werkplek niet compliant',
    severity: 'warning',
    icon: 'exclamation-triangle',
  },
  // Teams / on-call
  {
    type: 'oncall.handover',
    source: 'teams',
    label: 'Piket-overdracht',
    severity: 'info',
    icon: 'person-2',
  },
  {
    type: 'oncall.escalation',
    source: 'teams',
    label: 'Escalatie',
    severity: 'critical',
    icon: 'exclamation-triangle',
  },
  // AI / skills
  {
    type: 'ai.skill.installed',
    source: 'ai',
    label: 'AI-skill geïnstalleerd',
    severity: 'info',
    icon: 'puzzle-piece',
  },
  {
    type: 'ai.key.created',
    source: 'ai',
    label: 'LLM-key aangemaakt',
    severity: 'info',
    icon: 'sparkles',
  },
  {
    type: 'ai.agent.completed',
    source: 'ai',
    label: 'AI-agent-run klaar',
    severity: 'success',
    icon: 'sparkles',
  },
  // Governance
  {
    type: 'governance.gate-failed',
    source: 'governance',
    label: 'Beleids-gate gefaald',
    severity: 'warning',
    icon: 'certificate',
  },
  {
    type: 'rfc.status-changed',
    source: 'governance',
    label: 'RFC-status gewijzigd',
    severity: 'info',
    icon: 'file-text',
  },
  // Physical
  {
    type: 'cooling.alert',
    source: 'fysiek',
    label: 'Koeling-alert',
    severity: 'warning',
    icon: 'exclamation-triangle',
  },
  {
    type: 'capacity.warning',
    source: 'fysiek',
    label: 'Capaciteit-waarschuwing',
    severity: 'warning',
    icon: 'apartment-building',
  },
  // Standards
  {
    type: 'standard.updated',
    source: 'standaarden',
    label: 'Standaard bijgewerkt',
    severity: 'info',
    icon: 'check-mark-circle',
  },
  // Wetten (RegelRecht: law -> system)
  {
    type: 'wet.harvested',
    source: 'wetten',
    label: 'Wet geharvest uit BWB',
    severity: 'info',
    icon: 'file-text',
  },
  {
    type: 'wet.created',
    source: 'wetten',
    label: 'Wet aangemaakt',
    severity: 'info',
    icon: 'certificate',
  },
  {
    type: 'traject.created',
    source: 'wetten',
    label: 'Traject geopend',
    severity: 'info',
    icon: 'pencil',
  },
  {
    type: 'wet.enriched',
    source: 'wetten',
    label: 'Wet machine-leesbaar gemaakt',
    severity: 'info',
    icon: 'chevron-left-forward-slash-chevron-right',
  },
  {
    type: 'scenario.failed',
    source: 'wetten',
    label: 'Scenario mislukt',
    severity: 'warning',
    icon: 'exclamation-triangle',
  },
  {
    type: 'wet.validated',
    source: 'wetten',
    label: 'Wet gevalideerd',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'wet.published',
    source: 'wetten',
    label: 'Wet gepubliceerd naar corpus',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'wet.deployed',
    source: 'wetten',
    label: 'Wet uitgerold als dienst',
    severity: 'success',
    icon: 'rectangle-stack',
  },
  {
    type: 'wet.deprecated',
    source: 'wetten',
    label: 'Wet uitgefaseerd',
    severity: 'warning',
    icon: 'dismiss-circle',
  },
  // Registers (basisregistraties / databronnen)
  {
    type: 'register.connected',
    source: 'registers',
    label: 'Databron aangesloten',
    severity: 'success',
    icon: 'link',
  },
  {
    type: 'register.degraded',
    source: 'registers',
    label: 'Databron verminderd beschikbaar',
    severity: 'warning',
    icon: 'exclamation-circle',
  },

  // Domeinen & DNS
  {
    type: 'dns.domain.added',
    source: 'dns',
    label: 'Domein geregistreerd',
    severity: 'info',
    icon: 'globe',
  },
  {
    type: 'dns.dnssec.changed',
    source: 'dns',
    label: 'DNSSEC gewijzigd',
    severity: 'info',
    icon: 'shield-check-mark',
  },
  {
    type: 'dns.aanvraag.requested',
    source: 'dns',
    label: 'Subdomein aangevraagd',
    severity: 'info',
    icon: 'globe',
  },
  {
    type: 'dns.aanvraag.approved',
    source: 'dns',
    label: 'Subdomein goedgekeurd',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'dns.aanvraag.rejected',
    source: 'dns',
    label: 'Subdomein afgewezen',
    severity: 'warning',
    icon: 'dismiss-circle',
  },
  {
    type: 'dns.migration.requested',
    source: 'dns',
    label: 'Migratie aangevraagd',
    severity: 'info',
    icon: 'arrow-right',
  },
  {
    type: 'dns.migration.approved',
    source: 'dns',
    label: 'Migratie actief',
    severity: 'success',
    icon: 'check-mark-circle',
  },
  {
    type: 'dns.migration.rejected',
    source: 'dns',
    label: 'Migratie afgewezen',
    severity: 'warning',
    icon: 'dismiss-circle',
  },
];

// Quick lookup by type.
export const eventTypeMap = Object.fromEntries(eventCatalog.map((e) => [e.type, e]));

// Source-domain metadata (for grouping + routing in the UI).
export const eventSources = {
  infra: { label: 'Infra-diensten', icon: 'cylinder-split', path: '/infra' },
  apps: { label: 'Applicaties', icon: 'rectangle-stack', path: '/apps' },
  environments: { label: 'Omgevingen', icon: 'arrow-up-arrow-down', path: '/environments' },
  incidenten: { label: 'Incidenten', icon: 'exclamation-triangle', path: '/incidenten' },
  observability: { label: 'Observability', icon: 'eye', path: '/observability' },
  security: { label: 'Security', icon: 'shield-check-mark', path: '/security' },
  secrets: { label: 'Secrets', icon: 'lock-closed', path: '/secrets' },
  kosten: { label: 'Kosten', icon: 'euro-sign', path: '/kosten' },
  fleet: { label: 'Fleet-shift', icon: 'ship-wheel', path: '/fleet' },
  code: { label: 'Code', icon: 'chevron-left-forward-slash-chevron-right', path: '/code' },
  werkplekken: { label: 'Werkplekken', icon: 'rectangle-stack', path: '/werkplekken' },
  teams: { label: 'Teams', icon: 'person-2', path: '/teams' },
  ai: { label: 'AI & LLM', icon: 'sparkles', path: '/ai' },
  governance: { label: 'Governance', icon: 'certificate', path: '/governance' },
  fysiek: { label: 'Fundament', icon: 'apartment-building', path: '/fysiek' },
  standaarden: { label: 'Standaarden', icon: 'check-mark-circle', path: '/standaarden' },
  wetten: { label: 'Wet uitvoeren', icon: 'certificate', path: '/wetten' },
  registers: { label: 'Basisregistraties', icon: 'cylinder-split', path: '/registers' },
  dns: { label: 'Domeinen & DNS', icon: 'globe', path: '/dns' },
};

// Historical event seed: a believable backlog spanning every domain so the
// inbox is full from the first load. `at` uses relative labels consistent with
// the rest of the seed (demo "today" is Sunday 2026-05-31). `target` is a
// router path for the deep link; `team`/`actor` drive routing. Newest first is
// established by the store on load (these are roughly reverse-chronological).
export const eventSeed = [
  {
    type: 'incident.opened',
    severity: 'critical',
    team: 'team-toeslagen',
    actor: 'system',
    title: 'Verhoogde latency Toeslagenmotor',
    resource: 'inc-2024-017',
    target: '/incidenten/inc-2024-017',
    at: 'vandaag 09:14',
  },
  {
    type: 'cost.budget-exceeded',
    severity: 'warning',
    team: 'team-toeslagen',
    actor: 'system',
    title: 'Toeslagen over budget: €300 / €280',
    resource: 'team-toeslagen',
    target: '/kosten/budgetten',
    at: 'vandaag 08:55',
  },
  {
    type: 'alert.firing',
    severity: 'warning',
    team: 'team-toeslagen',
    actor: 'system',
    title: 'p99 latency boven SLO (app-toeslagen)',
    resource: 'app-toeslagen',
    target: '/observability/alerts',
    at: 'vandaag 08:40',
  },
  {
    type: 'vuln.detected',
    severity: 'critical',
    team: 'team-toeslagen',
    actor: 'system',
    title: 'CVE-2024-3094 in repo-toeslagen',
    resource: 'repo-toeslagen',
    target: '/security/kwetsbaarheden',
    at: 'gisteren 22:18',
  },
  {
    type: 'incident.resolved',
    severity: 'success',
    team: 'team-burgerzaken',
    actor: 'joost',
    title: 'pg-burgerzaken-prod hoge temperatuur opgelost',
    resource: 'inc-2024-016',
    target: '/incidenten/inc-2024-016',
    at: 'gisteren 16:30',
  },
  {
    type: 'cooling.alert',
    severity: 'warning',
    team: 'team-platform',
    actor: 'system',
    title: 'Koeling-alert rack DH-A1',
    resource: 'r-dh-a1',
    target: '/fysiek/racks/r-dh-a1',
    at: 'gisteren 16:02',
  },
  {
    type: 'deploy.completed',
    severity: 'success',
    team: 'team-burgerzaken',
    actor: 'joost',
    title: 'app-paspoort v2.3.9 naar prod',
    resource: 'app-paspoort',
    target: '/apps/app-paspoort',
    at: 'gisteren 14:22',
  },
  {
    type: 'cert.expiring',
    severity: 'warning',
    team: 'team-data',
    actor: 'system',
    title: 'api.datadeling.overheid.nl verloopt over 30 dagen',
    resource: 'cert-2',
    target: '/secrets/certificaten',
    at: 'gisteren 11:02',
  },
  {
    type: 'deploy.completed',
    severity: 'success',
    team: 'team-platform',
    actor: 'ans',
    title: 'app-platformportaal v0.6.5 naar prod',
    resource: 'app-platformportaal',
    target: '/apps/app-platformportaal',
    at: 'gisteren 10:05',
  },
  {
    type: 'fleet.pr.merged',
    severity: 'success',
    team: 'team-platform',
    actor: 'ans',
    title: 'NLDD-bump PR gemerged in platformportaal',
    resource: 'camp-nldd-bump',
    target: '/fleet/camp-nldd-bump',
    at: 'gisteren 09:30',
  },
  {
    type: 'secret.rotated',
    severity: 'info',
    team: 'team-platform',
    actor: 'fatima',
    title: 'platform/llm-gateway-key geroteerd',
    resource: 'sec-3',
    target: '/secrets',
    at: 'di 09:40',
  },
  {
    type: 'infra.instance.ready',
    severity: 'success',
    team: 'team-platform',
    actor: 'ans',
    title: 'llm-gilde-prod gereed',
    resource: 'llm-gilde-prod',
    target: '/infra/instances/llm-gilde-prod',
    at: 'di 10:02',
  },
  {
    type: 'fleet.pr.failing',
    severity: 'warning',
    team: 'team-platform',
    actor: 'system',
    title: 'security.txt-PR faalt op CI in repo-toeslagen',
    resource: 'camp-securitytxt',
    target: '/fleet/camp-securitytxt',
    at: 'di 08:15',
  },
  {
    type: 'oncall.handover',
    severity: 'info',
    team: 'team-platform',
    actor: 'fatima',
    title: 'Piket overgedragen aan Fatima El Amrani',
    resource: 'team-platform',
    target: '/teams/on-call',
    at: 'ma 09:00',
  },
  {
    type: 'change.approved',
    severity: 'success',
    team: 'team-platform',
    actor: 'fatima',
    title: 'Postgres major upgrade 15 naar 16 goedgekeurd',
    resource: 'chg-221',
    target: '/incidenten/changes',
    at: 'ma 08:30',
  },
  {
    type: 'ai.skill.installed',
    severity: 'info',
    team: 'team-platform',
    actor: 'ans',
    title: 'NeRDS-skills geïnstalleerd',
    resource: 'nerds',
    target: '/ai/skills',
    at: 'vr 15:20',
  },
  {
    type: 'workplace.provisioned',
    severity: 'success',
    team: 'team-platform',
    actor: 'ans',
    title: 'Werkplek wp-0002 uitgerold aan Fatima',
    resource: 'wp-0002',
    target: '/werkplekken/wp-0002',
    at: 'vr 11:10',
  },
  {
    type: 'vuln.resolved',
    severity: 'success',
    team: 'team-data',
    actor: 'pieter',
    title: 'CVE-2023-44487 opgelost in datadeling-api',
    resource: 'repo-datadeling',
    target: '/security/kwetsbaarheden',
    at: 'do 16:45',
  },

  // Code / PR / issue feed — the platform is fed by code.overheid.nl too.
  {
    type: 'pr.opened',
    severity: 'info',
    team: 'team-toeslagen',
    actor: 'sanne',
    title: 'PR #318 geopend: retry-logica voor Kafka-consumer',
    resource: 'repo-toeslagen',
    target: '/code/repo-toeslagen',
    at: 'vandaag 09:02',
  },
  {
    type: 'ai.pr-review.posted',
    severity: 'info',
    team: 'team-toeslagen',
    actor: 'system',
    title: 'AI-PR-review op #318: 1 kritiek, 1 beveiliging',
    resource: 'repo-toeslagen',
    target: '/ai',
    at: 'vandaag 09:05',
  },
  {
    type: 'ci.failed',
    severity: 'critical',
    team: 'team-toeslagen',
    actor: 'system',
    title: 'CI rood op #318 (repo-toeslagen)',
    resource: 'repo-toeslagen',
    target: '/code/repo-toeslagen',
    at: 'vandaag 09:07',
  },
  {
    type: 'pr.review-requested',
    severity: 'info',
    team: 'team-platform',
    actor: 'sanne',
    title: 'Review gevraagd aan Anne Schuth op #90',
    resource: 'repo-toeslagen',
    target: '/code/repo-toeslagen',
    at: 'gisteren 13:40',
  },
  {
    type: 'pr.merged',
    severity: 'success',
    team: 'team-platform',
    actor: 'ans',
    title: 'PR #12 gemerged: NLDD-bump in platformportaal',
    resource: 'repo-platformportaal',
    target: '/code/repo-platformportaal',
    at: 'gisteren 09:28',
  },
  {
    type: 'issue.opened',
    severity: 'info',
    team: 'team-data',
    actor: 'pieter',
    title: 'Issue geopend: documenteer FSC-koppeling',
    resource: 'repo-datadeling',
    target: '/code/repo-datadeling',
    at: 'di 14:12',
  },
  {
    type: 'issue.assigned',
    severity: 'info',
    team: 'team-toeslagen',
    actor: 'sanne',
    title: 'CVE-2024-3094 toegewezen aan Sanne Visser',
    resource: 'repo-toeslagen',
    target: '/security/kwetsbaarheden',
    at: 'di 11:30',
  },
  {
    type: 'commit.pushed',
    severity: 'info',
    team: 'team-burgerzaken',
    actor: 'joost',
    title: '3 commits gepusht naar feat/machtigingen',
    resource: 'repo-paspoort',
    target: '/code/repo-paspoort',
    at: 'ma 16:20',
  },
  {
    type: 'repo.created',
    severity: 'success',
    team: 'team-platform',
    actor: 'ans',
    title: 'Repository platformportaal aangemaakt',
    resource: 'repo-platformportaal',
    target: '/code/repo-platformportaal',
    at: 'do 10:00',
  },

  // Wetten & registers feed — law-to-system lifecycle on the bus.
  {
    type: 'wet.published',
    severity: 'success',
    team: 'team-toeslagen',
    actor: 'sanne',
    title: 'Wet op de zorgtoeslag 2025-01-01 gepubliceerd',
    resource: 'zorgtoeslagwet',
    target: '/wetten/zorgtoeslagwet',
    at: 'gisteren 15:40',
  },
  {
    type: 'traject.created',
    severity: 'info',
    team: 'team-toeslagen',
    actor: 'sanne',
    title: 'Traject geopend: Huurtoeslagwet machine-leesbaar',
    resource: 'huurtoeslag-7b1e4d22',
    target: '/wetten/huurtoeslagwet',
    at: 'vandaag 08:30',
  },
  {
    type: 'register.connected',
    severity: 'success',
    team: 'team-toeslagen',
    actor: 'sanne',
    title: 'Inkomensgegevens aangesloten op Toeslagenmotor',
    resource: 'inkomen',
    target: '/registers/inkomen',
    at: 'di 13:15',
  },
];

// Build a larger historical backlog from the scaled seed entities, so the
// notification stream and audit feed feel real at platform scale. Deterministic
// (index-driven, no randomness). Appended AFTER the curated eventSeed above, so
// the canonical first events that the bell/inbox demo relies on stay stable.
export function extraHistoricalEvents(seed) {
  const out = [];
  const teamName = (id) => seed.teams.find((t) => t.id === id)?.name || id;
  const firstMember = (teamId) => seed.teams.find((t) => t.id === teamId)?.members?.[0] || 'system';
  const days = ['vandaag', 'gisteren', 'ma', 'di', 'wo', 'do', 'vr'];
  const hhmm = (i) => `${8 + (i % 11)}:${(10 + (i % 49)).toString()}`;
  const at = (i) => `${days[i % days.length]} ${hhmm(i)}`;
  let n = 0;
  // deploys + releases
  for (const r of seed.releases || []) {
    const app = seed.apps.find((a) => a.id === r.app);
    out.push({
      type: 'deploy.completed',
      severity: 'success',
      team: app?.team,
      actor: r.by,
      title: `${app?.name || r.app} ${r.version} naar prod`,
      resource: r.app,
      target: `/apps/${r.app}`,
      at: r.when || at(n++),
    });
  }
  // incidents
  for (const inc of seed.incidents || []) {
    const t =
      inc.status === 'resolved'
        ? 'incident.resolved'
        : inc.status === 'mitigated'
          ? 'incident.mitigated'
          : 'incident.opened';
    const sev =
      inc.status === 'resolved'
        ? 'success'
        : inc.severity === 'sev1' || inc.severity === 'sev2'
          ? 'critical'
          : 'warning';
    out.push({
      type: t,
      severity: sev,
      team: inc.team,
      actor: inc.oncall || 'system',
      title: `${inc.title} (${inc.severity})`,
      resource: inc.id,
      target: `/incidenten/${inc.id}`,
      at: inc.opened || at(n++),
    });
  }
  // vulnerabilities
  for (const v of (seed.vulnerabilities || []).slice(0, 16)) {
    out.push({
      type: v.status === 'opgelost' ? 'vuln.resolved' : 'vuln.detected',
      severity: v.status === 'opgelost' ? 'success' : 'critical',
      team: v.team,
      actor: 'system',
      title: `${v.cve} in ${seed.repos.find((r) => r.id === v.repo)?.name || v.repo}`,
      resource: v.repo,
      target: '/security/kwetsbaarheden',
      at: at(n++),
    });
  }
  // secrets rotated
  for (const s of (seed.secrets || []).slice(0, 16)) {
    out.push({
      type: 'secret.rotated',
      severity: 'info',
      team: s.team,
      actor: firstMember(s.team),
      title: `${s.name} geroteerd`,
      resource: s.id,
      target: '/secrets',
      at: at(n++),
    });
  }
  // wetten published / trajecten
  for (const w of (seed.wetten || []).filter((x) => x.status === 'gepubliceerd').slice(0, 8)) {
    out.push({
      type: 'wet.published',
      severity: 'success',
      team: w.owner,
      actor: firstMember(w.owner),
      title: `${w.name} gepubliceerd naar corpus`,
      resource: w.id,
      target: `/wetten/${w.id}`,
      at: at(n++),
    });
  }
  // infra provisioned (a sample of instances)
  for (const inst of (seed.instances || []).filter((_, i) => i % 9 === 0).slice(0, 18)) {
    out.push({
      type: 'infra.instance.ready',
      severity: 'success',
      team: inst.team,
      actor: firstMember(inst.team),
      title: `${inst.name} is gereed`,
      resource: inst.id,
      target: `/infra/instances/${inst.id}`,
      at: at(n++),
    });
  }
  // workplace rollouts (a sample)
  for (const wp of (seed.workplaces || []).filter((w) => w.status === 'in gebruik').slice(0, 12)) {
    const p = seed.people.find((x) => x.id === wp.person);
    out.push({
      type: 'workplace.provisioned',
      severity: 'success',
      team: p?.team,
      actor: 'system',
      title: `Werkplek ${wp.id} uitgerold aan ${p?.name || wp.person}`,
      resource: wp.id,
      target: `/werkplekken/${wp.id}`,
      at: at(n++),
    });
  }
  // cost budget exceeded for over-budget teams
  for (const b of (seed.budgets || []).filter((x) => x.spent > x.budget).slice(0, 10)) {
    out.push({
      type: 'cost.budget-exceeded',
      severity: 'warning',
      team: b.team,
      actor: 'system',
      title: `${teamName(b.team)} over budget: € ${b.spent} / € ${b.budget}`,
      resource: b.team,
      target: '/kosten/budgetten',
      at: at(n++),
    });
  }
  return out;
}
