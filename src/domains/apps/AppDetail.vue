<script setup>
// App detail: the hub of the person -> team -> app -> instance -> rack chain.
// Shows the repo, the team, the infra the app runs on, its deployments across
// environments, SLO health, incidents and security findings, plus a small SVG
// dependency graph so the relations are visible at a glance.
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();
const route = useRoute();

const app = computed(() => store.appById(route.params.id));
const team = computed(() => (app.value ? store.teamById(app.value.team) : null));
const repo = computed(() => (app.value ? store.repoById(app.value.repo) : null));
const instances = computed(() => (app.value ? store.instancesByApp(app.value.id) : []));
const deployment = computed(() => store.deployments.find((d) => d.app === app.value?.id));
const slo = computed(() => store.slos.find((s) => s.service === app.value?.id));
const incidents = computed(() => store.incidents.filter((i) => i.service === app.value?.id));
const vulns = computed(() => store.vulnerabilities.filter((v) => v.app === app.value?.id));
const releases = computed(() => store.releases.filter((r) => r.app === app.value?.id));
const members = computed(() =>
  (team.value?.members || []).map((id) => store.personById(id)).filter(Boolean),
);

const MATURITY_COLOR = { goud: 'success', zilver: 'accent', brons: 'neutral' };
const HEALTH = {
  ok: { color: 'success', label: 'Gezond' },
  warn: { color: 'warning', label: 'Aandacht' },
  critical: { color: 'critical', label: 'Verstoord' },
};

// Cross-layer relation chips for the sidebar.
const relationLinks = computed(() => {
  if (!app.value) return [];
  const links = [];
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  if (repo.value) links.push({ text: repo.value.name, to: `/code/${repo.value.id}`, icon: 'folder-stack' });
  for (const inst of instances.value) {
    links.push({ text: inst.name, to: `/infra/instances/${inst.id}`, icon: 'cloud' });
  }
  for (const inc of incidents.value) {
    links.push({ text: inc.title, to: `/incidenten/${inc.id}`, icon: 'exclamation-triangle' });
  }
  // RegelRecht cross-links: the law this app executes and the registers it reads.
  const wet = store.wetForApp(app.value.id);
  if (wet) links.push({ text: `Voert uit: ${wet.name}`, to: `/wetten/${wet.id}`, icon: 'certificate' });
  for (const rc of store.registersForConsumer(app.value.id)) {
    if (rc.register) {
      links.push({ text: `Leest ${rc.via} uit ${rc.register.name}`, to: `/registers/${rc.register.id}`, icon: 'cylinder-split' });
    }
  }
  return links;
});

const instanceColumns = [
  { key: 'name', label: 'Instance', mono: true },
  { key: 'kind', label: 'Type' },
  { key: 'env', label: 'Omgeving' },
  { key: 'size', label: 'Size' },
  { key: 'status', label: 'Status' },
  { key: 'costMonth', label: '€/mnd', align: 'right' },
  { key: 'dc', label: 'Datacenter' },
];

// --- Dependency graph layout (simple radial fan from the app node) ---
const graphNodes = computed(() => {
  if (!app.value) return [];
  const nodes = [{ id: app.value.id, label: app.value.name, type: 'app', x: 300, y: 130, to: null }];
  const deps = [];
  if (repo.value) deps.push({ id: repo.value.id, label: repo.value.name.split('/').pop(), type: 'repo', to: `/code/${repo.value.id}` });
  for (const inst of instances.value) {
    deps.push({ id: inst.id, label: inst.name, type: inst.kind, to: `/infra/instances/${inst.id}` });
  }
  if (team.value) deps.push({ id: team.value.id, label: team.value.name, type: 'team', to: `/teams/${team.value.id}` });

  const n = deps.length;
  const spread = 520;
  deps.forEach((d, i) => {
    const x = n === 1 ? 300 : 40 + (spread / Math.max(1, n - 1)) * i;
    nodes.push({ ...d, x, y: 260 });
  });
  return nodes;
});
const graphEdges = computed(() => {
  if (!app.value) return [];
  const root = graphNodes.value[0];
  return graphNodes.value.slice(1).map((nd) => ({ x1: root.x, y1: root.y + 26, x2: nd.x, y2: nd.y - 22, id: nd.id }));
});
const NODE_FILL = {
  app: '#154273', repo: '#39870c', team: '#a90061',
  postgres: '#01689b', kafka: '#01689b', kubernetes: '#01689b', llm: '#673ab7',
};
function nodeFill(type) {
  return NODE_FILL[type] || '#01689b';
}
</script>

