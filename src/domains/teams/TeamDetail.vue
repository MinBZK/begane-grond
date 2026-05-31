<script setup>
// Team detail: members, what the team owns (apps / instances / racks as
// clickable relation chips), who is on call right now, the codebases behind
// their apps, their Matrix room and a "Start gesprek" button that opens the
// faked room chat.
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MatrixChat from './MatrixChat.vue';

const store = usePlatformStore();
const route = useRoute();

const team = computed(() => store.teamById(route.params.id));
const org = computed(() => (team.value ? store.orgById(team.value.org) : null));
const members = computed(() =>
  team.value ? team.value.members.map((m) => store.personById(m)).filter(Boolean) : [],
);
const oncallPerson = computed(() =>
  team.value ? store.personById(team.value.oncall) : null,
);
const oncallEntry = computed(() =>
  team.value ? store.oncall.find((o) => o.team === team.value.id) : null,
);

const ownApps = computed(() =>
  (team.value?.owns?.apps || []).map((a) => store.appById(a)).filter(Boolean),
);
const ownInstances = computed(() =>
  (team.value?.owns?.instances || []).map((i) => store.instanceById(i)).filter(Boolean),
);
const ownRacks = computed(() =>
  (team.value?.owns?.racks || []).map((r) => store.rackById(r)).filter(Boolean),
);
const teamRepos = computed(() =>
  ownApps.value.map((a) => store.repoById(a.repo)).filter(Boolean),
);
const teamIncidents = computed(() =>
  team.value ? store.incidentsByTeam(team.value.id) : [],
);
const teamCost = computed(() =>
  team.value ? store.costByTeam.find((c) => c.team === team.value.id) : null,
);
// Maandkosten run into the thousands; format with a Dutch thousands separator
// instead of showing a bare integer derived straight from the store.
const teamCostLabel = computed(
  () => `€ ${(teamCost.value ? teamCost.value.month : 0).toLocaleString('nl-NL')}`,
);

const appLinks = computed(() =>
  ownApps.value.map((a) => ({ text: a.name, to: `/apps/${a.id}`, icon: 'rectangle-stack' })),
);
const instanceLinks = computed(() =>
  ownInstances.value.map((i) => ({ text: i.name, to: `/infra/instances/${i.id}`, icon: 'cylinder-split' })),
);
const rackLinks = computed(() =>
  ownRacks.value.map((r) => ({
    text: `${r.label} · ${store.datacenterById(r.dc)?.name || r.dc}`,
    to: `/fysiek/racks/${r.id}`,
    icon: 'cylinder-split',
  })),
);

function hueFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

const chatOpen = ref(false);
</script>

