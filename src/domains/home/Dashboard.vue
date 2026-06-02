<script setup>
// The opening dashboard of the Begane Grond. It stitches the layers together:
// a row of KPI metric cards, the clickable layer-stack (physical -> infra ->
// apps), a recent-activity feed from the audit log, and shortcuts to the
// wizards. This is the first thing the demo shows, so it must feel alive and
// fully populated from the seed data.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import LayerStack from './LayerStack.vue';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();
const presentation = usePresentation();

const me = computed(() => store.currentPerson);
const myTeam = computed(() => (me.value ? store.teamById(me.value.team) : null));

// --- KPI row: one number per platform layer ---
const metrics = computed(() => [
  { value: store.datacenters.length, label: 'Datacenters', sub: `${store.datacenters.filter((d) => d.status === 'operationeel').length} operationeel`, icon: 'apartment-building', to: '/fysiek' },
  { value: store.racks.length, label: 'Racks', sub: `${store.alleys.length} rijen`, icon: 'rectangle-stack', to: '/fysiek' },
  { value: store.instances.length, label: 'Afgenomen instances', sub: `€${instancesCostMonth.value}/mnd`, icon: 'cylinder-split', to: '/infra/instances' },
  { value: store.apps.length, label: 'Applicaties', sub: `${store.repos.length} repo's`, icon: 'rectangle-stack', to: '/apps' },
  { value: store.teams.length, label: 'Teams', sub: `${store.people.length} mensen`, icon: 'person-2', to: '/teams' },
  { value: store.workplaces.length, label: 'Werkplekken', sub: `${workplacesActive.value} in gebruik`, icon: 'person-circle', to: '/werkplekken' },
  { value: activeIncidents.value.length, label: 'Actieve incidenten', sub: activeIncidents.value.length ? 'aandacht nodig' : 'alles rustig', icon: 'exclamation-triangle', to: '/incidenten' },
  { value: openFleetPrs.value, label: "Open fleet-PR's", sub: `${activeCampaigns.value} actieve campagnes`, icon: 'ship-wheel', to: '/fleet' },
]);

const instancesCostMonth = computed(() => store.instances.reduce((sum, i) => sum + (i.costMonth || 0), 0));
const workplacesActive = computed(() => store.workplaces.filter((w) => w.status === 'in gebruik').length);
const activeIncidents = computed(() => store.incidents.filter((i) => i.status !== 'resolved' && i.status !== 'opgelost'));
const activeCampaigns = computed(() => store.campaigns.filter((c) => c.status === 'actief').length);
const openFleetPrs = computed(() => store.campaigns.reduce((sum, c) => sum + (c.progress?.open || 0), 0));

// --- Recent activity from the audit log ---
const activity = computed(() => store.auditLog.slice(0, 8));
const actionIcon = (action) => {
  if (action.includes('afgenomen') || action.includes('aangemaakt')) return 'plus';
  if (action.includes('geroteerd')) return 'lock-closed';
  if (action.includes('gepromoot')) return 'arrow-up-arrow-down';
  if (action.includes('verwijderd')) return 'dismiss';
  if (action.includes('campagne')) return 'ship-wheel';
  if (action.includes('werkplek')) return 'person-circle';
  if (action.includes('incident')) return 'exclamation-triangle';
  return 'check-mark-circle';
};
const actorPerson = (id) => store.personById(id);

// --- Wizard shortcuts ---
const shortcuts = [
  { title: 'Nieuwe applicatie', desc: 'Gebaand pad: repo, CI en infra in één keer', icon: 'rectangle-stack', to: '/apps/nieuw' },
  { title: 'Dienst afnemen', desc: 'Kubernetes, database of broker uit de catalogus', icon: 'cylinder-split', to: '/infra' },
  { title: 'Werkplek uitrollen', desc: 'Autonome Linux-laptop voor een collega', icon: 'person-circle', to: '/werkplekken/nieuw' },
  { title: 'Fleet-campagne', desc: 'Eén wijziging over alle repos uitrollen', icon: 'ship-wheel', to: '/fleet/nieuw' },
];

