<script setup>
// NeRDS-scorecard per app: against the thirteen richtlijnen, how many does each
// application meet? The verdicts are not a separate truth: they delegate to the
// existing gates and production-readiness checks where those map, and to small
// derived rules over existing seed relations otherwise. So this screen agrees
// with /governance (gates), /scorecards (checks) and /standaarden by
// construction. The aggregate is an honest "N van de 13", not a metal tier.
import { computed, ref, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import NerdsScorecardCard from './NerdsScorecardCard.vue';
import { buildNerdsCtx } from './ctx.js';
import { buildNerdsFleet } from './nerds-scorecard.js';

const store = usePlatformStore();

const fleet = computed(() => buildNerdsFleet(buildNerdsCtx(store)));
const avgPassed = computed(() => Math.round(fleet.value.summary.avgPassed * 10) / 10);
const avgPct = computed(() => Math.round(fleet.value.summary.avgRatio * 100));

// Filter chips by compliance band: fully (13/13), partial, or behind.
const filter = ref('alles');
const bands = computed(() => {
  const cards = fleet.value.cards;
  return {
    volledig: cards.filter((c) => c.passed === 13).length,
    deels: cards.filter((c) => c.passed >= 8 && c.passed < 13).length,
    achter: cards.filter((c) => c.passed < 8).length,
  };
});
const filters = computed(() => [
  { key: 'alles', label: 'Alle apps', count: fleet.value.cards.length },
  { key: 'volledig', label: 'Voldoet volledig', count: bands.value.volledig },
  { key: 'deels', label: 'Deels', count: bands.value.deels },
  { key: 'achter', label: 'Nog niet', count: bands.value.achter },
]);

function inBand(card, band) {
  if (band === 'volledig') return card.passed === 13;
  if (band === 'deels') return card.passed >= 8 && card.passed < 13;
  if (band === 'achter') return card.passed < 8;
  return true;
}

const query = ref('');
const limit = ref(24);
const PAGE = 24;

const filteredCards = computed(() => {
  const q = query.value.trim().toLowerCase();
  let cards = fleet.value.cards.filter((c) => inBand(c, filter.value));
  if (q) {
    cards = cards.filter((c) => {
      const team = store.teamById(c.app.team)?.name || '';
      return (
        c.app.name.toLowerCase().includes(q) ||
        c.app.id.toLowerCase().includes(q) ||
        team.toLowerCase().includes(q)
      );
    });
  }
  return cards;
});

const visibleCards = computed(() => filteredCards.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filteredCards.value.length - limit.value));

watch([query, filter], () => {
  limit.value = PAGE;
});
function showMore() {
  limit.value += PAGE;
}

// Distribution bar: volledig / deels / nog niet as a share of the fleet.
const dist = computed(() => {
  const tot = fleet.value.cards.length || 1;
  const b = bands.value;
  return [
    { key: 'volledig', label: 'Voldoet volledig', count: b.volledig, pct: Math.round((b.volledig / tot) * 100) },
    { key: 'deels', label: 'Deels', count: b.deels, pct: Math.round((b.deels / tot) * 100) },
    { key: 'achter', label: 'Nog niet', count: b.achter, pct: Math.round((b.achter / tot) * 100) },
  ];
});

