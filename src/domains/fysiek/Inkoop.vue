<script setup>
// Procurement and capacity planning. A DataTable of the purchase orders with
// status badges and per-DC grouping, plus a forward-looking capacity projection
// that draws a simple SVG line of expected power demand against installed
// capacity, so the user can see when the next DC (Zwolle) needs to come online.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();

const totalOpen = computed(() =>
  store.procurement
    .filter((p) => p.status !== 'geleverd' && p.status !== 'geïnstalleerd')
    .reduce((s, p) => s + p.amount, 0),
);
const totalAll = computed(() => store.procurement.reduce((s, p) => s + p.amount, 0));
const openCount = computed(() => store.procurement.filter((p) => p.status === 'besteld' || p.status === 'offerte').length);

const columns = [
  { key: 'id', label: 'PO-nummer', mono: true },
  { key: 'supplier', label: 'Leverancier' },
  { key: 'item', label: 'Artikel' },
  { key: 'dc', label: 'Bestemming' },
  { key: 'lead', label: 'Levertijd' },
  { key: 'amount', label: 'Bedrag', align: 'right', mono: true },
  { key: 'status', label: 'Status' },
];

const rows = computed(() =>
  store.procurement.map((p) => ({
    ...p,
    dcName: store.datacenterById(p.dc)?.name || p.dc,
  })),
);

// --- Capacity projection ---
// Current installed capacity (operational DCs) vs current demand, projected 24
// months forward with a modest growth rate. Zwolle (in aanbouw) adds capacity
// once it goes live (assume month 9).
const projection = computed(() => {
  const opCapacity = store.datacenters
    .filter((d) => d.status === 'operationeel')
    .reduce((s, d) => s + d.capacityKw, 0);
  const zwolle = store.datacenters.find((d) => d.id === 'dc-zwolle');
  const zwolleCap = zwolle?.capacityKw || 0;
  const currentDemand = store.datacenters.reduce((s, d) => s + d.usedKw, 0);

  const months = 24;
  const growth = 0.028; // ~2.8% per month
  const zwolleLiveAt = 9;

  const points = [];
  for (let m = 0; m <= months; m++) {
    const demand = Math.round(currentDemand * Math.pow(1 + growth, m));
    const capacity = opCapacity + (m >= zwolleLiveAt ? zwolleCap : 0);
    points.push({ m, demand, capacity });
  }
  // First month where demand exceeds operational-only capacity.
  const breach = points.find((p) => p.demand > opCapacity && p.m < zwolleLiveAt);
  return { points, opCapacity, zwolleCap, zwolleLiveAt, currentDemand, breach, months };
});

