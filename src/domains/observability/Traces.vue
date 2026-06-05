<script setup>
// Distributed-trace waterfall: shows the spans of a single request as it flows
// through services, gateway, database, broker and the LLM gateway. The user
// can pick one of a few sample traces (one per app); each renders as CSS bars
// with a left offset (start time) and width (duration) on a shared time axis.
// Selecting a span shows its attributes and links to the owning app/instance.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// Each trace is a hand-built but plausible call tree. `depth` indents the span,
// `start`/`dur` are in ms relative to trace start, `kind` drives the color,
// `app`/`inst` link back into the platform.
const TRACES = {
  'trace-paspoort': {
    id: '7f3a9c2e1b4d8a60',
    title: 'POST /api/v2/paspoort/aanvraag',
    app: 'app-paspoort',
    status: 'ok',
    spans: [
      { name: 'ingress · api-gateway', service: 'fsc-inway', kind: 'gateway', depth: 0, start: 0, dur: 412, inst: null },
      { name: 'auth · token-validatie', service: 'oidc-gateway', kind: 'auth', depth: 1, start: 6, dur: 38, inst: null },
      { name: 'paspoort-service · handle', service: 'app-paspoort', kind: 'service', depth: 1, start: 48, dur: 352, inst: 'pg-burgerzaken-prod', app: 'app-paspoort' },
      { name: 'bsn-validatie', service: 'app-paspoort', kind: 'service', depth: 2, start: 54, dur: 22, app: 'app-paspoort' },
      { name: 'SELECT burger', service: 'pg-burgerzaken-prod', kind: 'db', depth: 2, start: 80, dur: 96, inst: 'pg-burgerzaken-prod' },
      { name: 'object-store · foto ophalen', service: 'objectstore', kind: 'storage', depth: 2, start: 182, dur: 120, inst: null },
      { name: 'INSERT aanvraag', service: 'pg-burgerzaken-prod', kind: 'db', depth: 2, start: 308, dur: 74, inst: 'pg-burgerzaken-prod' },
      { name: 'notificatie publiceren', service: 'kafka-toeslagen-prod', kind: 'broker', depth: 2, start: 384, dur: 14, inst: 'kafka-toeslagen-prod' },
    ],
  },
  'trace-toeslagen': {
    id: 'a1b2c3d4e5f60718',
    title: 'POST /api/v1/toeslagen/herberekening',
    app: 'app-toeslagen',
    status: 'verstoord',
    spans: [
      { name: 'ingress · api-gateway', service: 'fsc-inway', kind: 'gateway', depth: 0, start: 0, dur: 2140, inst: null },
      { name: 'auth · token-validatie', service: 'oidc-gateway', kind: 'auth', depth: 1, start: 4, dur: 30, inst: null },
      { name: 'toeslagenmotor · handle', service: 'app-toeslagen', kind: 'service', depth: 1, start: 38, dur: 2090, inst: 'pg-toeslagen-acc', app: 'app-toeslagen' },
      { name: 'consume event (lag!)', service: 'kafka-toeslagen-prod', kind: 'broker', depth: 2, start: 44, dur: 1480, inst: 'kafka-toeslagen-prod', slow: true },
      { name: 'SELECT regeling', service: 'pg-toeslagen-acc', kind: 'db', depth: 2, start: 1530, dur: 210, inst: 'pg-toeslagen-acc' },
      { name: 'berekening uitvoeren', service: 'app-toeslagen', kind: 'service', depth: 2, start: 1745, dur: 180, app: 'app-toeslagen' },
      { name: 'UPDATE aanslag (timeout)', service: 'pg-toeslagen-acc', kind: 'db', depth: 2, start: 1930, dur: 198, inst: 'pg-toeslagen-acc', error: true },
    ],
  },
  'trace-portaal': {
    id: '0c9d8e7f6a5b4c3d',
    title: 'GET /platform/overzicht',
    app: 'app-platformportaal',
    status: 'ok',
    spans: [
      { name: 'ingress · cdn', service: 'edge', kind: 'gateway', depth: 0, start: 0, dur: 196, inst: null },
      { name: 'platformportaal · render', service: 'app-platformportaal', kind: 'service', depth: 1, start: 8, dur: 176, inst: 'k8s-platform-prod', app: 'app-platformportaal' },
      { name: 'GET catalog (cache hit)', service: 'redis', kind: 'storage', depth: 2, start: 16, dur: 8, inst: null },
      { name: 'LLM-samenvatting', service: 'llm-gilde-prod', kind: 'llm', depth: 2, start: 30, dur: 132, inst: 'llm-gilde-prod', app: 'app-platformportaal' },
      { name: 'SELECT teams', service: 'pg-burgerzaken-prod', kind: 'db', depth: 2, start: 26, dur: 40, inst: 'pg-burgerzaken-prod' },
    ],
  },
};

