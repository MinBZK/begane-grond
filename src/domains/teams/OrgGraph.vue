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

const graph = computed(() => {
  const nodes = [];
  const edges = [];

  // Only orgs that host at least one team.
  const orgsWithTeams = store.organisations.filter((o) =>
    store.teams.some((t) => t.org === o.id),
  );

  // Vertical cursors per column so rows stack neatly.
  let teamRow = 0;
  let personRow = 0;

  orgsWithTeams.forEach((org, oi) => {
    const orgTeams = store.teams.filter((t) => t.org === org.id);
    // Center the org vertically against its block of teams.
    const orgY = teamRow * ROW + ((orgTeams.length - 1) * ROW) / 2;

    nodes.push({
      id: `org-${org.id}`,
      type: 'input',
      data: { label: org.name, kind: 'org', short: org.short },
      position: { x: COL.org, y: orgY },
      sourcePosition: Position.Right,
      class: 'rp-node rp-node-org',
      style: { '--rp-hue': hueFor(org.id) },
    });

    orgTeams.forEach((team) => {
      const teamY = teamRow * ROW;
      nodes.push({
        id: `team-${team.id}`,
        data: { label: team.name, kind: 'team', ref: team.id, sub: `${team.members.length} leden` },
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
        animated: false,
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: 'var(--rp-edge, #9aa6b2)' },
      });

      team.members.forEach((pid) => {
        const person = store.personById(pid);
        if (!person) return;
        const personY = personRow * ROW;
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
        personRow += 1;
      });

      // Make sure the team column never overlaps: advance the team cursor to at
      // least where this team's people ended.
      teamRow = Math.max(teamRow + 1, personRow);
    });
    if (oi >= 0) {
      // Keep person and team cursors loosely aligned between orgs.
      personRow = Math.max(personRow, teamRow);
    }
  });

  return { nodes, edges };
});

function onNodeClick({ node }) {
  if (node.data?.kind === 'team') router.push(`/teams/${node.data.ref}`);
  else if (node.data?.kind === 'person') router.push(`/teams/mensen/${node.data.ref}`);
}

const flowKey = ref(0);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Organisatiegraaf"
      lede="Organisatie naar team naar persoon. Klik op een team of persoon om door te navigeren."
      :crumbs="[{ text: 'Rijksplatform', href: '/' }, { text: 'Teams & mensen', href: '/teams' }, { text: 'Organisatie', href: '/teams/organisatie' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Teams" start-icon="person-2" @click="$router.push('/teams')" />
        <nldd-button variant="secondary" text="Mensen" start-icon="person" @click="$router.push('/teams/mensen')" />
      </template>
    </PageHeader>

    <div class="rp-legend">
      <span class="rp-legend-item"><span class="rp-legend-dot rp-legend-org"></span>Organisatie</span>
      <span class="rp-legend-item"><span class="rp-legend-dot rp-legend-team"></span>Team</span>
      <span class="rp-legend-item"><span class="rp-legend-dot rp-legend-person"></span>Persoon</span>
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
            <div class="rp-vnode rp-vnode-org" :style="{ '--rp-hue': 220 }">
              <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>
              <div class="rp-vnode-text">
                <strong>{{ data.short }}</strong>
                <small>{{ data.label }}</small>
              </div>
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
