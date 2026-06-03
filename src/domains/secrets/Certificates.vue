<script setup>
// PKIoverheid certificate management. The strongest "what a platform is for"
// story: a PKIoverheid certificate used to be a multi-week manual ordeal
// (generate a CSR, request at a TSP, wait, install by hand, and then forget to
// renew so the service falls over). Here it is a self-service golden path with
// automatic renewal. This page shows the lifecycle, lets you request a new
// certificate (a wizard that also auto-drives in presentation mode), renew one,
// and toggle auto-renewal. It cross-links to the domains that use each cert.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import Wizard from '../../components/shared/Wizard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import HavenBadge from '../../components/shared/HavenBadge.vue';
import { usePresentation } from '../../presentation/usePresentation.js';
import { controlledDelay } from '../../presentation/drive.js';

const store = usePlatformStore();

const daysLeft = (expires) => {
  const m = /(\d+)/.exec(expires || '');
  return m ? Number(m[1]) : null;
};
const appForService = (service) => store.apps.find((a) => a.id === service) || null;
const domainForCert = (id) => store.domeinen.find((d) => d.tls === id) || null;

const certs = computed(() => store.certificates);
const total = computed(() => certs.value.length);
const autoRenewCount = computed(() => certs.value.filter((c) => c.autoRenew).length);
const expiringSoon = computed(
  () => certs.value.filter((c) => ['verloopt binnenkort', 'kritiek'].includes(c.status)).length,
);
const expired = computed(() => certs.value.filter((c) => c.status === 'verlopen').length);

// --- Self-service request: a small wizard, also driven in presentation mode ---
const requesting = ref(false);
const form = reactive({ cn: '', service: '', tsp: 'KPN', oin: '00000001823288444000' });
const TSPS = ['KPN', 'Digidentity', 'QuoVadis'];
const wizardRef = ref(null);
const steps = [
  { title: 'Domein' },
  { title: 'TSP en OIN' },
  { title: 'Uitgeven' },
];

// The faked issuance pipeline: CSR -> TSP-aanvraag -> uitgifte -> installatie.
// In presentation mode the deck passes a control token so it is pause/abort
// aware, mirroring the promotion pipeline.
const PIPELINE = [
  { id: 'csr', label: 'CSR genereren', icon: 'lock-closed' },
  { id: 'aanvraag', label: 'Aanvraag bij TSP', icon: 'paper-plane' },
  { id: 'uitgifte', label: 'Uitgifte', icon: 'certificate' },
  { id: 'installatie', label: 'Installeren en koppelen', icon: 'check-mark-circle' },
];
const pipelineStatus = ref({});
const issuing = ref(false);
const issued = ref(null);

async function runIssue(maybeControl) {
  if (issuing.value || issued.value) return;
  const control =
    maybeControl && typeof maybeControl.isPaused === 'function'
      ? maybeControl
      : { aborted: false, isPaused: () => false };
  issuing.value = true;
  pipelineStatus.value = {};
  for (const stage of PIPELINE) {
    if (control.aborted) { issuing.value = false; return; }
    pipelineStatus.value = { ...pipelineStatus.value, [stage.id]: 'running' };
    // eslint-disable-next-line no-await-in-loop
    await controlledDelay(800, control);
    if (control.aborted) { issuing.value = false; return; }
    pipelineStatus.value = { ...pipelineStatus.value, [stage.id]: 'ready' };
  }
  issued.value = store.requestCertificate({
    cn: form.cn || '*.nieuwedienst.overheid.nl',
    service: form.service || null,
    tsp: form.tsp,
    oin: form.oin,
    autoRenew: true,
  });
  issuing.value = false;
}
function pipeLabel(id) {
  const s = pipelineStatus.value[id];
  if (s === 'running') return 'bezig';
  if (s === 'ready') return 'klaar';
  return 'wacht';
}
function resetRequest() {
  requesting.value = false;
  issued.value = null;
  issuing.value = false;
  pipelineStatus.value = {};
  form.cn = '';
  form.service = '';
  form.tsp = 'KPN';
}

// Presentation drive surface.
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() => {
  presentation.registerWizard('cert', {
    form,
    wizardRef: wizardApi,
    finish: resetRequest,
    runIssue,
    openRequest: () => { requesting.value = true; },
  });
});
onBeforeUnmount(() => presentation.unregisterWizard('cert'));

