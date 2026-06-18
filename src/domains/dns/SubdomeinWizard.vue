<script setup>
// Wizard to request a subdomain. Mirrors OrderWizard: choose namespace ->
// (gov.nl) organisation + tier -> label with a live composed-fqdn preview ->
// summary that names the derived approver and approval level -> submit. Alpha/
// beta namespaces are self-service and create the domain instantly. On finish
// it calls store.requestSubdomein and shows an approval-lifecycle result.
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import DnsSubnav from './DnsSubnav.vue';
import { fqdnParts } from '../../components/shared/fqdn.js';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();

// Only namespaces a team may register under appear in the wizard.
const namespaces = computed(() => store.openNamespaces);

const form = reactive({
  namespaceId: 'ns-gov',
  org: store.currentPerson?.org || 'bd',
  tier: 'service',
  service: '',
  motivatie: '',
});

const namespace = computed(() => store.namespaceById(form.namespaceId));
const isExperiment = computed(() => namespace.value?.kind === 'experiment');
const canRequestOrgTier = computed(() => store.currentDomainRole === 'registry-beheerder');

// Available tiers for the chosen namespace; org-tier is shown but only
// selectable by a registry-beheerder.
const tiers = computed(() => namespace.value?.tiers || []);

// Keep tier valid when the namespace changes (experiment namespaces only have
// service-tier; non-registry personas may not pick org-tier).
watch(namespace, () => {
  if (!tiers.value.some((t) => t.tier === form.tier)) {
    form.tier = tiers.value[0]?.tier || 'service';
  }
  if (form.tier === 'org' && !canRequestOrgTier.value) {
    form.tier = tiers.value.find((t) => t.tier === 'service')?.tier || tiers.value[0]?.tier;
  }
});

const orgs = computed(() => store.organisations);
function orgName(id) {
  return store.orgById(id)?.name || id;
}

// Compact labels for the namespace choice cards.
const NS_KIND = {
  rijk: { label: 'Rijk', color: 'success' },
  experiment: { label: 'Experiment', color: 'warning' },
  legacy: { label: 'Legacy', color: 'neutral' },
  medeoverheid: { label: 'Medeoverheid', color: 'accent' },
};
function nsKind(n) {
  return NS_KIND[n.kind] || { label: n.kind, color: 'neutral' };
}
// One short line per namespace: the gist of who may register and how.
function nsSummary(n) {
  if (n.layered) return 'Gelaagd, gedelegeerd per organisatie';
  if (n.kind === 'experiment') return 'Self-service, niet voor productie';
  return 'Legacy, alleen migratie naar gov.nl';
}

// Live composed fqdn for the preview.
const composedFqdn = computed(() =>
  namespace.value
    ? store.composeFqdn(namespace.value, { org: form.org, service: form.service || 'dienst', tier: form.tier })
    : '',
);

const approvalLevel = computed(
  () => tiers.value.find((t) => t.tier === form.tier)?.approval || 'self-service',
);
// Who will approve, phrased for the summary.
const approverText = computed(() => {
  if (approvalLevel.value === 'self-service') return 'Niemand — wordt direct aangemaakt';
  if (approvalLevel.value === 'central') {
    const id = store.domainRegistry.registryBeheerders[0];
    return `${store.personById(id)?.name || id} (centrale registry-beheerder)`;
  }
  const id = (store.domainRegistry.domeinbeheerders[form.org] || [])[0];
  return id
    ? `${store.personById(id)?.name || id} (domeinbeheerder ${orgName(form.org)})`
    : `nog geen domeinbeheerder voor ${orgName(form.org)}`;
});

const labelValid = computed(() => /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(form.service.trim()));
const needsJustification = computed(() => !!namespace.value?.requiresJustification);

// --- Result state ---
const submitted = ref(null); // the created aanvraag
const submitError = ref('');
const createdDomeinId = computed(() => submitted.value?.createdDomein || null);

