<script setup>
// A tiny, dependency-free SVG sparkline. Plots a numeric series as a polyline,
// optionally filled below the curve, with a marker on the last point. Used on
// the dashboard tiles and detail panel. Pure presentational; no store access.
import { computed } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  width: { type: Number, default: 160 },
  height: { type: Number, default: 36 },
  color: { type: String, default: 'currentColor' },
  filled: { type: Boolean, default: false },
  axis: { type: Boolean, default: false },
});

const PAD = 3;

const geom = computed(() => {
  const d = props.data;
  if (!d.length) return { points: '', area: '', last: null, min: 0, max: 0 };
  const min = Math.min(...d);
  const max = Math.max(...d);
  const span = max - min || 1;
  const w = props.width - PAD * 2;
  const h = props.height - PAD * 2;
  const step = w / (d.length - 1 || 1);
  const xy = d.map((v, i) => {
    const x = PAD + i * step;
    const y = PAD + h - ((v - min) / span) * h;
    return [x, y];
  });
  const points = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area =
    `${PAD},${(props.height - PAD).toFixed(1)} ` +
    points +
    ` ${(PAD + w).toFixed(1)},${(props.height - PAD).toFixed(1)}`;
  return { points, area, last: xy[xy.length - 1], min, max };
});

const gradId = `sg-${Math.random().toString(36).slice(2, 8)}`;
</script>

<template>
  <svg
    class="rp-spark"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    role="img"
    aria-hidden="true"
  >
    <defs v-if="filled">
      <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.28" />
        <stop offset="100%" :stop-color="color" stop-opacity="0" />
      </linearGradient>
    </defs>

    <line
      v-if="axis"
      :x1="PAD"
      :y1="height - PAD"
      :x2="width - PAD"
      :y2="height - PAD"
      class="rp-spark-axis"
    />

    <polygon v-if="filled" :points="geom.area" :fill="`url(#${gradId})`" />
    <polyline
      :points="geom.points"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
    <circle
      v-if="geom.last"
      :cx="geom.last[0]"
      :cy="geom.last[1]"
      r="2.6"
      :fill="color"
    />
  </svg>
</template>

<style scoped>
.rp-spark {
  display: block;
  overflow: visible;
}
.rp-spark-axis {
  stroke: var(--semantics-dividers-color);
  stroke-width: 1;
  stroke-dasharray: 2 2;
}
</style>
