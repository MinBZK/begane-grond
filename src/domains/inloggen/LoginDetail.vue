<script setup>
// Login method detail: the betrouwbaarheidsniveaus, protocol, eIDAS and machtigen
// support, plus the apps that consume this method. Everything cross-links: the
// owning app and team in the relations, and every connected app to /apps/:id so
// you can see which diensten rely on this login building block.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const method = computed(() => store.loginMethodById(route.params.id));
const app = computed(() => (method.value ? store.appById(method.value.app) : null));
const team = computed(() => (method.value ? store.teamById(method.value.team) : null));

// Highest betrouwbaarheidsniveau is the last level in the ordered list.
const highestLevel = computed(() => {
  const levels = method.value?.levels || [];
  return levels.length ? levels[levels.length - 1] : '—';
});

// Connected apps as a table, resolving each app id to its name and team.
const connectedRows = computed(() =>
  method.value
    ? method.value.connectedApps.map((appId) => {
        const a = store.appById(appId);
        return {
          id: appId,
          naam: a?.name || appId,
          team: store.teamById(a?.team)?.name || '—',
          to: `/apps/${appId}`,
        };
      })
    : [],
);
const connectedColumns = [
  { key: 'naam', label: 'Dienst' },
  { key: 'team', label: 'Team' },
];

const relations = computed(() => {
  if (!method.value) return [];
  const links = [];
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  for (const row of connectedRows.value) links.push({ text: row.naam, to: row.to, icon: 'rectangle-stack' });
  return links;
});

const cli = computed(() => (method.value ? `bg login show ${method.value.id}` : ''));
</script>

<template>
  <div v-if="method" class="rp-page">
    <PageHeader
      :title="method.name"
      :lede="method.description"
      :crumbs="[
        { text: 'Inloggen', href: '/inloggen' },
        { text: method.name, href: `/inloggen/${method.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar catalogus" start-icon="chevron-left" href="/inloggen"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="method.audience" label="Doelgroep" sub="voor wie" icon="person-circle" />
      <MetricCard :value="method.protocol" label="Protocol" sub="koppelvlak" icon="link" />
      <MetricCard :value="highestLevel" label="Hoogste niveau" sub="betrouwbaarheid" icon="shield-check-mark" />
      <MetricCard :value="method.status" label="Status" sub="levenscyclus" :icon="method.status === 'productie' ? 'check-mark-circle' : 'clock'" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- Levels and capabilities -->
      <nldd-card accessible-label="Betrouwbaarheidsniveaus" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-lv-head">
            <nldd-title size="4"><h2>Betrouwbaarheidsniveaus</h2></nldd-title>
            <nldd-tag color="neutral" size="md">{{ method.protocol }}</nldd-tag>
          </div>
          <nldd-spacer size="14" />
          <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
            <nldd-tag v-for="lvl in method.levels" :key="lvl" color="accent" size="md">{{ lvl }}</nldd-tag>
          </nldd-container>
          <nldd-spacer size="16" />
          <p class="rp-cap">
            <nldd-icon :name="method.machtigen ? 'check-mark-circle' : 'lock-closed'" aria-hidden="true"></nldd-icon>
            Machtigen: {{ method.machtigen ? 'ondersteund' : 'niet ondersteund' }}
          </p>
          <p class="rp-cap">
            <nldd-icon :name="method.eidas ? 'globe' : 'lock-closed'" aria-hidden="true"></nldd-icon>
            eIDAS: {{ method.eidas ? 'gekoppeld aan het EU-knooppunt' : 'niet van toepassing' }}
          </p>
          <p class="rp-cap">
            <nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>
            Hoogste niveau: {{ highestLevel }}
          </p>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Gebruikt door en beheerd" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Connected apps -->
    <nldd-title size="3"><h2>Diensten die hierop inloggen</h2></nldd-title>
    <nldd-spacer size="16" />
    <DataTable :columns="connectedColumns" :rows="connectedRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'naam'">
          <router-link :to="row.to" class="rp-link">{{ row.naam }}</router-link>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>
    <p v-if="!connectedRows.length" class="rp-empty">Nog geen diensten gekoppeld.</p>

    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Inlogmethode niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar catalogus" @click="router.push('/inloggen')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-lv-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-cap { display: flex; align-items: center; gap: 0.4rem; margin: 0.4rem 0 0; font-size: 0.85rem; opacity: 0.78; }
.rp-cap nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
.rp-empty { opacity: 0.6; margin: 0.5rem 0 0; }
.rp-link { color: var(--semantics-actions-primary-default-background-color, #154273); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
