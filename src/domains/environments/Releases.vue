<script setup>
// Release history + deploy pipeline view. The top shows the release log as a
// timeline (who promoted what, where, when, with notes). Below that a table of
// the same data for scanning, and a "deploy pijplijn" status chain
// (build -> test -> scan -> deploy) per app derived from the current
// environment matrix. New releases created in the promotion wizard appear here
// live because everything reads from the store.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();

const ENV_LABEL = { dev: 'Dev', test: 'Test', acc: 'Acceptatie', prod: 'Productie' };

function appName(id) {
  const a = store.appById(id);
  return a ? a.name : id;
}
function personName(id) {
  const p = store.personById(id);
  return p ? p.name : id;
}

const releases = computed(() => store.releases);

const prodReleases = computed(() => releases.value.filter((r) => r.env === 'prod').length);
const releasingApps = computed(() => new Set(releases.value.map((r) => r.app)).size);

// The release history scales into the hundreds, so the timeline and the log
// table both render through a search filter (app name, version, person, note)
// and an initial cap with a "toon meer" button instead of dumping everything.
const query = ref('');
const relLimit = ref(20);

const filteredReleases = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return releases.value;
  return releases.value.filter((r) => {
    const hay = `${appName(r.app)} ${r.version} ${personName(r.by)} ${ENV_LABEL[r.env] || r.env} ${r.notes || ''}`.toLowerCase();
    return hay.includes(q);
  });
});
const visibleReleases = computed(() => filteredReleases.value.slice(0, relLimit.value));
const relMore = computed(() => Math.max(0, filteredReleases.value.length - relLimit.value));
function showMoreReleases() {
  relLimit.value += 20;
}

const tableColumns = [
  { key: 'app', label: 'Applicatie' },
  { key: 'version', label: 'Versie', mono: true },
  { key: 'env', label: 'Omgeving' },
  { key: 'by', label: 'Door' },
  { key: 'when', label: 'Wanneer' },
  { key: 'notes', label: 'Notitie' },
];

// Deploy pipeline per app: build/test/scan are "klaar" when CI is green and
// there is no open critical finding; deploy is "klaar" when prod matches dev,
// otherwise it is "bezig" (there is something waiting to ship).
const PIPELINE = [
  { id: 'build', label: 'Build', icon: 'terminal' },
  { id: 'test', label: 'Test', icon: 'check-mark-circle' },
  { id: 'scan', label: 'Scan', icon: 'shield-check-mark' },
  { id: 'deploy', label: 'Deploy', icon: 'cloud' },
];

const pipelines = computed(() =>
  store.deployments.map((d) => {
    const app = store.appById(d.app);
    const repo = app ? store.repoById(app.repo) : null;
    const ciGreen = repo?.ci === 'green';
    const openCritical = store.vulnerabilities.some(
      (v) => v.app === d.app && v.status !== 'opgelost' && (v.severity === 'critical' || v.severity === 'high')
    );
    const shipped = d.dev === d.prod;
    const stage = (id) => {
      if (id === 'build') return ciGreen ? 'ready' : 'failing';
      if (id === 'test') return ciGreen ? 'ready' : 'failing';
      if (id === 'scan') return openCritical ? 'failing' : 'ready';
      // deploy
      if (!ciGreen || openCritical) return 'requested';
      return shipped ? 'ready' : 'running';
    };
    return {
      app: d.app,
      name: app ? app.name : d.app,
      repo,
      prodVersion: d.prod,
      devVersion: d.dev,
      pending: !shipped,
      stages: PIPELINE.map((s) => ({ ...s, status: stage(s.id) })),
    };
  })
);

