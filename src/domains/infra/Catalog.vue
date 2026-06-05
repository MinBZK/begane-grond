<script setup>
// Service catalog: a tile per available infra service from the store. Each tile
// shows icon, name, tagline, tier and a price hint, and an "afnemen" button that
// routes into the order wizard for that kind. A small KPI strip on top frames
// how much is already running.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

const services = computed(() => store.serviceCatalog);
const instanceCount = computed(() => store.instances.length);
const monthlyCost = computed(() =>
  store.instances.reduce((sum, i) => sum + (i.costMonth || 0), 0),
);
// At platform scale the running fleet sums to a five-figure monthly bill, so the
// raw number is unreadable without thousands separators. Derive the formatted
// label live from the store and format it in the Dutch locale.
const monthlyCostLabel = computed(() => `€${monthlyCost.value.toLocaleString('nl-NL')}`);
const readyCount = computed(() =>
  store.instances.filter((i) => i.status === 'ready').length,
);

// How many running instances exist per service kind, to enrich each tile.
function runningFor(kind) {
  return store.instances.filter((i) => i.kind === kind).length;
}

const TIER_COLOR = { Gold: 'warning', Silver: 'neutral', Bronze: 'accent' };
function tierColor(tier) {
  return TIER_COLOR[tier] || 'neutral';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Service-catalogus"
      lede="Neem zelf beheerde infra-diensten af. Eén klik naar een ingevulde aanvraag, levering binnen enkele seconden in de demo."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Infra-diensten', href: '/infra' }]"
    >
      <template #actions>
        <router-link to="/infra/instances">
          <nldd-button variant="secondary" text="Mijn instances" start-icon="rectangle-stack"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="cloudstrategie" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="services.length" label="Diensten in catalogus" icon="cloud" />
      <MetricCard :value="instanceCount" label="Lopende instances" :sub="`${readyCount} ready`" icon="rectangle-stack" to="/infra/instances" />
      <MetricCard :value="monthlyCostLabel" label="Maandkosten infra" :sub="`optelsom van ${instanceCount} instances`" icon="euro-sign" />
    </nldd-container>

    <nldd-spacer size="28" />
    <nldd-title size="4"><h2>Beschikbare diensten</h2></nldd-title>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="320px">
      <nldd-card v-for="svc in services" :key="svc.kind" :accessible-label="svc.name">
        <nldd-container padding="20">
          <div class="rp-svc-head">
            <div class="rp-svc-icon">
              <nldd-icon :name="svc.icon" aria-hidden="true"></nldd-icon>
            </div>
            <nldd-tag :color="tierColor(svc.tier)" size="md">{{ svc.tier }}</nldd-tag>
          </div>

          <nldd-spacer size="12" />
          <nldd-title size="5"><h3>{{ svc.name }}</h3></nldd-title>
          <nldd-rich-text><p class="rp-svc-tagline">{{ svc.tagline }}</p></nldd-rich-text>

          <nldd-spacer size="12" />
          <div class="rp-svc-meta">
            <span class="rp-svc-price">{{ svc.priceHint }}</span>
            <span v-if="runningFor(svc.kind)" class="rp-svc-running">
              {{ runningFor(svc.kind) }} actief
            </span>
          </div>

          <nldd-spacer size="16" />
          <router-link :to="`/infra/order/${svc.kind}`" class="rp-svc-cta">
            <nldd-button variant="primary" text="Afnemen" end-icon="arrow-right"></nldd-button>
          </router-link>
        </nldd-container>
      </nldd-card>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-svc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rp-svc-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 12px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-svc-icon nldd-icon {
  width: 1.5rem;
  height: 1.5rem;
}
.rp-svc-tagline {
  opacity: 0.75;
  min-height: 2.6em;
}
.rp-svc-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-svc-price {
  font-weight: 700;
}
.rp-svc-running {
  font-size: 0.8rem;
  opacity: 0.65;
}
.rp-svc-cta {
  display: block;
  text-decoration: none;
}
</style>
