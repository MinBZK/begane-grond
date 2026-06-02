<script setup>
// RepoList — mock of code.overheid.nl. Shows the public/internal repository
// catalogue from the store, filterable by visibility, with CI status, stars
// and the "open-tenzij" policy badge. Rows link through to RepoDetail.
import { ref, computed, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// 'alle' | 'open' | 'intern'
const filter = ref('alle');
const query = ref('');

// The catalogue holds 100+ repos; render a capped initial page and let the
// user reveal more, so the landing grid stays manageable.
const PAGE = 24;
const limit = ref(PAGE);

const LANG_ICON = {
  Rust: 'gear',
  Vue: 'rectangle-stack',
  Python: 'cylinder-split',
};
const langIcon = (lang) => LANG_ICON[lang] || 'folder-stack';

const repos = computed(() => {
  let list = store.repos;
  if (filter.value !== 'alle') {
    list = list.filter((r) => r.visibility === filter.value);
  }
  const q = query.value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (r) => r.name.toLowerCase().includes(q) || r.lang.toLowerCase().includes(q),
    );
  }
  // Most-starred first — looks like a real code portal landing page.
  return [...list].sort((a, b) => b.stars - a.stars);
});

// Only render the first `limit` repos; "Toon meer" raises the cap.
const visibleRepos = computed(() => repos.value.slice(0, limit.value));
const remaining = computed(() => Math.max(0, repos.value.length - limit.value));

// Reset the cap whenever the result set changes, so a new filter or search
// always starts at the top.
watch([filter, query], () => {
  limit.value = PAGE;
});

const totals = computed(() => {
  const all = store.repos;
  return {
    total: all.length,
    open: all.filter((r) => r.visibility === 'open').length,
    stars: all.reduce((s, r) => s + r.stars, 0),
    redCi: all.filter((r) => r.ci === 'red').length,
  };
});

function appName(repo) {
  const a = store.appById(repo.app);
  return a ? a.name : null;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="code.overheid.nl"
      lede="Het centrale register van rijksbrede repositories. Open waar het kan, intern waar het moet. Standaard open-source onder EUPL-1.2."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Code', href: '/code' }]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="Nieuwe app + repo"
          start-icon="plus"
          @click="$router.push('/apps/nieuw')"
        ></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="totals.total" label="Repositories" icon="folder-stack" />
      <MetricCard :value="totals.open" label="Openbaar" sub="open-tenzij" icon="eye" />
      <MetricCard :value="totals.stars" label="Stars totaal" icon="starburst-filled" />
      <MetricCard
        :value="totals.redCi"
        label="CI rood"
        :sub="totals.redCi ? 'aandacht nodig' : 'alles groen'"
        icon="exclamation-triangle"
      />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-toolbar">
          <nldd-segmented-control>
            <nldd-button
              :variant="filter === 'alle' ? 'primary' : 'secondary'"
              text="Alle"
              @click="filter = 'alle'"
            ></nldd-button>
            <nldd-button
              :variant="filter === 'open' ? 'primary' : 'secondary'"
              text="Openbaar"
              start-icon="eye"
              @click="filter = 'open'"
            ></nldd-button>
            <nldd-button
              :variant="filter === 'intern' ? 'primary' : 'secondary'"
              text="Intern"
              start-icon="lock-closed"
              @click="filter = 'intern'"
            ></nldd-button>
          </nldd-segmented-control>
          <nldd-search-field
            class="rp-search"
            placeholder="Zoek op naam of taal…"
            @input="(e) => (query = e.target.value)"
          ></nldd-search-field>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="340px">
      <router-link
        v-for="repo in visibleRepos"
        :key="repo.id"
        :to="`/code/${repo.id}`"
        class="rp-repo-link"
      >
        <nldd-card :accessible-label="repo.name">
          <nldd-container padding="20">
            <div class="rp-repo-head">
              <nldd-icon :name="langIcon(repo.lang)" aria-hidden="true" class="rp-repo-langicon"></nldd-icon>
              <div class="rp-repo-namewrap">
                <span class="rp-repo-name">{{ repo.name }}</span>
                <span class="rp-repo-lang">{{ repo.lang }}</span>
              </div>
            </div>

            <nldd-spacer size="12" />

            <div class="rp-repo-tags">
              <nldd-tag
                :color="repo.visibility === 'open' ? 'success' : 'neutral'"
                size="md"
              >
                <nldd-icon
                  :name="repo.visibility === 'open' ? 'eye' : 'lock-closed'"
                  aria-hidden="true"
                  class="rp-tag-icon"
                ></nldd-icon>
                {{ repo.visibility === 'open' ? 'Openbaar' : 'Intern' }}
              </nldd-tag>
              <nldd-tag v-if="repo.visibility === 'open'" color="accent" size="md">open-tenzij</nldd-tag>
              <nldd-tag color="accent" size="md">{{ repo.license }}</nldd-tag>
            </div>

            <nldd-spacer size="16" />

            <div class="rp-repo-stats">
              <span class="rp-stat" title="Stars">
                <nldd-icon name="starburst-filled" aria-hidden="true"></nldd-icon>{{ repo.stars }}
              </span>
              <span class="rp-stat" title="Open pull requests">
                <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>{{ repo.openPrs }} PR
              </span>
              <span class="rp-stat" title="Open issues">
                <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>{{ repo.openIssues }} issues
              </span>
            </div>

            <nldd-spacer size="14" />

            <div class="rp-repo-footer">
              <span class="rp-ci">
                <span class="rp-ci-label">CI</span>
                <StatusBadge :status="repo.ci" />
              </span>
              <span v-if="appName(repo)" class="rp-repo-app">
                <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>{{ appName(repo) }}
              </span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>

    <div v-if="remaining" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${remaining})`"
        start-icon="chevron-down"
        @click="limit += PAGE"
      ></nldd-button>
    </div>

    <div v-if="!repos.length" class="rp-empty">
      <nldd-inline-dialog
        title="Geen repositories gevonden"
        supporting-text="Pas het filter of de zoekterm aan."
      ></nldd-inline-dialog>
    </div>

    <nldd-spacer size="24" />

    <CliHint command="bg repo list --visibility open" label="Hetzelfde overzicht via de CLI:" />
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
.rp-search {
  min-width: 240px;
  flex: 1;
}
.rp-repo-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-repo-head {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.rp-repo-langicon {
  width: 1.6rem;
  height: 1.6rem;
  opacity: 0.7;
  flex: none;
}
.rp-repo-namewrap {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.rp-repo-name {
  font-weight: 700;
  font-family: var(--rp-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 0.98rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rp-repo-lang {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-repo-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-tag-icon {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
  vertical-align: -1px;
}
.rp-repo-stats {
  display: flex;
  gap: 1.1rem;
  font-size: 0.85rem;
  opacity: 0.85;
}
.rp-stat {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.rp-stat nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-repo-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--semantics-dividers-color);
}
.rp-ci {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-ci-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-repo-app {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  opacity: 0.75;
}
.rp-repo-app nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-more {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}
.rp-empty {
  margin-top: 1rem;
}
</style>
