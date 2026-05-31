<script setup>
// SVG floorplan of a datacenter hall. Each alley is drawn as a row of rack
// blocks, colour-coded by aisle orientation (hot = warm/red, cold = cool/blue).
// Racks are clickable and route to the rack-elevation view. The fill colour of
// each rack reflects how full it is (height units occupied vs 42U).
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const dc = computed(() => store.datacenterById(route.params.dc));
const alleys = computed(() => store.alleysByDatacenter(route.params.dc));

const hovered = ref(null);

// Geometry constants for the SVG grid.
const PAD = 40;
const ROW_GAP = 70;
const ROW_LABEL_W = 70;
const RACK_W = 96;
const RACK_H = 54;
const RACK_GAP = 14;

function rackData(rid) {
  const rack = store.rackById(rid);
  if (!rack) return null;
  const usedU = rack.units.reduce((s, u) => s + (u.height || 0), 0);
  const watts = rack.units.reduce((s, u) => s + (u.watts || 0), 0);
  const fill = Math.round((usedU / rack.heightU) * 100);
  const hasWarn = rack.units.some((u) => u.status === 'warn' || u.status === 'crit');
  return { rack, usedU, watts, fill, hasWarn };
}

// Layout: each alley becomes one row; racks lay out left to right.
const layout = computed(() => {
  const rows = [];
  let y = PAD;
  let maxX = PAD;
  for (const alley of alleys.value) {
    const racks = alley.racks.map((rid, idx) => {
      const x = PAD + ROW_LABEL_W + idx * (RACK_W + RACK_GAP);
      maxX = Math.max(maxX, x + RACK_W);
      return { rid, x, y, ...rackData(rid) };
    });
    rows.push({ alley, y, racks });
    y += RACK_H + ROW_GAP;
  }
  return { rows, width: maxX + PAD, height: y - ROW_GAP + RACK_H + PAD };
});

function aisleFill(aisle) {
  return aisle === 'hot' ? 'rgba(213,43,30,0.10)' : 'rgba(33,99,196,0.10)';
}
function aisleStroke(aisle) {
  return aisle === 'hot' ? 'rgba(213,43,30,0.55)' : 'rgba(33,99,196,0.55)';
}
function rackFillColor(aisle, fill) {
  // Base on aisle, intensity on how full the rack is.
  const base = aisle === 'hot' ? '213,43,30' : '33,99,196';
  const alpha = 0.18 + (fill / 100) * 0.55;
  return `rgba(${base},${alpha.toFixed(2)})`;
}
function open(rid) {
  router.push(`/fysiek/racks/${rid}`);
}
</script>