const RESULT_STEPS = [
  { name: 'aangevraagd', label: 'Aangevraagd', icon: 'check-mark-circle' },
  { name: 'in beoordeling', label: 'In beoordeling', icon: 'clock' },
  { name: 'goedgekeurd', label: 'Goedgekeurd', icon: 'starburst-filled' },
];
function resultStepState(stepName) {
  if (!submitted.value) return 'todo';
  const order = RESULT_STEPS.map((s) => s.name);
  const ci = order.indexOf(submitted.value.status);
  const si = order.indexOf(stepName);
  if (ci > si) return 'done';
  if (ci === si) return submitted.value.status === 'goedgekeurd' ? 'done' : 'active';
  return 'todo';
}

function finish() {
  submitError.value = '';
  // org-tier has no service label; only require a valid label for other tiers.
  if (form.tier !== 'org' && !labelValid.value) {
    submitError.value = 'Geef een geldig label (kleine letters, cijfers, koppeltekens).';
    return;
  }
  if (needsJustification.value && !form.motivatie.trim()) {
    submitError.value = 'Deze naamruimte vereist een onderbouwing.';
    return;
  }
  const result = store.requestSubdomein({
    namespaceId: form.namespaceId,
    tier: form.tier,
    org: form.org,
    service: form.tier === 'org' ? null : form.service.trim(),
    team: store.currentPerson?.team,
    app: null,
    motivatie: form.motivatie.trim() || null,
  });
  if (result.error) {
    submitError.value = result.error;
    return;
  }
  submitted.value = result.aanvraag;
}

const wizardSteps = computed(() => {
  if (isExperiment.value) return [{ title: 'Naamruimte' }, { title: 'Label' }, { title: 'Bevestig' }];
  return [
    { title: 'Naamruimte' },
    { title: 'Organisatie' },
    { title: 'Tier' },
    { title: 'Label' },
    { title: 'Controleer' },
  ];
});

