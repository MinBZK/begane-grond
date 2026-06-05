<script setup>
// CI runners (Forgejo Actions runners). The cross-layer story a generic CI host
// cannot tell: every runner pool runs on a real node, in a rack, in a
// datacenter. This page shows the pools (load + labels + status), the live CI
// job queue feeding them, and deep links down into the physical layer.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

const util = computed(() => store.runnerUtilisation);

function loadPct(r) {
  return r.capacity ? Math.round((r.running / r.capacity) * 100) : 0;
}
function loadColor(pct) {
  if (pct >= 90) return 'critical';
  if (pct >= 70) return 'warning';
  return 'success';
}
function teamName(id) {
  return store.teamById(id)?.name || id;
}
function rackLabel(id) {
  return store.rackById(id)?.label || id;
}
function dcName(id) {
  return store.datacenterById(id)?.name || id;
}

const jobColumns = [
  { key: 'id', label: 'Job', mono: true },
  { key: 'repo', label: 'Repository' },
  { key: 'workflow', label: 'Workflow', mono: true },
  { key: 'pool', label: 'Pool' },
  { key: 'status', label: 'Status' },
  { key: 'duration', label: 'Duur', align: 'right' },
];
const jobRows = computed(() =>
  store.ciJobs.map((j) => ({
    ...j,
    repoName: store.repoById(j.repo)?.name || j.repo,
    poolName: store.runnerById(j.pool)?.name || j.pool,
  })),
);

