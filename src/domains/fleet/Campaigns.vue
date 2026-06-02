<script setup>
// Fleet-shift overview: every fleet-wide change campaign (regex codemod,
// LLM-transformatie, file-creation) in flight across the repo fleet. Modeled
// after RijksICTGilde/stuc and Spotify Fleetshift: one definition, run across
// many repos, track open/merged/failing PRs as a single progress bar over the
// whole fleet. Reads store.campaigns; each row links to its detail screen.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Human-readable label + icon per campaign type.
const TYPE_META = {
  regex: { label: 'Regex-codemod', icon: 'magnifier' },
  llm: { label: 'LLM-transformatie', icon: 'sparkles' },
  'file-creation': { label: 'Bestand toevoegen', icon: 'rectangle-stack' },
};
function typeMeta(type) {
  return TYPE_META[type] || { label: type, icon: 'arrow-up-arrow-down' };
}

function ownerName(id) {
  return store.teamById(id)?.name || id;
}

// Per-campaign totals derived from its progress object + repo count.
function total(c) {
  return c.repos.length;
}
function done(c) {
  return (c.progress?.merged || 0);
}
function segments(c) {
  const p = c.progress || { open: 0, merged: 0, failing: 0 };
  const n = total(c) || 1;
  const pending = Math.max(0, n - p.open - p.merged - p.failing);
  return [
    { key: 'merged', count: p.merged, pct: (p.merged / n) * 100 },
    { key: 'open', count: p.open, pct: (p.open / n) * 100 },
    { key: 'failing', count: p.failing, pct: (p.failing / n) * 100 },
    { key: 'pending', count: pending, pct: (pending / n) * 100 },
  ];
}

// Top-line fleet KPIs across all campaigns.
const kpis = computed(() => {
  const cs = store.campaigns;
  const sum = (f) => cs.reduce((a, c) => a + f(c), 0);
  return {
    active: cs.filter((c) => c.status === 'actief').length,
    repos: sum((c) => c.repos.length),
    merged: sum((c) => c.progress?.merged || 0),
    failing: sum((c) => c.progress?.failing || 0),
  };
});
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Fleet-shift campagnes"
      lede="Eén wijziging, in één keer uitgerold over de hele repo-vloot. Geïnspireerd op stuc en Spotify Fleetshift: definieer een codemod, een LLM-transformatie of een toe te voegen bestand, en volg open, gemergede en falende PR's als één balk over de vloot."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Fleet-shift', href: '/fleet' }]"
    >
      <template #actions>
        <router-link to="/fleet/nieuw">
          <nldd-button variant="primary" text="Nieuwe campagne" start-icon="plus"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="kpis.active" label="Actieve campagnes" icon="ship-wheel" />
      <MetricCard :value="kpis.repos" label="Repos onder bewerking" icon="folder-stack" />
      <MetricCard :value="kpis.merged" label="PR's gemerged" icon="check-mark-circle" />
      <MetricCard :value="kpis.failing" label="Falende CI" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-collection layout="grid" item-width="420px">
      <router-link
        v-for="c in store.campaigns"
        :key="c.id"
        :to="`/fleet/${c.id}`"
        class="rp-camp-link"
      >
        <nldd-card :accessible-label="c.title">
          <nldd-container padding="20">
            <div class="rp-camp-head">
              <span class="rp-camp-type">
                <nldd-icon :name="typeMeta(c.type).icon" aria-hidden="true"></nldd-icon>
                {{ typeMeta(c.type).label }}
              </span>
              <StatusBadge :status="c.status" />
            </div>

            <nldd-spacer size="10" />
            <nldd-title size="5"><h2>{{ c.title }}</h2></nldd-title>

            <nldd-spacer size="8" />
            <p class="rp-camp-meta">
              <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
              {{ ownerName(c.owner) }}
              <span class="rp-dot">·</span>
              <nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon>
              {{ c.repos.length }} {{ c.repos.length === 1 ? 'repo' : 'repos' }}
            </p>

            <nldd-spacer size="14" />

            <!-- Fleet-wide progress bar: merged / open / failing / pending -->
            <div class="rp-bar" role="img" :aria-label="`${done(c)} van ${total(c)} gemerged`">
              <span
                v-for="seg in segments(c)"
                :key="seg.key"
                :class="`rp-seg rp-seg-${seg.key}`"
                :style="{ width: seg.pct + '%' }"
              ></span>
            </div>
            <div class="rp-bar-legend">
              <span class="rp-leg rp-leg-merged">{{ c.progress.merged }} gemerged</span>
              <span class="rp-leg rp-leg-open">{{ c.progress.open }} open</span>
              <span class="rp-leg rp-leg-failing">{{ c.progress.failing }} falend</span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-camp-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-camp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.rp-camp-type {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  opacity: 0.7;
}
.rp-camp-type nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-camp-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  opacity: 0.75;
  margin: 0;
}
.rp-camp-meta nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-dot {
  opacity: 0.5;
  margin: 0 0.15rem;
}
.rp-bar {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 0.7rem;
  border-radius: 999px;
  overflow: hidden;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f4);
  border: 1px solid var(--semantics-dividers-color);
}
.rp-seg {
  height: 100%;
  transition: width 0.4s ease;
}
.rp-seg-merged { background: var(--nldd-color-success, #39870c); }
.rp-seg-open { background: var(--nldd-color-warning, #b85c00); }
.rp-seg-failing { background: var(--nldd-color-critical, #d52b1e); }
.rp-seg-pending { background: transparent; }
.rp-bar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 0.5rem;
  font-size: 0.78rem;
}
.rp-leg {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-leg::before {
  content: '';
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 2px;
}
.rp-leg-merged::before { background: var(--nldd-color-success, #39870c); }
.rp-leg-open::before { background: var(--nldd-color-warning, #b85c00); }
.rp-leg-failing::before { background: var(--nldd-color-critical, #d52b1e); }
</style>
