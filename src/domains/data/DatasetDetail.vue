<script setup>
// Dataset detail: the headline page of the data story. Shows the quality
// breakdown per dimension, the lineage chain (wet -> register -> dataset -> app),
// the consumers, and the open-data status. Everything cross-links: register to
// /registers, laws to /wetten, consumers to /apps, processings to /verwerkingen.
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

const LABEL_COLOR = { goud: 'warning', zilver: 'neutral', brons: 'accent' };

const dataset = computed(() => store.datasetById(route.params.id));
const register = computed(() => (dataset.value ? store.registerById(dataset.value.register) : null));
const team = computed(() => (dataset.value ? store.teamById(dataset.value.team) : null));
const wetten = computed(() =>
  dataset.value ? (dataset.value.wetten || []).map((id) => store.wetById(id)).filter(Boolean) : [],
);
const verwerkingen = computed(() =>
  dataset.value ? store.verwerkingenForDataset(dataset.value.id) : [],
);

// Quality dimensions as bars. avgClassificatie is text, kept out of the bars.
const dims = computed(() => {
  if (!dataset.value) return [];
  const d = dataset.value.dimensions;
  return [
    { key: 'volledigheid', label: 'Volledigheid', value: d.volledigheid },
    { key: 'actualiteit', label: 'Actualiteit', value: d.actualiteit },
    { key: 'herleidbaarheid', label: 'Herleidbaarheid', value: d.herleidbaarheid },
    { key: 'juistheid', label: 'Juistheid', value: d.juistheid },
  ];
});
function dimColor(v) {
  if (v >= 90) return 'var(--rp-ok, #2e8540)';
  if (v >= 70) return 'var(--rp-warn, #d98a1f)';
  return 'var(--rp-crit, #d52b1e)';
}

// Consumers table.
const consumerRows = computed(() =>
  dataset.value
    ? dataset.value.consumers.map((appId) => {
        const app = store.appById(appId);
        return { id: appId, naam: app?.name || appId, team: store.teamById(app?.team)?.name || '—', to: `/apps/${appId}` };
      })
    : [],
);
const consumerColumns = [
  { key: 'naam', label: 'Afnemer' },
  { key: 'team', label: 'Team' },
];

