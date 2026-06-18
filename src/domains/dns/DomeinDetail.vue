<script setup>
// Domain detail: the DNS records, the DNSSEC and IPv6 state, the internet.nl
// score and the linked PKIoverheid certificate. Everything cross-links: the
// owning app to /apps/:id, the team to /teams/:id, the certificate to the
// secrets vault, and the standards page for the internet.nl context.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';
import { fqdnParts } from '../../components/shared/fqdn.js';
import { usePresentation } from '../../presentation/usePresentation.js';
import { controlledDelay } from '../../presentation/drive.js';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const domein = computed(() => store.domeinById(route.params.id));

// --- DNS management (interactive) ---
const RECORD_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'CAA'];
const newRecord = ref({ type: 'A', name: '@', value: '' });
const canAddRecord = computed(() => newRecord.value.value.trim().length > 0);
function toggleDnssec() {
  store.toggleDnssec(domein.value.id);
}
function addRecord() {
  if (!canAddRecord.value) return;
  store.addDnsRecord(domein.value.id, { ...newRecord.value });
  newRecord.value = { type: 'A', name: '@', value: '' };
}
function removeRecord(index) {
  store.removeDnsRecord(domein.value.id, index);
}
// Inline editing of an existing record. We hold a draft for the row being
// edited and commit it through the store on save.
const editIndex = ref(-1);
const editDraft = ref({ type: 'A', name: '@', value: '' });
function startEdit(index) {
  const r = domein.value.records[index];
  editDraft.value = { type: r.type, name: r.name, value: r.value };
  editIndex.value = index;
}
function saveEdit() {
  if (!editDraft.value.value.trim()) return;
  store.editDnsRecord(domein.value.id, editIndex.value, { ...editDraft.value });
  editIndex.value = -1;
}
function cancelEdit() {
  editIndex.value = -1;
}
const app = computed(() => (domein.value ? store.appById(domein.value.app) : null));
const team = computed(() => (domein.value ? store.teamById(domein.value.team) : null));
// Lede: name the linked app if there is one, else the owning team — never "null".
const domeinLede = computed(() => {
  if (!domein.value) return '';
  const owner = app.value?.name || team.value?.name;
  const reg = domein.value.registrar;
  return owner ? `Domein van ${owner}, geregistreerd bij ${reg}.` : `Geregistreerd bij ${reg}.`;
});
const cert = computed(() =>
  domein.value ? store.certificates.find((c) => c.id === domein.value.tls) || null : null,
);
const toegankelijkheid = computed(() =>
  domein.value && domein.value.app ? store.toegankelijkheidForApp(domein.value.app) : null,
);

// internet.nl score colour: success at 95+, warning at 80+, critical below.
const scoreColor = computed(() => {
  if (!domein.value) return 'neutral';
  const s = domein.value.internetnl;
  if (s >= 95) return 'success';
  if (s >= 80) return 'warning';
  return 'critical';
});

// A certificate expiring soon is a warning. The seed expresses the lifetime as a
// Dutch phrase like "over 30 dagen"; pull the day count out and flag it under 30.
const certExpiringSoon = computed(() => {
  const expires = cert.value?.expires || '';
  const match = expires.match(/\d+/);
  if (!match) return false;
  return Number(match[0]) < 30;
});

const relations = computed(() => {
  if (!domein.value) return [];
  const links = [];
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  if (cert.value) links.push({ text: cert.value.cn, to: '/secrets/certificaten', icon: 'lock-closed' });
  if (toegankelijkheid.value) links.push({ text: 'Toegankelijkheidsverklaring', to: '/toegankelijkheid', icon: 'eyeglasses' });
  links.push({ text: 'internet.nl-standaarden', to: '/standaarden', icon: 'check-mark-circle' });
  return links;
});

const cli = computed(() =>
  domein.value ? `bg dns show ${domein.value.id}\nbg dns dnssec verify ${domein.value.id}` : '',
);

// --- Migration to gov.nl ---
// A legacy domain (overheid.nl / rijksoverheid.nl / dienst.nl) can be migrated
// to gov.nl. Migrating is a governed request, not an instant switch: you may
// only migrate a domain your team owns, and the organisation's domeinbeheerder
// approves it. Once approved the redirect goes live (platform-level HTTP 301).
const ns = computed(() => (domein.value ? store.namespaceForFqdn(domein.value.fqdn) : null));
const isLegacy = computed(() => ns.value?.kind === 'legacy');
const isMigrating = computed(() => domein.value?.status === 'in migratie');
const redirectsFrom = computed(() => domein.value?.redirectsFrom || []);
const migratedFrom = computed(() => domein.value?.migratedFrom || null);

