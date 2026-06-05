<script setup>
// The koppelvlak golden path. The sibling of NewAppWizard: it walks a team from
// an empty screen to a compliant-by-default API. The catch is that not every
// government standard applies to every koppelvlak, so the wizard's job is to ask
// the two questions that decide applicability — exposure (intern / b2b / publiek)
// and whether it touches persoonsgegevens or publishes events — and then present
// the seven building blocks with the right ones pre-ticked and locked. On finish
// it calls store.createApi(...), which writes the API record and a commit on
// platform-config, and shows a success screen with the commit seam + provenance.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import { STANDAARDEN } from './api-standaarden.js';
import { generateOpenApiYaml, lintAdr, pluralize, OPERATIONS, defaultOps } from './openapi.js';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();

const EXPOSURES = [
  { id: 'intern', name: 'Intern', icon: 'lock-closed', desc: 'Alleen binnen de eigen organisatie.' },
  { id: 'b2b', name: 'Overheid-overheid', icon: 'link', desc: 'Koppelvlak met andere overheidsorganisaties (Digikoppeling / FSC).' },
  { id: 'publiek', name: 'Publiek', icon: 'globe', desc: 'Openbaar bereikbaar op het internet.' },
];

const form = reactive({
  name: '',
  version: 'v1',
  team: store.currentPerson?.team || store.teams[0]?.id,
  exposure: 'intern',
  persoonsgegevens: false,
  events: false,
  // The resources the API exposes. Each carries an op-set (which CRUD operations
  // are enabled); the golden-path default is full CRUD, toggleable per endpoint.
  resources: [{ singular: '', ops: defaultOps() }],
  // The standards posture. The applicable-but-required ones default on; the
  // user can still untick a non-mandatory one. Applicability is recomputed
  // from exposure/persoonsgegevens/events below.
  standaarden: {
    adr: true,
    problemJson: true,
    oauth: true,
    rateLimit: true,
    logboek: false,
    cloudevents: false,
    fsc: false,
  },
});

const selectedTeam = computed(() => store.teamById(form.team));

// Which standards apply, given the current answers. Mirrors api-standaarden.js
// so the wizard preview and the later scorecard verdict never disagree.
function isApplicable(key) {
  if (key === 'logboek') return form.persoonsgegevens;
  if (key === 'cloudevents') return form.events;
  if (key === 'fsc') return form.exposure === 'b2b';
  return true;
}
// adr/problemJson/oauth/rateLimit are mandatory; the conditional three are
// "required when applicable" and locked on once their trigger is set.
function isMandatory(key) {
  return isApplicable(key);
}

// Keep the standards object honest as answers change: switch the conditional
// ones on when they become applicable, off when they stop being.
function syncStandaarden() {
  form.standaarden.logboek = form.persoonsgegevens;
  form.standaarden.cloudevents = form.events;
  form.standaarden.fsc = form.exposure === 'b2b';
}

function pickExposure(id) {
  form.exposure = id;
  syncStandaarden();
}

// --- Resource design ------------------------------------------------------
function addResource() {
  form.resources.push({ singular: '', ops: defaultOps() });
}
function removeResource(i) {
  form.resources.splice(i, 1);
  if (!form.resources.length) form.resources.push({ singular: '', ops: defaultOps() });
}
// Toggle one CRUD operation on a resource, but never let a resource drop to
// zero operations: a resource with no endpoints is not a resource.
function toggleOp(r, key) {
  const enabled = OPERATIONS.filter((o) => r.ops[o.key]).length;
  if (r.ops[key] && enabled === 1) return; // keep at least one
  r.ops[key] = !r.ops[key];
}
// Resources with a non-empty name AND at least one operation; what drives spec.
const namedResources = computed(() =>
  form.resources.filter((r) => r.singular.trim() && OPERATIONS.some((o) => r.ops[o.key])),
);

// The live OpenAPI document, regenerated whenever resources or basics change.
const specPreview = computed(() => {
  if (!namedResources.value.length) return '';
  return generateOpenApiYaml(
    { name: form.name || 'Naamloze API', version: form.version, standaarden: form.standaarden },
    namedResources.value,
  );
});

