<script setup>
// An interactive onboarding-path card. Renders one of store.learningPaths as a
// step-by-step checklist: each step can be ticked off (local state), a progress
// bar reflects completion, and steps carry an optional deep-link into the rest
// of the platform so the path is genuinely clickable, not a dead list.
import { ref, computed } from 'vue';

const props = defineProps({
  // A learning path: { id, name, steps: string[] }
  path: { type: Object, required: true },
  icon: { type: String, default: 'starburst-filled' },
  lede: { type: String, default: '' },
  // Per-step metadata keyed by step index: { hint, to, linkText, icon }
  meta: { type: Array, default: () => [] },
  // How many leading steps start out as completed (demo realism).
  preDone: { type: Number, default: 0 },
});

const done = ref(props.path.steps.map((_, i) => i < props.preDone));

function toggle(i) {
  done.value[i] = !done.value[i];
}

const completed = computed(() => done.value.filter(Boolean).length);
const total = computed(() => props.path.steps.length);
const pct = computed(() => Math.round((completed.value / total.value) * 100));
const finished = computed(() => completed.value === total.value);

// The first not-yet-done step is the "current" focus of the path.
const currentIndex = computed(() => done.value.findIndex((d) => !d));
</script>

<template>
  <nldd-card :accessible-label="path.name">
    <nldd-container padding="24">
      <div class="rp-path-head">
        <span class="rp-path-icon" aria-hidden="true">
          <nldd-icon :name="icon"></nldd-icon>
        </span>
        <div class="rp-path-titles">
          <nldd-title size="4"><h2>{{ path.name }}</h2></nldd-title>
          <p v-if="lede" class="rp-path-lede">{{ lede }}</p>
        </div>
        <nldd-tag :color="finished ? 'success' : 'accent'" size="md">
          {{ finished ? 'Afgerond' : `${completed}/${total}` }}
        </nldd-tag>
      </div>

      <nldd-spacer size="16" />

      <div class="rp-progress" role="progressbar" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100">
        <div class="rp-progress-bar" :class="{ 'is-done': finished }" :style="{ width: pct + '%' }"></div>
      </div>
      <div class="rp-progress-label">
        <span>{{ pct }}% voltooid</span>
        <span v-if="!finished && currentIndex >= 0">Volgende: {{ path.steps[currentIndex] }}</span>
        <span v-else-if="finished">Klaar voor de start</span>
      </div>

      <nldd-spacer size="16" />

      <ol class="rp-steps">
        <li
          v-for="(step, i) in path.steps"
          :key="i"
          class="rp-step"
          :class="{ 'is-done': done[i], 'is-current': i === currentIndex }"
        >
          <button
            type="button"
            class="rp-step-check"
            :aria-pressed="done[i]"
            :aria-label="`Stap ${i + 1}: ${step}${done[i] ? ' (afgerond)' : ''}`"
            @click="toggle(i)"
          >
            <nldd-icon :name="done[i] ? 'check-mark-circle' : 'circle'" aria-hidden="true"></nldd-icon>
          </button>
          <div class="rp-step-body">
            <div class="rp-step-top">
              <span class="rp-step-num">Stap {{ i + 1 }}</span>
              <nldd-tag v-if="i === currentIndex && !finished" color="brand" size="sm">nu</nldd-tag>
            </div>
            <span class="rp-step-text">{{ step }}</span>
            <p v-if="meta[i]?.hint" class="rp-step-hint">{{ meta[i].hint }}</p>
            <router-link v-if="meta[i]?.to" :to="meta[i].to" class="rp-step-link">
              <nldd-icon :name="meta[i].icon || 'arrow-right'" aria-hidden="true"></nldd-icon>
              <span>{{ meta[i].linkText || 'Open' }}</span>
            </router-link>
          </div>
        </li>
      </ol>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.rp-path-head {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}
.rp-path-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 12px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
}
.rp-path-icon nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
}
.rp-path-titles {
  flex: 1;
  min-width: 0;
}
.rp-path-lede {
  margin: 0.25rem 0 0;
  font-size: 0.88rem;
  opacity: 0.7;
}
.rp-progress {
  height: 0.6rem;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  overflow: hidden;
}
.rp-progress-bar {
  height: 100%;
  border-radius: 999px;
  background: var(--semantics-actions-primary-default-background-color, #154273);
  transition: width 0.35s ease;
}
.rp-progress-bar.is-done {
  background: var(--semantics-feedback-success-color, #1a7f37);
}
.rp-progress-label {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.4rem;
  font-size: 0.78rem;
  opacity: 0.7;
}
.rp-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.rp-step {
  display: flex;
  gap: 0.75rem;
  padding: 0.7rem 0;
  border-top: 1px solid var(--semantics-dividers-color, #e3e6ea);
}
.rp-step:first-child {
  border-top: none;
}
.rp-step-check {
  flex-shrink: 0;
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  margin-top: 0.05rem;
  cursor: pointer;
  color: var(--semantics-text-default-color, #1a1a1a);
  opacity: 0.45;
  transition: opacity 0.15s ease, color 0.15s ease;
}
.rp-step-check nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
}
.rp-step.is-done .rp-step-check {
  opacity: 1;
  color: var(--semantics-feedback-success-color, #1a7f37);
}
.rp-step.is-current .rp-step-check {
  opacity: 0.85;
}
.rp-step-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.rp-step-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-step-num {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.55;
}
.rp-step-text {
  font-weight: 600;
}
.rp-step.is-done .rp-step-text {
  text-decoration: line-through;
  opacity: 0.6;
}
.rp-step-hint {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-step-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.2rem;
  font-size: 0.82rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  width: fit-content;
}
.rp-step-link:hover {
  text-decoration: underline;
}
.rp-step-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
</style>