// An existing migration request for this domain (pending or resolved).
const migratie = computed(() =>
  domein.value ? store.migratieForDomein(domein.value.id) : null,
);
// Team-ownership check: may the current persona migrate this domain at all?
const canMigrate = computed(() => store.canMigrateDomein(domein.value));
const ownerTeamName = computed(
  () => store.teamById(domein.value?.team)?.name || domein.value?.team,
);

// Propose a gov.nl target: keep the leftmost label of the legacy fqdn under the
// owning org's gov.nl tier when we can resolve the org, else swap the suffix.
const proposedTarget = computed(() => {
  if (!domein.value) return '';
  const fqdn = domein.value.fqdn;
  const leftmost = fqdn.split('.')[0];
  const orgId = store.teamById(domein.value.team)?.org;
  const govNs = store.namespaceById('ns-gov');
  if (orgId && govNs) {
    return store.composeFqdn(govNs, { org: orgId, service: leftmost, tier: 'service' });
  }
  return `${leftmost}.gov.nl`;
});

// Who will approve a migration request for this domain.
const migrationApprover = computed(() => {
  const orgId = store.teamById(domein.value?.team)?.org;
  const orgBeheerder = (store.domainRegistry.domeinbeheerders[orgId] || [])[0];
  if (orgBeheerder) {
    return `${store.personById(orgBeheerder)?.name || orgBeheerder} (domeinbeheerder ${store.orgById(orgId)?.name || orgId})`;
  }
  const reg = store.domainRegistry.registryBeheerders[0];
  return `${store.personById(reg)?.name || reg} (centrale registry-beheerder)`;
});

// The canonical target domain this legacy domain redirects to (for a deep link).
const redirectTargetDomein = computed(() =>
  domein.value?.redirectsTo
    ? store.domeinen.find((d) => d.fqdn === domein.value.redirectsTo) || null
    : null,
);

const migrating = ref(false); // panel toggle
const migrationTarget = ref('');
const migrationError = ref('');
function openMigration() {
  migrationError.value = '';
  migrationTarget.value = proposedTarget.value;
  migrating.value = true;
}
function confirmMigration() {
  migrationError.value = '';
  const result = store.requestMigration({
    legacyDomeinId: domein.value.id,
    targetFqdn: migrationTarget.value.trim(),
    motivatie: null,
  });
  if (result.error) {
    migrationError.value = result.error;
    return;
  }
  migrating.value = false;
}

// Presentation drive: the estafette's migration leg plays the whole flow live —
// open the panel, request the migration, then (as the org's domeinbeheerder)
// approve it, so the audience sees the redirect go live. Page-style drive like
// wet-uitvoeren: named helpers, no form, control token for pacing.
const presentation = usePresentation();
onMounted(() => {
  presentation.registerWizard('dns-migratie', {
    form: {},
    // One self-contained helper that plays the whole flow with visible beats:
    // open the panel, request the migration (verified via team ownership), then
    // approve it as the org's domeinbeheerder so the redirect goes live. Kept as
    // a single call so the run is robust to script-step timing.
    runMigration: async (control) => {
      // Open the panel and let the audience read the verification + approver.
      openMigration();
      if (!(await controlledDelay(2600, control))) return;
      // Submit the request; pause so the "aangevraagd" state is visible.
      confirmMigration();
      if (migrationError.value) return; // ownership/target problem — stop visibly
      if (!(await controlledDelay(2400, control))) return;
      // Then approve it as the org's domeinbeheerder; the redirect goes live.
      const mig = store.migratieForDomein(domein.value?.id);
      if (mig && store.canApproveMigratie(mig)) {
        store.approveMigration(mig.id);
      }
    },
  });
});
onBeforeUnmount(() => presentation.unregisterWizard('dns-migratie'));
</script>

