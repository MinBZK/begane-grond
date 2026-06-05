<script setup>
// Budgets per team. Each team gets a budget-vs-spent bar; if spend exceeds the
// budget the bar turns critical and a warning banner is shown (the seed has
// Toeslagen at 300 spent against a 280 budget, so it overruns by design). Teams
// without an explicit budget entry are derived from the costByTeam rollup and
// shown as "geen budget ingesteld" so nothing is hidden.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

const fmtEur = (n) => `€${Math.round(n).toLocaleString('nl-NL')}`;
const teamName = (id) => store.teamById(id)?.name || id;

// Live-derived spend per team straight from the afgenomen instances. We show
// this next to the budget's recorded spend so the two can be reconciled.
const instanceSpend = (teamId) =>
  store.instances
    .filter((i) => i.team === teamId)
    .reduce((sum, i) => sum + (i.costMonth || 0), 0);

const rollupSpend = (teamId) =>
  store.costByTeam.find((t) => t.team === teamId)?.month ?? 0;

// One row per team: every team in the store, merged with its budget (if any).
const rows = computed(() =>
  store.teams.map((t) => {
    const budget = store.budgets.find((b) => b.team === t.id);
    const spent = budget ? budget.spent : rollupSpend(t.id);
    const cap = budget ? budget.budget : null;
    const pct = cap ? (spent / cap) * 100 : null;
    const over = cap != null && spent > cap;
    const near = cap != null && !over && pct >= 85;
    return {
      team: t.id,
      name: t.name,
      hasBudget: !!budget,
      budget: cap,
      spent,
      instanceSpend: instanceSpend(t.id),
      pct,
      over,
      near,
      remaining: cap != null ? cap - spent : null,
    };
  }),
);

// --- Filtering + capped list -----------------------------------------------
// The store now holds ~99 teams, so rendering every budget bar at once makes
// the page unmanageably long. We filter by name and by status, default to the
// teams that actually have a budget set, and cap the visible rows with a
// "Toon meer"-button (same pattern as the wizards).
const query = ref('');
const statusFilter = ref('met-budget');
const limit = ref(25);

const statusOptions = [
  { id: 'met-budget', label: 'Met budget' },
  { id: 'over', label: 'Over budget' },
  { id: 'near', label: 'Bijna op' },
  { id: 'binnen', label: 'Binnen budget' },
  { id: 'geen', label: 'Geen budget' },
  { id: 'alle', label: 'Alle teams' },
];

function matchesStatus(r) {
  switch (statusFilter.value) {
    case 'over':
      return r.over;
    case 'near':
      return r.near;
    case 'binnen':
      return r.hasBudget && !r.over && !r.near;
    case 'geen':
      return !r.hasBudget;
    case 'met-budget':
      return r.hasBudget;
    default:
      return true;
  }
}

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return rows.value.filter((r) => {
    if (!matchesStatus(r)) return false;
    if (!q) return true;
    return r.name.toLowerCase().includes(q) || r.team.toLowerCase().includes(q);
  });
});

const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - visible.value.length));

function setStatus(id) {
  statusFilter.value = id;
  limit.value = 25;
}
function showMore() {
  limit.value += 25;
}

// --- Portfolio totals -------------------------------------------------------
const totalBudget = computed(() =>
  store.budgets.reduce((sum, b) => sum + (b.budget || 0), 0),
);
const totalSpent = computed(() =>
  store.budgets.reduce((sum, b) => sum + (b.spent || 0), 0),
);
const overruns = computed(() => rows.value.filter((r) => r.over));
// Total euros spent over budget across all overrunning teams, and a short
// summary that names only the worst few so the banner stays one tight line.
const totalOverspend = computed(() =>
  overruns.value.reduce((sum, r) => sum + (r.spent - r.budget), 0),
);
const overrunSummary = computed(() => {
  if (!overruns.value.length) return '';
  const worst = [...overruns.value].sort((a, b) => b.spent - b.budget - (a.spent - a.budget));
  const named = worst.slice(0, 3).map((o) => o.name).join(', ');
  const rest = worst.length - 3;
  const who = rest > 0 ? `${named} en ${rest} ${rest === 1 ? 'ander team' : 'andere teams'}` : named;
  return `${who}, samen ${fmtEur(totalOverspend.value)} te veel. Verhoog het budget of schaal diensten terug.`;
});
const portfolioPct = computed(() =>
  totalBudget.value ? Math.round((totalSpent.value / totalBudget.value) * 100) : 0,
);

