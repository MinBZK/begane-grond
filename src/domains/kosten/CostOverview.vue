<script setup>
// Cost overview (showback / FinOps) for the Rijksplatform. It aggregates the
// real per-instance monthly cost (instances[].costMonth) and the per-team
// rollup (costByTeam) into total platform spend, a per-team breakdown drawn as
// an SVG donut + bar chart, a 6-month trend sparkline, and a showback table
// that says who pays for which instance. Each instance is also given an energy
// flavour: estimated kWh and CO2, scaled by the PUE of its datacenter.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// --- Energy model -----------------------------------------------------------
// Demo proxy: 1 euro of monthly compute cost stands for ~0.9 kWh of IT load per
// month. We then multiply by the datacenter PUE to account for cooling and
// power overhead, and convert to CO2 with the Dutch grid emission factor.
const KWH_PER_EURO = 0.9; // IT-load proxy
const CO2_PER_KWH = 0.27; // kg CO2 per kWh, NL grid mix

const pueOf = (dcId) => store.datacenterById(dcId)?.pue || 1.3;

function energyForInstance(inst) {
  const itKwh = (inst.costMonth || 0) * KWH_PER_EURO;
  const kwh = itKwh * pueOf(inst.dc);
  const co2 = kwh * CO2_PER_KWH;
  return { kwh, co2 };
}

// --- Totals -----------------------------------------------------------------
const instanceTotal = computed(() =>
  store.instances.reduce((sum, i) => sum + (i.costMonth || 0), 0),
);
// costByTeam is the broader team rollup (includes overhead not tied to a single
// instance). We surface it as the showback total alongside the raw instance sum
// so the demo shows both lenses.
const teamRollupTotal = computed(() =>
  store.costByTeam.reduce((sum, t) => sum + (t.month || 0), 0),
);

const totalKwh = computed(() =>
  store.instances.reduce((sum, i) => sum + energyForInstance(i).kwh, 0),
);
const totalCo2 = computed(() =>
  store.instances.reduce((sum, i) => sum + energyForInstance(i).co2, 0),
);

const fmtEur = (n) => `€${Math.round(n).toLocaleString('nl-NL')}`;
const fmtKwh = (n) => `${Math.round(n).toLocaleString('nl-NL')} kWh`;
const fmtCo2 = (n) => `${(n).toLocaleString('nl-NL', { maximumFractionDigits: 0 })} kg`;
const teamName = (id) => store.teamById(id)?.name || id;

// --- Per-team breakdown (from the team rollup) ------------------------------
// The team rollup now spans ~74 teams. Drawing one donut arc + legend row per
// team turns 99% of the ring into an indistinguishable grey mass. We therefore
// show the top N spenders individually and fold the long tail into a single
// "overige teams" bucket. Colours are generated programmatically (HSL spread
// over the index) so every segment is visually distinct without a hardcoded map.
const TOP_TEAMS = 8;
const REST_COLOR = '#94a3b8';
const teamColorAt = (i) => `hsl(${(i * 47) % 360} 62% 48%)`;

// Full, unaggregated per-team list (top spenders first). Used for budget flags
// and as the source for both the capped breakdown and the rest bucket.
const allTeamCosts = computed(() => {
  const total = teamRollupTotal.value || 1;
  return [...store.costByTeam]
    .sort((a, b) => b.month - a.month)
    .map((t) => {
      const budget = store.budgets.find((b) => b.team === t.team);
      return {
        team: t.team,
        name: teamName(t.team),
        month: t.month,
        trend: t.trend,
        pct: (t.month / total) * 100,
        budget: budget?.budget ?? null,
        overBudget: budget ? t.month > budget.budget : false,
      };
    });
});