<template>
  <div class="rp-page" v-if="team">
    <PageHeader
      :title="team.name"
      :lede="`${org ? org.name : team.org} · ${members.length} ${members.length === 1 ? 'lid' : 'leden'}`"
      :crumbs="[
        { text: 'Rijksplatform', href: '/' },
        { text: 'Teams & mensen', href: '/teams' },
        { text: team.name, href: `/teams/${team.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="On-call" start-icon="clock" @click="$router.push('/teams/on-call')" />
        <nldd-button variant="primary" text="Start gesprek" start-icon="envelope" @click="chatOpen = true" />
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="members.length" label="Leden" icon="person" />
      <MetricCard :value="ownApps.length" label="Apps" icon="rectangle-stack" />
      <MetricCard :value="ownInstances.length" label="Infra" icon="cylinder-split" />
      <MetricCard :value="teamCostLabel" label="Maandkosten" :sub="teamCost ? teamCost.trend : ''" icon="euro-sign" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" gap="16">
      <!-- Members -->
      <nldd-card accessible-label="Leden">
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Leden</h3></nldd-title>
          <nldd-spacer size="12" />
          <nldd-list>
            <router-link
              v-for="p in members"
              :key="p.id"
              :to="`/teams/mensen/${p.id}`"
              class="rp-member-row"
            >
              <span
                class="rp-member-avatar"
                :style="{ background: `hsl(${hueFor(p.id)} 55% 88%)`, color: `hsl(${hueFor(p.id)} 55% 28%)` }"
              >{{ p.avatar }}</span>
              <span class="rp-member-id">
                <strong>{{ p.name }}</strong>
                <small>{{ p.role }}</small>
              </span>
              <nldd-tag v-if="team.oncall === p.id" color="success" size="md">on-call</nldd-tag>
              <nldd-icon name="chevron-right" aria-hidden="true" class="rp-member-chevron"></nldd-icon>
            </router-link>
          </nldd-list>
        </nldd-container>
      </nldd-card>

      <!-- On-call now -->
      <nldd-card accessible-label="Piket">
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Nu on-call</h3></nldd-title>
          <nldd-spacer size="12" />
          <div v-if="oncallPerson" class="rp-oncall-card">
            <span class="rp-oncall-dot" aria-hidden="true"></span>
            <span
              class="rp-member-avatar"
              :style="{ background: `hsl(${hueFor(oncallPerson.id)} 55% 88%)`, color: `hsl(${hueFor(oncallPerson.id)} 55% 28%)` }"
            >{{ oncallPerson.avatar }}</span>
            <div>
              <router-link :to="`/teams/mensen/${oncallPerson.id}`" class="rp-link">
                <strong>{{ oncallPerson.name }}</strong>
              </router-link>
              <div class="rp-oncall-sub">{{ oncallPerson.role }}</div>
              <div class="rp-oncall-sub">Piket tot {{ oncallEntry ? oncallEntry.until : '—' }}</div>
            </div>
          </div>
          <template v-if="oncallEntry && oncallEntry.escalation.length">
            <nldd-spacer size="12" />
            <div class="rp-esc-label">Escalatie</div>
            <div class="rp-esc-list">
              <router-link
                v-for="eid in oncallEntry.escalation"
                :key="eid"
                :to="`/teams/mensen/${eid}`"
                class="rp-esc-chip"
              >
                <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
                {{ store.personById(eid)?.name || eid }}
              </router-link>
            </div>
          </template>
          <nldd-spacer size="16" />
          <nldd-button variant="secondary" text="Platform-breed piket" start-icon="clock" @click="$router.push('/teams/on-call')" />
        </nldd-container>
      </nldd-card>

      <!-- Matrix room -->
      <nldd-card accessible-label="Matrix-room">
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Matrix-room</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-room">
            <span class="rp-chat-net" aria-hidden="true"></span>
            <span class="rp-mono">{{ team.matrix }}</span>
          </div>
          <nldd-spacer size="8" />
          <nldd-rich-text><p class="rp-room-sub">Federatieve overheidschat (rijk.chat). {{ members.length }} leden.</p></nldd-rich-text>
          <nldd-spacer size="12" />
          <nldd-button variant="primary" text="Start gesprek" start-icon="envelope" @click="chatOpen = true" />
        </nldd-container>
      </nldd-card>
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Ownership relations -->
    <nldd-title size="4"><h2>Eigenaarschap</h2></nldd-title>
    <nldd-spacer size="12" />
    <nldd-container layout="grid" column-count="3" gap="16">
      <RelationLinks title="Apps" :links="appLinks" v-if="appLinks.length" />
      <RelationLinks title="Infra-instances" :links="instanceLinks" v-if="instanceLinks.length" />
      <RelationLinks title="Racks" :links="rackLinks" v-if="rackLinks.length" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Repos -->
    <nldd-title size="4"><h2>Codebases</h2></nldd-title>
    <nldd-spacer size="12" />
    <nldd-collection layout="grid" item-width="320px">
      <router-link v-for="r in teamRepos" :key="r.id" :to="`/code/${r.id}`" class="rp-mini-link">
        <nldd-card :accessible-label="r.name">
          <nldd-container padding="16">
            <div class="rp-mini-head">
              <nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon>
              <strong class="rp-mono">{{ r.name }}</strong>
            </div>
            <nldd-spacer size="8" />
            <div class="rp-mini-tags">
              <nldd-tag color="neutral" size="md">{{ r.lang }}</nldd-tag>
              <StatusBadge :status="r.ci" />
              <nldd-tag color="neutral" size="md">{{ r.visibility }}</nldd-tag>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
      <div v-if="!teamRepos.length" class="rp-empty-inline">Geen codebases.</div>
    </nldd-collection>

    <nldd-spacer size="24" />

    <!-- Recent incidents -->
    <nldd-title size="4"><h2>Recente incidenten</h2></nldd-title>
    <nldd-spacer size="12" />
    <nldd-list v-if="teamIncidents.length">
      <router-link
        v-for="inc in teamIncidents"
        :key="inc.id"
        :to="`/incidenten/${inc.id}`"
        class="rp-inc-row"
      >
        <nldd-icon name="exclamation-triangle" aria-hidden="true" class="rp-inc-icon"></nldd-icon>
        <span class="rp-inc-id">
          <strong>{{ inc.title }}</strong>
          <small>{{ inc.opened }}</small>
        </span>
        <nldd-tag color="neutral" size="md">{{ inc.severity }}</nldd-tag>
        <StatusBadge :status="inc.status" />
        <nldd-icon name="chevron-right" aria-hidden="true" class="rp-member-chevron"></nldd-icon>
      </router-link>
    </nldd-list>
    <div v-else class="rp-empty-inline">Geen recente incidenten.</div>

    <MatrixChat
      :open="chatOpen"
      :title="team.name"
      :handle="team.matrix"
      kind="room"
      @close="chatOpen = false"
    />
  </div>

  <div class="rp-page" v-else>
    <PageHeader title="Team niet gevonden" />
    <nldd-inline-dialog title="Onbekend team" supporting-text="Dit team bestaat niet in de demo-data."></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-member-row,
.rp-inc-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.4rem;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
}
.rp-member-row:hover,
.rp-inc-row:hover {
  background: var(--semantics-surfaces-tinted-background-color, #f3f5f8);
}
.rp-member-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: 0.78rem;
  flex-shrink: 0;
}
.rp-member-id,
.rp-inc-id {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  margin-right: auto;
}
.rp-member-id small,
.rp-inc-id small {
  opacity: 0.65;
  font-size: 0.78rem;
}
.rp-member-chevron {
  opacity: 0.4;
  width: 1.1rem;
  height: 1.1rem;
}
.rp-oncall-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-oncall-dot,
.rp-chat-net {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: #1a7f37;
  box-shadow: 0 0 0 3px rgba(26, 127, 55, 0.18);
  flex-shrink: 0;
}
.rp-oncall-sub {
  opacity: 0.7;
  font-size: 0.82rem;
}
.rp-esc-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.35rem;
}
.rp-esc-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-esc-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color, #dfe3e8);
  text-decoration: none;
  color: inherit;
  font-size: 0.82rem;
}
.rp-esc-chip nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
  opacity: 0.6;
}
.rp-room {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-room-sub {
  opacity: 0.7;
  font-size: 0.85rem;
  margin: 0;
}
.rp-mini-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
.rp-mini-link nldd-card {
  height: 100%;
  display: block;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
}
.rp-mini-link:hover nldd-card {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.rp-mini-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-mini-head nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.6;
}
.rp-mini-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-inc-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.7;
  flex-shrink: 0;
}
.rp-link {
  color: inherit;
  text-decoration: none;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-empty-inline {
  opacity: 0.6;
  font-size: 0.9rem;
  padding: 0.5rem 0;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
