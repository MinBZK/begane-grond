<script setup>
// Tech radar: a real SVG radar with four quadrants (talen / tools / platforms /
// technieken) crossed with four concentric rings (adopt / trial / assess / hold).
// Every entry from store.techRadar is placed deterministically inside its
// quadrant+ring sector as a numbered blip. Blips are clickable and highlight a
// matching row in the legend (and vice versa), with a detail panel on the side.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// --- Taxonomy -------------------------------------------------------------
// Quadrant order is clockwise starting top-right. Each quadrant owns a 90°
// angular wedge; rings split the radius into four bands.
const QUADRANTS = [
  { key: 'talen', label: 'Talen', icon: 'terminal', a0: -90, a1: 0, accent: '#154273' },
  { key: 'tools', label: 'Tools', icon: 'gear', a0: 0, a1: 90, accent: '#39870c' },
  { key: 'platforms', label: 'Platforms', icon: 'cloud', a0: 90, a1: 180, accent: '#a90061' },
  { key: 'technieken', label: 'Technieken', icon: 'sparkles', a0: 180, a1: 270, accent: '#b34c00' },
];

// Rings from the centre out. The inner ring (adopt) is the strongest advice.
const RINGS = [
  { key: 'adopt', label: 'Adopt', advice: 'Standaard. Gebruik dit, tenzij er een goede reden is om af te wijken.', tone: 'success' },
  { key: 'trial', label: 'Trial', advice: 'Veelbelovend. Inzetbaar in projecten die het risico kunnen dragen.', tone: 'accent' },
  { key: 'assess', label: 'Assess', advice: 'Verkennen. De moeite waard om te onderzoeken, nog geen advies.', tone: 'warning' },
  { key: 'hold', label: 'Hold', advice: 'Terughoudend. Niet nieuw inzetten; bestaande inzet afbouwen.', tone: 'critical' },
];

// --- Geometry -------------------------------------------------------------
const SIZE = 720; // viewBox is square
const CENTER = SIZE / 2;
const R_MAX = 320; // outer radius of the hold ring
const RING_R = RINGS.map((_, i) => R_MAX * ((i + 1) / RINGS.length)); // outer radius per ring

function ringInner(i) {
  return i === 0 ? 0 : RING_R[i - 1];
}

const DEG = Math.PI / 180;