// --- Bar geometry -----------------------------------------------------------
// Bars are scaled against the largest of budget/spent across all budgeted teams
// so overruns visibly exceed their budget marker.
const scaleMax = computed(() => {
  const vals = rows.value
    .filter((r) => r.hasBudget)
    .flatMap((r) => [r.budget, r.spent]);
  return Math.max(...vals, 1);
});
const barWidth = (v) => `${(v / scaleMax.value) * 100}%`;

// --- Demo edit: nudge a budget so the warning state is interactive ----------
const justSaved = ref(null);
function bumpBudget(teamId, delta) {
  const b = store.budgets.find((x) => x.team === teamId);
  if (!b) return;
  b.budget = Math.max(0, b.budget + delta);
  store.audit('budget aangepast', `${teamName(teamId)} → ${fmtEur(b.budget)}`);
  justSaved.value = teamId;
  setTimeout(() => {
    if (justSaved.value === teamId) justSaved.value = null;
  }, 2500);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Budgetten"
      lede="Budget versus uitgave per team. Overschrijdingen worden direct gemarkeerd zodat een teamlead kan bijsturen voordat de maand om is."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Kosten', href: '/kosten' }, { text: 'Budgetten', href: '/kosten/budgetten' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Kostenoverzicht" start-icon="euro-sign" @click="$router.push('/kosten')" />
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-collection layout="grid" item-width="220px">
      <MetricCard :value="fmtEur(totalBudget)" label="Totaal budget" sub="teams met budget" icon="euro-sign" />
      <MetricCard :value="fmtEur(totalSpent)" label="Totaal uitgegeven" :sub="`${portfolioPct}% van budget`" icon="arrow-up-arrow-down" />
      <MetricCard
        :value="overruns.length"
        label="Overschrijdingen"
        :sub="overruns.length ? `${overruns.length === 1 ? 'team' : 'teams'} over budget` : 'binnen budget'"
        icon="exclamation-triangle"
      />
      <MetricCard
        :value="fmtEur(Math.max(totalBudget - totalSpent, 0))"
        label="Resterend budget"
        sub="deze maand"
        icon="check-mark-circle"
      />
    </nldd-collection>

    <nldd-spacer size="24" />

    <!-- Overrun banner: one tight line, left-aligned with an icon. The per-team
         detail lives in the list below, so we summarize here. (A plain element
         rather than nldd-banner, which auto-defines attributes that break Vue's
         createElement.) -->
    <template v-if="overruns.length">
      <div class="rp-overrun-banner" role="status">
        <nldd-icon name="exclamation-triangle" aria-hidden="true" class="rp-overrun-icon"></nldd-icon>
        <div class="rp-overrun-body">
          <p class="rp-overrun-title">{{ overruns.length }} {{ overruns.length === 1 ? 'team' : 'teams' }} over budget</p>
          <p class="rp-overrun-text">{{ overrunSummary }}</p>
        </div>
      </div>
      <nldd-spacer size="24" />
    </template>

    <div class="rp-budget-grid">
      <section>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Budget versus uitgave</h2></nldd-title>
              <nldd-tag color="neutral" size="md">{{ filtered.length }} van {{ rows.length }} teams</nldd-tag>
            </div>
            <nldd-spacer size="16" />

            <!-- Filters: zoek op team + status -->
            <div class="rp-budget-filters">
              <nldd-search-field
                class="rp-budget-search"
                label="Zoek team"
                hide-label
                placeholder="Zoek op teamnaam of id"
                :value="query"
                @input="(e) => (query = e.target.value)"
              ></nldd-search-field>
              <div class="rp-budget-chips">
                <nldd-button
                  v-for="opt in statusOptions"
                  :key="opt.id"
                  :variant="statusFilter === opt.id ? 'primary' : 'secondary'"
                  size="sm"
                  :text="opt.label"
                  @click="setStatus(opt.id)"
                />
              </div>
            </div>
            <nldd-spacer size="20" />

            <p v-if="!filtered.length" class="rp-budget-empty">Geen teams gevonden voor deze filter.</p>

            <ul class="rp-budgets">
              <li v-for="r in visible" :key="r.team" class="rp-budget-row">
                <div class="rp-budget-head">
                  <router-link :to="`/teams/${r.team}`" class="rp-budget-team">
                    <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
                    {{ r.name }}
                  </router-link>
                  <span class="rp-budget-status">
                    <nldd-tag v-if="r.over" color="critical" size="md">over budget</nldd-tag>
                    <nldd-tag v-else-if="r.near" color="warning" size="md">bijna op</nldd-tag>
                    <nldd-tag v-else-if="r.hasBudget" color="success" size="md">binnen budget</nldd-tag>
                    <nldd-tag v-else color="neutral" size="md">geen budget</nldd-tag>
                  </span>
                </div>

                <!-- Bar -->
                <div v-if="r.hasBudget" class="rp-budget-track">
                  <div
                    class="rp-budget-fill"
                    :class="{ over: r.over, near: r.near }"
                    :style="{ width: barWidth(Math.min(r.spent, r.budget)) }"
                  ></div>
                  <div
                    v-if="r.over"
                    class="rp-budget-overflow"
                    :style="{ left: barWidth(r.budget), width: barWidth(r.spent - r.budget) }"
                  ></div>
                  <div class="rp-budget-marker" :style="{ left: barWidth(r.budget) }" :title="`Budget ${fmtEur(r.budget)}`"></div>
                </div>
                <div v-else class="rp-budget-track rp-budget-track--empty">
                  <div class="rp-budget-fill rp-budget-fill--ghost" :style="{ width: barWidth(r.spent) }"></div>
                </div>

                <div class="rp-budget-figs">
                  <span class="rp-budget-spent" :class="{ over: r.over }">{{ fmtEur(r.spent) }} uitgegeven</span>
                  <span v-if="r.hasBudget" class="rp-budget-cap">budget {{ fmtEur(r.budget) }}</span>
                  <span v-if="r.hasBudget && r.remaining >= 0" class="rp-budget-left">{{ fmtEur(r.remaining) }} over</span>
                  <span v-else-if="r.hasBudget" class="rp-budget-left over">{{ fmtEur(-r.remaining) }} te veel</span>
                  <span v-else class="rp-budget-cap">geen budget ingesteld</span>
                  <span class="rp-budget-pct" v-if="r.pct != null">{{ Math.round(r.pct) }}%</span>
                </div>

                <!-- Inline budget edit -->
                <div v-if="r.hasBudget" class="rp-budget-edit">
                  <nldd-button-group orientation="horizontal">
                    <nldd-button variant="secondary" size="sm" text="Budget −€20" start-icon="dismiss" @click="bumpBudget(r.team, -20)" />
                    <nldd-button variant="secondary" size="sm" text="Budget +€20" start-icon="plus" @click="bumpBudget(r.team, 20)" />
                  </nldd-button-group>
                  <span v-if="justSaved === r.team" class="rp-budget-saved">
                    <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
                    Opgeslagen
                  </span>
                </div>
              </li>
            </ul>

            <div v-if="moreCount" class="rp-budget-more">
              <nldd-button variant="secondary" text="Toon meer" :start-icon="'chevron-down'" @click="showMore" />
              <span class="rp-budget-more-count">nog {{ moreCount }} meer</span>
            </div>

            <CliHint command="bg budget set --team team-toeslagen --amount 320" label="Budget bijstellen via de CLI:" />
          </nldd-container>
        </nldd-card>
      </section>

      <!-- Side rail -->
      <aside>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Verbruik totaal</h2></nldd-title>
              <nldd-tag :color="portfolioPct > 100 ? 'critical' : portfolioPct >= 85 ? 'warning' : 'success'" size="md">
                {{ portfolioPct }}%
              </nldd-tag>
            </div>
            <nldd-spacer size="16" />
            <div class="rp-portfolio-track">
              <div
                class="rp-portfolio-fill"
                :class="{ over: portfolioPct > 100 }"
                :style="{ width: `${Math.min(portfolioPct, 100)}%` }"
              ></div>
            </div>
            <div class="rp-portfolio-figs">
              <span><strong>{{ fmtEur(totalSpent) }}</strong> uitgegeven</span>
              <span class="rp-portfolio-cap">van {{ fmtEur(totalBudget) }}</span>
            </div>
            <nldd-spacer size="16" />
            <p class="rp-rail-note">
              Bij overschrijding gaat er een melding naar het abonnement <code>cost.budget-exceeded</code> van het betrokken team.
            </p>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <RelationLinks
          title="Doorklikken"
          :links="[
            { text: 'Kostenoverzicht', to: '/kosten', icon: 'euro-sign' },
            { text: 'Afgenomen instances', to: '/infra/instances', icon: 'cylinder-split' },
            { text: 'Teams', to: '/teams', icon: 'person-2' },
          ]"
        />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.rp-budget-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-budget-grid {
    grid-template-columns: 1fr;
  }
}

