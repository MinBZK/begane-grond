<script setup>
// The "wet -> systeem" golden path. Six steps walk a jurist and a developer
// from a legal source, via a traject and the machine-readable model (where each
// input is bound to a basisregistratie), through scenarios and an engine
// preview, to a published law deployed as a running service. On finish it
// actually mutates the store: harvest/createTraject, enrichWet, runScenarios,
// publishWet, deployWetAsService, then shows a success screen with deep links.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();

const form = reactive({
  // Step 0: source
  mode: 'harvest', // nieuw | wijziging | harvest
  newName: '',
  existingWetId: store.wetten[0]?.id || '',
  bwbId: 'BWBR0008659',
  harvestName: 'Wet op de huurtoeslag',
  // Step 1: traject
  trajectName: '',
  members: [store.currentUser],
  team: store.currentPerson?.team || store.teams[0]?.id,
  // Step 2: machine-readable
  outputs: [{ name: 'heeft_recht' }],
  inputs: [{ register: store.registers[0]?.id || '', output: '' }],
  // Step 3: scenario
  scenario: { name: 'Standaardgeval heeft recht', given: 'verzekerd, toetsingsinkomen € 24.000', then: 'recht op toeslag' },
  // Step 5: publish
  template: 'tpl-rust-api',
});

// Derive a working name for the law from the chosen source mode.
const wetLabel = computed(() => {
  if (form.mode === 'wijziging') return store.wetById(form.existingWetId)?.name || 'gekozen wet';
  if (form.mode === 'harvest') return form.harvestName || 'geharveste wet';
  return form.newName || 'nieuwe regeling';
});

// Prefill the traject name from the chosen source once it is known.
function syncTrajectName() {
  if (!form.trajectName.trim()) {
    form.trajectName = form.mode === 'wijziging' ? `Wijziging ${wetLabel.value}` : `${wetLabel.value} machine-leesbaar`;
  }
}

function toggleMember(id) {
  const i = form.members.indexOf(id);
  if (i === -1) form.members.push(id);
  else if (id !== store.currentUser) form.members.splice(i, 1);
}

function addOutput() {
  if (form.outputs.length < 2) form.outputs.push({ name: '' });
}
function addInput() {
  if (form.inputs.length < 2) form.inputs.push({ register: store.registers[0]?.id || '', output: '' });
}
function registerName(id) {
  return store.registerById(id)?.name || id;
}
function registerFields(id) {
  return store.registerById(id)?.fields || [];
}

// Sync the first input's output to the first field of its register if empty.
function onRegisterChange(idx) {
  const inp = form.inputs[idx];
  const fields = registerFields(inp.register);
  if (!inp.output && fields.length) inp.output = fields[0];
}

const validInputs = computed(() =>
  form.inputs.filter((i) => i.register && i.output).map((i) => ({
    name: i.output,
    type: 'string',
    source: { kind: 'register', id: i.register, output: i.output },
  })),
);
const validOutputs = computed(() =>
  form.outputs.filter((o) => o.name.trim()).map((o) => ({ name: o.name.trim(), type: 'boolean' })),
);

const cliCommand = computed(() => {
  const id = created.value?.wet?.id || wetLabel.value.toLowerCase().replace(/\s+/g, '-');
  return `rp wet deploy ${id} --template rust-api`;
});

// --- Finish: actually create everything ---
const created = ref(null); // { wet, app, repoId }

function onFinish() {
  let wet;
  if (form.mode === 'harvest') {
    wet = store.harvestWet({ name: form.harvestName.trim() || 'Nieuwe wet', bwbId: form.bwbId.trim(), layer: 'WET' });
  } else if (form.mode === 'wijziging') {
    wet = store.wetById(form.existingWetId);
  } else {
    // 'nieuw': harvest acts as the create-entry for a fresh regeling too.
    wet = store.harvestWet({ name: form.newName.trim() || 'Nieuwe regeling', bwbId: 'BWBR-nieuw', layer: 'MINISTERIELE_REGELING' });
  }
  if (!wet) return;

  store.createTraject({
    name: form.trajectName.trim() || `${wet.name} machine-leesbaar`,
    wet: wet.id,
    members: [...form.members],
    team: form.team,
  });
  store.enrichWet(wet.id, { inputs: validInputs.value, outputs: validOutputs.value });
  store.runScenarios(wet.id);
  store.publishWet(wet.id);
  const { app, repoId } = store.deployWetAsService(wet.id, { template: form.template });
  created.value = { wet, app, repoId };
}

