<script setup>
// Audit-log: a filterable, traceable record of every action taken on the
// platform. The store appends to auditLog whenever an action runs anywhere in
// the demo (order infra, rotate a secret, promote a release, advance an RFC),
// so this table grows as you click around. It is filterable by actor and by
// free-text search across actor/action/resource, and by an actor dropdown.
// Where the actor matches a known person we link through to their profile, and
// where a resource matches a known entity we link through to it, which makes
// the person -> team -> app/instance chain reachable straight from the log.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';

const store = usePlatformStore();

const query = ref('');
const actorFilter = ref('all');

// Distinct actors present in the log, for the dropdown.
const actors = computed(() => [...new Set(store.auditLog.map((e) => e.actor))]);

function personName(id) {
  return store.personById(id)?.name || id;
}

// Best-effort: resolve a resource string to a route into another domain. The
// resource is free-text (e.g. "app-paspoort → prod" or an instance name), so we
// probe the known id spaces and fall back to no link.
function resourceRoute(resource) {
  if (!resource) return null;
  const token = String(resource).split(/[\s→]/)[0].trim();
  if (store.appById(token)) return `/apps/${token}`;
  if (store.instanceById(token)) return `/infra/instances/${token}`;
  if (store.instances.find((i) => i.name === token)) {
    return `/infra/instances/${store.instances.find((i) => i.name === token).id}`;
  }
  if (store.repoById(token)) return `/code/${token}`;
  if (token.startsWith('rfc-')) return '/governance/rfcs';
  if (token.startsWith('wp-')) return `/werkplekken/${token}`;
  if (token.startsWith('inc-')) return `/incidenten/${token}`;
  return null;
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.auditLog.filter((e) => {
    if (actorFilter.value !== 'all' && e.actor !== actorFilter.value) return false;
    if (!q) return true;
    return (
      e.actor.toLowerCase().includes(q) ||
      (e.action || '').toLowerCase().includes(q) ||
      (e.resource || '').toLowerCase().includes(q)
    );
  });
});

const columns = [
  { key: 'at', label: 'Tijdstip' },
  { key: 'actor', label: 'Actor' },
  { key: 'action', label: 'Actie' },
  { key: 'resource', label: 'Resource', mono: true },
];

function resetFilters() {
  query.value = '';
  actorFilter.value = 'all';
}

// Icon hint per action family, purely cosmetic to make the log scannable.
function actionIcon(action) {
  const a = (action || '').toLowerCase();
  if (a.includes('secret')) return 'lock-closed';
  if (a.includes('infra') || a.includes('instance')) return 'cloud';
  if (a.includes('release') || a.includes('promo')) return 'arrow-up-arrow-down';
  if (a.includes('rfc')) return 'books-vertical';
  if (a.includes('werkplek')) return 'person';
  if (a.includes('campagne')) return 'sparkles';
  if (a.includes('applicatie') || a.includes('app')) return 'rectangle-stack';
  if (a.includes('incident')) return 'exclamation-triangle';
  if (a.includes('device')) return 'apartment-building';
  return 'eye';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Audit-log"
      lede="Elke handeling op het platform wordt vastgelegd: wie deed wat, op welke resource en wanneer. Het log groeit live mee terwijl je elders in het platform acties uitvoert. Filter op actor of zoek vrij om herleidbaarheid tastbaar te maken."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Governance', href: '/governance' }, { text: 'Audit-log', href: '/governance/audit' }]"
    >
      <template #actions>
        <nldd-button-group orientation="horizontal">
          <router-link to="/governance">
            <nldd-button variant="secondary" text="Beleids-gates" start-icon="shield-check-mark"></nldd-button>
          </router-link>
          <router-link to="/governance/rfcs">
            <nldd-button variant="secondary" text="RFC's" start-icon="books-vertical"></nldd-button>
          </router-link>
        </nldd-button-group>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="store.auditLog.length" label="Gelogde handelingen" sub="sinds sessiestart" icon="eye" />
      <MetricCard :value="actors.length" label="Unieke actoren" sub="met activiteit" icon="person-2" />
      <MetricCard :value="filtered.length" label="In huidige weergave" sub="na filtering" icon="magnifier" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-audit-toolbar">
          <div class="rp-audit-search">
            <nldd-search-field
              :value="query"
              placeholder="Zoek op actor, actie of resource"
              accessible-label="Zoek in audit-log"
              @input="(e) => (query = e.target.value)"
            ></nldd-search-field>
          </div>
          <nldd-form-field label="Actor">
            <nldd-dropdown>
              <select :value="actorFilter" @change="(e) => (actorFilter = e.target.value)">
                <option value="all">Alle actoren</option>
                <option v-for="a in actors" :key="a" :value="a">{{ personName(a) }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-button
            variant="secondary"
            text="Filters wissen"
            start-icon="dismiss"
            @click="resetFilters"
          ></nldd-button>
        </div>

        <nldd-spacer size="16" />

        <DataTable :columns="columns" :rows="filtered" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'actor'">
              <router-link
                v-if="store.personById(row.actor)"
                :to="`/teams/mensen/${row.actor}`"
                class="rp-audit-actor"
              >
                <nldd-icon name="person-circle" aria-hidden="true"></nldd-icon>
                <span>{{ personName(row.actor) }}</span>
              </router-link>
              <span v-else class="rp-audit-actor">
                <nldd-icon name="person-circle" aria-hidden="true"></nldd-icon>
                <span>{{ row.actor }}</span>
              </span>
            </template>

            <template v-else-if="col.key === 'action'">
              <span class="rp-audit-action">
                <nldd-icon :name="actionIcon(row.action)" aria-hidden="true"></nldd-icon>
                <span>{{ row.action }}</span>
              </span>
            </template>

            <template v-else-if="col.key === 'resource'">
              <router-link
                v-if="resourceRoute(row.resource)"
                :to="resourceRoute(row.resource)"
                class="rp-audit-res-link"
              >
                {{ row.resource }}
                <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
              </router-link>
              <span v-else>{{ row.resource }}</span>
            </template>

            <template v-else-if="col.key === 'at'">
              <span class="rp-audit-at">
                <nldd-icon name="clock" aria-hidden="true"></nldd-icon>
                <span>{{ value }}</span>
              </span>
            </template>

            <template v-else>{{ value }}</template>
          </template>
        </DataTable>

        <p v-if="!filtered.length" class="rp-audit-hint">
          Geen handelingen gevonden voor deze filters. Voer elders in het platform een actie uit
          (bv. infra afnemen of een secret roteren) en deze verschijnt hier.
        </p>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-audit-toolbar {
  display: flex;
  align-items: flex-end;
  gap: 0.85rem;
  flex-wrap: wrap;
}
.rp-audit-search {
  flex: 1;
  min-width: 16rem;
}
.rp-audit-actor,
.rp-audit-action,
.rp-audit-at {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-audit-actor {
  text-decoration: none;
  color: inherit;
  font-weight: 600;
}
a.rp-audit-actor:hover {
  text-decoration: underline;
}
.rp-audit-actor nldd-icon,
.rp-audit-action nldd-icon,
.rp-audit-at nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.65;
}
.rp-audit-res-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  color: inherit;
}
.rp-audit-res-link:hover {
  text-decoration: underline;
}
.rp-audit-res-link nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
  opacity: 0.5;
}
.rp-audit-at {
  font-size: 0.85rem;
  opacity: 0.8;
}
.rp-audit-hint {
  margin-top: 1rem;
  font-size: 0.85rem;
  opacity: 0.7;
}
</style>
