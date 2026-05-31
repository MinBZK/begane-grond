<script setup>
// The "layer stacking" visual that ties the platform together: physical at the
// bottom, infra in the middle, apps on top. Each layer is clickable and shows a
// live count plus a couple of example entities from the store, so the demo
// immediately communicates "everything here connects".
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';

const store = usePlatformStore();

const layers = computed(() => [
  {
    key: 'apps',
    title: 'Applicaties',
    sub: 'Wat burgers en ambtenaren gebruiken',
    icon: 'rectangle-stack',
    to: '/apps',
    accent: 'var(--rp-layer-apps)',
    count: store.apps.length,
    countLabel: 'apps',
    chips: store.apps.slice(0, 4).map((a) => ({ text: a.name, to: `/apps/${a.id}` })),
  },
  {
    key: 'infra',
    title: 'Infra-diensten',
    sub: 'Kubernetes, databases, brokers, LLM',
    icon: 'cylinder-split',
    to: '/infra/instances',
    accent: 'var(--rp-layer-infra)',
    count: store.instances.length,
    countLabel: 'instances',
    chips: store.instances.slice(0, 4).map((i) => ({ text: i.name, to: `/infra/instances/${i.id}` })),
  },
  {
    key: 'fysiek',
    title: 'Fysieke infra',
    sub: 'Datacenters, racks, bekabeling, inkoop',
    icon: 'apartment-building',
    to: '/fysiek',
    accent: 'var(--rp-layer-fysiek)',
    count: store.racks.length,
    countLabel: 'racks',
    chips: store.datacenters.map((d) => ({ text: d.name, to: `/fysiek/datacenters/${d.id}` })),
  },
]);
</script>

<template>
  <div class="rp-stack">
    <router-link
      v-for="(layer, idx) in layers"
      :key="layer.key"
      :to="layer.to"
      class="rp-layer"
      :style="{ '--rp-accent': layer.accent, zIndex: layers.length - idx }"
    >
      <div class="rp-layer-icon">
        <nldd-icon :name="layer.icon" aria-hidden="true"></nldd-icon>
      </div>
      <div class="rp-layer-body">
        <div class="rp-layer-head">
          <span class="rp-layer-title">{{ layer.title }}</span>
          <span class="rp-layer-count">{{ layer.count }} {{ layer.countLabel }}</span>
        </div>
        <div class="rp-layer-sub">{{ layer.sub }}</div>
        <div class="rp-layer-chips">
          <span v-for="c in layer.chips" :key="c.to" class="rp-layer-chip">{{ c.text }}</span>
        </div>
      </div>
      <nldd-icon name="chevron-right" aria-hidden="true" class="rp-layer-go"></nldd-icon>
    </router-link>
    <div class="rp-stack-spine" aria-hidden="true">
      <span>persoon</span>
      <span>team</span>
      <span>app</span>
      <span>instance</span>
      <span>rack</span>
      <span>datacenter</span>
    </div>
  </div>
</template>

<style scoped>
.rp-stack {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.rp-layer {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--semantics-dividers-color);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--rp-accent) 10%, transparent), transparent 55%),
    var(--semantics-surfaces-default-background-color, #fff);
  border-left: 5px solid var(--rp-accent);
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.rp-layer:hover {
  transform: translateX(3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.rp-layer-icon {
  flex: 0 0 auto;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--rp-accent) 18%, transparent);
}
.rp-layer-icon nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
  color: var(--rp-accent);
}
.rp-layer-body {
  flex: 1 1 auto;
  min-width: 0;
}
.rp-layer-head {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-layer-title {
  font-weight: 700;
  font-size: 1.05rem;
}
.rp-layer-count {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--rp-accent);
}
.rp-layer-sub {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 0.1rem;
}
.rp-layer-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}
.rp-layer-chip {
  font-size: 0.72rem;
  font-family: var(--rp-mono, ui-monospace, monospace);
  padding: 0.12rem 0.45rem;
  border-radius: 6px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
  white-space: nowrap;
}
.rp-layer-go {
  flex: 0 0 auto;
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.4;
}
.rp-stack-spine {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.4rem;
  padding-left: 0.2rem;
  font-size: 0.72rem;
  opacity: 0.55;
}
.rp-stack-spine span:not(:last-child)::after {
  content: '›';
  margin-left: 0.35rem;
  opacity: 0.6;
}
</style>
