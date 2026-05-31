// The single in-memory platform store. Holds every domain's data (seeded from
// src/data/seed.js) plus cross-relation lookups and the fake "provisioning"
// actions. Edits mutate state live and reset on refresh — exactly what the
// clickable demo needs. Domain views read these arrays and call these helpers.
import { defineStore } from 'pinia';
import * as seed from '../data/seed.js';

// Deep clone the seed so the store owns mutable copies (refresh resets it).
const clone = (v) => JSON.parse(JSON.stringify(v));

let _seq = 1000;
const nextId = (prefix) => `${prefix}-${++_seq}`;

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
    images: clone(seed.images),
    workplaces: clone(seed.workplaces),
    environments: clone(seed.environments),
    deployments: clone(seed.deployments),
    releases: clone(seed.releases),
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
    learningPaths: clone(seed.learningPaths),
    // The "logged in" demo user.
    currentUser: 'ans',
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
  },

  actions: {
    audit(action, resource) {
      this.auditLog.unshift({ id: nextId('a'), actor: this.currentUser, action, resource, at: 'zojuist' });
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
      this.runStatusChain(inst, ['provisioning', 'ready']);
      return inst;
    },
    scaleInstance(id) {
      const i = this.instanceById(id);
      if (i) this.audit('instance geschaald', i.name);
    },
    deleteInstance(id) {
      const i = this.instanceById(id);
      this.instances = this.instances.filter((x) => x.id !== id);
      if (i) this.audit('instance verwijderd', i.name);
    },

    // --- Apps / golden path ---
    createApp({ name, team, template, withInfra = [], visibility = 'open' }) {
      const id = nextId('app');
      const repoId = nextId('repo');
      this.repos.push({ id: repoId, name: `rijksict/${name.toLowerCase().replace(/\s+/g, '-')}`, visibility, lang: template?.includes('rust') ? 'Rust' : template?.includes('python') ? 'Python' : 'Vue', stars: 0, openPrs: 0, openIssues: 0, ci: 'green', license: 'EUPL-1.2', app: id });
      const app = { id, name, team, type: 'service', stack: [], repo: repoId, maturity: 'brons', health: 'ok' };
      this.apps.push(app);
      for (const kind of withInfra) {
        this.orderInstance({ kind, name: `${name.toLowerCase().replace(/\s+/g, '-')}-${kind}`, team, app: id, env: 'dev', size: 'S' });
      }
      this.audit('applicatie aangemaakt', name);
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
      this.audit('werkplek uitgerold', `${wp.id} → ${person}`);
      this.runStatusChain(wp, ['provisioning', 'geleverd', 'in gebruik']);
      return wp;
    },

    // --- Secrets ---
    rotateSecret(id) {
      const sec = this.secrets.find((x) => x.id === id);
      if (sec) {
        sec.rotated = 'zojuist';
        this.audit('secret geroteerd', sec.name);
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
    },

    // --- Incidents ---
    ackIncident(id) {
      const i = this.incidents.find((x) => x.id === id);
      if (i) { i.status = 'mitigated'; this.audit('incident bevestigd', i.id); }
    },

    // --- Environments ---
    promote(app, fromEnv, toEnv) {
      const d = this.deployments.find((x) => x.app === app);
      if (d) { d[toEnv] = d[fromEnv]; this.audit('release gepromoot', `${app} → ${toEnv}`); }
    },
  },
});
