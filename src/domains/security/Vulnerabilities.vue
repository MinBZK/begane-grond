<script setup>
// Vulnerability register: every known CVE across the platform, with a severity
// badge, the affected repo/app/team and its remediation status. The list is the
// store's vulnerabilities array; clicking a row opens a detail panel with the
// full cross-layer relations (repo -> app -> team) so you can click straight
// through to fix it. A severity filter and a "verberg opgelost" toggle keep the
// register usable as it grows.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// Severity ordering + presentation. The store ships critical/high; we map the
// full CVSS vocabulary so newly added rows render too.
const SEVERITY = {
  critical: { color: 'critical', label: 'Kritiek', rank: 0, cvss: '9.0–10.0' },
  high: { color: 'critical', label: 'Hoog', rank: 1, cvss: '7.0–8.9' },
  medium: { color: 'warning', label: 'Middel', rank: 2, cvss: '4.0–6.9' },
  low: { color: 'neutral', label: 'Laag', rank: 3, cvss: '0.1–3.9' },
};
const sevMeta = (s) => SEVERITY[s] || { color: 'neutral', label: s, rank: 9, cvss: '—' };

// Enrich each vuln with its resolved relations once.
const enriched = computed(() =>
  store.vulnerabilities.map((v) => {
    const repo = store.repoById(v.repo);
    const app = store.appById(v.app);
    const team = store.teamById(v.team);
    return { ...v, repo_: repo, app_: app, team_: team, sev: sevMeta(v.severity) };
  }),
);

const filter = ref('alle');
const hideResolved = ref(false);

const visible = computed(() =>
  enriched.value
    .filter((v) => (filter.value === 'alle' ? true : v.severity === filter.value))
    .filter((v) => (hideResolved.value ? v.status !== 'opgelost' : true))
    .sort((a, b) => a.sev.rank - b.sev.rank),
);

const openCount = computed(() => store.vulnerabilities.filter((v) => v.status !== 'opgelost').length);
const criticalOpen = computed(() =>
  store.vulnerabilities.filter((v) => v.severity === 'critical' && v.status !== 'opgelost').length,
);
const resolvedCount = computed(() => store.vulnerabilities.filter((v) => v.status === 'opgelost').length);
const total = computed(() => store.vulnerabilities.length);

const columns = [
  { key: 'cve', label: 'CVE', mono: true },
  { key: 'severity', label: 'Severity' },
  { key: 'repo', label: 'Repository' },
  { key: 'app', label: 'Applicatie' },
  { key: 'team', label: 'Team' },
  { key: 'status', label: 'Status' },
  { key: 'actie', label: '', align: 'right' },
];

const selected = ref(null);
function select(v) {
  selected.value = v;
}

// Build the RelationLinks chips for the selected vuln.
const relationLinks = computed(() => {
  if (!selected.value) return [];
  const v = selected.value;
  const links = [];
  if (v.repo_) links.push({ text: v.repo_.name, to: `/code/${v.repo_.id}`, icon: 'folder-stack' });
  if (v.app_) links.push({ text: v.app_.name, to: `/apps/${v.app_.id}`, icon: 'rectangle-stack' });
  if (v.team_) links.push({ text: v.team_.name, to: `/teams/${v.team_.id}`, icon: 'person-2' });
  return links;
});

