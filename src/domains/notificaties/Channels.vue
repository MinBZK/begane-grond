<script setup>
// Notifications domain — the central nervous system of the platform. This is
// the showcase screen for the event bus: every domain (infra, deploy,
// incidents, security, code, cost, fleet, AI, …) emits CloudEvents into
// store.events, and here they all converge. The screen has six parts:
//   1. Live event-stream — the full store.events timeline, filterable by
//      severity and by source domain.
//   2. Per-bron — one card per source with an event count, a deep link into
//      the domain, and a mute-toggle (store.toggleMuteSource).
//   3. Routering — subscriptions and channels as DataTables, plus a small
//      schema showing how an event flows event -> subscription -> channel.
//   4. CloudEvents envelope — a real recent event rendered as a 1.0 envelope.
// Everything reads from the live Pinia store; nothing is hard-coded here.
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import { eventTypeMap } from '../../data/events.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();
const router = useRouter();

// Severity -> NLDD tag colour. 'info' maps to neutral (there is no neutral
// feedback colour, so the dot falls back to the divider tone).
const SEV_COLOR = { critical: 'critical', warning: 'warning', success: 'success', info: 'neutral' };
const SEV_LABEL = { critical: 'Kritiek', warning: 'Waarschuwing', success: 'Succes', info: 'Info' };

function dotColor(severity) {
  const c = SEV_COLOR[severity] || 'neutral';
  return c === 'neutral'
    ? 'var(--semantics-dividers-color, currentColor)'
    : `var(--semantics-feedback-${c}-color, currentColor)`;
}

function teamName(id) {
  return store.teamById(id)?.name || id || '—';
}
function actorName(id) {
  if (!id || id === 'system') return 'systeem';
  return store.personById(id)?.name || id;
}
function sourceMeta(source) {
  return store.eventSourceMeta[source] || { label: source || 'platform', icon: 'circle-filled', path: '/' };
}

// --- Live event-stream filters --------------------------------------------
const sevFilter = ref('all'); // all | info | success | warning | critical
const sourceFilter = ref('all'); // all | <source key>
const streamQuery = ref(''); // free-text filter on title/actor/team
// The stream can hold hundreds of events on a busy platform. Show a capped
// initial window and let the reader expand it with "Toon meer".
const streamLimit = ref(25);

// Sources that actually appear in the stream, sorted by event volume so the
// dropdown leads with the busiest domains.
const activeSources = computed(() => {
  const by = store.eventsBySource;
  return Object.keys(by)
    .filter((s) => s)
    .sort((a, b) => by[b].length - by[a].length);
});

const streamEvents = computed(() => {
  let list = store.events;
  if (sevFilter.value !== 'all') list = list.filter((e) => e.severity === sevFilter.value);
  if (sourceFilter.value !== 'all') list = list.filter((e) => e.source === sourceFilter.value);
  const q = streamQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (e) =>
        (e.title || '').toLowerCase().includes(q) ||
        actorName(e.actor).toLowerCase().includes(q) ||
        teamName(e.team).toLowerCase().includes(q),
    );
  }
  return list;
});

// Only the first streamLimit events are rendered; the rest stay one click away.
const visibleStreamEvents = computed(() => streamEvents.value.slice(0, streamLimit.value));
const streamMore = computed(() => Math.max(0, streamEvents.value.length - streamLimit.value));

function openEvent(ev) {
  store.markRead(ev.id);
  if (ev.target) router.push(ev.target);
}

// --- Per-bron overview ----------------------------------------------------
// One card per source domain, newest-volume first, with a mute-toggle.
const sourceCards = computed(() => {
  const by = store.eventsBySource;
  return activeSources.value.map((source) => {
    const list = by[source];
    const meta = sourceMeta(source);
    return {
      source,
      label: meta.label,
      icon: meta.icon,
      path: meta.path,
      count: list.length,
      unread: list.filter((e) => !e.read).length,
      critical: list.filter((e) => e.severity === 'critical').length,
      muted: store.mutedSources.includes(source),
    };
  });
});

// --- Routering: subscriptions + channels ----------------------------------
function channelIcon(type) {
  if (type === 'Matrix') return 'person-2';
  if (type === 'email') return 'envelope';
  return 'link';
}

const subColumns = [
  { key: 'team', label: 'Team' },
  { key: 'event', label: 'Event-type', mono: true },
  { key: 'label', label: 'Betekenis' },
  { key: 'source', label: 'Bron' },
  { key: 'via', label: 'Bezorgd via' },
];

