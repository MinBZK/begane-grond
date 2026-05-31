<script setup>
// Renders the cross-layer relations of an entity as clickable chips, so every
// detail page can show "this connects to…" and let the user click through the
// person -> team -> app -> instance -> rack -> datacenter chain.
defineProps({
  title: { type: String, default: 'Gerelateerd' },
  // links: [{ text, to, icon }]
  links: { type: Array, required: true },
});
</script>

<template>
  <nldd-card :accessible-label="title">
    <nldd-container padding="20">
      <nldd-title size="5"><h3>{{ title }}</h3></nldd-title>
      <nldd-spacer size="12" />
      <div class="rp-rel-grid">
        <router-link v-for="l in links" :key="l.to + l.text" :to="l.to" class="rp-rel-chip">
          <nldd-icon v-if="l.icon" :name="l.icon" aria-hidden="true"></nldd-icon>
          <span>{{ l.text }}</span>
          <nldd-icon name="chevron-right" aria-hidden="true" class="rp-rel-chevron"></nldd-icon>
        </router-link>
      </div>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.rp-rel-grid {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-rel-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--semantics-dividers-color);
  text-decoration: none;
  color: inherit;
}
.rp-rel-chip:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-rel-chip nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-rel-chevron {
  margin-left: auto;
  opacity: 0.5;
}
</style>
