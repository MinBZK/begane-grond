<script setup>
// "Hiermee voldoe je aan NeRDS-richtlijn N" provenance banner, the inverse of
// HavenBadge: where Haven marks a screen as a Haven+ service, this marks a
// screen as the place where one of the thirteen NeRDS richtlijnen actually
// lives. NeRDS is not a building block you install; it is a charter, and each
// richtlijn already has a home in Begane Grond. The badge makes that link
// visible on the page itself and links back to the NeRDS hub. One prop, the
// richtlijn id, drives the whole banner via the store, so a page claims its
// richtlijn in a single line: <NerdsBadge richtlijn="veiligheid" />.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';

const props = defineProps({
  richtlijn: { type: String, required: true }, // e.g. 'veiligheid', 'privacy'
});

const store = usePlatformStore();
const r = computed(() => store.richtlijnById(props.richtlijn));
</script>

<template>
  <router-link v-if="r" class="rp-nerds-badge" :to="`/nerds#${r.id}`">
    <span class="rp-nerds-icon">
      <nldd-icon :name="r.icon" aria-hidden="true"></nldd-icon>
    </span>
    <span class="rp-nerds-text">
      <strong>Hiermee voldoe je aan NeRDS-richtlijn {{ r.number }}: {{ r.title }}</strong>
      <span class="rp-nerds-sub">{{ r.tagline }}</span>
    </span>
    <nldd-icon name="chevron-right" aria-hidden="true" class="rp-nerds-out"></nldd-icon>
  </router-link>
</template>

<style scoped>
.rp-nerds-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.95rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
  text-decoration: none;
  color: inherit;
}
.rp-nerds-badge:hover {
  border-color: var(--semantics-actions-primary-default-background-color);
}
.rp-nerds-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 10px;
  /* NeRDS-accent (rijksoverheid-blauw) zodat het oog consistent "NeRDS" leest,
     onderscheidend van de gele Haven-badge. */
  background: #154273;
  color: #fff;
  flex: 0 0 auto;
}
.rp-nerds-icon nldd-icon {
  width: 1.25rem;
  height: 1.25rem;
}
.rp-nerds-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1 1 auto;
  min-width: 0;
}
.rp-nerds-sub {
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-nerds-out {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  flex: 0 0 auto;
}
</style>
