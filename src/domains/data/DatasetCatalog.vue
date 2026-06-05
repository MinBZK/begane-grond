<script setup>
// Dataset catalog: a data.overheid.nl-equivalent, but with data quality labels
// (goud/zilver/brons) front and center. Each dataset references a base register
// as its source, the laws that mandate it, and the apps that consume it, so the
// lineage chain wet -> register -> dataset -> app is navigable from the detail.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Quality labels have no StatusBadge vocabulary, so map them locally. Goud is a
// warm gold, zilver neutral, brons an accent (warm bronze-ish).
const LABEL_COLOR = { goud: 'warning', zilver: 'neutral', brons: 'accent' };
const LABELS = [
  { id: 'all', label: 'Alle' },
  { id: 'goud', label: 'Goud' },
  { id: 'zilver', label: 'Zilver' },
  { id: 'brons', label: 'Brons' },
];

const labelFilter = ref('all');
const filtered = computed(() =>
  labelFilter.value === 'all'
    ? store.datasets
    : store.datasets.filter((d) => d.qualityLabel === labelFilter.value),
);

const goudCount = computed(() => store.datasetsByLabel('goud').length);
const bronsCount = computed(() => store.datasetsByLabel('brons').length);

function registerName(id) {
  return store.registerById(id)?.name || id;
}
function teamName(id) {
  return store.teamById(id)?.name || id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Datasetcatalogus"
      lede="De datasets waar de overheid op draait, met een kwaliteitslabel. Goud, zilver of brons op volledigheid, actualiteit en herleidbaarheid. Open tenzij er een reden is om te sluiten. Volg de herkomst van wet tot dataset tot dienst."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Datasets', href: '/data' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Basisregistraties" start-icon="cylinder-split" href="/registers"></nldd-button>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="datagebruik" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.datasets.length" label="Datasets" sub="in de catalogus" icon="chart-x-y-axis-line" />
      <MetricCard :value="goudCount" label="Goud" sub="hoogste datakwaliteit" icon="starburst-filled" />
      <MetricCard :value="store.openDataCount" label="Open data" sub="standaard openbaar" icon="check-mark-circle" />
      <MetricCard :value="bronsCount" label="Brons" sub="vragen aandacht" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Kwaliteit hoort bij de bron"
      supporting-text="Een dataset mag pas een besluit voeden als de herleidbaarheid op orde is. Het label maakt dat in één oogopslag zichtbaar."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="l in LABELS"
        :key="l.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': labelFilter === l.id }"
        @click="labelFilter = l.id"
      >{{ l.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="d in filtered" :key="d.id" :to="`/data/${d.id}`" class="rp-ds-link">
        <nldd-card :accessible-label="d.name">
          <nldd-container padding="20">
            <div class="rp-ds-head">
              <nldd-icon name="chart-x-y-axis-line" aria-hidden="true" class="rp-ds-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ d.name }}</h2></nldd-title>
                <p class="rp-ds-sub">{{ teamName(d.team) }}</p>
              </div>
              <nldd-tag :color="LABEL_COLOR[d.qualityLabel]" size="md">{{ d.qualityLabel }}</nldd-tag>
            </div>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag color="neutral" size="md">bron: {{ registerName(d.register) }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ d.consumers.length }} afnemers</nldd-tag>
              <nldd-tag color="success" size="md">{{ d.sla }}</nldd-tag>
            </nldd-container>

            <nldd-spacer size="12" />
            <p class="rp-ds-open">
              <nldd-icon :name="d.open ? 'check-mark-circle' : 'lock-closed'" aria-hidden="true"></nldd-icon>
              {{ d.open ? 'Open data' : 'Gesloten' }}<span v-if="!d.open && d.openReason"> · {{ d.openReason }}</span>
            </p>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-min-width-0 { min-width: 0; flex: 1 1 auto; }
.rp-cat-filter { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.rp-cat { padding: 0.45rem 0.85rem; border-radius: 999px; border: 1.5px solid var(--semantics-dividers-color); background: transparent; cursor: pointer; font-size: 0.9rem; }
.rp-cat:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-ds-link { text-decoration: none; color: inherit; display: block; }
.rp-ds-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-ds-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-ds-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-ds-open { display: flex; align-items: center; gap: 0.4rem; margin: 0; font-size: 0.85rem; opacity: 0.78; }
.rp-ds-open nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
</style>
