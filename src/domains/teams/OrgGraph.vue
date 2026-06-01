<script setup>
// Organisation graph: a three-column @vue-flow/core graph of
// organisation -> team -> person. Only organisations that actually host a team
// are shown. Clicking a team or person node navigates to its detail page.
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { VueFlow, Position, MarkerType } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';

const store = usePlatformStore();
const router = useRouter();

// Column x-positions and vertical spacing.
const COL = { org: 40, team: 380, person: 760 };
const ROW = 110;

function hueFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

// At Rijksoverheid scale the full org -> team -> person expansion is hundreds
// of nodes and unreadable. Default view is org -> team. Selecting one org
// (the focus) additionally fans out that org's teams into their people, so the
// graph stays legible and you drill in on demand.
const focusOrg = ref('');

// Orgs that host at least one team, sorted by team count (busiest first).
const orgsWithTeams = computed(() =>
  store.organisations
    .filter((o) => store.teams.some((t) => t.org === o.id))
    .map((o) => ({ ...o, teamCount: store.teams.filter((t) => t.org === o.id).length }))
    .sort((a, b) => b.teamCount - a.teamCount),
);

const graph = computed(() => {
  const nodes = [];
  const edges = [];
  let teamRow = 0;

  orgsWithTeams.value.forEach((org) => {
    const orgTeams = store.teams.filter((t) => t.org === org.id);
    const isFocus = focusOrg.value === org.id;
    const orgTeamStart = teamRow;

    orgTeams.forEach((team) => {
      const teamY = teamRow * ROW;
      nodes.push({
        id: `team-${team.id}`,
        data: { label: team.name, kind: 'team', ref: team.id, sub: `${team.members.length} ${team.members.length === 1 ? 'lid' : 'leden'}` },
        position: { x: COL.team, y: teamY },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        class: 'rp-node rp-node-team',
        style: { '--rp-hue': hueFor(team.id) },
      });
      edges.push({
        id: `e-${org.id}-${team.id}`,
        source: `org-${org.id}`,
        target: `team-${team.id}`,
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: 'var(--rp-edge, #9aa6b2)' },
      });

      if (isFocus) {
        // Expand this org's teams into their members.
        team.members.forEach((pid, mi) => {
          const person = store.personById(pid);
          if (!person) return;
          const personY = teamY + mi * 38;
          nodes.push({
            id: `person-${person.id}`,
            type: 'output',
            data: { label: person.name, kind: 'person', ref: person.id, sub: person.role, avatar: person.avatar },
            position: { x: COL.person, y: personY },
            targetPosition: Position.Left,
            class: 'rp-node rp-node-person',
            style: { '--rp-hue': hueFor(person.id) },
          });
          edges.push({
            id: `e-${team.id}-${person.id}`,
            source: `team-${team.id}`,
            target: `person-${person.id}`,
            markerEnd: MarkerType.ArrowClosed,
            style: { stroke: 'var(--rp-edge, #9aa6b2)' },
          });
        });
        teamRow += Math.max(1, team.members.length);
      } else {
        teamRow += 1;
      }
    });

    // Org node centred against its block of teams.
    const orgY = (orgTeamStart * ROW + (teamRow - 1) * ROW) / 2;
    nodes.push({
      id: `org-${org.id}`,
      type: 'input',
      data: { label: org.name, kind: 'org', short: org.short, ref: org.id, count: org.teamCount },
      position: { x: COL.org, y: orgY },
      sourcePosition: Position.Right,
      class: 'rp-node rp-node-org',
      style: { '--rp-hue': hueFor(org.id) },
    });
    teamRow += 1; // gap between orgs
  });

  return { nodes, edges };
});

const flowKey = ref(0);

function onNodeClick({ node }) {
  if (node.data?.kind === 'team') router.push(`/teams/${node.data.ref}`);
  else if (node.data?.kind === 'person') router.push(`/teams/mensen/${node.data.ref}`);
  else if (node.data?.kind === 'org') setFocus(focusOrg.value === node.data.ref ? '' : node.data.ref);
}

