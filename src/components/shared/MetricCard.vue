<script setup>
// A KPI tile: big number, label, optional sublabel/trend and icon. Used on the
// home dashboard, "Mijn overzicht", cost overview, etc.
defineProps({
  value: { type: [String, Number], required: true },
  label: { type: String, required: true },
  sub: { type: String, default: '' },
  icon: { type: String, default: '' },
  to: { type: String, default: '' },
});
</script>

<template>
  <component :is="to ? 'router-link' : 'div'" :to="to || undefined" class="rp-metric-link">
    <nldd-card :accessible-label="label">
      <nldd-container padding="20">
        <div class="rp-metric-top">
          <nldd-icon v-if="icon" :name="icon" aria-hidden="true"></nldd-icon>
          <span class="rp-metric-value">{{ value }}</span>
        </div>
        <div class="rp-metric-label">{{ label }}</div>
        <div v-if="sub" class="rp-metric-sub">{{ sub }}</div>
      </nldd-container>
    </nldd-card>
  </component>
</template>

<style scoped>
/* Stretch to fill the grid/flex cell so KPIs in a row are equal height even when
   some have a sub-label and others do not. The host overrides the parent grid's
   alignment with align-self: stretch; the nldd-card host is flex-column with a
   flex-grow:1 inner card, so giving it 100% height makes the white surface fill. */
.rp-metric-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  height: 100%;
  align-self: stretch;
}
.rp-metric-link nldd-card {
  width: 100%;
  height: 100%;
}
.rp-metric-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-metric-top nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.7;
}
.rp-metric-value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
}
.rp-metric-label {
  margin-top: 0.25rem;
  font-weight: 600;
}
.rp-metric-sub {
  opacity: 0.65;
  font-size: 0.85rem;
}
</style>