// There are over a hundred deployments; rendering a four-stage chain for each
// makes the panel endless. By default we only show apps with a pending deploy
// (dev ahead of prod) plus a count of the ones already shipped, with a toggle
// to reveal the full fleet.
const pipeAll = ref(false);
const pendingPipelines = computed(() => pipelines.value.filter((p) => p.pending));
const shippedCount = computed(() => pipelines.value.length - pendingPipelines.value.length);
const visiblePipelines = computed(() => (pipeAll.value ? pipelines.value : pendingPipelines.value));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Releases"
      lede="Release-historie en de actuele deploy-pijplijn per applicatie. Build, test, scan en deploy als één doorlopende keten."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Omgevingen', href: '/environments' },
        { text: 'Releases', href: '/environments/releases' },
      ]"
    >
      <template #actions>
        <router-link to="/environments">
          <nldd-button variant="secondary" text="Versiematrix" start-icon="arrow-up-arrow-down"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="releases.length" label="Releases gelogd" sub="totaal" icon="clock" />
      <MetricCard :value="prodReleases" label="Naar productie" sub="in deze historie" icon="cloud" />
      <MetricCard :value="releasingApps" label="Applicaties" sub="met release-activiteit" icon="rectangle-stack" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Shared search over both the timeline and the release log below. -->
    <nldd-search-field
      placeholder="Zoek op applicatie, versie, persoon of notitie"
      accessible-label="Zoek release"
      :value="query"
      @input="(e) => (query = e.target.value)"
    ></nldd-search-field>

    <nldd-spacer size="16" />

    <nldd-container layout="grid" column-count="2" gap="16">
      <!-- Timeline -->
      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Release-tijdlijn</h2></nldd-title>
          <nldd-spacer size="16" />
          <ol class="rp-timeline">
            <li v-for="rel in visibleReleases" :key="rel.id" class="rp-tl-item">
              <span class="rp-tl-dot" :class="`rp-env-${rel.env}`"></span>
              <div class="rp-tl-body">
                <div class="rp-tl-head">
                  <router-link :to="`/apps/${rel.app}`" class="rp-tl-app">{{ appName(rel.app) }}</router-link>
                  <span class="rp-tl-ver">{{ rel.version }}</span>
                  <StatusBadge :status="rel.env === 'prod' ? 'productie' : 'ready'" size="sm" />
                </div>
                <div class="rp-tl-meta">
                  naar {{ ENV_LABEL[rel.env] || rel.env }} · door {{ personName(rel.by) }} · {{ rel.when }}
                </div>
                <div v-if="rel.notes" class="rp-tl-notes">{{ rel.notes }}</div>
              </div>
            </li>
            <li v-if="!filteredReleases.length" class="rp-tl-empty">
              {{ query ? 'Geen releases gevonden.' : 'Nog geen releases gelogd.' }}
            </li>
          </ol>
          <nldd-spacer v-if="relMore > 0" size="12" />
          <nldd-button
            v-if="relMore > 0"
            variant="secondary"
            :text="`Toon meer (nog ${relMore})`"
            start-icon="chevron-down"
            @click="showMoreReleases"
          ></nldd-button>
        </nldd-container>
      </nldd-card>

      <!-- Deploy pipeline status chain per app -->
      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Deploy-pijplijn</h2></nldd-title>
          <nldd-spacer size="4" />
          <nldd-rich-text>
            <p>Status per applicatie. Een lopende deploy betekent dat dev voorloopt op productie.</p>
          </nldd-rich-text>
          <nldd-spacer size="12" />

          <div class="rp-pipe-bar">
            <nldd-tag color="success" size="md">{{ shippedCount }} op productie gelijk</nldd-tag>
            <nldd-button
              variant="secondary"
              :text="pipeAll ? `Alleen lopende (${pendingPipelines.length})` : `Toon alle (${pipelines.length})`"
              :start-icon="pipeAll ? 'chevron-down' : 'rectangle-stack'"
              @click="pipeAll = !pipeAll"
            ></nldd-button>
          </div>

          <nldd-spacer size="16" />

          <div class="rp-pipes">
            <div v-for="p in visiblePipelines" :key="p.app" class="rp-pipe-row">
              <div class="rp-pipe-head">
                <router-link :to="`/apps/${p.app}`" class="rp-pipe-app">{{ p.name }}</router-link>
                <span v-if="p.pending" class="rp-pipe-pending">
                  {{ p.prodVersion }} → {{ p.devVersion }}
                </span>
                <StatusBadge v-else status="ok" size="sm" />
              </div>
              <div class="rp-pipe-chain">
                <template v-for="(s, i) in p.stages" :key="s.id">
                  <div class="rp-pipe-stage" :class="`rp-st-${s.status}`">
                    <nldd-icon :name="s.status === 'ready' ? 'check-mark' : s.icon" aria-hidden="true"></nldd-icon>
                    <span>{{ s.label }}</span>
                  </div>
                  <span v-if="i < p.stages.length - 1" class="rp-pipe-conn" :class="{ 'rp-pipe-conn-done': s.status === 'ready' }"></span>
                </template>
              </div>
            </div>
            <p v-if="!visiblePipelines.length" class="rp-tl-empty">
              Alles staat gelijk met productie. Geen lopende deploys.
            </p>
          </div>
        </nldd-container>
      </nldd-card>
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Release-log</h2></nldd-title>
        <nldd-spacer size="16" />
        <DataTable :columns="tableColumns" :rows="visibleReleases" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'app'">
              <router-link :to="`/apps/${row.app}`" class="rp-cell-link">{{ appName(row.app) }}</router-link>
            </template>
            <template v-else-if="col.key === 'env'">
              <StatusBadge :status="row.env === 'prod' ? 'productie' : 'ready'" size="sm" />
              <span class="rp-env-name">{{ ENV_LABEL[row.env] || row.env }}</span>
            </template>
            <template v-else-if="col.key === 'by'">{{ personName(row.by) }}</template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>
        <nldd-spacer v-if="relMore > 0" size="12" />
        <nldd-button
          v-if="relMore > 0"
          variant="secondary"
          :text="`Toon meer (nog ${relMore})`"
          start-icon="chevron-down"
          @click="showMoreReleases"
        ></nldd-button>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}
