<script setup>
// The API catalog: every koppelvlak (interface) the Begane Grond offers, with
// version, owning team, ADR (API Design Rules) compliance, rate limit and
// lifecycle status. Each row links through to the owning team and exposes an
// OpenAPI spec panel with a copy-able base URL and an `bg` CLI hint. A search
// field plus a status filter keep the catalog navigable as it grows.
import { ref, computed, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import { evalApiStandaarden } from './api-standaarden.js';

const store = usePlatformStore();

// Verdict → tag styling for the spec panel's standards pills.
const VERDICT_TAG = {
  pass: { color: 'success', icon: 'check-mark-circle' },
  fail: { color: 'critical', icon: 'exclamation-triangle' },
  nvt: { color: 'neutral', icon: 'minus' },
};

const query = ref('');
const statusFilter = ref('');
const selected = ref(null);

// Cap the table at a readable initial page; "Toon meer" raises the cap. With 80+
// koppelvlakken the full catalog is an unmanageably long table otherwise.
const PAGE = 25;
const limit = ref(PAGE);

const statuses = computed(() => [...new Set(store.apis.map((a) => a.status))]);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.apis.filter((a) => {
    if (statusFilter.value && a.status !== statusFilter.value) return false;
    if (!q) return true;
    return (
      a.name.toLowerCase().includes(q) ||
      a.version.toLowerCase().includes(q) ||
      teamName(a.owner).toLowerCase().includes(q)
    );
  });
});

const rows = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));

// Reset the cap whenever the filter set changes, so "Toon meer" always reflects
// the current query rather than a leftover offset.
watch([query, statusFilter], () => {
  limit.value = PAGE;
});

function showMore() {
  limit.value += PAGE;
}

const adrCompliant = computed(() => store.apis.filter((a) => a.adr).length);
const inProd = computed(() => store.apis.filter((a) => a.status === 'productie').length);