// The toggleable endpoints for a resource: every CRUD op with its method, path
// and whether it is currently enabled. Drives the on/off chips.
function endpointsFor(r) {
  const p = pluralize(r.singular);
  return OPERATIONS.map((o) => ({
    key: o.key,
    label: `${o.method} /${p}${o.scope === 'item' ? '/{id}' : ''}`,
    on: Boolean(r.ops[o.key]),
  }));
}

// The ADR lint over the current design, green/red in the wizard.
const adrChecks = computed(() => lintAdr({ version: form.version }, form.resources));
const adrOk = computed(() => adrChecks.value.every((c) => c.pass));

const standaardenRows = computed(() =>
  STANDAARDEN.map((s) => ({
    ...s,
    applicable: isApplicable(s.key),
    checked: form.standaarden[s.key],
    status: isApplicable(s.key) ? 'verplicht' : 'n.v.t.',
  })),
);

const cliCommand = computed(() => {
  const on = STANDAARDEN.filter((s) => isApplicable(s.key)).map((s) => s.key);
  const parts = [`bg api new "${form.name || 'mijn-api'}"`, `--versie ${form.version}`, `--team ${form.team}`, `--exposure ${form.exposure}`];
  if (form.persoonsgegevens) parts.push('--persoonsgegevens');
  if (form.events) parts.push('--events');
  if (namedResources.value.length) {
    // A resource with the full CRUD set is just its name; a subset appends the
    // enabled operations (bier:list,get) so the CLI reflects toggled-off ops.
    const specs = namedResources.value.map((r) => {
      const enabled = OPERATIONS.filter((o) => r.ops[o.key]).map((o) => o.key);
      const full = enabled.length === OPERATIONS.length;
      return full ? r.singular.trim() : `${r.singular.trim()}:${enabled.join(',')}`;
    });
    parts.push(`--resources ${specs.join(' ')}`);
  }
  parts.push(`--standaarden ${on.join(',')}`);
  return parts.join(' ');
});

const created = ref(null); // { api }
const createdCommits = ref(0);
const createdCommitSha = ref('');
// Why the koppelvlak can't be created yet, shown on the summary so the finish
// button never feels dead: a click always either creates or explains.
const finishError = ref('');

function onFinish() {
  if (!form.name.trim()) {
    finishError.value = 'Geef het koppelvlak een naam (stap 1).';
    return;
  }
  if (!namedResources.value.length) {
    finishError.value = 'Benoem minstens één resource met een endpoint (stap 3: Ontwerp).';
    return;
  }
  finishError.value = '';
  syncStandaarden();
  const before = store.commits.length;
  created.value = store.createApi({
    name: form.name.trim(),
    version: form.version,
    team: form.team,
    exposure: form.exposure,
    persoonsgegevens: form.persoonsgegevens,
    events: form.events,
    standaarden: { ...form.standaarden },
    resources: namedResources.value.map((r) => ({ singular: r.singular.trim(), ops: { ...r.ops } })),
  });
  createdCommits.value = store.commits.length - before;
  createdCommitSha.value = store.commits[0]?.sha || '';
}

const canFinish = computed(() => form.name.trim() && form.team && namedResources.value.length > 0);

const successLinks = computed(() => {
  if (!created.value) return [];
  return [
    { text: 'API-catalogus', to: '/koppelvlakken', icon: 'link' },
    { text: 'API-compliance', to: '/koppelvlakken/compliance', icon: 'shield-check-mark' },
    { text: selectedTeam.value?.name || 'Team', to: `/teams/${form.team}`, icon: 'person-2' },
  ];
});

