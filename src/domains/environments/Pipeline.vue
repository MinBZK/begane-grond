<script setup>
// CI pipeline page. The story a standard, separately-wired toolchain cannot
// tell: everything a team normally pulls from a handful of separate systems
// (code hosting, CI, quality and coverage, dependency and CVE checks, artifact
// publishing, quality metrics) lives here in one golden path and runs in every
// pipeline by default, as gates. Section A maps each capability to where it
// lives on the platform; section B shows the default per-commit pipeline with
// its gates; section C shows the live runs from store.ciJobs.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// --- Section A: capability -> where it lives on the platform ----------------
// Described in terms of function, not vendor names. Each row links to the
// existing page where that capability already lives, so the claim is clickable.
const CAPABILITIES = [
  { label: 'Code & reviews', where: 'Code op Forgejo, open tenzij', to: '/code', icon: 'chevron-left-forward-slash-chevron-right' },
  { label: 'CI & pijplijnen', where: 'Runner-pools op eigen hardware', to: '/environments/runners', icon: 'ship-wheel' },
  { label: 'Kwaliteit & coverage', where: 'Kwaliteits-gate in elke pijplijn', to: '/security/scans', icon: 'check-mark-circle' },
  { label: 'Dependencies & kwetsbaarheden', where: 'SBOM- en CVE-gate in elke pijplijn', to: '/security/kwetsbaarheden', icon: 'shield-check-mark' },
  { label: 'Artefacten & images', where: 'Ondertekend in het artefactregister', to: '/artefacten', icon: 'folder-stack' },
  { label: 'Kwaliteitsmetrics & conformiteit', where: 'Scorecards en beleids-gates', to: '/scorecards', icon: 'starburst-filled' },
  { label: 'Werk & wijzigingen', where: "RFC's, changes en incidents", to: '/governance/rfcs', icon: 'books-vertical' },
];

// --- Section B: the default pipeline every repo gets ------------------------
const PIPELINE = [
  { id: 'build', label: 'Build', does: 'compileren en steiger-conventies', gate: false },
  { id: 'test', label: 'Test + coverage', does: 'unit- en integratietests, coverage-drempel', gate: true },
  { id: 'quality', label: 'Kwaliteit', does: 'lint, code smells, duplicatie', gate: true },
  { id: 'deps', label: 'SBOM + CVE', does: 'dependency-scan, geen open kritieke CVE', gate: true },
  { id: 'standards', label: 'Standaarden', does: 'API Design Rules, WCAG, BIO', gate: true },
  { id: 'publish', label: 'Publiceren', does: 'artefact en container-image naar het register', gate: false },
  { id: 'sign', label: 'Ondertekenen', does: 'provenance en SBOM-attestatie', gate: false },
];
const gateCount = computed(() => PIPELINE.filter((s) => s.gate).length);

// Minimal workflow: one line wires the whole golden path, instead of a handful
// of separately-bekabelde systems per team.
const CI_YAML = `# .forgejo/workflows/ci.yml
name: ci
on: [push, pull_request]
jobs:
  golden-path:
    uses: nldd/golden-path@v3   # build, test, kwaliteit, SBOM, standaarden, publiceren
`;

// --- KPI roll-up ------------------------------------------------------------
const jobsToday = computed(() => store.ciJobs.length);
const failingJobs = computed(() => store.ciJobs.filter((j) => j.status === 'failing').length);
const openCritical = computed(
  () =>
    store.vulnerabilities.filter(
      (v) => v.status !== 'opgelost' && (v.severity === 'critical' || v.severity === 'high'),
    ).length,
);
// Gate pass-rate across the portfolio: a repo's CI is green when its latest job
// is not failing. We approximate from the live job list so it reacts to data.
const gatePassRate = computed(() => {
  const jobs = store.ciJobs.filter((j) => j.status === 'passed' || j.status === 'failing');
  if (!jobs.length) return 100;
  const passed = jobs.filter((j) => j.status === 'passed').length;
  return Math.round((passed / jobs.length) * 100);
});

