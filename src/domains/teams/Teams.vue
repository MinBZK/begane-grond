<script setup>
// Teams overview: a tile per team with member avatars, owning organisation,
// what the team owns (apps / instances / racks counts) and who is on call now.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import TeamAvatars from './TeamAvatars.vue';

const store = usePlatformStore();

const orgName = (id) => store.orgById(id)?.short || id;

const teamCards = computed(() =>
  store.teams.map((t) => {
    const oncallPerson = store.personById(t.oncall);
    return {
      ...t,
      orgShort: orgName(t.org),
      memberPeople: t.members.map((m) => store.personById(m)).filter(Boolean),
      ownApps: t.owns?.apps?.length || 0,
      ownInstances: t.owns?.instances?.length || 0,
      ownRacks: t.owns?.racks?.length || 0,
      oncallPerson,
      incidents: store.incidentsByTeam(t.id).length,
    };
  }),
);

const totals = computed(() => ({
  teams: store.teams.length,
  people: store.people.length,
  orgs: store.organisations.length,
  oncall: store.oncall.length,
}));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Teams & mensen"
      lede="De teams die het Rijksplatform bouwen en draaien. Klik door naar leden, eigenaarschap en piket."
      :crumbs="[{ text: 'Rijksplatform', href: '/' }, { text: 'Teams & mensen', href: '/teams' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Alle mensen" start-icon="person-2" @click="$router.push('/teams/mensen')" />
        <nldd-button variant="secondary" text="Organisatiegraaf" start-icon="apartment-building" @click="$router.push('/teams/organisatie')" />
        <nldd-button variant="primary" text="On-call" start-icon="clock" @click="$router.push('/teams/on-call')" />
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="totals.teams" label="Teams" icon="person-2" to="/teams" />
      <MetricCard :value="totals.people" label="Mensen" icon="person" to="/teams/mensen" />
      <MetricCard :value="totals.orgs" label="Organisaties" icon="apartment-building" to="/teams/organisatie" />
      <MetricCard :value="totals.oncall" label="Piketdiensten" sub="actief nu" icon="clock" to="/teams/on-call" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-collection layout="grid" item-width="360px">
      <router-link v-for="t in teamCards" :key="t.id" :to="`/teams/${t.id}`" class="rp-team-link">
        <nldd-card :accessible-label="t.name">
          <nldd-container padding="20">
            <div class="rp-team-top">
              <div>
                <nldd-title size="4"><h2>{{ t.name }}</h2></nldd-title>
                <div class="rp-team-org">
                  <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>
                  <span>{{ t.orgShort }}</span>
                </div>
              </div>
              <nldd-icon name="chevron-right" aria-hidden="true" class="rp-team-chevron"></nldd-icon>
            </div>

            <nldd-spacer size="12" />
            <TeamAvatars :people="t.memberPeople" />

            <nldd-spacer size="16" />
            <div class="rp-team-stats">
              <div class="rp-team-stat">
                <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
                <span><strong>{{ t.ownApps }}</strong> apps</span>
              </div>
              <div class="rp-team-stat">
                <nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon>
                <span><strong>{{ t.ownInstances }}</strong> infra</span>
              </div>
              <div class="rp-team-stat">
                <nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon>
                <span><strong>{{ t.ownRacks }}</strong> racks</span>
              </div>
            </div>

            <nldd-spacer size="16" />
            <div class="rp-team-foot">
              <div class="rp-team-oncall" v-if="t.oncallPerson">
                <span class="rp-oncall-dot" aria-hidden="true"></span>
                <nldd-avatar v-if="false"></nldd-avatar>
                <span class="rp-team-mini-avatar">{{ t.oncallPerson.avatar }}</span>
                <span class="rp-team-oncall-text">
                  <small>On-call</small>
                  <strong>{{ t.oncallPerson.name }}</strong>
                </span>
              </div>
              <StatusBadge v-if="t.incidents" :status="`${t.incidents} incident${t.incidents > 1 ? 'en' : ''}`" />
            </div>

            <nldd-spacer size="8" />
            <div class="rp-team-room">
              <nldd-icon name="envelope" aria-hidden="true"></nldd-icon>
              <span class="rp-mono">{{ t.matrix }}</span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-team-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}
.rp-team-link nldd-card {
  transition: box-shadow 0.15s ease, transform 0.15s ease;
  height: 100%;
  display: block;
}
.rp-team-link:hover nldd-card {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
.rp-team-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}
.rp-team-org {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.25rem;
  opacity: 0.7;
  font-size: 0.85rem;
}
.rp-team-org nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-team-chevron {
  opacity: 0.4;
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}
.rp-team-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-team-stat {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
}
.rp-team-stat nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
}
.rp-team-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-team-oncall {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-oncall-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--semantics-feedback-success-color, #1a7f37);
  box-shadow: 0 0 0 3px rgba(26, 127, 55, 0.18);
}
.rp-team-mini-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  font-size: 0.7rem;
  font-weight: 700;
}
.rp-team-oncall-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.rp-team-oncall-text small {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-team-oncall-text strong {
  font-size: 0.85rem;
}
.rp-team-room {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  opacity: 0.7;
}
.rp-team-room nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