const columns = [
  { key: 'name', label: 'API' },
  { key: 'version', label: 'Versie', mono: true },
  { key: 'owner', label: 'Eigenaar-team' },
  { key: 'adr', label: 'ADR' },
  { key: 'rateLimit', label: 'Rate-limit', mono: true, align: 'right' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', align: 'right' },
];

function teamName(id) {
  return store.teamById(id)?.name || id;
}

// Derive a stable slug for the mock OpenAPI/base URL from the API name.
function slug(api) {
  return api.name.toLowerCase().replace('api', '').trim().replace(/\s+/g, '-');
}
function specUrl(api) {
  return `https://api.${slug(api)}.overheid.nl/${api.version}/openapi.json`;
}
function baseUrl(api) {
  return `https://api.${slug(api)}.overheid.nl/${api.version}`;
}

function openSpec(api) {
  selected.value = selected.value?.id === api.id ? null : api;
}

// Cross-layer relations for the selected API: owning team and any apps the team
// owns (the koppelvlak is fronted by one of those apps).
const relatedApps = computed(() => {
  if (!selected.value) return [];
  return store.appsByTeam(selected.value.owner);
});

// The real standards posture of the selected koppelvlak, shared with the
// compliance scorecard via the same evaluator.
const selectedStandaarden = computed(() =>
  selected.value ? evalApiStandaarden(selected.value) : [],
);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="API-catalogus"
      lede="Alle koppelvlakken van het Begane Grond op één plek; een koppelvlak is een API, de termen worden door elkaar gebruikt. Versie, eigenaar, ADR-naleving, rate-limit en status. Klik een API open voor de OpenAPI-specificatie."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Koppelvlakken', href: '/koppelvlakken' },
        { text: 'API-catalogus', href: '/koppelvlakken' },
      ]"
    >
      <template #actions>
        <router-link to="/koppelvlakken/nieuw">
          <nldd-button variant="primary" text="Nieuw koppelvlak" start-icon="add"></nldd-button>
        </router-link>
        <router-link to="/koppelvlakken/compliance">
          <nldd-button variant="secondary" text="API-compliance" start-icon="shield-check-mark"></nldd-button>
        </router-link>
        <router-link to="/koppelvlakken/fsc">
          <nldd-button variant="secondary" text="Digikoppeling / FSC" start-icon="link"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="integratie" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="store.apis.length" label="Koppelvlakken" :sub="`${inProd} in productie`" icon="link" />
      <MetricCard :value="`${adrCompliant}/${store.apis.length}`" label="ADR-compliant" sub="bekijk volledige compliance" icon="shield-check-mark" to="/koppelvlakken/compliance" />
      <MetricCard :value="store.fscPeers.length" label="FSC-peers" sub="via Digikoppeling" icon="ship-wheel" to="/koppelvlakken/fsc" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-filters">
      <nldd-search-field
        :value="query"
        placeholder="Zoek op naam, versie of team"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <nldd-dropdown>
        <select v-model="statusFilter">
          <option value="">Alle statussen</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
        </select>
      </nldd-dropdown>
    </div>

    <nldd-spacer size="16" />

    <p class="rp-result-count">
      {{ filtered.length }} koppelvlakken{{ query || statusFilter ? ' gevonden' : '' }}
    </p>

    <DataTable :columns="columns" :rows="rows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'name'">
          <button class="rp-link rp-link-button" @click="openSpec(row)">{{ value }}</button>
        </template>
        <template v-else-if="col.key === 'owner'">
          <router-link :to="`/teams/${row.owner}`" class="rp-link">{{ teamName(value) }}</router-link>
        </template>
        <template v-else-if="col.key === 'adr'">
          <nldd-tag v-if="value" color="success" size="md">voldoet</nldd-tag>
          <nldd-tag v-else color="warning" size="md">niet getoetst</nldd-tag>
        </template>
        <template v-else-if="col.key === 'rateLimit'">
          <span class="rp-mono">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="value" />
        </template>
        <template v-else-if="col.key === 'actions'">
          <nldd-button
            variant="secondary"
            size="sm"
            text="OpenAPI"
            start-icon="eye"
            @click="openSpec(row)"
          ></nldd-button>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <p v-if="!filtered.length" class="rp-empty">
      Geen koppelvlakken gevonden voor deze zoekopdracht.
    </p>

    <div v-if="moreCount > 0" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="showMore"
      ></nldd-button>
    </div>

    <template v-if="selected">
      <nldd-spacer size="24" />
      <nldd-card :accessible-label="`OpenAPI-specificatie ${selected.name}`">
        <nldd-container padding="20">
          <div class="rp-spec-head">
            <div>
              <nldd-title size="4"><h2>{{ selected.name }} <span class="rp-mono rp-spec-ver">{{ selected.version }}</span></h2></nldd-title>
              <nldd-rich-text>
                <p>Eigenaar: {{ teamName(selected.owner) }} · Rate-limit {{ selected.rateLimit }} · <StatusBadge :status="selected.status" /></p>
              </nldd-rich-text>
            </div>
            <nldd-button variant="secondary" text="Sluiten" start-icon="dismiss" @click="selected = null"></nldd-button>
          </div>

          <nldd-spacer size="16" />

          <div class="rp-spec-grid">
            <div>
              <p class="rp-spec-label">Base-URL</p>
              <nldd-code-viewer language="bash">{{ baseUrl(selected) }}</nldd-code-viewer>
              <nldd-spacer size="12" />
              <p class="rp-spec-label">OpenAPI-document</p>
              <nldd-code-viewer language="bash">{{ specUrl(selected) }}</nldd-code-viewer>
            </div>
            <div>
              <p class="rp-spec-label">Voorbeeld-aanroep</p>
              <nldd-code-viewer language="bash">{{ `curl -H 'Authorization: Bearer $TOKEN' \\\n  ${baseUrl(selected)}/health` }}</nldd-code-viewer>
            </div>
          </div>

          <template v-if="selected.spec">
            <nldd-spacer size="16" />
            <p class="rp-spec-label">
              OpenAPI-specificatie
              <span class="rp-spec-sub">· ontworpen in de wizard, {{ selected.resources?.length || 0 }} resource(s)</span>
            </p>
            <nldd-code-viewer language="yaml" class="rp-spec-yaml">{{ selected.spec }}</nldd-code-viewer>
          </template>

          <nldd-spacer size="16" />

          <p class="rp-spec-label">Overheidsstandaarden</p>
          <div class="rp-spec-meta">
            <div
              v-for="s in selectedStandaarden"
              :key="s.key"
              class="rp-spec-pill"
              :class="`rp-pill-${s.verdict}`"
              :title="s.bron"
            >
              <nldd-icon :name="VERDICT_TAG[s.verdict].icon" aria-hidden="true"></nldd-icon>
              <span>{{ s.label }}<template v-if="s.verdict === 'nvt'"> (n.v.t.)</template></span>
            </div>
          </div>
          <nldd-spacer size="8" />
          <router-link to="/koppelvlakken/compliance" class="rp-link">Bekijk in de compliance-scorecard →</router-link>

          <nldd-spacer size="16" />

          <RelationLinks
            v-if="relatedApps.length"
            title="Gerelateerd"
            :links="[
              { text: teamName(selected.owner), to: `/teams/${selected.owner}`, icon: 'person-2' },
              ...relatedApps.map((a) => ({ text: a.name, to: `/apps/${a.id}`, icon: 'rectangle-stack' })),
              { text: 'Digikoppeling / FSC', to: '/koppelvlakken/fsc', icon: 'link' },
            ]"
          />

          <CliHint :command="`bg api describe ${slug(selected)} --version ${selected.version}`" label="Bekijk dit koppelvlak ook via de CLI:" />
        </nldd-container>
      </nldd-card>
    </template>
  </div>
</template>

<style scoped>
.rp-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}
.rp-filters nldd-search-field {
  flex: 1;
  min-width: 240px;
}
.rp-result-count {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  opacity: 0.6;
}
.rp-empty {
  opacity: 0.6;
  padding: 1rem 0.25rem;
  margin: 0;
}
.rp-more {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-link-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-spec-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-spec-ver {
  opacity: 0.6;
  font-size: 0.9rem;
  font-weight: 500;
}
.rp-spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}
.rp-spec-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin: 0 0 0.4rem;
}
.rp-spec-sub {
  text-transform: none;
  letter-spacing: 0;
  opacity: 0.85;
}
.rp-spec-yaml {
  max-height: 360px;
  overflow: auto;
  display: block;
}
.rp-spec-meta {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-spec-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.85rem;
}
.rp-spec-pill nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.7;
}
.rp-pill-pass {
  border-color: var(--semantics-feedback-success-icon-color);
  color: var(--semantics-feedback-success-icon-color);
}
.rp-pill-fail {
  border-color: var(--semantics-feedback-critical-icon-color);
  color: var(--semantics-feedback-critical-icon-color);
}
.rp-pill-nvt {
  opacity: 0.55;
}
</style>
