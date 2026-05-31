<script setup>
// Single incident: header with severity + status, a vertical timeline built
// from incident.timeline using nldd-timeline-track-cell, the on-call person
// involved, an "bevestigen" action (store.ackIncident) and RelationLinks that
// let you click through to the affected service, the owning team and the
// datacenter where the service lives.
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();
const route = useRoute();

const incident = computed(() => store.incidents.find((i) => i.id === route.params.id));

const team = computed(() => (incident.value ? store.teamById(incident.value.team) : null));
const oncallPerson = computed(() =>
  incident.value ? store.personById(incident.value.oncall) : null
);

// The affected service is either an app or an instance; resolve both so we can
// build the right deep links and labels.
const app = computed(() => (incident.value ? store.appById(incident.value.service) : null));
const instance = computed(() =>
  incident.value ? store.instanceById(incident.value.service) : null
);
const serviceName = computed(
  () => app.value?.name || instance.value?.name || incident.value?.service || ''
);
// Resolve the datacenter via the instance, or via the team's first owned instance.
const datacenter = computed(() => {
  const dcId = instance.value?.dc;
  if (dcId) return store.datacenterById(dcId);
  const teamInst = team.value?.owns?.instances
    ?.map((id) => store.instanceById(id))
    .find((i) => i?.dc);
  return teamInst ? store.datacenterById(teamInst.dc) : null;
});

