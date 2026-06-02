<script setup>
// Software and SaaS bought under the rijksinkoopvoorwaarden (ARBIT for products,
// ARVODI for services). Vendor lock-in risk and an exit strategy are made explicit
// per contract, so dependence on a vendor is a governed choice rather than an
// accident. Single overview page, no detail route.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();

// Lock-in has no StatusBadge vocabulary, so map it locally to nldd-tag colors.
const LOCKIN_COLOR = { laag: 'success', gemiddeld: 'warning', hoog: 'critical' };

const LOCKINS = [
  { id: 'all', label: 'Alle' },
  { id: 'laag', label: 'laag' },
  { id: 'gemiddeld', label: 'gemiddeld' },
  { id: 'hoog', label: 'hoog' },
];

const lockinFilter = ref('all');
const filtered = computed(() =>
  lockinFilter.value === 'all'
    ? store.softwareInkoop
    : store.softwareInkoop.filter((s) => s.lockin === lockinFilter.value),
);

const totalAmount = computed(() => store.softwareInkoop.reduce((sum, s) => sum + s.amount, 0));
const totalLabel = computed(() => `€ ${(totalAmount.value / 1e6).toFixed(1)}M`);
const hogeLockin = computed(() => store.softwareInkoop.filter((s) => s.lockin === 'hoog').length);
const openSourceCount = computed(() => store.softwareInkoop.filter((s) => s.openSource === true).length);

const columns = [
  { key: 'supplier', label: 'Leverancier' },
  { key: 'product', label: 'Product' },
  { key: 'category', label: 'Categorie' },
  { key: 'contract', label: 'Voorwaarden' },
  { key: 'lockin', label: 'Lock-in' },
  { key: 'exitStrategie', label: 'Exit-strategie' },
  { key: 'amount', label: 'Bedrag', align: 'right' },
  { key: 'status', label: 'Status' },
];

// Manual thousands separator so we avoid locale-dependent formatting at runtime.
function formatAmount(amount) {
  const str = String(amount);
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function statusBadge(status) {
  if (status === 'actief') return 'ok';
  if (status === 'heroverweging') return 'warn';
  return 'failing';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Software-inkoop"
      lede="Software en SaaS, ingekocht onder de rijksinkoopvoorwaarden ARBIT en ARVODI. Per contract zijn het lock-in-risico en de exit-strategie expliciet gemaakt, zodat afhankelijkheid van een leverancier een bewuste keuze is en geen verrassing."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Software-inkoop', href: '/inkoop' },
      ]"
    >
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.softwareInkoop.length" label="Contracten" sub="in beheer" icon="tag" />
      <MetricCard :value="totalLabel" label="Totale waarde" sub="jaarlijkse uitgaven" icon="euro-sign" />
      <MetricCard :value="hogeLockin" label="Hoge lock-in" sub="vragen aandacht" icon="lock-closed" />
      <MetricCard :value="openSourceCount" label="Open source" sub="lagere afhankelijkheid" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Een exit-strategie hoort bij elke inkoop"
      supporting-text="Lock-in is niet altijd te vermijden, maar wel te beheersen. Door per contract vast te leggen hoe je eruit stapt, blijft overstappen naar een andere leverancier of open source een reële optie."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="l in LOCKINS"
        :key="l.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': lockinFilter === l.id }"
        @click="lockinFilter = l.id"
      >{{ l.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <DataTable :columns="columns" :rows="filtered" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'contract'">
          <nldd-tag color="neutral" size="md">{{ value }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'lockin'">
          <nldd-tag :color="LOCKIN_COLOR[value]" size="md">{{ value }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'amount'">
          <span class="rp-amount">€ {{ formatAmount(value) }}</span>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="statusBadge(value)" size="sm" /> <span class="rp-stat-text">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'exitStrategie'">
          <span class="rp-exit">{{ value }}</span>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-cat-filter { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.rp-cat { padding: 0.45rem 0.85rem; border-radius: 999px; border: 1.5px solid var(--semantics-dividers-color); background: transparent; cursor: pointer; font-size: 0.9rem; }
.rp-cat:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color, #154273); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-stat-text { font-size: 0.85rem; opacity: 0.8; }
.rp-amount { font-variant-numeric: tabular-nums; white-space: nowrap; }
.rp-exit { font-size: 0.85rem; opacity: 0.8; }
</style>
