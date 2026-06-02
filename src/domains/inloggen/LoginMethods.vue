<script setup>
// Login methods catalog: login as a reusable platform building block. DigiD,
// eHerkenning, eIDAS and Machtigen are offered once and consumed by many apps,
// so each card shows the audience, the betrouwbaarheidsniveaus, the protocol and
// whether eIDAS and machtigen are supported. Click through to /inloggen/:id for
// the full picture of connected apps and the owning team.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Audience filter pills are derived from the data so a new audience in the seed
// shows up automatically. "Alle" is always first.
const audiences = computed(() => {
  const seen = [];
  for (const m of store.loginMethods) {
    if (!seen.includes(m.audience)) seen.push(m.audience);
  }
  return [{ id: 'all', label: 'Alle' }, ...seen.map((a) => ({ id: a, label: a }))];
});

const audienceFilter = ref('all');
const filtered = computed(() =>
  audienceFilter.value === 'all'
    ? store.loginMethods
    : store.loginMethods.filter((m) => m.audience === audienceFilter.value),
);

const machtigenCount = computed(() => store.loginMethods.filter((m) => m.machtigen).length);
const eidasCount = computed(() => store.loginMethods.filter((m) => m.eidas).length);
const productieCount = computed(() => store.loginMethods.filter((m) => m.status === 'productie').length);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Inloggen"
      lede="Inloggen als bouwsteen van het platform. DigiD, eHerkenning, eIDAS en machtigen worden één keer aangeboden en door alle diensten hergebruikt, voor burgers, bedrijven en ambtenaren. Kies een methode om de betrouwbaarheidsniveaus en gekoppelde diensten te zien."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Inloggen', href: '/inloggen' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Teams" start-icon="person-2" href="/teams"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.loginMethods.length" label="Inlogmethoden" sub="in de catalogus" icon="person-circle" />
      <MetricCard :value="machtigenCount" label="Met machtigen" sub="namens iemand handelen" icon="person-2" />
      <MetricCard :value="eidasCount" label="eIDAS" sub="grensoverschrijdend" icon="globe" />
      <MetricCard :value="productieCount" label="In productie" sub="live methoden" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Eén keer regelen, overal gebruiken"
      supporting-text="Een dienst hoeft inloggen niet zelf te bouwen. Het platform biedt de methoden aan, de dienst kiest het juiste betrouwbaarheidsniveau."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="a in audiences"
        :key="a.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': audienceFilter === a.id }"
        @click="audienceFilter = a.id"
      >{{ a.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="m in filtered" :key="m.id" :to="`/inloggen/${m.id}`" class="rp-lm-link">
        <nldd-card :accessible-label="m.name">
          <nldd-container padding="20">
            <div class="rp-lm-head">
              <nldd-icon name="person-circle" aria-hidden="true" class="rp-lm-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ m.name }}</h2></nldd-title>
                <p class="rp-lm-sub">{{ m.audience }}</p>
              </div>
              <nldd-tag color="neutral" size="md">{{ m.protocol }}</nldd-tag>
            </div>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag v-for="lvl in m.levels" :key="lvl" color="accent" size="md">{{ lvl }}</nldd-tag>
            </nldd-container>

            <nldd-spacer size="12" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag v-if="m.machtigen" color="success" size="md">machtigen</nldd-tag>
              <nldd-tag v-if="m.eidas" color="accent" size="md">eIDAS</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ m.connectedApps.length }} diensten</nldd-tag>
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
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color, #154273); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-lm-link { text-decoration: none; color: inherit; display: block; }
.rp-lm-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-lm-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-lm-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
</style>
