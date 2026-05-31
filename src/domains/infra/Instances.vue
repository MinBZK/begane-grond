<script setup>
// All running infra instances in one table: kind, name, team, environment,
// monthly cost and live status. Rows link through to the instance detail page.
// A search field and a kind filter make the (growing) list navigable, and a
// KPI strip sits on top.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const query = ref('');
const kindFilter = ref('');

const kinds = computed(() => [...new Set(store.instances.map((i) => i.kind))]);

const ENV_LABELS = { dev: 'Ontwikkel', test: 'Test', acc: 'Acceptatie', prod: 'Productie' };

const rows = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.instances.filter((i) => {
    if (kindFilter.value && i.kind !== kindFilter.value) return false;
    if (!q) return true;
    return (
      i.name.toLowerCase().includes(q) ||
      i.team.toLowerCase().includes(q) ||
      i.kind.toLowerCase().includes(q)
    );
  });
});

const totalCost = computed(() =>
  store.instances.reduce((s, i) => s + (i.costMonth || 0), 0),
);
const prodCount = computed(() => store.instances.filter((i) => i.env === 'prod').length);

const columns = [
  { key: 'name', label: 'Instance', mono: true },
  { key: 'kind', label: 'Soort' },
  { key: 'team', label: 'Team' },
  { key: 'env', label: 'Omgeving' },
  { key: 'costMonth', label: 'Kosten/mnd', align: 'right' },
  { key: 'status', label: 'Status' },
];

function teamName(id) {
  return store.teamById(id)?.name || id;
}
function kindLabel(kind) {
  return store.serviceCatalog.find((s) => s.kind === kind)?.name || kind;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Instances"
      lede="Alle afgenomen infra-diensten, met team, omgeving, kosten en status. Klik door voor connectie-info en beheer."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Infra-diensten', href: '/infra' },
        { text: 'Instances', href: '/infra/instances' },
      ]"
    >
      <template #actions>
        <router-link to="/infra">
          <nldd-button variant="primary" text="Dienst afnemen" start-icon="plus"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="store.instances.length" label="Instances" :sub="`${prodCount} in productie`" icon="rectangle-stack" />
      <MetricCard :value="`€${totalCost}`" label="Maandkosten" sub="alle instances samen" icon="euro-sign" />
      <MetricCard :value="kinds.length" label="Soorten dienst" sub="in gebruik" icon="cloud" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-filters">
      <nldd-search-field
        :value="query"
        placeholder="Zoek op naam, team of soort"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <nldd-dropdown>
        <select v-model="kindFilter">
          <option value="">Alle soorten</option>
          <option v-for="k in kinds" :key="k" :value="k">{{ kindLabel(k) }}</option>
        </select>
      </nldd-dropdown>
    </div>

    <nldd-spacer size="16" />

    <DataTable :columns="columns" :rows="rows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'name'">
          <router-link :to="`/infra/instances/${row.id}`" class="rp-link">{{ value }}</router-link>
        </template>
        <template v-else-if="col.key === 'kind'">
          <nldd-tag color="neutral" size="md">{{ kindLabel(value) }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'team'">
          <router-link :to="`/teams/${row.team}`" class="rp-link">{{ teamName(value) }}</router-link>
        </template>
        <template v-else-if="col.key === 'env'">
          <nldd-tag :color="value === 'prod' ? 'brand' : 'neutral'" size="md">{{ ENV_LABELS[value] || value }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'costMonth'">
          <span class="rp-mono">{{ value ? `€${value}` : '—' }}</span>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="value" />
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>
  </div>
</template>

<style scoped>
.rp-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}
.rp-filters nldd-search-field {
  flex: 1;
  min-width: 240px;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
