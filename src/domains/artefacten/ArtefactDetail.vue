<script setup>
// Artifact detail: signing/provenance status, SBOM summary with example deps,
// and cross-links to the repo, app, pipeline, and any vulnerabilities found in
// the SBOM. Closes the loop the CI pipeline page opens.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const artefact = computed(() => store.artefactById(route.params.id));
const repo = computed(() => (artefact.value ? store.repoById(artefact.value.repo) : null));
const app = computed(() => (artefact.value ? store.appById(artefact.value.app) : null));
const buildJob = computed(() => (artefact.value ? store.ciJobById(artefact.value.buildJob) : null));
const vulns = computed(() =>
  artefact.value ? (artefact.value.sbom.vulns || []).map((id) => store.vulnerabilities.find((v) => v.id === id)).filter(Boolean) : [],
);

const depColumns = [
  { key: 'name', label: 'Component', mono: true },
  { key: 'version', label: 'Versie', mono: true },
  { key: 'license', label: 'Licentie' },
];

const relations = computed(() => {
  if (!artefact.value) return [];
  const links = [];
  if (repo.value) links.push({ text: repo.value.name, to: `/code/${repo.value.id}`, icon: 'chevron-left-forward-slash-chevron-right' });
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  links.push({ text: 'CI-pijplijn', to: '/environments/pijplijn', icon: 'gear' });
  if (buildJob.value) links.push({ text: `Build ${buildJob.value.id}`, to: '/environments/runners', icon: 'timer' });
  if (vulns.value.length) links.push({ text: `${vulns.value.length} kwetsbaarheid(en)`, to: '/security/kwetsbaarheden', icon: 'shield-check-mark' });
  return links;
});

const cli = computed(() =>
  artefact.value ? `bg artefact verify ${artefact.value.id}\nbg sbom show ${artefact.value.id}` : '',
);
</script>

<template>
  <div v-if="artefact" class="rp-page">
    <PageHeader
      :title="`${artefact.name} ${artefact.version}`"
      :lede="`${artefact.kind === 'container-image' ? 'Container-image' : 'Package'} in ${artefact.registry}. Herleidbaar tot de repository en de pijplijn die het bouwde.`"
      :crumbs="[
        { text: 'Artefacten', href: '/artefacten' },
        { text: `${artefact.name} ${artefact.version}`, href: `/artefacten/${artefact.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar register" start-icon="chevron-left" href="/artefacten"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="artefact.version" label="Versie" :sub="artefact.kind" icon="folder-stack" />
      <MetricCard :value="`SLSA ${artefact.slsaLevel}`" label="Supply-chain-niveau" sub="hoger is beter" icon="shield-check-mark" />
      <MetricCard :value="artefact.signed ? 'Ja' : 'Nee'" label="Ondertekend" :sub="artefact.provenance" :icon="artefact.signed ? 'check-mark-circle' : 'exclamation-triangle'" />
      <MetricCard :value="artefact.sbom.components" label="Componenten" :sub="artefact.sbom.format" icon="cylinder-split" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <nldd-card accessible-label="Handtekening en provenance" class="rp-span2">
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Handtekening en provenance</h2></nldd-title>
          <nldd-spacer size="12" />
          <dl class="rp-kv">
            <dt>Digest</dt>
            <dd class="rp-mono">{{ artefact.digest }}</dd>
            <dt>Ondertekend door</dt>
            <dd class="rp-mono">{{ artefact.signedBy || 'niet ondertekend' }}</dd>
            <dt>Provenance</dt>
            <dd><StatusBadge :status="artefact.provenance === 'geverifieerd' ? 'ok' : artefact.provenance === 'ongetekend' ? 'failing' : 'requested'" size="sm" /> <span class="rp-prov">{{ artefact.provenance }}</span></dd>
            <template v-if="buildJob">
              <dt>Gebouwd door</dt>
              <dd>
                <router-link :to="`/code/${buildJob.repo}`" class="rp-link rp-mono">{{ buildJob.id }}</router-link>
                <span class="rp-prov"> via {{ buildJob.workflow }} op {{ buildJob.pool }}</span>
              </dd>
            </template>
            <dt>Register</dt>
            <dd class="rp-mono">{{ artefact.registry }}</dd>
            <dt>Gepubliceerd</dt>
            <dd>{{ artefact.publishedAt }}</dd>
          </dl>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Herkomst" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-title size="3"><h2>SBOM ({{ artefact.sbom.format }})</h2></nldd-title>
    <nldd-rich-text><p>{{ artefact.sbom.components }} componenten in totaal. Een greep uit de directe afhankelijkheden.</p></nldd-rich-text>
    <nldd-spacer size="16" />
    <DataTable :columns="depColumns" :rows="artefact.sbom.deps" row-key="name" />

    <template v-if="vulns.length">
      <nldd-spacer size="20" />
      <nldd-inline-dialog
        title="Open kwetsbaarheden in de SBOM"
        :supporting-text="`${vulns.length} component(en) met een bekende CVE. Bekijk ze bij kwetsbaarheden.`"
      ></nldd-inline-dialog>
    </template>

    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Artefact niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar register" @click="router.push('/artefacten')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-kv { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem; margin: 0; }
.rp-kv dt { opacity: 0.6; font-size: 0.85rem; }
.rp-kv dd { margin: 0; font-weight: 600; word-break: break-all; }
.rp-prov { font-weight: 400; opacity: 0.75; }
.rp-mono { font-family: ui-monospace, monospace; font-weight: 400; }
.rp-link { color: var(--semantics-actions-primary-default-background-color, #154273); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
