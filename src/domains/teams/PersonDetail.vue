<script setup>
// Person profile: role, organisation, team, the codebases they touch, the
// services / infra their team runs, a work-history timeline and their Matrix
// handle. A "Start gesprek" button opens a faked Matrix chat panel. Relation
// chips make the person -> team -> app -> instance -> rack chain clickable.
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MatrixChat from './MatrixChat.vue';

const store = usePlatformStore();
const route = useRoute();

const person = computed(() => store.personById(route.params.id));
const team = computed(() => (person.value ? store.teamById(person.value.team) : null));
const org = computed(() => (person.value ? store.orgById(person.value.org) : null));

// What this person touches: their team's apps, the repos behind those apps,
// the infra instances and the racks the team owns.
const teamApps = computed(() => (team.value ? store.appsByTeam(team.value.id) : []));
const teamRepos = computed(() =>
  teamApps.value.map((a) => store.repoById(a.repo)).filter(Boolean),
);
const teamInstances = computed(() =>
  team.value ? store.instancesByTeam(team.value.id) : [],
);
const teamRacks = computed(() =>
  (team.value?.owns?.racks || []).map((r) => store.rackById(r)).filter(Boolean),
);
const workplaces = computed(() =>
  person.value ? store.workplacesByPerson(person.value.id) : [],
);
const isOncall = computed(() =>
  person.value ? store.oncall.some((o) => o.person === person.value.id) : false,
);

const relations = computed(() => {
  const links = [];
  if (team.value) links.push({ text: `Team ${team.value.name}`, to: `/teams/${team.value.id}`, icon: 'person-2' });
  teamApps.value.forEach((a) => links.push({ text: a.name, to: `/apps/${a.id}`, icon: 'rectangle-stack' }));
  teamRepos.value.forEach((r) => links.push({ text: r.name, to: `/code/${r.id}`, icon: 'folder-stack' }));
  teamInstances.value.forEach((i) => links.push({ text: i.name, to: `/infra/instances/${i.id}`, icon: 'cylinder-split' }));
  teamRacks.value.forEach((r) => links.push({ text: `Rack ${r.label}`, to: `/fysiek/racks/${r.id}`, icon: 'cylinder-split' }));
  workplaces.value.forEach((w) => links.push({ text: `Werkplek ${w.id}`, to: `/werkplekken/${w.id}`, icon: 'house' }));
  // RegelRecht trajecten this person participates in.
  if (person.value) {
    store.trajectenByPerson(person.value.id).forEach((t) =>
      links.push({ text: `Traject: ${t.name}`, to: `/wetten/${t.wet}`, icon: 'pencil' }),
    );
  }
  return links;
});

function hueFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

const chatOpen = ref(false);
</script>

<template>
  <div class="rp-page" v-if="person">
    <PageHeader
      :title="person.name"
      :lede="person.role"
      :crumbs="[
        { text: 'Begane Grond', href: '/' },
        { text: 'Mensen', href: '/teams/mensen' },
        { text: person.name, href: `/teams/mensen/${person.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Naar team" start-icon="person-2" @click="team && $router.push(`/teams/${team.id}`)" />
        <nldd-button variant="primary" text="Start gesprek" start-icon="envelope" @click="chatOpen = true" />
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <!-- Left: identity card -->
      <nldd-card accessible-label="Profiel">
        <nldd-container padding="20">
          <div class="rp-prof-head">
            <span
              class="rp-prof-avatar"
              :style="{ background: `hsl(${hueFor(person.id)} 55% 88%)`, color: `hsl(${hueFor(person.id)} 55% 28%)` }"
            >{{ person.avatar }}</span>
            <div>
              <nldd-title size="4"><h2>{{ person.name }}</h2></nldd-title>
              <div class="rp-prof-role">{{ person.role }}</div>
              <nldd-tag v-if="isOncall" color="success" size="md">on-call</nldd-tag>
            </div>
          </div>

          <nldd-spacer size="16" />
          <nldd-list>
            <nldd-list-item>
              <nldd-icon-cell name="person-2"></nldd-icon-cell>
              <nldd-description-cell heading="Team" :supporting-text="team ? team.name : '—'"></nldd-description-cell>
            </nldd-list-item>
            <nldd-list-item>
              <nldd-icon-cell name="apartment-building"></nldd-icon-cell>
              <nldd-description-cell heading="Organisatie" :supporting-text="org ? org.name : person.org"></nldd-description-cell>
            </nldd-list-item>
            <nldd-list-item>
              <nldd-icon-cell name="envelope"></nldd-icon-cell>
              <nldd-description-cell heading="Matrix" :supporting-text="person.matrix"></nldd-description-cell>
            </nldd-list-item>
          </nldd-list>

          <nldd-spacer size="16" />
          <nldd-button variant="primary" text="Start gesprek" start-icon="envelope" @click="chatOpen = true" />
        </nldd-container>
      </nldd-card>

      <!-- Middle: work history timeline -->
      <nldd-card accessible-label="Werkgeschiedenis">
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Werkgeschiedenis</h3></nldd-title>
          <nldd-spacer size="12" />
          <nldd-list>
            <nldd-list-item v-for="(h, i) in person.history" :key="i">
              <nldd-timeline-track-cell
                :first="i === 0 || undefined"
                :last="i === person.history.length - 1 || undefined"
              ></nldd-timeline-track-cell>
              <nldd-cell width="full">
                <nldd-text-cell :text="h.period"></nldd-text-cell>
                <nldd-description-cell :text="h.what"></nldd-description-cell>
              </nldd-cell>
            </nldd-list-item>
          </nldd-list>
        </nldd-container>
      </nldd-card>

      <!-- Right: relations -->
      <RelationLinks title="Raakt aan" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Codebases -->
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
              <nldd-tag color="neutral" size="md">{{ r.openPrs }} PR's</nldd-tag>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
      <div v-if="!teamRepos.length" class="rp-empty-inline">Geen codebases gekoppeld.</div>
    </nldd-collection>

    <nldd-spacer size="24" />

    <!-- Services / infra -->
    <nldd-title size="4"><h2>Services & infra</h2></nldd-title>
    <nldd-spacer size="12" />
    <nldd-collection layout="grid" item-width="320px">
      <router-link v-for="i in teamInstances" :key="i.id" :to="`/infra/instances/${i.id}`" class="rp-mini-link">
        <nldd-card :accessible-label="i.name">
          <nldd-container padding="16">
            <div class="rp-mini-head">
              <nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon>
              <strong class="rp-mono">{{ i.name }}</strong>
            </div>
            <nldd-spacer size="8" />
            <div class="rp-mini-tags">
              <nldd-tag color="neutral" size="md">{{ i.kind }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ i.env }}</nldd-tag>
              <StatusBadge :status="i.status" />
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
      <div v-if="!teamInstances.length" class="rp-empty-inline">Geen infra gekoppeld.</div>
    </nldd-collection>

    <MatrixChat
      :open="chatOpen"
      :title="person.name"
      :handle="person.matrix"
      kind="direct"
      @close="chatOpen = false"
    />
  </div>

  <div class="rp-page" v-else>
    <PageHeader title="Persoon niet gevonden" />
    <nldd-inline-dialog title="Onbekende persoon" supporting-text="Deze persoon bestaat niet in de demo-data."></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-prof-head {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.rp-prof-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.15rem;
  flex-shrink: 0;
}
.rp-prof-role {
  opacity: 0.7;
  margin: 0.2rem 0 0.4rem;
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
.rp-empty-inline {
  opacity: 0.6;
  font-size: 0.9rem;
  padding: 0.5rem 0;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
