<script setup>
// Data contract detail: the full agreement for one dataset-to-app coupling. The
// KPIs cover the SLA, schema, status and retention; the "Afspraak" card holds
// the governance terms (doelbinding, grondslag, bewaartermijn, signing). Cross-
// links go to the dataset, the consuming app, the provider team and the law.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import GrondslagBlock from '../../components/shared/GrondslagBlock.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const STATUS_BADGE = { actief: 'ok', heronderhandeling: 'warn', concept: 'requested' };

const contract = computed(() => store.datacontractById(route.params.id));
const dataset = computed(() => (contract.value ? store.datasetById(contract.value.dataset) : null));
const consumer = computed(() => (contract.value ? store.appById(contract.value.consumer) : null));
const provider = computed(() => (contract.value ? store.teamById(contract.value.provider) : null));
const wet = computed(() =>
  contract.value && contract.value.grondslag ? store.wetById(contract.value.grondslag) : null,
);

const relations = computed(() => {
  if (!contract.value) return [];
  const links = [];
  if (dataset.value) links.push({ text: dataset.value.name, to: `/data/${dataset.value.id}`, icon: 'chart-x-y-axis-line' });
  if (consumer.value) links.push({ text: consumer.value.name, to: `/apps/${consumer.value.id}`, icon: 'rectangle-stack' });
  if (provider.value) links.push({ text: provider.value.name, to: `/teams/${provider.value.id}`, icon: 'person-2' });
  if (wet.value) links.push({ text: wet.value.name, to: `/wetten/${wet.value.id}`, icon: 'certificate' });
  return links;
});

const cli = computed(() => (contract.value ? `bg datacontract show ${contract.value.id}` : ''));
</script>

<template>
  <div v-if="contract" class="rp-page">
    <PageHeader
      :title="`Datacontract ${contract.id}`"
      :lede="contract.doelbinding"
      :crumbs="[
        { text: 'Datacontracten', href: '/datacontracten' },
        { text: contract.id, href: `/datacontracten/${contract.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar overzicht" start-icon="chevron-left" href="/datacontracten"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="contract.sla" label="Beschikbaarheid" sub="SLA" icon="check-mark-circle" />
      <MetricCard :value="contract.schema" label="Schema" sub="versie van het contract" icon="pencil-on-square" />
      <MetricCard :value="contract.status" label="Status" sub="van de afspraak" :icon="contract.status === 'actief' ? 'check-mark-circle' : 'clock'" />
      <MetricCard :value="contract.bewaartermijn" label="Bewaartermijn" sub="maximale bewaarduur" icon="clock" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- Agreement terms -->
      <nldd-card accessible-label="Afspraak" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-dc-head">
            <nldd-title size="4"><h2>Afspraak</h2></nldd-title>
            <StatusBadge :status="STATUS_BADGE[contract.status]" size="md" />
          </div>
          <nldd-spacer size="14" />
          <dl class="rp-kv">
            <div class="rp-kv-row">
              <dt>Doelbinding</dt>
              <dd>{{ contract.doelbinding }}</dd>
            </div>
            <div class="rp-kv-row">
              <dt>Grondslag</dt>
              <dd v-if="wet">
                <router-link :to="`/wetten/${wet.id}`" class="rp-link">{{ wet.name }}</router-link>
              </dd>
              <dd v-else>—</dd>
            </div>
            <div class="rp-kv-row">
              <dt>Bewaartermijn</dt>
              <dd>{{ contract.bewaartermijn }}</dd>
            </div>
            <div class="rp-kv-row">
              <dt>Ondertekend</dt>
              <dd v-if="contract.signed">{{ contract.signed }}</dd>
              <dd v-else>concept, nog niet ondertekend</dd>
            </div>
          </dl>
        </nldd-container>
      </nldd-card>

      <div class="rp-dc-side">
        <GrondslagBlock v-if="contract.grondslag" :grondslag="contract.grondslag" title="Grondslag (waar mag dit)" />
        <RelationLinks title="Bron en afnemer" :links="relations" />
      </div>
    </nldd-container>

    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Datacontract niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar overzicht" @click="router.push('/datacontracten')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
.rp-dc-side { display: flex; flex-direction: column; gap: 20px; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-dc-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-kv { margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.rp-kv-row { display: grid; grid-template-columns: 11rem 1fr; gap: 0.5rem; align-items: baseline; }
.rp-kv-row dt { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; }
.rp-kv-row dd { margin: 0; font-weight: 600; }
@media (max-width: 600px) { .rp-kv-row { grid-template-columns: 1fr; gap: 0.15rem; } }
.rp-link { color: var(--semantics-actions-primary-default-background-color); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