// Presentation mode can auto-drive this wizard on stage, like NewAppWizard.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() =>
  presentation.registerWizard('api', { form, wizardRef: wizardApi, finish: onFinish, pickExposure, addResource, removeResource }),
);
onBeforeUnmount(() => presentation.unregisterWizard('api'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Nieuw koppelvlak"
      lede="Het gebaande pad naar een nieuw koppelvlak, oftewel een API, die compliant-by-default is. Je benoemt de resources, het platform genereert er een ADR-conforme OpenAPI-specificatie bij; de standaarden volgen uit je antwoorden."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Koppelvlakken', href: '/koppelvlakken' },
        { text: 'Nieuw', href: '/koppelvlakken/nieuw' },
      ]"
    />

    <!-- Success screen -->
    <template v-if="created">
      <nldd-card>
        <nldd-container padding="28">
          <div class="rp-done-head">
            <div class="rp-done-icon">
              <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
            </div>
            <div>
              <nldd-title size="3"><h2>{{ created.api.name }} {{ created.api.version }} is aangemaakt</h2></nldd-title>
              <nldd-rich-text>
                <p>Het koppelvlak staat in de catalogus, in beta. De gekozen standaarden zijn als gebaand pad ingericht; de compliance-scorecard toont per standaard de status.</p>
              </nldd-rich-text>
            </div>
          </div>

          <nldd-spacer size="20" />

          <RelationLinks title="Ga verder met" :links="successLinks" />

          <CliHint :command="cliCommand" label="Ditzelfde resultaat via de CLI:" />

          <!-- The seam: this koppelvlak is a commit on platform-config. -->
          <router-link v-if="createdCommits" :to="`/platform/iac/${createdCommitSha}`" class="rp-commit-seam">
            <nldd-icon name="chevron-left-forward-slash-chevron-right" aria-hidden="true"></nldd-icon>
            <span class="rp-commit-text">
              Dit koppelvlak is <code>{{ createdCommits }}</code> {{ createdCommits === 1 ? 'commit' : 'commits' }} op <code>platform-config</code>
            </span>
            <nldd-icon name="arrow-right" aria-hidden="true" class="rp-commit-arrow"></nldd-icon>
          </router-link>

          <nldd-spacer size="20" />
          <NerdsBadge richtlijn="integratie" />
          <nldd-spacer size="8" />
          <NerdsBadge richtlijn="open-standaarden" />

          <nldd-spacer size="20" />
          <nldd-button-group orientation="horizontal">
            <router-link to="/koppelvlakken">
              <nldd-button variant="primary" text="Naar de catalogus" end-icon="arrow-right"></nldd-button>
            </router-link>
            <router-link to="/koppelvlakken/compliance">
              <nldd-button variant="secondary" text="Bekijk compliance" start-icon="shield-check-mark"></nldd-button>
            </router-link>
          </nldd-button-group>
        </nldd-container>
      </nldd-card>
    </template>

    <!-- Wizard -->
    <Wizard
      v-else
      ref="wizardRef"
      :steps="[
        { title: 'Doel' },
        { title: 'Gegevens' },
        { title: 'Ontwerp' },
        { title: 'Standaarden' },
        { title: 'Samenvatting' },
      ]"
      finish-label="Koppelvlak aanmaken"
      @finish="onFinish"
    >
      <template #default="{ step, go }">
        <!-- Step 0: doel & blootstelling -->
        <div v-if="step === 0">
          <nldd-title size="4"><h2>Naam, team en blootstelling</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>De blootstelling bepaalt welke standaarden verplicht worden. Een overheid-overheid-koppelvlak vraagt om Digikoppeling / FSC.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <nldd-form-field label="Naam van het koppelvlak">
            <nldd-text-field
              placeholder="Bijv. Vergunningen API"
              :value="form.name"
              @input="(e) => (form.name = e.target.value)"
            ></nldd-text-field>
          </nldd-form-field>
          <nldd-spacer size="12" />
          <div class="rp-two-col">
            <nldd-form-field label="Versie">
              <nldd-text-field
                placeholder="v1"
                :value="form.version"
                @input="(e) => (form.version = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-form-field label="Eigenaarsteam">
              <nldd-dropdown>
                <select :value="form.team" @change="(e) => (form.team = e.target.value)">
                  <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </div>

          <nldd-spacer size="20" />
          <nldd-title size="4"><h3>Blootstelling</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-tpl-grid">
            <button
              v-for="e in EXPOSURES"
              :key="e.id"
              type="button"
              class="rp-tpl-choice"
              :class="{ 'rp-selected': form.exposure === e.id }"
              @click="pickExposure(e.id)"
            >
              <div class="rp-tpl-choice-head">
                <nldd-icon :name="e.icon" aria-hidden="true"></nldd-icon>
                <strong>{{ e.name }}</strong>
                <nldd-icon v-if="form.exposure === e.id" name="check-mark-circle" class="rp-tick" aria-hidden="true"></nldd-icon>
              </div>
              <span class="rp-tpl-choice-desc">{{ e.desc }}</span>
            </button>
          </div>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            v-if="!form.name.trim()"
            title="Naam verplicht"
            supporting-text="Geef het koppelvlak een naam voordat je verder gaat."
          ></nldd-inline-dialog>
        </div>

        <!-- Step 1: gegevens & gebeurtenissen -->
        <div v-else-if="step === 1">
          <nldd-title size="4"><h2>Gegevens en gebeurtenissen</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Deze twee antwoorden schakelen het Logboek Dataverwerkingen en CloudEvents in of uit op het gebaande pad.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-infra-grid">
            <button
              type="button"
              class="rp-infra-choice"
              :class="{ 'rp-selected': form.persoonsgegevens }"
              @click="form.persoonsgegevens = !form.persoonsgegevens; syncStandaarden()"
            >
              <nldd-checkbox :checked="form.persoonsgegevens || undefined" @click.stop="form.persoonsgegevens = !form.persoonsgegevens; syncStandaarden()"></nldd-checkbox>
              <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
              <span class="rp-infra-text">
                <strong>Verwerkt persoonsgegevens</strong>
                <span>Zet het Logboek Dataverwerkingen (NEN 7513) verplicht, voor AVG-transparantie.</span>
              </span>
            </button>
            <button
              type="button"
              class="rp-infra-choice"
              :class="{ 'rp-selected': form.events }"
              @click="form.events = !form.events; syncStandaarden()"
            >
              <nldd-checkbox :checked="form.events || undefined" @click.stop="form.events = !form.events; syncStandaarden()"></nldd-checkbox>
              <nldd-icon name="envelope" aria-hidden="true"></nldd-icon>
              <span class="rp-infra-text">
                <strong>Publiceert gebeurtenissen</strong>
                <span>Zet CloudEvents 1.0 verplicht, zodat andere diensten kunnen abonneren.</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Step 2: ontwerp (resources → OpenAPI) -->
        <div v-else-if="step === 2">
          <nldd-title size="4"><h2>Ontwerp je API</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Benoem de resources (zelfstandig naamwoord, enkelvoud). Per resource genereert het platform de volledige ADR-CRUD: een gepagineerde lijst, aanmaken, ophalen, bijwerken en verwijderen, met problem+json-fouten. Rechts zie je de OpenAPI-specificatie meegroeien.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-design-grid">
            <div class="rp-design-left">
              <p class="rp-spec-label">Resources</p>
              <p class="rp-design-hint">Benoem een resource en kies welke endpoints je aanbiedt. Klik een endpoint om het aan of uit te zetten.</p>
              <div class="rp-res-list">
                <div v-for="(r, i) in form.resources" :key="i" class="rp-res-card">
                  <div class="rp-res-row">
                    <nldd-text-field
                      class="rp-res-input"
                      placeholder="Bijv. vergunning"
                      :value="r.singular"
                      @input="(e) => (r.singular = e.target.value)"
                    ></nldd-text-field>
                    <nldd-button
                      variant="secondary"
                      size="sm"
                      text="Verwijderen"
                      start-icon="trash"
                      @click="removeResource(i)"
                    ></nldd-button>
                  </div>
                  <div v-if="r.singular.trim()" class="rp-ep-toggles">
                    <button
                      v-for="ep in endpointsFor(r)"
                      :key="ep.key"
                      type="button"
                      class="rp-ep-toggle"
                      :class="{ 'rp-ep-on': ep.on }"
                      :aria-pressed="ep.on"
                      @click="toggleOp(r, ep.key)"
                    >
                      <nldd-icon :name="ep.on ? 'check-mark-circle' : 'add'" aria-hidden="true"></nldd-icon>
                      <code>{{ ep.label }}</code>
                    </button>
                  </div>
                </div>
              </div>
              <nldd-spacer size="8" />
              <nldd-button variant="secondary" size="sm" text="Resource toevoegen" start-icon="add" @click="addResource"></nldd-button>

              <nldd-spacer size="16" />
              <p class="rp-spec-label">ADR-check</p>
              <div class="rp-adr-list">
                <div v-for="c in adrChecks" :key="c.rule" class="rp-adr-row">
                  <nldd-icon
                    :name="c.pass ? 'check-mark-circle' : 'exclamation-triangle'"
                    :class="c.pass ? 'rp-adr-ok' : 'rp-adr-bad'"
                    aria-hidden="true"
                  ></nldd-icon>
                  <span class="rp-adr-text">
                    <strong>{{ c.rule }}</strong>
                    <span class="rp-adr-detail">{{ c.detail }}</span>
                  </span>
                </div>
              </div>
            </div>

            <div class="rp-design-right">
              <p class="rp-spec-label">OpenAPI-specificatie <span class="rp-spec-sub">· live, YAML, ADR-conform</span></p>
              <nldd-code-viewer v-if="specPreview" language="yaml" class="rp-spec-yaml">{{ specPreview }}</nldd-code-viewer>
              <div v-else class="rp-spec-empty">
                <nldd-icon name="document" aria-hidden="true"></nldd-icon>
                <span>Voeg een resource toe om de specificatie te genereren.</span>
              </div>
            </div>
          </div>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            v-if="!namedResources.length"
            title="Minstens één resource"
            supporting-text="Benoem minstens één resource voordat je verder gaat."
          ></nldd-inline-dialog>
        </div>

        <!-- Step 3: standaarden -->
        <div v-else-if="step === 3">
          <nldd-title size="4"><h2>De standaarden waaraan je voldoet</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Verplichte bouwstenen staan vast. Wat n.v.t. is volgt uit je antwoorden in de vorige stappen, en kun je daar wijzigen.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-std-list">
            <div
              v-for="s in standaardenRows"
              :key="s.key"
              class="rp-std-row"
              :class="{ 'rp-std-nvt': !s.applicable }"
            >
              <nldd-checkbox :checked="s.checked || undefined" disabled></nldd-checkbox>
              <span class="rp-std-text">
                <strong>{{ s.label }}</strong>
                <span class="rp-std-bron">{{ s.bron }} · <code>{{ s.skill }}</code></span>
              </span>
              <nldd-tag v-if="s.applicable" color="success" size="md">verplicht</nldd-tag>
              <nldd-tag v-else color="neutral" size="md">n.v.t.</nldd-tag>
            </div>
          </div>
        </div>

        <!-- Step 4: samenvatting -->
        <div v-else-if="step === 4">
          <nldd-title size="4"><h2>Klaar om aan te maken</h2></nldd-title>
          <nldd-spacer size="16" />

          <nldd-list>
            <nldd-list-item @click="go(0)">
              <nldd-icon-cell slot="start" name="link"></nldd-icon-cell>
              <nldd-title-cell overline="Koppelvlak" :text="`${form.name || 'geen'} · ${form.version}`"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(0)">
              <nldd-icon-cell slot="start" name="person-2"></nldd-icon-cell>
              <nldd-title-cell overline="Team" :text="selectedTeam?.name || 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(0)">
              <nldd-icon-cell slot="start" name="globe"></nldd-icon-cell>
              <nldd-title-cell overline="Blootstelling" :text="EXPOSURES.find((e) => e.id === form.exposure)?.name"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(2)">
              <nldd-icon-cell slot="start" name="document"></nldd-icon-cell>
              <nldd-title-cell overline="Resources" :text="namedResources.length ? namedResources.map((r) => pluralize(r.singular)).join(', ') : 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(3)">
              <nldd-icon-cell slot="start" name="shield-check-mark"></nldd-icon-cell>
              <nldd-title-cell overline="Standaarden" :text="standaardenRows.filter((s) => s.applicable).map((s) => s.label).join(', ')"></nldd-title-cell>
            </nldd-list-item>
          </nldd-list>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            v-if="finishError"
            variant="error"
            title="Nog niet compleet"
            :supporting-text="finishError"
          ></nldd-inline-dialog>
          <nldd-inline-dialog
            v-else-if="!canFinish"
            title="Nog niet compleet"
            supporting-text="Geef het koppelvlak een naam, kies een team en benoem minstens één resource voordat je het aanmaakt."
          ></nldd-inline-dialog>

          <CliHint :command="cliCommand" label="Liever via de CLI? Dit commando doet hetzelfde:" />
        </div>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-two-col { display: grid; grid-template-columns: 1fr 2fr; gap: 0.75rem; }

