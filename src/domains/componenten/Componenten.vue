<script setup>
// Component catalog (Common Ground: "eenmaal bouwen, breed gebruiken"). A
// marketplace of reusable components teams adopt instead of rebuilding, each
// with its kind, language, owner team and how often it is reused.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Component kind has no StatusBadge vocabulary, so colour the tag locally.
const KIND_COLOR = { bibliotheek: 'neutral', service: 'accent', 'frontend-component': 'warning' };
const KINDS = [
  { id: 'all', label: 'Alle' },
  { id: 'bibliotheek', label: 'bibliotheek' },
  { id: 'service', label: 'service' },
  { id: 'frontend-component', label: 'frontend-component' },
];

const kindFilter = ref('all');
const filtered = computed(() =>
  kindFilter.value === 'all'
    ? store.componenten
    : store.componenten.filter((c) => c.kind === kindFilter.value),
);

const totalReuses = computed(() => store.componenten.reduce((sum, c) => sum + (c.reuses || 0), 0));
const mostReused = computed(() =>
  store.componenten.reduce((max, c) => Math.max(max, c.reuses || 0), 0),
);
const openSourceCount = computed(() =>
  store.componenten.filter((c) => (c.license || '').startsWith('EUPL')).length,
);

function teamName(id) {
  return store.teamById(id)?.name || id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Componenten"
      lede="Eenmaal bouwen, breed gebruiken. Herbruikbare componenten die teams overnemen in plaats van zelf opnieuw te bouwen. Van een geteste BRP-client tot een toegankelijke formulierbouwer: kies een component, neem het over en bouw verder op het werk van een ander team."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Componenten', href: '/componenten' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Teams" start-icon="person-2" href="/teams"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.componenten.length" label="Componenten" sub="in de catalogus" icon="puzzle-piece" />
      <MetricCard :value="totalReuses" label="Hergebruik" sub="overgenomen door teams" icon="link" />
      <MetricCard :value="mostReused" label="Meest hergebruikt" sub="vaakst overgenomen component" icon="check-mark-circle" />
      <MetricCard :value="openSourceCount" label="Open source" sub="onder EUPL-licentie" icon="file-text" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Niet opnieuw bouwen, maar overnemen"
      supporting-text="Elk component dat een ander team overneemt is werk dat niet dubbel gedaan hoeft te worden. Het hergebruikgetal maakt dat in één oogopslag zichtbaar."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="k in KINDS"
        :key="k.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': kindFilter === k.id }"
        @click="kindFilter = k.id"
      >{{ k.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="c in filtered" :key="c.id" :to="`/componenten/${c.id}`" class="rp-comp-link">
        <nldd-card :accessible-label="c.name">
          <nldd-container padding="20">
            <div class="rp-comp-head">
              <nldd-icon name="puzzle-piece" aria-hidden="true" class="rp-comp-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ c.name }}</h2></nldd-title>
                <p class="rp-comp-sub">{{ teamName(c.owner) }}</p>
              </div>
            </div>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag :color="KIND_COLOR[c.kind] || 'neutral'" size="md">{{ c.kind }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ c.language }}</nldd-tag>
              <nldd-tag color="success" size="md">{{ c.reuses }}x hergebruikt</nldd-tag>
            </nldd-container>

            <nldd-spacer size="12" />
            <p class="rp-comp-license">
              <nldd-icon name="file-text" aria-hidden="true"></nldd-icon>
              {{ c.license }}
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
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color, #154273); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-comp-link { text-decoration: none; color: inherit; display: block; }
.rp-comp-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-comp-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-comp-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-comp-license { display: flex; align-items: center; gap: 0.4rem; margin: 0; font-size: 0.85rem; opacity: 0.78; }
.rp-comp-license nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
</style>