<template>
  <div v-if="dc" class="rp-page">
    <PageHeader
      :title="`Zaalindeling — ${dc.name}`"
      lede="Hot-aisle / cold-aisle indeling van de serverzaal. Rode rijen voeren warme lucht af, blauwe rijen zuigen koude lucht aan. Klik een rack voor de elevatie."
      :crumbs="[
        { text: 'Fysieke infra', href: '/fysiek' },
        { text: dc.name, href: `/fysiek/datacenters/${dc.id}` },
        { text: 'Zaalindeling', href: `/fysiek/datacenters/${dc.id}/floor` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar datacenter" start-icon="chevron-left" :href="`/fysiek/datacenters/${dc.id}`"></nldd-button>
      </template>
    </PageHeader>

    <div class="rp-legend">
      <span class="rp-leg-item"><span class="rp-leg-swatch rp-leg-cold"></span> Cold aisle (koude lucht in)</span>
      <span class="rp-leg-item"><span class="rp-leg-swatch rp-leg-hot"></span> Hot aisle (warme lucht uit)</span>
      <span class="rp-leg-item"><span class="rp-leg-swatch rp-leg-warn"></span> Aandachtspunt in rack</span>
      <span class="rp-leg-item rp-leg-fade">Intensiteit = bezettingsgraad</span>
    </div>

    <nldd-spacer size="16" />

    <nldd-card v-if="alleys.length" accessible-label="Zaalindeling">
      <nldd-container padding="20">
        <div class="rp-floor-wrap">
          <svg
            :viewBox="`0 0 ${layout.width} ${layout.height}`"
            class="rp-floor-svg"
            role="group"
            aria-label="Plattegrond serverzaal"
          >
            <!-- Hall outline -->
            <rect
              :x="PAD / 2" :y="PAD / 2"
              :width="layout.width - PAD" :height="layout.height - PAD"
              rx="14" fill="none"
              stroke="var(--semantics-dividers-color, #d6dbe1)" stroke-width="2" stroke-dasharray="6 6"
            />

            <g v-for="row in layout.rows" :key="row.alley.id">
              <!-- Aisle band behind the racks -->
              <rect
                :x="PAD + ROW_LABEL_W - 8"
                :y="row.y - 10"
                :width="layout.width - (PAD + ROW_LABEL_W) - PAD + 16"
                :height="RACK_H + 20"
                rx="10"
                :fill="aisleFill(row.alley.aisle)"
                :stroke="aisleStroke(row.alley.aisle)"
                stroke-width="1"
              />

              <!-- Row label -->
              <text :x="PAD" :y="row.y + RACK_H / 2 + 5" class="rp-floor-rowlabel">{{ row.alley.name }}</text>
              <text :x="PAD" :y="row.y + RACK_H / 2 + 22" class="rp-floor-rowaisle" :class="row.alley.aisle === 'hot' ? 'rp-t-hot' : 'rp-t-cold'">
                {{ row.alley.aisle === 'hot' ? 'HOT' : 'COLD' }}
              </text>

              <!-- Racks -->
              <g
                v-for="r in row.racks"
                :key="r.rid"
                class="rp-floor-rack"
                :class="{ 'rp-hovered': hovered === r.rid }"
                @click="open(r.rid)"
                @mouseenter="hovered = r.rid"
                @mouseleave="hovered = null"
                role="button"
                tabindex="0"
                :aria-label="`Rack ${r.rack?.label}`"
                @keydown.enter="open(r.rid)"
              >
                <rect
                  :x="r.x" :y="r.y" :width="RACK_W" :height="RACK_H" rx="6"
                  :fill="rackFillColor(row.alley.aisle, r.fill)"
                  :stroke="aisleStroke(row.alley.aisle)" stroke-width="1.5"
                />
                <!-- fill bar at bottom of rack -->
                <rect
                  :x="r.x + 6" :y="r.y + RACK_H - 12" :width="RACK_W - 12" height="5" rx="2.5"
                  fill="rgba(0,0,0,0.08)"
                />
                <rect
                  :x="r.x + 6" :y="r.y + RACK_H - 12" :width="(RACK_W - 12) * (r.fill / 100)" height="5" rx="2.5"
                  fill="var(--semantics-actions-primary-default-background-color, #154273)"
                />
                <text :x="r.x + RACK_W / 2" :y="r.y + 22" text-anchor="middle" class="rp-floor-racklabel">{{ r.rack?.label }}</text>
                <text :x="r.x + RACK_W / 2" :y="r.y + 36" text-anchor="middle" class="rp-floor-rackmeta">{{ r.fill }}% · {{ r.watts }}W</text>
                <!-- warn dot -->
                <circle v-if="r.hasWarn" :cx="r.x + RACK_W - 10" :cy="r.y + 10" r="4.5" fill="#e08c00" stroke="#fff" stroke-width="1" />
              </g>
            </g>
          </svg>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-inline-dialog
      v-else
      title="Zaal nog leeg"
      :supporting-text="`${dc.name} is ${dc.status}. Er zijn nog geen rijen ingericht.`"
    ></nldd-inline-dialog>
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Datacenter niet gevonden" :crumbs="[{ text: 'Datacenters', href: '/fysiek' }]" />
    <nldd-inline-dialog title="Onbekend datacenter" supporting-text="Dit datacenter bestaat niet."></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.82rem;
}
.rp-leg-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-leg-fade {
  opacity: 0.6;
}
.rp-leg-swatch {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.rp-leg-cold {
  background: rgba(33, 99, 196, 0.35);
  border-color: rgba(33, 99, 196, 0.6);
}
.rp-leg-hot {
  background: rgba(213, 43, 30, 0.35);
  border-color: rgba(213, 43, 30, 0.6);
}
.rp-leg-warn {
  background: #e08c00;
  border-color: #b06f00;
}
.rp-floor-wrap {
  overflow-x: auto;
}
.rp-floor-svg {
  width: 100%;
  min-width: 520px;
  height: auto;
  display: block;
}
.rp-floor-rowlabel {
  font-size: 14px;
  font-weight: 700;
  fill: var(--semantics-text-default-color, #1a1a1a);
}
.rp-floor-rowaisle {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.rp-t-hot {
  fill: #d52b1e;
}
.rp-t-cold {
  fill: #2163c4;
}
.rp-floor-rack {
  cursor: pointer;
}
.rp-floor-rack rect:first-child {
  transition: transform 0.12s ease, filter 0.12s ease;
}
.rp-floor-rack.rp-hovered rect:first-child {
  filter: brightness(1.05) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.18));
}
.rp-floor-racklabel {
  font-size: 13px;
  font-weight: 700;
  font-family: ui-monospace, monospace;
  fill: var(--semantics-text-default-color, #1a1a1a);
  pointer-events: none;
}
.rp-floor-rackmeta {
  font-size: 10px;
  fill: var(--semantics-text-default-color, #1a1a1a);
  opacity: 0.7;
  pointer-events: none;
}
</style>