// --- Platform health snapshot for the side rail ---
const sloAtRisk = computed(() => store.slos.filter((s) => s.budgetLeft < 25));
const criticalVulns = computed(() => store.vulnerabilities.filter((v) => v.severity === 'critical' && v.status !== 'opgelost'));
const redCi = computed(() => store.repos.filter((r) => r.ci === 'red'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Begane Grond"
      :lede="`Welkom ${me?.name?.split(' ')[0] || ''}, één plek voor fysieke infra, diensten, applicaties en teams van de Rijksoverheid.`"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Presentatie" start-icon="caret-right" @click="presentation.start(0)" />
        <nldd-button variant="secondary" text="Mijn spullen" start-icon="person" @click="$router.push('/zelf')" />
        <nldd-button variant="primary" text="Nieuwe applicatie" start-icon="plus" @click="$router.push('/apps/nieuw')" />
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-collection layout="grid" item-width="220px">
      <MetricCard
        v-for="m in metrics"
        :key="m.label"
        :value="m.value"
        :label="m.label"
        :sub="m.sub"
        :icon="m.icon"
        :to="m.to"
      />
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- Main two-column body -->
    <div class="rp-home-grid">
      <!-- Left: layer stack -->
      <section>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>De lagen van het platform</h2></nldd-title>
              <nldd-tag color="neutral" size="md">persoon → datacenter</nldd-tag>
            </div>
            <nldd-rich-text>
              <p>Alles hangt samen. Klik een laag aan om door te dalen, of volg de keten van persoon naar team, app, instance, rack en datacenter.</p>
            </nldd-rich-text>
            <nldd-spacer size="16" />
            <LayerStack />
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <!-- Wizard shortcuts -->
        <nldd-card>
          <nldd-container padding="24">
            <nldd-title size="4"><h2>Snel aan de slag</h2></nldd-title>
            <nldd-spacer size="16" />
            <div class="rp-shortcut-grid">
              <router-link
                v-for="s in shortcuts"
                :key="s.to"
                :to="s.to"
                class="rp-shortcut"
              >
                <div class="rp-shortcut-icon">
                  <nldd-icon :name="s.icon" aria-hidden="true"></nldd-icon>
                </div>
                <div class="rp-shortcut-title">{{ s.title }}</div>
                <div class="rp-shortcut-desc">{{ s.desc }}</div>
                <div class="rp-shortcut-cta">
                  Start <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
                </div>
              </router-link>
            </div>
          </nldd-container>
        </nldd-card>
      </section>

      <!-- Right rail: activity + health -->
      <aside>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Recente activiteit</h2></nldd-title>
              <nldd-icon name="clock" aria-hidden="true" class="rp-head-icon"></nldd-icon>
            </div>
            <nldd-spacer size="12" />
            <ul class="rp-activity">
              <li v-for="a in activity" :key="a.id" class="rp-activity-item">
                <span class="rp-activity-dot">
                  <nldd-icon :name="actionIcon(a.action)" aria-hidden="true"></nldd-icon>
                </span>
                <div class="rp-activity-body">
                  <div class="rp-activity-line">
                    <router-link
                      v-if="actorPerson(a.actor)"
                      :to="`/teams/mensen/${a.actor}`"
                      class="rp-activity-actor"
                    >{{ actorPerson(a.actor)?.name || a.actor }}</router-link>
                    <span v-else class="rp-activity-actor">{{ a.actor }}</span>
                    <span class="rp-activity-action">{{ a.action }}</span>
                  </div>
                  <div class="rp-activity-meta">
                    <code class="rp-activity-res">{{ a.resource }}</code>
                    <span class="rp-activity-at">{{ a.at }}</span>
                  </div>
                </div>
              </li>
            </ul>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <!-- Platform health snapshot -->
        <nldd-card>
          <nldd-container padding="24">
            <nldd-title size="4"><h2>Platformgezondheid</h2></nldd-title>
            <nldd-spacer size="16" />

            <router-link to="/incidenten" class="rp-health-row">
              <span class="rp-health-label">
                <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
                Open incidenten
              </span>
              <StatusBadge :status="activeIncidents.length ? 'sev2' : 'ok'" />
            </router-link>

            <router-link to="/observability" class="rp-health-row">
              <span class="rp-health-label">
                <nldd-icon name="heart" aria-hidden="true"></nldd-icon>
                SLO-budget krap
              </span>
              <nldd-tag :color="sloAtRisk.length ? 'warning' : 'success'" size="md">
                {{ sloAtRisk.length ? `${sloAtRisk.length} service` : 'op koers' }}
              </nldd-tag>
            </router-link>

            <router-link to="/security/kwetsbaarheden" class="rp-health-row">
              <span class="rp-health-label">
                <nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>
                Kritieke CVE's
              </span>
              <nldd-tag :color="criticalVulns.length ? 'critical' : 'success'" size="md">
                {{ criticalVulns.length || 0 }}
              </nldd-tag>
            </router-link>

            <router-link to="/code" class="rp-health-row">
              <span class="rp-health-label">
                <nldd-icon name="terminal" aria-hidden="true"></nldd-icon>
                CI rood
              </span>
              <nldd-tag :color="redCi.length ? 'critical' : 'success'" size="md">
                {{ redCi.length }} repo
              </nldd-tag>
            </router-link>

            <nldd-spacer size="16" />
            <router-link v-if="myTeam" :to="`/teams/${myTeam.id}`" class="rp-myteam">
              <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
              <span>Jouw team: <strong>{{ myTeam.name }}</strong></span>
              <nldd-icon name="chevron-right" aria-hidden="true" class="rp-myteam-go"></nldd-icon>
            </router-link>
          </nldd-container>
        </nldd-card>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.rp-page {
  /* Layer accents reused by LayerStack and shortcuts. */
  --rp-layer-apps: #2563eb;
  --rp-layer-infra: #0d9488;
  --rp-layer-fysiek: #d97706;
}

.rp-home-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-home-grid {
    grid-template-columns: 1fr;
  }
}

.rp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.rp-head-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.5;
}

