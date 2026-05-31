<script setup>
// Change calendar: every planned change from the store rendered as a DataTable
// with a StatusBadge for the approval status and a risk tag. The team column
// links through to the owning team. Risk and status are color-coded so the
// change advisory board can scan it at a glance.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();

const columns = [
  { key: 'id', label: 'ID', mono: true },
  { key: 'title', label: 'Wijziging' },
  { key: 'risk', label: 'Risico' },
  { key: 'status', label: 'Status' },
  { key: 'window', label: 'Window' },
  { key: 'team', label: 'Team' },
];

const rows = computed(() => store.changes);

const pending = computed(
  () => store.changes.filter((c) => c.status === 'in beoordeling').length
);
const approved = computed(
  () => store.changes.filter((c) => c.status === 'goedgekeurd').length
);
const highRisk = computed(
  () => store.changes.filter((c) => c.risk === 'hoog' || c.risk === 'middel').length
);

function riskColor(risk) {
  if (risk === 'hoog') return 'critical';
  if (risk === 'middel') return 'warning';
  return 'success';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Changes"
      lede="Geplande wijzigingen aan productiediensten, met risico-inschatting, onderhoudsvenster en goedkeuringsstatus."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Incidenten', href: '/incidenten' },
        { text: 'Changes', href: '/incidenten/changes' },
      ]"
    >
      <template #actions>
        <router-link to="/incidenten/status">
          <nldd-button variant="secondary" text="Statuspagina" start-icon="heart"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="pending" label="In beoordeling" sub="wacht op CAB" icon="clock" />
      <MetricCard :value="approved" label="Goedgekeurd" sub="ingepland" icon="check-mark-circle" />
      <MetricCard :value="highRisk" label="Verhoogd risico" sub="middel of hoog" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Geplande wijzigingen</h2></nldd-title>
        <nldd-spacer size="16" />
        <DataTable :columns="columns" :rows="rows" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'risk'">
              <nldd-tag :color="riskColor(value)" size="md">{{ value }}</nldd-tag>
            </template>
            <template v-else-if="col.key === 'status'">
              <StatusBadge :status="value" />
            </template>
            <template v-else-if="col.key === 'team'">
              <router-link :to="`/teams/${row.team}`" class="rp-team-link">
                {{ store.teamById(row.team)?.name || row.team }}
              </router-link>
            </template>
            <template v-else-if="col.key === 'title'">
              <span class="rp-chg-title">{{ value }}</span>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />
    <nldd-inline-dialog
      title="Change advisory board"
      supporting-text="Wijzigingen met risico 'middel' of hoger worden door de CAB beoordeeld voordat ze in een onderhoudsvenster ingepland mogen worden."
    ></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-team-link {
  color: inherit;
  text-decoration: none;
  font-weight: 600;
}
.rp-team-link:hover {
  text-decoration: underline;
}
.rp-chg-title {
  font-weight: 600;
}
</style>