const KIND_COLOR = {
  gateway: '#5b8def',
  auth: '#8e7cc3',
  service: '#2bb7a3',
  db: '#e0a800',
  storage: '#6aa0c4',
  broker: '#c47ab0',
  llm: '#b06ad4',
};
const KIND_LABEL = {
  gateway: 'gateway',
  auth: 'auth',
  service: 'service',
  db: 'database',
  storage: 'opslag',
  broker: 'broker',
  llm: 'llm',
};

const traceKey = ref('trace-toeslagen');
const trace = computed(() => TRACES[traceKey.value]);
const totalDur = computed(() => trace.value.spans[0].dur);

const selectedSpan = ref(null);
function pickTrace(k) {
  traceKey.value = k;
  selectedSpan.value = null;
}

function spanStyle(s) {
  const total = totalDur.value;
  return {
    left: `${(s.start / total) * 100}%`,
    width: `${Math.max((s.dur / total) * 100, 0.6)}%`,
    background: KIND_COLOR[s.kind],
  };
}

// Build relation links for a selected span.
function spanLinks(s) {
  const links = [];
  if (s.app) links.push({ text: store.appById(s.app)?.name || s.app, to: `/apps/${s.app}`, icon: 'rectangle-stack' });
  if (s.inst && store.instanceById(s.inst)) {
    links.push({ text: s.inst, to: `/infra/instances/${s.inst}`, icon: 'cylinder-split' });
  }
  links.push({ text: 'Logs van deze dienst', to: '/observability/logs', icon: 'books-vertical' });
  return links;
}

// Time-axis ticks (0, 25, 50, 75, 100%).
const ticks = computed(() => {
  const t = totalDur.value;
  return [0, 0.25, 0.5, 0.75, 1].map((f) => ({ pct: f * 100, label: Math.round(t * f) + ' ms' }));
});

const critical = computed(() => trace.value.spans.reduce((m, s) => Math.max(m, s.start + s.dur), 0));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Traces"
      lede="Waterfall van één request door de keten van diensten, gateway, database en broker. Klik een span voor detail en doorklik."
      :crumbs="[{ text: 'Observability', href: '/observability' }, { text: 'Traces', href: '/observability/traces' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Dashboards" start-icon="eye" href="/observability"></nldd-button>
        <nldd-button variant="secondary" text="Logs" start-icon="books-vertical" href="/observability/logs"></nldd-button>
      </template>
    </PageHeader>

    <!-- Trace picker -->
    <div class="rp-trace-tabs">
      <button
        v-for="(t, k) in TRACES"
        :key="k"
        type="button"
        class="rp-trace-tab"
        :class="{ 'rp-active': traceKey === k }"
        @click="pickTrace(k)"
      >
        <span class="rp-trace-tab-title">{{ t.title }}</span>
        <span class="rp-trace-tab-meta">
          <code>{{ t.id.slice(0, 8) }}</code>
          <StatusBadge :status="t.status" size="md" />
        </span>
      </button>
    </div>

    <nldd-spacer size="16" />

    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-trace-head">
          <div>
            <nldd-title size="4"><h2>{{ trace.title }}</h2></nldd-title>
            <div class="rp-trace-sub">
              trace-id <code>{{ trace.id }}</code> · {{ trace.spans.length }} spans · {{ critical }} ms totaal
            </div>
          </div>
          <StatusBadge :status="trace.status" />
        </div>

        <nldd-spacer size="16" />

        <!-- Time axis -->
        <div class="rp-axis">
          <div class="rp-axis-spacer"></div>
          <div class="rp-axis-track">
            <span v-for="t in ticks" :key="t.pct" class="rp-axis-tick" :style="{ left: t.pct + '%' }">
              {{ t.label }}
            </span>
          </div>
        </div>

        <!-- Waterfall -->
        <div class="rp-waterfall">
          <button
            v-for="(s, i) in trace.spans"
            :key="i"
            type="button"
            class="rp-span-row"
            :class="{ 'rp-selected': selectedSpan === s }"
            @click="selectedSpan = s"
          >
            <div class="rp-span-label" :style="{ paddingLeft: s.depth * 1.1 + 'rem' }">
              <span class="rp-span-dot" :style="{ background: KIND_COLOR[s.kind] }"></span>
              <span class="rp-span-name">{{ s.name }}</span>
            </div>
            <div class="rp-span-track">
              <div class="rp-span-bar" :class="{ 'rp-span-error': s.error, 'rp-span-slow': s.slow }" :style="spanStyle(s)">
                <span class="rp-span-dur">{{ s.dur }} ms</span>
              </div>
            </div>
          </button>
        </div>

        <nldd-spacer size="12" />
        <div class="rp-legend">
          <span v-for="(c, k) in KIND_COLOR" :key="k" class="rp-legend-item">
            <span class="rp-legend-dot" :style="{ background: c }"></span>{{ KIND_LABEL[k] }}
          </span>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />

    <!-- Span detail -->
    <div v-if="selectedSpan" class="rp-span-detail">
      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="5"><h3>{{ selectedSpan.name }}</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-attr-grid">
            <div class="rp-attr"><span>service</span><strong>{{ selectedSpan.service }}</strong></div>
            <div class="rp-attr"><span>type</span><strong>{{ KIND_LABEL[selectedSpan.kind] }}</strong></div>
            <div class="rp-attr"><span>start</span><strong>{{ selectedSpan.start }} ms</strong></div>
            <div class="rp-attr"><span>duur</span><strong>{{ selectedSpan.dur }} ms</strong></div>
            <div class="rp-attr">
              <span>status</span>
              <StatusBadge :status="selectedSpan.error ? 'verstoord' : selectedSpan.slow ? 'warn' : 'ok'" size="md" />
            </div>
          </div>
          <div v-if="selectedSpan.error" class="rp-span-note rp-note-error">
            Deze span eindigde met een fout. Bekijk de logs van de dienst voor de stacktrace.
          </div>
          <div v-else-if="selectedSpan.slow" class="rp-span-note rp-note-warn">
            Deze span draagt het grootste deel van de latency. Mogelijke oorzaak: consumer-lag.
          </div>
        </nldd-container>
      </nldd-card>
      <RelationLinks title="Doorklikken" :links="spanLinks(selectedSpan)" />
    </div>
    <nldd-inline-dialog
      v-else
      title="Selecteer een span"
      supporting-text="Klik op een balk in de waterfall om de attributen en doorklik-links te zien."
    ></nldd-inline-dialog>

    <CliHint :command="'bg obs trace ' + trace.id" label="Haal deze trace op via de CLI:" />
  </div>