.rp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

/* Overrun warning banner */
.rp-overrun-banner {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.9rem 1.1rem;
  border-radius: 10px;
  border: 1px solid #d97706;
  background: rgba(217, 119, 6, 0.08);
}
.rp-overrun-icon {
  width: 1.3rem;
  height: 1.3rem;
  color: #b45309;
  flex: 0 0 auto;
  margin-top: 0.05rem;
}
.rp-overrun-body {
  min-width: 0;
}
.rp-overrun-title {
  margin: 0;
  font-weight: 700;
}
.rp-overrun-text {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.85;
}

/* Filters */
.rp-budget-filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.rp-budget-search {
  width: 100%;
  max-width: 360px;
}
.rp-budget-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-budget-empty {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.7;
}
.rp-budget-more {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 1.4rem 0 0.4rem;
}
.rp-budget-more-count {
  font-size: 0.85rem;
  opacity: 0.6;
}

/* Budget rows */
.rp-budgets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
.rp-budget-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.55rem;
}
.rp-budget-team {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  font-weight: 700;
}
.rp-budget-team:hover {
  text-decoration: underline;
}
.rp-budget-team nldd-icon {
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.6;
}

.rp-budget-track {
  position: relative;
  height: 1.1rem;
  border-radius: 99px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: visible;
}
.rp-budget-track--empty {
  opacity: 0.7;
}
.rp-budget-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 99px;
  background: #0d9488;
  transition: width 0.4s ease;
}
.rp-budget-fill.near {
  background: #d97706;
}
.rp-budget-fill.over {
  background: #d97706;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.rp-budget-fill--ghost {
  background: #94a3b8;
}
.rp-budget-overflow {
  position: absolute;
  top: 0;
  height: 100%;
  background: #dc2626;
  border-top-right-radius: 99px;
  border-bottom-right-radius: 99px;
  transition: width 0.4s ease, left 0.4s ease;
}
.rp-budget-marker {
  position: absolute;
  top: -3px;
  height: calc(100% + 6px);
  width: 2px;
  background: var(--semantics-text-color);
  opacity: 0.55;
}

