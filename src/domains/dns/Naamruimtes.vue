<script setup>
// Namespace registry overview: the four+ namespaces as cards, each showing its
// rules. Teaches the layered gov.nl model and where the legacy namespaces fit.
// Read-only, no role gating.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import NamespaceCard from './NamespaceCard.vue';
import DnsSubnav from './DnsSubnav.vue';

const store = usePlatformStore();

const total = computed(() => store.namespaces.length);
const openCount = computed(() => store.namespaces.filter((n) => n.openForRegistration).length);
const strictCount = computed(() => store.namespaces.filter((n) => n.requiresDnssec).length);
const onderwegCount = computed(
  () =>
    store.domeinaanvragen.filter((a) => a.status === 'aangevraagd' || a.status === 'in beoordeling')
      .length,
);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Naamruimtes"
      lede="gov.nl wordt de gedeelde Rijks-root: organisaties krijgen een eigen tier toegewezen en geven daaronder zelf diensten uit. De bestaande naamruimtes blijven werken, maar zijn gesloten voor nieuwe registraties. Elke naamruimte heeft eigen regels."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Domeinen', href: '/dns' },
        { text: 'Naamruimtes', href: '/dns/naamruimtes' },
      ]"
    >
      <template #actions>
        <nldd-button variant="primary" text="Subdomein aanvragen" start-icon="globe" href="/dns/aanvragen/nieuw"></nldd-button>
      </template>
    </PageHeader>

    <DnsSubnav />
    <nldd-spacer size="16" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="total" label="Naamruimtes" sub="in het register" icon="globe" />
      <MetricCard :value="openCount" label="Open" sub="voor nieuwe registraties" icon="check-mark-circle" />
      <MetricCard :value="strictCount" label="DNSSEC verplicht" sub="strikte naamruimtes" icon="shield-check-mark" />
      <MetricCard :value="onderwegCount" label="Aanvragen onderweg" sub="in behandeling" icon="clock" to="/dns/aanvragen" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Gelaagde delegatie"
      supporting-text="Niemand vraagt rechtstreeks bij de gov.nl-root aan. De centrale registry-beheerder wijst een organisatie-tier toe (belastingdienst.gov.nl); binnen die tier geeft de organisatie zelf diensten uit (toeslagen.belastingdienst.gov.nl). Zo houdt de overheid grip zonder iedereen bij de root te laten."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <nldd-collection layout="grid" item-width="400px">
      <NamespaceCard v-for="n in store.namespaces" :key="n.id" :namespace="n" />
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-page {
  display: block;
}
</style>
