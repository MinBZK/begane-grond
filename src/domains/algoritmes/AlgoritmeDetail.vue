<script setup>
// Algorithm detail: purpose, the impact and discrimination assessments, and
// cross-links to the app it runs in, the LLM model (for type 'llm'), and the
// datasets it consumes. The data sources link straight into the data domain.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const algoritme = computed(() => store.algoritmeById(route.params.id));
const team = computed(() => (algoritme.value ? store.teamById(algoritme.value.team) : null));
const app = computed(() => (algoritme.value ? store.appById(algoritme.value.app) : null));
const model = computed(() =>
  algoritme.value && algoritme.value.model ? store.llmModels.find((m) => m.id === algoritme.value.model) : null,
);
const sources = computed(() =>
  algoritme.value ? (algoritme.value.dataSources || []).map((id) => store.datasetById(id)).filter(Boolean) : [],
);

const sourceColumns = [
  { key: 'naam', label: 'Databron' },
  { key: 'label', label: 'Kwaliteit' },
];
const sourceRows = computed(() =>
  sources.value.map((d) => ({ id: d.id, naam: d.name, label: d.qualityLabel, to: `/data/${d.id}` })),
);
const LABEL_COLOR = { goud: 'warning', zilver: 'neutral', brons: 'accent' };

function toetsStatus(v) {
  if (v === 'uitgevoerd') return 'ok';
  if (v === 'vereist') return 'warn';
  return 'requested';
}

const relations = computed(() => {
  if (!algoritme.value) return [];
  const links = [];
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (model.value) links.push({ text: model.value.name, to: '/ai/llm', icon: 'sparkles' });
  for (const d of sources.value) links.push({ text: d.name, to: `/data/${d.id}`, icon: 'chart-x-y-axis-line' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  return links;
});
</script>

<template>
  <div v-if="algoritme" class="rp-page">
    <PageHeader
      :title="algoritme.name"
      :lede="algoritme.doel"
      :crumbs="[
        { text: 'Algoritmeregister', href: '/algoritmes' },
        { text: algoritme.name, href: `/algoritmes/${algoritme.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar register" start-icon="chevron-left" href="/algoritmes"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="algoritme.type" label="Type" sub="aard van het algoritme" icon="sparkles" />
      <MetricCard :value="algoritme.uitlegbaarheid" label="Uitlegbaarheid" sub="hoe goed te verklaren" icon="file-text" />
      <MetricCard :value="algoritme.besluitvorming" label="Rol in besluit" :sub="algoritme.humanInTheLoop ? 'met mens in de lus' : 'volautomatisch'" icon="person-2" />
      <MetricCard :value="algoritme.status" label="Status" :sub="`gepubliceerd ${algoritme.published}`" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <nldd-card accessible-label="Toetsen" class="rp-span2">
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Toetsen en waarborgen</h2></nldd-title>
          <nldd-spacer size="14" />
          <ul class="rp-toetsen">
            <li class="rp-toets">
              <StatusBadge :status="toetsStatus(algoritme.impacttoets)" size="sm" />
              <div><span class="rp-toets-label">Impacttoets (IAMA)</span><span class="rp-toets-val">{{ algoritme.impacttoets }}</span></div>
            </li>
            <li class="rp-toets">
              <StatusBadge :status="toetsStatus(algoritme.discriminatietoets)" size="sm" />
              <div><span class="rp-toets-label">Discriminatietoets</span><span class="rp-toets-val">{{ algoritme.discriminatietoets }}</span></div>
            </li>
            <li class="rp-toets">
              <StatusBadge :status="algoritme.humanInTheLoop ? 'ok' : 'warn'" size="sm" />
              <div><span class="rp-toets-label">Menselijke tussenkomst</span><span class="rp-toets-val">{{ algoritme.humanInTheLoop ? 'mens beslist mee' : 'volautomatisch besluit' }}</span></div>
            </li>
          </ul>
          <nldd-spacer size="16" />
          <p class="rp-pub"><nldd-icon name="file-text" aria-hidden="true"></nldd-icon> Openbaar via algoritmes.overheid.nl</p>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Gebruikt en draait in" :links="relations" />
    </nldd-container>

    <template v-if="sourceRows.length">
      <nldd-spacer size="24" />
      <nldd-title size="3"><h2>Databronnen</h2></nldd-title>
      <nldd-rich-text><p>De datasets die dit algoritme voeden. Kwaliteit van de bron bepaalt de betrouwbaarheid van de uitkomst.</p></nldd-rich-text>
      <nldd-spacer size="16" />
      <DataTable :columns="sourceColumns" :rows="sourceRows" row-key="id">
        <template #cell="{ row, col, value }">
          <template v-if="col.key === 'naam'">
            <router-link :to="row.to" class="rp-link">{{ row.naam }}</router-link>
          </template>
          <template v-else-if="col.key === 'label'">
            <nldd-tag :color="LABEL_COLOR[row.label]" size="md">{{ row.label }}</nldd-tag>
          </template>
          <template v-else>{{ value }}</template>
        </template>
      </DataTable>
    </template>

    <nldd-spacer size="24" />
    <CliHint :command="`bg algoritme show ${algoritme.id}`" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Algoritme niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar register" @click="router.push('/algoritmes')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-toetsen { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.7rem; }
.rp-toets { display: flex; align-items: center; gap: 0.75rem; }
.rp-toets div { display: flex; flex-direction: column; }
.rp-toets-label { font-weight: 600; }
.rp-toets-val { font-size: 0.84rem; opacity: 0.7; }
.rp-pub { display: flex; align-items: center; gap: 0.4rem; margin: 0; font-size: 0.85rem; opacity: 0.75; }
.rp-pub nldd-icon { width: 0.95rem; height: 0.95rem; }
.rp-link { color: var(--semantics-actions-primary-default-background-color, #154273); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
