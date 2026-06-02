<script setup>
// Order wizard for a single infra service kind (from the route :kind param).
// Walks owner team -> environment -> size/plan -> datacenter -> name -> summary,
// then calls store.orderInstance(...) on finish and shows a live status screen
// that tracks the requested -> provisioning -> ready chain the store drives.
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';
import { usePresentation } from '../../presentation/usePresentation.js';

const route = useRoute();
const store = usePlatformStore();

const kind = computed(() => route.params.kind);
const service = computed(
  () => store.serviceCatalog.find((s) => s.kind === kind.value) || null,
);

// Size/plan options differ a bit per kind, but a generic t-shirt scale works
// for most. LLM is sized by model, so we surface model ids there.
const sizeOptions = computed(() => {
  if (kind.value === 'llm') {
    return store.llmModels.map((m) => ({ value: m.id, label: m.name, sub: `${m.context} context · €${m.pricePer1m}/1M` }));
  }
  return [
    { value: 'S', label: 'S (klein)', sub: 'dev/test, 2 vCPU' },
    { value: 'M', label: 'M (middel)', sub: '4 vCPU, HA-paar' },
    { value: 'L', label: 'L (groot)', sub: '8 vCPU, HA-paar' },
    { value: 'XL', label: 'XL (extra groot)', sub: '16 vCPU, multi-node' },
  ];
});

const datacenters = computed(() => store.datacenters);

const ENV_LABELS = { dev: 'Ontwikkel', test: 'Test', acc: 'Acceptatie', prod: 'Productie' };

// Form model with sensible defaults so the wizard is filled from the start.
const form = reactive({
  team: store.currentPerson?.team || store.teams[0]?.id,
  app: '',
  env: 'dev',
  size: '',
  dc: 'dc-denhaag',
  name: '',
});

// Default size + a generated name once the service kind is known.
watch(
  service,
  () => {
    if (!form.size) form.size = sizeOptions.value[0]?.value || '';
  },
  { immediate: true },
);

const teamApps = computed(() => store.appsByTeam(form.team));

const suggestedName = computed(
  () => `${kind.value}-${form.team?.replace('team-', '') || 'team'}-${form.env}`,
);
function useSuggestedName() {
  form.name = suggestedName.value;
}

function teamName(id) {
  return store.teamById(id)?.name || id;
}
function dcName(id) {
  return store.datacenterById(id)?.name || id;
}
function sizeLabel(value) {
  return sizeOptions.value.find((o) => o.value === value)?.label || value;
}

// --- Provisioning state ---
const ordered = ref(null); // the created instance (reactive store object)
const cliCommand = computed(() => {
  if (!ordered.value) return '';
  const i = ordered.value;
  const appPart = i.app ? ` --app ${i.app}` : '';
  return `bg infra order ${i.kind} --name ${i.name} --team ${i.team} --env ${i.env} --size ${i.size} --dc ${i.dc}${appPart}`;
});

const STEPS = [
  { name: 'requested', label: 'Aangevraagd', icon: 'check-mark-circle' },
  { name: 'provisioning', label: 'Provisioneren', icon: 'gear' },
  { name: 'ready', label: 'Gereed', icon: 'starburst-filled' },
];
function stepState(stepName) {
  if (!ordered.value) return 'todo';
  const order = STEPS.map((s) => s.name);
  const ci = order.indexOf(ordered.value.status);
  const si = order.indexOf(stepName);
  if (ci > si) return 'done';
  if (ci === si) return ordered.value.status === 'ready' ? 'done' : 'active';
  return 'todo';
}

function placeBlurb() {
  if (!ordered.value) return '';
  if (ordered.value.rack) {
    const r = store.rackById(ordered.value.rack);
    return `Landt op rack ${r?.label || ordered.value.rack} in ${dcName(ordered.value.dc)}.`;
  }
  return `Draait als beheerde dienst in ${dcName(ordered.value.dc)}.`;
}

function finish() {
  ordered.value = store.orderInstance({
    kind: kind.value,
    name: form.name || suggestedName.value,
    team: form.team,
    app: form.app || null,
    env: form.env,
    size: form.size,
    dc: form.dc,
  });
}

const wizardSteps = [
  { title: 'Eigenaar' },
  { title: 'Omgeving' },
  { title: 'Grootte' },
  { title: 'Datacenter' },
  { title: 'Naam' },
  { title: 'Samenvatting' },
];

