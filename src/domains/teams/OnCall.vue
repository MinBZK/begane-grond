<script setup>
// Platform-wide on-call board: who holds the pager per team, the escalation
// path behind them, and the recent incidents they would pick up. Reads
// store.oncall and joins it to people, teams and incidents.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

// Cap the incidents shown per card so a busy team does not stretch the card
// into a wall of links. The full list stays one click away on the team page.
const INCIDENTS_PER_CARD = 4;

const board = computed(() =>
  store.oncall.map((o) => {
    const team = store.teamById(o.team);
    const person = store.personById(o.person);
    return {
      ...o,
      team,
      person,
      escalation: o.escalation.map((e) => store.personById(e)).filter(Boolean),
      incidents: store.incidentsByTeam(o.team),
    };
  }),
);

const openIncidents = computed(() =>
  store.incidents.filter((i) => i.status !== 'resolved' && i.status !== 'opgelost'),
);

const totals = computed(() => ({
  shifts: store.oncall.length,
  open: openIncidents.value.length,
  escalations: store.oncall.reduce((n, o) => n + o.escalation.length, 0),
}));

// Search + filter + cap. The board now spans the whole platform (one shift per
// team), so we filter on team/person and let the user narrow to the diensten
// that actually have lopende incidenten. The grid is capped at an initial N
// with a "Toon meer" button so it never renders the full wall at once.
const query = ref('');
const onlyIncidents = ref(false);
const limit = ref(24);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return board.value.filter((b) => {
    if (onlyIncidents.value && !b.incidents.length) return false;
    if (!q) return true;
    return (
      (b.team?.name || '').toLowerCase().includes(q) ||
      (b.person?.name || '').toLowerCase().includes(q) ||
      (b.person?.role || '').toLowerCase().includes(q) ||
      b.escalation.some((e) => (e.name || '').toLowerCase().includes(q))
    );
  });
});

const visible = computed(() => filtered.value.slice(0, limit.value));
const remaining = computed(() => Math.max(0, filtered.value.length - visible.value.length));

function showMore() {
  limit.value += 24;
}

function hueFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="On-call"
      lede="Platform-breed piket. Wie draagt de pieper per team, wie staat erachter en welke incidenten lopen."
      :crumbs="[{ text: 'Rijksplatform', href: '/' }, { text: 'Teams & mensen', href: '/teams' }, { text: 'On-call', href: '/teams/on-call' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Teams" start-icon="person-2" @click="$router.push('/teams')" />
        <nldd-button variant="primary" text="Incidenten" start-icon="exclamation-triangle" @click="$router.push('/incidenten')" />
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="totals.shifts" label="Actieve piketdiensten" icon="clock" />
      <MetricCard :value="totals.open" label="Lopende incidenten" sub="niet opgelost" icon="exclamation-triangle" />
      <MetricCard :value="totals.escalations" label="Escalatiepaden" icon="arrow-up-arrow-down" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Search + filter over the platform-wide piketboard, with a capped grid. -->
    <div class="rp-oc-toolbar">
      <nldd-search-field
        class="rp-oc-search"
        placeholder="Zoek op team, piketdrager of rol"
        accessible-label="Zoek piketdienst"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <nldd-button
        :variant="onlyIncidents ? 'primary' : 'secondary'"
        :text="onlyIncidents ? 'Alleen met incidenten' : 'Alle diensten'"
        start-icon="exclamation-triangle"
        @click="onlyIncidents = !onlyIncidents"
      />
    </div>

    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="380px">
      <nldd-card v-for="b in visible" :key="b.team.id" :accessible-label="`Piket ${b.team.name}`">
        <nldd-container padding="20">
          <div class="rp-oc-head">
            <router-link :to="`/teams/${b.team.id}`" class="rp-link">
              <nldd-title size="5"><h3>{{ b.team.name }}</h3></nldd-title>
            </router-link>
            <span class="rp-oc-live"><span class="rp-oncall-dot" aria-hidden="true"></span>live</span>
          </div>

          <nldd-spacer size="12" />

          <!-- Current pager holder -->
          <div class="rp-oc-current" v-if="b.person">
            <span
              class="rp-oc-avatar"
              :style="{ background: `hsl(${hueFor(b.person.id)} 55% 88%)`, color: `hsl(${hueFor(b.person.id)} 55% 28%)` }"
            >{{ b.person.avatar }}</span>
            <div class="rp-oc-id">
              <router-link :to="`/teams/mensen/${b.person.id}`" class="rp-link"><strong>{{ b.person.name }}</strong></router-link>
              <small>{{ b.person.role }}</small>
              <small class="rp-oc-until"><nldd-icon name="clock" aria-hidden="true"></nldd-icon>piket tot {{ b.until }}</small>
            </div>
          </div>

          <!-- Escalation chain -->
          <nldd-spacer size="14" />
          <div class="rp-oc-section-label">Escalatie</div>
          <div class="rp-oc-chain">
            <span class="rp-oc-chain-node rp-oc-chain-primary">L1 · {{ b.person?.name || '—' }}</span>
            <template v-for="(e, i) in b.escalation" :key="e.id">
              <nldd-icon name="arrow-right" aria-hidden="true" class="rp-oc-arrow"></nldd-icon>
              <router-link :to="`/teams/mensen/${e.id}`" class="rp-oc-chain-node rp-link">L{{ i + 2 }} · {{ e.name }}</router-link>
            </template>
            <span v-if="!b.escalation.length" class="rp-oc-noesc">Geen verdere escalatie ingericht</span>
          </div>

          <!-- Recent incidents for this team -->
          <nldd-spacer size="14" />
          <div class="rp-oc-section-label">Recente incidenten</div>
          <div v-if="b.incidents.length" class="rp-oc-incidents">
            <router-link
              v-for="inc in b.incidents.slice(0, INCIDENTS_PER_CARD)"
              :key="inc.id"
              :to="`/incidenten/${inc.id}`"
              class="rp-oc-inc"
            >
              <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
              <span class="rp-oc-inc-title">{{ inc.title }}</span>
              <nldd-tag color="neutral" size="md">{{ inc.severity }}</nldd-tag>
              <StatusBadge :status="inc.status" />
            </router-link>
            <router-link
              v-if="b.incidents.length > INCIDENTS_PER_CARD"
              :to="`/teams/${b.team.id}`"
              class="rp-oc-inc-more"
            >
              Nog {{ b.incidents.length - INCIDENTS_PER_CARD }} incidenten op de teampagina
            </router-link>
          </div>
          <div v-else class="rp-oc-noesc">Geen recente incidenten.</div>

          <nldd-spacer size="16" />
          <nldd-button variant="secondary" text="Naar team" start-icon="person-2" @click="$router.push(`/teams/${b.team.id}`)" />
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <p v-if="!filtered.length" class="rp-oc-empty">
      Geen piketdienst gevonden voor deze selectie.
    </p>

    <div v-if="remaining > 0" class="rp-oc-more-row">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${remaining})`"
        start-icon="chevron-down"
        @click="showMore"
      />
    </div>
  </div>
</template>

<style scoped>
.rp-oc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-oc-live {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}
.rp-oncall-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #1a7f37;
  box-shadow: 0 0 0 3px rgba(26, 127, 55, 0.18);
}
.rp-oc-current {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rp-oc-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}
.rp-oc-id {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.rp-oc-id small {
  opacity: 0.7;
  font-size: 0.8rem;
}
.rp-oc-until {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.rp-oc-until nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
}
.rp-oc-section-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.4rem;
}
.rp-oc-chain {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.rp-oc-chain-node {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color, #dfe3e8);
  font-size: 0.8rem;
  text-decoration: none;
  color: inherit;
}
.rp-oc-chain-primary {
  background: var(--semantics-surfaces-tinted-background-color, #f3f5f8);
  font-weight: 600;
}
.rp-oc-arrow {
  width: 0.85rem;
  height: 0.85rem;
  opacity: 0.5;
}
.rp-oc-noesc {
  opacity: 0.6;
  font-size: 0.82rem;
}
.rp-oc-incidents {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.rp-oc-inc {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border-radius: 8px;
  border: 1px solid var(--semantics-dividers-color, #dfe3e8);
  text-decoration: none;
  color: inherit;
}
.rp-oc-inc:hover {
  background: var(--semantics-surfaces-tinted-background-color, #f3f5f8);
}
.rp-oc-inc nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.7;
  flex-shrink: 0;
}
.rp-oc-inc-title {
  margin-right: auto;
  font-size: 0.85rem;
}
.rp-link {
  color: inherit;
  text-decoration: none;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-oc-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-oc-search {
  flex: 1 1 18rem;
  min-width: 14rem;
}
.rp-oc-inc-more {
  font-size: 0.8rem;
  opacity: 0.7;
  text-decoration: none;
  color: inherit;
  padding: 0.2rem 0.5rem;
}
.rp-oc-inc-more:hover {
  text-decoration: underline;
}
.rp-oc-empty {
  opacity: 0.6;
  padding: 1.5rem 0.25rem;
  margin: 0;
}
.rp-oc-more-row {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}
</style>
