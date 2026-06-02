// The single in-memory platform store. Holds every domain's data (seeded from
// src/data/seed.js) plus cross-relation lookups and the fake "provisioning"
// actions. Edits mutate state live and reset on refresh — exactly what the
// clickable demo needs. Domain views read these arrays and call these helpers.
import { defineStore } from 'pinia';
import * as seed from '../data/seed.js';
import { eventSeed, extraHistoricalEvents, eventTypeMap, eventSources, SEVERITIES } from '../data/events.js';

// Deep clone the seed so the store owns mutable copies (refresh resets it).
const clone = (v) => JSON.parse(JSON.stringify(v));

let _seq = 1000;
const nextId = (prefix) => `${prefix}-${++_seq}`;

// Severity rank for sorting/escalation.
const SEV_RANK = { critical: 0, warning: 1, success: 2, info: 3 };

export const usePlatformStore = defineStore('platform', {
  state: () => ({
    organisations: clone(seed.organisations),
    datacenters: clone(seed.datacenters),
    alleys: clone(seed.alleys),
    racks: clone(seed.racks),
    cables: clone(seed.cables),
    procurement: clone(seed.procurement),
    serviceCatalog: clone(seed.serviceCatalog),
    instances: clone(seed.instances),
    apps: clone(seed.apps),
    templates: clone(seed.templates),
    repos: clone(seed.repos),
    people: clone(seed.people),
    teams: clone(seed.teams),
    oncall: clone(seed.oncall),
    hardware: clone(seed.hardware),
    deviceCategories: clone(seed.deviceCategories),
    images: clone(seed.images),
    workplaces: clone(seed.workplaces),
    environments: clone(seed.environments),
    deployments: clone(seed.deployments),
    releases: clone(seed.releases),
    runners: clone(seed.runners),
    ciJobs: clone(seed.ciJobs),
    incidents: clone(seed.incidents),
    changes: clone(seed.changes),
    alerts: clone(seed.alerts),
    slos: clone(seed.slos),
    vulnerabilities: clone(seed.vulnerabilities),
    complianceControls: clone(seed.complianceControls),
    secrets: clone(seed.secrets),
    certificates: clone(seed.certificates),
    apis: clone(seed.apis),
    fscPeers: clone(seed.fscPeers),
    costByTeam: clone(seed.costByTeam),
    budgets: clone(seed.budgets),
    gates: clone(seed.gates),
    rfcs: clone(seed.rfcs),
    auditLog: clone(seed.auditLog),
    standards: clone(seed.standards),
    channels: clone(seed.channels),
    subscriptions: clone(seed.subscriptions),
    campaigns: clone(seed.campaigns),
    techRadar: clone(seed.techRadar),
    llmModels: clone(seed.llmModels),
    skillPlugins: clone(seed.skillPlugins),
    skillInstalls: clone(seed.skillInstalls),
    learningPaths: clone(seed.learningPaths),
    registers: clone(seed.registers),
    registerConsumers: clone(seed.registerConsumers),
    wetten: clone(seed.wetten),
    trajecten: clone(seed.trajecten),
    scenarios: clone(seed.scenarios),
    datasets: clone(seed.datasets),
    algoritmes: clone(seed.algoritmes),
    verwerkingen: clone(seed.verwerkingen),
    wooDocuments: clone(seed.wooDocuments),
    artefacten: clone(seed.artefacten),
    // The "logged in" demo user.
    currentUser: 'ans',

    // --- Notification event bus ---
    // Every platform event lives here, newest first. Seeded with a believable
    // backlog; new events are appended live by emit() from every domain action.
    // Each event: { id, type, severity, source, label, icon, team, actor,
    //   title, resource, target, at, read, muted }.
    // Curated canonical events first (the bell/inbox demo relies on these),
    // then a larger generated backlog from the scaled seed so the stream is
    // believable at platform scale.
    events: [...eventSeed, ...extraHistoricalEvents(seed)].map((e, i) => {
      const meta = eventTypeMap[e.type] || {};
      return {
        id: `evt-${9000 - i}`,
        read: i > 2, // first few unread so the bell shows activity on load
        muted: false,
        source: meta.source,
        label: meta.label,
        icon: meta.icon || 'circle-filled',
        ...e,
      };
    }),
    // Per-user notification preferences: muted event sources/types.
    mutedSources: [],
  }),

  getters: {
    // --- Lookups by id ---
    teamById: (s) => (id) => s.teams.find((t) => t.id === id),
    personById: (s) => (id) => s.people.find((p) => p.id === id),
    appById: (s) => (id) => s.apps.find((a) => a.id === id),
    repoById: (s) => (id) => s.repos.find((r) => r.id === id),
    datacenterById: (s) => (id) => s.datacenters.find((d) => d.id === id),
    rackById: (s) => (id) => s.racks.find((r) => r.id === id),
    instanceById: (s) => (id) => s.instances.find((i) => i.id === id),
    orgById: (s) => (id) => s.organisations.find((o) => o.id === id),

    // --- Physical compute capacity, aggregated from the rack units ---
    // Sums vCPU, memory (GB), GPUs and raw storage (TB) across all installed
    // hardware. Optionally scoped to a single datacenter.
    computeCapacity: (s) => (dc) => {
      const racks = dc ? s.racks.filter((r) => r.dc === dc) : s.racks;
      const acc = { vcpu: 0, memGB: 0, gpus: 0, storageTB: 0, computeNodes: 0, gpuNodes: 0, storageNodes: 0 };
      for (const r of racks) {
        for (const u of r.units) {
          acc.vcpu += u.vcpu || 0;
          acc.memGB += u.memGB || 0;
          acc.gpus += u.gpuCount || 0;
          acc.storageTB += u.storageTB || 0;
          if (u.type === 'gpu') acc.gpuNodes += 1;
          else if (u.type === 'server' && (u.label || '').startsWith('storage')) acc.storageNodes += 1;
          else if (u.type === 'server') acc.computeNodes += 1;
        }
      }
      return acc;
    },

    // --- Cross-relation helpers (the backbone of the demo) ---
    racksByDatacenter: (s) => (dc) => s.racks.filter((r) => r.dc === dc),
    alleysByDatacenter: (s) => (dc) => s.alleys.filter((a) => a.dc === dc),
    instancesByTeam: (s) => (team) => s.instances.filter((i) => i.team === team),
    instancesByApp: (s) => (app) => s.instances.filter((i) => i.app === app),
    appsByTeam: (s) => (team) => s.apps.filter((a) => a.team === team),
    workplacesByPerson: (s) => (person) => s.workplaces.filter((w) => w.person === person),
    teamOfPerson: (s) => (person) => {
      const p = s.people.find((x) => x.id === person);
      return p ? s.teams.find((t) => t.id === p.team) : null;
    },
    incidentsByTeam: (s) => (team) => s.incidents.filter((i) => i.team === team),
    currentPerson: (s) => s.people.find((p) => p.id === s.currentUser),
    skillPluginById: (s) => (id) => s.skillPlugins.find((p) => p.id === id),
    pluginsInstalledByTeam: (s) => (team) => {
      const rec = s.skillInstalls.find((x) => x.team === team);
      return rec ? rec.plugins : [];
    },
    // Which marketplace plugin (if any) covers a given standard id.
    pluginForStandard: (s) => (stdId) => s.skillPlugins.find((p) => (p.standards || []).includes(stdId)),

    // --- CI runners ---
    runnerById: (s) => (id) => s.runners.find((r) => r.id === id),
    runnersByRack: (s) => (rack) => s.runners.filter((r) => r.rack === rack),
    jobsByPool: (s) => (pool) => s.ciJobs.filter((j) => j.pool === pool),
    // Total concurrent CI capacity and current utilisation across all pools.
    runnerUtilisation: (s) => {
      const cap = s.runners.reduce((n, r) => n + r.capacity, 0);
      const run = s.runners.reduce((n, r) => n + r.running, 0);
      const queued = s.runners.reduce((n, r) => n + r.queued, 0);
      return { capacity: cap, running: run, queued, pct: cap ? Math.round((run / cap) * 100) : 0 };
    },

    // --- Registers (basisregistraties) ---
    registerById: (s) => (id) => s.registers.find((r) => r.id === id),
    consumersOfRegister: (s) => (registerId) => s.registerConsumers.filter((c) => c.register === registerId),

    // --- Data (datasetcatalogus) ---
    datasetById: (s) => (id) => s.datasets.find((d) => d.id === id),
    datasetsByLabel: (s) => (label) => s.datasets.filter((d) => d.qualityLabel === label),
    datasetsForRegister: (s) => (regId) => s.datasets.filter((d) => d.register === regId),
    datasetsForApp: (s) => (appId) => s.datasets.filter((d) => (d.consumers || []).includes(appId)),
    datasetsForWet: (s) => (wetId) => s.datasets.filter((d) => (d.wetten || []).includes(wetId)),
    openDataCount: (s) => s.datasets.filter((d) => d.open).length,

    // --- Algoritmeregister ---
    algoritmeById: (s) => (id) => s.algoritmes.find((a) => a.id === id),
    algoritmesByType: (s) => (type) => s.algoritmes.filter((a) => a.type === type),
    algoritmesForApp: (s) => (appId) => s.algoritmes.filter((a) => a.app === appId),
    algoritmesForModel: (s) => (modelId) => s.algoritmes.filter((a) => a.model === modelId),
    algoritmesForDataset: (s) => (dsId) => s.algoritmes.filter((a) => (a.dataSources || []).includes(dsId)),

    // --- Verwerkingen (AVG art. 30) ---
    verwerkingById: (s) => (id) => s.verwerkingen.find((v) => v.id === id),
    verwerkingenByDpia: (s) => (status) => s.verwerkingen.filter((v) => v.dpiaStatus === status),
    verwerkingenForWet: (s) => (wetId) => s.verwerkingen.filter((v) => v.wet === wetId),
    verwerkingenForDataset: (s) => (dsId) => s.verwerkingen.filter((v) => (v.datasets || []).includes(dsId)),

    // --- Woo & archivering ---
    wooDocumentById: (s) => (id) => s.wooDocuments.find((w) => w.id === id),
    wooByStatus: (s) => (status) => s.wooDocuments.filter((w) => w.publicatiestatus === status),
    wooForApp: (s) => (appId) => s.wooDocuments.filter((w) => w.app === appId),

    // --- Artefacten / provenance ---
    artefactById: (s) => (id) => s.artefacten.find((a) => a.id === id),
    artefactsForRepo: (s) => (repoId) => s.artefacten.filter((a) => a.repo === repoId),
    artefactsForApp: (s) => (appId) => s.artefacten.filter((a) => a.app === appId),
    signedArtefactPct: (s) =>
      s.artefacten.length
        ? Math.round((s.artefacten.filter((a) => a.signed).length / s.artefacten.length) * 100)
        : 0,
    registersForConsumer: (s) => (consumerId) =>
      s.registerConsumers
        .filter((c) => c.consumer === consumerId)
        .map((c) => ({ ...c, register: s.registers.find((r) => r.id === c.register) })),

    // --- Wetten (RegelRecht) ---
    wetById: (s) => (id) => s.wetten.find((w) => w.id === id),
    wettenByStatus: (s) => (status) => s.wetten.filter((w) => w.status === status),
    scenariosByWet: (s) => (wetId) => s.scenarios.filter((sc) => sc.wet === wetId),
    trajectById: (s) => (id) => s.trajecten.find((t) => t.id === id),
    trajectenByWet: (s) => (wetId) => s.trajecten.filter((t) => t.wet === wetId),
    trajectenByPerson: (s) => (personId) => s.trajecten.filter((t) => (t.members || []).includes(personId)),
    appForWet: (s) => (wetId) => {
      const w = s.wetten.find((x) => x.id === wetId);
      return w?.service ? s.apps.find((a) => a.id === w.service) : null;
    },
    wetForApp: (s) => (appId) => s.wetten.find((w) => w.service === appId),
    // Registers a law reads from (across all its articles' inputs).
    registersForWet: (s) => (wetId) => {
      const w = s.wetten.find((x) => x.id === wetId);
      if (!w) return [];
      const ids = new Set();
      for (const art of w.articles || [])
        for (const inp of art.inputs || [])
          if (inp.source?.kind === 'register') ids.add(inp.source.id);
      return [...ids].map((id) => s.registers.find((r) => r.id === id)).filter(Boolean);
    },
    avgCoverage: (s) => {
      if (!s.wetten.length) return 0;
      return Math.round((s.wetten.reduce((n, w) => n + (w.coverage || 0), 0) / s.wetten.length) * 100);
    },

    // --- Notification inbox ---
    // The current user's relevant events: everything for their team, plus
    // anything that names them as actor. Muted sources are excluded.
    inboxEvents: (s) => {
      const me = s.people.find((p) => p.id === s.currentUser);
      const myTeam = me?.team;
      return s.events.filter(
        (e) =>
          !e.muted &&
          !s.mutedSources.includes(e.source) &&
          (e.team === myTeam || e.actor === s.currentUser || e.severity === 'critical'),
      );
    },
    unreadCount() {
      return this.inboxEvents.filter((e) => !e.read).length;
    },
    unreadCritical() {
      return this.inboxEvents.filter((e) => !e.read && e.severity === 'critical').length;
    },
    // Events grouped by source domain, for the management view.
    eventsBySource: (s) => {
      const map = {};
      for (const e of s.events) (map[e.source] ||= []).push(e);
      return map;
    },
    // Source metadata passthrough for views.
    eventSourceMeta: () => eventSources,
    eventSeverities: () => SEVERITIES,
  },

  actions: {
    audit(action, resource) {
      this.auditLog.unshift({ id: nextId('a'), actor: this.currentUser, action, resource, at: 'zojuist' });
    },

    // --- The event bus: the spine that feeds the notification system ---
    // Every domain action calls emit() to publish a CloudEvent. It is routed
    // into the inbox, matched against subscriptions for delivery, and (for
    // anything actor-driven) also written to the audit log. New events show up
    // live in the bell + inbox + the /notificaties stream.
    emit(type, { title, resource = null, target = null, team = null, actor = null, severity = null } = {}) {
      const meta = eventTypeMap[type] || { source: 'platform', label: type, icon: 'circle-filled', severity: 'info' };
      const ev = {
        id: nextId('evt'),
        type,
        source: meta.source,
        label: meta.label,
        icon: meta.icon || 'circle-filled',
        severity: severity || meta.severity || 'info',
        title: title || meta.label,
        resource,
        target,
        team: team || this.teamOfPerson(this.currentUser)?.id || null,
        actor: actor || this.currentUser,
        at: 'zojuist',
        read: false,
        muted: false,
      };
      this.events.unshift(ev);
      // Deliver to matching subscriptions (updates their last-fired marker).
      this.routeEvent(ev);
      // Escalate unacked critical events to the on-call of the owning team.
      if (ev.severity === 'critical' && ev.team) {
        const rec = this.oncall.find((o) => o.team === ev.team);
        if (rec) ev.escalatedTo = rec.person;
      }
      return ev;
    },

    // Match an event against team subscriptions; mark which channels delivered.
    routeEvent(ev) {
      const matched = this.subscriptions.filter(
        (sub) => sub.event === ev.type && (!sub.team || sub.team === ev.team),
      );
      ev.deliveredTo = matched.flatMap((sub) =>
        this.channels.filter((c) => c.team === sub.team).map((c) => c.type),
      );
    },

    // --- Inbox actions ---
    markRead(id) {
      const e = this.events.find((x) => x.id === id);
      if (e) e.read = true;
    },
    markAllRead() {
      for (const e of this.inboxEvents) e.read = true;
    },
    toggleMuteSource(source) {
      const i = this.mutedSources.indexOf(source);
      if (i === -1) this.mutedSources.push(source);
      else this.mutedSources.splice(i, 1);
    },

    // Fake provisioning: flip status through a chain over a few seconds so the
    // UI feels alive. Returns the created entity immediately.
    async runStatusChain(entity, chain, delayMs = 1200) {
      for (const step of chain) {
        entity.status = step;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, delayMs));
      }
      return entity;
    },

    // --- Infra ---
    orderInstance({ kind, name, team, app = null, env, size, dc = 'dc-denhaag', rack = null }) {
      const inst = {
        id: nextId(kind),
        kind, name, team, app, env, size, dc, rack,
        status: 'requested',
        costMonth: 0,
      };
      this.instances.push(inst);
      this.audit('infra afgenomen', inst.name);
      this.emit('infra.instance.requested', { title: `${inst.name} aangevraagd`, resource: inst.id, target: `/infra/instances/${inst.id}`, team });
      // When provisioning completes, fire the ready event too.
      this.runStatusChain(inst, ['provisioning', 'ready']).then(() => {
        this.emit('infra.instance.ready', { title: `${inst.name} is gereed`, resource: inst.id, target: `/infra/instances/${inst.id}`, team });
      });
      return inst;
    },
    scaleInstance(id) {
      const i = this.instanceById(id);
      if (i) {
        this.audit('instance geschaald', i.name);
        this.emit('infra.instance.scaled', { title: `${i.name} geschaald`, resource: i.id, target: `/infra/instances/${i.id}`, team: i.team });
      }
    },
    deleteInstance(id) {
      const i = this.instanceById(id);
      this.instances = this.instances.filter((x) => x.id !== id);
      if (i) {
        this.audit('instance verwijderd', i.name);
        this.emit('infra.instance.deleted', { title: `${i.name} verwijderd`, resource: i.id, team: i.team });
      }
    },

    // --- Apps / golden path ---
    createApp({ name, team, template, withInfra = [], visibility = 'open' }) {
      const id = nextId('app');
      const repoId = nextId('repo');
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      // Repo namespace follows the team's organisation, not a fixed prefix.
      const orgNs = { bzk: 'minbzk', dictu: 'dictu', logius: 'logius', rvig: 'rvig', nldd: 'nldd' };
      const teamObj = this.teamById(team);
      const ns = orgNs[teamObj?.org] || 'nldd';
      // App type follows the template: frontend/docs templates are websites.
      const type = /vue|nldd|astro|docs/.test(template || '') ? 'website' : 'service';
      this.repos.push({ id: repoId, name: `${ns}/${slug}`, visibility, lang: template?.includes('rust') ? 'Rust' : template?.includes('python') ? 'Python' : 'Vue', stars: 0, openPrs: 0, openIssues: 0, ci: 'green', license: 'EUPL-1.2', app: id });
      const app = { id, name, team, type, stack: [], repo: repoId, maturity: 'brons', health: 'ok' };
      this.apps.push(app);
      for (const kind of withInfra) {
        this.orderInstance({ kind, name: `${name.toLowerCase().replace(/\s+/g, '-')}-${kind}`, team, app: id, env: 'dev', size: 'S' });
      }
      this.audit('applicatie aangemaakt', name);
      this.emit('repo.created', { title: `Repository ${ns}/${slug} aangemaakt`, resource: repoId, target: `/code/${repoId}`, team });
      this.emit('app.created', { title: `Applicatie ${name} aangemaakt`, resource: id, target: `/apps/${id}`, team });
      return { app, repoId };
    },

    // --- Racks (editable) ---
    placeDevice(rackId, device) {
      const rack = this.rackById(rackId);
      if (rack) {
        rack.units.push(device);
        rack.units.sort((a, b) => a.u - b.u);
        this.audit('device geplaatst', `${device.label} @ ${rack.label}`);
      }
    },
    removeDevice(rackId, u) {
      const rack = this.rackById(rackId);
      if (rack) rack.units = rack.units.filter((d) => d.u !== u);
    },

    // --- Workplaces ---
    provisionWorkplace({ person, model, image }) {
      const wp = { id: nextId('wp'), person, model, image, status: 'besteld', lastSeen: '—', encrypted: true, updated: false };
      this.workplaces.push(wp);
      const personName = this.personById(person)?.name || person;
      const team = this.personById(person)?.team;
      this.audit('werkplek uitgerold', `${wp.id} → ${person}`);
      this.runStatusChain(wp, ['provisioning', 'geleverd', 'in gebruik']).then(() => {
        this.emit('workplace.provisioned', { title: `Werkplek ${wp.id} uitgerold aan ${personName}`, resource: wp.id, target: `/werkplekken/${wp.id}`, team });
      });
      return wp;
    },

    // --- Secrets ---
    rotateSecret(id) {
      const sec = this.secrets.find((x) => x.id === id);
      if (sec) {
        sec.rotated = 'zojuist';
        this.audit('secret geroteerd', sec.name);
        this.emit('secret.rotated', { title: `${sec.name} geroteerd`, resource: sec.id, target: '/secrets', team: sec.team });
      }
    },

    // --- Fleet-shift ---
    createCampaign(c) {
      const camp = { id: nextId('camp'), status: 'concept', progress: { open: 0, merged: 0, failing: 0 }, ...c };
      this.campaigns.push(camp);
      this.audit('campagne aangemaakt', camp.title);
      return camp;
    },
    runCampaign(id) {
      const c = this.campaigns.find((x) => x.id === id);
      if (!c) return;
      c.status = 'actief';
      c.progress = { open: c.repos.length, merged: 0, failing: 0 };
      this.audit('campagne uitgerold', c.title);
      this.emit('fleet.campaign.started', { title: `Campagne "${c.title}" uitgerold over ${c.repos.length} repos`, resource: c.id, target: `/fleet/${c.id}`, team: c.owner });
      // Each targeted repo gets a fleet PR opened.
      for (const repoId of c.repos) {
        this.emit('fleet.pr.opened', { title: `Fleet-PR geopend in ${this.repoById(repoId)?.name || repoId}`, resource: repoId, target: `/fleet/${c.id}`, team: c.owner });
      }
    },

    // --- Incidents ---
    ackIncident(id) {
      const i = this.incidents.find((x) => x.id === id);
      if (i) {
        i.status = 'mitigated';
        this.audit('incident bevestigd', i.id);
        this.emit('incident.acknowledged', { title: `Incident ${i.id} bevestigd: ${i.title}`, resource: i.id, target: `/incidenten/${i.id}`, team: i.team });
      }
    },

    // --- Skills-marketplace ---
    installSkill(team, pluginId) {
      let rec = this.skillInstalls.find((x) => x.team === team);
      if (!rec) {
        rec = { team, plugins: [] };
        this.skillInstalls.push(rec);
      }
      if (!rec.plugins.includes(pluginId)) {
        rec.plugins.push(pluginId);
        const p = this.skillPluginById(pluginId);
        if (p) p.installs += 1;
        this.audit('skill-plugin geïnstalleerd', `${pluginId} → ${team}`);
        this.emit('ai.skill.installed', { title: `${p?.name || pluginId} geïnstalleerd`, resource: pluginId, target: '/ai/skills', team });
      }
    },
    uninstallSkill(team, pluginId) {
      const rec = this.skillInstalls.find((x) => x.team === team);
      if (rec) rec.plugins = rec.plugins.filter((id) => id !== pluginId);
    },

    // --- Environments ---
    promote(app, fromEnv, toEnv) {
      const d = this.deployments.find((x) => x.app === app);
      if (d) {
        d[toEnv] = d[fromEnv];
        const appObj = this.appById(app);
        this.audit('release gepromoot', `${app} → ${toEnv}`);
        this.emit('release.promoted', { title: `${appObj?.name || app} ${d[toEnv]} gepromoot naar ${toEnv}`, resource: app, target: `/apps/${app}`, team: appObj?.team, severity: toEnv === 'prod' ? 'success' : 'info' });
        if (toEnv === 'prod') {
          this.emit('deploy.completed', { title: `${appObj?.name || app} ${d.prod} live op productie`, resource: app, target: `/apps/${app}`, team: appObj?.team });
        }
      }
    },

    // --- Code / PR / issue events (emitted from code + AI flows) ---
    emitCodeEvent(type, opts) {
      return this.emit(type, opts);
    },

    // --- Registers (basisregistraties) ---
    connectRegister({ consumer, consumerType = 'app', register, field }) {
      const id = nextId('rc');
      this.registerConsumers.push({ id, register, consumer, via: field, type: consumerType });
      const reg = this.registerById(register);
      this.audit('databron aangesloten', `${reg?.name || register} → ${consumer}`);
      this.emit('register.connected', { title: `${reg?.name || register} aangesloten op ${consumer}`, resource: register, target: `/registers/${register}` });
      return id;
    },

    // --- Wetten (RegelRecht: law -> system) ---
    harvestWet({ name, bwbId, layer = 'WET' }) {
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const w = {
        id, name, layer, bwbId, url: `https://wetten.overheid.nl/${bwbId}`,
        validFrom: '2026-01-01', version: '2026-01-01', status: 'harvested', coverage: 0,
        owner: this.teamOfPerson(this.currentUser)?.id || 'team-toeslagen', service: null, traject: null,
        articles: [{ number: '1', title: 'Begripsbepalingen', legalCharacter: null, decisionType: null, definitions: [], parameters: [], inputs: [], outputs: [], openTerms: [] }],
      };
      this.wetten.push(w);
      this.audit('wet geharvest', name);
      this.emit('wet.harvested', { title: `${name} geharvest uit BWB`, resource: id, target: `/wetten/${id}`, team: w.owner });
      return w;
    },
    createTraject({ name, wet, members = [], team }) {
      const id = `${(wet || 'traject').slice(0, 12)}-${(++_seq).toString(16).padStart(8, '0')}`;
      const t = { id, name, wet, status: 'concept', branch: id, members, team: team || this.teamOfPerson(this.currentUser)?.id, opened: 'zojuist' };
      this.trajecten.push(t);
      const w = this.wetById(wet);
      if (w) w.traject = id;
      this.audit('traject geopend', name);
      this.emit('traject.created', { title: `Traject geopend: ${name}`, resource: id, target: wet ? `/wetten/${wet}` : '/wetten', team: t.team });
      return t;
    },
    enrichWet(wetId, { inputs = [], outputs = [], coverage } = {}) {
      const w = this.wetById(wetId);
      if (!w) return;
      if (w.status === 'harvested') w.status = 'in bewerking';
      const art = w.articles[0];
      if (art) {
        if (inputs.length) art.inputs = inputs;
        if (outputs.length) art.outputs = outputs;
      }
      if (coverage != null) w.coverage = coverage;
      else w.coverage = Math.min(1, (w.coverage || 0) + 0.3);
      w.status = 'enriched';
      this.audit('wet machine-leesbaar gemaakt', w.name);
      this.emit('wet.enriched', { title: `${w.name} machine-leesbaar gemaakt`, resource: wetId, target: `/wetten/${wetId}`, team: w.owner });
      // Connecting a register input also registers a data-source consumer.
      for (const inp of inputs) {
        if (inp.source?.kind === 'register') {
          this.registerConsumers.push({ id: nextId('rc'), register: inp.source.id, consumer: wetId, via: inp.name, type: 'wet' });
        }
      }
    },
    runScenarios(wetId, { failOne = false } = {}) {
      const list = this.scenariosByWet(wetId);
      let failed = 0;
      list.forEach((sc, i) => {
        sc.status = failOne && i === 0 ? 'fail' : 'pass';
        if (sc.status === 'fail') failed++;
      });
      const w = this.wetById(wetId);
      if (failed) {
        this.emit('scenario.failed', { title: `${failed} scenario('s) gezakt voor ${w?.name || wetId}`, resource: wetId, target: `/wetten/${wetId}`, team: w?.owner, severity: 'warning' });
      } else {
        this.audit('wet gevalideerd', w?.name || wetId);
        this.emit('wet.validated', { title: `Alle scenario's groen voor ${w?.name || wetId}`, resource: wetId, target: `/wetten/${wetId}`, team: w?.owner });
      }
      return { total: list.length, failed };
    },
    publishWet(wetId) {
      const w = this.wetById(wetId);
      if (!w) return;
      w.status = 'gepubliceerd';
      if (w.traject) {
        const t = this.trajectById(w.traject);
        if (t) t.status = 'goedgekeurd';
        w.traject = null;
      }
      this.audit('wet gepubliceerd', w.name);
      this.emit('wet.published', { title: `${w.name} ${w.version} gepubliceerd naar corpus`, resource: wetId, target: `/wetten/${wetId}`, team: w.owner });
    },
    // Publish + generate the executing service via the app golden path.
    deployWetAsService(wetId, { template = 'tpl-rust-api' } = {}) {
      const w = this.wetById(wetId);
      if (!w) return null;
      if (w.status !== 'gepubliceerd') this.publishWet(wetId);
      const { app, repoId } = this.createApp({ name: `${w.name} uitvoering`, team: w.owner, template, withInfra: ['postgres'], visibility: 'open' });
      w.service = app.id;
      this.emit('wet.deployed', { title: `${w.name} uitgerold als dienst (${app.name})`, resource: wetId, target: `/apps/${app.id}`, team: w.owner });
      return { app, repoId };
    },

    // --- CI runners ---
    scaleRunner(id, delta) {
      const r = this.runnerById(id);
      if (!r) return;
      r.capacity = Math.max(1, r.capacity + delta);
      this.audit('runner-pool geschaald', `${r.name} → ${r.capacity} jobs`);
      this.emit('runner.scaled', { title: `Runner-pool ${r.name} geschaald naar ${r.capacity} parallelle jobs`, resource: r.id, target: '/environments/runners', team: r.team });
    },
    toggleRunnerStandby(id) {
      const r = this.runnerById(id);
      if (!r) return;
      r.status = r.status === 'stand-by' ? 'operationeel' : 'stand-by';
      this.emit(r.status === 'operationeel' ? 'runner.online' : 'runner.offline', { title: `Runner-pool ${r.name} is nu ${r.status}`, resource: r.id, target: '/environments/runners', team: r.team });
    },
  },
});
