<script setup>
// A searchable docs hub: runbooks, guides and reference pages in one filterable
// list. Search matches title, summary, category and keywords; a kind filter
// narrows to runbooks/guides/reference. Rows render as NLDD-styled list items.
import { ref, computed } from 'vue';
import { docs } from './docs.js';

const query = ref('');
const kind = ref('');

const KIND_LABELS = {
  runbook: 'Runbook',
  guide: 'Guide',
  referentie: 'Referentie',
};
const KIND_COLORS = {
  runbook: 'critical',
  guide: 'accent',
  referentie: 'neutral',
};

const kinds = computed(() => [...new Set(docs.map((d) => d.kind))]);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return docs.filter((d) => {
    if (kind.value && d.kind !== kind.value) return false;
    if (!q) return true;
    const hay = [d.title, d.summary, d.category, ...(d.keywords || [])].join(' ').toLowerCase();
    return hay.includes(q);
  });
});
</script>

<template>
  <nldd-card accessible-label="Docs-hub">
    <nldd-container padding="24">
      <div class="rp-docs-head">
        <div>
          <nldd-title size="4"><h2>Docs-hub</h2></nldd-title>
          <p class="rp-docs-lede">Runbooks, guides en referentie op één doorzoekbare plek.</p>
        </div>
        <nldd-tag color="neutral" size="md">{{ filtered.length }} van {{ docs.length }}</nldd-tag>
      </div>

      <nldd-spacer size="16" />

      <div class="rp-docs-filters">
        <nldd-search-field
          :value="query"
          placeholder="Zoek in runbooks en guides (bijv. incident, EUPL, WCAG)"
          @input="(e) => (query = e.target.value)"
        ></nldd-search-field>
        <nldd-dropdown>
          <select v-model="kind">
            <option value="">Alle soorten</option>
            <option v-for="k in kinds" :key="k" :value="k">{{ KIND_LABELS[k] }}</option>
          </select>
        </nldd-dropdown>
      </div>

      <nldd-spacer size="16" />

      <ul class="rp-docs-list">
        <li v-for="d in filtered" :key="d.id" class="rp-doc">
          <span class="rp-doc-icon" aria-hidden="true">
            <nldd-icon :name="d.icon"></nldd-icon>
          </span>
          <div class="rp-doc-body">
            <div class="rp-doc-top">
              <a class="rp-doc-title" href="javascript:void(0)">{{ d.title }}</a>
              <nldd-tag :color="KIND_COLORS[d.kind]" size="sm">{{ KIND_LABELS[d.kind] }}</nldd-tag>
            </div>
            <p class="rp-doc-summary">{{ d.summary }}</p>
            <div class="rp-doc-meta">
              <span><nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon>{{ d.category }}</span>
              <span><nldd-icon name="clock" aria-hidden="true"></nldd-icon>{{ d.minutes }} min lezen</span>
              <span><nldd-icon name="pencil" aria-hidden="true"></nldd-icon>bijgewerkt {{ d.updated }}</span>
            </div>
          </div>
          <nldd-icon name="chevron-right" aria-hidden="true" class="rp-doc-chevron"></nldd-icon>
        </li>
        <li v-if="!filtered.length" class="rp-doc-empty">
          Geen documenten gevonden voor "{{ query }}".
        </li>
      </ul>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.rp-docs-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.rp-docs-lede {
  margin: 0.25rem 0 0;
  font-size: 0.88rem;
  opacity: 0.7;
}
.rp-docs-filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
}
.rp-docs-filters nldd-search-field {
  flex: 1;
  min-width: 240px;
}
.rp-docs-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.rp-doc {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 0.85rem 0.5rem;
  border-top: 1px solid var(--semantics-dividers-color);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.12s ease;
}
.rp-doc:first-child {
  border-top: none;
}
.rp-doc:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-doc-icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-doc-icon nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
}
.rp-doc-body {
  flex: 1;
  min-width: 0;
}
.rp-doc-top {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-doc-title {
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}
.rp-doc-title:hover {
  text-decoration: underline;
}
.rp-doc-summary {
  margin: 0.2rem 0 0;
  font-size: 0.86rem;
  opacity: 0.75;
}
.rp-doc-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  margin-top: 0.4rem;
  font-size: 0.76rem;
  opacity: 0.6;
}
.rp-doc-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.rp-doc-meta nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
}
.rp-doc-chevron {
  flex-shrink: 0;
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.4;
  margin-top: 0.35rem;
}
.rp-doc-empty {
  padding: 1.5rem;
  text-align: center;
  opacity: 0.6;
}
</style>
