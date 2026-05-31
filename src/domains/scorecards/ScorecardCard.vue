<script setup>
// One app's production-readiness scorecard: tier medal, progress bar, the full
// seven-point checklist with pass/fail, and a "to do for next tier" footer that
// links each failing check to where it gets fixed.
import { computed } from 'vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import { tierMeta } from './scorecard.js';

const props = defineProps({
  card: { type: Object, required: true },
});

const meta = computed(() => tierMeta(props.card.tier));
const pct = computed(() => Math.round(props.card.ratio * 100));
</script>

<template>
  <nldd-card :accessible-label="`Scorecard ${card.app.name}`">
    <nldd-container padding="20">
      <!-- Header: app name + medal -->
      <div class="sc-head">
        <div class="sc-head-text">
          <router-link :to="`/apps/${card.app.id}`" class="sc-app-link">
            <nldd-title size="4"><h3>{{ card.app.name }}</h3></nldd-title>
          </router-link>
          <div class="sc-sub">{{ card.app.type }} · {{ card.app.stack.join(' · ') }}</div>
        </div>
        <div class="sc-medal" :style="{ '--medal': meta.accent }">
          <nldd-icon :name="meta.icon" aria-hidden="true"></nldd-icon>
          <span>{{ meta.label }}</span>
        </div>
      </div>

      <nldd-spacer size="16" />

      <!-- Progress -->
      <div class="sc-progress-row">
        <span class="sc-progress-label">{{ card.passed }} van {{ card.total }} checks</span>
        <span class="sc-progress-pct">{{ pct }}%</span>
      </div>
      <div class="sc-bar" role="progressbar" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100">
        <div class="sc-bar-fill" :class="`sc-tier-${card.tier}`" :style="{ width: pct + '%' }"></div>
      </div>

      <nldd-spacer size="16" />

      <!-- Checklist -->
      <ul class="sc-checklist">
        <li v-for="c in card.checks" :key="c.key" class="sc-check" :class="{ 'sc-fail': !c.pass }">
          <span class="sc-check-mark" :class="c.pass ? 'sc-ok' : 'sc-no'">
            <nldd-icon :name="c.pass ? 'check-mark-circle' : 'exclamation-triangle'" aria-hidden="true"></nldd-icon>
          </span>
          <span class="sc-check-body">
            <span class="sc-check-label">
              <nldd-icon :name="c.icon" aria-hidden="true" class="sc-check-icon"></nldd-icon>
              {{ c.label }}
            </span>
            <span class="sc-check-detail">{{ c.detail }}</span>
          </span>
          <router-link v-if="!c.pass" :to="c.to" class="sc-fix">
            {{ c.fixLabel }}
            <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
          </router-link>
        </li>
      </ul>

      <!-- Next-tier footer -->
      <div v-if="card.nextTier" class="sc-next">
        <nldd-spacer size="8" />
        <div class="sc-next-head">
          <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
          Naar {{ tierMeta(card.nextTier).label.toLowerCase() }}: {{ card.blocking.length }} open
          {{ card.blocking.length === 1 ? 'punt' : 'punten' }}
        </div>
        <div class="sc-next-tags">
          <router-link v-for="b in card.blocking" :key="b.key" :to="b.to" class="sc-next-tag">
            {{ b.label }}
          </router-link>
        </div>
      </div>
      <div v-else class="sc-done">
        <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
        Goud-niveau bereikt
      </div>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.sc-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.sc-app-link {
  text-decoration: none;
  color: inherit;
}
.sc-app-link:hover :deep(h3) {
  text-decoration: underline;
}
.sc-sub {
  margin-top: 0.2rem;
  font-size: 0.82rem;
  opacity: 0.65;
}
.sc-medal {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--medal);
  border: 1.5px solid var(--medal);
  background: color-mix(in srgb, var(--medal) 10%, transparent);
  white-space: nowrap;
}
.sc-medal nldd-icon {
  width: 1rem;
  height: 1rem;
}
.sc-progress-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.85rem;
}
.sc-progress-label {
  opacity: 0.7;
}
.sc-progress-pct {
  font-weight: 700;
}
.sc-bar {
  margin-top: 0.4rem;
  height: 8px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color, #eceef2);
  overflow: hidden;
}
.sc-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease;
}
.sc-tier-brons { background: #a9743b; }
.sc-tier-zilver { background: #8a93a6; }
.sc-tier-goud { background: #c9a227; }
.sc-checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.sc-check {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color, #e5e7eb);
}
.sc-check:last-child {
  border-bottom: none;
}
.sc-check-mark {
  flex: 0 0 auto;
  display: inline-flex;
}
.sc-check-mark nldd-icon {
  width: 1.15rem;
  height: 1.15rem;
}
.sc-ok { color: #1a8a4a; }
.sc-no { color: #c0392b; }
.sc-check-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1 1 auto;
}
.sc-check-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.92rem;
}
.sc-check-icon {
  width: 0.95rem;
  height: 0.95rem;
  opacity: 0.55;
}
.sc-check-detail {
  font-size: 0.8rem;
  opacity: 0.6;
}
.sc-fail .sc-check-detail {
  color: #c0392b;
  opacity: 0.9;
}
.sc-fix {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-actions-primary-background-color, #154273);
  white-space: nowrap;
}
.sc-fix:hover {
  text-decoration: underline;
}
.sc-fix nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
}
.sc-next {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--semantics-dividers-color, #e5e7eb);
}
.sc-next-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.8;
}
.sc-next-head nldd-icon {
  width: 1rem;
  height: 1rem;
}
.sc-next-tags {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.sc-next-tag {
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--semantics-dividers-color, #e5e7eb);
  background: var(--semantics-surfaces-tinted-background-color, #f4f5f7);
}
.sc-next-tag:hover {
  border-color: var(--semantics-actions-primary-background-color, #154273);
}
.sc-done {
  margin-top: 0.6rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--semantics-dividers-color, #e5e7eb);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #c9a227;
}
.sc-done nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
