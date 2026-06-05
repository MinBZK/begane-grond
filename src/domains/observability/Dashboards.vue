<script setup>
// Observability home: one dashboard tile per app/service with SVG sparklines
// for latency, throughput and error-rate. Clicking a tile opens a detail panel
// with larger charts, the live SLO and cross-layer relation links. All metric
// series are deterministically generated from the app id so the demo is stable
// across refreshes while still looking plausibly "real".
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';
import HavenBadge from '../../components/shared/HavenBadge.vue';
import Sparkline from './Sparkline.vue';

const store = usePlatformStore();

// --- Deterministic pseudo-random series, seeded by string -------------------
function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Build a smooth-ish series of `n` points in [min,max] with a gentle wave.
function series(id, salt, n, min, max, jitter = 0.18) {
  const rnd = seedFrom(id + salt);
  const out = [];
  let v = min + (max - min) * (0.4 + 0.2 * rnd());
  const drift = (rnd() - 0.5) * 0.04;
  for (let i = 0; i < n; i += 1) {
    const wave = Math.sin((i / n) * Math.PI * 2 * (1 + rnd() * 0.3)) * (max - min) * 0.12;
    v += drift * (max - min) + (rnd() - 0.5) * (max - min) * jitter;
    let val = v + wave;
    val = Math.max(min, Math.min(max, val));
    out.push(val);
    v = val;
  }
  return out;
}

const POINTS = 40;

// One enriched metric model per app.
const dashboards = computed(() =>
  store.apps.map((app) => {
    const team = store.teamById(app.team);
    const slo = store.slos.find((s) => s.service === app.id);
    const insts = store.instancesByApp(app.id);
    const openAlerts = store.alerts.filter((a) => a.service === app.id).length;

    const latency = series(app.id, 'lat', POINTS, 40, app.health === 'warn' ? 320 : 180);
    const throughput = series(app.id, 'rps', POINTS, 120, 1400, 0.22);
    const errorRate = series(app.id, 'err', POINTS, 0.02, app.health === 'warn' ? 2.4 : 0.9, 0.3);

    const last = (a) => a[a.length - 1];
    return {
      app,
      team,
      slo,
      insts,
      openAlerts,
      latency,
      throughput,
      errorRate,
      p99: Math.round(last(latency) + 60),
      rps: Math.round(last(throughput)),
      err: last(errorRate),
    };
  })
);

// --- KPI roll-up across all services ---------------------------------------
const totals = computed(() => {
  const ds = dashboards.value;
  const services = ds.length;
  const avgP99 = Math.round(ds.reduce((s, d) => s + d.p99, 0) / Math.max(services, 1));
  const totalRps = ds.reduce((s, d) => s + d.rps, 0);
  const breaching = ds.filter((d) => d.app.health === 'warn').length;
  return { services, avgP99, totalRps, breaching };
});

// --- Filter + cap -----------------------------------------------------------
// At platform scale there is one tile per service (100+). Render a manageable
// initial set: a free-text search over name/team, a health/alert filter, and a
// "toon meer" cap so the grid never becomes an unscrollable wall of tiles.
const query = ref('');
const healthFilter = ref('alle'); // alle | warn | alerts
const limit = ref(24);

const healthFilters = [
  { id: 'alle', label: 'Alle' },
  { id: 'warn', label: 'In waarschuwing' },
  { id: 'alerts', label: 'Met alerts' },
];

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return dashboards.value.filter((d) => {
    if (healthFilter.value === 'warn' && d.app.health !== 'warn') return false;
    if (healthFilter.value === 'alerts' && !d.openAlerts) return false;
    if (!q) return true;
    return (
      d.app.name.toLowerCase().includes(q) ||
      d.app.id.toLowerCase().includes(q) ||
      (d.team?.name || '').toLowerCase().includes(q)
    );
  });
});

const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));

function setHealthFilter(id) {
  healthFilter.value = id;
  limit.value = 24;
}
function showMore() {
  limit.value += 24;
}

