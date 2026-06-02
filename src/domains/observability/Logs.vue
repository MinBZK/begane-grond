<script setup>
// Log explorer: a mocked, filterable structured-log stream aggregated across
// all apps. Generates deterministic log lines per app so the demo is stable,
// with INFO/WARN/ERROR level badges, a service filter, a level filter and a
// free-text search. Lines reference real instances/teams from the store so the
// stream feels connected to the rest of the platform.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// --- Line templates per level ----------------------------------------------
const TEMPLATES = {
  INFO: [
    'request afgehandeld in {ms}ms status=200 pad=/api/v2/{path}',
    'health-check ok instance={inst} replica={rep}',
    'cache hit ratio={pct}% sleutel={path}',
    'achtergrondtaak voltooid taak=reconcile duur={ms}ms',
    'verbinding geopend peer={inst} protocol=mTLS',
    'release uitgerold versie={ver} env={env}',
  ],
  WARN: [
    'p99 latency verhoogd {ms}ms boven drempel 200ms',
    'kafka consumer lag={lag} partitie={rep}',
    'retry uitgevoerd poging={rep} upstream={path}',
    'verbinding traag instance={inst} rtt={ms}ms',
    'disk gebruik {pct}% nadert grens',
  ],
  ERROR: [
    'upstream timeout na {ms}ms endpoint=/api/v2/{path}',
    'database verbinding geweigerd host={inst}',
    '5xx geretourneerd status=503 pad=/api/v2/{path}',
    'circuit-breaker open service={path} foutratio={pct}%',
    'onverwerkte exceptie taak=ingest trace={trace}',
  ],
};

// Deterministic PRNG seeded per app.
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

const PATHS = ['burgers', 'aanvraag', 'status', 'token', 'documenten', 'export', 'health'];

function buildLines() {
  const out = [];
  let clock = 9 * 3600 + 14 * 60; // start 09:14:00, count down per line
  for (const app of store.apps) {
    const rnd = seedFrom(app.id);
    const insts = store.instancesByApp(app.id);
    // unhealthy apps get a worse level distribution
    const errBias = app.health === 'warn' ? 0.22 : 0.05;
    const warnBias = app.health === 'warn' ? 0.3 : 0.18;
    const count = 14 + Math.floor(rnd() * 8);
    for (let i = 0; i < count; i += 1) {
      const r = rnd();
      const level = r < errBias ? 'ERROR' : r < errBias + warnBias ? 'WARN' : 'INFO';
      const tpls = TEMPLATES[level];
      const tpl = tpls[Math.floor(rnd() * tpls.length)];
      const inst = insts.length ? insts[Math.floor(rnd() * insts.length)].id : app.id;
      const deploy = store.deployments.find((d) => d.app === app.id);
      const msg = tpl
        .replace('{ms}', String(40 + Math.floor(rnd() * (level === 'ERROR' ? 3000 : 400))))
        .replace('{pct}', String(60 + Math.floor(rnd() * 39)))
        .replace('{lag}', String(Math.floor(rnd() * 5000)))
        .replace('{rep}', String(Math.floor(rnd() * 5)))
        .replace('{path}', PATHS[Math.floor(rnd() * PATHS.length)])
        .replace('{inst}', inst)
        .replace('{ver}', deploy ? deploy.prod : 'v1.0.0')
        .replace('{env}', ['dev', 'test', 'acc', 'prod'][Math.floor(rnd() * 4)])
        .replace('{trace}', (rnd().toString(16) + '000000').slice(2, 10));
      clock -= 3 + Math.floor(rnd() * 25);
      const hh = String(Math.floor(clock / 3600)).padStart(2, '0');
      const mm = String(Math.floor((clock % 3600) / 60)).padStart(2, '0');
      const ss = String(clock % 60).padStart(2, '0');
      out.push({
        id: `${app.id}-${i}`,
        ts: `${hh}:${mm}:${ss}`,
        clock,
        level,
        app: app.id,
        appName: app.name,
        team: app.team,
        inst,
        msg,
      });
    }
  }
  return out.sort((a, b) => b.clock - a.clock);
}

const allLines = buildLines();

// --- Filters ----------------------------------------------------------------
const serviceFilter = ref('all');
const levelFilter = ref('all');
const query = ref('');

const visible = computed(() =>
  allLines.filter((l) => {
    if (serviceFilter.value !== 'all' && l.app !== serviceFilter.value) return false;
    if (levelFilter.value !== 'all' && l.level !== levelFilter.value) return false;
    if (query.value && !(`${l.msg} ${l.inst} ${l.appName}`.toLowerCase().includes(query.value.toLowerCase()))) {
      return false;
    }
    return true;
  })
);

const counts = computed(() => {
  const c = { INFO: 0, WARN: 0, ERROR: 0 };
  for (const l of visible.value) c[l.level] += 1;
  return c;
});

const levelColor = { INFO: 'neutral', WARN: 'warning', ERROR: 'critical' };

