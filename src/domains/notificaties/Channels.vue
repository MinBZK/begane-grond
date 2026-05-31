<script setup>
// Notifications domain: where teams declare how they want to be told things.
// Three concerns on one screen:
//   1. Channels  — store.channels: a Matrix room or a webhook per team.
//   2. Subscriptions — store.subscriptions: CloudEvents-style event names a team
//      listens for (deploy.completed, incident.opened, cost.budget-exceeded, …).
//   3. History — a mocked recent-events feed; each event is matched to the team
//      subscribed to it and "fanned out" over their channel, with a delivery
//      status (StatusBadge). The mock is local to this screen; adding a channel
//      or subscription mutates the live Pinia store.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();

// --- Reference catalog of CloudEvents the platform emits ------------------
// NL GOV CloudEvents profile: reverse-DNS-ish dotted names. Source is the
// platform service that produces the event; this is what lands in the `type`
// field of a CloudEvents envelope.
const eventCatalog = [
  { type: 'deploy.completed', source: 'nl.overheid.platform.deploy', desc: 'Een release is uitgerold naar een omgeving', icon: 'arrow-up-arrow-down' },
  { type: 'incident.opened', source: 'nl.overheid.platform.incidents', desc: 'Er is een nieuw incident geopend', icon: 'exclamation-triangle' },
  { type: 'incident.resolved', source: 'nl.overheid.platform.incidents', desc: 'Een incident is opgelost', icon: 'check-mark-circle' },
  { type: 'cost.budget-exceeded', source: 'nl.overheid.platform.finops', desc: 'Een team gaat over zijn maandbudget heen', icon: 'euro-sign' },
  { type: 'secret.rotated', source: 'nl.overheid.platform.secrets', desc: 'Een secret is geroteerd', icon: 'lock-closed' },
  { type: 'cert.expiring', source: 'nl.overheid.platform.pki', desc: 'Een certificaat verloopt binnen 30 dagen', icon: 'certificate' },
  { type: 'vuln.detected', source: 'nl.overheid.platform.security', desc: 'Een kwetsbaarheid is gevonden in een repo', icon: 'shield-check-mark' },
  { type: 'campaign.completed', source: 'nl.overheid.platform.fleet', desc: 'Een fleet-shift-campagne is afgerond', icon: 'ship-wheel' },
];

function eventMeta(type) {
  return eventCatalog.find((e) => e.type === type) || { type, source: 'nl.overheid.platform', desc: '', icon: 'envelope' };
}

function teamName(id) {
  return store.teamById(id)?.name || id;
}

function channelIcon(type) {
  return type === 'Matrix' ? 'person-2' : 'link';
}

// --- Channels -------------------------------------------------------------
const channelColumns = [
  { key: 'team', label: 'Team' },
  { key: 'type', label: 'Type' },
  { key: 'target', label: 'Bestemming', mono: true },
  { key: 'subs', label: 'Abonnementen', align: 'right' },
  { key: 'status', label: 'Status' },
];

const channelRows = computed(() =>
  store.channels.map((c) => ({
    ...c,
    subs: store.subscriptions.filter((s) => s.team === c.team).length,
    // A webhook with a truncated placeholder target is presented as still
    // pending verification; a real-looking URL or a Matrix room is operational.
    status: c.type === 'webhook' && c.target.includes('…') ? 'in beoordeling' : 'operationeel',
  }))
);

// --- Subscriptions --------------------------------------------------------
const subColumns = [
  { key: 'team', label: 'Team' },
  { key: 'event', label: 'Event-type', mono: true },
  { key: 'source', label: 'Bron', mono: true },
  { key: 'via', label: 'Bezorgd via' },
  { key: 'actions', label: '', align: 'right' },
];

const subRows = computed(() =>
  store.subscriptions.map((s) => {
    const meta = eventMeta(s.event);
    const channel = store.channels.find((c) => c.team === s.team);
    return {
      ...s,
      source: meta.source,
      desc: meta.desc,
      icon: meta.icon,
      via: channel ? channel.type : null,
    };
  })
);

