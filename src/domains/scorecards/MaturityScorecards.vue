<script setup>
// Maturity scorecards: per app a production-readiness scorecard with a seven
// point checklist (on-call, runbook, SLO, back-ups, security-baseline,
// accessibility, open-source licence) and a brons/zilver/goud grade. Failing
// checks click through to where they get fixed. All derived live from the
// store, so edits elsewhere (rotate a secret, define an SLO) move the score.
import { computed, ref, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import ScorecardCard from './ScorecardCard.vue';
import { buildFleet, tierMeta, TIERS } from './scorecard.js';

const store = usePlatformStore();

// Pure context the scorecard builder reads from. personName resolves on demand
// so the checklist can name the on-call person.
const ctx = computed(() => ({
  apps: store.apps,
  teams: store.teams,
  oncall: store.oncall,
  repos: store.repos,
  slos: store.slos,
  instances: store.instances,
  vulnerabilities: store.vulnerabilities,
  secrets: store.secrets,
  personName: (id) => store.personById(id)?.name || id,
}));

const fleet = computed(() => buildFleet(ctx.value));

// Filter chips: all / per tier. Default shows everything.
const filter = ref('alles');
const filters = computed(() => [
  { key: 'alles', label: 'Alle apps', count: fleet.value.cards.length },
  ...TIERS.slice().reverse().map((t) => ({
    key: t,
    label: tierMeta(t).label,
    count: fleet.value.summary[t],
  })),
]);

// Search + cap. The fleet is large (100+ apps), so rendering every scorecard
// at once makes the screen unmanageably long. We filter on the obvious fields
// (name, id, team) and cap the grid to an initial N, with a "Toon meer"-button.
const query = ref('');
const limit = ref(24);
const PAGE = 24;

const filteredCards = computed(() => {
  const q = query.value.trim().toLowerCase();
  let cards = filter.value === 'alles'
    ? fleet.value.cards
    : fleet.value.cards.filter((c) => c.tier === filter.value);
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

// Reset the cap whenever the result set changes, so a new filter or query
// starts from the top instead of inheriting an expanded limit.
watch([query, filter], () => {
  limit.value = PAGE;
});
function showMore() {
  limit.value += PAGE;
}

const avgPct = computed(() => Math.round(fleet.value.summary.avgRatio * 100));

// Distribution bar segments (goud, zilver, brons), each as a % of the fleet.
const dist = computed(() => {
  const s = fleet.value.summary;
  const tot = s.total || 1;
  return TIERS.slice().reverse().map((t) => ({
    tier: t,
    label: tierMeta(t).label,
    count: s[t],
    pct: Math.round((s[t] / tot) * 100),
  }));
});

const crumbs = [
  { text: 'Begane Grond', href: '/' },
  { text: 'Scorecards', href: '/scorecards' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Productiewaardigheid-scorecards"
      lede="Per applicatie een scorecard tegen de golden-path-eisen. Brons, zilver of goud, met een checklist die doorlinkt naar waar je een ontbrekend punt oplost."
      :crumbs="crumbs"
    />

    <!-- Fleet KPIs -->
    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard
        :value="fleet.summary.goud"
        label="Goud"
        :sub="`van ${fleet.summary.total} apps`"
        icon="starburst-filled"
      />
      <MetricCard
        :value="fleet.summary.zilver"
        label="Zilver"
        :sub="`van ${fleet.summary.total} apps`"
        icon="starburst-filled"
      />
      <MetricCard
        :value="fleet.summary.brons"
        label="Brons"
        :sub="`van ${fleet.summary.total} apps`"
        icon="starburst-filled"
      />
      <MetricCard
        :value="`${avgPct}%`"
        label="Gemiddelde score"
        sub="checks geslaagd over de vloot"
        icon="check-mark-circle"
      />
    </nldd-container>

    <nldd-spacer size="20" />

    <!-- Distribution bar -->
    <nldd-card accessible-label="Verdeling per niveau">
      <nldd-container padding="20">
        <nldd-title size="5"><h2>Verdeling per niveau</h2></nldd-title>
        <nldd-spacer size="12" />
        <div class="sc-dist-bar">
          <div
            v-for="d in dist"
            :key="d.tier"
            class="sc-dist-seg"
            :class="`sc-tier-${d.tier}`"
            :style="{ width: (d.pct || 0) + '%' }"
            :title="`${d.label}: ${d.count}`"
          ></div>
        </div>
        <div class="sc-dist-legend">
          <span v-for="d in dist" :key="d.tier" class="sc-dist-key">
            <span class="sc-dot" :class="`sc-tier-${d.tier}`"></span>
            {{ d.label }} · {{ d.count }}
          </span>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <!-- Search -->
    <nldd-search-field
      placeholder="Zoek op app, id of team"
      accessible-label="Zoek scorecards"
      :value="query"
      @input="(e) => (query = e.target.value)"
    ></nldd-search-field>

    <nldd-spacer size="16" />

    <!-- Filter -->
    <div class="sc-filter">
      <nldd-button
        v-for="f in filters"
        :key="f.key"
        :variant="filter === f.key ? 'primary' : 'secondary'"
        :text="`${f.label} (${f.count})`"
        @click="filter = f.key"
      ></nldd-button>
    </div>

    <nldd-spacer size="16" />

    <!-- Scorecards grid (capped, with a "toon meer"-knop) -->
    <nldd-collection layout="grid" item-width="440px">
      <ScorecardCard v-for="card in visibleCards" :key="card.app.id" :card="card" />
    </nldd-collection>

    <p v-if="!filteredCards.length" class="sc-empty">
      Geen scorecards gevonden voor deze selectie.
    </p>

    <template v-if="moreCount > 0">
      <nldd-spacer size="16" />
      <div class="sc-more">
        <nldd-button
          variant="secondary"
          :text="`Toon meer (nog ${moreCount})`"
          start-icon="chevron-down"
          @click="showMore"
        ></nldd-button>
      </div>
    </template>

    <nldd-spacer size="28" />

    <!-- Legend: what the seven checks mean -->
    <nldd-card accessible-label="Over de checks">
      <nldd-container padding="20">
        <nldd-title size="5"><h2>Hoe een niveau wordt bepaald</h2></nldd-title>
        <nldd-spacer size="8" />
        <nldd-rich-text>
          <p>
            Elke app doorloopt zeven checks tegen het gebaande pad. Het aandeel geslaagde
            checks bepaalt het niveau: vanaf 60% zilver, vanaf 85% goud. De handmatig
            toegekende maturity-grade in de catalogus geldt als bodem en kan een niveau
            alleen verhogen, nooit verlagen. Een rood punt linkt door naar het scherm
            waar je het oplost.
          </p>
        </nldd-rich-text>
        <nldd-spacer size="12" />
        <div class="sc-tier-legend">
          <span v-for="t in dist" :key="t.tier" class="sc-tier-pill" :class="`sc-pill-${t.tier}`">
            <nldd-icon name="starburst-filled" aria-hidden="true"></nldd-icon>
            {{ t.label }}
          </span>
        </div>
        <nldd-spacer size="16" />
        <CliHint
          command="rp scorecard app-toeslagen"
          label="Bekijk een scorecard via de CLI:"
        />
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />
  </div>
</template>

<style scoped>
.sc-dist-bar {
  display: flex;
  height: 16px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--semantics-surfaces-tinted-background-color, #eceef2);
}
.sc-dist-seg {
  height: 100%;
  transition: width 0.4s ease;
}
.sc-tier-brons { background: #a9743b; }
.sc-tier-zilver { background: #8a93a6; }
.sc-tier-goud { background: #c9a227; }
.sc-dist-legend {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}
.sc-dist-key {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.sc-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  display: inline-block;
}
.sc-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.sc-empty {
  opacity: 0.6;
  margin: 1rem 0;
}
.sc-more {
  display: flex;
  justify-content: center;
}
.sc-tier-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.sc-tier-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.82rem;
  border: 1.5px solid;
}
.sc-tier-pill nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.sc-pill-brons { color: #a9743b; border-color: #a9743b; background: rgba(169, 116, 59, 0.1); }
.sc-pill-zilver { color: #8a93a6; border-color: #8a93a6; background: rgba(138, 147, 166, 0.12); }
.sc-pill-goud { color: #c9a227; border-color: #c9a227; background: rgba(201, 162, 39, 0.12); }
</style>
