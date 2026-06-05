<script setup>
// Policy gates overview. The store holds the four governance gates
// (open-source-tenzij, EUPL, WCAG, BIO); here we render a compliance matrix of
// every app against every gate with a derived pass/fail/exempt verdict. The
// verdict is derived from real store data (repo visibility, license, app type,
// vulnerabilities, SLOs) so it stays plausible and reacts to other domains.
// Clicking an app routes through to its detail page; a per-gate compliance
// score and a portfolio summary make the governance posture scannable.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import { evalGate as evalGatePure } from './gates.js';

const store = usePlatformStore();

// Each gate is evaluated against an app via the shared pure helper, so this
// screen and the NeRDS scorecard read identical verdicts.
function evalGate(app, gateId) {
  return evalGatePure(app, gateId, store);
}

// Full matrix: rows are apps, each carries a map of gateId -> result.
const matrix = computed(() =>
  store.apps.map((app) => {
    const cells = {};
    let pass = 0;
    let fail = 0;
    let applicable = 0;
    for (const g of store.gates) {
      const r = evalGate(app, g.id);
      cells[g.id] = r;
      if (r.verdict !== 'exempt') {
        applicable++;
        if (r.verdict === 'pass') pass++;
        else fail++;
      }
    }
    return { app, cells, pass, fail, applicable };
  })
);

// Per-gate compliance: how many applicable apps pass this gate.
const gateStats = computed(() =>
  store.gates.map((g) => {
    let pass = 0;
    let applicable = 0;
    for (const row of matrix.value) {
      const r = row.cells[g.id];
      if (r.verdict !== 'exempt') {
        applicable++;
        if (r.verdict === 'pass') pass++;
      }
    }
    const pct = applicable ? Math.round((pass / applicable) * 100) : 100;
    return { ...g, pass, applicable, pct };
  })
);

const totalChecks = computed(() => matrix.value.reduce((n, r) => n + r.applicable, 0));
const totalPass = computed(() => matrix.value.reduce((n, r) => n + r.pass, 0));
const totalFail = computed(() => matrix.value.reduce((n, r) => n + r.fail, 0));
const compliantApps = computed(() => matrix.value.filter((r) => r.fail === 0).length);
const overallPct = computed(() =>
  totalChecks.value ? Math.round((totalPass.value / totalChecks.value) * 100) : 100
);

