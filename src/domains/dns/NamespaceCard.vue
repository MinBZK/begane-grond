<script setup>
// One namespace from the registry, rendered as a tile that mirrors the domain
// tiles in Domeinen.vue. Teaches the layered model at a glance: who may
// register, the approval level, whether DNSSEC/internet.nl is required, and
// whether the namespace is open. All values read off the namespace record.
import { computed } from 'vue';
import { fqdnParts } from '../../components/shared/fqdn.js';

const props = defineProps({
  namespace: { type: Object, required: true },
  selectable: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
});

const KIND_LABELS = {
  rijk: 'Rijk',
  experiment: 'Experiment',
  legacy: 'Legacy',
  medeoverheid: 'Medeoverheid',
};
const KIND_COLORS = {
  rijk: 'success',
  experiment: 'warning',
  legacy: 'neutral',
  medeoverheid: 'accent',
};

const ns = computed(() => props.namespace);

// Highest approval level across the tiers, phrased for humans.
const approvalLabel = computed(() => {
  const levels = ns.value.tiers.map((t) => t.approval);
  if (levels.includes('central') && levels.includes('delegated')) return 'Centraal + gedelegeerd';
  if (levels.includes('central')) return 'Centraal';
  if (levels.includes('delegated')) return 'Per organisatie';
  if (levels.includes('self-service')) return 'Direct (self-service)';
  return 'n.v.t.';
});

const whoMayRegister = computed(() => {
  if (!ns.value.openForRegistration) return 'Niemand — alleen migratie';
  if (ns.value.layered) {
    return 'Registry-beheerder (org-tier) + domeinbeheerder (dienst-tier)';
  }
  return 'Iedereen, self-service';
});

const statusLabel = computed(() => {
  if (!ns.value.openForRegistration) return 'in afbouw';
  if (ns.value.kind === 'experiment') return 'experiment';
  return 'open';
});
const statusColor = computed(() => {
  if (!ns.value.openForRegistration) return 'neutral';
  if (ns.value.kind === 'experiment') return 'warning';
  return 'success';
});
</script>

<template>
  <component
    :is="selectable ? 'button' : 'div'"
    :type="selectable ? 'button' : undefined"
    class="rp-ns"
    :class="{ 'rp-ns-selectable': selectable, 'rp-ns-sel': selected }"
  >
    <nldd-card :accessible-label="ns.suffix">
      <nldd-container padding="20">
        <div class="rp-ns-head">
          <nldd-icon name="globe" aria-hidden="true" class="rp-ns-icon"></nldd-icon>
          <div class="rp-min-width-0">
            <h3 class="rp-mono rp-ns-suffix"><template v-for="(part, i) in fqdnParts(ns.suffix)" :key="i">{{ part }}<wbr /></template></h3>
            <p class="rp-ns-desc">{{ ns.description }}</p>
          </div>
          <nldd-tag :color="KIND_COLORS[ns.kind] || 'neutral'" size="md">{{ KIND_LABELS[ns.kind] || ns.kind }}</nldd-tag>
        </div>

        <nldd-spacer size="12" />

        <dl class="rp-kv">
          <dt>Wie mag registreren</dt>
          <dd>{{ whoMayRegister }}</dd>
          <dt>Goedkeuring</dt>
          <dd>{{ approvalLabel }}</dd>
          <dt>DNSSEC</dt>
          <dd>
            <nldd-tag :color="ns.requiresDnssec ? 'success' : 'neutral'" size="sm">
              {{ ns.requiresDnssec ? 'verplicht' : 'optioneel' }}
            </nldd-tag>
          </dd>
          <dt>internet.nl</dt>
          <dd>
            <nldd-tag :color="ns.requiresInternetnl ? 'success' : 'neutral'" size="sm">
              {{ ns.requiresInternetnl ? `verplicht ≥ ${ns.minInternetnl}` : 'optioneel' }}
            </nldd-tag>
          </dd>
          <dt>Status</dt>
          <dd><nldd-tag :color="statusColor" size="sm">{{ statusLabel }}</nldd-tag></dd>
        </dl>

        <p v-if="ns.notForProduction" class="rp-ns-warn">Niet voor productie.</p>
      </nldd-container>
    </nldd-card>
  </component>
</template>

<style scoped>
.rp-ns {
  display: block;
  width: 100%;
  text-align: left;
  font: inherit;
  color: inherit;
  border: none;
  background: transparent;
  padding: 0;
}
.rp-ns-selectable {
  cursor: pointer;
}
.rp-ns-selectable nldd-card {
  display: block;
  border-radius: 12px;
  transition: box-shadow 0.15s ease;
}
.rp-ns-sel nldd-card {
  box-shadow: 0 0 0 2px var(--semantics-actions-primary-default-background-color);
  border-radius: 12px;
}
.rp-ns-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-ns-icon {
  width: 1.6rem;
  height: 1.6rem;
  flex: 0 0 auto;
  opacity: 0.8;
}
.rp-min-width-0 {
  min-width: 0;
  flex: 1 1 auto;
}
.rp-ns-suffix {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.25;
}
.rp-mono {
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, monospace;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
}
.rp-ns-desc {
  margin: 0.2rem 0 0;
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-kv {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem 1rem;
  margin: 0;
  align-items: center;
}
.rp-kv dt {
  font-weight: 600;
  opacity: 0.7;
  font-size: 0.85rem;
}
.rp-kv dd {
  margin: 0;
  font-size: 0.88rem;
}
.rp-ns-warn {
  margin: 0.75rem 0 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--semantics-feedback-warning-color);
}
</style>