const relationLinks = computed(() => {
  const links = [];
  if (app.value) {
    links.push({ text: `Applicatie: ${app.value.name}`, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  }
  if (instance.value) {
    links.push({ text: `Instance: ${instance.value.name}`, to: `/infra/instances/${instance.value.id}`, icon: 'cylinder-split' });
    if (instance.value.rack) {
      links.push({ text: `Rack: ${store.rackById(instance.value.rack)?.label || instance.value.rack}`, to: `/fysiek/racks/${instance.value.rack}`, icon: 'folder-stack' });
    }
  }
  if (team.value) {
    links.push({ text: `Team: ${team.value.name}`, to: `/teams/${team.value.id}`, icon: 'person-2' });
  }
  if (oncallPerson.value) {
    links.push({ text: `On-call: ${oncallPerson.value.name}`, to: `/teams/mensen/${oncallPerson.value.id}`, icon: 'person-circle' });
  }
  if (datacenter.value) {
    links.push({ text: `Datacenter: ${datacenter.value.name}`, to: `/fysiek/datacenters/${datacenter.value.id}`, icon: 'apartment-building' });
  }
  return links;
});

function sevColor(sev) {
  if (sev === 'sev1' || sev === 'sev2') return 'critical';
  if (sev === 'sev3') return 'warning';
  return 'neutral';
}

const isResolved = computed(
  () => incident.value?.status === 'resolved' || incident.value?.status === 'opgelost'
);
const isAcked = computed(() => incident.value?.status === 'mitigated');

function ack() {
  if (incident.value) store.ackIncident(incident.value.id);
}

function childPos(idx, len) {
  if (idx === 0) return 'first';
  if (idx === len - 1) return 'last';
  return 'between';
}
</script>

<template>
  <div class="rp-page">
    <template v-if="incident">
      <PageHeader
        :title="incident.title"
        :lede="`${incident.id} · geopend ${incident.opened}`"
        :crumbs="[
          { text: 'Platform', href: '/' },
          { text: 'Incidenten', href: '/incidenten' },
          { text: incident.id, href: `/incidenten/${incident.id}` },
        ]"
      >
        <template #actions>
          <nldd-button-group orientation="horizontal">
            <nldd-button
              v-if="!isResolved"
              variant="primary"
              :text="isAcked ? 'Bevestigd' : 'Bevestigen'"
              :start-icon="isAcked ? 'check-mark-circle' : 'check-mark'"
              :disabled="isAcked || undefined"
              @click="ack"
            ></nldd-button>
            <router-link to="/incidenten/status">
              <nldd-button variant="secondary" text="Statuspagina" start-icon="heart"></nldd-button>
            </router-link>
          </nldd-button-group>
        </template>
      </PageHeader>

      <div class="rp-inc-banner">
        <nldd-tag :color="sevColor(incident.severity)" size="md">{{ incident.severity }}</nldd-tag>
        <StatusBadge :status="incident.status" />
        <span class="rp-inc-banner-sep">·</span>
        <span class="rp-inc-banner-svc">
          <nldd-icon name="cloud" aria-hidden="true"></nldd-icon>
          {{ serviceName }}
        </span>
      </div>

      <nldd-spacer size="20" />

      <nldd-container layout="grid" column-count="3" gap="16">
        <!-- Timeline spans two columns on wide viewports -->
        <div class="rp-col-2">
          <nldd-card>
            <nldd-container padding="20">
              <nldd-title size="4"><h2>Tijdlijn</h2></nldd-title>
              <nldd-spacer size="8" />
              <nldd-rich-text>
                <p>Chronologisch verloop van detectie tot mitigatie van dit incident.</p>
              </nldd-rich-text>
              <nldd-spacer size="12" />
              <nldd-list>
                <nldd-list-item
                  v-for="(ev, idx) in incident.timeline"
                  :key="idx"
                >
                  <nldd-timeline-track-cell
                    slot="start"
                    step="past"
                    :child="childPos(idx, incident.timeline.length)"
                  ></nldd-timeline-track-cell>
                  <nldd-title-cell
                    :overline="ev.at"
                    :text="ev.what"
                    size="6"
                    vertical-alignment="top"
                  ></nldd-title-cell>
                </nldd-list-item>
                <!-- Live foot of the timeline: current state -->
                <nldd-list-item>
                  <nldd-timeline-track-cell
                    slot="start"
                    :step="isResolved ? 'past' : 'future'"
                    child="last"
                  ></nldd-timeline-track-cell>
                  <nldd-title-cell
                    overline="nu"
                    :text="isResolved ? 'Incident opgelost en gesloten' : (isAcked ? 'Gemitigeerd, in bewaking' : 'Open, wacht op bevestiging')"
                    size="6"
                    :color="isResolved ? 'success' : (isAcked ? 'warning' : 'critical')"
                    vertical-alignment="top"
                  ></nldd-title-cell>
                </nldd-list-item>
              </nldd-list>
            </nldd-container>
          </nldd-card>
        </div>

        <!-- On-call / response side panel -->
        <div>
          <nldd-card>
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Respons</h3></nldd-title>
              <nldd-spacer size="12" />
              <div v-if="oncallPerson" class="rp-oncall-card">
                <div class="rp-oncall-avatar">{{ oncallPerson.avatar }}</div>
                <div>
                  <router-link :to="`/teams/mensen/${oncallPerson.id}`" class="rp-oncall-name">
                    {{ oncallPerson.name }}
                  </router-link>
                  <div class="rp-oncall-role">{{ oncallPerson.role }}</div>
                  <div class="rp-oncall-matrix">{{ oncallPerson.matrix }}</div>
                </div>
              </div>
              <nldd-spacer size="16" />
              <nldd-list>
                <nldd-list-item>
                  <nldd-description-cell>
                    <span slot="title">Team</span>
                    <span slot="description">{{ team?.name || '—' }}</span>
                  </nldd-description-cell>
                </nldd-list-item>
                <nldd-list-item>
                  <nldd-description-cell>
                    <span slot="title">Getroffen dienst</span>
                    <span slot="description">{{ serviceName }}</span>
                  </nldd-description-cell>
                </nldd-list-item>
                <nldd-list-item>
                  <nldd-description-cell>
                    <span slot="title">Geopend</span>
                    <span slot="description">{{ incident.opened }}</span>
                  </nldd-description-cell>
                </nldd-list-item>
              </nldd-list>
            </nldd-container>
          </nldd-card>
        </div>
      </nldd-container>

      <nldd-spacer size="16" />

      <RelationLinks title="Doorklikken" :links="relationLinks" />

      <CliHint
        :command="`rp incident ack ${incident.id}`"
        label="Bevestigen kan ook via de CLI:"
      />
    </template>

    <template v-else>
      <PageHeader title="Incident niet gevonden" lede="Dit incident bestaat niet of is gesloten." />
      <nldd-inline-dialog
        title="Onbekend incident"
        supporting-text="Ga terug naar het overzicht om een bestaand incident te kiezen."
      ></nldd-inline-dialog>
      <nldd-spacer size="16" />
      <router-link to="/incidenten">
        <nldd-button variant="primary" text="Naar incidenten" start-icon="arrow-right"></nldd-button>
      </router-link>
    </template>
  </div>
</template>

<style scoped>
.rp-inc-banner {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-inc-banner-sep {
  opacity: 0.4;
}
.rp-inc-banner-svc {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
}
.rp-inc-banner-svc nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-col-2 {
  grid-column: span 2;
}
.rp-oncall-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rp-oncall-avatar {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  background: var(--semantics-surfaces-brand-background-color, #154273);
  flex-shrink: 0;
}
.rp-oncall-name {
  font-weight: 700;
  text-decoration: none;
  color: inherit;
}
.rp-oncall-name:hover {
  text-decoration: underline;
}
.rp-oncall-role {
  font-size: 0.85rem;
  opacity: 0.75;
}
.rp-oncall-matrix {
  font-size: 0.8rem;
  opacity: 0.6;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
@media (max-width: 720px) {
  .rp-col-2 {
    grid-column: span 1;
  }
}
</style>
