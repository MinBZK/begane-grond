<script setup>
// Processing-activity detail (AVG art. 30 + DPIA). Shows the legal basis, the
// data categories, retention, and DPIA outcome, with cross-links to the law,
// the datasets, and the registers it touches.
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

const RISK_STATUS = { hoog: 'critical', gemiddeld: 'warn', laag: 'ok' };

const verwerking = computed(() => store.verwerkingById(route.params.id));
const team = computed(() => (verwerking.value ? store.teamById(verwerking.value.team) : null));
const wet = computed(() => (verwerking.value && verwerking.value.wet ? store.wetById(verwerking.value.wet) : null));
const datasets = computed(() =>
  verwerking.value ? (verwerking.value.datasets || []).map((id) => store.datasetById(id)).filter(Boolean) : [],
);
const registers = computed(() =>
  verwerking.value ? (verwerking.value.registers || []).map((id) => store.registerById(id)).filter(Boolean) : [],
);
// Algorithms that draw on the same datasets as this processing: a decision
// algorithm and the registered processing of those data share a legal basis.
const algoritmes = computed(() => {
  if (!verwerking.value) return [];
  const dsIds = new Set(verwerking.value.datasets || []);
  return store.algoritmes.filter((a) => (a.dataSources || []).some((d) => dsIds.has(d)));
});

const relations = computed(() => {
  if (!verwerking.value) return [];
  const links = [];
  if (wet.value) links.push({ text: wet.value.name, to: `/wetten/${wet.value.id}`, icon: 'certificate' });
  for (const d of datasets.value) links.push({ text: d.name, to: `/data/${d.id}`, icon: 'chart-x-y-axis-line' });
  for (const r of registers.value) links.push({ text: r.name, to: `/registers/${r.id}`, icon: 'cylinder-split' });
  for (const a of algoritmes.value) links.push({ text: a.name, to: `/algoritmes/${a.id}`, icon: 'brackets-ellipsis' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  return links;
});
</script>

<template>
  <div v-if="verwerking" class="rp-page">
    <PageHeader
      :title="verwerking.name"
      :lede="verwerking.doel"
      :crumbs="[
        { text: 'Privacy & DPIA', href: '/verwerkingen' },
        { text: verwerking.name, href: `/verwerkingen/${verwerking.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar register" start-icon="chevron-left" href="/verwerkingen"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="verwerking.grondslag" label="Grondslag" sub="AVG art. 6" icon="certificate" />
      <MetricCard :value="verwerking.dpiaStatus" label="DPIA" :sub="verwerking.dpiaDate || 'geen datum'" :icon="verwerking.dpiaStatus === 'uitgevoerd' ? 'check-mark-circle' : 'exclamation-triangle'" />
      <MetricCard :value="verwerking.risiconiveau" label="Risiconiveau" sub="voor betrokkenen" icon="shield-check-mark" />
      <MetricCard :value="verwerking.bewaartermijn" label="Bewaartermijn" sub="daarna vernietigen" icon="clock" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <nldd-card accessible-label="Gegevens en betrokkenen" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-d-head">
            <nldd-title size="4"><h2>Gegevens en betrokkenen</h2></nldd-title>
            <StatusBadge :status="RISK_STATUS[verwerking.risiconiveau]" size="md" />
          </div>
          <nldd-spacer size="14" />
          <dl class="rp-kv">
            <dt>Betrokkenen</dt>
            <dd>{{ verwerking.betrokkenen }}</dd>
            <dt>Datacategorieën</dt>
            <dd>
              <span v-for="c in verwerking.dataCategorieen" :key="c" class="rp-cat-chip">{{ c }}</span>
            </dd>
            <dt>Grondslag</dt>
            <dd>{{ verwerking.grondslag }}</dd>
            <dt>Bewaartermijn</dt>
            <dd>{{ verwerking.bewaartermijn }}</dd>
          </dl>
          <template v-if="verwerking.dpiaStatus === 'vereist'">
            <nldd-spacer size="14" />
            <nldd-inline-dialog
              title="DPIA nog uit te voeren"
              supporting-text="Deze verwerking raakt persoonsgegevens met verhoogd risico. Een DPIA is vereist voordat hij in productie gaat."
            ></nldd-inline-dialog>
          </template>
        </nldd-container>
      </nldd-card>

      <div class="rp-v-side">
        <GrondslagBlock :grondslag="verwerking" title="Grondslag (waar mag dit)" />
        <RelationLinks title="Gegevens en bronnen" :links="relations" />
      </div>
    </nldd-container>

    <nldd-spacer size="24" />
    <CliHint :command="`bg verwerking show ${verwerking.id}`" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Verwerking niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar register" @click="router.push('/verwerkingen')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-v-side { display: flex; flex-direction: column; gap: 20px; }
.rp-d-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-kv { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem; margin: 0; }
.rp-kv dt { opacity: 0.6; font-size: 0.85rem; }
.rp-kv dd { margin: 0; font-weight: 600; }
.rp-cat-chip { display: inline-block; font-size: 0.8rem; padding: 0.15rem 0.5rem; border-radius: 6px; background: var(--semantics-surfaces-tinted-background-color); margin: 0 0.3rem 0.3rem 0; font-weight: 500; }
</style>