// Capped breakdown: top N teams (each its own colour) plus an aggregated
// "overige teams" row when the tail is non-empty.
const breakdown = computed(() => {
  const all = allTeamCosts.value;
  const total = teamRollupTotal.value || 1;
  const top = all.slice(0, TOP_TEAMS).map((t, i) => ({ ...t, color: teamColorAt(i) }));
  const rest = all.slice(TOP_TEAMS);
  if (rest.length === 0) return top;
  const restMonth = rest.reduce((sum, t) => sum + (t.month || 0), 0);
  top.push({
    team: '__rest__',
    name: `Overige teams (${rest.length})`,
    month: restMonth,
    trend: '',
    pct: (restMonth / total) * 100,
    color: REST_COLOR,
    budget: null,
    overBudget: false,
    isRest: true,
  });
  return top;
});

// --- SVG donut --------------------------------------------------------------
// Build cumulative arc segments for the donut using stroke-dasharray on circles
// for crisp, dependency-free rings.
const donut = computed(() => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const total = teamRollupTotal.value || 1;
  let offset = 0;
  return breakdown.value
    .filter((b) => b.month > 0)
    .map((b) => {
      const frac = b.month / total;
      const seg = {
        ...b,
        r,
        dash: frac * circ,
        gap: circ - frac * circ,
        rotation: (offset / total) * 360 - 90,
      };
      offset += b.month;
      return seg;
    });
});
const maxTeamMonth = computed(() => Math.max(...breakdown.value.map((b) => b.month), 1));