const allSubRows = computed(() =>
  store.subscriptions.map((sub) => {
    const meta = eventTypeMap[sub.event] || {};
    const channel = store.channels.find((c) => c.team === sub.team);
    return {
      ...sub,
      teamLabel: teamName(sub.team),
      label: meta.label || sub.event,
      icon: meta.icon || 'circle-filled',
      source: meta.source || 'platform',
      via: channel ? channel.type : null,
    };
  })
);

// Routering tables scale with the number of teams (dozens to hundreds), so the
// abonnementen and kanalen tables get a shared text filter plus a render cap.
const subQuery = ref('');
const subLimit = ref(25);
const filteredSubRows = computed(() => {
  const q = subQuery.value.trim().toLowerCase();
  if (!q) return allSubRows.value;
  return allSubRows.value.filter(
    (r) =>
      r.teamLabel.toLowerCase().includes(q) ||
      (r.event || '').toLowerCase().includes(q) ||
      (r.label || '').toLowerCase().includes(q) ||
      sourceMeta(r.source).label.toLowerCase().includes(q),
  );
});
const subRows = computed(() => filteredSubRows.value.slice(0, subLimit.value));
const subMore = computed(() => Math.max(0, filteredSubRows.value.length - subLimit.value));

const channelColumns = [
  { key: 'team', label: 'Team' },
  { key: 'type', label: 'Type' },
  { key: 'target', label: 'Bestemming', mono: true },
  { key: 'subs', label: 'Abonnementen', align: 'right' },
  { key: 'status', label: 'Status' },
];

const allChannelRows = computed(() =>
  store.channels.map((c) => ({
    ...c,
    teamLabel: teamName(c.team),
    subs: store.subscriptions.filter((s) => s.team === c.team).length,
    status: c.type === 'webhook' && c.target.includes('…') ? 'in beoordeling' : 'operationeel',
  }))
);

const channelQuery = ref('');
const channelLimit = ref(25);
const filteredChannelRows = computed(() => {
  const q = channelQuery.value.trim().toLowerCase();
  if (!q) return allChannelRows.value;
  return allChannelRows.value.filter(
    (r) =>
      r.teamLabel.toLowerCase().includes(q) ||
      (r.type || '').toLowerCase().includes(q) ||
      (r.target || '').toLowerCase().includes(q),
  );
});
const channelRows = computed(() => filteredChannelRows.value.slice(0, channelLimit.value));
const channelMore = computed(() => Math.max(0, filteredChannelRows.value.length - channelLimit.value));

// --- CloudEvents envelope from a real recent event ------------------------
// Pick the newest event that has a deep-link target, so the rendered envelope
// always references something the reader can click through to.
const sampleEvent = computed(
  () => store.events.find((e) => e.target) || store.events[0] || null
);

const envelopeJson = computed(() => {
  const ev = sampleEvent.value;
  if (!ev) return '{}';
  const meta = eventTypeMap[ev.type] || {};
  const envelope = {
    specversion: '1.0',
    type: ev.type,
    source: `nl.overheid.platform.${meta.source || 'platform'}`,
    id: ev.id,
    time: '2026-05-31T09:14:00Z',
    subject: ev.resource || ev.title,
    datacontenttype: 'application/json',
    dataschema: `https://schemas.rijksplatform.nl/${ev.type}.json`,
    data: {
      title: ev.title,
      severity: ev.severity,
      team: ev.team,
      actor: ev.actor,
      target: ev.target,
    },
  };
  return JSON.stringify(envelope, null, 2);
});