function renew(id) {
  store.renewCertificate(id);
}
function toggleAuto(id) {
  store.toggleCertAutoRenew(id);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="PKIoverheid-certificaten"
      lede="TLS-certificaten van de PKIoverheid-keten, gekoppeld aan de domeinen en diensten die ze beveiligen. Zelf aanvragen en automatisch laten vernieuwen."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Secrets', href: '/secrets' },
        { text: 'Certificaten', href: '/secrets/certificaten' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Domeinen & DNS" start-icon="globe" href="/dns"></nldd-button>
        <nldd-button variant="primary" text="Certificaat aanvragen" start-icon="plus" @click="requesting = true"></nldd-button>
      </template>
    </PageHeader>

    <HavenBadge service="Certificaten" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="total" label="Certificaten" sub="onder PKIoverheid" icon="certificate" />
      <MetricCard :value="autoRenewCount" label="Auto-vernieuwing" :sub="`van ${total}`" icon="check-mark-circle" />
      <MetricCard :value="expiringSoon" label="Verloopt binnenkort" sub="binnen 30 dagen" icon="clock" />
      <MetricCard :value="expired" label="Verlopen" sub="vragen directe actie" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Self-service request wizard -->
    <template v-if="requesting">
      <nldd-card accessible-label="Certificaat aanvragen">
        <nldd-container padding="24">
          <template v-if="issued">
            <div class="rp-issued-head">
              <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
              <nldd-title size="4"><h2>Certificaat uitgegeven</h2></nldd-title>
            </div>
            <nldd-spacer size="12" />
            <dl class="rp-kv">
              <dt>Common name</dt><dd class="rp-mono">{{ issued.cn }}</dd>
              <dt>Uitgegeven door</dt><dd>{{ issued.tsp }} (PKIoverheid)</dd>
              <dt>Sleuteltype</dt><dd class="rp-mono">{{ issued.keyType }}</dd>
              <dt>Auto-vernieuwing</dt><dd>aan, op T-21 dagen</dd>
            </dl>
            <nldd-spacer size="16" />
            <nldd-button variant="secondary" text="Sluiten" @click="resetRequest"></nldd-button>
          </template>

          <Wizard v-else ref="wizardRef" :steps="steps" finish-label="Sluiten" hide-footer-on-last @finish="resetRequest">
            <template #default="{ step }">
              <div v-if="step === 0">
                <nldd-title size="5"><h3>Voor welk domein?</h3></nldd-title>
                <nldd-spacer size="12" />
                <nldd-form-field label="Common name (fqdn of wildcard)">
                  <nldd-text-field placeholder="bijv. *.nieuwedienst.overheid.nl" :value="form.cn" @input="(e) => (form.cn = e.target.value)"></nldd-text-field>
                </nldd-form-field>
                <nldd-spacer size="12" />
                <nldd-form-field label="Gekoppelde dienst (optioneel)">
                  <nldd-dropdown>
                    <select :value="form.service" @change="(e) => (form.service = e.target.value)">
                      <option value="">Geen dienst</option>
                      <option v-for="a in store.apps" :key="a.id" :value="a.id">{{ a.name }}</option>
                    </select>
                  </nldd-dropdown>
                </nldd-form-field>
              </div>

              <div v-else-if="step === 1">
                <nldd-title size="5"><h3>Vertrouwensdienst en OIN</h3></nldd-title>
                <nldd-spacer size="12" />
                <nldd-form-field label="TSP (vertrouwensdienstverlener)">
                  <nldd-dropdown>
                    <select :value="form.tsp" @change="(e) => (form.tsp = e.target.value)">
                      <option v-for="t in TSPS" :key="t" :value="t">{{ t }}</option>
                    </select>
                  </nldd-dropdown>
                </nldd-form-field>
                <nldd-spacer size="12" />
                <nldd-form-field label="OIN (organisatie-identificatienummer)">
                  <nldd-text-field :value="form.oin" @input="(e) => (form.oin = e.target.value)"></nldd-text-field>
                </nldd-form-field>
                <nldd-spacer size="8" />
                <p class="rp-form-hint">Het OIN wordt automatisch gevalideerd bij de TSP.</p>
              </div>

              <div v-else>
                <nldd-title size="5"><h3>Uitgeven</h3></nldd-title>
                <nldd-spacer size="12" />
                <div class="rp-pipeline">
                  <template v-for="(stage, i) in PIPELINE" :key="stage.id">
                    <div class="rp-pipe-stage" :class="`rp-pipe-${pipelineStatus[stage.id] || 'idle'}`">
                      <nldd-icon :name="pipelineStatus[stage.id] === 'ready' ? 'check-mark' : stage.icon" aria-hidden="true"></nldd-icon>
                      <span class="rp-pipe-label">{{ stage.label }}</span>
                      <span class="rp-pipe-state">{{ pipeLabel(stage.id) }}</span>
                    </div>
                    <div v-if="i < PIPELINE.length - 1" class="rp-pipe-conn" :class="{ 'rp-pipe-conn-done': pipelineStatus[stage.id] === 'ready' }"></div>
                  </template>
                </div>
                <nldd-spacer size="16" />
                <nldd-button-group orientation="horizontal">
                  <nldd-button variant="secondary" text="Vorige" start-icon="chevron-left" :disabled="issuing || undefined" @click="wizardApi.goTo(1)"></nldd-button>
                  <nldd-button variant="primary" :text="issuing ? 'Bezig met uitgeven...' : 'Certificaat uitgeven'" start-icon="certificate" :disabled="issuing || undefined" @click="runIssue"></nldd-button>
                </nldd-button-group>
              </div>
            </template>
          </Wizard>
        </nldd-container>
      </nldd-card>
      <nldd-spacer size="24" />
    </template>

    <nldd-inline-dialog
      v-if="expired"
      title="Let op: een certificaat is verlopen"
      supporting-text="Een verlopen certificaat zonder auto-vernieuwing legt de dienst plat. Zet auto-vernieuwing aan of vernieuw direct."
    ></nldd-inline-dialog>

    <nldd-spacer v-if="expired" size="16" />

    <!-- Certificate list with lifecycle and renewal controls -->
    <nldd-collection layout="grid" item-width="440px">
      <nldd-card v-for="c in certs" :key="c.id" :accessible-label="c.cn">
        <nldd-container padding="20">
          <div class="rp-cert-head">
            <nldd-icon name="certificate" aria-hidden="true" class="rp-cert-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <p class="rp-cert-cn rp-mono">{{ c.cn }}</p>
              <p class="rp-cert-sub">{{ c.tsp }} · {{ c.keyType }}</p>
            </div>
            <StatusBadge :status="c.status" size="md" />
          </div>

          <nldd-spacer size="12" />
          <dl class="rp-kv">
            <dt>Vervaldatum</dt>
            <dd :class="{ 'rp-warn': ['verloopt binnenkort', 'kritiek', 'verlopen'].includes(c.status) }">{{ c.expires }}</dd>
            <dt>OIN</dt>
            <dd class="rp-mono rp-oin">{{ c.oin }}</dd>
            <dt v-if="domainForCert(c.id)">Domein</dt>
            <dd v-if="domainForCert(c.id)">
              <router-link :to="`/dns/${domainForCert(c.id).id}`" class="rp-link">{{ domainForCert(c.id).fqdn }}</router-link>
            </dd>
            <dt v-if="appForService(c.service)">Dienst</dt>
            <dd v-if="appForService(c.service)">
              <router-link :to="`/apps/${appForService(c.service).id}`" class="rp-link">{{ appForService(c.service).name }}</router-link>
            </dd>
          </dl>

          <nldd-spacer size="12" />
          <p class="rp-cert-prov">{{ c.requested }}</p>

          <nldd-spacer size="14" />
          <div class="rp-cert-actions">
            <label class="rp-toggle">
              <input type="checkbox" :checked="c.autoRenew" @change="toggleAuto(c.id)" />
              <span>Auto-vernieuwing</span>
            </label>
            <nldd-button
              v-if="c.status !== 'aangevraagd'"
              variant="secondary"
              size="sm"
              text="Nu vernieuwen"
              start-icon="arrow-2-counter-clockwise"
              @click="renew(c.id)"
            ></nldd-button>
          </div>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="24" />
    <CliHint command="bg cert request --cn *.nieuwedienst.overheid.nl --auto-renew" label="Certificaat aanvragen via de CLI:" />
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-min-width-0 { min-width: 0; flex: 1 1 auto; }
.rp-issued-head { display: flex; align-items: center; gap: 0.5rem; }
.rp-issued-head nldd-icon { width: 1.3rem; height: 1.3rem; flex: 0 0 auto; color: #2e8540; }
.rp-kv { display: grid; grid-template-columns: auto 1fr; gap: 0.4rem 1rem; margin: 0; }
.rp-kv dt { opacity: 0.6; font-size: 0.85rem; }
.rp-kv dd { margin: 0; font-weight: 600; }
.rp-oin { font-size: 0.82rem; word-break: break-all; }
.rp-warn { color: #b35900; }
.rp-cert-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-cert-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-cert-cn { margin: 0; font-weight: 700; }
.rp-cert-sub { margin: 0.1rem 0 0; font-size: 0.82rem; opacity: 0.6; }
.rp-cert-prov { margin: 0; font-size: 0.82rem; opacity: 0.65; font-style: italic; }
.rp-cert-actions { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.rp-toggle { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.88rem; cursor: pointer; }
.rp-form-hint { margin: 0; font-size: 0.85rem; opacity: 0.65; }
.rp-link { color: var(--semantics-actions-primary-default-background-color, #154273); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
.rp-mono { font-family: ui-monospace, monospace; }
.rp-pipeline { display: flex; align-items: center; flex-wrap: wrap; }
.rp-pipe-stage { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; padding: 0.8rem 0.6rem; border-radius: 10px; border: 1px solid var(--semantics-dividers-color); min-width: 130px; }
.rp-pipe-stage nldd-icon { width: 1.4rem; height: 1.4rem; opacity: 0.7; }
.rp-pipe-label { font-weight: 600; font-size: 0.82rem; text-align: center; }
.rp-pipe-state { font-size: 0.72rem; opacity: 0.6; }
.rp-pipe-running { background: rgba(217, 138, 0, 0.08); border-color: #d98a00; }
.rp-pipe-ready { background: rgba(46, 133, 64, 0.08); border-color: #2e8540; }
.rp-pipe-ready nldd-icon { color: #2e8540; opacity: 1; }
.rp-pipe-conn { width: 24px; height: 2px; background: var(--semantics-dividers-color); align-self: center; }
.rp-pipe-conn-done { background: #2e8540; }
</style>