// NVD link for the CVE — external, opens the canonical advisory.
const nvdUrl = (cve) => `https://nvd.nist.gov/vuln/detail/${cve}`;
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Kwetsbaarheden"
      lede="Centraal register van bekende CVEs over alle repositories en applicaties. Gevoed door dependency- en container-scans. Klik een regel aan om door te klikken naar repo, app en het verantwoordelijke team."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Security', href: '/security' }, { text: 'Kwetsbaarheden', href: '/security/kwetsbaarheden' }]"
    >
      <template #actions>
        <router-link to="/security">
          <nldd-button variant="secondary" text="Scorecards" start-icon="shield-check-mark"></nldd-button>
        </router-link>
        <router-link to="/security/scans">
          <nldd-button variant="secondary" text="Scans & audits" start-icon="magnifier"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="total" label="Bekende kwetsbaarheden" sub="in het register" icon="exclamation-triangle" />
      <MetricCard :value="openCount" label="Open" :sub="openCount ? 'nog te verhelpen' : 'alles verholpen'" icon="eye" />
      <MetricCard :value="criticalOpen" label="Kritiek & open" :sub="criticalOpen ? 'directe actie' : 'geen kritieke open'" icon="shield-check-mark" />
      <MetricCard :value="resolvedCount" label="Opgelost" sub="laatste 90 dagen" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-toolbar">
      <nldd-segmented-control>
        <button type="button" :aria-pressed="filter === 'alle'" :class="{ 'rp-seg-active': filter === 'alle' }" @click="filter = 'alle'">Alle</button>
        <button type="button" :aria-pressed="filter === 'critical'" :class="{ 'rp-seg-active': filter === 'critical' }" @click="filter = 'critical'">Kritiek</button>
        <button type="button" :aria-pressed="filter === 'high'" :class="{ 'rp-seg-active': filter === 'high' }" @click="filter = 'high'">Hoog</button>
        <button type="button" :aria-pressed="filter === 'medium'" :class="{ 'rp-seg-active': filter === 'medium' }" @click="filter = 'medium'">Middel</button>
      </nldd-segmented-control>
      <label class="rp-toggle">
        <input type="checkbox" :checked="hideResolved" @change="hideResolved = $event.target.checked" />
        Verberg opgeloste
      </label>
    </div>

    <nldd-spacer size="16" />

    <DataTable :columns="columns" :rows="visible" row-key="id">
      <template #cell="{ row, col }">
        <template v-if="col.key === 'cve'">
          <button type="button" class="rp-cve-btn" @click="select(row)">{{ row.cve }}</button>
        </template>
        <template v-else-if="col.key === 'severity'">
          <nldd-tag :color="row.sev.color" size="md">{{ row.sev.label }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'repo'">
          <router-link v-if="row.repo_" :to="`/code/${row.repo_.id}`" class="rp-link rp-mono">{{ row.repo_.name }}</router-link>
          <span v-else class="rp-muted">—</span>
        </template>
        <template v-else-if="col.key === 'app'">
          <router-link v-if="row.app_" :to="`/apps/${row.app_.id}`" class="rp-link">{{ row.app_.name }}</router-link>
          <span v-else class="rp-muted">—</span>
        </template>
        <template v-else-if="col.key === 'team'">
          <router-link v-if="row.team_" :to="`/teams/${row.team_.id}`" class="rp-link">{{ row.team_.name }}</router-link>
          <span v-else class="rp-muted">—</span>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="row.status" />
        </template>
        <template v-else-if="col.key === 'actie'">
          <nldd-button variant="secondary" size="sm" text="Details" end-icon="chevron-right" @click="select(row)"></nldd-button>
        </template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <div v-if="selected" class="rp-detail">
      <nldd-card>
        <nldd-container padding="20">
          <div class="rp-detail-head">
            <div>
              <div class="rp-detail-sev">
                <nldd-tag :color="selected.sev.color" size="md">{{ selected.sev.label }}</nldd-tag>
                <span class="rp-cvss">CVSS {{ selected.sev.cvss }}</span>
              </div>
              <nldd-title size="3"><h2 class="rp-detail-cve">{{ selected.cve }}</h2></nldd-title>
            </div>
            <StatusBadge :status="selected.status" />
          </div>

          <nldd-spacer size="12" />

          <nldd-rich-text>
            <p>
              Gevonden in <strong>{{ selected.repo_ ? selected.repo_.name : selected.repo }}</strong>,
              die <strong>{{ selected.app_ ? selected.app_.name : selected.app }}</strong> draait.
              Verantwoordelijk team: <strong>{{ selected.team_ ? selected.team_.name : selected.team }}</strong>.
            </p>
          </nldd-rich-text>

          <nldd-spacer size="16" />

          <div class="rp-detail-meta">
            <div class="rp-meta-cell">
              <span class="rp-meta-key">Maturiteit app</span>
              <span class="rp-meta-val">{{ selected.app_ ? selected.app_.maturity : '—' }}</span>
            </div>
            <div class="rp-meta-cell">
              <span class="rp-meta-key">CI-status repo</span>
              <span class="rp-meta-val">
                <StatusBadge v-if="selected.repo_" :status="selected.repo_.ci" />
                <span v-else>—</span>
              </span>
            </div>
            <div class="rp-meta-cell">
              <span class="rp-meta-key">Open issues repo</span>
              <span class="rp-meta-val">{{ selected.repo_ ? selected.repo_.openIssues : '—' }}</span>
            </div>
            <div class="rp-meta-cell">
              <span class="rp-meta-key">Advisory</span>
              <span class="rp-meta-val">
                <a :href="nvdUrl(selected.cve)" target="_blank" rel="noopener" class="rp-link">
                  NVD <nldd-icon name="link" aria-hidden="true" class="rp-inline-icon"></nldd-icon>
                </a>
              </span>
            </div>
          </div>

          <nldd-spacer size="16" />

          <CliHint :command="`bg vuln show ${selected.cve}`" label="Bekijk de kwetsbaarheid in de CLI:" />
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Doorklikken naar" :links="relationLinks" />
    </div>

    <nldd-inline-dialog
      v-else
      title="Selecteer een kwetsbaarheid"
      supporting-text="Klik op een CVE of op 'Details' om de onderbouwing en de gerelateerde repo, applicatie en team te zien."
    ></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
nldd-segmented-control button {
  font: inherit;
  cursor: pointer;
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-base-background-color);
  color: inherit;
}
nldd-segmented-control button:first-child {
  border-radius: 8px 0 0 8px;
}
nldd-segmented-control button:last-child {
  border-radius: 0 8px 8px 0;
}
nldd-segmented-control button + button {
  border-left: none;
}
.rp-seg-active {
  background: var(--semantics-surfaces-tinted-background-color) !important;
  font-weight: 700;
}
.rp-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  cursor: pointer;
}
.rp-cve-btn {
  font: inherit;
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-weight: 600;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--semantics-action-default-color, currentColor);
  text-decoration: underline;
  text-decoration-style: dotted;
}
.rp-link {
  color: var(--semantics-action-default-color, currentColor);
  text-decoration: none;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-mono {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.85rem;
}
.rp-muted {
  opacity: 0.45;
}
.rp-detail {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  align-items: start;
}
.rp-detail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.rp-detail-sev {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.3rem;
}
.rp-cvss {
  font-size: 0.8rem;
  opacity: 0.65;
}
.rp-detail-cve {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
}
.rp-detail-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem 1.5rem;
}
.rp-meta-cell {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.rp-meta-key {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-meta-val {
  font-weight: 600;
}
.rp-inline-icon {
  width: 0.85rem;
  height: 0.85rem;
  vertical-align: -1px;
}
@media (max-width: 880px) {
  .rp-detail {
    grid-template-columns: 1fr;
  }
}
</style>
