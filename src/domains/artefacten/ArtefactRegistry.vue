<script setup>
// Artifact and image registry. Makes the CI pipeline's "Publiceren" and
// "Ondertekenen" stages real: every artifact has a digest, an SBOM, and a
// signing/provenance status, and links back to the repo and app that produced
// it. This is the supply-chain-integrity view a separate registry cannot link.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

const KINDS = [
  { id: 'all', label: 'Alle' },
  { id: 'container-image', label: 'Container-images' },
  { id: 'package', label: 'Packages' },
];
const kindFilter = ref('all');
const filtered = computed(() =>
  kindFilter.value === 'all'
    ? store.artefacten
    : store.artefacten.filter((a) => a.kind === kindFilter.value),
);

const avgSlsa = computed(() => {
  if (!store.artefacten.length) return '0';
  const sum = store.artefacten.reduce((n, a) => n + a.slsaLevel, 0);
  return (sum / store.artefacten.length).toFixed(1);
});
const withVulns = computed(() => store.artefacten.filter((a) => (a.sbom.vulns || []).length).length);

function repoName(id) {
  return store.repoById(id)?.name || id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Artefactregister"
      lede="Elke build die het gebaande pad oplevert: container-images en packages, met hun digest, SBOM en handtekening. Ondertekend en herleidbaar tot de repository en de pijplijn die ze maakte."
      :crumbs="[
        { text: 'Omgevingen', href: '/environments' },
        { text: 'Artefacten', href: '/artefacten' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="De pijplijn" start-icon="gear" href="/environments/pijplijn"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.artefacten.length" label="Artefacten" sub="images en packages" icon="folder-stack" />
      <MetricCard :value="`${store.signedArtefactPct}%`" label="Ondertekend" sub="met provenance" icon="check-mark-circle" />
      <MetricCard :value="avgSlsa" label="Gem. SLSA-niveau" sub="supply-chain-borging" icon="shield-check-mark" />
      <MetricCard :value="withVulns" label="Met open CVE" sub="in de SBOM" icon="exclamation-triangle" to="/security/kwetsbaarheden" />
    </nldd-container>

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
      <router-link v-for="a in filtered" :key="a.id" :to="`/artefacten/${a.id}`" class="rp-art-link">
        <nldd-card :accessible-label="a.name">
          <nldd-container padding="20">
            <div class="rp-art-head">
              <nldd-icon name="folder-stack" aria-hidden="true" class="rp-art-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ a.name }} <span class="rp-art-ver">{{ a.version }}</span></h2></nldd-title>
                <p class="rp-art-digest rp-mono">{{ a.digest }}</p>
              </div>
              <nldd-tag :color="a.signed ? 'success' : 'critical'" size="md">{{ a.signed ? 'ondertekend' : 'ongetekend' }}</nldd-tag>
            </div>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag color="neutral" size="md">{{ a.kind }}</nldd-tag>
              <nldd-tag color="accent" size="md">SLSA {{ a.slsaLevel }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ a.sbom.components }} componenten</nldd-tag>
            </nldd-container>

            <nldd-spacer size="12" />
            <p class="rp-art-repo"><nldd-icon name="chevron-left-forward-slash-chevron-right" aria-hidden="true"></nldd-icon> {{ repoName(a.repo) }}</p>
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
.rp-art-link { text-decoration: none; color: inherit; display: block; }
.rp-art-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-art-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-art-ver { font-weight: 400; opacity: 0.6; font-size: 0.85rem; }
.rp-art-digest { margin: 0.15rem 0 0; font-size: 0.78rem; opacity: 0.6; }
.rp-art-repo { display: flex; align-items: center; gap: 0.4rem; margin: 0; font-size: 0.85rem; opacity: 0.78; }
.rp-art-repo nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
.rp-mono { font-family: ui-monospace, monospace; }
</style>