const relations = computed(() => {
  if (!dataset.value) return [];
  const links = [];
  if (register.value) links.push({ text: register.value.name, to: `/registers/${register.value.id}`, icon: 'cylinder-split' });
  for (const w of wetten.value) links.push({ text: w.name, to: `/wetten/${w.id}`, icon: 'certificate' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  for (const v of verwerkingen.value) links.push({ text: v.name, to: `/verwerkingen/${v.id}`, icon: 'lock-closed' });
  return links;
});

const cli = computed(() =>
  dataset.value ? `bg data show ${dataset.value.id}\nbg data lineage ${dataset.value.id}` : '',
);
</script>

<template>
  <div v-if="dataset" class="rp-page">
    <PageHeader
      :title="dataset.name"
      :lede="dataset.description"
      :crumbs="[
        { text: 'Datasets', href: '/data' },
        { text: dataset.name, href: `/data/${dataset.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar catalogus" start-icon="chevron-left" href="/data"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="dataset.qualityLabel" label="Kwaliteitslabel" sub="goud, zilver of brons" icon="starburst-filled" />
      <MetricCard :value="dataset.sla" label="Beschikbaarheid" sub="SLA" icon="check-mark-circle" />
      <MetricCard :value="dataset.refresh" label="Verversing" sub="frequentie" icon="clock" />
      <MetricCard :value="dataset.open ? 'Open' : 'Gesloten'" label="Openbaarheid" :sub="dataset.open ? 'open data' : 'met reden gesloten'" :icon="dataset.open ? 'check-mark-circle' : 'lock-closed'" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- Quality breakdown -->
      <nldd-card accessible-label="Datakwaliteit" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-q-head">
            <nldd-title size="4"><h2>Datakwaliteit</h2></nldd-title>
            <nldd-tag :color="LABEL_COLOR[dataset.qualityLabel]" size="md">{{ dataset.qualityLabel }}</nldd-tag>
          </div>
          <nldd-spacer size="14" />
          <div class="rp-dims">
            <div v-for="dim in dims" :key="dim.key" class="rp-dim">
              <div class="rp-dim-row">
                <span>{{ dim.label }}</span>
                <span class="rp-mono">{{ dim.value }}</span>
              </div>
              <div class="rp-dim-bar">
                <div class="rp-dim-fill" :style="{ width: dim.value + '%', background: dimColor(dim.value) }"></div>
              </div>
            </div>
          </div>
          <nldd-spacer size="16" />
          <p class="rp-class"><nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon> AVG-classificatie: {{ dataset.dimensions.avgClassificatie }}</p>
          <p v-if="!dataset.open && dataset.openReason" class="rp-class"><nldd-icon name="file-text" aria-hidden="true"></nldd-icon> Gesloten omdat: {{ dataset.openReason }}</p>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Herkomst en gebruik" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Lineage stepper: wet -> register -> dataset -> app -->
    <nldd-title size="3"><h2>Herkomst (lineage)</h2></nldd-title>
    <nldd-rich-text><p>Van de wet die de gegevens vraagt, via de gezaghebbende bron, tot de dienst die ze gebruikt.</p></nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="Lineage">
      <nldd-container padding="20">
        <div class="rp-lineage">
          <router-link v-if="wetten.length" :to="`/wetten/${wetten[0].id}`" class="rp-lin-node">
            <span class="rp-lin-kind">Wet</span>
            <span class="rp-lin-name">{{ wetten[0].name }}</span>
          </router-link>
          <div v-if="wetten.length" class="rp-lin-arrow"><nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon></div>

          <router-link v-if="register" :to="`/registers/${register.id}`" class="rp-lin-node">
            <span class="rp-lin-kind">Register</span>
            <span class="rp-lin-name">{{ register.name }}</span>
          </router-link>
          <div v-if="register" class="rp-lin-arrow"><nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon></div>

          <div class="rp-lin-node rp-lin-self">
            <span class="rp-lin-kind">Dataset</span>
            <span class="rp-lin-name">{{ dataset.name }}</span>
          </div>
          <div v-if="consumerRows.length" class="rp-lin-arrow"><nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon></div>

          <router-link v-if="consumerRows.length" :to="consumerRows[0].to" class="rp-lin-node">
            <span class="rp-lin-kind">Dienst</span>
            <span class="rp-lin-name">{{ consumerRows[0].naam }}</span>
          </router-link>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <!-- Consumers -->
    <nldd-title size="3"><h2>Wie gebruikt deze dataset</h2></nldd-title>
    <nldd-spacer size="16" />
    <DataTable :columns="consumerColumns" :rows="consumerRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'naam'">
          <router-link :to="row.to" class="rp-link">{{ row.naam }}</router-link>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>
    <p v-if="!consumerRows.length" class="rp-empty">Nog geen afnemers gekoppeld.</p>

    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Dataset niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar catalogus" @click="router.push('/data')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-q-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-dims { display: flex; flex-direction: column; gap: 0.8rem; }
.rp-dim-row { display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 0.3rem; }
.rp-dim-bar { height: 0.55rem; border-radius: 999px; background: var(--semantics-surfaces-tinted-background-color); overflow: hidden; }
.rp-dim-fill { height: 100%; border-radius: 999px; }
.rp-class { display: flex; align-items: center; gap: 0.4rem; margin: 0.4rem 0 0; font-size: 0.85rem; opacity: 0.75; }
.rp-class nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
.rp-lineage { display: flex; align-items: stretch; flex-wrap: wrap; gap: 0; }
.rp-lin-node { display: flex; flex-direction: column; gap: 0.2rem; padding: 0.7rem 0.9rem; border-radius: 10px; border: 1px solid var(--semantics-dividers-color); min-width: 140px; text-decoration: none; color: inherit; }
.rp-lin-node:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-lin-self { background: var(--semantics-surfaces-tinted-background-color); box-shadow: inset 0 0 0 2px var(--semantics-actions-primary-default-background-color, #154273); }
.rp-lin-kind { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.55; }
.rp-lin-name { font-weight: 700; font-size: 0.9rem; }
.rp-lin-arrow { align-self: center; display: flex; align-items: center; padding: 0 0.2rem; }
.rp-lin-arrow nldd-icon { width: 1.1rem; height: 1.1rem; opacity: 0.4; }
.rp-mono { font-variant-numeric: tabular-nums; font-family: ui-monospace, monospace; }
.rp-empty { opacity: 0.6; margin: 0.5rem 0 0; }
.rp-link { color: var(--semantics-actions-primary-default-background-color, #154273); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
