<script setup>
// Woo (actieve openbaarmaking) + Archiefwet / e-Depot. Shows the publication
// status of decisions and documents, plus their archiving lifecycle. Unique to
// government: both publishing in the open and handing over to the e-Depot are
// legal obligations, not nice-to-haves.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();

const TYPES = [
  { id: 'all', label: 'Alle' },
  { id: 'actieve openbaarmaking', label: 'Actieve openbaarmaking' },
  { id: 'Woo-verzoek', label: 'Woo-verzoek' },
];
const typeFilter = ref('all');
const filtered = computed(() =>
  typeFilter.value === 'all'
    ? store.wooDocuments
    : store.wooDocuments.filter((w) => w.type === typeFilter.value),
);

const gepubliceerd = computed(() => store.wooByStatus('gepubliceerd').length);
const inVoorbereiding = computed(() => store.wooByStatus('in voorbereiding').length);
const overgedragen = computed(() => store.wooDocuments.filter((w) => w.eDepotStatus === 'overgedragen').length);

const columns = [
  { key: 'title', label: 'Document' },
  { key: 'type', label: 'Soort' },
  { key: 'publicatiestatus', label: 'Publicatie' },
  { key: 'eDepotStatus', label: 'e-Depot' },
];

function pubBadge(status) {
  if (status === 'gepubliceerd') return 'ok';
  if (status === 'gedeeltelijk') return 'warn';
  return 'requested';
}
function depotBadge(status) {
  if (status === 'overgedragen') return 'ok';
  if (status === 'gepland') return 'requested';
  return 'neutral';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Woo & archivering"
      lede="Actieve openbaarmaking onder de Wet open overheid en overdracht aan het e-Depot onder de Archiefwet. Wat openbaar moet, staat openbaar. Wat bewaard moet blijven, gaat naar het archief."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Woo & archief', href: '/openbaarheid' },
      ]"
    >
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.wooDocuments.length" label="Documenten" sub="Woo en archief" icon="file-text" />
      <MetricCard :value="gepubliceerd" label="Gepubliceerd" sub="openbaar gemaakt" icon="check-mark-circle" />
      <MetricCard :value="inVoorbereiding" label="In voorbereiding" sub="nog te publiceren" icon="clock" />
      <MetricCard :value="overgedragen" label="In e-Depot" sub="duurzaam gearchiveerd" icon="folder-stack" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Openbaar tenzij, en bewaard volgens de wet"
      supporting-text="De Woo verplicht actieve openbaarmaking, de Archiefwet verplicht overdracht aan het e-Depot binnen de bewaartermijn. Beide horen bij het gebaande pad."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="t in TYPES"
        :key="t.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': typeFilter === t.id }"
        @click="typeFilter = t.id"
      >{{ t.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <DataTable :columns="columns" :rows="filtered" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'title'">
          <router-link :to="`/openbaarheid/${row.id}`" class="rp-link">{{ row.title }}</router-link>
        </template>
        <template v-else-if="col.key === 'type'">
          <nldd-tag :color="row.type === 'Woo-verzoek' ? 'accent' : 'neutral'" size="md">{{ row.type }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'publicatiestatus'">
          <StatusBadge :status="pubBadge(value)" size="sm" /> <span class="rp-stat-text">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'eDepotStatus'">
          <StatusBadge :status="depotBadge(value)" size="sm" /> <span class="rp-stat-text">{{ value }}</span>
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
.rp-link { color: var(--semantics-actions-primary-default-background-color, #154273); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
