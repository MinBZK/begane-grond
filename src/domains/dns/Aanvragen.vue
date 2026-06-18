<script setup>
// Persona-gated request inbox. Mirrors Changes.vue (metrics + DataTable +
// StatusBadge). What shows and what is actionable depends on the current
// persona's domain role: a registry-beheerder sees org-tier gov.nl requests,
// an org-domeinbeheerder sees their org's service-tier requests, an aanvrager
// sees their own submitted requests read-only.
import { computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import DnsSubnav from './DnsSubnav.vue';
import { fqdnParts } from '../../components/shared/fqdn.js';
import { usePresentation } from '../../presentation/usePresentation.js';
import { controlledDelay } from '../../presentation/drive.js';

const store = usePlatformStore();

// Requests the current persona may act on (already filtered by canApproveFor).
const inbox = computed(() => store.pendingAanvragen);
// Migration requests the current persona may approve.
const migInbox = computed(() => store.pendingMigraties);

const allRows = computed(() => store.domeinaanvragen);

const migColumns = [
  { key: 'legacyFqdn', label: 'Huidige naam' },
  { key: 'targetFqdn', label: 'Naar (gov.nl)' },
  { key: 'org', label: 'Organisatie' },
  { key: 'aanvrager', label: 'Aanvrager' },
  { key: 'status', label: 'Status' },
  { key: 'actie', label: 'Actie' },
];

const goedgekeurd = computed(
  () => store.domeinaanvragen.filter((a) => a.status === 'goedgekeurd').length,
);
const afgewezen = computed(
  () => store.domeinaanvragen.filter((a) => a.status === 'afgewezen').length,
);

const inboxColumns = [
  { key: 'fqdn', label: 'Aangevraagde naam' },
  { key: 'tier', label: 'Tier' },
  { key: 'org', label: 'Organisatie' },
  { key: 'aanvrager', label: 'Aanvrager' },
  { key: 'status', label: 'Status' },
  { key: 'actie', label: 'Actie' },
];
const allColumns = [
  { key: 'fqdn', label: 'Naam' },
  { key: 'namespace', label: 'Naamruimte' },
  { key: 'tier', label: 'Tier' },
  { key: 'aanvrager', label: 'Aanvrager' },
  { key: 'status', label: 'Status' },
];

function orgName(id) {
  return id ? store.orgById(id)?.name || id : '—';
}
function personName(id) {
  return id ? store.personById(id)?.name || id : '—';
}
function namespaceSuffix(id) {
  return store.namespaceById(id)?.suffix || id;
}
function tierLabel(tier) {
  return tier === 'org' ? 'org-tier' : 'dienst-tier';
}

function approve(id) {
  store.approveAanvraag(id);
}
function reject(id) {
  store.rejectAanvraag(id, 'Afgewezen via het aanvragenoverzicht.');
}
function approveMig(id) {
  store.approveMigration(id);
}
function rejectMig(id) {
  store.rejectMigration(id, 'Afgewezen via het aanvragenoverzicht.');
}

// Presentation drive: in the estafette the approver leg auto-approves every
// pending request live, so the audience sees "Wacht op jou" empty out one row
// at a time, the metrics tick over and the new domains appear — instead of the
// presenter hunting for the button. Each approval first pulses the Goedkeuren
// button so it is visibly "about to be clicked" before the row resolves. The
// helper honors the control token so the run pauses and aborts with the deck.
function pulseApproveButton(aanvraagId) {
  try {
    const el = document.querySelector(`.rp-approve-btn[data-aanvraag-id="${aanvraagId}"]`);
    if (!el) return;
    el.classList.add('rp-present-pulse');
    setTimeout(() => el.classList.remove('rp-present-pulse'), 1200);
  } catch {
    // Ignore: no document, or the row already resolved away.
  }
}

const presentation = usePresentation();
onMounted(() => {
  presentation.registerWizard('dns-goedkeuren', {
    // No form; this is a page-style drive (like wet-uitvoeren / alg-toets).
    form: {},
    approveAll: async (control) => {
      // Re-read the inbox each round: the list shrinks as items are approved.
      // A safety cap prevents any chance of an infinite loop.
      for (let guard = 0; guard < 10; guard += 1) {
        const next = store.pendingAanvragen[0];
        if (!next) break;
        if (control?.aborted) return;
        // Highlight the button first, let the audience register it, then click.
        pulseApproveButton(next.id);
        if (!(await controlledDelay(1800, control))) return;
        store.approveAanvraag(next.id);
        // Pause between approvals so each row resolving is its own beat.
        if (!(await controlledDelay(1500, control))) return;
      }
    },
  });
});
onBeforeUnmount(() => presentation.unregisterWizard('dns-goedkeuren'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Aanvragen"
      lede="Subdomein-aanvragen en hun goedkeuringsstatus. Wat je hier mag doen hangt af van je rol."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Domeinen', href: '/dns' },
        { text: 'Aanvragen', href: '/dns/aanvragen' },
      ]"
    >
      <template #actions>
        <nldd-button variant="primary" text="Subdomein aanvragen" start-icon="globe" href="/dns/aanvragen/nieuw"></nldd-button>
      </template>
    </PageHeader>

    <DnsSubnav />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="3" md-column-count="3" sm-column-count="1" gap="16">
      <MetricCard :value="inbox.length" label="Wacht op jou" sub="te beoordelen" icon="clock" />
      <MetricCard :value="goedgekeurd" label="Goedgekeurd" sub="aangemaakt" icon="check-mark-circle" />
      <MetricCard :value="afgewezen" label="Afgewezen" sub="niet aangemaakt" icon="dismiss-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Subdomein-aanvragen die op jou wachten -->
    <template v-if="inbox.length">
      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Subdomeinen — wacht op jou</h2></nldd-title>
          <nldd-spacer size="16" />
          <DataTable :columns="inboxColumns" :rows="inbox" row-key="id">
            <template #cell="{ row, col, value }">
              <template v-if="col.key === 'fqdn'">
                <span class="rp-mono"><template v-for="(part, i) in fqdnParts(row.fqdn)" :key="i">{{ part }}<wbr /></template></span>
              </template>
              <template v-else-if="col.key === 'tier'">
                <nldd-tag color="neutral" size="md">{{ tierLabel(row.tier) }}</nldd-tag>
              </template>
              <template v-else-if="col.key === 'org'">{{ orgName(row.org) }}</template>
              <template v-else-if="col.key === 'aanvrager'">{{ personName(row.aanvrager) }}</template>
              <template v-else-if="col.key === 'status'">
                <StatusBadge :status="row.status" />
              </template>
              <template v-else-if="col.key === 'actie'">
                <nldd-button-group orientation="horizontal">
                  <span class="rp-approve-btn" :data-aanvraag-id="row.id">
                    <nldd-button variant="primary" size="sm" text="Goedkeuren" start-icon="check-mark" @click="approve(row.id)"></nldd-button>
                  </span>
                  <nldd-button variant="secondary" size="sm" text="Afwijzen" start-icon="dismiss" @click="reject(row.id)"></nldd-button>
                </nldd-button-group>
              </template>
              <template v-else>{{ value }}</template>
            </template>
          </DataTable>
        </nldd-container>
      </nldd-card>
      <nldd-spacer size="24" />
    </template>

    <!-- Migratie-aanvragen die op jou wachten -->
    <template v-if="migInbox.length">
      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Migraties — wacht op jou</h2></nldd-title>
          <nldd-spacer size="16" />
          <DataTable :columns="migColumns" :rows="migInbox" row-key="id">
            <template #cell="{ row, col, value }">
              <template v-if="col.key === 'legacyFqdn' || col.key === 'targetFqdn'">
                <span class="rp-mono"><template v-for="(part, i) in fqdnParts(row[col.key])" :key="i">{{ part }}<wbr /></template></span>
              </template>
              <template v-else-if="col.key === 'org'">{{ orgName(row.org) }}</template>
              <template v-else-if="col.key === 'aanvrager'">{{ personName(row.aanvrager) }}</template>
              <template v-else-if="col.key === 'status'">
                <StatusBadge :status="row.status" />
              </template>
              <template v-else-if="col.key === 'actie'">
                <nldd-button-group orientation="horizontal">
                  <nldd-button variant="primary" size="sm" text="Goedkeuren" start-icon="check-mark" @click="approveMig(row.id)"></nldd-button>
                  <nldd-button variant="secondary" size="sm" text="Afwijzen" start-icon="dismiss" @click="rejectMig(row.id)"></nldd-button>
                </nldd-button-group>
              </template>
              <template v-else>{{ value }}</template>
            </template>
          </DataTable>
        </nldd-container>
      </nldd-card>
      <nldd-spacer size="24" />
    </template>

    <!-- Alle aanvragen: always shown, read-only -->
    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Alle aanvragen</h2></nldd-title>
        <nldd-spacer size="16" />
        <DataTable :columns="allColumns" :rows="allRows" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'fqdn'">
              <span class="rp-mono"><template v-for="(part, i) in fqdnParts(row.fqdn)" :key="i">{{ part }}<wbr /></template></span>
            </template>
            <template v-else-if="col.key === 'namespace'">{{ namespaceSuffix(row.namespace) }}</template>
            <template v-else-if="col.key === 'tier'">
              <nldd-tag color="neutral" size="md">{{ tierLabel(row.tier) }}</nldd-tag>
            </template>
            <template v-else-if="col.key === 'aanvrager'">{{ personName(row.aanvrager) }}</template>
            <template v-else-if="col.key === 'status'">
              <StatusBadge :status="row.status" />
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />
    <nldd-inline-dialog
      title="Gelaagde goedkeuring"
      supporting-text="Org-tier aanvragen voor gov.nl gaan naar de centrale registry-beheerder. Dienst-tier aanvragen gaan naar de domeinbeheerder van de eigen organisatie. Alpha/beta is self-service en heeft geen goedkeuring nodig."
    ></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-page {
  display: block;
}
.rp-mono {
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, monospace;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
}
.rp-empty-note {
  margin: 0.5rem 0 0;
  opacity: 0.65;
  font-size: 0.9rem;
}
/* Wrapper so the presentation pulse-highlight hugs the Goedkeuren button. */
.rp-approve-btn {
  display: inline-block;
  border-radius: 8px;
}
</style>