function setLevel(l) {
  levelFilter.value = levelFilter.value === l ? 'all' : l;
}

const cliCommand = computed(() => {
  const parts = ['bg obs logs'];
  if (serviceFilter.value !== 'all') parts.push(`--service ${serviceFilter.value}`);
  if (levelFilter.value !== 'all') parts.push(`--level ${levelFilter.value.toLowerCase()}`);
  if (query.value) parts.push(`--grep "${query.value}"`);
  parts.push('--follow');
  return parts.join(' ');
});
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Logs"
      lede="Gefilterde, gestructureerde logstream over alle diensten. Filter op dienst, niveau of zoekterm."
      :crumbs="[{ text: 'Observability', href: '/observability' }, { text: 'Logs', href: '/observability/logs' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Dashboards" start-icon="eye" href="/observability"></nldd-button>
        <nldd-button variant="secondary" text="Traces" start-icon="arrow-up-arrow-down" href="/observability/traces"></nldd-button>
      </template>
    </PageHeader>

    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-filters">
          <nldd-form-field label="Dienst">
            <nldd-dropdown>
              <select :value="serviceFilter" @input="e => serviceFilter = e.target.value">
                <option value="all">Alle diensten</option>
                <option v-for="a in store.apps" :key="a.id" :value="a.id">{{ a.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>

          <nldd-form-field label="Zoeken">
            <nldd-search-field>
              <input
                type="search"
                placeholder="bv. timeout, /api/v2, instance…"
                :value="query"
                @input="e => query = e.target.value"
              />
            </nldd-search-field>
          </nldd-form-field>

          <div class="rp-level-chips">
            <span class="rp-chips-label">Niveau</span>
            <button
              v-for="lvl in ['INFO', 'WARN', 'ERROR']"
              :key="lvl"
              type="button"
              class="rp-level-btn"
              :class="{ 'rp-active': levelFilter === lvl }"
              @click="setLevel(lvl)"
            >
              <nldd-tag :color="levelColor[lvl]" size="md">{{ lvl }}</nldd-tag>
              <span class="rp-level-count">{{ counts[lvl] }}</span>
            </button>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />

    <nldd-card>
      <div class="rp-log-stream" role="log" aria-label="Logstream">
        <div v-for="l in visible" :key="l.id" class="rp-log-line" :class="'rp-lvl-' + l.level">
          <span class="rp-log-ts">{{ l.ts }}</span>
          <nldd-tag :color="levelColor[l.level]" size="md" class="rp-log-badge">{{ l.level }}</nldd-tag>
          <router-link :to="`/apps/${l.app}`" class="rp-log-svc">{{ l.appName }}</router-link>
          <span class="rp-log-msg">{{ l.msg }}</span>
        </div>
        <div v-if="!visible.length" class="rp-log-empty">
          Geen logregels voor deze filters.
        </div>
      </div>
    </nldd-card>

    <nldd-spacer size="12" />
    <p class="rp-log-foot">
      {{ visible.length }} regels · {{ counts.INFO }} info · {{ counts.WARN }} warn · {{ counts.ERROR }} error
    </p>

    <CliHint :command="cliCommand" label="Deze stream ook via de CLI:" />
  </div>
</template>

<style scoped>
.rp-filters {
  display: grid;
  grid-template-columns: 1fr 1.4fr auto;
  gap: 1rem;
  align-items: end;
}
.rp-level-chips {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-chips-label {
  font-size: 0.78rem;
  font-weight: 600;
  opacity: 0.7;
}
.rp-level-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 999px;
  padding: 0.25rem 0.6rem 0.25rem 0.35rem;
  cursor: pointer;
  opacity: 0.6;
}
.rp-level-btn.rp-active {
  opacity: 1;
  border-color: var(--semantics-focus-color, #1a73e8);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-level-count {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 0.82rem;
}
.rp-log-stream {
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 0.82rem;
  max-height: 60vh;
  overflow-y: auto;
  padding: 0.4rem 0;
}
.rp-log-line {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.28rem 1rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  white-space: nowrap;
}
.rp-log-line:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-lvl-ERROR {
  background: rgba(212, 53, 28, 0.05);
}
.rp-log-ts {
  opacity: 0.55;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.rp-log-badge {
  flex-shrink: 0;
}
.rp-log-svc {
  flex-shrink: 0;
  text-decoration: none;
  font-weight: 600;
  color: var(--semantics-focus-color, #1a73e8);
}
.rp-log-svc:hover {
  text-decoration: underline;
}
.rp-log-msg {
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.92;
}
.rp-log-empty {
  padding: 2rem;
  text-align: center;
  opacity: 0.6;
  font-family: inherit;
}
.rp-log-foot {
  font-size: 0.82rem;
  opacity: 0.7;
  margin: 0;
}
@media (max-width: 760px) {
  .rp-filters {
    grid-template-columns: 1fr;
  }
}
</style>
