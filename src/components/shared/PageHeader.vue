<script setup>
// Standard page header used at the top of every domain screen: a title, an
// optional lede, optional breadcrumbs, and an actions slot (buttons).
defineProps({
  title: { type: String, required: true },
  lede: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] }, // [{ text, href }]
});
</script>

<template>
  <div>
    <nldd-breadcrumbs v-if="crumbs.length" accessible-label="Kruimelpad">
      <nldd-breadcrumbs-item
        v-for="(c, i) in crumbs"
        :key="i"
        :text="c.text"
        :href="c.href"
        :current="i === crumbs.length - 1 || undefined"
      ></nldd-breadcrumbs-item>
    </nldd-breadcrumbs>
    <div class="rp-header-row">
      <div>
        <nldd-title size="2"><h1>{{ title }}</h1></nldd-title>
        <nldd-rich-text v-if="lede"><p>{{ lede }}</p></nldd-rich-text>
      </div>
      <div class="rp-header-actions"><slot name="actions" /></div>
    </div>
    <nldd-spacer size="24" />
  </div>
</template>

<style scoped>
.rp-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-header-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
