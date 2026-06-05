<script setup>
// One app's NeRDS scorecard: an honest "N van de 13", a progress bar, and the
// thirteen richtlijn-checks with pass / n.v.t. / open. A failing richtlijn links
// to the domain where you resolve it. No metal tiers here: NeRDS is a binary
// charter, the maturity ladder lives on /scorecards.
import { computed } from 'vue';

const props = defineProps({
  card: { type: Object, required: true },
});

const pct = computed(() => Math.round(props.card.ratio * 100));
</script>

<template>
  <nldd-card :accessible-label="`NeRDS-scorecard ${card.app.name}`">
    <nldd-container padding="20">
      <div class="nc-head">
        <div class="nc-head-text">
          <router-link :to="`/apps/${card.app.id}`" class="nc-app-link">
            <nldd-title size="4"><h3>{{ card.app.name }}</h3></nldd-title>
          </router-link>
          <div class="nc-sub">{{ card.app.type }} · {{ card.app.stack.join(' · ') }}</div>
        </div>
        <div class="nc-score" :class="{ 'nc-score-full': card.compliant }">
          <strong>{{ card.passed }}</strong><span>/13</span>
        </div>
      </div>

      <nldd-spacer size="14" />

      <div class="nc-bar" role="progressbar" :aria-valuenow="pct" aria-valuemin="0" aria-valuemax="100">
        <div class="nc-bar-fill" :class="{ 'nc-bar-full': card.compliant }" :style="{ width: pct + '%' }"></div>
      </div>

      <nldd-spacer size="14" />

      <ul class="nc-checklist">
        <li v-for="c in card.checks" :key="c.key" class="nc-check" :class="{ 'nc-fail': !c.pass, 'nc-nvt': c.nvt }">
          <span class="nc-mark" :class="c.pass ? (c.nvt ? 'nc-na' : 'nc-ok') : 'nc-no'">
            <nldd-icon :name="c.pass ? (c.nvt ? 'dismiss' : 'check-mark-circle') : 'exclamation-triangle'" aria-hidden="true"></nldd-icon>
          </span>
          <span class="nc-body">
            <span class="nc-label">
              <span class="nc-num">{{ c.number }}</span>
              {{ c.label }}
            </span>
            <span class="nc-detail">{{ c.detail }}</span>
          </span>
          <router-link v-if="!c.pass" :to="c.to" class="nc-fix">
            {{ c.fixLabel }}
            <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
          </router-link>
        </li>
      </ul>

      <div v-if="card.blocking.length" class="nc-next">
        <nldd-spacer size="8" />
        <div class="nc-next-head">
          <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
          Nog {{ card.blocking.length }} open
          {{ card.blocking.length === 1 ? 'richtlijn' : 'richtlijnen' }}
        </div>
        <div class="nc-next-tags">
          <router-link v-for="b in card.blocking" :key="b.key" :to="b.to" class="nc-next-tag">
            {{ b.label }}
          </router-link>
        </div>
      </div>
      <div v-else class="nc-done">
        <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
        Voldoet volledig aan NeRDS
      </div>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.nc-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}
.nc-app-link { text-decoration: none; color: inherit; }
.nc-app-link:hover :deep(h3) { text-decoration: underline; }
.nc-sub { margin-top: 0.2rem; font-size: 0.82rem; opacity: 0.65; }
.nc-score {
  display: inline-flex;
  align-items: baseline;
  gap: 0.1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.95rem;
  border: 1.5px solid var(--semantics-dividers-color);
  white-space: nowrap;
}
.nc-score strong { font-size: 1.1rem; }
.nc-score span { opacity: 0.6; }
.nc-score-full {
  color: #1a8a4a;
  border-color: #1a8a4a;
  background: rgba(26, 138, 74, 0.1);
}
.nc-bar {
  height: 8px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.nc-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: #154273;
  transition: width 0.4s ease;
}
.nc-bar-full { background: #1a8a4a; }
.nc-checklist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.nc-check {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.nc-check:last-child { border-bottom: none; }
.nc-mark { flex: 0 0 auto; display: inline-flex; }
.nc-mark nldd-icon { width: 1.1rem; height: 1.1rem; }
.nc-ok { color: #1a8a4a; }
.nc-no { color: #c0392b; }
.nc-na { color: var(--semantics-text-default-color); opacity: 0.5; }
.nc-body { display: flex; flex-direction: column; min-width: 0; flex: 1 1 auto; }
.nc-label { display: flex; align-items: center; gap: 0.45rem; font-weight: 600; font-size: 0.9rem; }
.nc-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 5px;
  background: var(--semantics-surfaces-tinted-background-color);
  font-size: 0.72rem;
  font-weight: 700;
  opacity: 0.75;
  flex: 0 0 auto;
}
.nc-detail { font-size: 0.78rem; opacity: 0.6; padding-left: 1.75rem; }
.nc-fail .nc-detail { color: #c0392b; opacity: 0.9; }
.nc-nvt .nc-label { opacity: 0.6; }
.nc-fix {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color);
  white-space: nowrap;
}
.nc-fix:hover { text-decoration: underline; }
.nc-fix nldd-icon { width: 0.8rem; height: 0.8rem; }
.nc-next { margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed var(--semantics-dividers-color); }
.nc-next-head { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; font-weight: 600; opacity: 0.8; }
.nc-next-head nldd-icon { width: 1rem; height: 1rem; }
.nc-next-tags { margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.4rem; }
.nc-next-tag {
  font-size: 0.78rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.nc-next-tag:hover { border-color: var(--semantics-actions-primary-default-background-color); }
.nc-done {
  margin-top: 0.6rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--semantics-dividers-color);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a8a4a;
}
.nc-done nldd-icon { width: 1.1rem; height: 1.1rem; }
</style>
