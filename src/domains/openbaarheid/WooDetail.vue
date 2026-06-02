<script setup>
// Woo document detail: the publication block (status, category, date) and the
// archiving block (selectielijst, retention, e-Depot handover), with cross-links
// to the owning app and the legal basis where set.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const doc = computed(() => store.wooDocumentById(route.params.id));
const app = computed(() => (doc.value && doc.value.app ? store.appById(doc.value.app) : null));
const team = computed(() => (doc.value ? store.teamById(doc.value.team) : null));
const wet = computed(() => (doc.value && doc.value.wet ? store.wetById(doc.value.wet) : null));

function pubBadge(status) {
  if (status === 'gepubliceerd') return 'ok';
  if (status === 'gedeeltelijk') return 'warn';
  return 'requested';
}
function depotBadge(status) {
  if (status === 'overgedragen') return 'ok';
  if (status === 'gepland') return 'requested';
  return 'neutral';
}

const relations = computed(() => {
  if (!doc.value) return [];
  const links = [];
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (wet.value) links.push({ text: wet.value.name, to: `/wetten/${wet.value.id}`, icon: 'certificate' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  return links;
});
</script>

<template>
  <div v-if="doc" class="rp-page">
    <PageHeader
      :title="doc.title"
      :lede="`${doc.type} in de categorie ${doc.pdcCategory}.`"
      :crumbs="[
        { text: 'Woo & archief', href: '/openbaarheid' },
        { text: doc.title, href: `/openbaarheid/${doc.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar overzicht" start-icon="chevron-left" href="/openbaarheid"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="doc.type" label="Soort" sub="Woo-grondslag" icon="file-text" />
      <MetricCard :value="doc.publicatiestatus" label="Publicatie" :sub="doc.publishedAt || 'nog niet gepubliceerd'" :icon="doc.publicatiestatus === 'gepubliceerd' ? 'check-mark-circle' : 'clock'" />
      <MetricCard :value="doc.bewaartermijn" label="Bewaartermijn" sub="Archiefwet" icon="clock" />
      <MetricCard :value="doc.eDepotStatus" label="e-Depot" :sub="doc.archiefDate || 'nog niet overgedragen'" icon="folder-stack" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <nldd-card accessible-label="Openbaarmaking en archivering" class="rp-span2">
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Openbaarmaking</h2></nldd-title>
          <nldd-spacer size="12" />
          <dl class="rp-kv">
            <dt>Status</dt>
            <dd><StatusBadge :status="pubBadge(doc.publicatiestatus)" size="sm" /> <span class="rp-stat-text">{{ doc.publicatiestatus }}</span></dd>
            <dt>Informatiecategorie</dt>
            <dd>{{ doc.pdcCategory }}</dd>
            <dt>Gepubliceerd</dt>
            <dd>{{ doc.publishedAt || 'nog niet' }}</dd>
          </dl>

          <nldd-spacer size="20" />
          <nldd-title size="4"><h2>Archivering</h2></nldd-title>
          <nldd-spacer size="12" />
          <dl class="rp-kv">
            <dt>Selectielijst</dt>
            <dd>{{ doc.selectielijst }}</dd>
            <dt>Bewaartermijn</dt>
            <dd>{{ doc.bewaartermijn }}</dd>
            <dt>e-Depot</dt>
            <dd><StatusBadge :status="depotBadge(doc.eDepotStatus)" size="sm" /> <span class="rp-stat-text">{{ doc.eDepotStatus }}</span></dd>
            <dt>Overgedragen</dt>
            <dd>{{ doc.archiefDate || 'nog niet' }}</dd>
          </dl>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Herkomst" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />
    <CliHint :command="`bg woo show ${doc.id}`" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Document niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar overzicht" @click="router.push('/openbaarheid')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-kv { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem; margin: 0; }
.rp-kv dt { opacity: 0.6; font-size: 0.85rem; }
.rp-kv dd { margin: 0; font-weight: 600; }
.rp-stat-text { font-weight: 400; opacity: 0.8; font-size: 0.85rem; }
</style>