// Presentation auto-drive support.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() => presentation.registerWizard('subdomein', { form, wizardRef: wizardApi, finish }));
onBeforeUnmount(() => presentation.unregisterWizard('subdomein'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Subdomein aanvragen"
      lede="Vraag een subdomein aan onder een naamruimte. Wie het goedkeurt hangt af van de naamruimte en de tier."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Domeinen', href: '/dns' },
        { text: 'Aanvragen', href: '/dns/aanvragen' },
        { text: 'Nieuw', href: '/dns/aanvragen/nieuw' },
      ]"
    />

    <DnsSubnav />
    <nldd-spacer size="20" />

    <!-- Result screen -->
    <div v-if="submitted">
      <nldd-card :accessible-label="`Aanvraag ${submitted.fqdn}`">
        <nldd-container padding="24">
          <nldd-title size="4"><h2 class="rp-mono"><template v-for="(part, i) in fqdnParts(submitted.fqdn)" :key="i">{{ part }}<wbr /></template></h2></nldd-title>
          <nldd-spacer size="16" />

          <ol class="rp-prov-chain">
            <li
              v-for="s in RESULT_STEPS"
              :key="s.name"
              :class="`rp-prov-step rp-${resultStepState(s.name)}`"
            >
              <span class="rp-prov-dot"><nldd-icon :name="s.icon" aria-hidden="true"></nldd-icon></span>
              <span class="rp-prov-label">{{ s.label }}</span>
            </li>
          </ol>

          <nldd-spacer size="20" />
          <nldd-inline-dialog
            v-if="submitted.status === 'goedgekeurd'"
            title="Direct aangemaakt"
            supporting-text="Dit is een self-service naamruimte (alpha/beta). Het subdomein is meteen live, zonder goedkeuring — niet voor productie."
          ></nldd-inline-dialog>
          <nldd-inline-dialog
            v-else
            title="Wacht op goedkeuring"
            :supporting-text="`De aanvraag staat ter beoordeling bij ${approverText}.`"
          ></nldd-inline-dialog>

          <nldd-spacer size="20" />
          <nldd-button-group orientation="horizontal">
            <router-link v-if="createdDomeinId" :to="`/dns/${createdDomeinId}`">
              <nldd-button variant="primary" text="Naar domein" end-icon="arrow-right"></nldd-button>
            </router-link>
            <router-link to="/dns/aanvragen">
              <nldd-button variant="primary" text="Naar aanvragen" end-icon="arrow-right"></nldd-button>
            </router-link>
            <nldd-button variant="secondary" text="Nog een aanvragen" start-icon="plus" @click="submitted = null"></nldd-button>
          </nldd-button-group>
        </nldd-container>
      </nldd-card>
    </div>

    <!-- The wizard -->
    <Wizard v-else ref="wizardRef" :steps="wizardSteps" finish-label="Aanvraag indienen" @finish="finish">
      <template #default="{ step }">
        <!-- Step 0: namespace -->
        <div v-if="step === 0">
          <nldd-title size="5"><h3>Onder welke naamruimte?</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-choice-list">
            <button
              v-for="n in namespaces"
              :key="n.id"
              type="button"
              class="rp-choice-card"
              :class="{ 'rp-sel': form.namespaceId === n.id }"
              role="radio"
              :aria-checked="form.namespaceId === n.id"
              @click="form.namespaceId = n.id"
            >
              <span class="rp-radio" aria-hidden="true"></span>
              <span class="rp-choice-body">
                <span class="rp-choice-head">
                  <span class="rp-mono rp-choice-name">{{ n.suffix }}</span>
                  <nldd-tag :color="nsKind(n).color" size="sm">{{ nsKind(n).label }}</nldd-tag>
                </span>
                <span class="rp-choice-sub">{{ nsSummary(n) }}</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Experiment: step 1 = label, step 2 = confirm -->
        <template v-if="isExperiment">
          <div v-if="step === 1">
            <nldd-title size="5"><h3>Kies een label</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-form-row">
              <nldd-form-field label="Label">
                <nldd-text-field
                  :value="form.service"
                  placeholder="bijv. mijn-prototype"
                  @input="(e) => (form.service = e.target.value)"
                ></nldd-text-field>
              </nldd-form-field>
            </div>
            <nldd-spacer size="16" />
            <p class="rp-preview-label">Volledige naam</p>
            <p class="rp-mono rp-preview"><template v-for="(part, i) in fqdnParts(composedFqdn)" :key="i">{{ part }}<wbr /></template></p>
            <nldd-spacer size="12" />
            <nldd-inline-dialog
              title="Self-service experiment"
              supporting-text="Geen goedkeuring nodig, geen volledige DNSSEC/internet.nl-eis. Niet voor productie."
            ></nldd-inline-dialog>
          </div>
          <div v-else-if="step === 2">
            <nldd-title size="5"><h3>Bevestig</h3></nldd-title>
            <nldd-spacer size="16" />
            <dl class="rp-summary">
              <div><dt>Naamruimte</dt><dd>{{ namespace.suffix }}</dd></div>
              <div><dt>Volledige naam</dt><dd class="rp-mono"><template v-for="(part, i) in fqdnParts(composedFqdn)" :key="i">{{ part }}<wbr /></template></dd></div>
              <div><dt>Goedkeuring</dt><dd>{{ approverText }}</dd></div>
            </dl>
            <nldd-spacer size="16" />
            <p v-if="submitError" class="rp-error">{{ submitError }}</p>
          </div>
        </template>

        <!-- gov.nl flow -->
        <template v-else>
          <!-- Step 1: organisation -->
          <div v-if="step === 1">
            <nldd-title size="5"><h3>Voor welke organisatie?</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-form-row">
              <nldd-form-field label="Organisatie">
                <nldd-dropdown>
                  <select v-model="form.org">
                    <option v-for="o in orgs" :key="o.id" :value="o.id">{{ o.name }}</option>
                  </select>
                </nldd-dropdown>
              </nldd-form-field>
            </div>
            <nldd-spacer size="12" />
            <p class="rp-hint">Je vraagt aan namens {{ orgName(form.org) }}.</p>
          </div>

          <!-- Step 2: tier -->
          <div v-else-if="step === 2">
            <nldd-title size="5"><h3>Welke tier?</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-choice-list">
              <button
                v-for="t in tiers"
                :key="t.tier"
                type="button"
                class="rp-choice-card"
                :class="{ 'rp-sel': form.tier === t.tier, 'rp-disabled': t.tier === 'org' && !canRequestOrgTier }"
                role="radio"
                :aria-checked="form.tier === t.tier"
                :disabled="t.tier === 'org' && !canRequestOrgTier"
                @click="form.tier = t.tier"
              >
                <span class="rp-radio" aria-hidden="true"></span>
                <span class="rp-choice-body">
                  <span class="rp-choice-head">
                    <span class="rp-choice-name">{{ t.tier === 'org' ? 'Organisatie-tier' : 'Dienst-tier' }}</span>
                    <nldd-tag v-if="t.tier === 'org' && !canRequestOrgTier" color="neutral" size="sm">alleen registry-beheerder</nldd-tag>
                  </span>
                  <span class="rp-choice-sub">{{ t.description }}</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Step 3: label + live preview -->
          <div v-else-if="step === 3">
            <nldd-title size="5"><h3>{{ form.tier === 'org' ? 'Organisatie-domein' : 'Kies een label' }}</h3></nldd-title>
            <nldd-spacer size="12" />
            <div v-if="form.tier !== 'org'" class="rp-form-row">
              <nldd-form-field label="Label (de dienst)">
                <nldd-text-field
                  :value="form.service"
                  placeholder="bijv. toeslagen"
                  @input="(e) => (form.service = e.target.value)"
                ></nldd-text-field>
              </nldd-form-field>
            </div>
            <nldd-spacer size="16" />
            <p class="rp-preview-label">Volledige naam</p>
            <p class="rp-mono rp-preview"><template v-for="(part, i) in fqdnParts(composedFqdn)" :key="i">{{ part }}<wbr /></template></p>
            <nldd-spacer size="12" />
            <nldd-inline-dialog
              title="Standaarden die gaan gelden"
              :supporting-text="`DNSSEC ${namespace.requiresDnssec ? 'verplicht' : 'optioneel'} · internet.nl ${namespace.requiresInternetnl ? '≥ ' + namespace.minInternetnl : 'optioneel'} · PKIoverheid-certificaat.`"
            ></nldd-inline-dialog>
          </div>

          <!-- Step 4: summary -->
          <div v-else-if="step === 4">
            <nldd-title size="5"><h3>Controleer de aanvraag</h3></nldd-title>
            <nldd-spacer size="16" />
            <dl class="rp-summary">
              <div><dt>Naamruimte</dt><dd>{{ namespace.suffix }}</dd></div>
              <div><dt>Organisatie</dt><dd>{{ orgName(form.org) }}</dd></div>
              <div><dt>Tier</dt><dd>{{ form.tier === 'org' ? 'Organisatie-tier' : 'Dienst-tier' }}</dd></div>
              <div><dt>Volledige naam</dt><dd class="rp-mono"><template v-for="(part, i) in fqdnParts(composedFqdn)" :key="i">{{ part }}<wbr /></template></dd></div>
              <div><dt>Standaarden</dt><dd>DNSSEC {{ namespace.requiresDnssec ? 'verplicht' : 'optioneel' }} · internet.nl {{ namespace.requiresInternetnl ? '≥ ' + namespace.minInternetnl : 'optioneel' }}</dd></div>
              <div><dt>Wie keurt dit goed</dt><dd><strong>{{ approverText }}</strong></dd></div>
            </dl>
            <nldd-spacer size="16" />
            <nldd-form-field v-if="needsJustification" label="Onderbouwing (verplicht)">
              <nldd-text-field
                :value="form.motivatie"
                placeholder="Waarom geen gov.nl?"
                @input="(e) => (form.motivatie = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-spacer v-if="needsJustification" size="12" />
            <nldd-inline-dialog
              title="Wat er gebeurt na aanvragen"
              supporting-text="De aanvraag krijgt status 'in beoordeling' en verschijnt bij de goedkeurder. Na goedkeuring wordt het domein aangemaakt — nog zonder DNSSEC en internet.nl-score, zodat het compliance-werk zichtbaar blijft."
            ></nldd-inline-dialog>
            <nldd-spacer v-if="submitError" size="12" />
            <p v-if="submitError" class="rp-error">{{ submitError }}</p>
          </div>
        </template>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-page {
  display: block;
}
.rp-form-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: flex-end;
}
.rp-form-row > nldd-form-field {
  flex: 1 1 16rem;
  min-width: 12rem;
}
/* Radio-style choice cards (namespace + tier steps). A clear radio dot and a
   selected state make it obvious these are pickable, one at a time. */