.rp-tl-item {
  position: relative;
  padding: 0 0 1.1rem 1.6rem;
  border-left: 2px solid var(--semantics-dividers-color);
}
.rp-tl-item:last-child {
  border-left-color: transparent;
  padding-bottom: 0;
}
.rp-tl-dot {
  position: absolute;
  left: -7px;
  top: 0.15rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #aaa;
  box-shadow: 0 0 0 3px var(--semantics-surfaces-background-color);
}
.rp-tl-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-tl-app {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}
.rp-tl-app:hover {
  text-decoration: underline;
}
.rp-tl-ver {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.85rem;
  opacity: 0.85;
}
.rp-tl-meta {
  font-size: 0.82rem;
  opacity: 0.65;
  margin-top: 0.15rem;
}
.rp-tl-notes {
  font-size: 0.85rem;
  margin-top: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-tl-empty {
  opacity: 0.6;
}
.rp-env-dev { background: #8b8b8b; }
.rp-env-test { background: #2e7d9a; }
.rp-env-acc { background: #d98a00; }
.rp-env-prod { background: #1a7a3e; }

.rp-pipe-bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-pipes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-pipe-row {
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-pipe-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.rp-pipe-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}
.rp-pipe-app {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}
.rp-pipe-app:hover {
  text-decoration: underline;
}
.rp-pipe-pending {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.78rem;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: rgba(217, 138, 0, 0.12);
  color: #9a6200;
}
.rp-pipe-chain {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.rp-pipe-stage {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.6rem;
  border-radius: 8px;
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.82rem;
  font-weight: 600;
}
.rp-pipe-stage nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.7;
}
.rp-st-ready {
  background: rgba(26, 122, 62, 0.1);
  border-color: #1a7a3e;
}
.rp-st-ready nldd-icon {
  color: #1a7a3e;
  opacity: 1;
}
.rp-st-running {
  background: rgba(217, 138, 0, 0.1);
  border-color: #d98a00;
}
.rp-st-failing {
  background: rgba(176, 0, 32, 0.08);
  border-color: #b00020;
}
.rp-st-failing nldd-icon {
  color: #b00020;
  opacity: 1;
}
.rp-pipe-conn {
  width: 16px;
  height: 2px;
  background: var(--semantics-dividers-color);
}
.rp-pipe-conn-done {
  background: #1a7a3e;
}
.rp-cell-link {
  color: inherit;
  font-weight: 600;
}
.rp-env-name {
  margin-left: 0.4rem;
  font-size: 0.85rem;
  opacity: 0.75;
}
</style>
