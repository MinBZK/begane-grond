<script setup>
// "Mijn overzicht": a personal landing page for the logged-in demo user
// (store.currentPerson). It stitches the whole platform together from one
// person's point of view: their teams, apps, infra, workplace, on-call status,
// open actions that need attention, and shortcuts into the golden paths.
// Everything is clickable through to the real detail pages.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';
import NotificationInbox from '../../components/shared/NotificationInbox.vue';

const store = usePlatformStore();

const me = computed(() => store.currentPerson);
const myTeam = computed(() => store.teamOfPerson(me.value.id));
const myOrg = computed(() => (myTeam.value ? store.orgById(myTeam.value.org) : null));

// Apps and instances that belong to my team(s). The seed gives a person one
// team, but we treat it as a list so the layout survives multi-team members.
const myTeams = computed(() => (myTeam.value ? [myTeam.value] : []));
const myApps = computed(() => myTeams.value.flatMap((t) => store.appsByTeam(t.id)));
const myInstances = computed(() => myTeams.value.flatMap((t) => store.instancesByTeam(t.id)));
const myWorkplaces = computed(() => store.workplacesByPerson(me.value.id));

// Monthly infra spend across my team's instances.
const monthlySpend = computed(() => myInstances.value.reduce((sum, i) => sum + (i.costMonth || 0), 0));

// On-call: am I currently the pager, or in the escalation chain?
const myOncall = computed(() =>
  store.oncall.find((o) => o.person === me.value.id || (o.escalation || []).includes(me.value.id)),
);
const onCallNow = computed(() => myOncall.value?.person === me.value.id);
const isEscalation = computed(() => myOncall.value && (myOncall.value.escalation || []).includes(me.value.id));

// --- Open actions: things assigned to me / my team that need attention. ---
// Parse "over N dagen" / "N dagen geleden" so we can flag soon-to-expire secrets.
function daysFromExpires(text) {
  const m = /over (\d+) dag/.exec(text || '');
  return m ? Number(m[1]) : Infinity;
}

const teamIds = computed(() => myTeams.value.map((t) => t.id));

const rotatingSecrets = computed(() =>
  store.secrets.filter((s) => teamIds.value.includes(s.team)),
);
const assignedVulns = computed(() =>
  store.vulnerabilities.filter((v) => teamIds.value.includes(v.team) && v.status !== 'opgelost'),
);
const pendingChanges = computed(() =>
  store.changes.filter((c) => teamIds.value.includes(c.team) && c.status === 'in beoordeling'),
);
const myIncidents = computed(() =>
  myTeams.value.flatMap((t) => store.incidentsByTeam(t.id)).filter((i) => i.status !== 'resolved'),
);

// A single normalized action feed for the "openstaande acties" list.
const actions = computed(() => {
  const list = [];
  for (const s of rotatingSecrets.value) {
    list.push({
      id: `sec-${s.id}`,
      icon: 'lock-closed',
      tone: daysFromExpires(s.expires) <= 14 ? 'critical' : 'warning',
      title: `Roteer secret ${s.name}`,
      sub: `Verloopt ${s.expires} · laatst geroteerd ${s.rotated}`,
      cta: 'Roteren',
      secretId: s.id,
    });
  }
  for (const v of assignedVulns.value) {
    list.push({
      id: `vuln-${v.id}`,
      icon: 'shield-check-mark',
      tone: v.severity === 'critical' ? 'critical' : 'warning',
      title: `${v.cve} (${v.severity})`,
      sub: `Toegewezen kwetsbaarheid in ${store.appById(v.app)?.name || v.app} · ${v.status}`,
      cta: 'Bekijk repo',
      to: `/code/${store.appById(v.app)?.repo || v.repo}`,
    });
  }
  for (const c of pendingChanges.value) {
    list.push({
      id: `chg-${c.id}`,
      icon: 'check-mark-circle',
      tone: 'warning',
      title: `Keur change goed: ${c.title}`,
      sub: `Risico ${c.risk} · venster ${c.window}`,
      cta: 'Naar wijzigingen',
      to: '/incidenten/changes',
    });
  }
  for (const i of myIncidents.value) {
    list.push({
      id: `inc-${i.id}`,
      icon: 'exclamation-triangle',
      tone: 'critical',
      title: i.title,
      sub: `${i.severity} · ${i.status} · geopend ${i.opened}`,
      cta: 'Naar incident',
      to: `/incidenten/${i.id}`,
    });
  }
  return list;
});