// SVG geometry for the projection chart.
const chart = computed(() => {
  const W = 720;
  const H = 280;
  const padL = 56;
  const padR = 20;
  const padT = 20;
  const padB = 36;
  const p = projection.value;
  const maxY = Math.max(
    p.opCapacity + p.zwolleCap,
    ...p.points.map((x) => x.demand),
  ) * 1.05;
  const x = (m) => padL + (m / p.months) * (W - padL - padR);
  const y = (v) => H - padB - (v / maxY) * (H - padT - padB);

  const demandPath = p.points.map((pt, i) => `${i ? 'L' : 'M'}${x(pt.m).toFixed(1)} ${y(pt.demand).toFixed(1)}`).join(' ');
  const capPath = p.points.map((pt, i) => `${i ? 'L' : 'M'}${x(pt.m).toFixed(1)} ${y(pt.capacity).toFixed(1)}`).join(' ');

  const yTicks = [];
  const step = 400;
  for (let v = 0; v <= maxY; v += step) yTicks.push({ v, y: y(v) });
  const xTicks = [0, 6, 12, 18, 24].map((m) => ({ m, x: x(m) }));

  return { W, H, padB, demandPath, capPath, x, y, yTicks, xTicks, maxY };
});
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Inkoop & capaciteitsplanning"
      lede="Lopende inkooporders voor hardware en racks, met een doorkijk naar de benodigde capaciteit. Tijdig bijbestellen voorkomt dat de zalen vollopen."
      :crumbs="[{ text: 'Fundament', href: '/fysiek' }, { text: 'Inkoop & planning', href: '/fysiek/inkoop' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Naar datacenters" start-icon="apartment-building" href="/fysiek"></nldd-button>
      </template>
    </PageHeader>

    <nldd-collection layout="grid" item-width="220px">
      <MetricCard :value="store.procurement.length" label="Inkooporders" sub="totaal in beeld" icon="euro-sign" />
      <MetricCard :value="`€ ${totalOpen.toLocaleString('nl-NL')}`" label="Openstaand" :sub="`${openCount} orders nog te leveren`" icon="clock" />
      <MetricCard :value="`€ ${totalAll.toLocaleString('nl-NL')}`" label="Totale waarde" sub="boekjaar 2026" icon="books-vertical" />
      <MetricCard
        :value="projection.breach ? `+${projection.breach.m} mnd` : `> ${projection.months} mnd`"
        label="Capaciteit krap"
        :sub="projection.breach ? 'voor Zwolle live is' : 'binnen de horizon'"
        icon="exclamation-triangle"
      />
    </nldd-collection>

    <nldd-spacer size="28" />

    <nldd-title size="3"><h2>Capaciteitsprojectie</h2></nldd-title>
    <nldd-rich-text>
      <p>
        Verwachte vermogensvraag bij ~2,8% groei per maand, afgezet tegen de geïnstalleerde capaciteit. DC Zwolle ({{ projection.zwolleCap }} kW) komt naar verwachting in maand {{ projection.zwolleLiveAt }} online.
      </p>
    </nldd-rich-text>
    <nldd-spacer size="12" />

    <nldd-card accessible-label="Capaciteitsprojectie">
      <nldd-container padding="20">
        <div class="rp-chart-legend">
          <span><span class="rp-cl-line rp-cl-demand"></span> Verwachte vraag (kW)</span>
          <span><span class="rp-cl-line rp-cl-cap"></span> Geïnstalleerde capaciteit (kW)</span>
        </div>
        <div class="rp-chart-wrap">
          <svg :viewBox="`0 0 ${chart.W} ${chart.H}`" class="rp-chart-svg" role="img" aria-label="Capaciteitsprojectie over 24 maanden">
            <!-- horizontal gridlines + y labels -->
            <g v-for="t in chart.yTicks" :key="'y' + t.v">
              <line x1="56" :x2="chart.W - 20" :y1="t.y" :y2="t.y" stroke="var(--semantics-dividers-color, #e2e6ea)" stroke-width="1" />
              <text x="48" :y="t.y + 4" text-anchor="end" class="rp-chart-axis">{{ t.v }}</text>
            </g>
            <!-- x labels -->
            <g v-for="t in chart.xTicks" :key="'x' + t.m">
              <text :x="t.x" :y="chart.H - 12" text-anchor="middle" class="rp-chart-axis">{{ t.m }}m</text>
            </g>

            <!-- Zwolle-live marker -->
            <line
              :x1="chart.x(projection.zwolleLiveAt)" :x2="chart.x(projection.zwolleLiveAt)"
              :y1="20" :y2="chart.H - chart.padB"
              stroke="#218838" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.6"
            />
            <text :x="chart.x(projection.zwolleLiveAt) + 4" y="32" class="rp-chart-marker">Zwolle live</text>

            <!-- capacity (step) -->
            <path :d="chart.capPath" fill="none" stroke="#218838" stroke-width="2.5" />
            <!-- demand -->
            <path :d="chart.demandPath" fill="none" stroke="#154273" stroke-width="2.5" />

            <!-- today dot -->
            <circle :cx="chart.x(0)" :cy="chart.y(projection.currentDemand)" r="4.5" fill="#154273" />
            <text :x="chart.x(0) + 8" :y="chart.y(projection.currentDemand) - 8" class="rp-chart-marker">nu: {{ projection.currentDemand }} kW</text>
          </svg>
        </div>
        <nldd-rich-text>
          <p class="rp-fade">
            <template v-if="projection.breach">
              Zonder uitbreiding loopt de vraag rond maand {{ projection.breach.m }} tegen de capaciteit van de operationele zalen aan. De inkooporders voor Zwolle (racks, switches) staan daarom op de kritieke pad.
            </template>
            <template v-else>
              Binnen de horizon blijft de geïnstalleerde capaciteit ruim boven de verwachte vraag.
            </template>
          </p>
        </nldd-rich-text>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="28" />

    <nldd-title size="3"><h2>Inkooporders</h2></nldd-title>
    <nldd-spacer size="12" />
    <DataTable :columns="columns" :rows="rows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'status'"><StatusBadge :status="value" /></template>
        <template v-else-if="col.key === 'amount'">€ {{ value.toLocaleString('nl-NL') }}</template>
        <template v-else-if="col.key === 'dc'">
          <router-link :to="`/fysiek/datacenters/${row.dc}`" class="rp-dc-cell-link">{{ row.dcName }}</router-link>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.rp-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-size: 0.82rem;
  margin-bottom: 0.75rem;
}
.rp-chart-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}
.rp-cl-line {
  width: 22px;
  height: 3px;
  border-radius: 2px;
  display: inline-block;
}
.rp-cl-demand { background: #154273; }
.rp-cl-cap { background: #218838; }
.rp-chart-wrap {
  overflow-x: auto;
}
.rp-chart-svg {
  width: 100%;
  min-width: 480px;
  height: auto;
  display: block;
}
.rp-chart-axis {
  font-size: 11px;
  fill: var(--semantics-text-default-color, #1a1a1a);
  opacity: 0.55;
  font-variant-numeric: tabular-nums;
}
.rp-chart-marker {
  font-size: 11px;
  font-weight: 600;
  fill: var(--semantics-text-default-color, #1a1a1a);
  opacity: 0.75;
}
.rp-dc-cell-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-dc-cell-link:hover {
  text-decoration: underline;
}
.rp-fade {
  opacity: 0.7;
  font-size: 0.88rem;
}
</style>
