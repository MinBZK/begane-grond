<script setup>
// The exploded-view viewer: one big hand-drawn vertical illustration of the
// whole Begane Grond stack (img/stack.png) that we ZOOM INTO, one layer at a
// time. On the hero the whole drawing is fitted in view; descending/climbing to
// a layer pans+zooms to that layer's focusY. Pure CSS transform on an <img>, so
// it stays razor-sharp (the source is ~3072x5504) and needs no WebGL.
import { computed } from 'vue';
import { stackImage, lagen, layerByKey } from './lagen.js';

const props = defineProps({
  // key of the layer to focus, or null on the hero (whole image fitted)
  activeLayer: { type: String, default: null },
  // 'hero' = whole stack; 'zoom' = zoomed into the active layer
  mode: { type: String, default: 'hero' },
  // how hard we zoom into a layer (1 = fit width). Tunable per taste.
  zoom: { type: Number, default: 2.35 },
});
const emit = defineEmits(['pick']);

const active = computed(() => (props.activeLayer ? layerByKey(props.activeLayer) : null));

// The image is positioned by translating it so the active layer's focusY sits
// at the vertical center of the viewport, then scaling up. We work in
// percentages of the image so it is resolution-independent.
const imgStyle = computed(() => {
  if (props.mode !== 'zoom' || !active.value) {
    // Hero: fit the whole image, centered, gently breathing in.
    return {
      transform: 'translate(-50%, -50%) scale(1)',
      transformOrigin: 'center center',
    };
  }
  const scale = props.zoom;
  const fy = active.value.focusY; // 0..1 in image space
  // After scaling about the image center, the layer at fraction fy is offset
  // from center by (fy - 0.5) of the (scaled) image height. Translate it back
  // to center, then bias it UP so the layer sits in the upper ~60% of the rail,
  // clear of the slide text overlaid across the lower part. The bias is in vh.
  const shiftPct = (0.5 - fy) * 100 * scale;
  const upBiasVh = 14; // push the focal layer up, leaving room for text below
  return {
    transform: `translate(-50%, calc(-50% + ${shiftPct}% - ${upBiasVh}vh)) scale(${scale})`,
    transformOrigin: 'center center',
  };
});

// Clickable hotspots: invisible bands over each layer so the viewer can jump
// straight to a layer by clicking it (only meaningful on the hero). Positioned
// at each layer's focusY.
const bands = computed(() =>
  lagen.map((l) => ({ key: l.key, topPct: l.focusY * 100 })),
);
</script>

<template>
  <div class="stackzoom" :class="`mode-${mode}`">
    <div class="stack-frame">
      <img :src="stackImage" class="stack-img" :style="imgStyle" alt="" draggable="false" />
      <!-- hero-only hotspots to jump to a layer -->
      <div v-if="mode === 'hero'" class="hotspots">
        <button
          v-for="b in bands"
          :key="b.key"
          type="button"
          class="hotspot"
          :style="{ top: `calc(${b.topPct}% - 5%)` }"
          :aria-label="`Spring naar ${b.key}`"
          @click="emit('pick', b.key)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stackzoom {
  position: absolute;
  inset: 0;
  overflow: hidden;
  /* No paper backdrop: the drawing is a narrow vertical strip, and the area
     beside it should show the deck's Rijksblauw, not light paper bands. */
  background: transparent;
}
.stack-frame {
  position: absolute;
  inset: 0;
}
/* The image is centered via its own translate; width chosen so the whole tall
   drawing fits the viewport height at scale 1 (hero). object-fit keeps it crisp. */
.stack-img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  max-width: none;
  user-select: none;
  /* The signature move: smooth cinematic pan+zoom between layers. */
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.hotspots {
  position: absolute;
  inset: 0;
}
.hotspot {
  position: absolute;
  left: 0;
  width: 100%;
  height: 11%;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.hotspot:hover {
  background: rgba(21, 66, 115, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .stack-img {
    transition: none;
  }
}
</style>
