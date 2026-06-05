<script setup>
// NeRDS hub: the Nederlandse Richtlijn Digitale Systemen as a charter woven
// through the whole platform. Not a building block you visit, but thirteen
// richtlijnen that each already have a home elsewhere in Begane Grond. This
// page makes that visible: one card per richtlijn, linking both to the domain
// where it lives and to the per-app scorecard, with the fleet adoption % the
// scorecard rolls up. The badges on those domains link back here by anchor.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import { buildNerdsCtx } from './ctx.js';
import { buildNerdsFleet } from './nerds-scorecard.js';

const store = usePlatformStore();

const fleet = computed(() => buildNerdsFleet(buildNerdsCtx(store)));
const avgPassed = computed(() => Math.round(fleet.value.summary.avgPassed * 10) / 10);

// Join each richtlijn definition with its fleet adoption %, so the card can
// show how much of the estate already meets it.
const cards = computed(() =>
  store.richtlijnen.map((r) => {
    const stat = fleet.value.summary.perRichtlijn.find((p) => p.id === r.id);
    return { ...r, pct: stat ? stat.pct : 0 };
  })
);

const relationLinks = [
  { text: 'Standaarden', to: '/standaarden', icon: 'check-mark-circle' },
  { text: 'Beleids-gates', to: '/governance', icon: 'lock-closed' },
  { text: 'Scorecards', to: '/scorecards', icon: 'starburst-filled' },
];

const crumbs = [
  { text: 'Begane Grond', href: '/' },
  { text: 'NeRDS-richtlijnen', href: '/nerds' },
];

function pctColor(pct) {
  if (pct >= 80) return 'var(--rp-ok, #3a7d44)';
  if (pct >= 50) return 'var(--rp-warn, #b8860b)';
  return 'var(--rp-bad, #b3261e)';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="NeRDS — Nederlandse Richtlijn Digitale Systemen"
      lede="Dertien richtlijnen voor verantwoord bouwen van digitale overheidssystemen, van gebruikersbehoeften tot duurzaamheid. NeRDS is geen los bouwblok dat je installeert, maar een rode draad: elke richtlijn heeft al een plek in Begane Grond. Hier zie je ze bij elkaar, met per richtlijn hoeveel van de vloot er al aan voldoet. Op de plek zelf vertelt een badge dat je eraan voldoet."
      :crumbs="crumbs"
    >
      <template #actions>
        <router-link to="/nerds/scorecard">
          <nldd-button variant="secondary" text="NeRDS-scorecard" start-icon="starburst-filled"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <!-- Fleet KPIs -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard
        :value="`${avgPassed}/13`"
        label="Gemiddeld voldaan"
        :sub="`over ${fleet.summary.total} apps`"
        icon="check-mark-circle"
        to="/nerds/scorecard"
      />
      <MetricCard
        :value="fleet.summary.fullyCompliant"
        label="Volledig compliant"
        sub="alle 13 richtlijnen"
        icon="starburst-filled"
        to="/nerds/scorecard"
      />
      <MetricCard value="13" label="Richtlijnen" sub="één charter" icon="check-list" />
      <MetricCard
        :value="`${Math.round(fleet.summary.avgRatio * 100)}%`"
        label="Conformiteit"
        sub="gemiddeld over de vloot"
        icon="shield-check-mark"
      />
    </nldd-container>

    <nldd-spacer size="28" />

    <!-- The thirteen richtlijnen, each linking to where it lives + the scorecard -->
    <nldd-title size="3"><h2>De dertien richtlijnen</h2></nldd-title>
    <nldd-rich-text>
      <p>Elke richtlijn linkt naar het domein waar je eraan werkt en naar de scorecard die laat zien waar je staat. Het percentage is het aandeel van de vloot dat de richtlijn al haalt.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <ul class="rp-pillars">
      <li v-for="r in cards" :key="r.id" :id="r.id" class="rp-pillar">
        <span class="rp-pillar-ic"><nldd-icon :name="r.icon" aria-hidden="true"></nldd-icon></span>
        <div class="rp-pillar-body">
          <p class="rp-pillar-title">{{ r.number }}. {{ r.title }}</p>
          <p class="rp-pillar-text">{{ r.tagline }}</p>
          <div class="rp-pillar-barrow">
            <div class="rp-pillar-bar">
              <span class="rp-pillar-bar-fill" :style="{ width: r.pct + '%', background: pctColor(r.pct) }"></span>
            </div>
            <span class="rp-pillar-pct">{{ r.pct }}%</span>
          </div>
          <div class="rp-pillar-links">
            <router-link :to="r.to" class="rp-pillar-link">
              {{ r.toLabel }}
              <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
            </router-link>
            <router-link to="/nerds/scorecard" class="rp-pillar-link rp-pillar-link-muted">
              Scorecard
              <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
            </router-link>
          </div>
        </div>
      </li>
    </ul>

    <nldd-spacer size="28" />
    <RelationLinks title="Doorklikken" :links="relationLinks" />
    <nldd-spacer size="24" />
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-pillars {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 0.85rem;
}
.rp-pillar {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
  scroll-margin-top: 1.5rem;
}
.rp-pillar:target {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  box-shadow: 0 0 0 2px color-mix(in srgb, #154273 25%, transparent);
}
.rp-pillar-ic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 9px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  flex: 0 0 auto;
}
.rp-pillar-ic nldd-icon { width: 1.2rem; height: 1.2rem; opacity: 0.85; }
.rp-pillar-body { min-width: 0; flex: 1 1 auto; }
.rp-pillar-title { font-weight: 700; margin: 0 0 0.25rem; }
.rp-pillar-text { margin: 0 0 0.6rem; font-size: 0.92rem; line-height: 1.4; opacity: 0.85; }
.rp-pillar-barrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}
.rp-pillar-bar {
  flex: 1;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color, #eceef2);
  overflow: hidden;
}
.rp-pillar-bar-fill { display: block; height: 100%; border-radius: 999px; }
.rp-pillar-pct { font-weight: 700; font-size: 0.82rem; min-width: 2.6rem; text-align: right; }
.rp-pillar-links { display: flex; gap: 1rem; flex-wrap: wrap; }
.rp-pillar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-pillar-link:hover { text-decoration: underline; }
.rp-pillar-link nldd-icon { width: 0.85rem; height: 0.85rem; }
.rp-pillar-link-muted { opacity: 0.65; }
</style>