.rp-choice-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 36rem;
}
.rp-choice-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
  width: 100%;
}
.rp-choice-card:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-choice-card.rp-sel {
  border-color: oklch(0.387 0.097 253.4);
  background: var(--semantics-surfaces-tinted-background-color);
  box-shadow: 0 0 0 1px oklch(0.387 0.097 253.4);
}
.rp-choice-card.rp-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.rp-radio {
  flex: 0 0 auto;
  width: 1.15rem;
  height: 1.15rem;
  margin-top: 0.1rem;
  border-radius: 50%;
  border: 2px solid var(--semantics-dividers-color);
  position: relative;
}
.rp-choice-card.rp-sel .rp-radio {
  border-color: oklch(0.387 0.097 253.4);
}
.rp-choice-card.rp-sel .rp-radio::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: oklch(0.387 0.097 253.4);
}
.rp-choice-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}
.rp-choice-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-choice-name {
  font-weight: 700;
}
.rp-choice-sub {
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-preview-label {
  margin: 0 0 0.35rem;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.rp-preview {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
.rp-mono {
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, monospace;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
}
.rp-summary {
  display: grid;
  gap: 0.1rem;
  margin: 0;
}
.rp-summary > div {
  display: grid;
  grid-template-columns: 11rem 1fr;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-summary dt {
  font-weight: 600;
  opacity: 0.7;
}
.rp-summary dd {
  margin: 0;
}
.rp-hint,
.rp-preview-label {
  opacity: 0.7;
}
.rp-error {
  margin: 0;
  color: var(--semantics-feedback-critical-color, #b00);
  font-weight: 600;
}
/* Result lifecycle chain (same look as OrderWizard's provisioning chain). */
.rp-prov-chain {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0;
  margin: 0;
}
.rp-prov-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  position: relative;
}
.rp-prov-step:not(:last-child)::after {
  content: '';
  flex: 1;
  height: 2px;
  margin: 0 0.5rem;
  background: var(--semantics-dividers-color);
}
.rp-prov-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 2px solid var(--semantics-dividers-color);
  flex-shrink: 0;
}
.rp-prov-dot nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.5;
}
.rp-prov-label {
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.55;
}
.rp-prov-step.rp-active .rp-prov-dot {
  /* Literal warning amber: the semantic token is not exposed at document level
     (it lives in the NLDD shadow DOM), so a var() would resolve to transparent. */
  border-color: oklch(0.62 0.16 55);
}
.rp-prov-step.rp-active .rp-prov-dot nldd-icon,
.rp-prov-step.rp-active .rp-prov-label {
  opacity: 1;
}
.rp-prov-step.rp-done .rp-prov-dot {
  /* Literal success green for the same reason — see the amber note above. */
  border-color: oklch(0.55 0.13 155);
  background: oklch(0.55 0.13 155);
}
.rp-prov-step.rp-done .rp-prov-dot nldd-icon {
  opacity: 1;
  color: #fff;
}
.rp-prov-step.rp-done .rp-prov-label {
  opacity: 1;
}
</style>