function removeSubscription(id) {
  const sub = store.subscriptions.find((s) => s.id === id);
  store.subscriptions = store.subscriptions.filter((s) => s.id !== id);
  if (sub) store.audit('abonnement opgezegd', `${teamName(sub.team)} ✕ ${sub.event}`);
}

// --- New-subscription form ------------------------------------------------
const showForm = ref(false);
const formTeam = ref('team-platform');
const formEvent = ref('deploy.completed');

// Events the chosen team is not yet subscribed to (avoid duplicates).
const availableEvents = computed(() =>
  eventCatalog.filter(
    (e) => !store.subscriptions.some((s) => s.team === formTeam.value && s.event === e.type)
  )
);

const formChannel = computed(() => store.channels.find((c) => c.team === formTeam.value));

let _subSeq = 100;
function addSubscription() {
  if (!formEvent.value) return;
  const sub = { id: `sub-new-${++_subSeq}`, team: formTeam.value, event: formEvent.value };
  store.subscriptions.push(sub);
  store.audit('abonnement aangemaakt', `${teamName(sub.team)} → ${sub.event}`);
  showForm.value = false;
  formEvent.value = availableEvents.value[0]?.type || '';
}

function openForm() {
  showForm.value = true;
  formEvent.value = availableEvents.value[0]?.type || '';
}

// --- History mock ---------------------------------------------------------
// A recent feed of CloudEvents that actually fired, each fanned out to one
// subscribed team's channel with a delivery outcome. Hand-built so it reads
// like a believable afternoon on the platform.
const history = ref([
  { id: 'evt-9012', event: 'deploy.completed', team: 'team-platform', subject: 'app-platformportaal → prod', at: '14:22', delivery: 'geleverd' },
  { id: 'evt-9011', event: 'incident.opened', team: 'team-toeslagen', subject: 'inc-2024-017 · Verhoogde latency', at: '09:14', delivery: 'geleverd' },
  { id: 'evt-9010', event: 'cost.budget-exceeded', team: 'team-toeslagen', subject: 'Toeslagen €300 / €280', at: '08:55', delivery: 'failing' },
  { id: 'evt-9009', event: 'secret.rotated', team: 'team-platform', subject: 'platform/llm-gateway-key', at: 'di 09:40', delivery: 'geleverd' },
  { id: 'evt-9008', event: 'incident.resolved', team: 'team-platform', subject: 'inc-2024-016 · pg-primary temp', at: 'gisteren 16:30', delivery: 'geleverd' },
  { id: 'evt-9007', event: 'cert.expiring', team: 'team-data', subject: 'api.datadeling.overheid.nl · 30 dagen', at: 'gisteren 11:02', delivery: 'in beoordeling' },
  { id: 'evt-9006', event: 'vuln.detected', team: 'team-toeslagen', subject: 'CVE-2024-3094 · repo-toeslagen', at: 'ma 22:18', delivery: 'geleverd' },
  { id: 'evt-9005', event: 'deploy.completed', team: 'team-burgerzaken', subject: 'app-paspoort → prod', at: 'ma 14:22', delivery: 'geleverd' },
]);

const historyColumns = [
  { key: 'at', label: 'Tijd', mono: true },
  { key: 'event', label: 'Event-type', mono: true },
  { key: 'subject', label: 'Onderwerp' },
  { key: 'team', label: 'Team' },
  { key: 'channel', label: 'Kanaal' },
  { key: 'delivery', label: 'Bezorging' },
];

const historyRows = computed(() =>
  history.value.map((h) => {
    const channel = store.channels.find((c) => c.team === h.team);
    return {
      ...h,
      icon: eventMeta(h.event).icon,
      channelType: channel?.type || 'webhook',
      channelTarget: channel?.target || 'geen kanaal',
    };
  })
);