</template>

<style scoped>
.rp-trace-tabs {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-trace-tab {
  flex: 1 1 240px;
  text-align: left;
  background: var(--semantics-surfaces-background-color);
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-trace-tab.rp-active {
  border-color: var(--semantics-focus-color);
  box-shadow: 0 0 0 1px var(--semantics-focus-color);
}
.rp-trace-tab-title {
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-trace-tab-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-trace-tab-meta code {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-trace-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.rp-trace-sub {
  opacity: 0.65;
  font-size: 0.85rem;
  margin-top: 0.2rem;
}
.rp-trace-sub code {
  font-size: 0.8rem;
}
.rp-axis {
  display: flex;
  font-size: 0.72rem;
  opacity: 0.6;
  height: 1.1rem;
}
.rp-axis-spacer {
  width: 38%;
  flex-shrink: 0;
}
.rp-axis-track {
  position: relative;
  flex: 1;
}
.rp-axis-tick {
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
}
.rp-axis-tick:first-child {
  transform: none;
}
.rp-axis-tick:last-child {
  transform: translateX(-100%);
}
.rp-waterfall {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
  overflow: hidden;
}
.rp-span-row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0;
  background: none;
  border: none;
  border-bottom: 1px solid var(--semantics-dividers-color);
  padding: 0;
  cursor: pointer;
  text-align: left;
  width: 100%;
}
.rp-span-row:last-child {
  border-bottom: none;
}
.rp-span-row:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-span-row.rp-selected {
  background: var(--semantics-surfaces-tinted-background-color);
  box-shadow: inset 3px 0 0 var(--semantics-focus-color);
}
.rp-span-label {
  width: 38%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.6rem;
  font-size: 0.82rem;
  overflow: hidden;
}
.rp-span-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.rp-span-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rp-span-track {
  position: relative;
  flex: 1;
  height: 2.1rem;
}
.rp-span-bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 1.1rem;
  border-radius: 4px;
  min-width: 3px;
  display: flex;
  align-items: center;
}
.rp-span-bar.rp-span-error {
  background: #d4351c !important;
}
.rp-span-bar.rp-span-slow {
  outline: 2px solid #e0a800;
  outline-offset: 1px;
}
.rp-span-dur {
  font-size: 0.68rem;
  color: #fff;
  padding: 0 0.35rem;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
}
.rp-legend {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
  opacity: 0.8;
}
.rp-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-legend-dot {
  width: 9px;
  height: 9px;
  border-radius: 2px;
}
.rp-span-detail {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1rem;
}
.rp-attr-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1.5rem;
}
.rp-attr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--semantics-dividers-color);
  padding: 0.25rem 0;
}
.rp-attr span {
  opacity: 0.6;
  font-size: 0.82rem;
}
.rp-span-note {
  margin-top: 1rem;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
}
.rp-note-error {
  background: rgba(212, 53, 28, 0.08);
  color: #a81f0c;
}
.rp-note-warn {
  background: rgba(224, 168, 0, 0.12);
  color: #8a6500;
}
@media (max-width: 820px) {
  .rp-span-detail {
    grid-template-columns: 1fr;
  }
  .rp-span-label {
    width: 46%;
  }
  .rp-axis-spacer {
    width: 46%;
  }
}
</style>