// --- Trend sparkline (synthetic 6-month history ending at the current total) -
const trendSeries = computed(() => {
  const end = instanceTotal.value;
  const factors = [0.82, 0.86, 0.89, 0.93, 0.97, 1.0];
  return factors.map((f) => Math.round(end * f));
});
const trendMonths = ['dec', 'jan', 'feb', 'mrt', 'apr', 'mei'];
const trendPath = computed(() => {
  const w = 520;
  const h = 120;
  const pad = 8;
  const vals = trendSeries.value;
  const min = Math.min(...vals) * 0.95;
  const max = Math.max(...vals) * 1.02;
  const span = max - min || 1;
  const pts = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((v - min) / span) * (h - 2 * pad);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${h - pad} L${pts[0][0].toFixed(1)},${h - pad} Z`;
  return { line, area, pts, w, h };
});
const trendDelta = computed(() => {
  const s = trendSeries.value;
  const first = s[0] || 1;
  const last = s[s.length - 1] || 0;
  return Math.round(((last - first) / first) * 100);
});

// --- Showback table ---------------------------------------------------------
const showbackColumns = [
  { key: 'name', label: 'Instance' },
  { key: 'kind', label: 'Type' },
  { key: 'env', label: 'Omgeving' },
  { key: 'team', label: 'Betaald door' },
  { key: 'app', label: 'Applicatie' },
  { key: 'dc', label: 'Datacenter' },
  { key: 'kwh', label: 'kWh/mnd', align: 'right' },
  { key: 'co2', label: 'CO2/mnd', align: 'right' },
  { key: 'costMonth', label: '€/mnd', align: 'right', mono: true },
];
// The showback table now spans 244 instances. DataTable has no pagination, so
// we add a search field plus a datacenter filter and cap the visible rows to an
// initial N, with a "toon meer" button that raises the cap. Default sort is by
// monthly cost (highest first) so the cap shows the most expensive instances.
const showbackQuery = ref('');
const showbackDc = ref('all');
const showbackLimit = ref(25);
const SHOWBACK_STEP = 25;

const appName = (id) => store.appById(id)?.name || '—';
const dcName = (id) => store.datacenterById(id)?.name || id;

const allShowbackRows = computed(() =>
  [...store.instances]
    .sort((a, b) => (b.costMonth || 0) - (a.costMonth || 0))
    .map((i) => {
      const e = energyForInstance(i);
      return { ...i, _kwh: e.kwh, _co2: e.co2 };
    }),
);

const filteredShowback = computed(() => {
  const q = showbackQuery.value.trim().toLowerCase();
  const dc = showbackDc.value;
  return allShowbackRows.value.filter((r) => {
    if (dc !== 'all' && r.dc !== dc) return false;
    if (!q) return true;
    return (
      (r.name || '').toLowerCase().includes(q) ||
      (r.kind || '').toLowerCase().includes(q) ||
      teamName(r.team).toLowerCase().includes(q) ||
      appName(r.app).toLowerCase().includes(q)
    );
  });
});

const showbackRows = computed(() => filteredShowback.value.slice(0, showbackLimit.value));
const showbackMore = computed(() => Math.max(0, filteredShowback.value.length - showbackLimit.value));
function showMoreShowback() {
  showbackLimit.value += SHOWBACK_STEP;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Kosten"
      lede="Showback en FinOps voor het Rijksplatform. Wie betaalt voor welke dienst, hoe ontwikkelt de uitgave zich, en wat is de energievoetafdruk per instance."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Kosten', href: '/kosten' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Budgetten" start-icon="euro-sign" @click="$router.push('/kosten/budgetten')" />
        <nldd-button variant="primary" text="Exporteer showback" start-icon="arrow-up-arrow-down" @click="store.audit('showback geexporteerd', 'kosten-overzicht')" />
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-collection layout="grid" item-width="220px">
      <MetricCard
        :value="fmtEur(instanceTotal)"
        label="Instance-kosten"
        :sub="`${store.instances.length} afgenomen diensten`"
        icon="cylinder-split"
        to="/infra/instances"
      />
      <MetricCard
        :value="fmtEur(teamRollupTotal)"
        label="Totale platformkosten"
        sub="showback per maand"
        icon="euro-sign"
      />
      <MetricCard
        :value="fmtKwh(totalKwh)"
        label="Energieverbruik"
        sub="incl. PUE-overhead"
        icon="cloud"
      />
      <MetricCard
        :value="fmtCo2(totalCo2)"
        label="CO2-uitstoot"
        :sub="`${CO2_PER_KWH} kg/kWh NL-mix`"
        icon="cloud"
      />
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- Breakdown + donut -->
    <div class="rp-cost-grid">
      <section>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Kosten per team</h2></nldd-title>
              <nldd-tag color="neutral" size="md">{{ fmtEur(teamRollupTotal) }} / maand</nldd-tag>
            </div>
            <nldd-spacer size="16" />

            <div class="rp-breakdown">
              <!-- Donut -->
              <div class="rp-donut-wrap">
                <svg viewBox="0 0 200 200" class="rp-donut" role="img" aria-label="Verdeling kosten per team">
                  <circle cx="100" cy="100" r="70" class="rp-donut-track" />
                  <circle
                    v-for="seg in donut"
                    :key="seg.team"
                    cx="100"
                    cy="100"
                    :r="seg.r"
                    :stroke="seg.color"
                    :stroke-dasharray="`${seg.dash} ${seg.gap}`"
                    :transform="`rotate(${seg.rotation} 100 100)`"
                    class="rp-donut-seg"
                  />
                  <text x="100" y="94" class="rp-donut-total">{{ fmtEur(teamRollupTotal) }}</text>
                  <text x="100" y="114" class="rp-donut-cap">per maand</text>
                </svg>
              </div>

              <!-- Legend + bars -->
              <ul class="rp-legend">
                <li v-for="b in breakdown" :key="b.team" class="rp-legend-row">
                  <router-link v-if="!b.isRest" :to="`/teams/${b.team}`" class="rp-legend-team">
                    <span class="rp-legend-dot" :style="{ background: b.color }"></span>
                    <span class="rp-legend-name">{{ b.name }}</span>
                  </router-link>
                  <span v-else class="rp-legend-team rp-legend-rest">
                    <span class="rp-legend-dot" :style="{ background: b.color }"></span>
                    <span class="rp-legend-name">{{ b.name }}</span>
                  </span>
                  <div class="rp-legend-bar-wrap">
                    <div
                      class="rp-legend-bar"
                      :style="{ width: `${(b.month / maxTeamMonth) * 100}%`, background: b.color }"
                    ></div>
                  </div>
                  <div class="rp-legend-figs">
                    <strong>{{ fmtEur(b.month) }}</strong>
                    <span class="rp-legend-pct">{{ b.pct.toFixed(0) }}%</span>
                    <nldd-tag v-if="b.overBudget" color="critical" size="md">over budget</nldd-tag>
                    <span v-else-if="b.trend" class="rp-legend-trend" :class="{ up: b.trend.startsWith('+') }">{{ b.trend }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <!-- Trend -->
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Kostentrend</h2></nldd-title>
              <nldd-tag :color="trendDelta >= 0 ? 'warning' : 'success'" size="md">
                {{ trendDelta >= 0 ? '+' : '' }}{{ trendDelta }}% over 6 mnd
              </nldd-tag>
            </div>
            <nldd-spacer size="16" />
            <svg :viewBox="`0 0 ${trendPath.w} ${trendPath.h + 24}`" class="rp-trend" role="img" aria-label="Kostentrend over zes maanden">
              <defs>
                <linearGradient id="rp-trend-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#2563eb" stop-opacity="0.22" />
                  <stop offset="100%" stop-color="#2563eb" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path :d="trendPath.area" fill="url(#rp-trend-fill)" />
              <path :d="trendPath.line" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <g v-for="(p, i) in trendPath.pts" :key="i">
                <circle :cx="p[0]" :cy="p[1]" r="3.5" fill="#2563eb" />
                <text :x="p[0]" :y="trendPath.h + 16" class="rp-trend-label">{{ trendMonths[i] }}</text>
              </g>
            </svg>
            <p class="rp-trend-note">
              Geprojecteerde instance-uitgave eindigt op {{ fmtEur(instanceTotal) }} per maand. De stijging zit vooral bij Toeslagen (extra Kafka-replica's na incident-mitigatie).
            </p>
          </nldd-container>
        </nldd-card>
      </section>

      <!-- Side rail: energy flavour + relations -->
      <aside>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Energie en CO2</h2></nldd-title>
              <nldd-icon name="cloud" aria-hidden="true" class="rp-head-icon"></nldd-icon>
            </div>
            <nldd-spacer size="12" />
            <p class="rp-energy-lede">
              Verbruik geschat uit kosten, opgehoogd met de PUE van het datacenter. Een lagere PUE betekent minder koel- en stroomoverhead per server.
            </p>
            <ul class="rp-pue-list">
              <li v-for="dc in store.datacenters" :key="dc.id" class="rp-pue-row">
                <router-link :to="`/fysiek/datacenters/${dc.id}`" class="rp-pue-name">
                  <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>
                  {{ dc.name }}
                </router-link>
                <div class="rp-pue-meter">
                  <div class="rp-pue-fill" :style="{ width: `${Math.min((dc.pue - 1) / 0.5 * 100, 100)}%` }"></div>
                </div>
                <span class="rp-pue-val">PUE {{ dc.pue }}</span>
              </li>
            </ul>
            <nldd-spacer size="16" />
            <div class="rp-energy-totals">
              <div class="rp-energy-fig">
                <span class="rp-energy-num">{{ fmtKwh(totalKwh) }}</span>
                <span class="rp-energy-cap">per maand</span>
              </div>
              <div class="rp-energy-fig">
                <span class="rp-energy-num">{{ fmtCo2(totalCo2) }}</span>
                <span class="rp-energy-cap">CO2 per maand</span>
              </div>
            </div>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <RelationLinks
          title="Doorklikken"
          :links="[
            { text: 'Budgetten per team', to: '/kosten/budgetten', icon: 'euro-sign' },
            { text: 'Afgenomen instances', to: '/infra/instances', icon: 'cylinder-split' },
            { text: 'Teams', to: '/teams', icon: 'person-2' },
            { text: 'Datacenters', to: '/fysiek', icon: 'apartment-building' },
          ]"
        />
      </aside>
    </div>

    <nldd-spacer size="32" />

    <!-- Showback table -->
    <nldd-card>
      <nldd-container padding="24">
        <div class="rp-section-head">
          <nldd-title size="4"><h2>Showback: wie betaalt voor wat</h2></nldd-title>
          <nldd-tag color="neutral" size="md">{{ filteredShowback.length }} van {{ store.instances.length }} instances</nldd-tag>
        </div>
        <nldd-rich-text>
          <p>Elke afgenomen dienst wordt teruggerekend naar het team dat hem afnam. Klik door naar instance, app, team of datacenter.</p>
        </nldd-rich-text>
        <nldd-spacer size="16" />

        <div class="rp-showback-controls">
          <nldd-search-field
            class="rp-showback-search"
            placeholder="Zoek op instance, type, team of applicatie"
            @input="(e) => { showbackQuery = e.target.value; showbackLimit = 25; }"
          ></nldd-search-field>
          <nldd-dropdown>
            <select
              class="rp-showback-dc"
              :value="showbackDc"
              @change="(e) => { showbackDc = e.target.value; showbackLimit = 25; }"
            >
              <option value="all">Alle datacenters</option>
              <option v-for="dc in store.datacenters" :key="dc.id" :value="dc.id">{{ dc.name }}</option>
            </select>
          </nldd-dropdown>
        </div>
        <nldd-spacer size="16" />

        <DataTable :columns="showbackColumns" :rows="showbackRows" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'name'">
              <router-link :to="`/infra/instances/${row.id}`" class="rp-cell-link rp-mono">{{ row.name }}</router-link>
            </template>
            <template v-else-if="col.key === 'kind'">
              <nldd-tag color="accent" size="md">{{ row.kind }}</nldd-tag>
            </template>
            <template v-else-if="col.key === 'env'">
              <StatusBadge :status="row.env" />
            </template>
            <template v-else-if="col.key === 'team'">
              <router-link :to="`/teams/${row.team}`" class="rp-cell-link">{{ teamName(row.team) }}</router-link>
            </template>
            <template v-else-if="col.key === 'app'">
              <router-link v-if="row.app" :to="`/apps/${row.app}`" class="rp-cell-link">{{ appName(row.app) }}</router-link>
              <span v-else class="rp-cell-muted">platform</span>
            </template>
            <template v-else-if="col.key === 'dc'">
              <router-link :to="`/fysiek/datacenters/${row.dc}`" class="rp-cell-link">{{ dcName(row.dc) }}</router-link>
            </template>
            <template v-else-if="col.key === 'kwh'">
              <span class="rp-cell-energy">{{ fmtKwh(row._kwh) }}</span>
            </template>
            <template v-else-if="col.key === 'co2'">
              <span class="rp-cell-energy">{{ fmtCo2(row._co2) }}</span>
            </template>
            <template v-else-if="col.key === 'costMonth'">
              <strong>{{ fmtEur(row.costMonth) }}</strong>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>

        <div v-if="showbackMore > 0" class="rp-showback-more">
          <nldd-button
            variant="secondary"
            :text="`Toon meer (nog ${showbackMore})`"
            start-icon="chevron-down"
            @click="showMoreShowback"
          />
        </div>
        <p v-else-if="filteredShowback.length === 0" class="rp-showback-empty">
          Geen instances gevonden voor deze zoekopdracht of dit datacenter.
        </p>

        <CliHint command="rp cost showback --by team --period maand" label="Hetzelfde overzicht via de CLI:" />
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-cost-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-cost-grid {
    grid-template-columns: 1fr;
  }
}

.rp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.rp-head-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.5;
}

/* Breakdown / donut */
.rp-breakdown {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: center;
}
@media (max-width: 620px) {
  .rp-breakdown {
    grid-template-columns: 1fr;
  }
}
.rp-donut-wrap {
  display: grid;
  place-items: center;
}
.rp-donut {
  width: 180px;
  height: 180px;
}
.rp-donut-track {
  fill: none;
  stroke: var(--semantics-dividers-color, rgba(0, 0, 0, 0.08));
  stroke-width: 22;
}
.rp-donut-seg {
  fill: none;
  stroke-width: 22;
  transition: stroke-dasharray 0.4s ease;
}
.rp-donut-total {
  text-anchor: middle;
  font-size: 22px;
  font-weight: 700;
  fill: currentColor;
}
.rp-donut-cap {
  text-anchor: middle;
  font-size: 11px;
  fill: currentColor;
  opacity: 0.55;
}

.rp-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.rp-legend-row {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
}
@media (max-width: 620px) {
  .rp-legend-row {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
.rp-legend-team {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  min-width: 0;
}
.rp-legend-team:hover .rp-legend-name {
  text-decoration: underline;
}
.rp-legend-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 3px;
  flex: 0 0 auto;
}
.rp-legend-name {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-legend-bar-wrap {
  height: 0.55rem;
  border-radius: 99px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
  overflow: hidden;
}
.rp-legend-bar {
  height: 100%;
  border-radius: 99px;
  min-width: 2px;
  transition: width 0.4s ease;
}
.rp-legend-figs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  white-space: nowrap;
}
.rp-legend-pct {
  opacity: 0.55;
}
.rp-legend-trend {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-legend-trend.up {
  color: #b45309;
  opacity: 0.9;
}

/* Trend */
.rp-trend {
  width: 100%;
  height: auto;
}
.rp-trend-label {
  text-anchor: middle;
  font-size: 11px;
  fill: currentColor;
  opacity: 0.55;
}
.rp-trend-note {
  font-size: 0.85rem;
  opacity: 0.7;
  margin: 0.75rem 0 0;
}

/* Energy rail */
.rp-energy-lede {
  font-size: 0.85rem;
  opacity: 0.75;
  margin: 0 0 0.85rem;
}
.rp-pue-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.rp-pue-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 70px auto;
  align-items: center;
  gap: 0.6rem;
}
.rp-pue-name {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: inherit;
  font-size: 0.85rem;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-pue-name:hover {
  text-decoration: underline;
}
.rp-pue-name nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
  opacity: 0.6;
  flex: 0 0 auto;
}
.rp-pue-meter {
  height: 0.5rem;
  border-radius: 99px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
  overflow: hidden;
}
.rp-pue-fill {
  height: 100%;
  border-radius: 99px;
  background: linear-gradient(90deg, #0d9488, #d97706);
}
.rp-pue-val {
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
}
.rp-energy-totals {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.rp-energy-fig {
  padding: 0.75rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
  text-align: center;
}
.rp-energy-num {
  display: block;
  font-size: 1.15rem;
  font-weight: 700;
}
.rp-energy-cap {
  font-size: 0.75rem;
  opacity: 0.6;
}

.rp-legend-rest {
  cursor: default;
}
.rp-legend-rest .rp-legend-name {
  opacity: 0.75;
  font-style: italic;
}

/* Showback controls */
.rp-showback-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.rp-showback-search {
  flex: 1 1 280px;
  min-width: 220px;
}
.rp-showback-dc {
  min-width: 200px;
}
.rp-showback-more {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.rp-showback-empty {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 1rem 0 0;
}

/* Table cells */
.rp-cell-link {
  text-decoration: none;
  color: var(--rp-link, #2563eb);
}
.rp-cell-link:hover {
  text-decoration: underline;
}
.rp-cell-muted {
  opacity: 0.5;
}
.rp-cell-energy {
  font-variant-numeric: tabular-nums;
  opacity: 0.8;
}
.rp-mono {
  font-family: var(--rp-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
}
</style>