.rp-tpl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }
.rp-tpl-choice {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.9rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
}
.rp-tpl-choice:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-tpl-choice.rp-selected {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color, #154273) inset;
}
.rp-tpl-choice-head { display: flex; align-items: center; gap: 0.5rem; }
.rp-tpl-choice-head nldd-icon { width: 1.2rem; height: 1.2rem; }
.rp-tick { margin-left: auto; color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-tpl-choice-desc { font-size: 0.85rem; opacity: 0.75; }

/* Design step: resources left, live spec right. */
.rp-design-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; align-items: start; }
@media (max-width: 900px) { .rp-design-grid { grid-template-columns: 1fr; } }
.rp-spec-label {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; margin: 0 0 0.5rem;
}
.rp-spec-sub { text-transform: none; letter-spacing: 0; opacity: 0.85; }
.rp-design-hint { font-size: 0.85rem; opacity: 0.7; margin: 0 0 0.75rem; }
.rp-res-list { display: flex; flex-direction: column; gap: 0.75rem; }
.rp-res-card {
  border: 1px solid var(--semantics-dividers-color); border-radius: 12px; padding: 0.75rem;
}
.rp-res-row { display: flex; align-items: center; gap: 0.5rem; }
.rp-res-input { flex: 1 1 auto; }
.rp-ep-toggles { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.6rem; }
.rp-ep-toggle {
  display: inline-flex; align-items: center; gap: 0.35rem;
  font: inherit; cursor: pointer;
  padding: 0.25rem 0.55rem; border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  background: transparent; color: inherit; opacity: 0.55;
}
.rp-ep-toggle code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.74rem; }
.rp-ep-toggle nldd-icon { width: 0.85rem; height: 0.85rem; }
.rp-ep-toggle:hover { opacity: 0.85; }
.rp-ep-toggle.rp-ep-on {
  opacity: 1;
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color, #f4f6f9);
}
.rp-adr-list { display: flex; flex-direction: column; gap: 0.5rem; }
.rp-adr-row { display: flex; align-items: flex-start; gap: 0.5rem; }
.rp-adr-row nldd-icon { width: 1.1rem; height: 1.1rem; flex: 0 0 auto; margin-top: 0.1rem; }
.rp-adr-ok { color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-adr-bad { color: var(--semantics-feedback-critical-icon-color, #b00020); }
.rp-adr-text { display: flex; flex-direction: column; gap: 0.05rem; }
.rp-adr-detail { font-size: 0.82rem; opacity: 0.7; }
.rp-spec-yaml { display: block; max-height: 460px; overflow: auto; }
.rp-spec-empty {
  display: flex; flex-direction: column; align-items: center; gap: 0.6rem; text-align: center;
  padding: 2rem 1rem; border: 1px dashed var(--semantics-dividers-color); border-radius: 12px; opacity: 0.6;
}
.rp-spec-empty nldd-icon { width: 1.6rem; height: 1.6rem; }

.rp-infra-grid { display: flex; flex-direction: column; gap: 0.6rem; }
.rp-infra-choice {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  text-align: left;
}
.rp-infra-choice:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-infra-choice.rp-selected {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color, #154273) inset;
}
.rp-infra-choice > nldd-icon { width: 1.3rem; height: 1.3rem; }
.rp-infra-text { display: flex; flex-direction: column; gap: 0.1rem; flex: 1 1 auto; }
.rp-infra-text span { font-size: 0.85rem; opacity: 0.75; }

.rp-std-list { display: flex; flex-direction: column; gap: 0.5rem; }
.rp-std-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
}
.rp-std-row.rp-std-nvt { opacity: 0.55; }
.rp-std-text { display: flex; flex-direction: column; gap: 0.1rem; flex: 1 1 auto; min-width: 0; }
.rp-std-bron { font-size: 0.82rem; opacity: 0.75; }
.rp-std-bron code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }

.rp-done-head { display: flex; align-items: flex-start; gap: 1rem; }
.rp-done-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 3rem; height: 3rem; border-radius: 50%; flex: none;
  background: var(--semantics-feedback-success-background-color, #e6f4ea);
}
.rp-done-icon nldd-icon { width: 1.7rem; height: 1.7rem; color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-commit-seam {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0.7rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
  background: var(--semantics-surfaces-tinted-background-color, #f4f6f9);
  text-decoration: none;
  color: inherit;
}
.rp-commit-seam:hover { border-color: var(--semantics-actions-primary-default-background-color, #154273); }
.rp-commit-seam > nldd-icon { width: 1.05rem; height: 1.05rem; opacity: 0.75; flex: 0 0 auto; }
.rp-commit-text { flex: 1 1 auto; font-size: 0.9rem; }
.rp-commit-text code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-weight: 600; }
.rp-commit-arrow { opacity: 0.4; }
</style>
