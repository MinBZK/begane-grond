<script setup>
// The shared spine across the four Domeinen & DNS screens: Domeinen ·
// Naamruimtes · Aanvragen. Same pill style as the status filter in Domeinen.vue
// so it reads as one section. The active pill is matched on the route path.
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';

const route = useRoute();
const store = usePlatformStore();

const items = [
  { label: 'Domeinen', to: '/dns', match: (p) => p === '/dns' || /^\/dns\/dom-/.test(p) },
  { label: 'Naamruimtes', to: '/dns/naamruimtes', match: (p) => p === '/dns/naamruimtes' },
  { label: 'Aanvragen', to: '/dns/aanvragen', match: (p) => p.startsWith('/dns/aanvragen') },
];

function isActive(item) {
  return item.match(route.path);
}
</script>

<template>
  <div class="rp-subnav">
    <div class="rp-subnav-pills">
      <router-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="rp-cat"
        :class="{ 'rp-cat-on': isActive(item) }"
      >
        {{ item.label }}
        <span v-if="item.label === 'Aanvragen' && store.pendingAanvragen.length" class="rp-subnav-badge">
          {{ store.pendingAanvragen.length }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.rp-subnav {
  display: flex;
  align-items: center;
}
.rp-subnav-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-cat {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  color: inherit;
}
.rp-cat:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-cat-on {
  border-color: var(--semantics-actions-primary-default-background-color);
  background: var(--semantics-surfaces-tinted-background-color);
  font-weight: 700;
}
.rp-subnav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  background: var(--semantics-actions-primary-default-background-color);
  color: var(--semantics-actions-primary-default-foreground-color, #fff);
}
</style>