.rp-budget-figs {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
}
.rp-budget-spent {
  font-weight: 600;
}
.rp-budget-spent.over {
  color: #dc2626;
}
.rp-budget-cap {
  opacity: 0.65;
}
.rp-budget-left {
  opacity: 0.75;
}
.rp-budget-left.over {
  color: #dc2626;
  opacity: 1;
  font-weight: 600;
}
.rp-budget-pct {
  margin-left: auto;
  font-variant-numeric: tabular-nums;
  opacity: 0.6;
}

.rp-budget-edit {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.7rem;
}
.rp-budget-saved {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  color: #0d9488;
}
.rp-budget-saved nldd-icon {
  width: 1rem;
  height: 1rem;
}

/* Portfolio rail */
.rp-portfolio-track {
  height: 0.9rem;
  border-radius: 99px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-portfolio-fill {
  height: 100%;
  border-radius: 99px;
  background: #0d9488;
  transition: width 0.4s ease;
}
.rp-portfolio-fill.over {
  background: #dc2626;
}
.rp-portfolio-figs {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
.rp-portfolio-cap {
  opacity: 0.6;
}
.rp-rail-note {
  font-size: 0.83rem;
  opacity: 0.7;
  margin: 0;
}
.rp-rail-note code {
  font-size: 0.78rem;
  padding: 0.05rem 0.3rem;
  border-radius: 5px;
  background: var(--semantics-surfaces-tinted-background-color);
}
</style>
