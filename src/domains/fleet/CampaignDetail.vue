<script setup>
// One fleet-shift campaign in detail. Shows the fleet-wide progress bar plus a
// per-repo status table (diff preview, PR link, CI status, merge status). A
// deterministic mock fans the campaign's progress counts (open/merged/failing)
// out over its repos so the table matches the bar. RelationLinks lets the user
// click through to the repos, their apps and the owning team.
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const store = usePlatformStore();

const campaign = computed(() => store.campaigns.find((c) => c.id === route.params.id));

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

// Fan the aggregate progress counts out over the repos, in order, so each repo
// gets a concrete state and the table is consistent with the progress bar.
const rows = computed(() => {
  const c = campaign.value;
  if (!c) return [];
  const p = c.progress || { open: 0, merged: 0, failing: 0 };
  const states = [
    ...Array(p.merged).fill('merged'),
    ...Array(p.failing).fill('failing'),
    ...Array(p.open).fill('open'),
  ];
  return c.repos.map((repoId, i) => {
    const repo = store.repoById(repoId);
    const state = states[i] || 'pending';
    const prNumber = 1400 + (i * 7) + (c.repos.length % 5);
    return {
      id: repoId,
      repo,
      name: repo?.name || repoId,
      app: repo?.app || null,
      pr: state === 'pending' ? null : `#${prNumber}`,
      prState: state, // open | merged | failing | pending
      ci: state === 'failing' ? 'red' : state === 'pending' ? '—' : 'green',
      merge: state === 'merged' ? 'gemerged' : state === 'pending' ? 'nog niet geopend' : 'open',
    };
  });
});

const counts = computed(() => {
  const c = campaign.value;
  const p = c?.progress || { open: 0, merged: 0, failing: 0 };
  const n = c?.repos.length || 0;
  const pending = Math.max(0, n - p.open - p.merged - p.failing);
  return { ...p, pending, total: n };
});

const segments = computed(() => {
  const n = counts.value.total || 1;
  return [
    { key: 'merged', pct: (counts.value.merged / n) * 100 },
    { key: 'open', pct: (counts.value.open / n) * 100 },
    { key: 'failing', pct: (counts.value.failing / n) * 100 },
    { key: 'pending', pct: (counts.value.pending / n) * 100 },
  ];
});

const columns = [
  { key: 'name', label: 'Repo', mono: true },
  { key: 'diff', label: 'Diff' },
  { key: 'pr', label: 'PR', mono: true },
  { key: 'ci', label: 'CI', align: 'center' },
  { key: 'merge', label: 'Merge' },
];

// Cross-layer relations: repos, their apps, and the owning team.
const relationLinks = computed(() => {
  const c = campaign.value;
  if (!c) return [];
  const links = [];
  for (const repoId of c.repos) {
    const repo = store.repoById(repoId);
    if (repo) links.push({ text: repo.name, to: `/code/${repo.id}`, icon: 'folder-stack' });
    if (repo?.app) {
      const app = store.appById(repo.app);
      if (app) links.push({ text: app.name, to: `/apps/${app.id}`, icon: 'rectangle-stack' });
    }
  }
  links.push({ text: ownerName(c.owner), to: `/teams/${c.owner}`, icon: 'person-2' });
  return links;
});

const PR_STATE = { merged: 'merged', open: 'open', failing: 'failing', pending: 'concept' };

const cliCommand = computed(() => {
  const c = campaign.value;
  if (!c) return '';
  return `bg fleet campaign status ${c.id}`;
});
</script>

