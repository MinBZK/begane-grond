<script setup>
// Verwerkingenregister (AVG art. 30) + DPIA status. Each processing activity
// records its purpose, legal basis (a law), the data categories and datasets it
// touches, retention, and DPIA status. The privacy-by-design counterpart to the
// data domain: this is where "why are we even processing this" is answered.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const DPIA = [
  { id: 'all', label: 'Alle' },
  { id: 'uitgevoerd', label: 'DPIA uitgevoerd' },
  { id: 'vereist', label: 'DPIA vereist' },
  { id: 'n.v.t.', label: 'Niet vereist' },
];
const RISK_STATUS = { hoog: 'critical', gemiddeld: 'warn', laag: 'ok' };

const dpiaFilter = ref('all');
const filtered = computed(() =>
  dpiaFilter.value === 'all'
    ? store.verwerkingen
    : store.verwerkingen.filter((v) => v.dpiaStatus === dpiaFilter.value),
);

const dpiaUitgevoerd = computed(() => store.verwerkingenByDpia('uitgevoerd').length);
const dpiaVereist = computed(() => store.verwerkingenByDpia('vereist').length);
const hoogRisico = computed(() => store.verwerkingen.filter((v) => v.risiconiveau === 'hoog').length);

function teamName(id) {
  return store.teamById(id)?.name || id;
}
function wetName(id) {
  return id ? store.wetById(id)?.name || id : 'geen wettelijke grondslag';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Verwerkingenregister"
      lede="Het register van verwerkingen (AVG art. 30): waarom verwerken we welke gegevens, op welke grondslag, en hoe lang bewaren we ze. Met de DPIA-status, zodat privacy een ontwerpkeuze is en geen bijzaak."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Privacy & DPIA', href: '/verwerkingen' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Datasets" start-icon="chart-x-y-axis-line" href="/data"></nldd-button>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="privacy" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.verwerkingen.length" label="Verwerkingen" sub="in het register" icon="lock-closed" />
      <MetricCard :value="dpiaUitgevoerd" label="DPIA uitgevoerd" sub="risico beoordeeld" icon="check-mark-circle" />
      <MetricCard :value="dpiaVereist" label="DPIA vereist" sub="nog te doen" icon="exclamation-triangle" />
      <MetricCard :value="hoogRisico" label="Hoog risico" sub="extra waarborgen nodig" icon="shield-check-mark" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Privacy by design"
      supporting-text="Elke verwerking heeft een doel, een grondslag en een bewaartermijn. Bij hoog risico hoort een DPIA. Het register maakt dat controleerbaar."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="d in DPIA"
        :key="d.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': dpiaFilter === d.id }"
        @click="dpiaFilter = d.id"
      >{{ d.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="v in filtered" :key="v.id" :to="`/verwerkingen/${v.id}`" class="rp-vwk-link">
        <nldd-card :accessible-label="v.name">
          <nldd-container padding="20">
            <div class="rp-vwk-head">
              <nldd-icon name="lock-closed" aria-hidden="true" class="rp-vwk-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ v.name }}</h2></nldd-title>
                <p class="rp-vwk-sub">{{ teamName(v.team) }}</p>
              </div>
              <StatusBadge :status="RISK_STATUS[v.risiconiveau]" size="md" />
            </div>

            <nldd-spacer size="10" />
            <p class="rp-vwk-grond"><nldd-icon name="certificate" aria-hidden="true"></nldd-icon> {{ wetName(v.wet) }}</p>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag color="neutral" size="md">{{ v.grondslag }}</nldd-tag>
              <nldd-tag :color="v.dpiaStatus === 'uitgevoerd' ? 'success' : v.dpiaStatus === 'vereist' ? 'warning' : 'neutral'" size="md">DPIA: {{ v.dpiaStatus }}</nldd-tag>
              <nldd-tag color="neutral" size="md">bewaren: {{ v.bewaartermijn }}</nldd-tag>
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
.rp-vwk-link { text-decoration: none; color: inherit; display: block; }
.rp-vwk-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-vwk-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-vwk-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-vwk-grond { display: flex; align-items: center; gap: 0.4rem; margin: 0; font-size: 0.85rem; opacity: 0.78; }
.rp-vwk-grond nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
</style>