const openActionCount = computed(() => actions.value.length);

// Recent activity by me, pulled from the shared audit log.
const myActivity = computed(() => store.auditLog.filter((a) => a.actor === me.value.id).slice(0, 6));

// Relation chips: the full person -> team -> app -> instance -> rack -> dc chain.
const relationLinks = computed(() => {
  const links = [
    { text: `Mijn profiel: ${me.value.name}`, to: `/teams/mensen/${me.value.id}`, icon: 'person-circle' },
  ];
  if (myTeam.value) links.push({ text: myTeam.value.name, to: `/teams/${myTeam.value.id}`, icon: 'person-2' });
  const firstApp = myApps.value[0];
  if (firstApp) links.push({ text: firstApp.name, to: `/apps/${firstApp.id}`, icon: 'rectangle-stack' });
  const firstInst = myInstances.value[0];
  if (firstInst) links.push({ text: firstInst.name, to: `/infra/instances/${firstInst.id}`, icon: 'cylinder-split' });
  const rackInst = myInstances.value.find((i) => i.rack);
  if (rackInst) links.push({ text: `Rack ${store.rackById(rackInst.rack)?.label || rackInst.rack}`, to: `/fysiek/racks/${rackInst.rack}`, icon: 'apartment-building' });
  if (rackInst) links.push({ text: store.datacenterById(rackInst.dc)?.name || rackInst.dc, to: `/fysiek/datacenters/${rackInst.dc}`, icon: 'house' });
  return links;
});

const instanceColumns = [
  { key: 'name', label: 'Naam', mono: true },
  { key: 'kind', label: 'Type' },
  { key: 'env', label: 'Omgeving' },
  { key: 'size', label: 'Grootte' },
  { key: 'status', label: 'Status' },
  { key: 'costMonth', label: 'Kosten/mnd', align: 'right' },
];

