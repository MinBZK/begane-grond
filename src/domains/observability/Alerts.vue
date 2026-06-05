<script setup>
// Alerts & SLO screen: the active alerts from store.alerts (with severity
// badges and the owning team/on-call person), plus an error-budget burndown
// per service from store.slos rendered as horizontal budget bars. Everything
// links through to the app, the team and the on-call schedule.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();

// Resolve the owning team + on-call for an alert. The alert service can be an
// app id or an instance id, so we look in both.
function ownerOf(service) {
  const app = store.appById(service);
  if (app) return { name: app.name, team: store.teamById(app.team), appId: app.id };
  const inst = store.instanceById(service);
  if (inst) {
    const app2 = inst.app ? store.appById(inst.app) : null;
    return { name: inst.name, team: store.teamById(inst.team), appId: app2 ? app2.id : null, instId: inst.id };
  }
  return { name: service, team: null, appId: null };
}

const enriched = computed(() =>
  store.alerts.map((a) => {
    const owner = ownerOf(a.service);
    const oncall = owner.team ? store.personById(owner.team.oncall) : null;
    return { ...a, owner, oncall };
  })
);

const sloRows = computed(() =>
  store.slos.map((s) => {
    const app = store.appById(s.service);
    const team = app ? store.teamById(app.team) : null;
    const oncall = team ? store.personById(team.oncall) : null;
    // burned = how much of the budget is gone
    return { ...s, app, team, oncall, burned: 100 - s.budgetLeft };
  })
);

const kpis = computed(() => {
  const critical = store.alerts.filter((a) => ['critical', 'sev1', 'sev2'].includes(a.severity)).length;
  const atRisk = sloRows.value.filter((s) => s.budgetLeft < 20).length;
  const worst = [...sloRows.value].sort((a, b) => a.budgetLeft - b.budgetLeft)[0];
  return { total: store.alerts.length, critical, atRisk, worst };
});

const sevColor = (sev) => {
  if (['critical', 'sev1', 'sev2'].includes(sev)) return 'critical';
  if (['warning', 'sev3'].includes(sev)) return 'warning';
  return 'neutral';
};

function budgetClass(left) {
  if (left < 20) return 'rp-low';
  if (left < 50) return 'rp-mid';
  return 'rp-high';
}

function alertLinks(a) {
  const links = [];
  if (a.owner.appId) links.push({ text: a.owner.name, to: `/apps/${a.owner.appId}`, icon: 'rectangle-stack' });
  if (a.owner.instId) links.push({ text: a.owner.instId, to: `/infra/instances/${a.owner.instId}`, icon: 'cylinder-split' });
  if (a.owner.team) links.push({ text: a.owner.team.name, to: `/teams/${a.owner.team.id}`, icon: 'person-2' });
  links.push({ text: 'On-call rooster', to: '/teams/on-call', icon: 'clock' });
  return links;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Alerts & SLO"
      lede="Actieve alerts en het error-budget per dienst. Klik door naar de app, het team of het on-call rooster."
      :crumbs="[{ text: 'Observability', href: '/observability' }, { text: 'Alerts & SLO', href: '/observability/alerts' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Dashboards" start-icon="eye" href="/observability"></nldd-button>
        <nldd-button variant="primary" text="On-call rooster" start-icon="clock" href="/teams/on-call"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="kpis.total" label="Actieve alerts" :sub="kpis.critical + ' kritiek'" icon="exclamation-triangle" />
      <MetricCard :value="kpis.atRisk" label="SLO's in gevaar" sub="budget onder 20%" icon="heart" />
      <MetricCard
        v-if="kpis.worst"
        :value="kpis.worst.budgetLeft + '%'"
        label="Laagste error-budget"
        :sub="store.appById(kpis.worst.service)?.name || kpis.worst.service"
        icon="arrow-up-arrow-down"
      />
      <MetricCard :value="store.slos.length" label="Diensten met SLO" sub="gemeten beschikbaarheid" icon="shield-check-mark" to="/observability" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-cols">
      <!-- Active alerts -->
      <section>
        <nldd-title size="4"><h2>Actieve alerts</h2></nldd-title>
        <nldd-spacer size="12" />

        <div v-if="enriched.length" class="rp-alert-list">
          <nldd-card v-for="a in enriched" :key="a.id" :accessible-label="'Alert ' + a.text">
            <nldd-container padding="20">
              <div class="rp-alert-top">
                <nldd-tag :color="sevColor(a.severity)" size="md">{{ a.severity }}</nldd-tag>
                <span class="rp-alert-since"><nldd-icon name="clock" aria-hidden="true"></nldd-icon> sinds {{ a.since }}</span>
              </div>
              <nldd-spacer size="8" />
              <div class="rp-alert-text">{{ a.text }}</div>
              <nldd-spacer size="8" />
              <div class="rp-alert-meta">
                <router-link v-if="a.owner.appId" :to="`/apps/${a.owner.appId}`" class="rp-alert-svc">
                  <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>{{ a.owner.name }}
                </router-link>
                <span v-else class="rp-alert-svc"><nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon>{{ a.owner.name }}</span>

                <router-link v-if="a.owner.team" :to="`/teams/${a.owner.team.id}`" class="rp-alert-team">
                  {{ a.owner.team.name }}
                </router-link>
              </div>
              <nldd-spacer size="12" />
              <div class="rp-alert-actions">
                <router-link v-if="a.oncall" :to="`/teams/mensen/${a.oncall.id}`" class="rp-oncall-chip">
                  <span class="rp-oncall-av">{{ a.oncall.avatar }}</span>
                  <span>On-call: {{ a.oncall.name }}</span>
                </router-link>
                <nldd-button variant="secondary" size="sm" text="On-call rooster" start-icon="clock" href="/teams/on-call"></nldd-button>
              </div>
            </nldd-container>
          </nldd-card>
        </div>
        <nldd-inline-dialog
          v-else
          title="Geen actieve alerts"
          supporting-text="Alle diensten zitten binnen hun drempelwaarden."
        ></nldd-inline-dialog>
      </section>

      <!-- SLO burndown -->
      <section>
        <nldd-title size="4"><h2>Error-budget per dienst</h2></nldd-title>
        <nldd-spacer size="12" />

        <nldd-card>
          <nldd-container padding="20">
            <div v-for="s in sloRows" :key="s.service" class="rp-slo-block">
              <div class="rp-slo-head">
                <router-link v-if="s.app" :to="`/apps/${s.app.id}`" class="rp-slo-name">{{ s.app.name }}</router-link>
                <span v-else class="rp-slo-name">{{ s.service }}</span>
                <span class="rp-slo-target">doel {{ s.target }}% · nu {{ s.current }}%</span>
              </div>
              <div class="rp-burn">
                <div class="rp-burn-track">
                  <div class="rp-burn-fill" :class="budgetClass(s.budgetLeft)" :style="{ width: s.budgetLeft + '%' }"></div>
                </div>
                <span class="rp-burn-pct" :class="budgetClass(s.budgetLeft)">{{ s.budgetLeft }}%</span>
              </div>
              <div class="rp-slo-foot">
                <StatusBadge :status="s.current >= s.target ? 'ok' : 'verstoord'" size="md" />
                <span class="rp-slo-burned">{{ s.burned }}% budget verbruikt</span>
                <router-link v-if="s.team" :to="`/teams/${s.team.id}`" class="rp-slo-team">{{ s.team.name }}</router-link>
              </div>
            </div>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="16" />
        <RelationLinks
          title="Gerelateerd"
          :links="[
            { text: 'On-call rooster', to: '/teams/on-call', icon: 'clock' },
            { text: 'Dashboards', to: '/observability', icon: 'eye' },
            { text: 'Logs', to: '/observability/logs', icon: 'books-vertical' },
            { text: 'Traces', to: '/observability/traces', icon: 'arrow-up-arrow-down' },
          ]"
        />
      </section>
    </div>
  </div>
