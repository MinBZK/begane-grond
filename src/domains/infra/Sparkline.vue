<script setup>
// Tiny inline SVG sparkline: a filled area under a smooth-ish line. Used on the
// instance detail page for mock CPU / memory / latency series. No dependencies.
import { computed } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  color: { type: String, default: '#154273' },
  height: { type: Number, default: 40 },
  width: { type: Number, default: 320 },
});

const min = computed(() => Math.min(...props.data));
const max = computed(() => Math.max(...props.data));

// Map data points to SVG coordinates within a small vertical padding.
const points = computed(() => {
  const n = props.data.length;
  const pad = 3;
  const h = props.height;
  const w = props.width;
  const range = max.value - min.value || 1;
  return props.data.map((v, i) => {
    const x = n === 1 ? 0 : (i / (n - 1)) * w;
    const y = h - pad - ((v - min.value) / range) * (h - pad * 2);
    return [x, y];
  });
});

const linePath = computed(() => points.value.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' '));
const areaPath = computed(() => {
  const w = props.width;
  const h = props.height;
  const head = points.value.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  return `${head} L${w},${h} L0,${h} Z`;
});

const gid = `spark-${Math.random().toString(36).slice(2, 8)}`;
</script>

<template>
  <svg
    class="rp-spark"
    :viewBox="`0 0 ${width} ${height}`"
    preserveAspectRatio="none"
    role="img"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.28" />
        <stop offset="100%" :stop-color="color" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="areaPath" :fill="`url(#${gid})`" />
    <path :d="linePath" fill="none" :stroke="color" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke" />
  </svg>
</template>

<style scoped>
.rp-spark {
  display: block;
  width: 100%;
  height: v-bind('height + "px"');
}
</style>
