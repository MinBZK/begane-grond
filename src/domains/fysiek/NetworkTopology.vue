<script setup>
// Spine / leaf network topology rendered with @vue-flow/core. Spines sit at the
// top, leaf switches (derived from the switch devices in each rack) in the
// middle, and the racks they serve at the bottom. Leaf and rack nodes are
// clickable and route to the rack-elevation view. A datacenter filter lets the
// user focus on one hall.
import { computed, ref } from 'vue';
import { VueFlow, Panel, Handle, Position } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';

const store = usePlatformStore();
const router = useRouter();

const activeDc = ref('dc-denhaag');
const liveDcs = computed(() => store.datacenters.filter((d) => store.racksByDatacenter(d.id).length));

// Leaf switches: a rack that contains a switch device exposes that switch as a
// leaf. Racks without a switch still appear as rack nodes wired to the nearest
// leaf in their alley.
const model = computed(() => {
  const racks = store.racksByDatacenter(activeDc.value);
  const nodes = [];
  const edges = [];

  // Spines (2× as per uplinks "2× 100GbE").
  const spineCount = 2;
  const spineY = 0;
  const spineSpan = 520;
  for (let i = 0; i < spineCount; i++) {
    const id = `spine-${i + 1}`;
    nodes.push({
      id,
      type: 'spine',
      position: { x: 260 + i * spineSpan - spineSpan / 2 + 200, y: spineY },
      data: { label: `spine-0${i + 1}`, sub: '100GbE' },
    });
  }

  // Leaves: one per rack that has a switch.
  const leafRacks = racks.filter((r) => r.units.some((u) => u.type === 'switch'));
  const leafY = 160;
  const leafGap = 220;
  const leafStartX = 120;
  leafRacks.forEach((r, idx) => {
    const sw = r.units.find((u) => u.type === 'switch');
    const id = `leaf-${r.id}`;
    const x = leafStartX + idx * leafGap;
    nodes.push({
      id,
      type: 'leaf',
      position: { x, y: leafY },
      data: { label: sw.label, rack: r.id, rackLabel: r.label, watts: sw.watts, status: sw.status },
    });
    // Connect each leaf to every spine.
    for (let i = 0; i < spineCount; i++) {
      edges.push({
        id: `${id}-spine-${i + 1}`,
        source: `spine-${i + 1}`,
        target: id,
        animated: true,
        style: { stroke: '#154273', strokeWidth: 1.5 },
      });
    }
  });

  // Racks at the bottom, wired to the leaf in their own alley (or the first leaf).
  const rackY = 340;
  const rackGap = 175;
  const rackStartX = 90;
  racks.forEach((r, idx) => {
    const id = `rack-${r.id}`;
    const x = rackStartX + idx * rackGap;
    const nodeCount = r.units.filter((u) => u.type === 'server' || u.type === 'gpu').length;
    nodes.push({
      id,
      type: 'rack',
      position: { x, y: rackY },
      data: {
        label: r.label,
        rack: r.id,
        nodes: nodeCount,
        team: store.teamById(r.team)?.name || r.team,
      },
    });
    // Wire to a leaf in the same alley, else the first leaf.
    const leafInAlley = leafRacks.find((lr) => lr.alley === r.alley) || leafRacks[0];
    if (leafInAlley) {
      edges.push({
        id: `${id}-leaf-${leafInAlley.id}`,
        source: `leaf-${leafInAlley.id}`,
        target: id,
        style: { stroke: '#8a94a6', strokeWidth: 1.25 },
      });
    }
  });

  return { nodes, edges };
});