</template>

<style scoped>
.rp-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}
.rp-alert-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-alert-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rp-alert-since {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  opacity: 0.65;
}
.rp-alert-since nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-alert-text {
  font-weight: 600;
  font-size: 1.02rem;
}
.rp-alert-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-alert-svc {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-focus-color);
}
.rp-alert-svc nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-alert-team {
  font-size: 0.85rem;
  opacity: 0.75;
  text-decoration: none;
  color: inherit;
}
.rp-alert-team:hover {
  text-decoration: underline;
}
.rp-alert-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-oncall-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.6rem 0.3rem 0.3rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  font-size: 0.85rem;
}
.rp-oncall-chip:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-oncall-av {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background: var(--semantics-surfaces-tinted-background-color);
  font-size: 0.72rem;
  font-weight: 700;
}
.rp-slo-block {
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-slo-block:last-child {
  border-bottom: none;
}
.rp-slo-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}
.rp-slo-name {
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-focus-color);
}
.rp-slo-name:hover {
  text-decoration: underline;
}
.rp-slo-target {
  font-size: 0.78rem;
  opacity: 0.65;
  font-variant-numeric: tabular-nums;
}
.rp-burn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.45rem 0 0.35rem;
}
.rp-burn-track {
  flex: 1;
  height: 14px;
  border-radius: 7px;
  background: var(--semantics-surfaces-tinted-background-color);
  border: 1px solid var(--semantics-dividers-color);
  overflow: hidden;
}
.rp-burn-fill {
  height: 100%;
  border-radius: 7px 0 0 7px;
  transition: width 0.3s ease;
}
.rp-burn-fill.rp-high {
  background: #4a8a3c;
}
.rp-burn-fill.rp-mid {
  background: #e0a800;
}
.rp-burn-fill.rp-low {
  background: #d4351c;
}
.rp-burn-pct {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 0.85rem;
  width: 2.8rem;
  text-align: right;
}
.rp-burn-pct.rp-high {
  color: #4a8a3c;
}
.rp-burn-pct.rp-mid {
  color: #8a6500;
}
.rp-burn-pct.rp-low {
  color: #d4351c;
}
.rp-slo-foot {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8rem;
}
.rp-slo-burned {
  opacity: 0.65;
}
.rp-slo-team {
  margin-left: auto;
  text-decoration: none;
  color: inherit;
  opacity: 0.75;
}
.rp-slo-team:hover {
  text-decoration: underline;
}
@media (max-width: 920px) {
  .rp-cols {
    grid-template-columns: 1fr;
  }
}
</style>