<template>
  <div class="rp-page">
    <template v-if="!app">
      <PageHeader title="Applicatie niet gevonden" :crumbs="[{ text: 'Applicaties', href: '/apps' }]" />
      <nldd-inline-dialog title="Onbekende applicatie" supporting-text="Deze applicatie bestaat niet (meer)."></nldd-inline-dialog>
      <nldd-spacer size="16" />
      <router-link to="/apps"><nldd-button variant="primary" text="Terug naar catalogus" start-icon="rectangle-stack"></nldd-button></router-link>
    </template>

    <template v-else>
      <PageHeader
        :title="app.name"
        :lede="`${app.type} · eigendom van ${team?.name || app.team}`"
        :crumbs="[{ text: 'Home', href: '/' }, { text: 'Applicaties', href: '/apps' }, { text: app.name, href: `/apps/${app.id}` }]"
      >
        <template #actions>
          <router-link v-if="repo" :to="`/code/${repo.id}`">
            <nldd-button variant="secondary" text="Repository" start-icon="folder-stack"></nldd-button>
          </router-link>
          <router-link to="/apps/nieuw">
            <nldd-button variant="primary" text="Vergelijkbare app" start-icon="plus"></nldd-button>
          </router-link>
        </template>
      </PageHeader>

      <!-- Headline metrics -->
      <nldd-container layout="grid" column-count="4" gap="16">
        <MetricCard
          :value="HEALTH[app.health]?.label || app.health"
          label="Health"
          :sub="slo ? `SLO ${slo.current}% / ${slo.target}%` : 'geen SLO'"
          icon="heart"
        />
        <MetricCard :value="app.maturity" label="Maturity" sub="gebaand-pad-niveau" icon="starburst-filled" />
        <MetricCard :value="instances.length" label="Infra-componenten" sub="instances in gebruik" icon="cloud" />
        <MetricCard
          :value="repo ? repo.openPrs : 0"
          label="Open PR's"
          :sub="repo ? `${repo.openIssues} open issues` : '—'"
          icon="folder-stack"
          :to="repo ? `/code/${repo.id}` : ''"
        />
      </nldd-container>

      <nldd-spacer size="24" />

      <div class="rp-detail-grid">
        <!-- Main column -->
        <div class="rp-detail-main">
          <!-- Overview card -->
          <nldd-card>
            <nldd-container padding="24">
              <nldd-title size="4"><h2>Overzicht</h2></nldd-title>
              <nldd-spacer size="12" />
              <div class="rp-kv">
                <div><span class="rp-k">Type</span><nldd-tag color="neutral" size="md">{{ app.type }}</nldd-tag></div>
                <div><span class="rp-k">Maturity</span><nldd-tag :color="MATURITY_COLOR[app.maturity] || 'neutral'" size="md">{{ app.maturity }}</nldd-tag></div>
                <div><span class="rp-k">Health</span><nldd-tag :color="HEALTH[app.health]?.color || 'neutral'" size="md">{{ HEALTH[app.health]?.label || app.health }}</nldd-tag></div>
                <div>
                  <span class="rp-k">Repository</span>
                  <router-link v-if="repo" :to="`/code/${repo.id}`" class="rp-mono rp-inline-link">{{ repo.name }}</router-link>
                  <span v-else>—</span>
                </div>
                <div>
                  <span class="rp-k">Licentie</span>
                  <nldd-tag v-if="repo" color="success" size="md">{{ repo.license }}</nldd-tag>
                  <span v-else>—</span>
                </div>
                <div>
                  <span class="rp-k">Zichtbaarheid</span>
                  <nldd-tag v-if="repo" :color="repo.visibility === 'open' ? 'success' : 'neutral'" size="md">{{ repo.visibility }}</nldd-tag>
                  <span v-else>—</span>
                </div>
              </div>
              <nldd-spacer size="16" />
              <div class="rp-stack-row">
                <span class="rp-k">Stack</span>
                <nldd-tag v-for="s in app.stack" :key="s" color="accent" size="md">{{ s }}</nldd-tag>
                <span v-if="!app.stack?.length" class="rp-muted">nog geen stack geregistreerd</span>
              </div>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="20" />

          <!-- Dependency graph -->
          <nldd-card>
            <nldd-container padding="24">
              <nldd-title size="4"><h2>Afhankelijkheden</h2></nldd-title>
              <nldd-spacer size="6" />
              <nldd-rich-text><p>De applicatie en alles waar hij aan hangt. Klik een knoop om door te navigeren.</p></nldd-rich-text>
              <nldd-spacer size="12" />
              <svg class="rp-graph" viewBox="0 0 600 320" role="img" aria-label="Afhankelijkhedengraaf">
                <line
                  v-for="e in graphEdges"
                  :key="e.id"
                  :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2"
                  class="rp-graph-edge"
                />
                <g v-for="nd in graphNodes" :key="nd.id" :class="{ 'rp-graph-clickable': nd.to }" @click="nd.to && $router.push(nd.to)">
                  <rect
                    :x="nd.x - 78" :y="nd.y - (nd.type === 'app' ? 26 : 22)"
                    :width="156" :height="nd.type === 'app' ? 52 : 44"
                    rx="10"
                    :fill="nodeFill(nd.type)"
                    :opacity="nd.type === 'app' ? 1 : 0.92"
                  />
                  <text :x="nd.x" :y="nd.y - 4" class="rp-graph-type">{{ nd.type }}</text>
                  <text :x="nd.x" :y="nd.y + 11" class="rp-graph-label">{{ nd.label }}</text>
                </g>
              </svg>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="20" />

          <!-- Infra instances -->
          <nldd-card>
            <nldd-container padding="24">
              <nldd-title size="4"><h2>Infra</h2></nldd-title>
              <nldd-spacer size="12" />
              <DataTable :columns="instanceColumns" :rows="instances" row-key="id">
                <template #cell="{ row, col, value }">
                  <router-link v-if="col.key === 'name'" :to="`/infra/instances/${row.id}`" class="rp-mono rp-inline-link">{{ value }}</router-link>
                  <StatusBadge v-else-if="col.key === 'status'" :status="value" />
                  <router-link v-else-if="col.key === 'dc'" :to="`/fysiek/datacenters/${value}`" class="rp-inline-link">{{ value }}</router-link>
                  <span v-else-if="col.key === 'costMonth'">€ {{ value }}</span>
                  <span v-else>{{ value }}</span>
                </template>
              </DataTable>
              <nldd-spacer size="12" />
              <router-link to="/infra">
                <nldd-button variant="secondary" text="Infra bijbestellen" start-icon="plus" size="sm"></nldd-button>
              </router-link>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="20" />

          <!-- Deployments across environments -->
          <nldd-card v-if="deployment">
            <nldd-container padding="24">
              <nldd-title size="4"><h2>Omgevingen</h2></nldd-title>
              <nldd-spacer size="12" />
              <div class="rp-envs">
                <div v-for="env in store.environments" :key="env" class="rp-env">
                  <span class="rp-env-name">{{ env }}</span>
                  <span class="rp-env-ver rp-mono">{{ deployment[env] || '—' }}</span>
                </div>
              </div>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="20" />

          <!-- Recent releases -->
          <nldd-card v-if="releases.length">
            <nldd-container padding="24">
              <nldd-title size="4"><h2>Recente releases</h2></nldd-title>
              <nldd-spacer size="12" />
              <nldd-list>
                <nldd-list-item v-for="r in releases" :key="r.id">
                  <nldd-icon-cell slot="start" name="arrow-up-arrow-down"></nldd-icon-cell>
                  <nldd-title-cell :overline="`${r.version} → ${r.env}`" :text="r.notes"></nldd-title-cell>
                  <nldd-text-cell slot="end" :text="`${r.when} · ${r.by}`"></nldd-text-cell>
                </nldd-list-item>
              </nldd-list>
            </nldd-container>
          </nldd-card>
        </div>

        <!-- Sidebar -->
        <div class="rp-detail-side">
          <RelationLinks title="Gerelateerd" :links="relationLinks" />

          <nldd-spacer size="16" />

          <!-- SLO -->
          <nldd-card v-if="slo">
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Service-niveau</h3></nldd-title>
              <nldd-spacer size="12" />
              <div class="rp-slo-row"><span>Doel</span><strong>{{ slo.target }}%</strong></div>
              <div class="rp-slo-row"><span>Actueel</span><strong :class="slo.current >= slo.target ? 'rp-ok' : 'rp-bad'">{{ slo.current }}%</strong></div>
              <nldd-spacer size="8" />
              <span class="rp-k">Error-budget resterend</span>
              <div class="rp-budget-bar">
                <div class="rp-budget-fill" :class="slo.budgetLeft < 20 ? 'rp-budget-low' : ''" :style="{ width: slo.budgetLeft + '%' }"></div>
              </div>
              <span class="rp-budget-num">{{ slo.budgetLeft }}%</span>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="16" />

          <!-- Team members -->
          <nldd-card v-if="members.length">
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Team</h3></nldd-title>
              <nldd-spacer size="12" />
              <nldd-list>
                <router-link v-for="m in members" :key="m.id" :to="`/teams/mensen/${m.id}`" class="rp-member">
                  <span class="rp-avatar">{{ m.avatar }}</span>
                  <span class="rp-member-text">
                    <strong>{{ m.name }}</strong>
                    <span>{{ m.role }}</span>
                  </span>
                  <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
                </router-link>
              </nldd-list>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="16" />

          <!-- Security findings -->
          <nldd-card>
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Security</h3></nldd-title>
              <nldd-spacer size="12" />
              <template v-if="vulns.length">
                <div v-for="v in vulns" :key="v.id" class="rp-vuln">
                  <nldd-tag :color="v.severity === 'critical' ? 'critical' : 'warning'" size="md">{{ v.severity }}</nldd-tag>
                  <span class="rp-mono">{{ v.cve }}</span>
                  <StatusBadge :status="v.status" />
                </div>
              </template>
              <div v-else class="rp-clean">
                <nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>
                <span>Geen openstaande bevindingen</span>
              </div>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="16" />

          <!-- Incidents -->
          <nldd-card v-if="incidents.length">
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Incidenten</h3></nldd-title>
              <nldd-spacer size="12" />
              <router-link v-for="inc in incidents" :key="inc.id" :to="`/incidenten/${inc.id}`" class="rp-inc">
                <StatusBadge :status="inc.severity" />
                <span class="rp-inc-title">{{ inc.title }}</span>
                <StatusBadge :status="inc.status" />
              </router-link>
            </nldd-container>
          </nldd-card>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.rp-muted { opacity: 0.7; }
