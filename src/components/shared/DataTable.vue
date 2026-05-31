<script setup>
// A light, dependency-free table styled to match NLDD surfaces. Columns are
// declared as [{ key, label, mono?, align? }]; rows are plain objects. A
// `cell` scoped slot lets callers render custom cell content (badges, links).
defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  rowKey: { type: String, default: 'id' },
});
</script>

<template>
  <div class="rp-table-wrap">
    <table class="rp-table">
      <thead>
        <tr>
          <th v-for="c in columns" :key="c.key" :style="{ textAlign: c.align || 'left' }">{{ c.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row[rowKey]">
          <td
            v-for="c in columns"
            :key="c.key"
            :class="{ 'rp-mono': c.mono }"
            :style="{ textAlign: c.align || 'left' }"
          >
            <slot name="cell" :row="row" :col="c" :value="row[c.key]">{{ row[c.key] }}</slot>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length" class="rp-table-empty">Geen gegevens.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.rp-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
}
.rp-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.rp-table th,
.rp-table td {
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  white-space: nowrap;
}
.rp-table thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.65;
}
.rp-table tbody tr:last-child td {
  border-bottom: none;
}
.rp-table tbody tr:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-table-empty {
  text-align: center;
  opacity: 0.6;
  padding: 1.5rem;
}
</style>