/* Shortcuts: an even grid so 4 cards fill the row instead of leaving an orphan
   wrapping underneath. Collapses to 2 columns on narrow screens. */
.rp-shortcut-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}
@media (max-width: 560px) {
  .rp-shortcut-grid {
    grid-template-columns: 1fr;
  }
}
.rp-shortcut {
  display: block;
  height: 100%;
  padding: 0.9rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 0.12s ease;
}
.rp-shortcut:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-shortcut-icon {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.rp-shortcut-icon nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.6;
}
.rp-shortcut-title {
  font-weight: 700;
}
.rp-shortcut-desc {
  font-size: 0.82rem;
  opacity: 0.7;
  margin-top: 0.15rem;
}
.rp-shortcut-cta {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-shortcut-cta nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}

/* Activity feed */
.rp-activity {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.rp-activity-item {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
}
.rp-activity-dot {
  flex: 0 0 auto;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
}
.rp-activity-dot nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.75;
}
.rp-activity-body {
  min-width: 0;
  flex: 1 1 auto;
}
.rp-activity-line {
  font-size: 0.9rem;
}
.rp-activity-actor {
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}
.rp-activity-actor:hover {
  text-decoration: underline;
}
.rp-activity-action {
  opacity: 0.8;
  margin-left: 0.25rem;
}
.rp-activity-meta {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-top: 0.15rem;
  flex-wrap: wrap;
}
.rp-activity-res {
  font-size: 0.76rem;
  padding: 0.05rem 0.35rem;
  border-radius: 5px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
}
.rp-activity-at {
  font-size: 0.74rem;
  opacity: 0.55;
}

/* Health rail */
.rp-health-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
  text-decoration: none;
  color: inherit;
}
.rp-health-row:hover .rp-health-label {
  text-decoration: underline;
}
.rp-health-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}
.rp-health-label nldd-icon {
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.7;
}
.rp-myteam {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
  text-decoration: none;
  color: inherit;
  font-size: 0.9rem;
}
.rp-myteam nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
}
.rp-myteam-go {
  margin-left: auto;
  opacity: 0.5;
}
</style>
