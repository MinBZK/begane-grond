<script setup>
// Stylised inline-SVG illustrations per device type, drawn in NLDD token
// colours. No copyrighted product photos: clean, scalable, on-brand line art
// for laptop / framework / workstation / tablet / phone. `type` selects the
// drawing; the framework variant adds a modular-corner motif (repairable).
defineProps({
  type: { type: String, default: 'laptop' }, // laptop|framework|workstation|tablet|phone
});
</script>

<template>
  <div class="rp-device" :data-type="type" aria-hidden="true">
    <!-- Laptop -->
    <svg v-if="type === 'laptop'" viewBox="0 0 160 110" class="rp-device-svg">
      <rect x="30" y="18" width="100" height="62" rx="5" class="rp-d-body" />
      <rect x="37" y="25" width="86" height="48" rx="2" class="rp-d-screen" />
      <path d="M18 84 H142 L150 96 H10 Z" class="rp-d-body" />
      <rect x="66" y="86" width="28" height="4" rx="2" class="rp-d-notch" />
    </svg>

    <!-- Framework (modular laptop): same form + screw/module accents -->
    <svg v-else-if="type === 'framework'" viewBox="0 0 160 110" class="rp-device-svg">
      <rect x="30" y="18" width="100" height="62" rx="5" class="rp-d-body" />
      <rect x="37" y="25" width="86" height="48" rx="2" class="rp-d-screen" />
      <path d="M18 84 H142 L150 96 H10 Z" class="rp-d-body" />
      <rect x="66" y="86" width="28" height="4" rx="2" class="rp-d-notch" />
      <!-- module bays along the side + corner screws (repairable motif) -->
      <circle cx="35" cy="23" r="2" class="rp-d-accent" />
      <circle cx="125" cy="23" r="2" class="rp-d-accent" />
      <circle cx="35" cy="75" r="2" class="rp-d-accent" />
      <circle cx="125" cy="75" r="2" class="rp-d-accent" />
      <rect x="14" y="86" width="10" height="9" rx="1.5" class="rp-d-accent-fill" />
      <rect x="136" y="86" width="10" height="9" rx="1.5" class="rp-d-accent-fill" />
    </svg>

    <!-- Workstation (tower + small monitor) -->
    <svg v-else-if="type === 'workstation'" viewBox="0 0 160 110" class="rp-device-svg">
      <rect x="22" y="22" width="40" height="74" rx="5" class="rp-d-body" />
      <line x1="30" y1="32" x2="54" y2="32" class="rp-d-line" />
      <line x1="30" y1="40" x2="54" y2="40" class="rp-d-line" />
      <circle cx="42" cy="84" r="4" class="rp-d-accent" />
      <rect x="78" y="30" width="62" height="42" rx="4" class="rp-d-body" />
      <rect x="84" y="36" width="50" height="30" rx="2" class="rp-d-screen" />
      <rect x="100" y="74" width="18" height="14" class="rp-d-body" />
      <rect x="88" y="88" width="42" height="5" rx="2" class="rp-d-body" />
    </svg>

    <!-- Tablet -->
    <svg v-else-if="type === 'tablet'" viewBox="0 0 160 110" class="rp-device-svg">
      <rect x="46" y="14" width="68" height="84" rx="8" class="rp-d-body" />
      <rect x="53" y="22" width="54" height="64" rx="2" class="rp-d-screen" />
      <circle cx="80" cy="92" r="2.5" class="rp-d-accent" />
    </svg>

    <!-- Phone -->
    <svg v-else viewBox="0 0 160 110" class="rp-device-svg">
      <rect x="60" y="10" width="40" height="90" rx="8" class="rp-d-body" />
      <rect x="65" y="18" width="30" height="70" rx="2" class="rp-d-screen" />
      <rect x="73" y="13" width="14" height="2.5" rx="1.2" class="rp-d-notch" />
      <circle cx="80" cy="93" r="2.5" class="rp-d-accent" />
    </svg>
  </div>
</template>

<style scoped>
.rp-device {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--semantics-surfaces-tinted-background-color);
  border-radius: 10px;
  padding: 0.5rem;
  aspect-ratio: 16 / 10;
}
.rp-device-svg {
  width: 100%;
  height: 100%;
  max-height: 150px;
}
/* NLDD-token line art: body in the brand blue, screen tinted, accents lint. */
.rp-d-body {
  fill: none;
  stroke: var(--primitives-color-donkerblauw-600, #154273);
  stroke-width: 3;
  stroke-linejoin: round;
}
.rp-d-screen {
  fill: var(--primitives-color-lintblauw-100, #cfe3f5);
  stroke: var(--primitives-color-donkerblauw-600, #154273);
  stroke-width: 1.5;
}
.rp-d-notch {
  fill: var(--primitives-color-donkerblauw-600, #154273);
}
.rp-d-line {
  stroke: var(--primitives-color-donkerblauw-400, #4a7ba6);
  stroke-width: 2;
  stroke-linecap: round;
}
.rp-d-accent {
  fill: none;
  stroke: var(--primitives-color-lintblauw-500, #4f9bd9);
  stroke-width: 2;
}
.rp-d-accent-fill {
  fill: var(--primitives-color-lintblauw-400, #7bb5e3);
}
:global(.dark) .rp-d-body,
:global(.dark) .rp-d-screen {
  stroke: var(--primitives-color-lintblauw-300, #9ecbed);
}
:global(.dark) .rp-d-screen {
  fill: var(--primitives-color-donkerblauw-700, #0f3050);
}
:global(.dark) .rp-d-notch {
  fill: var(--primitives-color-lintblauw-300, #9ecbed);
}
</style>
