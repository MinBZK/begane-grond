<script setup>
// Feature flags as a platform capability: progressive delivery. Features roll out
// gradually (a rollout percentage), experiments compare variants, and kill-switches
// let a team disable a feature instantly without a deploy. Single overview page,
// no detail route.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Kind has no StatusBadge vocabulary, so map it locally to nldd-tag colors.
const KIND_COLOR = { release: 'neutral', experiment: 'accent', 'kill-switch': 'critical' };
const STATUS_COLOR = { aan: 'success', uit: 'neutral', uitrollend: 'warning', experiment: 'accent' };

const KINDS = [
  { id: 'all', label: 'Alle' },
  { id: 'release', label: 'release' },
  { id: 'experiment', label: 'experiment' },
  { id: 'kill-switch', label: 'kill-switch' },
];

const kindFilter = ref('all');
const filtered = computed(() =>
  kindFilter.value === 'all'
    ? store.featureFlags
    : store.featureFlags.filter((f) => f.kind === kindFilter.value),
);

const aanCount = computed(
  () => store.featureFlags.filter((f) => f.status === 'aan' || f.rollout === 100).length,
);
const experimentCount = computed(() => store.featureFlags.filter((f) => f.kind === 'experiment').length);
const killSwitchCount = computed(() => store.featureFlags.filter((f) => f.kind === 'kill-switch').length);

function appName(id) {
  return store.appById(id)?.name || id;
}

function rolloutColor(rollout) {
  if (rollout === 100) return 'var(--semantics-feedback-success-default-background-color)';
  if (rollout > 0) return 'var(--semantics-feedback-warning-default-background-color)';
  return 'var(--semantics-dividers-color)';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Feature flags"
      lede="Functionaliteit als platformcapaciteit uitrollen. Nieuwe features stap voor stap aanzetten met een geleidelijke uitrol, experimenten naast elkaar vergelijken en een kill-switch om iets direct uit te zetten zonder nieuwe release."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Feature flags', href: '/flags' },
      ]"
    >
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.featureFlags.length" label="Feature flags" sub="in beheer" icon="flag" />
      <MetricCard :value="aanCount" label="Aan" sub="volledig uitgerold" icon="check-mark-circle" />
      <MetricCard :value="experimentCount" label="Experimenten" sub="varianten vergeleken" icon="rectangle-stack" />
      <MetricCard :value="killSwitchCount" label="Kill-switches" sub="direct uitschakelbaar" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Geleidelijk uitrollen hoort bij het gebaande pad"
      supporting-text="Een feature flag scheidt uitrol van release. Een team kan een functie voor een klein deel van de gebruikers aanzetten en bij een probleem meteen terugschakelen."
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
      <nldd-card v-for="f in filtered" :key="f.id" :accessible-label="f.name">
        <nldd-container padding="20">
          <div class="rp-ff-head">
            <nldd-icon name="flag" aria-hidden="true" class="rp-ff-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <nldd-title size="4"><h2 class="rp-ff-name">{{ f.name }}</h2></nldd-title>
              <p class="rp-ff-sub">{{ appName(f.app) }}</p>
            </div>
            <nldd-tag :color="KIND_COLOR[f.kind]" size="md">{{ f.kind }}</nldd-tag>
          </div>

          <nldd-spacer size="14" />
          <div class="rp-roll-bar">
            <div class="rp-roll-fill" :style="{ width: f.rollout + '%', background: rolloutColor(f.rollout) }"></div>
          </div>
          <div class="rp-ff-rollrow">
            <span class="rp-ff-rolllabel">{{ f.rollout }}% uitgerold</span>
            <nldd-tag :color="STATUS_COLOR[f.status] || 'neutral'" size="md">{{ f.status }}</nldd-tag>
          </div>

          <nldd-spacer size="12" />
          <p class="rp-ff-desc">{{ f.description }}</p>
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
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-ff-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-ff-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-ff-name { font-family: var(--font-mono, ui-monospace, monospace); font-size: 1rem; word-break: break-word; }
.rp-ff-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-roll-bar { height: 0.55rem; border-radius: 999px; background: var(--semantics-surfaces-tinted-background-color); overflow: hidden; }
.rp-roll-fill { height: 100%; border-radius: 999px; }
.rp-ff-rollrow { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-top: 0.5rem; }
.rp-ff-rolllabel { font-size: 0.85rem; opacity: 0.78; }
.rp-ff-desc { margin: 0; font-size: 0.9rem; opacity: 0.85; }
</style>