// --- KPIs -----------------------------------------------------------------
const sourceCount = computed(() => Object.keys(store.eventSourceMeta).length);
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Notificaties"
      lede="De centrale zenuwbaan van het platform. Elke domein — infra, deploys, incidenten, security, code, kosten, fleet, AI — stuurt zijn gebeurtenissen als CloudEvents naar één bus. Hier komen ze allemaal samen: een live stream, per bron te dempen, en gerouteerd naar de kanalen van teams."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Notificaties', href: '/notificaties' },
      ]"
    >
      <template #actions>
        <nldd-button
          v-if="store.unreadCount"
          variant="secondary"
          text="Alles gelezen"
          start-icon="check-mark"
          @click="store.markAllRead()"
        ></nldd-button>
        <router-link to="/zelf" class="rp-btn-link">
          <nldd-button variant="primary" text="Mijn inbox" start-icon="person"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <!-- 2. KPIs ---------------------------------------------------------- -->
    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard
        :value="store.events.length"
        label="Events totaal"
        sub="over alle domeinen"
        icon="folder-stack"
      />
      <MetricCard
        :value="store.unreadCount"
        label="Ongelezen"
        sub="in jouw inbox"
        icon="envelope"
        to="/zelf"
      />
      <MetricCard
        :value="store.unreadCritical"
        label="Kritiek ongelezen"
        :sub="store.unreadCritical ? 'vereist directe aandacht' : 'niets kritieks open'"
        icon="exclamation-triangle"
      />
      <MetricCard
        :value="sourceCount"
        label="Bronsystemen"
        sub="domeinen voeden de bus"
        icon="cylinder-split"
      />
    </nldd-container>

    <nldd-spacer size="32" />

    <!-- 3. Live event-stream -------------------------------------------- -->
    <div class="rp-section-head">
      <div>
        <nldd-title size="3"><h2>Live event-stream</h2></nldd-title>
        <nldd-rich-text>
          <p>Elke gebeurtenis op het platform, nieuwste bovenaan. Klik een regel om de bron te openen.</p>
        </nldd-rich-text>
      </div>
      <div class="rp-filters">
        <nldd-search-field
          class="rp-stream-search"
          placeholder="Zoek in events"
          accessible-label="Zoek in de event-stream"
          :value="streamQuery"
          @input="(e) => (streamQuery = e.target.value)"
        ></nldd-search-field>
        <nldd-segmented-control>
          <button type="button" :aria-pressed="sevFilter === 'all'" @click="sevFilter = 'all'">Alles</button>
          <button type="button" :aria-pressed="sevFilter === 'critical'" @click="sevFilter = 'critical'">Kritiek</button>
          <button type="button" :aria-pressed="sevFilter === 'warning'" @click="sevFilter = 'warning'">Waarschuwing</button>
          <button type="button" :aria-pressed="sevFilter === 'success'" @click="sevFilter = 'success'">Succes</button>
          <button type="button" :aria-pressed="sevFilter === 'info'" @click="sevFilter = 'info'">Info</button>
        </nldd-segmented-control>
        <nldd-dropdown>
          <select v-model="sourceFilter" aria-label="Filter op bron">
            <option value="all">Alle bronnen</option>
            <option v-for="s in activeSources" :key="s" :value="s">
              {{ sourceMeta(s).label }} ({{ store.eventsBySource[s].length }})
            </option>
          </select>
        </nldd-dropdown>
      </div>
    </div>

    <nldd-spacer size="12" />

    <nldd-card accessible-label="Event-stream">
      <ul class="rp-stream">
        <li
          v-for="ev in visibleStreamEvents"
          :key="ev.id"
          class="rp-stream-item"
          :class="{ 'rp-unread': !ev.read }"
        >
          <span class="rp-dot" :style="{ '--rp-dot-color': dotColor(ev.severity) }" :title="SEV_LABEL[ev.severity]"></span>
          <span class="rp-stream-icon">
            <nldd-icon :name="sourceMeta(ev.source).icon" aria-hidden="true"></nldd-icon>
          </span>
          <span class="rp-stream-main" @click="openEvent(ev)">
            <span class="rp-stream-title">{{ ev.title }}</span>
            <span class="rp-stream-meta">
              <nldd-tag :color="SEV_COLOR[ev.severity]" size="md">{{ ev.label }}</nldd-tag>
              <router-link
                :to="sourceMeta(ev.source).path"
                class="rp-source-tag"
                @click.stop
              >
                <nldd-icon :name="sourceMeta(ev.source).icon" aria-hidden="true"></nldd-icon>
                {{ sourceMeta(ev.source).label }}
              </router-link>
              <span class="rp-stream-by">{{ actorName(ev.actor) }} · {{ teamName(ev.team) }} · {{ ev.at }}</span>
            </span>
          </span>
          <nldd-icon
            v-if="ev.target"
            name="chevron-right"
            aria-hidden="true"
            class="rp-stream-chev"
            @click="openEvent(ev)"
          ></nldd-icon>
        </li>
        <li v-if="!streamEvents.length" class="rp-stream-empty">Geen events die aan dit filter voldoen.</li>
      </ul>
    </nldd-card>

    <div v-if="streamMore" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${streamMore})`"
        start-icon="chevron-down"
        @click="streamLimit += 25"
      ></nldd-button>
    </div>

    <nldd-spacer size="32" />

    <!-- 4. Per bron ------------------------------------------------------ -->
    <nldd-title size="3"><h2>Per bron</h2></nldd-title>
    <nldd-rich-text>
      <p>Elk domein dat de bus voedt, met zijn aantal events. Demp een bron om die uit jouw inbox te houden; de stream blijft volledig.</p>
    </nldd-rich-text>
    <nldd-spacer size="12" />

    <nldd-container layout="grid" column-count="4" gap="16">
      <nldd-card v-for="c in sourceCards" :key="c.source" :accessible-label="c.label">
        <nldd-container padding="20">
          <div class="rp-source-top">
            <span class="rp-source-ic"><nldd-icon :name="c.icon" aria-hidden="true"></nldd-icon></span>
            <nldd-tag v-if="c.muted" color="neutral" size="md">gedempt</nldd-tag>
            <nldd-tag v-else-if="c.critical" color="critical" size="md">{{ c.critical }} kritiek</nldd-tag>
          </div>
          <div class="rp-source-count">{{ c.count }}</div>
          <router-link :to="c.path" class="rp-source-name">{{ c.label }}</router-link>
          <div class="rp-source-sub">{{ c.unread }} ongelezen</div>
          <nldd-spacer size="12" />
          <nldd-button
            :variant="c.muted ? 'primary' : 'secondary'"
            size="sm"
            :text="c.muted ? 'Dempen opheffen' : 'Bron dempen'"
            :start-icon="c.muted ? 'eye' : 'dismiss-circle'"
            @click="store.toggleMuteSource(c.source)"
          ></nldd-button>
        </nldd-container>
      </nldd-card>
    </nldd-container>

    <nldd-spacer size="32" />

    <!-- 5. Routering ----------------------------------------------------- -->
    <nldd-title size="3"><h2>Routering: abonnementen en kanalen</h2></nldd-title>
    <nldd-rich-text>
      <p>Een team abonneert zich op een event-type; matchende events worden gefanned-out over het kanaal van dat team.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <!-- Flow schema: event -> subscription -> channel -->
    <nldd-card accessible-label="Routering-schema">
      <nldd-container padding="20">
        <div class="rp-flow">
          <div class="rp-flow-step">
            <span class="rp-flow-ic"><nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon></span>
            <div>
              <div class="rp-flow-title">Event</div>
              <div class="rp-flow-sub"><span class="rp-mono">deploy.completed</span> komt op de bus</div>
            </div>
          </div>
          <nldd-icon class="rp-flow-arrow" name="arrow-right" aria-hidden="true"></nldd-icon>
          <div class="rp-flow-step">
            <span class="rp-flow-ic"><nldd-icon name="link" aria-hidden="true"></nldd-icon></span>
            <div>
              <div class="rp-flow-title">Abonnement</div>
              <div class="rp-flow-sub">team-platform luistert op dit type</div>
            </div>
          </div>
          <nldd-icon class="rp-flow-arrow" name="arrow-right" aria-hidden="true"></nldd-icon>
          <div class="rp-flow-step">
            <span class="rp-flow-ic"><nldd-icon name="person-2" aria-hidden="true"></nldd-icon></span>
            <div>
              <div class="rp-flow-title">Kanaal</div>
              <div class="rp-flow-sub">bezorgd in <span class="rp-mono">#platform:rijk.chat</span></div>
            </div>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="20" />

    <nldd-title size="4"><h3>Abonnementen</h3></nldd-title>
    <nldd-spacer size="8" />
    <nldd-search-field
      class="rp-table-search"
      placeholder="Zoek op team, event-type of bron"
      accessible-label="Zoek abonnement"
      :value="subQuery"
      @input="(e) => (subQuery = e.target.value)"
    ></nldd-search-field>
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
          <router-link :to="sourceMeta(value).path" class="rp-source-tag">
            <nldd-icon :name="sourceMeta(value).icon" aria-hidden="true"></nldd-icon>
            {{ sourceMeta(value).label }}
          </router-link>
        </template>
        <template v-else-if="col.key === 'via'">
          <nldd-tag v-if="value" color="accent" size="md">{{ value }}</nldd-tag>
          <nldd-tag v-else color="critical" size="md">geen kanaal</nldd-tag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <div v-if="subMore" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${subMore})`"
        start-icon="chevron-down"
        @click="subLimit += 25"
      ></nldd-button>
    </div>

    <nldd-spacer size="20" />

    <nldd-title size="4"><h3>Kanalen</h3></nldd-title>
    <nldd-spacer size="8" />
    <nldd-search-field
      class="rp-table-search"
      placeholder="Zoek op team, type of bestemming"
      accessible-label="Zoek kanaal"
      :value="channelQuery"
      @input="(e) => (channelQuery = e.target.value)"
    ></nldd-search-field>
    <nldd-spacer size="12" />
    <DataTable :columns="channelColumns" :rows="channelRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'team'">
          <router-link :to="`/teams/${row.team}`" class="rp-link">{{ teamName(value) }}</router-link>
        </template>
        <template v-else-if="col.key === 'type'">
          <span class="rp-event">
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

    <div v-if="channelMore" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${channelMore})`"
        start-icon="chevron-down"
        @click="channelLimit += 25"
      ></nldd-button>
    </div>

    <nldd-spacer size="32" />

    <!-- 6. CloudEvents envelope ----------------------------------------- -->
    <nldd-title size="3"><h2>CloudEvents-envelop</h2></nldd-title>
    <nldd-rich-text>
      <p>Zo verlaat een event de bus richting een webhook: een NL GOV CloudEvents 1.0-envelop, hier opgebouwd uit het meest recente event.</p>
    </nldd-rich-text>
    <nldd-spacer size="12" />
    <nldd-card accessible-label="CloudEvents-envelop">
      <nldd-container padding="20">
        <nldd-code-viewer language="json">{{ envelopeJson }}</nldd-code-viewer>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="20" />
    <CliHint
      command="bg notify subscribe deploy.completed --team team-platform"
      label="Abonneer een team op een event-type via de CLI:"
    />
  </div>
</template>

<style scoped>
.rp-section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-filters {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-stream-search {
  min-width: 16rem;
}
.rp-table-search {
  max-width: 28rem;
}
.rp-more {
  display: flex;
  justify-content: center;
  margin-top: 0.85rem;
}

/* --- Live stream --- */
.rp-stream {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 34rem;
  overflow-y: auto;
}
.rp-stream-item {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-stream-item:last-child {
  border-bottom: none;
}
.rp-stream-item:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-stream-item.rp-unread {
  background: color-mix(in srgb, var(--semantics-surfaces-tinted-background-color) 70%, transparent);
}
.rp-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background: var(--rp-dot-color);
  margin-top: 0.45rem;
  flex: 0 0 auto;
}
.rp-stream-icon {
  flex: 0 0 auto;
  margin-top: 0.1rem;
}
.rp-stream-icon nldd-icon {
  width: 1.15rem;
  height: 1.15rem;
  opacity: 0.75;
}
.rp-stream-main {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  cursor: pointer;
}
.rp-stream-title {
  font-weight: 600;
  line-height: 1.3;
}
.rp-unread .rp-stream-title {
  font-weight: 700;
}
.rp-stream-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-stream-by {
  font-size: 0.8rem;
  opacity: 0.6;
}
.rp-stream-chev {
  width: 1rem;
  height: 1rem;
  opacity: 0.4;
  margin-top: 0.25rem;
  flex: 0 0 auto;
  cursor: pointer;
}
.rp-stream-empty {
  padding: 2rem;
  text-align: center;
  opacity: 0.6;
}

/* Clickable source tag */
.rp-source-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.8rem;
  text-decoration: none;
  color: inherit;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-source-tag:hover {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-source-tag nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
  opacity: 0.7;
}

/* --- Per bron cards --- */
.rp-source-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-height: 1.5rem;
}
.rp-source-ic nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.75;
}
.rp-source-count {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  margin-top: 0.4rem;
}
.rp-source-name {
  display: block;
  font-weight: 600;
  margin-top: 0.1rem;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
}
.rp-source-name:hover {
  text-decoration: underline;
}
.rp-source-sub {
  opacity: 0.65;
  font-size: 0.85rem;
}

/* --- Flow schema --- */
.rp-flow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-flow-step {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
  flex: 1 1 14rem;
}
.rp-flow-ic nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.8;
}
.rp-flow-title {
  font-weight: 700;
}
.rp-flow-sub {
  font-size: 0.85rem;
  opacity: 0.75;
}
.rp-flow-arrow {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.5;
  flex: 0 0 auto;
}

/* --- Shared bits --- */
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
.rp-event {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-event nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.75;
}
.rp-btn-link {
  text-decoration: none;
}
</style>
