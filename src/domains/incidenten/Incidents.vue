<script setup>
// Incident overview: every incident from the store with its severity, status,
// affected service, owning team, opened-at and the on-call person. Rows link
// through to the incident detail. KPI tiles summarise the operational picture.
import { computed } from 'vue';
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
const incidents = computed(() =>
  [...store.incidents].sort((a, b) => {
    const s = (STATUS_WEIGHT[b.status] ?? 0) - (STATUS_WEIGHT[a.status] ?? 0);
    if (s !== 0) return s;
    return (SEV_WEIGHT[b.severity] ?? 0) - (SEV_WEIGHT[a.severity] ?? 0);
  })
);

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
        <div class="rp-inc-list">
          <router-link
            v-for="inc in incidents"
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
        </div>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
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