function scale(r, delta) {
  store.scaleRunner(r.id, delta);
}
function toggleStandby(r) {
  store.toggleRunnerStandby(r.id);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="CI-runners"
      lede="De CI-runners die Forgejo Actions op code.overheid.nl uitvoeren. Geen abstracte cloud: elke runner-pool draait op echte nodes in een rack in een datacenter. Hier zie je de belasting, de wachtrij en de fysieke plek."
      :crumbs="[
        { text: 'Omgevingen', href: '/environments' },
        { text: 'CI-runners', href: '/environments/runners' },
      ]"
    >
      <template #actions>
        <router-link to="/environments">
          <nldd-button variant="secondary" text="Omgevingen" start-icon="arrow-up-arrow-down"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <!-- KPIs -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.runners.length" label="Runner-pools" sub="Forgejo Actions" icon="ship-wheel" />
      <MetricCard :value="`${util.running}/${util.capacity}`" label="Jobs in uitvoering" :sub="`${util.pct}% benut`" icon="gear" />
      <MetricCard :value="util.queued" label="In de wachtrij" sub="wachten op een slot" icon="clock" />
      <MetricCard :value="store.ciJobs.filter((j) => j.status === 'failing').length" label="Falende jobs" sub="vragen aandacht" icon="exclamation-triangle" to="/code" />
    </nldd-container>

    <nldd-spacer size="28" />

    <!-- Runner pools -->
    <nldd-title size="3"><h2>Runner-pools</h2></nldd-title>
    <nldd-rich-text>
      <p>Een pool is een set runners met dezelfde labels. Jobs kiezen een pool met <code>runs-on</code>. Schaal een pool op of zet hem op stand-by.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="440px">
      <nldd-card v-for="r in store.runners" :key="r.id" :accessible-label="r.name">
        <nldd-container padding="20">
          <div class="rp-runner-head">
            <nldd-icon name="ship-wheel" aria-hidden="true" class="rp-runner-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <nldd-title size="4"><h3>{{ r.name }}</h3></nldd-title>
              <p class="rp-runner-sub">{{ r.kind }} · {{ teamName(r.team) }}</p>
            </div>
            <StatusBadge :status="r.status" />
          </div>

          <nldd-spacer size="10" />
          <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
            <nldd-tag v-for="l in r.labels" :key="l" color="neutral" size="md">{{ l }}</nldd-tag>
            <nldd-tag v-if="r.autoscale" color="accent" size="md">autoscale</nldd-tag>
          </nldd-container>

          <!-- Load bar -->
          <nldd-spacer size="14" />
          <div class="rp-runner-loadrow">
            <span>Belasting</span>
            <span class="rp-runner-loadval">{{ r.running }}/{{ r.capacity }} jobs<span v-if="r.queued"> · {{ r.queued }} in wachtrij</span></span>
          </div>
          <div class="rp-runner-bar">
            <div class="rp-runner-fill" :class="`rp-fill-${loadColor(loadPct(r))}`" :style="{ width: loadPct(r) + '%' }"></div>
          </div>

          <!-- Cross-layer: where this pool physically runs -->
          <nldd-spacer size="14" />
          <div class="rp-runner-where">
            <span class="rp-runner-where-label">Draait op</span>
            <span class="rp-mono">{{ r.node }}</span>
            <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
            <router-link :to="`/fysiek/racks/${r.rack}`" class="rp-link">Rack {{ rackLabel(r.rack) }}</router-link>
            <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
            <router-link :to="`/fysiek/datacenters/${r.dc}`" class="rp-link">{{ dcName(r.dc) }}</router-link>
          </div>

          <nldd-spacer size="16" />
          <nldd-button-group orientation="horizontal">
            <nldd-button variant="secondary" size="sm" text="Opschalen" start-icon="plus" @click="scale(r, 2)"></nldd-button>
            <nldd-button variant="secondary" size="sm" text="Afschalen" start-icon="minus" @click="scale(r, -2)"></nldd-button>
            <nldd-button variant="secondary" size="sm" :text="r.status === 'stand-by' ? 'Activeren' : 'Stand-by'" @click="toggleStandby(r)"></nldd-button>
          </nldd-button-group>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- Live job queue -->
    <nldd-title size="3"><h2>Live CI-jobs</h2></nldd-title>
    <nldd-rich-text>
      <p>De Forgejo Actions-jobs die nu draaien, wachten of net klaar zijn, met de pool waarop ze landen.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <DataTable :columns="jobColumns" :rows="jobRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'repo'">
          <router-link :to="`/code/${row.repo}`" class="rp-link">{{ row.repoName }}</router-link>
        </template>
        <template v-else-if="col.key === 'pool'">
          <span class="rp-mono">{{ row.poolName }}</span>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="value === 'passed' ? 'ok' : value === 'failing' ? 'failing' : value === 'running' ? 'provisioning' : 'requested'" />
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <!-- How a job selects a runner -->
    <nldd-card accessible-label="runs-on voorbeeld">
      <nldd-container padding="20">
        <nldd-title size="5"><h3>Een job kiest een runner-pool</h3></nldd-title>
        <nldd-spacer size="8" />
        <nldd-rich-text><p>In <code>.forgejo/workflows/ci.yml</code> selecteert <code>runs-on</code> de pool via zijn labels.</p></nldd-rich-text>
        <nldd-spacer size="10" />
        <nldd-code-viewer language="yaml">{{ `jobs:
  test:
    runs-on: nldd-runner   # pool 'shared', node k8s-node-01 @ rack DH-A1
    steps:
      - run: just check` }}</nldd-code-viewer>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="20" />
    <CliHint command="bg runner scale shared --jobs 16" />
  </div>
</template>

<style scoped>
.rp-runner-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-runner-icon {
  width: 1.6rem;
  height: 1.6rem;
  flex: 0 0 auto;
  opacity: 0.8;
}
.rp-runner-sub {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  opacity: 0.65;
}
.rp-runner-loadrow {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}
.rp-runner-loadval {
  opacity: 0.7;
}
.rp-runner-bar {
  height: 0.5rem;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-runner-fill {
  height: 100%;
  border-radius: 999px;
}
.rp-fill-success { background: #2e8540; }
.rp-fill-warning { background: #d98a1f; }
.rp-fill-critical { background: #d52b1e; }
.rp-runner-where {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  font-size: 0.88rem;
}
.rp-runner-where-label {
  opacity: 0.6;
}
.rp-runner-where nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
  opacity: 0.4;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
</style>
