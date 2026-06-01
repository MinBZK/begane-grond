<script setup>
// A stepped wizard frame: numbered steps, prev/next, and a default slot that
// renders the current step's content via a scoped slot exposing `step`. Used
// by infra order, new-app golden path, workplace provisioning, fleet campaign.
import { ref, computed } from 'vue';

const props = defineProps({
  steps: { type: Array, required: true }, // [{ title }]
  finishLabel: { type: String, default: 'Voltooien' },
});
const emit = defineEmits(['finish']);

const current = ref(0);
const isLast = computed(() => current.value === props.steps.length - 1);

function next() {
  if (isLast.value) emit('finish');
  else current.value++;
}
function prev() {
  if (current.value > 0) current.value--;
}
function goTo(i) {
  if (i >= 0 && i < props.steps.length) current.value = i;
}

// Imperative API so presentation mode can auto-drive the wizard on stage.
defineExpose({ next, prev, goTo, current, isLast });
</script>

<template>
  <div class="rp-wizard">
    <ol class="rp-wizard-steps">
      <li
        v-for="(s, i) in steps"
        :key="i"
        :class="{ 'rp-done': i < current, 'rp-current': i === current }"
      >
        <span class="rp-wizard-num">{{ i + 1 }}</span>
        <span>{{ s.title }}</span>
      </li>
    </ol>

    <nldd-card>
      <nldd-container padding="24">
        <slot :step="current" :go="(i) => (current = i)" />
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />
    <nldd-button-group orientation="horizontal">
      <nldd-button v-if="current > 0" variant="secondary" text="Vorige" start-icon="chevron-left" @click="prev"></nldd-button>
      <nldd-button variant="primary" :text="isLast ? finishLabel : 'Volgende'" :end-icon="isLast ? 'check-mark' : 'chevron-right'" @click="next"></nldd-button>
    </nldd-button-group>
  </div>
</template>

<style scoped>
.rp-wizard-steps {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0;
  margin: 0 0 1rem;
}
.rp-wizard-steps li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.85rem;
  opacity: 0.6;
}
.rp-wizard-steps li.rp-current {
  opacity: 1;
  font-weight: 700;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-wizard-steps li.rp-done {
  opacity: 0.9;
}
.rp-wizard-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: var(--semantics-surfaces-tinted-background-color);
  font-size: 0.78rem;
  font-weight: 700;
}
.rp-current .rp-wizard-num {
  background: var(--semantics-actions-primary-default-background-color, #154273);
  color: white;
}
</style>