function openRack(rid) {
  if (rid) router.push(`/fysiek/racks/${rid}`);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Netwerktopologie"
      lede="Spine-leaf fabric van de serverzalen. Spines bovenin, leaf-switches per rack, en de aangesloten racks onderaan. Klik een leaf of rack om de elevatie te openen."
      :crumbs="[{ text: 'Fundament', href: '/fysiek' }, { text: 'Netwerk', href: '/fysiek/netwerk' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Naar datacenters" start-icon="apartment-building" href="/fysiek"></nldd-button>
      </template>
    </PageHeader>

    <div class="rp-topo-toolbar">
      <span class="rp-topo-label">Datacenter:</span>
      <nldd-button-group orientation="horizontal">
        <nldd-button
          v-for="d in liveDcs"
          :key="d.id"
          :variant="activeDc === d.id ? 'primary' : 'secondary'"
          :text="d.name"
          @click="activeDc = d.id"
        ></nldd-button>
      </nldd-button-group>
    </div>

    <nldd-spacer size="16" />

    <nldd-card accessible-label="Netwerktopologie">
      <div class="rp-topo-canvas">
        <VueFlow
          :nodes="model.nodes"
          :edges="model.edges"
          :default-viewport="{ x: 0, y: 20, zoom: 0.85 }"
          :min-zoom="0.4"
          :max-zoom="1.6"
          fit-view-on-init
          class="rp-vueflow"
        >
          <!-- Spine node -->
          <template #node-spine="{ data }">
            <div class="rp-node rp-node-spine">
              <Handle type="source" :position="Position.Bottom" />
              <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
              <div class="rp-node-main">
                <span class="rp-node-title">{{ data.label }}</span>
                <span class="rp-node-sub">{{ data.sub }}</span>
              </div>
            </div>
          </template>

          <!-- Leaf node -->
          <template #node-leaf="{ data }">
            <div class="rp-node rp-node-leaf" role="button" tabindex="0" @click="openRack(data.rack)" @keydown.enter="openRack(data.rack)">
              <Handle type="target" :position="Position.Top" />
              <Handle type="source" :position="Position.Bottom" />
              <span class="rp-node-led" :style="{ background: data.status === 'warn' ? '#e08c00' : '#218838' }"></span>
              <div class="rp-node-main">
                <span class="rp-node-title">{{ data.label }}</span>
                <span class="rp-node-sub">leaf · {{ data.rackLabel }}</span>
              </div>
            </div>
          </template>

          <!-- Rack node -->
          <template #node-rack="{ data }">
            <div
              class="rp-node rp-node-rack"
              role="button" tabindex="0"
              @click="openRack(data.rack)" @keydown.enter="openRack(data.rack)"
            >
              <Handle type="target" :position="Position.Top" />
              <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
              <div class="rp-node-main">
                <span class="rp-node-title">{{ data.label }}</span>
                <span class="rp-node-sub">{{ data.nodes }} nodes · {{ data.team }}</span>
              </div>
            </div>
          </template>

          <Panel position="top-left" class="rp-topo-legend">
            <div><span class="rp-leg-dot rp-leg-spine"></span> Spine</div>
            <div><span class="rp-leg-dot rp-leg-leaf"></span> Leaf-switch</div>
            <div><span class="rp-leg-dot rp-leg-rack"></span> Rack</div>
          </Panel>
        </VueFlow>
      </div>
    </nldd-card>

    <nldd-spacer size="12" />
    <nldd-rich-text>
      <p class="rp-fade">
        Niet-geblokkeerde Clos-fabric: elke leaf is met beide spines verbonden, zodat het verlies van één spine geen serverrack isoleert. Uplinks {{ store.datacenterById(activeDc)?.uplinks }}.
      </p>
    </nldd-rich-text>
  </div>
</template>

<style scoped>
.rp-topo-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-topo-label {
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-topo-canvas {
  height: 540px;
  width: 100%;
}
.rp-vueflow {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.7rem;
  border-radius: 10px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  font-family: inherit;
}
.rp-node nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
  flex: 0 0 auto;
}
.rp-node-main {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  min-width: 0;
}
.rp-node-title {
  font-weight: 700;
  font-size: 0.85rem;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
}
.rp-node-sub {
  font-size: 0.68rem;
  opacity: 0.6;
  white-space: nowrap;
}
.rp-node-spine {
  background: var(--semantics-actions-primary-default-background-color);
  border-color: #0e2f54;
  color: #fff;
}
.rp-node-spine nldd-icon {
  opacity: 0.9;
}
.rp-node-spine .rp-node-sub {
  opacity: 0.85;
}
.rp-node-leaf {
  cursor: pointer;
  border-color: rgba(120, 72, 200, 0.5);
  background: rgba(120, 72, 200, 0.06);
}
.rp-node-led {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: 0 0 9px;
}
.rp-node-rack {
  cursor: pointer;
}
.rp-node-hot {
  border-color: rgba(213, 43, 30, 0.5);
  background: rgba(213, 43, 30, 0.06);
}
.rp-node-cold {
  border-color: rgba(33, 99, 196, 0.5);
  background: rgba(33, 99, 196, 0.06);
}
.rp-node-leaf:hover,
.rp-node-rack:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}
.rp-topo-legend {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 8px;
  padding: 0.5rem 0.65rem;
  font-size: 0.74rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.rp-topo-legend > div {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-leg-dot {
  width: 11px;
  height: 11px;
  border-radius: 3px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.rp-leg-spine { background: #154273; }
.rp-leg-leaf { background: rgba(120, 72, 200, 0.7); }
.rp-leg-rack { background: rgba(33, 99, 196, 0.5); }
.rp-fade {
  opacity: 0.65;
  font-size: 0.86rem;
}
</style>