function rotate(secretId) {
  store.rotateSecret(secretId);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      :title="`Welkom, ${me.name.split(' ')[0]}`"
      :lede="`${me.role}${myOrg ? ' bij ' + myOrg.name : ''}. Alles wat van jou en je team is, op één plek.`"
      :crumbs="[{ text: 'Home', href: '/' }, { text: 'Mijn overzicht', href: '/zelf' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Nieuwe app" start-icon="plus" @click="$router.push('/apps/nieuw')" />
        <nldd-button variant="primary" text="Infra afnemen" start-icon="plus" @click="$router.push('/infra/order/kubernetes')" />
      </template>
    </PageHeader>

    <!-- Identity strip: who am I, what's my pager status -->
    <nldd-card accessible-label="Mijn profiel">
      <nldd-container padding="20">
        <div class="rp-identity">
          <div class="rp-avatar" aria-hidden="true">{{ me.avatar }}</div>
          <div class="rp-identity-meta">
            <nldd-title size="4"><h2>{{ me.name }}</h2></nldd-title>
            <div class="rp-identity-sub">
              <nldd-tag color="accent" size="md">{{ me.role }}</nldd-tag>
              <nldd-tag v-if="myTeam" color="accent" size="md">{{ myTeam.name }}</nldd-tag>
              <span class="rp-matrix"><nldd-icon name="link" aria-hidden="true"></nldd-icon> {{ me.matrix }}</span>
            </div>
          </div>
          <div class="rp-identity-oncall">
            <template v-if="onCallNow">
              <nldd-tag color="critical" size="md">Nu piket</nldd-tag>
              <span class="rp-oncall-sub">tot {{ myOncall.until }}</span>
            </template>
            <template v-else-if="isEscalation">
              <nldd-tag color="warning" size="md">Escalatie-piket</nldd-tag>
              <span class="rp-oncall-sub">achter {{ store.personById(myOncall.person)?.name }}</span>
            </template>
            <template v-else>
              <nldd-tag color="success" size="md">Geen piket</nldd-tag>
            </template>
            <router-link to="/teams/on-call" class="rp-oncall-link">Piketrooster <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon></router-link>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="20" />

    <!-- KPI row -->
    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="myApps.length" label="Mijn apps" sub="services en sites" icon="rectangle-stack" :to="myApps.length ? `/apps/${myApps[0].id}` : ''" />
      <MetricCard :value="myInstances.length" label="Afgenomen infra" sub="instances van mijn team" icon="cylinder-split" />
      <MetricCard :value="`€ ${monthlySpend.toLocaleString('nl-NL')}`" label="Infra-kosten" sub="per maand" icon="euro-sign" to="/kosten" />
      <MetricCard :value="openActionCount" label="Openstaande acties" :sub="openActionCount ? 'vragen om aandacht' : 'alles bij'" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-grid-main">
      <!-- Left column: actions, infra, apps -->
      <div class="rp-col-main">
        <!-- Open actions -->
        <nldd-card accessible-label="Openstaande acties">
          <nldd-container padding="20">
            <div class="rp-section-head">
              <nldd-title size="5"><h3>Openstaande acties</h3></nldd-title>
              <nldd-tag :color="openActionCount ? 'critical' : 'success'" size="md">{{ openActionCount }}</nldd-tag>
            </div>
            <nldd-spacer size="12" />
            <div v-if="actions.length" class="rp-actions">
              <div v-for="a in actions" :key="a.id" class="rp-action" :class="`rp-tone-${a.tone}`">
                <nldd-icon :name="a.icon" aria-hidden="true" class="rp-action-icon"></nldd-icon>
                <div class="rp-action-body">
                  <div class="rp-action-title">{{ a.title }}</div>
                  <div class="rp-action-sub">{{ a.sub }}</div>
                </div>
                <nldd-button
                  v-if="a.secretId"
                  variant="primary"
                  size="sm"
                  text="Roteren"
                  start-icon="arrow-up-arrow-down"
                  @click="rotate(a.secretId)"
                />
                <nldd-button
                  v-else
                  variant="secondary"
                  size="sm"
                  :text="a.cta"
                  end-icon="arrow-right"
                  @click="$router.push(a.to)"
                />
              </div>
            </div>
            <nldd-inline-dialog
              v-else
              title="Niets te doen"
              supporting-text="Geen openstaande acties voor jou of je team. Goed bezig."
            ></nldd-inline-dialog>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- Notification feed, fed by the event bus -->
        <nldd-card accessible-label="Mijn notificaties">
          <nldd-container padding="20">
            <div class="rp-section-head">
              <nldd-title size="5"><h3>Mijn notificaties</h3></nldd-title>
              <router-link to="/notificaties" class="rp-section-link">Alle notificaties <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon></router-link>
            </div>
            <nldd-spacer size="12" />
            <NotificationInbox variant="full" :limit="8" />
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- My infra -->
        <nldd-card accessible-label="Mijn infra">
          <nldd-container padding="20">
            <div class="rp-section-head">
              <nldd-title size="5"><h3>Mijn afgenomen infra</h3></nldd-title>
              <router-link to="/infra/order/kubernetes" class="rp-section-link">Meer afnemen <nldd-icon name="plus" aria-hidden="true"></nldd-icon></router-link>
            </div>
            <nldd-spacer size="12" />
            <DataTable :columns="instanceColumns" :rows="myInstances" row-key="id">
              <template #cell="{ row, col, value }">
                <router-link v-if="col.key === 'name'" :to="`/infra/instances/${row.id}`" class="rp-cell-link">{{ value }}</router-link>
                <StatusBadge v-else-if="col.key === 'status'" :status="value" />
                <span v-else-if="col.key === 'costMonth'">€ {{ value }}</span>
                <span v-else>{{ value }}</span>
              </template>
            </DataTable>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- My apps -->
        <nldd-card accessible-label="Mijn apps">
          <nldd-container padding="20">
            <div class="rp-section-head">
              <nldd-title size="5"><h3>Mijn apps en services</h3></nldd-title>
              <router-link to="/apps/nieuw" class="rp-section-link">Nieuwe app <nldd-icon name="plus" aria-hidden="true"></nldd-icon></router-link>
            </div>
            <nldd-spacer size="12" />
            <nldd-collection layout="grid" item-width="280px">
              <router-link v-for="app in myApps" :key="app.id" :to="`/apps/${app.id}`" class="rp-app-card-link">
                <nldd-card :accessible-label="app.name">
                  <nldd-container padding="16">
                    <div class="rp-app-head">
                      <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
                      <strong>{{ app.name }}</strong>
                    </div>
                    <div class="rp-app-stack">{{ app.stack.join(' · ') }}</div>
                    <nldd-spacer size="8" />
                    <div class="rp-app-tags">
                      <StatusBadge :status="app.health" size="sm" />
                      <nldd-tag color="neutral" size="sm">{{ app.maturity }}</nldd-tag>
                      <nldd-tag color="neutral" size="sm">{{ app.type }}</nldd-tag>
                    </div>
                  </nldd-container>
                </nldd-card>
              </router-link>
            </nldd-collection>
          </nldd-container>
        </nldd-card>
      </div>

      <!-- Right column: workplace, relations, activity, shortcuts -->
      <div class="rp-col-side">
        <!-- My workplace -->
        <nldd-card accessible-label="Mijn werkplek">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Mijn werkplek</h3></nldd-title>
            <nldd-spacer size="12" />
            <div v-for="wp in myWorkplaces" :key="wp.id" class="rp-wp">
              <router-link :to="`/werkplekken/${wp.id}`" class="rp-wp-head">
                <nldd-icon name="cloud" aria-hidden="true"></nldd-icon>
                <span class="rp-wp-id">{{ wp.id }}</span>
                <StatusBadge :status="wp.status" size="sm" />
              </router-link>
              <ul class="rp-wp-meta">
                <li><span>Hardware</span><strong>{{ store.hardware.find((h) => h.id === wp.model)?.name || wp.model }}</strong></li>
                <li><span>Image</span><strong>{{ store.images.find((im) => im.id === wp.image)?.name || wp.image }}</strong></li>
                <li><span>Encryptie</span><strong>{{ wp.encrypted ? 'volledig' : 'nee' }}</strong></li>
                <li><span>Updates</span><strong>{{ wp.updated ? 'bij' : 'beschikbaar' }}</strong></li>
                <li><span>Gezien</span><strong>{{ wp.lastSeen }}</strong></li>
              </ul>
            </div>
            <template v-if="!myWorkplaces.length">
              <nldd-rich-text><p>Nog geen werkplek uitgerold.</p></nldd-rich-text>
            </template>
            <nldd-spacer size="12" />
            <nldd-button variant="secondary" text="Werkplek aanvragen" start-icon="plus" @click="$router.push('/werkplekken/nieuw')" />
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- Relation chain -->
        <RelationLinks title="Doorklikken" :links="relationLinks" />

        <nldd-spacer size="20" />

        <!-- Recent activity -->
        <nldd-card accessible-label="Mijn recente activiteit">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Mijn recente activiteit</h3></nldd-title>
            <nldd-spacer size="12" />
            <ul v-if="myActivity.length" class="rp-activity">
              <li v-for="a in myActivity" :key="a.id">
                <nldd-icon name="clock" aria-hidden="true"></nldd-icon>
                <div>
                  <div class="rp-activity-action">{{ a.action }}</div>
                  <div class="rp-activity-res">{{ a.resource }} · {{ a.at }}</div>
                </div>
              </li>
            </ul>
            <nldd-rich-text v-else><p>Nog geen activiteit.</p></nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- Shortcuts -->
        <nldd-card accessible-label="Snelacties">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Snelacties</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-shortcuts">
              <router-link to="/apps/nieuw" class="rp-shortcut"><nldd-icon name="sparkles" aria-hidden="true"></nldd-icon> Nieuwe app (gebaand pad)</router-link>
              <router-link to="/infra/order/postgres" class="rp-shortcut"><nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon> Database afnemen</router-link>
              <router-link to="/infra/order/kubernetes" class="rp-shortcut"><nldd-icon name="ship-wheel" aria-hidden="true"></nldd-icon> Kubernetes afnemen</router-link>
              <router-link to="/werkplekken/nieuw" class="rp-shortcut"><nldd-icon name="cloud" aria-hidden="true"></nldd-icon> Werkplek aanvragen</router-link>
              <router-link to="/ai/llm" class="rp-shortcut"><nldd-icon name="sparkles" aria-hidden="true"></nldd-icon> Overheids-LLM gebruiken</router-link>
              <router-link to="/teams/on-call" class="rp-shortcut"><nldd-icon name="heart" aria-hidden="true"></nldd-icon> Piketrooster bekijken</router-link>
            </div>
          </nldd-container>
        </nldd-card>
      </div>
    </div>

    <nldd-spacer size="24" />

    <CliHint command="bg whoami --mine" label="Hetzelfde overzicht via de CLI:" />
  </div>
</template>

<style scoped>
/* Identity strip */
.rp-identity {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: #fff;
  background: var(--semantics-action-primary-background-color);
  flex: 0 0 auto;
}
.rp-identity-meta {
  flex: 1 1 auto;
  min-width: 200px;
}
.rp-identity-sub {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
}
.rp-matrix {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-matrix nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-identity-oncall {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}
.rp-oncall-sub {
  font-size: 0.8rem;
  opacity: 0.65;
}
.rp-oncall-link {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.85rem;
  text-decoration: none;
  color: inherit;
  opacity: 0.8;
}
.rp-oncall-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}

/* Main two-column layout */
.rp-grid-main {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-grid-main {
    grid-template-columns: 1fr;
  }
}

.rp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-section-link,
.rp-cell-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--semantics-action-primary-background-color);
  font-weight: 600;
}
.rp-cell-link {
  font-size: inherit;
}
.rp-section-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}

