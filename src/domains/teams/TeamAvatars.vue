<script setup>
// A compact stack of member avatars (initials) with an optional overflow chip.
// Used on team tiles and detail screens. Avatars carry a stable per-person hue.
import { computed } from 'vue';

const props = defineProps({
  people: { type: Array, default: () => [] }, // [{ id, name, avatar }]
  max: { type: Number, default: 6 },
  size: { type: Number, default: 34 },
});

// Deterministic pastel hue from a string so each person keeps the same colour.
function hueFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i += 1) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
}

const shown = computed(() => props.people.slice(0, props.max));
const overflow = computed(() => Math.max(0, props.people.length - props.max));
</script>

<template>
  <div class="rp-avatars" :style="{ '--rp-av-size': size + 'px' }">
    <span
      v-for="p in shown"
      :key="p.id"
      class="rp-avatar"
      :title="p.name"
      :style="{ background: `hsl(${hueFor(p.id)} 55% 88%)`, color: `hsl(${hueFor(p.id)} 55% 28%)` }"
    >{{ p.avatar }}</span>
    <span v-if="overflow" class="rp-avatar rp-avatar-more">+{{ overflow }}</span>
  </div>
</template>

<style scoped>
.rp-avatars {
  display: flex;
  align-items: center;
}
.rp-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--rp-av-size);
  height: var(--rp-av-size);
  border-radius: 50%;
  font-size: calc(var(--rp-av-size) * 0.36);
  font-weight: 700;
  border: 2px solid var(--semantics-surfaces-base-background-color);
  margin-left: calc(var(--rp-av-size) * -0.28);
}
.rp-avatar:first-child {
  margin-left: 0;
}
.rp-avatar-more {
  background: var(--semantics-surfaces-tinted-background-color);
  color: inherit;
  opacity: 0.85;
}
</style>