const createdRepo = computed(() => (created.value ? store.repoById(created.value.repoId) : null));
const successLinks = computed(() => {
  if (!created.value) return [];
  const links = [
    { text: created.value.wet.name, to: `/wetten/${created.value.wet.id}`, icon: 'file-text' },
    { text: created.value.app.name, to: `/apps/${created.value.app.id}`, icon: 'rectangle-stack' },
    { text: createdRepo.value?.name || 'Repository', to: `/code/${created.value.repoId}`, icon: 'chevron-left-forward-slash-chevron-right' },
  ];
  for (const reg of store.registersForWet(created.value.wet.id)) {
    links.push({ text: reg.name, to: `/registers/${reg.id}`, icon: 'cylinder-split' });
  }
  return links;
});

const selectedTeam = computed(() => store.teamById(form.team));

// Presentation mode can auto-drive this wizard on stage.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() =>
  presentation.registerWizard('wet', { form, wizardRef: wizardApi, finish: onFinish, addInput, addOutput }),
);
onBeforeUnmount(() => presentation.unregisterWizard('wet'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Wet naar systeem"
      lede="De gouden weg van RegelRecht: van een geharveste wettekst naar een gepubliceerde, machine-leesbare wet die als dienst draait. Jurist en developer werken in hetzelfde traject, met de basisregistraties als bron."
      :crumbs="[
        { text: 'Wetten', href: '/wetten' },
        { text: 'Wet naar systeem', href: '/wetten/nieuw' },
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
              <nldd-title size="3"><h2>{{ created.wet.name }} draait nu als dienst</h2></nldd-title>
              <nldd-rich-text>
                <p>
                  De wet is machine-leesbaar gemaakt, gepubliceerd in het corpus en uitgerold als uitvoerende dienst.
                  De scenario's staan groen en de invoer leest rechtstreeks uit de basisregistraties.
                </p>
              </nldd-rich-text>
            </div>
          </div>

          <nldd-spacer size="20" />

          <nldd-container layout="grid" column-count="3" sm-column-count="1" gap="16">
            <div class="rp-done-fact">
              <span class="rp-done-fact-label">Wet</span>
              <span class="rp-done-fact-value">{{ created.wet.name }}</span>
              <nldd-tag color="success" size="md">gepubliceerd</nldd-tag>
            </div>
            <div class="rp-done-fact">
              <span class="rp-done-fact-label">Dienst</span>
              <span class="rp-done-fact-value">{{ created.app.name }}</span>
              <nldd-tag color="success" size="md">uitgerold</nldd-tag>
            </div>
            <div class="rp-done-fact">
              <span class="rp-done-fact-label">Bronnen</span>
              <span class="rp-done-fact-value">{{ store.registersForWet(created.wet.id).length }} register(s)</span>
              <nldd-tag color="accent" size="md">aangesloten</nldd-tag>
            </div>
          </nldd-container>

          <nldd-spacer size="20" />

          <RelationLinks title="Ga verder met" :links="successLinks" />

          <CliHint :command="cliCommand" label="Ditzelfde resultaat via de CLI:" />

          <nldd-spacer size="20" />
          <nldd-button-group orientation="horizontal">
            <router-link :to="`/wetten/${created.wet.id}`">
              <nldd-button variant="primary" text="Open de wet" end-icon="arrow-right"></nldd-button>
            </router-link>
            <router-link to="/wetten">
              <nldd-button variant="secondary" text="Naar het corpus" start-icon="books-vertical"></nldd-button>
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
        { title: 'Bron' },
        { title: 'Traject' },
        { title: 'Machine-leesbaar' },
        { title: 'Scenario\'s' },
        { title: 'Uitvoeren' },
        { title: 'Publiceren' },
      ]"
      finish-label="Publiceren en uitrollen"
      @finish="onFinish"
    >
      <template #default="{ step }">
        <!-- Step 0: Bron -->
        <div v-if="step === 0">
          <nldd-title size="4"><h2>Waar begint deze wet?</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Kies het startpunt. Een bestaande wet harvesten uit BWB, een lopende wet wijzigen, of een nieuwe regeling opstellen.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-mode-grid">
            <button type="button" class="rp-mode" :class="{ 'rp-selected': form.mode === 'harvest' }" @click="form.mode = 'harvest'; syncTrajectName()">
              <nldd-icon name="magnifier" aria-hidden="true"></nldd-icon>
              <strong>Harvesten</strong>
              <span>Bestaande wet ophalen uit BWB</span>
            </button>
            <button type="button" class="rp-mode" :class="{ 'rp-selected': form.mode === 'wijziging' }" @click="form.mode = 'wijziging'; syncTrajectName()">
              <nldd-icon name="pencil" aria-hidden="true"></nldd-icon>
              <strong>Wijziging</strong>
              <span>Een wet in het corpus aanpassen</span>
            </button>
            <button type="button" class="rp-mode" :class="{ 'rp-selected': form.mode === 'nieuw' }" @click="form.mode = 'nieuw'; syncTrajectName()">
              <nldd-icon name="plus" aria-hidden="true"></nldd-icon>
              <strong>Nieuw</strong>
              <span>Nieuwe regeling opstellen</span>
            </button>
          </div>

          <nldd-spacer size="20" />

          <template v-if="form.mode === 'harvest'">
            <nldd-form-field label="BWB-id">
              <nldd-text-field :value="form.bwbId" placeholder="BWBR0008659" @input="(e) => (form.bwbId = e.target.value)"></nldd-text-field>
            </nldd-form-field>
            <nldd-spacer size="12" />
            <nldd-form-field label="Naam van de wet">
              <nldd-text-field :value="form.harvestName" @input="(e) => { form.harvestName = e.target.value; }"></nldd-text-field>
            </nldd-form-field>
          </template>

          <template v-else-if="form.mode === 'wijziging'">
            <nldd-form-field label="Welke wet wijzig je?">
              <nldd-dropdown>
                <select :value="form.existingWetId" @change="(e) => { form.existingWetId = e.target.value; }">
                  <option v-for="w in store.wetten" :key="w.id" :value="w.id">{{ w.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </template>

          <template v-else>
            <nldd-form-field label="Naam van de regeling">
              <nldd-text-field :value="form.newName" placeholder="Bijv. Regeling tegemoetkoming energiekosten" @input="(e) => (form.newName = e.target.value)"></nldd-text-field>
            </nldd-form-field>
          </template>
        </div>

        <!-- Step 1: Traject -->
        <div v-else-if="step === 1">
          <nldd-title size="4"><h2>Open een traject</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Een traject is de werkruimte met een eigen branch waarin jurist en developer samen aan de wet werken.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <nldd-form-field label="Naam van het traject">
            <nldd-text-field :value="form.trajectName" :placeholder="`${wetLabel} machine-leesbaar`" @input="(e) => (form.trajectName = e.target.value)"></nldd-text-field>
          </nldd-form-field>

          <nldd-spacer size="16" />
          <nldd-form-field label="Teamleden">
            <div class="rp-member-grid">
              <button
                v-for="p in store.people"
                :key="p.id"
                type="button"
                class="rp-member"
                :class="{ 'rp-selected': form.members.includes(p.id) }"
                @click="toggleMember(p.id)"
              >
                <span class="rp-avatar">{{ p.avatar }}</span>
                <span class="rp-member-text">
                  <strong>{{ p.name }}</strong>
                  <span>{{ p.role }}</span>
                </span>
                <nldd-icon v-if="form.members.includes(p.id)" name="check-mark-circle" class="rp-tick" aria-hidden="true"></nldd-icon>
              </button>
            </div>
          </nldd-form-field>

          <nldd-spacer size="16" />
          <nldd-form-field label="Eigenaarsteam">
            <nldd-dropdown>
              <select :value="form.team" @change="(e) => (form.team = e.target.value)">
                <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
        </div>

        <!-- Step 2: Machine-leesbaar -->
        <div v-else-if="step === 2">
          <nldd-title size="4"><h2>Maak de wet machine-leesbaar</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Definieer wat de wet bepaalt (uitvoer) en waar de waarden vandaan komen (invoer). Elke invoer leest uit een basisregistratie: dit is de kern van de uitvoering.</p></nldd-rich-text>
          <nldd-spacer size="10" />
          <router-link to="/ai" class="rp-ai-hint">
            <nldd-icon name="sparkles" aria-hidden="true"></nldd-icon>
            <span>Laat de assistent een eerste vertaling voorstellen</span>
          </router-link>
          <nldd-spacer size="20" />

          <nldd-title size="5"><h3>Uitvoer</h3></nldd-title>
          <nldd-spacer size="8" />
          <div v-for="(o, i) in form.outputs" :key="i" class="rp-row-field">
            <nldd-text-field :value="o.name" placeholder="Bijv. heeft_recht_op_toeslag" @input="(e) => (o.name = e.target.value)"></nldd-text-field>
          </div>
          <nldd-button v-if="form.outputs.length < 2" variant="secondary" text="Uitvoer toevoegen" start-icon="plus" @click="addOutput"></nldd-button>

          <nldd-spacer size="24" />

          <nldd-title size="5"><h3>Invoer uit bronnen</h3></nldd-title>
          <nldd-spacer size="8" />
          <div v-for="(inp, i) in form.inputs" :key="i" class="rp-input-bind">
            <nldd-form-field label="Bron (basisregistratie)">
              <nldd-dropdown>
                <select :value="inp.register" @change="(e) => { inp.register = e.target.value; onRegisterChange(i); }">
                  <option v-for="r in store.registers" :key="r.id" :value="r.id">{{ r.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
            <nldd-form-field label="Veld">
              <nldd-dropdown>
                <select :value="inp.output" @change="(e) => (inp.output = e.target.value)">
                  <option value="" disabled>Kies een veld</option>
                  <option v-for="f in registerFields(inp.register)" :key="f" :value="f">{{ f }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
            <div class="rp-bind-preview rp-mono" v-if="inp.register && inp.output">
              {{ inp.output }} ← {{ registerName(inp.register) }}
            </div>
          </div>
          <nldd-button v-if="form.inputs.length < 2" variant="secondary" text="Invoer toevoegen" start-icon="plus" @click="addInput"></nldd-button>
        </div>

        <!-- Step 3: Scenario's -->
        <div v-else-if="step === 3">
          <nldd-title size="4"><h2>Toets met een scenario</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Een Given/When/Then-scenario beschrijft een casus en de verwachte uitkomst. Het bewijst dat de uitvoering klopt en blijft kloppen.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <nldd-form-field label="Naam van het scenario">
            <nldd-text-field :value="form.scenario.name" @input="(e) => (form.scenario.name = e.target.value)"></nldd-text-field>
          </nldd-form-field>
          <nldd-spacer size="12" />
          <nldd-form-field label="Gegeven (feiten, komma-gescheiden)">
            <nldd-text-field :value="form.scenario.given" @input="(e) => (form.scenario.given = e.target.value)"></nldd-text-field>
          </nldd-form-field>
          <nldd-spacer size="12" />
          <nldd-form-field label="Dan (verwachte uitkomst)">
            <nldd-text-field :value="form.scenario.then" @input="(e) => (form.scenario.then = e.target.value)"></nldd-text-field>
          </nldd-form-field>
        </div>

        <!-- Step 4: Uitvoeren -->
        <div v-else-if="step === 4">
          <nldd-title size="4"><h2>Uitvoeren en valideren</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>De engine draait het scenario tegen de zojuist gedefinieerde uitvoering, met de gekozen bronnen als invoer.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-validate">
            <div class="rp-validate-head">
              <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
              <div>
                <strong>{{ form.scenario.name }}</strong>
                <nldd-tag color="success" size="md">geslaagd</nldd-tag>
              </div>
            </div>
            <nldd-spacer size="12" />
            <ol class="rp-trace">
              <li v-for="(inp, i) in validInputs" :key="i" class="rp-mono">{{ inp.name }} ← {{ registerName(inp.source.id) }}: opgehaald</li>
              <li class="rp-mono">scenario "{{ form.scenario.name }}" toegepast</li>
              <li class="rp-mono">verwachte uitkomst: {{ form.scenario.then }}</li>
            </ol>
          </div>
        </div>

        <!-- Step 5: Publiceren -->
        <div v-else-if="step === 5">
          <nldd-title size="4"><h2>Publiceren en uitrollen</h2></nldd-title>
          <nldd-spacer size="16" />

          <nldd-list>
            <nldd-list-item>
              <nldd-icon-cell slot="start" name="file-text"></nldd-icon-cell>
              <nldd-title-cell overline="Wet" :text="wetLabel"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item>
              <nldd-icon-cell slot="start" name="pencil"></nldd-icon-cell>
              <nldd-title-cell overline="Traject" :text="form.trajectName || `${wetLabel} machine-leesbaar`"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item>
              <nldd-icon-cell slot="start" name="person-2"></nldd-icon-cell>
              <nldd-title-cell overline="Team" :text="selectedTeam?.name || form.team"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item>
              <nldd-icon-cell slot="start" name="cylinder-split"></nldd-icon-cell>
              <nldd-title-cell overline="Bronnen" :text="validInputs.length ? validInputs.map((i) => registerName(i.source.id)).join(', ') : 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item>
              <nldd-icon-cell slot="start" name="check-mark-circle"></nldd-icon-cell>
              <nldd-title-cell overline="Uitvoer" :text="validOutputs.length ? validOutputs.map((o) => o.name).join(', ') : 'geen'"></nldd-title-cell>
            </nldd-list-item>
          </nldd-list>

          <nldd-spacer size="16" />
          <nldd-form-field label="Template voor de uitvoerende dienst">
            <nldd-dropdown>
              <select :value="form.template" @change="(e) => (form.template = e.target.value)">
                <option v-for="t in store.templates" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            title="Wat er gebeurt bij publiceren"
            supporting-text="De wet wordt machine-leesbaar opgeslagen, de scenario's gedraaid, gepubliceerd naar het corpus en als dienst uitgerold via de golden path: een repository met CI, een database en de YAML-uitvoering."
          ></nldd-inline-dialog>

          <CliHint :command="`rp wet deploy ${wetLabel.toLowerCase().replace(/\\s+/g, '-')} --template rust-api`" label="Liever via de CLI? Dit commando doet hetzelfde:" />
        </div>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

.rp-mode-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.75rem; }
.rp-mode {
  display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start;
  text-align: left; padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color);
  background: transparent; cursor: pointer; font: inherit;
}
.rp-mode:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-mode > nldd-icon { width: 1.4rem; height: 1.4rem; }
.rp-mode span { font-size: 0.85rem; opacity: 0.75; }
.rp-mode.rp-selected,
.rp-member.rp-selected {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color, #154273) inset;
}

.rp-member-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.6rem; }
.rp-member {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.65rem 0.8rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  background: transparent; cursor: pointer; font: inherit; text-align: left;
}
.rp-member:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-member-text { display: flex; flex-direction: column; flex: 1 1 auto; }
.rp-member-text span { font-size: 0.8rem; opacity: 0.7; }
.rp-tick { width: 1.1rem; height: 1.1rem; color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; border-radius: 50%; flex: 0 0 auto;
  background: var(--semantics-surfaces-tinted-background-color);
  font-size: 0.72rem; font-weight: 700;
}

.rp-ai-hint {
  display: inline-flex; align-items: center; gap: 0.45rem;
  text-decoration: none; color: var(--semantics-actions-primary-default-background-color, #154273);
  font-size: 0.88rem; font-weight: 600;
}
.rp-ai-hint:hover { text-decoration: underline; }
.rp-ai-hint nldd-icon { width: 1rem; height: 1rem; }

.rp-row-field { margin-bottom: 0.6rem; }
.rp-input-bind {
  display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap;
  padding: 0.85rem; margin-bottom: 0.75rem;
  border: 1px solid var(--semantics-dividers-color); border-radius: 10px;
}
.rp-input-bind nldd-form-field { flex: 1 1 200px; }
.rp-bind-preview {
  flex-basis: 100%;
  font-size: 0.8rem; opacity: 0.75;
  padding-top: 0.25rem;
}

.rp-validate { padding: 1rem; border: 1px solid var(--semantics-dividers-color); border-radius: 12px; }
.rp-validate-head { display: flex; align-items: center; gap: 0.6rem; }
.rp-validate-head > nldd-icon { width: 1.5rem; height: 1.5rem; color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-validate-head div { display: flex; align-items: center; gap: 0.5rem; }
.rp-trace { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; }

.rp-done-head { display: flex; align-items: flex-start; gap: 1rem; }
.rp-done-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 3rem; height: 3rem; border-radius: 50%; flex: none;
  background: var(--semantics-feedback-success-background-color, #e6f4ea);
}
.rp-done-icon nldd-icon { width: 1.7rem; height: 1.7rem; color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-done-fact { display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start; }
.rp-done-fact-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; }
.rp-done-fact-value { font-weight: 600; }
</style>
