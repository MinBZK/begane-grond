<script setup>
// Incident overview: every incident from the store with its severity, status,
// affected service, owning team, opened-at and the on-call person. Rows link
// through to the incident detail. KPI tiles summarise the operational picture.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Resolve a service id to a human label: it can be an app or an instance.
function serviceLabel(id) {
  const app = store.appById(id);
  if (app) return app.name;
  const inst = store.instanceById(id);
  if (inst) return inst.name;
  return id;
}
function serviceRoute(id) {
  if (store.appById(id)) return `/apps/${id}`;
  if (store.instanceById(id)) return `/infra/instances/${id}`;
  return null;
}

// Order: open/active incidents first, then by severity weight.
const SEV_WEIGHT = { sev1: 3, sev2: 2, sev3: 1, sev4: 0 };
const STATUS_WEIGHT = { open: 3, mitigated: 1, resolved: 0 };
const sorted = computed(() =>
  [...store.incidents].sort((a, b) => {
    const s = (STATUS_WEIGHT[b.status] ?? 0) - (STATUS_WEIGHT[a.status] ?? 0);
    if (s !== 0) return s;
    return (SEV_WEIGHT[b.severity] ?? 0) - (SEV_WEIGHT[a.severity] ?? 0);
  })
);

// At platform scale the full incident log is too long to render as one wall of
// rows. Filter on a free-text query (title/id/service/team/on-call) and on a
// status segment, then cap the visible set with a "Toon meer" control.
const query = ref('');
const statusFilter = ref('all');
const limit = ref(25);

const statusOptions = [
  { id: 'all', label: 'Alle' },
  { id: 'open', label: 'Open' },
  { id: 'mitigated', label: 'Gemitigeerd' },
  { id: 'resolved', label: 'Opgelost' },
];

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return sorted.value.filter((inc) => {
    if (statusFilter.value !== 'all' && inc.status !== statusFilter.value) return false;
    if (!q) return true;
    const team = store.teamById(inc.team)?.name || inc.team || '';
    const oncall = store.personById(inc.oncall)?.name || inc.oncall || '';
    return (
      (inc.title || '').toLowerCase().includes(q) ||
      (inc.id || '').toLowerCase().includes(q) ||
      serviceLabel(inc.service).toLowerCase().includes(q) ||
      team.toLowerCase().includes(q) ||
      oncall.toLowerCase().includes(q)
    );
  });
});
const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));
function showMore() {
  limit.value += 25;
}