.rp-inline-link { color: var(--semantics-actions-primary-default-background-color); text-decoration: none; }
.rp-inline-link:hover { text-decoration: underline; }

.rp-detail-grid { display: grid; grid-template-columns: minmax(0, 2.1fr) minmax(260px, 1fr); gap: 1.25rem; align-items: start; }
@media (max-width: 900px) { .rp-detail-grid { grid-template-columns: 1fr; } }

.rp-kv { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.85rem 1.25rem; }
.rp-kv > div { display: flex; flex-direction: column; gap: 0.3rem; align-items: flex-start; }
.rp-k { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; }
.rp-stack-row { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }

.rp-graph { width: 100%; height: auto; max-height: 340px; }
.rp-graph-edge { stroke: var(--semantics-dividers-color); stroke-width: 2; }
.rp-graph-type { fill: #fff; opacity: 0.8; font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; text-anchor: middle; }
.rp-graph-label { fill: #fff; font-size: 11px; font-weight: 600; text-anchor: middle; }
.rp-graph-clickable { cursor: pointer; }
.rp-graph-clickable:hover rect { filter: brightness(1.12); }

.rp-envs { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.rp-env { flex: 1 1 110px; border: 1px solid var(--semantics-dividers-color); border-radius: 10px; padding: 0.6rem 0.8rem; display: flex; flex-direction: column; gap: 0.25rem; }
.rp-env-name { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; }
.rp-env-ver { font-weight: 600; }

.rp-slo-row { display: flex; justify-content: space-between; padding: 0.2rem 0; }
.rp-ok { color: #2e7d32; }
.rp-bad { color: #b00020; }
.rp-budget-bar { height: 8px; border-radius: 999px; background: var(--semantics-surfaces-tinted-background-color); overflow: hidden; margin: 0.35rem 0 0.25rem; }
.rp-budget-fill { height: 100%; background: #2e7d32; border-radius: 999px; }
.rp-budget-low { background: #c8a200; }
.rp-budget-num { font-size: 0.8rem; opacity: 0.7; }

.rp-member { display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0; text-decoration: none; color: inherit; }
.rp-member:hover { background: var(--semantics-surfaces-tinted-background-color); border-radius: 8px; }
.rp-member nldd-icon { width: 1rem; height: 1rem; margin-left: auto; opacity: 0.5; }
.rp-avatar { display: inline-flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 50%; background: var(--semantics-surfaces-tinted-background-color); font-size: 0.72rem; font-weight: 700; flex: none; }
.rp-member-text { display: flex; flex-direction: column; }
.rp-member-text span { font-size: 0.8rem; opacity: 0.7; }

.rp-vuln { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; padding: 0.35rem 0; font-size: 0.85rem; }
.rp-clean { display: flex; align-items: center; gap: 0.5rem; opacity: 0.8; font-size: 0.9rem; }
.rp-clean nldd-icon { width: 1.2rem; height: 1.2rem; color: #2e7d32; }

.rp-inc { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0; text-decoration: none; color: inherit; }
.rp-inc:hover { text-decoration: none; }
.rp-inc-title { flex: 1 1 auto; font-size: 0.88rem; }
</style>