function setFocus(id) {
  focusOrg.value = id;
  flowKey.value += 1; // remount so fit-view re-runs on the new node set
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Organisatiegraaf"
      lede="Organisatie naar team. Klik een organisatie aan om de teams uit te klappen naar hun mensen, of kies er een hieronder."
      :crumbs="[{ text: 'Begane Grond', href: '/' }, { text: 'Teams & mensen', href: '/teams' }, { text: 'Organisatie', href: '/teams/organisatie' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Teams" start-icon="person-2" @click="$router.push('/teams')" />
        <nldd-button variant="secondary" text="Mensen" start-icon="person" @click="$router.push('/teams/mensen')" />
      </template>
    </PageHeader>

    <div class="rp-org-controls">
      <div class="rp-legend">
        <span class="rp-legend-item"><span class="rp-legend-dot rp-legend-org"></span>Organisatie</span>
        <span class="rp-legend-item"><span class="rp-legend-dot rp-legend-team"></span>Team</span>
        <span class="rp-legend-item"><span class="rp-legend-dot rp-legend-person"></span>Persoon</span>
      </div>
      <nldd-dropdown>
        <select :value="focusOrg" @change="(e) => setFocus(e.target.value)" aria-label="Organisatie uitklappen">
          <option value="">Alle organisaties (org → team)</option>
          <option v-for="o in orgsWithTeams" :key="o.id" :value="o.id">
            {{ o.name }} ({{ o.teamCount }} teams) — klap mensen uit
          </option>
        </select>
      </nldd-dropdown>
    </div>

    <nldd-spacer size="12" />

    <nldd-card accessible-label="Organisatiegraaf">
      <div class="rp-flow-wrap">
        <VueFlow
          :key="flowKey"
          :nodes="graph.nodes"
          :edges="graph.edges"
          :default-viewport="{ x: 20, y: 20, zoom: 0.85 }"
          :min-zoom="0.4"
          :max-zoom="1.6"
          fit-view-on-init
          @node-click="onNodeClick"
        >
          <Background pattern-color="#cdd5df" :gap="22" />
          <template #node-input="{ data }">
            <div class="rp-vnode rp-vnode-org" :class="{ 'rp-vnode-focus': focusOrg === data.ref }" :style="{ '--rp-hue': 220 }">
              <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>
              <div class="rp-vnode-text">
                <strong>{{ data.short }}</strong>
                <small>{{ data.count }} teams</small>
              </div>
              <nldd-icon :name="focusOrg === data.ref ? 'chevron-down' : 'chevron-right'" aria-hidden="true" class="rp-vnode-go"></nldd-icon>
            </div>
          </template>
          <template #node-default="{ data }">
            <div class="rp-vnode rp-vnode-team">
              <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
              <div class="rp-vnode-text">
                <strong>{{ data.label }}</strong>
                <small>{{ data.sub }}</small>
              </div>
              <nldd-icon name="chevron-right" aria-hidden="true" class="rp-vnode-go"></nldd-icon>
            </div>
          </template>
          <template #node-output="{ data }">
            <div class="rp-vnode rp-vnode-person">
              <span class="rp-vnode-avatar">{{ data.avatar }}</span>
              <div class="rp-vnode-text">
                <strong>{{ data.label }}</strong>
                <small>{{ data.sub }}</small>
              </div>
              <nldd-icon name="chevron-right" aria-hidden="true" class="rp-vnode-go"></nldd-icon>
            </div>
          </template>
        </VueFlow>
      </div>
    </nldd-card>

    <nldd-spacer size="12" />
    <nldd-rich-text>
      <p class="rp-flow-hint">Sleep om te pannen, scroll om te zoomen. Knopen met een pijl zijn klikbaar.</p>
    </nldd-rich-text>
  </div>
</template>

<style scoped>
.rp-org-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-org-controls nldd-dropdown {
  min-width: 22rem;
}
.rp-vnode-focus {
  outline: 2px solid var(--semantics-actions-primary-default-background-color, #154273);
  outline-offset: 1px;
}
.rp-legend {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.rp-legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  opacity: 0.85;
}
.rp-legend-dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 4px;
}
.rp-legend-org {
  background: #154273;
}
.rp-legend-team {
  background: #39870c;
}
.rp-legend-person {
  background: #a90061;
}
.rp-flow-wrap {
  height: 600px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.rp-flow-hint {
  font-size: 0.85rem;
  opacity: 0.65;
  margin: 0;
}

/* Custom node bodies. Vue Flow wraps these in .vue-flow__node; we reset its
   default chrome via :deep and style our own pill. */
.rp-vnode {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.8rem;
  border-radius: 12px;
  background: var(--semantics-surfaces-default-background-color, #fff);
  border: 1px solid var(--semantics-dividers-color, #dfe3e8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-width: 220px;
  cursor: default;
}
.rp-vnode-team,
.rp-vnode-person {
  cursor: pointer;
}
.rp-vnode-team:hover,
.rp-vnode-person:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}
.rp-vnode nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.7;
  flex-shrink: 0;
}
.rp-vnode-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  margin-right: auto;
}
.rp-vnode-text small {
  opacity: 0.65;
  font-size: 0.75rem;
}
.rp-vnode-org {
  border-left: 4px solid #154273;
}
.rp-vnode-team {
  border-left: 4px solid #39870c;
}
.rp-vnode-person {
  border-left: 4px solid #a90061;
}
.rp-vnode-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background: var(--semantics-surfaces-tinted-background-color, #f3f5f8);
  font-size: 0.72rem;
  font-weight: 700;
  flex-shrink: 0;
}
.rp-vnode-go {
  opacity: 0.4;
}
</style>

<style>
/* Strip Vue Flow's default node box so only our custom pill shows. */
.vue-flow__node.rp-node {
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  width: auto;
}
.vue-flow__node.rp-node .vue-flow__handle {
  opacity: 0;
}
</style>