const openCount = computed(
  () => store.incidents.filter((i) => i.status !== 'resolved' && i.status !== 'opgelost').length
);
const sev2plus = computed(
  () => store.incidents.filter((i) => i.severity === 'sev1' || i.severity === 'sev2').length
);
const teamsAffected = computed(
  () => new Set(store.incidents.map((i) => i.team)).size
);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Incidenten"
      lede="Actieve en afgehandelde incidenten over alle teams en diensten. Klik door naar een incident voor de tijdlijn en on-call."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Incidenten', href: '/incidenten' }]"
    >
      <template #actions>
        <nldd-button-group orientation="horizontal">
          <router-link to="/incidenten/status">
            <nldd-button variant="secondary" text="Statuspagina" start-icon="heart"></nldd-button>
          </router-link>
          <router-link to="/incidenten/changes">
            <nldd-button variant="secondary" text="Changes" start-icon="arrow-up-arrow-down"></nldd-button>
          </router-link>
        </nldd-button-group>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="openCount" label="Open incidenten" sub="niet opgelost" icon="exclamation-triangle" />
      <MetricCard :value="sev2plus" label="Sev1 / Sev2" sub="hoge urgentie" icon="starburst-filled" />
      <MetricCard :value="teamsAffected" label="Betrokken teams" sub="met een incident" icon="person-2" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Alle incidenten</h2></nldd-title>
        <nldd-spacer size="16" />

        <div class="rp-inc-toolbar">
          <nldd-search-field
            class="rp-inc-search"
            placeholder="Zoek op titel, id, dienst, team of on-call"
            accessible-label="Zoek incident"
            :value="query"
            @input="(e) => { query = e.target.value; limit = 25; }"
          ></nldd-search-field>
          <nldd-button-group orientation="horizontal">
            <nldd-button
              v-for="opt in statusOptions"
              :key="opt.id"
              :variant="statusFilter === opt.id ? 'primary' : 'secondary'"
              :text="opt.label"
              @click="() => { statusFilter = opt.id; limit = 25; }"
            ></nldd-button>
          </nldd-button-group>
        </div>

        <nldd-spacer size="16" />

        <p class="rp-inc-count">{{ filtered.length }} incidenten</p>

        <nldd-spacer size="8" />

        <div class="rp-inc-list">
          <router-link
            v-for="inc in visible"
            :key="inc.id"
            :to="`/incidenten/${inc.id}`"
            class="rp-inc-row"
          >
            <div class="rp-inc-sev">
              <StatusBadge :status="inc.severity" size="md" />
            </div>
            <div class="rp-inc-main">
              <div class="rp-inc-title">{{ inc.title }}</div>
              <div class="rp-inc-meta">
                <span class="rp-inc-id">{{ inc.id }}</span>
                <span class="rp-inc-dot">·</span>
                <nldd-icon name="cloud" aria-hidden="true" class="rp-inc-ic"></nldd-icon>
                <span>{{ serviceLabel(inc.service) }}</span>
                <span class="rp-inc-dot">·</span>
                <nldd-icon name="clock" aria-hidden="true" class="rp-inc-ic"></nldd-icon>
                <span>{{ inc.opened }}</span>
              </div>
            </div>
            <div class="rp-inc-team">
              <div class="rp-inc-team-label">{{ store.teamById(inc.team)?.name || inc.team }}</div>
              <div class="rp-inc-oncall">
                <nldd-icon name="person-circle" aria-hidden="true" class="rp-inc-ic"></nldd-icon>
                <span>{{ store.personById(inc.oncall)?.name || inc.oncall }}</span>
              </div>
            </div>
            <div class="rp-inc-status">
              <StatusBadge :status="inc.status" />
            </div>
            <nldd-icon name="chevron-right" aria-hidden="true" class="rp-inc-chevron"></nldd-icon>
          </router-link>
          <p v-if="!filtered.length" class="rp-inc-empty">Geen incidenten gevonden.</p>
        </div>

        <template v-if="moreCount > 0">
          <nldd-spacer size="16" />
          <nldd-button
            variant="secondary"
            :text="`Toon meer (nog ${moreCount})`"
            start-icon="chevron-down"
            @click="showMore"
          ></nldd-button>
        </template>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-inc-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.rp-inc-search {
  flex: 1 1 18rem;
  min-width: 14rem;
}
.rp-inc-count {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.65;
}
.rp-inc-empty {
  margin: 0;
  padding: 0.75rem 0.25rem;
  opacity: 0.6;
}
.rp-inc-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rp-inc-row {
  display: grid;
  grid-template-columns: 4rem 1fr auto auto 1.25rem;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
}
.rp-inc-row:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-inc-title {
  font-weight: 600;
}
.rp-inc-meta {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
  font-size: 0.82rem;
  opacity: 0.7;
  margin-top: 0.15rem;
}
.rp-inc-id {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-inc-dot {
  opacity: 0.5;
}
.rp-inc-ic {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-inc-team {
  text-align: right;
}
.rp-inc-team-label {
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-inc-oncall {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.3rem;
  font-size: 0.82rem;
  opacity: 0.75;
  margin-top: 0.1rem;
}
.rp-inc-chevron {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.4;
}
@media (max-width: 720px) {
  .rp-inc-row {
    grid-template-columns: 3rem 1fr auto;
  }
  .rp-inc-team,
  .rp-inc-chevron {
    display: none;
  }
}
</style>