const crumbs = [
  { text: 'Begane Grond', href: '/' },
  { text: 'NeRDS-richtlijnen', href: '/nerds' },
  { text: 'Scorecard', href: '/nerds/scorecard' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="NeRDS-scorecard per app"
      lede="Per applicatie: hoeveel van de dertien NeRDS-richtlijnen worden gehaald? De oordelen komen uit de bestaande gates, scorecards en standaarden, dus dit scherm klopt met governance en security by design. Een open richtlijn linkt door naar de plek waar je het oplost."
      :crumbs="crumbs"
    >
      <template #actions>
        <router-link to="/nerds">
          <nldd-button variant="secondary" text="Richtlijnen-overzicht" start-icon="check-list"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <!-- Fleet KPIs -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="`${avgPassed}/13`" label="Gemiddeld voldaan" :sub="`over ${fleet.summary.total} apps`" icon="check-mark-circle" />
      <MetricCard :value="fleet.summary.fullyCompliant" label="Volledig compliant" sub="alle 13 richtlijnen" icon="starburst-filled" />
      <MetricCard :value="bands.achter" label="Nog niet op orde" sub="minder dan 8/13" icon="exclamation-triangle" />
      <MetricCard :value="`${avgPct}%`" label="Conformiteit" sub="gemiddeld over de vloot" icon="shield-check-mark" />
    </nldd-container>

    <nldd-spacer size="20" />

    <!-- Distribution bar -->
    <nldd-card accessible-label="Verdeling van naleving">
      <nldd-container padding="20">
        <nldd-title size="5"><h2>Verdeling van naleving</h2></nldd-title>
        <nldd-spacer size="12" />
        <div class="nf-dist-bar">
          <div
            v-for="d in dist"
            :key="d.key"
            class="nf-dist-seg"
            :class="`nf-band-${d.key}`"
            :style="{ width: (d.pct || 0) + '%' }"
            :title="`${d.label}: ${d.count}`"
          ></div>
        </div>
        <div class="nf-dist-legend">
          <span v-for="d in dist" :key="d.key" class="nf-dist-key">
            <span class="nf-dot" :class="`nf-band-${d.key}`"></span>
            {{ d.label }} · {{ d.count }}
          </span>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <nldd-search-field
      placeholder="Zoek op app, id of team"
      accessible-label="Zoek NeRDS-scorecards"
      :value="query"
      @input="(e) => (query = e.target.value)"
    ></nldd-search-field>

    <nldd-spacer size="16" />

    <div class="nf-filter">
      <nldd-button
        v-for="f in filters"
        :key="f.key"
        :variant="filter === f.key ? 'primary' : 'secondary'"
        :text="`${f.label} (${f.count})`"
        @click="filter = f.key"
      ></nldd-button>
    </div>

    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="440px">
      <NerdsScorecardCard v-for="card in visibleCards" :key="card.app.id" :card="card" />
    </nldd-collection>

    <p v-if="!filteredCards.length" class="nf-empty">
      Geen scorecards gevonden voor deze selectie.
    </p>

    <template v-if="moreCount > 0">
      <nldd-spacer size="16" />
      <div class="nf-more">
        <nldd-button
          variant="secondary"
          :text="`Toon meer (nog ${moreCount})`"
          start-icon="chevron-down"
          @click="showMore"
        ></nldd-button>
      </div>
    </template>

    <nldd-spacer size="28" />

    <nldd-card accessible-label="Over de NeRDS-scorecard">
      <nldd-container padding="20">
        <nldd-title size="5"><h2>Hoe de score tot stand komt</h2></nldd-title>
        <nldd-spacer size="8" />
        <nldd-rich-text>
          <p>
            Elke app wordt getoetst aan de dertien NeRDS-richtlijnen. Waar een richtlijn
            samenvalt met een bestaande beleids-gate of productiewaardigheid-check (veiligheid,
            toegankelijkheid, open source), erft de scorecard exact dat oordeel. De overige
            richtlijnen volgen uit de platformdata zelf: een getekend datacontract, een
            geregistreerd algoritme met toetsen, inkoop zonder lock-in. Niet van toepassing telt
            niet als gezakt. Een rood punt linkt door naar het scherm waar je het oplost.
          </p>
        </nldd-rich-text>
        <nldd-spacer size="12" />
        <CliHint command="bg nerds scorecard app-toeslagen" label="Bekijk een NeRDS-scorecard via de CLI:" />
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />
  </div>
</template>

<style scoped>
.nf-dist-bar {
  display: flex;
  height: 16px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--semantics-surfaces-tinted-background-color);
}
.nf-dist-seg { height: 100%; transition: width 0.4s ease; }
.nf-band-volledig { background: #1a8a4a; }
.nf-band-deels { background: #b8860b; }
.nf-band-achter { background: #b3261e; }
.nf-dist-legend {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}
.nf-dist-key { display: inline-flex; align-items: center; gap: 0.4rem; }
.nf-dot { width: 0.7rem; height: 0.7rem; border-radius: 50%; display: inline-block; }
.nf-filter { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.nf-empty { opacity: 0.6; margin: 1rem 0; }
.nf-more { display: flex; justify-content: center; }
</style>
