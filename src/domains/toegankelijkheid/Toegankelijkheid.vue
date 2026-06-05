<script setup>
// Accessibility statements (DigiToegankelijk). Every public service must publish a
// statement on its WCAG 2.2 AA compliance status. This page shows the statement per
// service with its compliance status, level, and open issues. Single overview page,
// no detail route.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const STATUSES = [
  { id: 'all', label: 'Alle' },
  { id: 'voldoet volledig', label: 'voldoet volledig' },
  { id: 'voldoet gedeeltelijk', label: 'voldoet gedeeltelijk' },
  { id: 'eerste maatregelen genomen', label: 'eerste maatregelen genomen' },
];

const statusFilter = ref('all');
const filtered = computed(() =>
  statusFilter.value === 'all'
    ? store.toegankelijkheidsverklaringen
    : store.toegankelijkheidsverklaringen.filter((t) => t.status === statusFilter.value),
);

const voldoetVolledig = computed(
  () => store.toegankelijkheidsverklaringen.filter((t) => t.status === 'voldoet volledig').length,
);
const metIssues = computed(
  () => store.toegankelijkheidsverklaringen.filter((t) => t.issues > 0).length,
);

function appName(id) {
  return store.appById(id)?.name || id;
}
function teamName(id) {
  return store.teamById(id)?.name || id;
}
function issuesLabel(issues) {
  return issues > 0 ? `${issues} knelpunten` : 'geen knelpunten';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Toegankelijkheid"
      lede="Elke dienst publiceert een verplichte toegankelijkheidsverklaring volgens DigiToegankelijk, met de status op WCAG 2.2 AA. Zo is in één oogopslag zichtbaar of een dienst voor iedereen bruikbaar is en waar nog knelpunten zitten."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Toegankelijkheid', href: '/toegankelijkheid' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Standaarden" start-icon="check-mark-circle" href="/standaarden"></nldd-button>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="toegankelijkheid" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.toegankelijkheidsverklaringen.length" label="Verklaringen" sub="per dienst" icon="eyeglasses" />
      <MetricCard :value="voldoetVolledig" label="Voldoet volledig" sub="WCAG 2.2 AA" icon="check-mark-circle" />
      <MetricCard :value="metIssues" label="Met knelpunten" sub="nog op te lossen" icon="exclamation-triangle" />
      <MetricCard value="AA" label="Gem. WCAG-niveau" sub="vereist niveau" icon="shield-check-mark" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Toegankelijk is de norm, niet de uitzondering"
      supporting-text="Een toegankelijkheidsverklaring is wettelijk verplicht voor elke overheidsdienst. WCAG 2.2 niveau AA is het gebaande pad, knelpunten worden zichtbaar gemaakt en weggewerkt."
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

    <nldd-collection layout="grid" item-width="400px">
      <nldd-card v-for="t in filtered" :key="t.id" :accessible-label="appName(t.app)">
        <nldd-container padding="20">
          <div class="rp-tv-head">
            <nldd-icon name="eyeglasses" aria-hidden="true" class="rp-tv-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <nldd-title size="4"><h2>{{ appName(t.app) }}</h2></nldd-title>
              <p class="rp-tv-fqdn">{{ t.fqdn }}</p>
            </div>
            <StatusBadge :status="t.status" size="md" />
          </div>

          <nldd-spacer size="10" />
          <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
            <nldd-tag color="neutral" size="md">WCAG {{ t.wcagLevel }}</nldd-tag>
            <nldd-tag :color="t.issues > 0 ? 'warning' : 'success'" size="md">{{ issuesLabel(t.issues) }}</nldd-tag>
          </nldd-container>

          <nldd-spacer size="12" />
          <p class="rp-tv-meta">
            <span>Getoetst {{ t.audited }}</span>
            <span class="rp-tv-dot">·</span>
            <span>{{ teamName(t.team) }}</span>
          </p>
        </nldd-container>
      </nldd-card>
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
.rp-tv-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-tv-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-tv-fqdn { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; font-family: var(--font-mono, ui-monospace, monospace); }
.rp-tv-meta { display: flex; align-items: center; gap: 0.4rem; margin: 0; font-size: 0.85rem; opacity: 0.78; flex-wrap: wrap; }
.rp-tv-dot { opacity: 0.5; }
</style>