<template>
  <div v-if="campaign" class="rp-page">
    <PageHeader
      :title="campaign.title"
      :lede="`${typeMeta(campaign.type).label} · uitgerold over ${campaign.repos.length} repos`"
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Fleet-shift', href: '/fleet' },
        { text: campaign.title, href: `/fleet/${campaign.id}` },
      ]"
    >
      <template #actions>
        <StatusBadge :status="campaign.status" />
        <router-link to="/fleet/nieuw">
          <nldd-button variant="secondary" text="Nieuwe campagne" start-icon="plus"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="counts.merged" label="Gemerged" icon="check-mark-circle" />
      <MetricCard :value="counts.open" label="Open PR's" icon="arrow-up-arrow-down" />
      <MetricCard :value="counts.failing" label="Falende CI" icon="exclamation-triangle" />
      <MetricCard :value="counts.total" label="Repos in de vloot" icon="folder-stack" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Fleet-wide progress bar -->
    <nldd-card accessible-label="Voortgang over de vloot">
      <nldd-container padding="20">
        <div class="rp-progress-head">
          <nldd-title size="5"><h2>Voortgang over de vloot</h2></nldd-title>
          <span class="rp-progress-pct">{{ counts.merged }} / {{ counts.total }} gemerged</span>
        </div>
        <nldd-spacer size="12" />
        <div class="rp-bar" role="img" :aria-label="`${counts.merged} van ${counts.total} gemerged`">
          <span
            v-for="seg in segments"
            :key="seg.key"
            :class="`rp-seg rp-seg-${seg.key}`"
            :style="{ width: seg.pct + '%' }"
          ></span>
        </div>
        <div class="rp-bar-legend">
          <span class="rp-leg rp-leg-merged">{{ counts.merged }} gemerged</span>
          <span class="rp-leg rp-leg-open">{{ counts.open }} open</span>
          <span class="rp-leg rp-leg-failing">{{ counts.failing }} falend</span>
          <span class="rp-leg rp-leg-pending">{{ counts.pending }} in wachtrij</span>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" gap="24">
      <div class="rp-col-main">
        <nldd-title size="5"><h2>Status per repo</h2></nldd-title>
        <nldd-spacer size="12" />
        <DataTable :columns="columns" :rows="rows" row-key="id">
          <template #cell="{ row, col }">
            <template v-if="col.key === 'name'">
              <router-link v-if="row.repo" :to="`/code/${row.repo.id}`" class="rp-cell-link">{{ row.name }}</router-link>
              <span v-else>{{ row.name }}</span>
            </template>
            <template v-else-if="col.key === 'diff'">
              <nldd-tag color="accent" size="md">1 bestand gewijzigd</nldd-tag>
            </template>
            <template v-else-if="col.key === 'pr'">
              <a v-if="row.pr" class="rp-cell-link" :href="`https://code.overheid.nl/${row.name}/pull/${row.pr.slice(1)}`" target="_blank" rel="noopener">{{ row.pr }}</a>
              <span v-else class="rp-dim">—</span>
            </template>
            <template v-else-if="col.key === 'ci'">
              <span v-if="row.ci === '—'" class="rp-dim">—</span>
              <StatusBadge v-else :status="row.ci" size="sm" />
            </template>
            <template v-else-if="col.key === 'merge'">
              <StatusBadge :status="PR_STATE[row.prState]" size="sm" />
              <span class="rp-merge-text"> {{ row.merge }}</span>
            </template>
          </template>
        </DataTable>

        <nldd-spacer size="16" />
        <CliHint :command="cliCommand" label="Volg deze campagne via de CLI:" />
      </div>

      <div class="rp-col-side">
        <RelationLinks title="Gerelateerd" :links="relationLinks" />

        <nldd-spacer size="16" />
        <nldd-card accessible-label="Definitie">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Definitie</h3></nldd-title>
            <nldd-spacer size="10" />
            <dl class="rp-def">
              <div><dt>Type</dt><dd>{{ typeMeta(campaign.type).label }}</dd></div>
              <div><dt>Eigenaar</dt><dd>{{ ownerName(campaign.owner) }}</dd></div>
              <div><dt>Status</dt><dd><StatusBadge :status="campaign.status" size="sm" /></dd></div>
            </dl>
          </nldd-container>
        </nldd-card>
      </div>
    </nldd-container>
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Campagne niet gevonden" :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Fleet-shift', href: '/fleet' }]" />
    <nldd-inline-dialog title="Onbekende campagne" supporting-text="Deze campagne bestaat niet (meer)."></nldd-inline-dialog>
    <nldd-spacer size="16" />
    <router-link to="/fleet">
      <nldd-button variant="primary" text="Terug naar campagnes" start-icon="arrow-right"></nldd-button>
    </router-link>
  </div>
</template>

<style scoped>
.rp-progress-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-progress-pct {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rp-bar {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 0.85rem;
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
  margin-top: 0.55rem;
  font-size: 0.8rem;
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
  border: 1px solid var(--semantics-dividers-color);
}
.rp-leg-merged::before { background: var(--nldd-color-success, #39870c); }
.rp-leg-open::before { background: var(--nldd-color-warning, #b85c00); }
.rp-leg-failing::before { background: var(--nldd-color-critical, #d52b1e); }
.rp-leg-pending::before { background: transparent; }
/* DataTable lives in a 2-of-3 column span; widen the main column. */
.rp-col-main { grid-column: span 2; }
.rp-cell-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-cell-link:hover { text-decoration: underline; }
.rp-dim { opacity: 0.5; }
.rp-merge-text { font-size: 0.82rem; opacity: 0.7; }
.rp-def {
  display: grid;
  gap: 0.1rem;
  margin: 0;
}
.rp-def > div {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 0.75rem;
  padding: 0.45rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
  align-items: center;
}
.rp-def > div:last-child { border-bottom: none; }
.rp-def dt { font-weight: 600; opacity: 0.7; }
.rp-def dd { margin: 0; }
</style>
