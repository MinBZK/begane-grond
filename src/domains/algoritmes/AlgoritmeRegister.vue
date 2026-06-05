<script setup>
// Algoritmeregister: the mandatory NL government register (since 2023) of
// algorithms and AI systems in production. Shows purpose, type, explainability,
// impact/discrimination assessment, and human-in-the-loop, and cross-links to
// the LLM model and datasets each one uses.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

const TYPES = [
  { id: 'all', label: 'Alle' },
  { id: 'rule-based', label: 'Rule-based' },
  { id: 'ml', label: 'Machine learning' },
  { id: 'llm', label: 'LLM' },
];
const TYPE_COLOR = { 'rule-based': 'neutral', ml: 'accent', llm: 'warning' };

const typeFilter = ref('all');
const filtered = computed(() =>
  typeFilter.value === 'all'
    ? store.algoritmes
    : store.algoritmes.filter((a) => a.type === typeFilter.value),
);

const inProductie = computed(() => store.algoritmes.filter((a) => a.status === 'productie').length);
const metMens = computed(() => store.algoritmes.filter((a) => a.humanInTheLoop).length);
const toetsenOpen = computed(
  () => store.algoritmes.filter((a) => a.impacttoets === 'vereist' || a.discriminatietoets === 'vereist').length,
);

function teamName(id) {
  return store.teamById(id)?.name || id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Algoritmeregister"
      lede="Alle algoritmes en AI-systemen die in productie meebeslissen, openbaar en navolgbaar. Met doel, uitlegbaarheid, de impact- en discriminatietoets, en of er een mens in de lus zit. Verplicht sinds 2023."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Algoritmeregister', href: '/algoritmes' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="LLM-API's" start-icon="sparkles" href="/ai/llm"></nldd-button>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="algoritmen" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.algoritmes.length" label="Algoritmes" sub="in het register" icon="sparkles" />
      <MetricCard :value="inProductie" label="In productie" sub="actief in beslissingen" icon="check-mark-circle" />
      <MetricCard :value="metMens" label="Mens in de lus" :sub="`van ${store.algoritmes.length}`" icon="person-2" />
      <MetricCard :value="toetsenOpen" label="Toets vereist" sub="impact of discriminatie" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Transparant en toetsbaar"
      supporting-text="Een algoritme dat meebeslist over burgers hoort openbaar te zijn, met een impact- en discriminatietoets. Het register maakt dat aantoonbaar."
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

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="a in filtered" :key="a.id" :to="`/algoritmes/${a.id}`" class="rp-alg-link">
        <nldd-card :accessible-label="a.name">
          <nldd-container padding="20">
            <div class="rp-alg-head">
              <nldd-icon name="sparkles" aria-hidden="true" class="rp-alg-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ a.name }}</h2></nldd-title>
                <p class="rp-alg-sub">{{ teamName(a.team) }}</p>
              </div>
              <nldd-tag :color="TYPE_COLOR[a.type]" size="md">{{ a.type }}</nldd-tag>
            </div>

            <nldd-spacer size="10" />
            <p class="rp-alg-doel">{{ a.doel }}</p>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag color="neutral" size="md">uitleg: {{ a.uitlegbaarheid }}</nldd-tag>
              <nldd-tag :color="a.humanInTheLoop ? 'success' : 'critical'" size="md">{{ a.humanInTheLoop ? 'mens in de lus' : 'volautomatisch' }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ a.besluitvorming }}</nldd-tag>
            </nldd-container>
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
.rp-alg-link { text-decoration: none; color: inherit; display: block; }
.rp-alg-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-alg-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-alg-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-alg-doel { margin: 0; font-size: 0.9rem; opacity: 0.85; }
</style>