/* Open actions */
.rp-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.rp-action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  border-left-width: 4px;
}
.rp-action.rp-tone-critical {
  border-left-color: var(--semantics-feedback-error-color);
}
.rp-action.rp-tone-warning {
  border-left-color: var(--semantics-feedback-warning-color);
}
.rp-action-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.7;
  flex: 0 0 auto;
}
.rp-action-body {
  flex: 1 1 auto;
  min-width: 0;
}
.rp-action-title {
  font-weight: 600;
}
.rp-action-sub {
  font-size: 0.82rem;
  opacity: 0.7;
}

/* App cards */
.rp-app-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-app-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-app-head nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
}
.rp-app-stack {
  margin-top: 0.35rem;
  font-size: 0.82rem;
  opacity: 0.65;
}
.rp-app-tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

/* Workplace */
.rp-wp + .rp-wp {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--semantics-dividers-color);
}
.rp-wp-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
}
.rp-wp-head nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
}
.rp-wp-id {
  font-family: ui-monospace, monospace;
  font-weight: 600;
}
.rp-wp-meta {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.rp-wp-meta li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.85rem;
}
.rp-wp-meta li span {
  opacity: 0.6;
}

/* Activity */
.rp-activity {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.rp-activity li {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
}
.rp-activity li nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.55;
  margin-top: 0.15rem;
  flex: 0 0 auto;
}
.rp-activity-action {
  font-weight: 600;
  font-size: 0.88rem;
}
.rp-activity-res {
  font-size: 0.8rem;
  opacity: 0.65;
}

/* Shortcuts */
.rp-shortcuts {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-shortcut {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: 8px;
  border: 1px solid var(--semantics-dividers-color);
  text-decoration: none;
  color: inherit;
  font-size: 0.9rem;
}
.rp-shortcut:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-shortcut nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
}
</style>