// --- Section C: live runs ---------------------------------------------------
const jobColumns = [
  { key: 'id', label: 'Run', mono: true },
  { key: 'repo', label: 'Repository' },
  { key: 'workflow', label: 'Workflow', mono: true },
  { key: 'branch', label: 'Branch', mono: true },
  { key: 'status', label: 'Status' },
  { key: 'duration', label: 'Duur', align: 'right' },
];
const jobRows = computed(() =>
  store.ciJobs.map((j) => ({
    ...j,
    repoName: store.repoById(j.repo)?.name || j.repo,
  })),
);
function jobBadge(status) {
  if (status === 'passed') return 'ok';
  if (status === 'failing') return 'failing';
  if (status === 'running') return 'provisioning';
  return 'requested';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="CI-pijplijn"
      lede="Elke repository krijgt dezelfde pijplijn, standaard aan. Alles wat een team normaal uit losse systemen haalt zit hier in één gebaand pad: bouwen, testen, kwaliteit, kwetsbaarheden, standaarden en publiceren. De gates draaien in elke pijplijn, ook als niemand naar een dashboard kijkt."
      :crumbs="[
        { text: 'Omgevingen', href: '/environments' },
        { text: 'CI-pijplijn', href: '/environments/pijplijn' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Waar het draait" start-icon="ship-wheel" href="/environments/runners"></nldd-button>
        <nldd-button variant="secondary" text="De gates" start-icon="lock-closed" href="/governance"></nldd-button>
      </template>
    </PageHeader>

    <!-- KPIs -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="jobsToday" label="Pijplijnen vandaag" sub="over alle repositories" icon="gear" />
      <MetricCard :value="`${gatePassRate}%`" label="Gates groen" sub="afgeronde runs" icon="check-mark-circle" />
      <MetricCard :value="openCritical" label="Open kritieke CVE's" sub="blokkeren de SBOM-gate" icon="shield-check-mark" to="/security/kwetsbaarheden" />
      <MetricCard :value="failingJobs" label="Falende runs" sub="vragen aandacht" icon="exclamation-triangle" to="/code" />
    </nldd-container>

    <nldd-spacer size="28" />

    <!-- Section A: one golden path instead of a handful of separate systems -->
    <nldd-card accessible-label="Alles in één gebaand pad">
      <nldd-container padding="24">
        <nldd-title size="3"><h2>Alles in één gebaand pad</h2></nldd-title>
        <nldd-spacer size="8" />
        <nldd-rich-text>
          <p class="rp-lead">
            Elk team haalt dit normaal uit een handvol losse systemen die het zelf bekabelt, bewaakt en bezoekt. Op het gebaande pad zit het in één pijplijn, standaard aan. De checks gebeuren ook als niemand kijkt.
          </p>
        </nldd-rich-text>
        <nldd-spacer size="18" />
        <ul class="rp-cap-list">
          <li v-for="c in CAPABILITIES" :key="c.label" class="rp-cap">
            <router-link :to="c.to" class="rp-cap-link">
              <span class="rp-cap-ic"><nldd-icon :name="c.icon" aria-hidden="true"></nldd-icon></span>
              <span class="rp-cap-body">
                <span class="rp-cap-label">{{ c.label }}</span>
                <span class="rp-cap-where">{{ c.where }}</span>
              </span>
              <nldd-icon name="chevron-right" aria-hidden="true" class="rp-cap-arrow"></nldd-icon>
            </router-link>
          </li>
        </ul>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="28" />

    <!-- Section B: the default pipeline every repo gets -->
    <nldd-title size="3"><h2>De standaard-pijplijn die elke repo krijgt</h2></nldd-title>
    <nldd-rich-text>
      <p>{{ gateCount }} van de {{ PIPELINE.length }} stappen zijn gates: ze blokkeren een merge of promotie als ze niet groen zijn.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-card accessible-label="Standaard-pijplijn">
      <nldd-container padding="20">
        <div class="rp-pipeline">
          <template v-for="(stage, i) in PIPELINE" :key="stage.id">
            <div class="rp-pipe-stage" :class="{ 'rp-pipe-gate': stage.gate }">
              <div class="rp-pipe-top">
                <span class="rp-pipe-label">{{ stage.label }}</span>
                <nldd-tag :color="stage.gate ? 'warning' : 'neutral'" size="md">{{ stage.gate ? 'gate' : 'stap' }}</nldd-tag>
              </div>
              <span class="rp-pipe-does">{{ stage.does }}</span>
            </div>
            <div v-if="i < PIPELINE.length - 1" class="rp-pipe-conn"></div>
          </template>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="20" />

    <!-- The whole golden path is one line in the workflow, not seven wirings. -->
    <nldd-card accessible-label="Eén regel bekabelt het gebaande pad">
      <nldd-container padding="20">
        <nldd-title size="5"><h3>Eén regel bekabelt het hele pad</h3></nldd-title>
        <nldd-spacer size="8" />
        <nldd-rich-text>
          <p>Geen losse tools per team koppelen. Eén <code>uses</code> zet de hele pijplijn aan, en updates van het pad komen automatisch mee.</p>
        </nldd-rich-text>
        <nldd-spacer size="12" />
        <nldd-code-viewer language="yaml">{{ CI_YAML }}</nldd-code-viewer>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="32" />

    <!-- Section C: live runs -->
    <nldd-title size="3"><h2>Live runs</h2></nldd-title>
    <nldd-rich-text>
      <p>De pijplijn-runs die nu draaien, wachten of net klaar zijn. Een falende gate maakt de hele run rood.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <DataTable :columns="jobColumns" :rows="jobRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'repo'">
          <router-link :to="`/code/${row.repo}`" class="rp-link">{{ row.repoName }}</router-link>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="jobBadge(value)" />
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="20" />
    <CliHint command="bg pipeline status --repo toeslagen" />
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-lead {
  font-size: 1.02rem;
  margin: 0;
}
.rp-cap-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.6rem;
}
.rp-cap-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
}
.rp-cap-link:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-cap-ic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 8px;
  background: var(--semantics-surfaces-tinted-background-color);
  flex: 0 0 auto;
}
.rp-cap-ic nldd-icon {
  width: 1.15rem;
  height: 1.15rem;
  opacity: 0.8;
}
.rp-cap-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1 1 auto;
}
.rp-cap-label {
  font-weight: 600;
}
.rp-cap-where {
  font-size: 0.82rem;
  opacity: 0.65;
}
.rp-cap-arrow {
  width: 0.9rem;
  height: 0.9rem;
  opacity: 0.4;
  flex: 0 0 auto;
}
.rp-pipeline {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 0;
}
.rp-pipe-stage {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.8rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  min-width: 150px;
  flex: 1 1 150px;
}
.rp-pipe-gate {
  border-color: rgba(217, 138, 0, 0.45);
  background: rgba(217, 138, 0, 0.05);
}
.rp-pipe-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-pipe-label {
  font-weight: 700;
  font-size: 0.9rem;
}
.rp-pipe-does {
  font-size: 0.78rem;
  opacity: 0.7;
  line-height: 1.25;
}
.rp-pipe-conn {
  align-self: center;
  width: 18px;
  height: 2px;
  background: var(--semantics-dividers-color);
  flex: 0 0 auto;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
</style>
