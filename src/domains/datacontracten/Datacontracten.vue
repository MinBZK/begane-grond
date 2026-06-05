<script setup>
// Data contract catalog: the agreement between a data source and its consumers.
// Per dataset-to-app coupling it fixes the schema, the SLA, the allowed purpose
// (doelbinding) and the retention, making data sharing an explicit, governed
// contract instead of an undocumented integration.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

// Contract status maps onto the StatusBadge vocabulary locally.
const STATUS_BADGE = { actief: 'ok', heronderhandeling: 'warn', concept: 'requested' };
const STATUSES = [
  { id: 'all', label: 'Alle' },
  { id: 'actief', label: 'actief' },
  { id: 'heronderhandeling', label: 'heronderhandeling' },
  { id: 'concept', label: 'concept' },
];

const statusFilter = ref('all');
const filtered = computed(() =>
  statusFilter.value === 'all'
    ? store.datacontracten
    : store.datacontracten.filter((c) => c.status === statusFilter.value),
);

const actiefCount = computed(() => store.datacontracten.filter((c) => c.status === 'actief').length);
const heronderhandelingCount = computed(() => store.datacontracten.filter((c) => c.status === 'heronderhandeling').length);
const conceptCount = computed(() => store.datacontracten.filter((c) => c.status === 'concept').length);

function datasetName(id) {
  return store.datasetById(id)?.name || id;
}
function appName(id) {
  return store.appById(id)?.name || id;
}

const columns = [
  { key: 'dataset', label: 'Dataset' },
  { key: 'consumer', label: 'Afnemer' },
  { key: 'sla', label: 'SLA', mono: true },
  { key: 'schema', label: 'Schema', mono: true },
  { key: 'status', label: 'Status' },
];
const rows = computed(() =>
  filtered.value.map((c) => ({
    id: c.id,
    dataset: datasetName(c.dataset),
    datasetTo: `/data/${c.dataset}`,
    consumer: appName(c.consumer),
    consumerTo: `/apps/${c.consumer}`,
    sla: c.sla,
    schema: c.schema,
    status: c.status,
    to: `/datacontracten/${c.id}`,
  })),
);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Datacontracten"
      lede="De afspraak tussen een gegevensbron en de afnemers ervan. Per koppeling leggen we het schema, de SLA, de toegestane doelbinding en de bewaartermijn vast. Zo wordt het delen van data een expliciet en bestuurbaar contract in plaats van een ongedocumenteerde koppeling."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Datacontracten', href: '/datacontracten' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Datasets" start-icon="chart-x-y-axis-line" href="/data"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.datacontracten.length" label="Datacontracten" sub="vastgelegde afspraken" icon="pencil-on-square" />
      <MetricCard :value="actiefCount" label="Actief" sub="ondertekend en in gebruik" icon="check-mark-circle" />
      <MetricCard :value="heronderhandelingCount" label="In heronderhandeling" sub="afspraak wordt herzien" icon="exclamation-triangle" />
      <MetricCard :value="conceptCount" label="Concept" sub="nog niet ondertekend" icon="file-text" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Doelbinding hoort in het contract"
      supporting-text="Een afnemer mag gegevens alleen gebruiken voor het doel dat in het contract staat. Maak dat expliciet, dan is het toetsbaar."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="s in STATUSES"
        :key="s.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': statusFilter === s.id }"
        @click="statusFilter = s.id"
      >{{ s.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <DataTable :columns="columns" :rows="rows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'dataset'">
          <router-link :to="row.to" class="rp-link">{{ row.dataset }}</router-link>
        </template>
        <template v-else-if="col.key === 'consumer'">
          <router-link :to="row.consumerTo" class="rp-link">{{ row.consumer }}</router-link>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="STATUS_BADGE[row.status]" size="sm" />
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
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-link { color: var(--semantics-actions-primary-default-background-color); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