// Simulate a freshly fired event landing at the top of the feed.
let _evtSeq = 9012;
function fireTestEvent() {
  const channel = store.channels.find((c) => c.team === 'team-platform');
  history.value.unshift({
    id: `evt-${++_evtSeq}`,
    event: 'deploy.completed',
    team: 'team-platform',
    subject: 'rp test-event (handmatig)',
    at: 'zojuist',
    delivery: channel ? 'geleverd' : 'failing',
  });
  store.audit('test-notificatie verstuurd', 'deploy.completed → team-platform');
}

// --- KPIs -----------------------------------------------------------------
const matrixCount = computed(() => store.channels.filter((c) => c.type === 'Matrix').length);
const webhookCount = computed(() => store.channels.filter((c) => c.type === 'webhook').length);
const failedToday = computed(() => history.value.filter((h) => h.delivery === 'failing').length);

// Teams that consume events but have no channel configured at all.
const teamsWithoutChannel = computed(() =>
  store.teams.filter((t) => !store.channels.some((c) => c.team === t.id))
);

// Example CloudEvents envelope shown in the JSON panel. Built in script so the
// braces and quotes pass through nldd-code untouched.
const envelopeJson = [
  '{',
  '  "specversion": "1.0",',
  '  "type": "deploy.completed",',
  '  "source": "nl.overheid.platform.deploy",',
  '  "id": "evt-9012",',
  '  "time": "2026-05-31T14:22:00Z",',
  '  "subject": "app-platformportaal",',
  '  "datacontenttype": "application/json",',
  '  "data": { "env": "prod", "version": "v0.6.5" }',
  '}',
].join('\n');
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Notificaties"
      lede="Kanalen, abonnementen en bezorging. Teams ontvangen platform-gebeurtenissen als CloudEvents over een Matrix-room of webhook. Hier zie je wie waarop is geabonneerd en wat er recent is verstuurd."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Notificaties', href: '/notificaties' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Test-event vuren" start-icon="sparkles" @click="fireTestEvent"></nldd-button>
        <nldd-button variant="primary" text="Abonnement toevoegen" start-icon="plus" @click="openForm"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="store.channels.length" label="Kanalen" :sub="`${matrixCount}× Matrix · ${webhookCount}× webhook`" icon="envelope" />
      <MetricCard :value="store.subscriptions.length" label="Abonnementen" sub="actieve event-subscriptions" icon="link" />
      <MetricCard :value="eventCatalog.length" label="Event-types" sub="NL GOV CloudEvents" icon="folder-stack" />
      <MetricCard
        :value="failedToday"
        label="Mislukte bezorgingen"
        :sub="failedToday ? 'vandaag, vereist aandacht' : 'vandaag, alles groen'"
        icon="exclamation-triangle"
      />
    </nldd-container>

    <nldd-spacer size="16" />

    <nldd-inline-dialog
      v-if="teamsWithoutChannel.length"
      title="Teams zonder kanaal"
      :supporting-text="`${teamsWithoutChannel.map((t) => t.name).join(', ')} ontvangen nog geen notificaties. Configureer een Matrix-room of webhook om gebeurtenissen te ontvangen.`"
    ></nldd-inline-dialog>

    <!-- New-subscription form ------------------------------------------- -->
    <template v-if="showForm">
      <nldd-spacer size="16" />
      <nldd-card accessible-label="Nieuw abonnement">
        <nldd-container padding="24">
          <div class="rp-form-head">
            <nldd-title size="4"><h2>Nieuw abonnement</h2></nldd-title>
            <nldd-button variant="secondary" text="Annuleren" start-icon="dismiss" @click="showForm = false"></nldd-button>
          </div>
          <nldd-spacer size="16" />
          <nldd-container layout="grid" column-count="2" gap="16">
            <nldd-form-field label="Team">
              <nldd-dropdown>
                <select v-model="formTeam">
                  <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
            <nldd-form-field label="Event-type">
              <nldd-dropdown>
                <select v-model="formEvent">
                  <option v-for="e in availableEvents" :key="e.type" :value="e.type">{{ e.type }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </nldd-container>

          <nldd-spacer size="16" />

          <div v-if="formEvent" class="rp-form-preview">
            <nldd-icon :name="eventMeta(formEvent).icon" aria-hidden="true"></nldd-icon>
            <div>
              <p class="rp-preview-desc">{{ eventMeta(formEvent).desc }}</p>
              <p class="rp-preview-meta">
                Bron <span class="rp-mono">{{ eventMeta(formEvent).source }}</span> ·
                bezorging via
                <template v-if="formChannel">{{ formChannel.type }} <span class="rp-mono">{{ formChannel.target }}</span></template>
                <template v-else><strong>geen kanaal</strong> — configureer eerst een kanaal voor dit team</template>
              </p>
            </div>
          </div>
          <nldd-inline-dialog
            v-else
            title="Geen events meer beschikbaar"
            supporting-text="Dit team is al op alle beschikbare event-types geabonneerd."
          ></nldd-inline-dialog>

          <nldd-spacer size="16" />
          <nldd-button variant="primary" text="Abonnement aanmaken" start-icon="check-mark" :disabled="!formEvent || undefined" @click="addSubscription"></nldd-button>

          <CliHint
            v-if="formEvent"
            :command="`rp notify subscribe --team ${formTeam} --event ${formEvent}`"
            label="Dit kan ook via de CLI:"
          />
        </nldd-container>
      </nldd-card>
    </template>

    <nldd-spacer size="24" />

    <!-- Channels --------------------------------------------------------- -->
    <nldd-title size="4"><h2>Kanalen</h2></nldd-title>
    <nldd-rich-text><p>Per team één bestemming: een Matrix-room (#team:rijk.chat) of een webhook-endpoint.</p></nldd-rich-text>
    <nldd-spacer size="12" />
    <DataTable :columns="channelColumns" :rows="channelRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'team'">
          <router-link :to="`/teams/${row.team}`" class="rp-link">{{ teamName(value) }}</router-link>
        </template>
        <template v-else-if="col.key === 'type'">
          <span class="rp-type">
            <nldd-icon :name="channelIcon(value)" aria-hidden="true"></nldd-icon>
            {{ value }}
          </span>
        </template>
        <template v-else-if="col.key === 'target'">
          <span class="rp-mono">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'subs'">
          <nldd-badge>{{ value }}</nldd-badge>
        </template>
        <template v-else-if="col.key === 'status'">
          <StatusBadge :status="value" />
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <!-- Subscriptions ---------------------------------------------------- -->
    <nldd-title size="4"><h2>Abonnementen</h2></nldd-title>
    <nldd-rich-text><p>CloudEvents-event-types waarop teams zijn geabonneerd. Elk abonnement wordt bezorgd over het kanaal van het team.</p></nldd-rich-text>
    <nldd-spacer size="12" />
    <DataTable :columns="subColumns" :rows="subRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'team'">
          <router-link :to="`/teams/${row.team}`" class="rp-link">{{ teamName(value) }}</router-link>
        </template>
        <template v-else-if="col.key === 'event'">
          <span class="rp-event">
            <nldd-icon :name="row.icon" aria-hidden="true"></nldd-icon>
            <span class="rp-mono">{{ value }}</span>
          </span>
        </template>
        <template v-else-if="col.key === 'source'">
          <span class="rp-mono rp-dim">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'via'">
          <nldd-tag v-if="value" color="accent" size="md">{{ value }}</nldd-tag>
          <nldd-tag v-else color="critical" size="md">geen kanaal</nldd-tag>
        </template>
        <template v-else-if="col.key === 'actions'">
          <nldd-button variant="secondary" size="sm" text="Opzeggen" start-icon="dismiss" @click="removeSubscription(row.id)"></nldd-button>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <!-- History ---------------------------------------------------------- -->
    <nldd-title size="4"><h2>Notificatie-historie</h2></nldd-title>
    <nldd-rich-text><p>Recent gevuurde events en hun bezorging per kanaal. De nieuwste bovenaan.</p></nldd-rich-text>
    <nldd-spacer size="12" />
    <DataTable :columns="historyColumns" :rows="historyRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'at'">
          <span class="rp-mono rp-dim">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'event'">
          <span class="rp-event">
            <nldd-icon :name="row.icon" aria-hidden="true"></nldd-icon>
            <span class="rp-mono">{{ value }}</span>
          </span>
        </template>
        <template v-else-if="col.key === 'team'">
          <router-link :to="`/teams/${row.team}`" class="rp-link">{{ teamName(value) }}</router-link>
        </template>
        <template v-else-if="col.key === 'channel'">
          <span class="rp-channel">
            <nldd-icon :name="channelIcon(row.channelType)" aria-hidden="true"></nldd-icon>
            <span class="rp-mono">{{ row.channelTarget }}</span>
          </span>
        </template>
        <template v-else-if="col.key === 'delivery'">
          <StatusBadge :status="value" />
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <!-- Event catalog + relations --------------------------------------- -->
    <nldd-container layout="grid" column-count="2" gap="16">
      <nldd-card accessible-label="Event-catalogus">
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Event-catalogus</h3></nldd-title>
          <nldd-rich-text><p>De CloudEvents die het platform uitstuurt. Abonneer een team om ze te ontvangen.</p></nldd-rich-text>
          <nldd-spacer size="12" />
          <nldd-list>
            <nldd-list-item v-for="e in eventCatalog" :key="e.type">
              <nldd-icon-cell slot="start" :name="e.icon"></nldd-icon-cell>
              <nldd-title-cell :text="e.type" :supporting-text="e.desc"></nldd-title-cell>
              <nldd-text-cell slot="end" :text="e.source"></nldd-text-cell>
            </nldd-list-item>
          </nldd-list>
        </nldd-container>
      </nldd-card>

      <div>
        <RelationLinks
          title="Bronnen van notificaties"
          :links="[
            { text: 'Incidenten', to: '/incidenten/inc-2024-017', icon: 'exclamation-triangle' },
            { text: 'Omgevingen & releases', to: '/environments', icon: 'arrow-up-arrow-down' },
            { text: 'Kosten & budgetten', to: '/kosten', icon: 'euro-sign' },
            { text: 'Secrets', to: '/secrets', icon: 'lock-closed' },
            { text: 'Fleet-shift campagnes', to: '/fleet', icon: 'ship-wheel' },
            { text: 'Team-chat (Matrix)', to: '/teams/on-call', icon: 'person-2' },
          ]"
        />
        <nldd-spacer size="16" />
        <nldd-card accessible-label="CloudEvents-envelop">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>CloudEvents-envelop</h3></nldd-title>
            <nldd-rich-text><p>Zo ziet een bezorgd event eruit op de webhook (NL GOV CloudEvents 1.0).</p></nldd-rich-text>
            <nldd-spacer size="12" />
            <nldd-code-viewer language="json">{{ envelopeJson }}</nldd-code-viewer>
          </nldd-container>
        </nldd-card>
      </div>
    </nldd-container>

    <nldd-spacer size="24" />
    <CliHint command="rp notify list --team team-platform" label="Bekijk de kanalen en abonnementen ook via de CLI:" />
  </div>
</template>

<style scoped>
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-dim {
  opacity: 0.65;
}
.rp-type,
.rp-event,
.rp-channel {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-type nldd-icon,
.rp-event nldd-icon,
.rp-channel nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.75;
}
.rp-form-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-form-preview {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-form-preview nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.8;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.rp-preview-desc {
  margin: 0 0 0.25rem;
  font-weight: 600;
}
.rp-preview-meta {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>