<template>
  <div v-if="domein" class="rp-page">
    <PageHeader
      :title="domein.fqdn"
      :lede="domeinLede"
      :crumbs="[
        { text: 'Domeinen', href: '/dns' },
        { text: domein.fqdn, href: `/dns/${domein.id}` },
      ]"
    >
      <template #actions>
        <nldd-button
          v-if="isLegacy && !isMigrating && !(migratie && migratie.status !== 'afgewezen')"
          variant="primary"
          text="Verhuis naar gov.nl"
          start-icon="arrow-right"
          @click="openMigration"
        ></nldd-button>
        <nldd-button
          :variant="domein.dnssec ? 'secondary' : 'primary'"
          :text="domein.dnssec ? 'DNSSEC uitschakelen' : 'DNSSEC inschakelen'"
          start-icon="shield-check-mark"
          @click="toggleDnssec"
        ></nldd-button>
        <nldd-button variant="secondary" text="Terug naar overzicht" start-icon="chevron-left" href="/dns"></nldd-button>
      </template>
    </PageHeader>

    <!-- Migration banner: this legacy domain is redirecting to its gov.nl name. -->
    <template v-if="isMigrating">
      <nldd-inline-dialog
        title="In migratie naar gov.nl"
        :supporting-text="`Dit domein verwijst nu (HTTP 301) naar ${domein.redirectsTo}. Het oude adres blijft bestaan zodat bestaande links blijven werken.`"
      ></nldd-inline-dialog>
      <nldd-spacer size="16" />
    </template>

    <!-- Pending migration request: awaiting approval, redirect not yet live. -->
    <template v-else-if="migratie && (migratie.status === 'aangevraagd' || migratie.status === 'in beoordeling')">
      <nldd-inline-dialog
        title="Migratie aangevraagd"
        :supporting-text="`De verhuizing naar ${migratie.targetFqdn} staat ter goedkeuring bij ${migrationApprover}. De redirect gaat pas live na goedkeuring.`"
      ></nldd-inline-dialog>
      <nldd-spacer size="16" />
    </template>

    <!-- Migration panel (inline, toggled by the action button). -->
    <template v-if="migrating">
      <nldd-card accessible-label="Verhuizen naar gov.nl">
        <nldd-container padding="20">
          <nldd-title size="5"><h2>Verhuizen naar gov.nl</h2></nldd-title>
          <nldd-spacer size="12" />
          <p class="rp-mig-from">
            Huidige naam: <span class="rp-mono"><template v-for="(part, i) in fqdnParts(domein.fqdn)" :key="i">{{ part }}<wbr /></template></span>
          </p>

          <!-- Team-ownership verification (the "mag jij dit domein" check). -->
          <p class="rp-mig-verify" :class="{ 'rp-mig-verify-bad': !canMigrate }">
            <nldd-icon :name="canMigrate ? 'check-mark-circle' : 'exclamation-triangle'" aria-hidden="true"></nldd-icon>
            <span v-if="canMigrate">Geverifieerd: dit domein is in beheer bij je team ({{ ownerTeamName }}).</span>
            <span v-else>Alleen het beherende team ({{ ownerTeamName }}) mag dit domein verhuizen.</span>
          </p>

          <nldd-spacer size="8" />
          <div class="rp-form-row">
            <nldd-form-field label="Nieuwe gov.nl-naam" class="rp-grow">
              <nldd-text-field
                :value="migrationTarget"
                @input="(e) => (migrationTarget = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
          </div>
          <nldd-spacer size="12" />
          <nldd-inline-dialog
            title="Wat er gebeurt"
            :supporting-text="`De aanvraag gaat ter goedkeuring naar ${migrationApprover}. Na goedkeuring wordt de gov.nl-naam canoniek en gaat een 301-redirect live op platformniveau; bestaande links blijven werken.`"
          ></nldd-inline-dialog>
          <nldd-spacer v-if="migrationError" size="12" />
          <p v-if="migrationError" class="rp-mig-error">{{ migrationError }}</p>
          <nldd-spacer size="16" />
          <nldd-button-group orientation="horizontal">
            <nldd-button variant="primary" text="Migratie aanvragen" start-icon="check-mark" @click="confirmMigration"></nldd-button>
            <nldd-button variant="secondary" text="Annuleren" @click="migrating = false"></nldd-button>
          </nldd-button-group>
        </nldd-container>
      </nldd-card>
      <nldd-spacer size="24" />
    </template>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="domein.dnssec ? 'Ja' : 'Nee'" label="DNSSEC" sub="ondertekende zone" :icon="domein.dnssec ? 'shield-check-mark' : 'exclamation-triangle'" />
      <MetricCard :value="domein.internetnl" label="internet.nl" sub="score van 100" icon="check-mark-circle" />
      <MetricCard :value="domein.ipv6 ? 'Ja' : 'Nee'" label="IPv6" sub="dual-stack" :icon="domein.ipv6 ? 'check-mark-circle' : 'exclamation-triangle'" />
      <MetricCard :value="domein.status" label="Status" sub="levenscyclus" :icon="domein.status === 'actief' ? 'check-mark-circle' : 'exclamation-triangle'" />
    </nldd-container>

    <!-- Redirects & migratie: shown high on the page (right under the metrics)
         because for a migrating domain this is the most important state. HTTP
         301 redirects are served at platform level, not via DNS. -->
    <template v-if="redirectsFrom.length || migratedFrom || isMigrating">
      <nldd-spacer size="24" />
      <nldd-card accessible-label="Redirects en migratie">
        <nldd-container padding="20">
          <nldd-title size="4"><h2>Redirects & migratie</h2></nldd-title>
          <nldd-spacer size="8" />
          <p class="rp-redir-note">Redirects worden als HTTP 301 op platformniveau geserveerd, niet via DNS.</p>
          <nldd-spacer size="12" />
          <p v-if="migratedFrom" class="rp-mig-line">
            Gemigreerd vanaf
            <span class="rp-mono"><template v-for="(part, i) in fqdnParts(migratedFrom)" :key="i">{{ part }}<wbr /></template></span>.
          </p>
          <ul v-if="redirectsFrom.length" class="rp-redir-list">
            <li v-for="(r, i) in redirectsFrom" :key="i">
              <nldd-tag color="neutral" size="sm">HTTP {{ r.type }}</nldd-tag>
              <span class="rp-mono"><template v-for="(part, j) in fqdnParts(r.fqdn)" :key="j">{{ part }}<wbr /></template></span>
              <span class="rp-redir-arrow">→ dit domein</span>
            </li>
          </ul>
          <p v-if="isMigrating" class="rp-mig-line">
            <nldd-tag color="neutral" size="sm">HTTP 301</nldd-tag>
            verwijst naar
            <router-link v-if="redirectTargetDomein" :to="`/dns/${redirectTargetDomein.id}`" class="rp-mono rp-redir-link"><template v-for="(part, i) in fqdnParts(domein.redirectsTo)" :key="i">{{ part }}<wbr /></template></router-link>
            <span v-else class="rp-mono"><template v-for="(part, i) in fqdnParts(domein.redirectsTo)" :key="i">{{ part }}<wbr /></template></span>.
          </p>
        </nldd-container>
      </nldd-card>
    </template>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- DNS records (editable) -->
      <nldd-card accessible-label="DNS-records" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-rec-head">
            <nldd-title size="4"><h2>DNS-records</h2></nldd-title>
            <nldd-tag :color="scoreColor" size="md">internet.nl {{ domein.internetnl }}</nldd-tag>
          </div>
          <nldd-spacer size="14" />

          <table class="rp-rec-table">
            <thead>
              <tr>
                <th class="rp-rec-type">Type</th>
                <th class="rp-rec-name">Naam</th>
                <th>Waarde</th>
                <th class="rp-rec-act"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in domein.records" :key="i">
                <template v-if="editIndex === i">
                  <td>
                    <nldd-dropdown>
                      <select :value="editDraft.type" @change="(e) => (editDraft.type = e.target.value)">
                        <option v-for="t in RECORD_TYPES" :key="t" :value="t">{{ t }}</option>
                      </select>
                    </nldd-dropdown>
                  </td>
                  <td><nldd-text-field :value="editDraft.name" @input="(e) => (editDraft.name = e.target.value)"></nldd-text-field></td>
                  <td><nldd-text-field :value="editDraft.value" @input="(e) => (editDraft.value = e.target.value)"></nldd-text-field></td>
                  <td class="rp-rec-act">
                    <nldd-button variant="primary" size="sm" text="Opslaan" @click="saveEdit"></nldd-button>
                    <nldd-button variant="secondary" size="sm" text="Annuleren" @click="cancelEdit"></nldd-button>
                  </td>
                </template>
                <template v-else>
                  <td><nldd-tag color="neutral" size="md">{{ r.type }}</nldd-tag></td>
                  <td class="rp-mono">{{ r.name }}</td>
                  <td class="rp-mono rp-rec-val">{{ r.value }}</td>
                  <td class="rp-rec-act">
                    <nldd-button variant="secondary" size="sm" text="Bewerken" start-icon="pencil" @click="startEdit(i)"></nldd-button>
                    <nldd-button variant="secondary" size="sm" text="Verwijderen" start-icon="trash" @click="removeRecord(i)"></nldd-button>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>

          <nldd-spacer size="16" />
          <div class="rp-rec-add">
            <nldd-dropdown>
              <select :value="newRecord.type" @change="(e) => (newRecord.type = e.target.value)">
                <option v-for="t in RECORD_TYPES" :key="t" :value="t">{{ t }}</option>
              </select>
            </nldd-dropdown>
            <nldd-text-field class="rp-rec-add-name" placeholder="naam (bijv. @ of www)" :value="newRecord.name" @input="(e) => (newRecord.name = e.target.value)"></nldd-text-field>
            <nldd-text-field class="rp-rec-add-val" placeholder="waarde" :value="newRecord.value" @input="(e) => (newRecord.value = e.target.value)"></nldd-text-field>
            <nldd-button variant="primary" text="Record toevoegen" start-icon="plus" :disabled="!canAddRecord || undefined" @click="addRecord"></nldd-button>
          </div>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Koppelingen" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Linked certificate -->
    <nldd-title size="3"><h2>TLS-certificaat</h2></nldd-title>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="TLS-certificaat">
      <nldd-container padding="20">
        <template v-if="cert">
          <div class="rp-cert-head">
            <nldd-icon name="lock-closed" aria-hidden="true" class="rp-cert-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <p class="rp-cert-cn rp-mono">{{ cert.cn }}</p>
              <p class="rp-cert-ca">{{ cert.ca }}</p>
            </div>
            <nldd-tag :color="certExpiringSoon ? 'warning' : 'success'" size="md">{{ cert.expires }}</nldd-tag>
          </div>
          <p v-if="certExpiringSoon" class="rp-cert-warn">
            <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
            Het certificaat verloopt binnenkort. Plan tijdig een vernieuwing.
          </p>
        </template>
        <p v-else class="rp-empty">Geen certificaat gekoppeld aan dit domein.</p>
      </nldd-container>
    </nldd-card>


    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Domein niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar overzicht" @click="router.push('/dns')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-min-width-0 { min-width: 0; flex: 1 1 auto; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-rec-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-cert-head { display: flex; align-items: center; gap: 0.75rem; }
.rp-cert-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-cert-cn { margin: 0; font-weight: 700; }
.rp-cert-ca { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-cert-warn { display: flex; align-items: center; gap: 0.4rem; margin: 0.8rem 0 0; font-size: 0.85rem; opacity: 0.8; }
.rp-cert-warn nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
.rp-mono { font-variant-numeric: tabular-nums; font-family: ui-monospace, monospace; }
.rp-empty { opacity: 0.6; margin: 0; }
.rp-rec-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.rp-rec-table th { text-align: left; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.03em; opacity: 0.6; padding: 0.4rem 0.5rem; border-bottom: 1px solid var(--semantics-dividers-color); }
.rp-rec-table td { padding: 0.5rem 0.5rem; border-bottom: 1px solid var(--semantics-dividers-color); vertical-align: middle; }
.rp-rec-table tbody tr:last-child td { border-bottom: none; }
.rp-rec-val { word-break: break-all; }
.rp-rec-act { text-align: right; white-space: nowrap; }
.rp-rec-act .nldd-button, .rp-rec-act nldd-button { margin-left: 0.3rem; }
.rp-rec-add { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
.rp-rec-add-name { flex: 0 1 12rem; }
.rp-rec-add-val { flex: 1 1 16rem; }
.rp-form-row { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: flex-end; }
.rp-form-row > nldd-form-field { flex: 1 1 16rem; min-width: 12rem; }
.rp-grow { flex: 1 1 18rem; }
.rp-mig-from, .rp-mig-line { margin: 0.4rem 0; font-size: 0.9rem; }
.rp-redir-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.rp-redir-list li { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.rp-redir-arrow { opacity: 0.6; font-size: 0.85rem; }
.rp-redir-link { color: inherit; text-decoration: underline; }
.rp-redir-note { margin: 0; font-size: 0.82rem; opacity: 0.65; }
.rp-mig-verify { display: flex; align-items: center; gap: 0.5rem; margin: 0.6rem 0 0; font-size: 0.88rem; }
.rp-mig-verify nldd-icon { width: 1.05rem; height: 1.05rem; flex: 0 0 auto; color: oklch(0.55 0.13 155); }
.rp-mig-verify-bad nldd-icon { color: var(--semantics-feedback-warning-color); }
.rp-mig-error { margin: 0; color: var(--semantics-feedback-critical-color, #b00); font-weight: 600; }
.rp-mono { word-break: keep-all; overflow-wrap: normal; hyphens: none; }
</style>
