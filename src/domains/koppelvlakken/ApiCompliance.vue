<script setup>
// API-compliance scorecard: a matrix of every koppelvlak (rows) against the
// seven government standards (columns). The sibling of governance/Gates.vue,
// fed by the same pure evaluator (api-standaarden.js) that powers the catalogus
// spec panel, so the catalogus and this scorecard can never disagree. Per cell
// a pass / fail / n.v.t. tag; per row a "N van de M voldaan" roll-up. A search
// field plus a "alleen niet-compliant" segment keep it navigable as the catalog
// grows past 60 koppelvlakken.
import { ref, computed, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import { STANDAARDEN, evalApiStandaarden, apiScore } from './api-standaarden.js';

const store = usePlatformStore();

const query = ref('');
const segment = ref('all'); // all | failing | compliant

const PAGE = 25;
const limit = ref(PAGE);

function teamName(id) {
  return store.teamById(id)?.name || id;
}

// Build every scorecard once: row = { api, checks, score }. Pure, derived live.
const cards = computed(() =>
  store.apis.map((api) => ({
    api,
    checks: evalApiStandaarden(api),
    score: apiScore(api),
  })),
);

const summary = computed(() => {
  const all = cards.value;
  const total = all.length;
  const fullyCompliant = all.filter((c) => c.score.compliant).length;
  const withFailing = all.filter((c) => c.score.failing > 0).length;
  const avgRatio = total ? all.reduce((s, c) => s + c.score.ratio, 0) / total : 0;
  return { total, fullyCompliant, withFailing, avgPct: Math.round(avgRatio * 100) };
});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return cards.value.filter((c) => {
    if (segment.value === 'failing' && c.score.failing === 0) return false;
    if (segment.value === 'compliant' && !c.score.compliant) return false;
    if (!q) return true;
    return (
      c.api.name.toLowerCase().includes(q) ||
      c.api.version.toLowerCase().includes(q) ||
      teamName(c.api.owner).toLowerCase().includes(q)
    );
  });
});

const rows = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));

watch([query, segment], () => {
  limit.value = PAGE;
});

function showMore() {
  limit.value += PAGE;
}

const VERDICT_TAG = {
  pass: { color: 'success', text: 'voldoet' },
  fail: { color: 'critical', text: 'open' },
  nvt: { color: 'neutral', text: 'n.v.t.' },
};
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="API-compliance"
      lede="Elk koppelvlak getoetst aan de zeven overheidsstandaarden: API Design Rules, problem+json, OAuth NL GOV, rate-limiting, Logboek Dataverwerkingen, CloudEvents en Digikoppeling / FSC. Niet alles is altijd van toepassing; n.v.t. telt niet als gat."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Koppelvlakken', href: '/koppelvlakken' },
        { text: 'API-compliance', href: '/koppelvlakken/compliance' },
      ]"
    >
      <template #actions>
        <router-link to="/koppelvlakken/nieuw">
          <nldd-button variant="primary" text="Nieuw koppelvlak" start-icon="add"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="open-standaarden" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="`${summary.fullyCompliant}/${summary.total}`" label="Volledig compliant" sub="alle van toepassing zijnde standaarden" icon="shield-check-mark" />
      <MetricCard :value="`${summary.avgPct}%`" label="Gemiddelde naleving" sub="over alle koppelvlakken" icon="chart-multiple" />
      <MetricCard :value="summary.withFailing" label="Met open punten" sub="minstens één standaard niet ingericht" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-filters">
      <nldd-search-field
        :value="query"
        placeholder="Zoek op naam, versie of team"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <nldd-dropdown>
        <select v-model="segment">
          <option value="all">Alle koppelvlakken</option>
          <option value="failing">Alleen met open punten</option>
          <option value="compliant">Alleen volledig compliant</option>
        </select>
      </nldd-dropdown>
    </div>

    <nldd-spacer size="16" />

    <p class="rp-result-count">{{ filtered.length }} koppelvlakken</p>

    <div class="rp-matrix-wrap">
      <table class="rp-matrix">
        <thead>
          <tr>
            <th class="rp-sticky-col">Koppelvlak</th>
            <th v-for="s in STANDAARDEN" :key="s.key" :title="s.bron">{{ s.label }}</th>
            <th class="rp-score-col">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in rows" :key="c.api.id">
            <td class="rp-sticky-col">
              <div class="rp-api-cell">
                <strong>{{ c.api.name }}</strong>
                <span class="rp-api-meta"><span class="rp-mono">{{ c.api.version }}</span> · {{ teamName(c.api.owner) }}</span>
              </div>
            </td>
            <td v-for="check in c.checks" :key="check.key" class="rp-cell" :title="check.why">
              <nldd-tag :color="VERDICT_TAG[check.verdict].color" size="md">{{ VERDICT_TAG[check.verdict].text }}</nldd-tag>
            </td>
            <td class="rp-score-col">
              <nldd-tag :color="c.score.compliant ? 'success' : 'warning'" size="md">
                {{ c.score.passed }}/{{ c.score.total }}
              </nldd-tag>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!filtered.length" class="rp-empty">Geen koppelvlakken gevonden voor deze filter.</p>

    <div v-if="moreCount > 0" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="showMore"
      ></nldd-button>
    </div>
  </div>
</template>

<style scoped>
.rp-filters { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
.rp-filters nldd-search-field { flex: 1; min-width: 240px; }
.rp-result-count { margin: 0 0 0.75rem; font-size: 0.85rem; opacity: 0.6; }
.rp-empty { opacity: 0.6; padding: 1rem 0.25rem; margin: 0; }
.rp-more { display: flex; justify-content: center; margin-top: 1rem; }
.rp-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

.rp-matrix-wrap { overflow-x: auto; border: 1px solid var(--semantics-dividers-color); border-radius: 12px; }
.rp-matrix { border-collapse: collapse; width: 100%; font-size: 0.85rem; }
.rp-matrix th, .rp-matrix td {
  padding: 0.6rem 0.7rem;
  text-align: center;
  border-bottom: 1px solid var(--semantics-dividers-color);
  white-space: nowrap;
}
.rp-matrix thead th {
  position: sticky; top: 0;
  background: var(--semantics-surfaces-tinted-background-color);
  font-size: 0.74rem; text-transform: uppercase; letter-spacing: 0.03em; opacity: 0.75;
}
.rp-sticky-col {
  position: sticky; left: 0;
  background: var(--semantics-surfaces-background-color);
  text-align: left !important;
  z-index: 1;
}
.rp-matrix thead .rp-sticky-col { background: var(--semantics-surfaces-tinted-background-color); z-index: 2; }
.rp-api-cell { display: flex; flex-direction: column; gap: 0.1rem; }
.rp-api-meta { font-size: 0.78rem; opacity: 0.65; }
.rp-cell { vertical-align: middle; }
.rp-score-col { font-weight: 600; }
</style>
