<script setup>
// A learning-path card for a government-standards track (accessibility, security,
// open source). Shows a coloured accent, a progress ring, a module list with
// done/locked states and a deep-link to the relevant standard elsewhere in the
// platform. Local state lets a module be ticked off to feel interactive.
import { ref, computed } from 'vue';

const props = defineProps({
  // standardsPath: { id, name, standard, accent, icon, lede, badge, to, modules }
  path: { type: Object, required: true },
});

const modules = ref(props.path.modules.map((m) => ({ ...m })));

function toggle(i) {
  modules.value[i].done = !modules.value[i].done;
}

const completed = computed(() => modules.value.filter((m) => m.done).length);
const total = computed(() => modules.value.length);
const pct = computed(() => Math.round((completed.value / total.value) * 100));
const totalMinutes = computed(() => modules.value.reduce((sum, m) => sum + (m.minutes || 0), 0));

// SVG progress ring geometry.
const R = 22;
const CIRC = 2 * Math.PI * R;
const dash = computed(() => (pct.value / 100) * CIRC);
</script>

<template>
  <nldd-card :accessible-label="`Leerpad ${path.name}`">
    <nldd-container padding="24">
      <div class="rp-sp-head" :class="`accent-${path.accent}`">
        <span class="rp-sp-icon" aria-hidden="true">
          <nldd-icon :name="path.icon"></nldd-icon>
        </span>
        <div class="rp-sp-titles">
          <nldd-tag :color="path.accent" size="sm">{{ path.badge }}</nldd-tag>
          <nldd-title size="4"><h2>{{ path.name }}</h2></nldd-title>
        </div>
        <svg class="rp-sp-ring" viewBox="0 0 52 52" role="img" :aria-label="`${pct} procent voltooid`">
          <circle class="rp-sp-ring-bg" cx="26" cy="26" :r="R" />
          <circle
            class="rp-sp-ring-fg"
            cx="26" cy="26" :r="R"
            :stroke-dasharray="`${dash} ${CIRC}`"
            transform="rotate(-90 26 26)"
          />
          <text x="26" y="30" text-anchor="middle" class="rp-sp-ring-text">{{ pct }}%</text>
        </svg>
      </div>

      <nldd-spacer size="12" />
      <p class="rp-sp-lede">{{ path.lede }}</p>

      <nldd-spacer size="12" />
      <div class="rp-sp-meta">
        <span><nldd-icon name="books-vertical" aria-hidden="true"></nldd-icon>{{ total }} modules</span>
        <span><nldd-icon name="clock" aria-hidden="true"></nldd-icon>± {{ totalMinutes }} min</span>
        <span><nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>{{ path.standard }}</span>
      </div>

      <nldd-spacer size="16" />

      <ul class="rp-sp-modules">
        <li v-for="(m, i) in modules" :key="i" class="rp-sp-module" :class="{ 'is-done': m.done }">
          <button
            type="button"
            class="rp-sp-check"
            :aria-pressed="m.done"
            :aria-label="`${m.title}${m.done ? ' (afgerond)' : ''}`"
            @click="toggle(i)"
          >
            <nldd-icon :name="m.done ? 'check-mark-circle' : 'circle'" aria-hidden="true"></nldd-icon>
          </button>
          <span class="rp-sp-module-title">{{ m.title }}</span>
          <span class="rp-sp-module-min">{{ m.minutes }} min</span>
        </li>
      </ul>

      <nldd-spacer size="16" />
      <router-link :to="path.to" class="rp-sp-cta">
        <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
        <span>Naar de standaard</span>
      </router-link>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.rp-sp-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.rp-sp-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 12px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-sp-icon nldd-icon {
  width: 1.5rem;
  height: 1.5rem;
}
.accent-accent .rp-sp-icon { background: rgba(0, 112, 156, 0.12); color: #00709c; }
.accent-critical .rp-sp-icon { background: rgba(173, 33, 28, 0.12); color: #ad211c; }
.accent-success .rp-sp-icon { background: rgba(26, 127, 55, 0.12); color: #1a7f37; }
.rp-sp-titles {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.rp-sp-ring {
  width: 3.25rem;
  height: 3.25rem;
  flex-shrink: 0;
}
.rp-sp-ring-bg {
  fill: none;
  stroke: var(--semantics-surfaces-tinted-background-color);
  stroke-width: 6;
}
.rp-sp-ring-fg {
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dasharray 0.4s ease;
}
.accent-accent .rp-sp-ring-fg { stroke: #00709c; }
.accent-critical .rp-sp-ring-fg { stroke: #ad211c; }
.accent-success .rp-sp-ring-fg { stroke: #1a7f37; }
.rp-sp-ring-text {
  font-size: 0.85rem;
  font-weight: 700;
  fill: var(--semantics-text-default-color);
}
.rp-sp-lede {
  margin: 0;
  font-size: 0.88rem;
  opacity: 0.78;
}
.rp-sp-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  font-size: 0.8rem;
  opacity: 0.7;
}
.rp-sp-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-sp-meta nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-sp-modules {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.rp-sp-module {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0;
  border-top: 1px solid var(--semantics-dividers-color);
}
.rp-sp-module:first-child {
  border-top: none;
}
.rp-sp-check {
  flex-shrink: 0;
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  color: var(--semantics-text-default-color);
  opacity: 0.4;
  transition: opacity 0.15s ease, color 0.15s ease;
}
.rp-sp-check nldd-icon {
  width: 1.25rem;
  height: 1.25rem;
}
.rp-sp-module.is-done .rp-sp-check {
  opacity: 1;
  color: var(--semantics-feedback-success-color);
}
.rp-sp-module-title {
  flex: 1;
  font-size: 0.9rem;
}
.rp-sp-module.is-done .rp-sp-module-title {
  text-decoration: line-through;
  opacity: 0.55;
}
.rp-sp-module-min {
  font-size: 0.75rem;
  opacity: 0.55;
  white-space: nowrap;
}
.rp-sp-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color);
}
.rp-sp-cta:hover {
  text-decoration: underline;
}
.rp-sp-cta nldd-icon {
  width: 1rem;
  height: 1rem;
}
</style>