// --- Detail panel -----------------------------------------------------------
const selected = ref(null);
function open(d) {
  selected.value = d;
  store.audit('dashboard geopend', d.app.id);
}
function close() {
  selected.value = null;
}

function relLinks(d) {
  const links = [
    { text: d.app.name, to: `/apps/${d.app.id}`, icon: 'rectangle-stack' },
  ];
  if (d.team) links.push({ text: d.team.name, to: `/teams/${d.team.id}`, icon: 'person-2' });
  for (const i of d.insts.slice(0, 3)) {
    links.push({ text: i.name, to: `/infra/instances/${i.id}`, icon: 'cylinder-split' });
  }
  links.push({ text: 'Logs filteren op deze dienst', to: '/observability/logs', icon: 'books-vertical' });
  links.push({ text: 'Traces bekijken', to: '/observability/traces', icon: 'arrow-up-arrow-down' });
  return links;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Dashboards"
      lede="Eén dashboard per dienst met live latency, doorvoer en foutpercentage. Klik een tegel voor detail en doorklik naar app, team en infra."
      :crumbs="[{ text: 'Observability', href: '/observability' }, { text: 'Dashboards', href: '/observability' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Logs" start-icon="books-vertical" href="/observability/logs"></nldd-button>
        <nldd-button variant="secondary" text="Traces" start-icon="arrow-up-arrow-down" href="/observability/traces"></nldd-button>
        <nldd-button variant="primary" text="Alerts & SLO" start-icon="exclamation-triangle" href="/observability/alerts"></nldd-button>
      </template>
    </PageHeader>

    <HavenBadge service="Monitoring" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="totals.services" label="Diensten gemonitord" icon="eye" />
      <MetricCard :value="totals.avgP99 + ' ms'" label="Gem. p99 latency" sub="laatste 40 minuten" icon="clock" />
      <MetricCard :value="totals.totalRps.toLocaleString('nl-NL')" label="Requests / sec" sub="totaal over alle diensten" icon="arrow-up-arrow-down" />
      <MetricCard :value="totals.breaching" label="Diensten in waarschuwing" :sub="totals.breaching ? 'aandacht nodig' : 'alles gezond'" icon="exclamation-triangle" to="/observability/alerts" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-dash-toolbar">
      <nldd-search-field
        class="rp-dash-search"
        placeholder="Zoek op dienst, id of team"
        accessible-label="Zoek dashboard"
        :value="query"
        @input="(e) => { query = e.target.value; limit = 24; }"
      ></nldd-search-field>
      <div class="rp-dash-chips">
        <nldd-button
          v-for="f in healthFilters"
          :key="f.id"
          :variant="healthFilter === f.id ? 'primary' : 'secondary'"
          size="sm"
          :text="f.label"
          @click="setHealthFilter(f.id)"
        ></nldd-button>
      </div>
    </div>

    <nldd-spacer size="16" />

    <p class="rp-dash-count">
      {{ filtered.length }} van {{ dashboards.length }} diensten
    </p>

    <nldd-spacer size="12" />

    <nldd-collection layout="grid" item-width="380px">
      <nldd-card
        v-for="d in visible"
        :key="d.app.id"
        class="rp-dash-card"
        :accessible-label="'Dashboard ' + d.app.name"
        @click="open(d)"
      >
        <nldd-container padding="20">
          <div class="rp-dash-head">
            <div>
              <nldd-title size="5"><h3>{{ d.app.name }}</h3></nldd-title>
              <div class="rp-dash-sub">{{ d.team ? d.team.name : 'geen team' }}</div>
            </div>
            <div class="rp-dash-badges">
              <StatusBadge :status="d.app.health" />
              <nldd-tag v-if="d.openAlerts" color="critical" size="md">{{ d.openAlerts }} alert</nldd-tag>
            </div>
          </div>

          <nldd-spacer size="16" />

          <div class="rp-spark-row">
            <div class="rp-spark-meta">
              <span class="rp-spark-label">p99 latency</span>
              <span class="rp-spark-val">{{ d.p99 }} ms</span>
            </div>
            <Sparkline :data="d.latency" color="var(--rp-lat)" :width="170" :height="34" />
          </div>

          <div class="rp-spark-row">
            <div class="rp-spark-meta">
              <span class="rp-spark-label">doorvoer</span>
              <span class="rp-spark-val">{{ d.rps.toLocaleString('nl-NL') }} rps</span>
            </div>
            <Sparkline :data="d.throughput" color="var(--rp-rps)" :width="170" :height="34" filled />
          </div>

          <div class="rp-spark-row">
            <div class="rp-spark-meta">
              <span class="rp-spark-label">foutpercentage</span>
              <span class="rp-spark-val" :class="{ 'rp-err-hot': d.err > 1 }">{{ d.err.toFixed(2) }}%</span>
            </div>
            <Sparkline :data="d.errorRate" :color="d.err > 1 ? 'var(--rp-err)' : 'var(--rp-ok)'" :width="170" :height="34" />
          </div>

          <nldd-spacer size="12" />

          <div v-if="d.slo" class="rp-slo-foot">
            <span>SLO {{ d.slo.target }}%</span>
            <div class="rp-slo-bar" :title="d.slo.budgetLeft + '% budget over'">
              <div
                class="rp-slo-fill"
                :class="d.slo.budgetLeft < 20 ? 'rp-low' : d.slo.budgetLeft < 50 ? 'rp-mid' : 'rp-high'"
                :style="{ width: d.slo.budgetLeft + '%' }"
              ></div>
            </div>
            <span class="rp-slo-pct">{{ d.slo.budgetLeft }}% budget</span>
          </div>
          <div v-else class="rp-slo-foot rp-slo-none">Geen SLO gedefinieerd</div>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <p v-if="!filtered.length" class="rp-dash-empty">
      Geen diensten gevonden voor deze filters.
    </p>

    <div v-if="moreCount > 0" class="rp-dash-more">
      <nldd-button
        variant="secondary"
        :text="'Toon meer (nog ' + moreCount + ')'"
        start-icon="chevron-down"
        @click="showMore"
      ></nldd-button>
    </div>

    <!-- Detail panel -->
    <nldd-modal-dialog v-if="selected" :open="true" @close="close">
      <div class="rp-detail">
        <div class="rp-detail-head">
          <div>
            <nldd-title size="3"><h2>{{ selected.app.name }}</h2></nldd-title>
            <div class="rp-dash-sub">
              {{ selected.team ? selected.team.name : 'geen team' }} · {{ selected.app.stack.join(' · ') }}
            </div>
          </div>
          <nldd-button variant="secondary" text="Sluiten" end-icon="dismiss" @click="close"></nldd-button>
        </div>

        <nldd-spacer size="16" />

        <div class="rp-detail-grid">
          <nldd-card>
            <nldd-container padding="16">
              <div class="rp-detail-metric">
                <span class="rp-spark-label">p99 latency</span>
                <span class="rp-detail-big">{{ selected.p99 }} ms</span>
              </div>
              <Sparkline :data="selected.latency" color="var(--rp-lat)" :width="320" :height="90" axis />
            </nldd-container>
          </nldd-card>
          <nldd-card>
            <nldd-container padding="16">
              <div class="rp-detail-metric">
                <span class="rp-spark-label">doorvoer</span>
                <span class="rp-detail-big">{{ selected.rps.toLocaleString('nl-NL') }} rps</span>
              </div>
              <Sparkline :data="selected.throughput" color="var(--rp-rps)" :width="320" :height="90" filled axis />
            </nldd-container>
          </nldd-card>
          <nldd-card>
            <nldd-container padding="16">
              <div class="rp-detail-metric">
                <span class="rp-spark-label">foutpercentage</span>
                <span class="rp-detail-big" :class="{ 'rp-err-hot': selected.err > 1 }">{{ selected.err.toFixed(2) }}%</span>
              </div>
              <Sparkline
                :data="selected.errorRate"
                :color="selected.err > 1 ? 'var(--rp-err)' : 'var(--rp-ok)'"
                :width="320"
                :height="90"
                axis
              />
            </nldd-container>
          </nldd-card>
        </div>

        <nldd-spacer size="16" />

        <div class="rp-detail-cols">
          <nldd-card>
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Service-niveau</h3></nldd-title>
              <nldd-spacer size="12" />
              <div v-if="selected.slo" class="rp-slo-detail">
                <div class="rp-slo-row"><span>Doel</span><strong>{{ selected.slo.target }}%</strong></div>
                <div class="rp-slo-row"><span>Actueel</span><strong>{{ selected.slo.current }}%</strong></div>
                <div class="rp-slo-row"><span>Error-budget over</span><strong>{{ selected.slo.budgetLeft }}%</strong></div>
                <nldd-spacer size="8" />
                <div class="rp-slo-bar rp-slo-bar-lg">
                  <div
                    class="rp-slo-fill"
                    :class="selected.slo.budgetLeft < 20 ? 'rp-low' : selected.slo.budgetLeft < 50 ? 'rp-mid' : 'rp-high'"
                    :style="{ width: selected.slo.budgetLeft + '%' }"
                  ></div>
                </div>
              </div>
              <nldd-rich-text v-else><p>Voor deze dienst is nog geen SLO gedefinieerd.</p></nldd-rich-text>
              <nldd-spacer size="12" />
              <div class="rp-detail-tags">
                <StatusBadge :status="selected.app.health" />
                <nldd-tag color="neutral" size="md">{{ selected.insts.length }} instances</nldd-tag>
                <nldd-tag :color="selected.openAlerts ? 'critical' : 'success'" size="md">
                  {{ selected.openAlerts }} actieve alerts
                </nldd-tag>
              </div>
            </nldd-container>
          </nldd-card>

          <RelationLinks title="Doorklikken" :links="relLinks(selected)" />
        </div>

        <CliHint :command="'bg obs dashboard ' + selected.app.id + ' --window 1h'" label="Open dit dashboard ook via de CLI:" />
      </div>
    </nldd-modal-dialog>
  </div>
</template>

<style scoped>
.rp-page {
  --rp-lat: #5b8def;
  --rp-rps: #2bb7a3;
  --rp-err: #d4351c;
  --rp-ok: #4a8a3c;
}
.rp-dash-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-dash-search {
  flex: 1 1 320px;
  min-width: 220px;
}
.rp-dash-chips {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-dash-count {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.6;
}
.rp-dash-empty {
  margin: 1rem 0;
  opacity: 0.6;
  font-style: italic;
}
.rp-dash-more {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}
.rp-dash-card {
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.rp-dash-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.rp-dash-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-dash-sub {
  opacity: 0.65;
  font-size: 0.85rem;
  margin-top: 0.15rem;
}
.rp-dash-badges {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-end;
}
.rp-spark-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-spark-row:last-of-type {
  border-bottom: none;
}
.rp-spark-meta {
  display: flex;
  flex-direction: column;
}
.rp-spark-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-spark-val {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rp-err-hot {
  color: var(--rp-err);
}
.rp-slo-foot {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  opacity: 0.85;
}
.rp-slo-none {
  opacity: 0.5;
  font-style: italic;
}
.rp-slo-bar {
  flex: 1;
  height: 7px;
  border-radius: 4px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
  border: 1px solid var(--semantics-dividers-color);
}
.rp-slo-bar-lg {
  height: 12px;
}
.rp-slo-fill {
  height: 100%;
  border-radius: 4px;
}
.rp-slo-fill.rp-high {
  background: var(--rp-ok);
}
.rp-slo-fill.rp-mid {
  background: #e0a800;
}
.rp-slo-fill.rp-low {
  background: var(--rp-err);
}
.rp-slo-pct {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.rp-detail {
  max-width: 1040px;
  padding: 0.5rem;
}
.rp-detail-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.rp-detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.rp-detail-metric {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
}
.rp-detail-big {
  font-size: 1.6rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rp-detail-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.rp-slo-row {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
}
.rp-detail-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
@media (max-width: 880px) {
  .rp-detail-grid,
  .rp-detail-cols {
    grid-template-columns: 1fr;
  }
}
</style>