// Deterministic pseudo-random in [0,1) from a string seed, so blips do not
// jump around between renders but still spread out within a sector.
function seeded(str, salt) {
  let h = 2166136261 ^ salt;
  const s = `${str}|${salt}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

function polar(cx, cy, r, angleDeg) {
  const a = angleDeg * DEG;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// SVG path for one quadrant+ring sector (an annular wedge).
function sectorPath(qi, ri) {
  const q = QUADRANTS[qi];
  const rOuter = RING_R[ri];
  const rInner = ringInner(ri);
  const pad = 1.4; // small angular gap so quadrants read as separate
  const a0 = q.a0 + pad;
  const a1 = q.a1 - pad;
  const o0 = polar(CENTER, CENTER, rOuter, a0);
  const o1 = polar(CENTER, CENTER, rOuter, a1);
  if (rInner === 0) {
    return `M ${CENTER} ${CENTER} L ${o0.x} ${o0.y} A ${rOuter} ${rOuter} 0 0 1 ${o1.x} ${o1.y} Z`;
  }
  const i1 = polar(CENTER, CENTER, rInner, a1);
  const i0 = polar(CENTER, CENTER, rInner, a0);
  return [
    `M ${o0.x} ${o0.y}`,
    `A ${rOuter} ${rOuter} 0 0 1 ${o1.x} ${o1.y}`,
    `L ${i1.x} ${i1.y}`,
    `A ${rInner} ${rInner} 0 0 0 ${i0.x} ${i0.y}`,
    'Z',
  ].join(' ');
}

// Build the placed blips: spread each blip inside the wedge of its sector,
// avoiding the radial edges, with a stable position per name.
const blips = computed(() => {
  const out = [];
  let n = 0;
  for (let qi = 0; qi < QUADRANTS.length; qi++) {
    const q = QUADRANTS[qi];
    for (let ri = 0; ri < RINGS.length; ri++) {
      const ring = RINGS[ri];
      const here = store.techRadar.filter((t) => t.quadrant === q.key && t.ring === ring.key);
      const rInner = ringInner(ri);
      const rOuter = RING_R[ri];
      here.forEach((item) => {
        n += 1;
        const ja = seeded(item.name, 1);
        const jr = seeded(item.name, 2);
        // angle: keep away from the 1.4° gaps and the exact quadrant edges
        const angle = q.a0 + 12 + ja * (90 - 24);
        // radius: keep off the ring boundaries
        const r = rInner + 14 + jr * (rOuter - rInner - 28);
        const p = polar(CENTER, CENTER, r, angle);
        out.push({
          n,
          name: item.name,
          quadrant: q.key,
          quadrantLabel: q.label,
          ring: ring.key,
          ringLabel: ring.label,
          accent: q.accent,
          x: p.x,
          y: p.y,
        });
      });
    }
  }
  return out;
});

// Legend grouped by quadrant for the list under the radar.
const legendByQuadrant = computed(() =>
  QUADRANTS.map((q) => ({
    ...q,
    items: blips.value.filter((b) => b.quadrant === q.key),
  })),
);

const ringCounts = computed(() =>
  RINGS.map((r) => ({
    ...r,
    count: store.techRadar.filter((t) => t.ring === r.key).length,
  })),
);

// --- Interaction ----------------------------------------------------------
const selected = ref(null); // blip n
const hovered = ref(null);

const active = computed(() => {
  const id = hovered.value ?? selected.value;
  return blips.value.find((b) => b.n === id) || null;
});

function pick(b) {
  selected.value = selected.value === b.n ? null : b.n;
}

const activeAdvice = computed(() => {
  if (!active.value) return '';
  const ring = RINGS.find((r) => r.key === active.value.ring);
  return ring ? ring.advice : '';
});

// Label angle for the curved ring names, placed along the top vertical axis.
function ringLabelY(ri) {
  return CENTER - (ringInner(ri) + (RING_R[ri] - ringInner(ri)) / 2);
}

// Quadrant heading anchor points (mid-angle, just outside the radar).
function quadrantLabelPos(q) {
  const mid = (q.a0 + q.a1) / 2;
  const p = polar(CENTER, CENTER, R_MAX + 34, mid);
  return p;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Tech radar"
      lede="Het technologie-kompas van het Begane Grond. Vier kwadranten (talen, tools, platforms, technieken) tegen vier ringen van advies (adopt, trial, assess, hold). Klik een blip voor het advies."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Tech radar', href: '/tech-radar' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Bekijk LLM-modellen" start-icon="sparkles" href="/ai/llm"></nldd-button>
      </template>
    </PageHeader>

    <!-- Ring summary as KPI tiles -->
    <nldd-collection layout="grid" item-width="220px">
      <MetricCard
        v-for="r in ringCounts"
        :key="r.key"
        :value="r.count"
        :label="r.label"
        :sub="`${r.advice.split('.')[0]}.`"
        icon="starburst-filled"
      />
    </nldd-collection>

    <nldd-spacer size="24" />

    <div class="rp-radar-grid">
      <!-- The radar itself -->
      <nldd-card accessible-label="Tech radar">
        <nldd-container padding="20">
          <div class="rp-radar-wrap">
            <svg
              :viewBox="`0 0 ${SIZE} ${SIZE}`"
              class="rp-radar-svg"
              role="group"
              aria-label="Tech radar diagram"
            >
              <defs>
                <radialGradient id="rp-radar-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="rgba(21,66,115,0.06)" />
                  <stop offset="100%" stop-color="rgba(21,66,115,0)" />
                </radialGradient>
              </defs>

              <!-- soft glow behind the radar -->
              <circle :cx="CENTER" :cy="CENTER" :r="R_MAX + 6" fill="url(#rp-radar-glow)" />

              <!-- sectors: ring tint deepens toward the centre -->
              <g class="rp-sectors">
                <template v-for="(q, qi) in QUADRANTS" :key="q.key">
                  <path
                    v-for="(ring, ri) in RINGS"
                    :key="ring.key"
                    :d="sectorPath(qi, ri)"
                    :fill="q.accent"
                    :fill-opacity="0.16 - ri * 0.032"
                    :stroke="q.accent"
                    stroke-opacity="0.28"
                    stroke-width="1"
                    :class="{ 'rp-sector-dim': active && active.quadrant !== q.key }"
                  />
                </template>
              </g>

              <!-- ring outlines -->
              <circle
                v-for="(r, ri) in RING_R"
                :key="`ro-${ri}`"
                :cx="CENTER"
                :cy="CENTER"
                :r="r"
                fill="none"
                stroke="rgba(0,0,0,0.16)"
                stroke-width="1"
              />

              <!-- quadrant divider axes -->
              <line :x1="CENTER" :y1="CENTER - R_MAX" :x2="CENTER" :y2="CENTER + R_MAX" stroke="rgba(0,0,0,0.22)" stroke-width="1.5" />
              <line :x1="CENTER - R_MAX" :y1="CENTER" :x2="CENTER + R_MAX" :y2="CENTER" stroke="rgba(0,0,0,0.22)" stroke-width="1.5" />

              <!-- ring labels along the top axis -->
              <g class="rp-ring-labels">
                <text
                  v-for="(ring, ri) in RINGS"
                  :key="`rl-${ring.key}`"
                  :x="CENTER + 6"
                  :y="ringLabelY(ri) + 4"
                  class="rp-ring-label"
                >
                  {{ ring.label }}
                </text>
              </g>

              <!-- quadrant headings -->
              <g class="rp-quad-labels">
                <text
                  v-for="q in QUADRANTS"
                  :key="`ql-${q.key}`"
                  :x="quadrantLabelPos(q).x"
                  :y="quadrantLabelPos(q).y"
                  text-anchor="middle"
                  class="rp-quad-label"
                  :style="{ fill: q.accent }"
                >
                  {{ q.label }}
                </text>
              </g>

              <!-- blips -->
              <g
                v-for="b in blips"
                :key="b.n"
                class="rp-blip"
                :class="{
                  'rp-blip-active': active && active.n === b.n,
                  'rp-blip-dim': active && active.n !== b.n,
                }"
                @click="pick(b)"
                @mouseenter="hovered = b.n"
                @mouseleave="hovered = null"
                role="button"
                tabindex="0"
                :aria-label="`${b.name}, ${b.quadrantLabel}, ${b.ringLabel}`"
                @keydown.enter="pick(b)"
              >
                <circle :cx="b.x" :cy="b.y" r="16" :fill="b.accent" />
                <circle :cx="b.x" :cy="b.y" r="16" fill="none" stroke="#fff" stroke-width="2" />
                <text :x="b.x" :y="b.y + 5" text-anchor="middle" class="rp-blip-n">{{ b.n }}</text>
              </g>
            </svg>
          </div>
        </nldd-container>
      </nldd-card>

      <!-- Detail / legend side panel -->
      <div class="rp-radar-side">
        <nldd-card accessible-label="Selectie">
          <nldd-container padding="20">
            <template v-if="active">
              <div class="rp-detail-head">
                <span class="rp-detail-dot" :style="{ background: active.accent }">{{ active.n }}</span>
                <nldd-title size="4"><h2>{{ active.name }}</h2></nldd-title>
              </div>
              <nldd-spacer size="8" />
              <div class="rp-detail-tags">
                <nldd-tag color="neutral" size="md">{{ active.quadrantLabel }}</nldd-tag>
                <StatusBadge :status="active.ringLabel" />
              </div>
              <nldd-spacer size="12" />
              <nldd-rich-text>
                <p>{{ activeAdvice }}</p>
              </nldd-rich-text>
              <nldd-spacer size="8" />
              <nldd-button
                v-if="selected"
                variant="secondary"
                text="Selectie wissen"
                start-icon="dismiss"
                @click="selected = null"
              ></nldd-button>
            </template>
            <template v-else>
              <nldd-title size="4"><h2>Het kompas lezen</h2></nldd-title>
              <nldd-spacer size="8" />
              <nldd-rich-text>
                <p>Hoe dichter bij het midden, hoe sterker het advies. Beweeg over een blip of klik erop voor de uitleg.</p>
              </nldd-rich-text>
            </template>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="16" />

        <nldd-card accessible-label="Ringen">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Ringen</h3></nldd-title>
            <nldd-spacer size="8" />
            <div v-for="r in RINGS" :key="r.key" class="rp-ring-row">
              <nldd-tag :color="r.tone" size="md">{{ r.label }}</nldd-tag>
              <span class="rp-ring-advice">{{ r.advice }}</span>
            </div>
          </nldd-container>
        </nldd-card>
      </div>
    </div>

    <nldd-spacer size="24" />

    <!-- Full legend grouped by quadrant -->
    <nldd-title size="4"><h2>Legenda</h2></nldd-title>
    <nldd-spacer size="12" />
    <nldd-collection layout="grid" item-width="320px">
      <nldd-card v-for="q in legendByQuadrant" :key="q.key" :accessible-label="q.label">
        <nldd-container padding="20">
          <div class="rp-leg-head" :style="{ color: q.accent }">
            <nldd-icon :name="q.icon" aria-hidden="true"></nldd-icon>
            <span>{{ q.label }}</span>
          </div>
          <nldd-spacer size="12" />
          <div
            v-for="b in q.items"
            :key="b.n"
            class="rp-leg-row"
            :class="{ 'rp-leg-active': active && active.n === b.n }"
            @click="pick(b)"
            @mouseenter="hovered = b.n"
            @mouseleave="hovered = null"
            role="button"
            tabindex="0"
            @keydown.enter="pick(b)"
          >
            <span class="rp-leg-dot" :style="{ background: q.accent }">{{ b.n }}</span>
            <span class="rp-leg-name">{{ b.name }}</span>
            <StatusBadge :status="b.ringLabel" />
          </div>
          <nldd-rich-text v-if="!q.items.length">
            <p class="rp-leg-empty">Nog geen items in dit kwadrant.</p>
          </nldd-rich-text>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="24" />

    <CliHint command="bg radar list --ring adopt" label="Toon alle 'adopt'-technologieën via de CLI" />
  </div>
</template>

<style scoped>
.rp-radar-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(260px, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-radar-grid {
    grid-template-columns: 1fr;
  }
}
.rp-radar-wrap {
  width: 100%;
}
.rp-radar-svg {
  width: 100%;
  height: auto;
  display: block;
  user-select: none;
}
.rp-sectors path {
  transition: fill-opacity 0.15s ease;
}
.rp-sector-dim {
  fill-opacity: 0.04 !important;
}
.rp-ring-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  fill: rgba(0, 0, 0, 0.45);
}
.rp-quad-label {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.rp-blip {
  cursor: pointer;
}
.rp-blip circle:first-child {
  transition: transform 0.12s ease, filter 0.12s ease;
  transform-box: fill-box;
  transform-origin: center;
}
.rp-blip:hover circle:first-child,
.rp-blip-active circle:first-child {
  filter: drop-shadow(0 3px 7px rgba(0, 0, 0, 0.35));
  transform: scale(1.18);
}
.rp-blip-dim {
  opacity: 0.32;
  transition: opacity 0.15s ease;
}
.rp-blip-n {
  font-size: 13px;
  font-weight: 700;
  fill: #fff;
  pointer-events: none;
  font-family: ui-monospace, monospace;
}
.rp-detail-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-detail-dot {
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  font-family: ui-monospace, monospace;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.rp-detail-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-ring-row {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 0.6rem;
  align-items: start;
  padding: 0.4rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
}
.rp-ring-row:first-of-type {
  border-top: none;
}
.rp-ring-advice {
  font-size: 0.82rem;
  opacity: 0.75;
  line-height: 1.35;
}
.rp-leg-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 1.05rem;
}
.rp-leg-head nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
}
.rp-leg-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.5rem;
  margin: 0 -0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s ease;
}
.rp-leg-row:hover,
.rp-leg-active {
  background: rgba(21, 66, 115, 0.08);
}
.rp-leg-dot {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  font-family: ui-monospace, monospace;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}
.rp-leg-name {
  flex: 1;
  font-weight: 600;
}
.rp-leg-empty {
  opacity: 0.6;
  font-size: 0.85rem;
}
</style>
