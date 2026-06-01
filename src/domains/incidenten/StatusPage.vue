<script setup>
// Public-style status page: a single operational overview of every service
// (apps + instances) with a green/red indicator. A service is "verstoord" when
// it has an open or mitigated incident, otherwise "operationeel". We derive the
// state purely from the store so it stays in sync with the incident actions.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';

const store = usePlatformStore();

// Map of service-id -> the most severe open incident affecting it.
const SEV_WEIGHT = { sev1: 3, sev2: 2, sev3: 1, sev4: 0 };
const disruptions = computed(() => {
  const map = {};
  for (const inc of store.incidents) {
    if (inc.status === 'resolved' || inc.status === 'opgelost') continue;
    const cur = map[inc.service];
    if (!cur || (SEV_WEIGHT[inc.severity] ?? 0) > (SEV_WEIGHT[cur.severity] ?? 0)) {
      map[inc.service] = inc;
    }
  }
  return map;
});

function stateOf(id) {
  const inc = disruptions.value[id];
  if (!inc) return { label: 'operationeel', tone: 'ok', incident: null };
  const tone = inc.severity === 'sev1' || inc.severity === 'sev2' ? 'down' : 'degraded';
  return { label: tone === 'down' ? 'verstoord' : 'verminderd', tone, incident: inc };
}

// Group the catalogue into "Applicaties" and "Infra-diensten".
const appServices = computed(() =>
  store.apps.map((a) => ({
    id: a.id,
    name: a.name,
    sub: store.teamById(a.team)?.name || a.team,
    route: `/apps/${a.id}`,
    ...stateOf(a.id),
  }))
);
const infraServices = computed(() =>
  store.instances.map((i) => ({
    id: i.id,
    name: i.name,
    sub: `${i.kind} · ${i.env} · ${store.datacenterById(i.dc)?.name || i.dc}`,
    route: `/infra/instances/${i.id}`,
    ...stateOf(i.id),
  }))
);

const all = computed(() => [...appServices.value, ...infraServices.value]);
const downCount = computed(() => all.value.filter((s) => s.tone !== 'ok').length);
const total = computed(() => all.value.length);
const allGood = computed(() => downCount.value === 0);
const okCount = computed(() => total.value - downCount.value);
// Uptime is reported as the share of services without an open disruption. With
// hundreds of services this number is dominated by the operational baseline, so
// we keep more precision to stay meaningful instead of always reading "100%".
const uptime = computed(() => {
  if (!total.value) return '100';
  return ((okCount.value / total.value) * 100).toFixed(2);
});

// A public status page only needs to surface what is actually wrong. With 100+
// apps and 240+ infra services, listing every operational tile makes the page
// unscrollable and buries the real signal. So by default we show only the
// disrupted services, plus an "N operationeel" pill and a button to reveal the
// full catalogue. A search field filters the visible set by name, id or team.
const showAll = ref(false);
const query = ref('');
const LIMIT = 24;
const appLimit = ref(LIMIT);
const infraLimit = ref(LIMIT);

function matches(s) {
  const q = query.value.trim().toLowerCase();
  if (!q) return true;
  return (
    s.name.toLowerCase().includes(q) ||
    s.id.toLowerCase().includes(q) ||
    (s.sub || '').toLowerCase().includes(q)
  );
}

const appFiltered = computed(() =>
  appServices.value.filter((s) => (showAll.value || s.tone !== 'ok') && matches(s)),
);
const infraFiltered = computed(() =>
  infraServices.value.filter((s) => (showAll.value || s.tone !== 'ok') && matches(s)),
);
const visibleApps = computed(() => appFiltered.value.slice(0, appLimit.value));
const visibleInfra = computed(() => infraFiltered.value.slice(0, infraLimit.value));
const appMore = computed(() => Math.max(0, appFiltered.value.length - appLimit.value));
const infraMore = computed(() => Math.max(0, infraFiltered.value.length - infraLimit.value));

