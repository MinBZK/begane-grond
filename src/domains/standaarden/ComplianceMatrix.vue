<script setup>
// The full comply-or-explain grid: apps as rows, standards as columns. Each
// cell is a verdict pill; clicking one with a "leg uit" rationale reveals the
// explanation inline below the grid. Verdict/exemption logic lives in the
// parent and is passed in as functions so the matrix stays a pure view.
import { ref } from 'vue';

const props = defineProps({
  standards: { type: Array, required: true },
  apps: { type: Array, required: true },
  verdict: { type: Function, required: true }, // (std, app) -> string
  exemption: { type: Function, required: true }, // (std, app) -> string
  teamName: { type: Function, required: true }, // (app) -> string
});

const active = ref(null); // { std, app, text }

const ICON = {
  voldoet: 'check-mark',
  deels: 'exclamation-triangle',
  uitgezonderd: 'eye',
  'n.v.t.': 'dismiss',
};

function cls(v) {
  return 'rp-cell-' + v.replace('.', '').replace(/\s/g, '');
}

function pick(std, app) {
  const text = props.exemption(std, app);
  const v = props.verdict(std, app);
  if (!text && v === 'voldoet') {
    active.value = { std, app, text: 'Voldoet volledig aan deze standaard. Geen openstaande punten.' };
    return;
  }
  active.value = { std, app, text: text || `Status: ${v}.` };
}
</script>

<template>
  <nldd-card accessible-label="Pas-toe-of-leg-uit matrix">
    <nldd-container padding="0">
      <div class="rp-matrix-scroll">
        <table class="rp-matrix">
          <thead>
            <tr>
              <th class="rp-corner">Applicatie</th>
              <th v-for="s in standards" :key="s.id" class="rp-colhead">
                <span class="rp-colhead-name">{{ s.name }}</span>
                <span class="rp-colhead-kind">{{ s.kind }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in apps" :key="a.id">
              <th class="rp-rowhead">
                <router-link :to="`/apps/${a.id}`" class="rp-row-app">{{ a.name }}</router-link>
                <span class="rp-row-team">{{ teamName(a) }}</span>
              </th>
              <td v-for="s in standards" :key="s.id" class="rp-cell">
                <button
                  type="button"
                  class="rp-pill"
                  :class="[cls(verdict(s, a)), { 'rp-pill-active': active && active.std.id === s.id && active.app.id === a.id }]"
                  @click="pick(s, a)"
                >
                  <nldd-icon :name="ICON[verdict(s, a)]" aria-hidden="true"></nldd-icon>
                  <span>{{ verdict(s, a) }}</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="rp-legend">
        <span><span class="rp-key rp-cell-voldoet"></span> voldoet</span>
        <span><span class="rp-key rp-cell-deels"></span> deels (leg uit)</span>
        <span><span class="rp-key rp-cell-uitgezonderd"></span> uitgezonderd</span>
        <span><span class="rp-key rp-cell-nvt"></span> n.v.t.</span>
      </div>

      <transition name="rp-fade">
        <div v-if="active" class="rp-explain-panel">
          <div class="rp-explain-head">
            <nldd-icon name="link" aria-hidden="true"></nldd-icon>
            <strong>{{ active.app.name }}</strong>
            <span class="rp-explain-x">·</span>
            <span>{{ active.std.name }}</span>
          </div>
          <p class="rp-explain-body">{{ active.text }}</p>
        </div>
      </transition>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.rp-matrix-scroll {
  overflow-x: auto;
}
.rp-matrix {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  min-width: 720px;
}
.rp-matrix th,
.rp-matrix td {
  padding: 0.7rem 0.8rem;
  text-align: left;
  vertical-align: middle;
  border-bottom: 1px solid var(--semantics-dividers-color, #e2e5ea);
}
.rp-corner {
  font-size: 0.78rem;
  opacity: 0.6;
  font-weight: 600;
}
.rp-colhead {
  white-space: nowrap;
}
.rp-colhead-name {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
}
.rp-colhead-kind {
  display: block;
  font-size: 0.72rem;
  opacity: 0.55;
}
.rp-rowhead {
  white-space: nowrap;
}
.rp-row-app {
  display: block;
  font-weight: 600;
  color: inherit;
  text-decoration: none;
}
.rp-row-app:hover {
  text-decoration: underline;
}
.rp-row-team {
  display: block;
  font-size: 0.75rem;
  opacity: 0.55;
}
.rp-cell {
  text-align: center;
}
.rp-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font: inherit;
  font-size: 0.76rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
}
.rp-pill nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
}
.rp-pill-active {
  outline: 2px solid var(--semantics-actions-primary-background-color, #154273);
  outline-offset: 1px;
}
.rp-cell-voldoet { background: #e6f6ec; color: #1f7a45; border-color: #bfe6cd; }
.rp-cell-deels { background: #fdf3e0; color: #97551a; border-color: #f0d9af; }
.rp-cell-uitgezonderd { background: #eef1f6; color: #46506a; border-color: #d4dae6; }
.rp-cell-nvt { background: #f4f5f7; color: #9aa0aa; border-color: #e2e5ea; }

.rp-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.9rem 1.1rem;
  font-size: 0.78rem;
  opacity: 0.8;
}
.rp-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-key {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 4px;
  display: inline-block;
  border: 1px solid transparent;
}
.rp-explain-panel {
  margin: 0 1.1rem 1.1rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f6);
  border: 1px solid var(--semantics-dividers-color, #e2e5ea);
}
.rp-explain-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}
.rp-explain-head nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
}
.rp-explain-x { opacity: 0.4; }
.rp-explain-body {
  margin: 0.4rem 0 0;
  font-size: 0.9rem;
  line-height: 1.45;
}
.rp-fade-enter-active,
.rp-fade-leave-active {
  transition: opacity 0.15s ease;
}
.rp-fade-enter-from,
.rp-fade-leave-to {
  opacity: 0;
}
</style>