// Presentation mode can auto-drive this wizard on stage. The exposed wizardRef
// delegates to the live <Wizard> instance so the driver can call next()/goTo()
// without worrying about ref timing.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() => presentation.registerWizard('order', { form, wizardRef: wizardApi, finish }));
onBeforeUnmount(() => presentation.unregisterWizard('order'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      :title="service ? `${service.name} afnemen` : 'Dienst afnemen'"
      :lede="service ? service.tagline : ''"
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Infra-diensten', href: '/infra' },
        { text: service ? service.name : 'Afnemen', href: `/infra/order/${kind}` },
      ]"
    >
      <template #actions>
        <nldd-tag v-if="service" color="warning" size="md">{{ service.tier }}</nldd-tag>
        <nldd-tag v-if="service" color="neutral" size="md">{{ service.priceHint }}</nldd-tag>
      </template>
    </PageHeader>

    <!-- Provisioning / result screen -->
    <div v-if="ordered">
      <nldd-card :accessible-label="`Aanvraag ${ordered.name}`">
        <nldd-container padding="24">
          <div class="rp-prov-head">
            <div>
              <nldd-title size="4"><h2>{{ ordered.name }}</h2></nldd-title>
              <nldd-rich-text>
                <p>{{ service?.name }} voor {{ teamName(ordered.team) }} · omgeving {{ ENV_LABELS[ordered.env] }}</p>
              </nldd-rich-text>
            </div>
            <StatusBadge :status="ordered.status" />
          </div>

          <nldd-spacer size="20" />

          <ol class="rp-prov-chain">
            <li
              v-for="s in STEPS"
              :key="s.name"
              :class="`rp-prov-step rp-${stepState(s.name)}`"
            >
              <span class="rp-prov-dot">
                <nldd-icon :name="s.icon" aria-hidden="true"></nldd-icon>
              </span>
              <span class="rp-prov-label">{{ s.label }}</span>
            </li>
          </ol>

          <nldd-spacer size="20" />
          <nldd-inline-dialog
            v-if="ordered.status === 'ready'"
            title="Gereed voor gebruik"
            :supporting-text="placeBlurb()"
          ></nldd-inline-dialog>
          <nldd-rich-text v-else>
            <p class="rp-prov-progress">Bezig met uitrollen… {{ placeBlurb() }}</p>
          </nldd-rich-text>

          <nldd-spacer size="20" />
          <nldd-button-group orientation="horizontal">
            <router-link :to="`/infra/instances/${ordered.id}`">
              <nldd-button variant="primary" text="Naar instance" end-icon="arrow-right"></nldd-button>
            </router-link>
            <router-link to="/infra/instances">
              <nldd-button variant="secondary" text="Alle instances" start-icon="rectangle-stack"></nldd-button>
            </router-link>
          </nldd-button-group>

          <CliHint :command="cliCommand" />
        </nldd-container>
      </nldd-card>
    </div>

    <!-- The wizard itself -->
    <Wizard v-else ref="wizardRef" :steps="wizardSteps" finish-label="Aanvragen" @finish="finish">
      <template #default="{ step }">
        <!-- Step 0: owner team + optional app -->
        <div v-if="step === 0">
          <nldd-title size="5"><h3>Voor welk team?</h3></nldd-title>
          <nldd-spacer size="12" />
          <nldd-form-field label="Eigenaar-team">
            <nldd-dropdown>
              <select v-model="form.team">
                <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-spacer size="16" />
          <nldd-form-field label="Koppelen aan applicatie (optioneel)">
            <nldd-dropdown>
              <select v-model="form.app">
                <option value="">Geen applicatie</option>
                <option v-for="a in teamApps" :key="a.id" :value="a.id">{{ a.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
        </div>

        <!-- Step 1: environment -->
        <div v-else-if="step === 1">
          <nldd-title size="5"><h3>Voor welke omgeving?</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-choice-grid">
            <button
              v-for="env in store.environments"
              :key="env"
              type="button"
              class="rp-choice"
              :class="{ 'rp-sel': form.env === env }"
              @click="form.env = env"
            >
              <span class="rp-choice-title">{{ ENV_LABELS[env] }}</span>
              <span class="rp-choice-sub">{{ env }}</span>
            </button>
          </div>
        </div>

        <!-- Step 2: size / plan -->
        <div v-else-if="step === 2">
          <nldd-title size="5"><h3>Welke grootte of plan?</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-choice-grid">
            <button
              v-for="opt in sizeOptions"
              :key="opt.value"
              type="button"
              class="rp-choice"
              :class="{ 'rp-sel': form.size === opt.value }"
              @click="form.size = opt.value"
            >
              <span class="rp-choice-title">{{ opt.label }}</span>
              <span class="rp-choice-sub">{{ opt.sub }}</span>
            </button>
          </div>
        </div>

        <!-- Step 3: datacenter -->
        <div v-else-if="step === 3">
          <nldd-title size="5"><h3>In welk datacenter?</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-choice-grid">
            <button
              v-for="dc in datacenters"
              :key="dc.id"
              type="button"
              class="rp-choice"
              :class="{ 'rp-sel': form.dc === dc.id, 'rp-disabled': dc.status === 'in aanbouw' }"
              :disabled="dc.status === 'in aanbouw'"
              @click="form.dc = dc.id"
            >
              <span class="rp-choice-title">{{ dc.name }}</span>
              <span class="rp-choice-sub">{{ dc.city }} · {{ dc.redundancy }} · PUE {{ dc.pue }}</span>
              <StatusBadge :status="dc.status" size="sm" />
            </button>
          </div>
        </div>

        <!-- Step 4: name -->
        <div v-else-if="step === 4">
          <nldd-title size="5"><h3>Geef de instance een naam</h3></nldd-title>
          <nldd-spacer size="12" />
          <nldd-form-field label="Naam">
            <nldd-text-field
              :value="form.name"
              placeholder="bijv. pg-burgerzaken-prod"
              @input="(e) => (form.name = e.target.value)"
            ></nldd-text-field>
          </nldd-form-field>
          <nldd-spacer size="10" />
          <nldd-button
            variant="secondary"
            size="sm"
            :text="`Voorstel gebruiken: ${suggestedName}`"
            start-icon="sparkles"
            @click="useSuggestedName"
          ></nldd-button>
        </div>

        <!-- Step 5: summary -->
        <div v-else-if="step === 5">
          <nldd-title size="5"><h3>Controleer de aanvraag</h3></nldd-title>
          <nldd-spacer size="16" />
          <dl class="rp-summary">
            <div><dt>Dienst</dt><dd>{{ service?.name }} <span class="rp-dim">({{ service?.tier }})</span></dd></div>
            <div><dt>Team</dt><dd>{{ teamName(form.team) }}</dd></div>
            <div><dt>Applicatie</dt><dd>{{ form.app ? store.appById(form.app)?.name : 'geen' }}</dd></div>
            <div><dt>Omgeving</dt><dd>{{ ENV_LABELS[form.env] }}</dd></div>
            <div><dt>Grootte</dt><dd>{{ sizeLabel(form.size) }}</dd></div>
            <div><dt>Datacenter</dt><dd>{{ dcName(form.dc) }}</dd></div>
            <div><dt>Naam</dt><dd class="rp-mono">{{ form.name || suggestedName }}</dd></div>
          </dl>
          <nldd-spacer size="16" />
          <nldd-inline-dialog
            title="Wat er gebeurt na aanvragen"
            :supporting-text="`De instance doorloopt aangevraagd, provisioneren en gereed. Indicatie: ${service?.priceHint}.`"
          ></nldd-inline-dialog>
        </div>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
.rp-choice {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
.rp-choice:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-choice.rp-sel {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-choice.rp-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.rp-choice-title {
  font-weight: 700;
}
.rp-choice-sub {
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-summary {
  display: grid;
  gap: 0.1rem;
  margin: 0;
}
.rp-summary > div {
  display: grid;
  grid-template-columns: 9rem 1fr;
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
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-dim {
  opacity: 0.6;
}
/* Provisioning chain */
.rp-prov-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
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
  transition: all 0.3s ease;
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
  border-color: var(--nldd-color-warning, #b85c00);
  animation: rp-pulse 1.1s ease-in-out infinite;
}
.rp-prov-step.rp-active .rp-prov-dot nldd-icon,
.rp-prov-step.rp-active .rp-prov-label {
  opacity: 1;
}
.rp-prov-step.rp-done .rp-prov-dot {
  border-color: var(--nldd-color-success, #39870c);
  background: var(--nldd-color-success, #39870c);
}
.rp-prov-step.rp-done .rp-prov-dot nldd-icon {
  opacity: 1;
  color: white;
}
.rp-prov-step.rp-done .rp-prov-label {
  opacity: 1;
}
.rp-prov-progress {
  opacity: 0.7;
}
@keyframes rp-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(184, 92, 0, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(184, 92, 0, 0); }
}
</style>