function toggleAll() {
  showAll.value = !showAll.value;
  appLimit.value = LIMIT;
  infraLimit.value = LIMIT;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Statuspagina"
      lede="Publiek overzicht van de operationele status van alle Begane Grond-diensten."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Incidenten', href: '/incidenten' },
        { text: 'Status', href: '/incidenten/status' },
      ]"
    >
      <template #actions>
        <router-link to="/incidenten">
          <nldd-button variant="secondary" text="Incidenten" start-icon="exclamation-triangle"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <!-- Big overall banner -->
    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-banner" :class="allGood ? 'rp-banner-ok' : 'rp-banner-down'">
          <div class="rp-banner-icon">
            <nldd-icon :name="allGood ? 'check-mark-circle' : 'exclamation-triangle'" aria-hidden="true"></nldd-icon>
          </div>
          <div>
            <div class="rp-banner-title">
              {{ allGood ? 'Alle systemen operationeel' : `${downCount} van ${total} diensten verstoord` }}
            </div>
            <div class="rp-banner-sub">
              {{ uptime }}% van de diensten operationeel · live status
            </div>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <!-- Controls: search across the catalogue + toggle to reveal operational services. -->
    <div class="rp-controls">
      <nldd-search-field
        class="rp-search"
        placeholder="Zoek op naam, id of team"
        accessible-label="Zoek dienst"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <nldd-tag color="success" size="md">{{ okCount }} operationeel</nldd-tag>
      <nldd-button
        :variant="showAll ? 'primary' : 'secondary'"
        :text="showAll ? 'Toon alleen verstoringen' : 'Toon alle diensten'"
        @click="toggleAll"
      ></nldd-button>
    </div>

    <nldd-spacer size="24" />

    <nldd-title size="4"><h2>Applicaties</h2></nldd-title>
    <nldd-spacer size="12" />
    <p v-if="!appFiltered.length" class="rp-empty">
      {{ query ? `Geen applicaties gevonden voor "${query}".` : 'Alle applicaties operationeel.' }}
    </p>
    <nldd-collection v-else layout="grid" item-width="320px">
      <router-link
        v-for="s in visibleApps"
        :key="s.id"
        :to="s.route"
        class="rp-svc-link"
      >
        <nldd-card>
          <nldd-container padding="16">
            <div class="rp-svc-row">
              <span class="rp-dot" :class="`rp-dot-${s.tone}`"></span>
              <div class="rp-svc-main">
                <div class="rp-svc-name">{{ s.name }}</div>
                <div class="rp-svc-sub">{{ s.sub }}</div>
              </div>
              <nldd-tag :color="s.tone === 'ok' ? 'success' : s.tone === 'down' ? 'critical' : 'warning'" size="md">
                {{ s.label }}
              </nldd-tag>
            </div>
            <div v-if="s.incident" class="rp-svc-inc">
              <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
              {{ s.incident.title }} ({{ s.incident.id }})
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
    <div v-if="appMore > 0" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${appMore})`"
        @click="appLimit += LIMIT"
      ></nldd-button>
    </div>

    <nldd-spacer size="24" />

    <nldd-title size="4"><h2>Infra-diensten</h2></nldd-title>
    <nldd-spacer size="12" />
    <p v-if="!infraFiltered.length" class="rp-empty">
      {{ query ? `Geen infra-diensten gevonden voor "${query}".` : 'Alle infra-diensten operationeel.' }}
    </p>
    <nldd-collection v-else layout="grid" item-width="320px">
      <router-link
        v-for="s in visibleInfra"
        :key="s.id"
        :to="s.route"
        class="rp-svc-link"
      >
        <nldd-card>
          <nldd-container padding="16">
            <div class="rp-svc-row">
              <span class="rp-dot" :class="`rp-dot-${s.tone}`"></span>
              <div class="rp-svc-main">
                <div class="rp-svc-name">{{ s.name }}</div>
                <div class="rp-svc-sub">{{ s.sub }}</div>
              </div>
              <nldd-tag :color="s.tone === 'ok' ? 'success' : s.tone === 'down' ? 'critical' : 'warning'" size="md">
                {{ s.label }}
              </nldd-tag>
            </div>
            <div v-if="s.incident" class="rp-svc-inc">
              <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
              {{ s.incident.title }} ({{ s.incident.id }})
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
    <div v-if="infraMore > 0" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${infraMore})`"
        @click="infraLimit += LIMIT"
      ></nldd-button>
    </div>

    <nldd-spacer size="20" />
    <nldd-rich-text>
      <p class="rp-legend">
        <span class="rp-dot rp-dot-ok"></span> operationeel
        <span class="rp-dot rp-dot-degraded"></span> verminderd
        <span class="rp-dot rp-dot-down"></span> verstoord
      </p>
    </nldd-rich-text>
  </div>
</template>

<style scoped>
.rp-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.rp-banner-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.rp-banner-icon nldd-icon {
  width: 1.6rem;
  height: 1.6rem;
}
.rp-banner-ok .rp-banner-icon {
  background: color-mix(in srgb, #2e7d32 18%, transparent);
  color: #2e7d32;
}
.rp-banner-down .rp-banner-icon {
  background: color-mix(in srgb, #c1121f 18%, transparent);
  color: #c1121f;
}
.rp-banner-title {
  font-size: 1.3rem;
  font-weight: 700;
}
.rp-banner-sub {
  opacity: 0.7;
  font-size: 0.9rem;
  margin-top: 0.15rem;
}
.rp-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-search {
  flex: 1 1 280px;
  min-width: 240px;
}
.rp-empty {
  opacity: 0.65;
  margin: 0;
}
.rp-more {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.rp-svc-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-svc-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-svc-main {
  flex: 1;
  min-width: 0;
}
.rp-svc-name {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-svc-sub {
  font-size: 0.8rem;
  opacity: 0.65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-svc-inc {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: #c1121f;
}
.rp-svc-inc nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-block;
}
.rp-dot-ok {
  background: #2e7d32;
  box-shadow: 0 0 0 3px color-mix(in srgb, #2e7d32 22%, transparent);
}
.rp-dot-degraded {
  background: #e8a200;
  box-shadow: 0 0 0 3px color-mix(in srgb, #e8a200 22%, transparent);
}
.rp-dot-down {
  background: #c1121f;
  box-shadow: 0 0 0 3px color-mix(in srgb, #c1121f 22%, transparent);
}
.rp-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  opacity: 0.75;
}
.rp-legend .rp-dot {
  margin-left: 0.5rem;
}
</style>