function cellColor(verdict) {
  if (verdict === 'pass') return 'success';
  if (verdict === 'fail') return 'critical';
  return 'neutral';
}
function cellIcon(verdict) {
  if (verdict === 'pass') return 'check-mark-circle';
  if (verdict === 'fail') return 'exclamation-triangle';
  return 'dismiss';
}
function cellLabel(verdict) {
  if (verdict === 'pass') return 'Voldoet';
  if (verdict === 'fail') return 'Voldoet niet';
  return 'N.v.t.';
}
function barColor(pct) {
  if (pct >= 90) return 'var(--rp-ok)';
  if (pct >= 60) return 'var(--rp-warn)';
  return 'var(--rp-bad)';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Beleids-gates"
      lede="Elke applicatie wordt getoetst aan de Rijksbrede beleids-gates: open-source-tenzij, EUPL-licentie, toegankelijkheid en de security-baseline (BIO). Deze gates staan niet los: ze draaien in elke CI-pijplijn, standaard aan. De matrix is afgeleid uit de actuele platformdata en verandert mee met repository-, security- en releasewijzigingen."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Governance', href: '/governance' }]"
    >
      <template #actions>
        <nldd-button-group orientation="horizontal">
          <router-link to="/environments/pijplijn">
            <nldd-button variant="secondary" text="Draait in elke pijplijn" start-icon="gear"></nldd-button>
          </router-link>
          <router-link to="/governance/rfcs">
            <nldd-button variant="secondary" text="RFC's" start-icon="books-vertical"></nldd-button>
          </router-link>
          <router-link to="/governance/audit">
            <nldd-button variant="secondary" text="Audit-log" start-icon="eye"></nldd-button>
          </router-link>
        </nldd-button-group>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="overallPct + '%'" label="Beleidsconformiteit" :sub="totalPass + ' van ' + totalChecks + ' checks'" icon="shield-check-mark" />
      <MetricCard :value="compliantApps + '/' + store.apps.length" label="Volledig conforme apps" sub="geen openstaande gate" icon="check-mark-circle" />
      <MetricCard :value="totalFail" label="Openstaande overtredingen" sub="te remediëren" icon="exclamation-triangle" />
      <MetricCard :value="store.gates.length" label="Actieve gates" sub="Rijksbreed beleid" icon="lock-closed" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Compliance matrix: apps (rows) x gates (columns). -->
    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Conformiteitsmatrix</h2></nldd-title>
        <nldd-rich-text><p class="rp-sub">Per applicatie de status op elke gate. Klik op een applicatie voor details.</p></nldd-rich-text>
        <nldd-spacer size="16" />

        <div class="rp-matrix-wrap">
          <table class="rp-matrix">
            <thead>
              <tr>
                <th class="rp-matrix-corner">Applicatie</th>
                <th v-for="g in store.gates" :key="g.id" class="rp-matrix-gate">
                  <span class="rp-matrix-gate-name">{{ g.name }}</span>
                  <span class="rp-matrix-gate-pct">{{ gateStats.find((x) => x.id === g.id).pct }}%</span>
                </th>
                <th class="rp-matrix-score">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in matrix" :key="row.app.id">
                <td class="rp-matrix-app">
                  <router-link :to="`/apps/${row.app.id}`" class="rp-matrix-applink">
                    <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
                    <span class="rp-matrix-appname">{{ row.app.name }}</span>
                    <span class="rp-matrix-appteam">{{ store.teamById(row.app.team)?.name || row.app.team }}</span>
                  </router-link>
                </td>
                <td v-for="g in store.gates" :key="g.id" class="rp-matrix-cell">
                  <span
                    class="rp-cell-badge"
                    :class="'rp-' + row.cells[g.id].verdict"
                    :title="row.cells[g.id].why"
                  >
                    <nldd-icon :name="cellIcon(row.cells[g.id].verdict)" aria-hidden="true"></nldd-icon>
                    <span class="rp-cell-text">{{ cellLabel(row.cells[g.id].verdict) }}</span>
                  </span>
                </td>
                <td class="rp-matrix-rowscore">
                  <nldd-tag :color="row.fail ? 'critical' : 'success'" size="md">
                    {{ row.pass }}/{{ row.applicable }}
                  </nldd-tag>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <!-- Per-gate detail: what the gate checks + a portfolio compliance bar. -->
    <nldd-title size="4"><h2>Gates en hun beleidsregel</h2></nldd-title>
    <nldd-spacer size="12" />
    <nldd-collection layout="grid" item-width="340px">
      <nldd-card v-for="g in gateStats" :key="g.id" :accessible-label="g.name">
        <nldd-container padding="20">
          <div class="rp-gate-head">
            <nldd-icon name="lock-closed" aria-hidden="true" class="rp-gate-ic"></nldd-icon>
            <nldd-title size="5"><h3>{{ g.name }}</h3></nldd-title>
          </div>
          <nldd-rich-text><p class="rp-sub">{{ g.desc }}</p></nldd-rich-text>
          <nldd-spacer size="12" />
          <div class="rp-gate-barrow">
            <div class="rp-gate-bar">
              <span class="rp-gate-bar-fill" :style="{ width: g.pct + '%', background: barColor(g.pct) }"></span>
            </div>
            <span class="rp-gate-pct">{{ g.pct }}%</span>
          </div>
          <div class="rp-gate-meta">
            {{ g.pass }} van {{ g.applicable }} toepasselijke apps voldoen
          </div>
        </nldd-container>
      </nldd-card>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-sub {
  opacity: 0.7;
  margin: 0;
  font-size: 0.9rem;
}
.rp-matrix-wrap {
  overflow-x: auto;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
}
.rp-matrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.rp-matrix th,
.rp-matrix td {
  padding: 0.7rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  text-align: center;
  vertical-align: middle;
}
.rp-matrix thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  opacity: 0.8;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-matrix tbody tr:last-child td {
  border-bottom: none;
}
.rp-matrix tbody tr:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-matrix-corner,
.rp-matrix-app {
  text-align: left;
  min-width: 12rem;
}
.rp-matrix-gate {
  min-width: 9rem;
}
.rp-matrix-gate-name {
  display: block;
}
.rp-matrix-gate-pct {
  display: block;
  font-weight: 700;
  opacity: 0.6;
  margin-top: 0.15rem;
}
.rp-matrix-applink {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  text-decoration: none;
  color: inherit;
}
.rp-matrix-applink nldd-icon {
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.6;
}
.rp-matrix-appname {
  font-weight: 600;
}
.rp-matrix-appteam {
  width: 100%;
  font-size: 0.78rem;
  opacity: 0.6;
  padding-left: 1.55rem;
}
.rp-cell-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.28rem 0.55rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid transparent;
}
.rp-cell-badge nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-pass {
  color: #1d5a2a;
  background: rgba(58, 125, 68, 0.14);
  border-color: rgba(58, 125, 68, 0.3);
}
.rp-fail {
  color: #8f1d16;
  background: rgba(179, 38, 30, 0.12);
  border-color: rgba(179, 38, 30, 0.28);
}
.rp-exempt {
  color: var(--semantics-text-default-color);
  background: var(--semantics-surfaces-tinted-background-color);
  border-color: var(--semantics-dividers-color);
  opacity: 0.7;
}
.rp-gate-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-gate-ic {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.6;
}
.rp-gate-barrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-gate-bar {
  flex: 1;
  height: 0.55rem;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-gate-bar-fill {
  display: block;
  height: 100%;
  border-radius: 999px;
}
.rp-gate-pct {
  font-weight: 700;
  font-size: 0.9rem;
  min-width: 2.6rem;
  text-align: right;
}
.rp-gate-meta {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  opacity: 0.7;
}
</style>
