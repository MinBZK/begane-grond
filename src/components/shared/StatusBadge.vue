<script setup>
// Maps a status string to an NLDD tag colour. Covers the common lifecycle and
// health vocabularies used across domains (provisioning, ci, incidents, etc).
import { computed } from 'vue';

const props = defineProps({
  status: { type: String, required: true },
  size: { type: String, default: 'md' },
});

const COLORS = {
  // healthy / done
  ready: 'success', ok: 'success', operationeel: 'success', green: 'success',
  'in gebruik': 'success', geleverd: 'success', merged: 'success', resolved: 'success',
  opgelost: 'success', goedgekeurd: 'success', geaccepteerd: 'success', voldoet: 'success',
  productie: 'success', afgerond: 'success',
  // in progress / neutral-ish
  provisioning: 'warning', requested: 'neutral', besteld: 'neutral', 'in aanbouw': 'warning',
  'in beoordeling': 'warning', 'in behandeling': 'warning', mitigated: 'warning',
  beta: 'warning', deels: 'warning', warn: 'warning', warning: 'warning', actief: 'accent',
  gepland: 'neutral', concept: 'neutral', offerte: 'neutral',
  // bad
  red: 'critical', failing: 'critical', open: 'critical', critical: 'critical',
  sev1: 'critical', sev2: 'critical', high: 'critical', verstoord: 'critical',
};

const color = computed(() => COLORS[props.status?.toLowerCase?.()] || 'neutral');
</script>

<template>
  <nldd-tag :color="color" :size="size">{{ status }}</nldd-tag>
</template>
