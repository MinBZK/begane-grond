<script setup>
// Software catalog: every app in the store, filterable by team / type /
// maturity and searchable by name or stack. Each row links through to the app
// detail page, which in turn links down to repo, infra and team.
import { ref, computed, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const query = ref('');
const teamFilter = ref('');
const typeFilter = ref('');
const maturityFilter = ref('');

// The catalogue now holds well over a hundred apps, so rendering every card at
// once makes the page unmanageably long. Cap the grid at an initial batch and
// let the user reveal more in steps.
const PAGE_SIZE = 24;
const limit = ref(PAGE_SIZE);

const types = computed(() => [...new Set(store.apps.map((a) => a.type))]);
const maturities = ['goud', 'zilver', 'brons'];

// The health indicator colour + label are delegated to the shared StatusBadge
// so we keep a single colour source instead of a local mapping.
const MATURITY = {
  goud: 'starburst-filled',
  zilver: 'starburst-filled',
  brons: 'starburst-filled',
};

function teamName(id) {
  return store.teamById(id)?.name || id;
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.apps.filter((a) => {
    if (teamFilter.value && a.team !== teamFilter.value) return false;
    if (typeFilter.value && a.type !== typeFilter.value) return false;
    if (maturityFilter.value && a.maturity !== maturityFilter.value) return false;
    if (!q) return true;
    const hay = [a.name, a.type, teamName(a.team), ...(a.stack || [])].join(' ').toLowerCase();
    return hay.includes(q);
  });
});

// Only the capped slice is actually rendered; the rest stays behind "Toon meer".
const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));

// Any change to the active filters resets the cap so a fresh result set starts
// from the top instead of inheriting a previously expanded limit.
watch([query, teamFilter, typeFilter, maturityFilter], () => {
  limit.value = PAGE_SIZE;
});

function showMore() {
  limit.value += PAGE_SIZE;
}

const total = computed(() => store.apps.length);
const goldCount = computed(() => store.apps.filter((a) => a.maturity === 'goud').length);
const warnCount = computed(() => store.apps.filter((a) => a.health !== 'ok').length);

function reset() {
  query.value = '';
  teamFilter.value = '';
  typeFilter.value = '';
  maturityFilter.value = '';
  limit.value = PAGE_SIZE;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Software-catalogus"
      lede="Alle applicaties van het Begane Grond op één plek. Elke applicatie hangt aan een team, een repository en de infra waarop hij draait."
      :crumbs="[{ text: 'Home', href: '/' }, { text: 'Applicaties', href: '/apps' }]"
    >
      <template #actions>
        <router-link to="/apps/templates">
          <nldd-button variant="secondary" text="Golden paths" start-icon="books-vertical"></nldd-button>
        </router-link>
        <router-link to="/apps/nieuw">
          <nldd-button variant="primary" text="Nieuwe applicatie" start-icon="plus"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="total" label="Applicaties" sub="in de catalogus" icon="rectangle-stack" />
      <MetricCard :value="goldCount" label="Goud" sub="volwassen golden path" icon="starburst-filled" />
      <MetricCard :value="warnCount" label="Aandacht" sub="health niet groen" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-filters">
          <nldd-form-field label="Zoeken" class="rp-grow">
            <nldd-search-field
              placeholder="Naam, team of stack…"
              :value="query"
              @input="(e) => (query = e.target.value)"
            ></nldd-search-field>
          </nldd-form-field>
          <nldd-form-field label="Team">
            <nldd-dropdown>
              <select :value="teamFilter" @change="(e) => (teamFilter = e.target.value)">
                <option value="">Alle teams</option>
                <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-form-field label="Type">
            <nldd-dropdown>
              <select :value="typeFilter" @change="(e) => (typeFilter = e.target.value)">
                <option value="">Alle types</option>
                <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-form-field label="Maturity">
            <nldd-dropdown>
              <select :value="maturityFilter" @change="(e) => (maturityFilter = e.target.value)">
                <option value="">Alle</option>
                <option v-for="m in maturities" :key="m" :value="m">{{ m }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
        </div>
        <div class="rp-filter-meta">
          <span>{{ filtered.length }} van {{ total }} applicaties</span>
          <nldd-button variant="secondary" text="Filters wissen" start-icon="dismiss" size="sm" @click="reset"></nldd-button>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="20" />

    <nldd-collection layout="grid" item-width="340px">
      <router-link
        v-for="app in visible"
        :key="app.id"
        :to="`/apps/${app.id}`"
        class="rp-app-link"
      >
        <nldd-card :accessible-label="app.name">
          <nldd-container padding="20">
            <div class="rp-app-top">
              <div class="rp-app-icon">
                <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
              </div>
              <div class="rp-app-headtext">
                <nldd-title size="5"><h3>{{ app.name }}</h3></nldd-title>
                <span class="rp-app-team">{{ teamName(app.team) }}</span>
              </div>
              <StatusBadge :status="app.health" size="md" />
            </div>

            <nldd-spacer size="12" />

            <div class="rp-app-stack">
              <nldd-tag color="neutral" size="md">{{ app.type }}</nldd-tag>
              <nldd-tag v-for="s in app.stack" :key="s" color="accent" size="md">{{ s }}</nldd-tag>
            </div>

            <nldd-spacer size="12" />

            <div class="rp-app-foot">
              <span class="rp-app-maturity">
                <nldd-icon :name="MATURITY[app.maturity] || 'starburst-filled'" aria-hidden="true" :class="`rp-mat-${app.maturity}`"></nldd-icon>
                {{ app.maturity }}
              </span>
              <span class="rp-app-open">
                Open <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
              </span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>

    <div v-if="moreCount" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="showMore"
      ></nldd-button>
    </div>

    <nldd-card v-if="!filtered.length">
      <nldd-container padding="24">
        <nldd-rich-text><p>Geen applicaties gevonden voor deze filters.</p></nldd-rich-text>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
}
.rp-grow { flex: 1 1 240px; }
.rp-filter-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.85rem;
  font-size: 0.85rem;
  opacity: 0.8;
}
.rp-more { display: flex; justify-content: center; margin-top: 1.25rem; }
.rp-app-link { text-decoration: none; color: inherit; display: block; }
.rp-app-top {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.rp-app-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color);
  flex: none;
}
.rp-app-icon nldd-icon { width: 1.3rem; height: 1.3rem; }
.rp-app-headtext { flex: 1 1 auto; min-width: 0; }
.rp-app-team { font-size: 0.82rem; opacity: 0.7; }
.rp-app-stack { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.rp-app-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.85rem;
}
.rp-app-maturity { display: inline-flex; align-items: center; gap: 0.35rem; text-transform: capitalize; }
.rp-app-maturity nldd-icon { width: 1rem; height: 1rem; }
.rp-mat-goud { color: #c8a200; }
.rp-mat-zilver { color: #8a8f99; }
.rp-mat-brons { color: #a06a3c; }
.rp-app-open { display: inline-flex; align-items: center; gap: 0.3rem; font-weight: 600; opacity: 0.75; }
.rp-app-open nldd-icon { width: 0.9rem; height: 0.9rem; }
</style>
