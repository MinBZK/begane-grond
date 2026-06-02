<script setup>
// Provisioning wizard for a new autonomous Rijkslaptop. Walks through choosing
// the person, the hardware model, the OS image, a software profile/role and the
// encryption/MDM policy, then calls store.provisionWorkplace and watches the
// fake status chain (besteld -> provisioning -> geleverd -> in gebruik) animate.
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import CliHint from '../../components/shared/CliHint.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import Wizard from '../../components/shared/Wizard.vue';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();
const route = useRoute();
const router = useRouter();

const steps = [
  { title: 'Medewerker' },
  { title: 'Hardware' },
  { title: 'Image' },
  { title: 'Profiel' },
  { title: 'Policy' },
  { title: 'Bevestigen' },
];

// Software profiles map a role to a curated set of pre-installed tooling.
const profiles = [
  { id: 'developer', name: 'Developer', icon: 'terminal', tools: ['VS Code', 'Podman', 'bg CLI', 'kubectl'] },
  { id: 'data', name: 'Data engineer', icon: 'cylinder-split', tools: ['uv', 'DBeaver', 'JupyterLab'] },
  { id: 'office', name: 'Kantoor', icon: 'apartment-building', tools: ['LibreOffice', 'Rijkshuisstijl-fonts'] },
  { id: 'sre', name: 'SRE / Ops', icon: 'gear', tools: ['kubectl', 'k9s', 'Grafana Agent', 'bg CLI'] },
];

const form = ref({
  person: store.people[0]?.id || '',
  model: route.query.model || store.hardware[0]?.id || '',
  image: store.images[0]?.id || '',
  profile: 'developer',
  encrypted: true,
  mdm: true,
});

// Keep a deep link from the hardware catalogue (?model=) honoured.
watch(
  () => route.query.model,
  (m) => {
    if (m) form.value.model = m;
  },
);

const selectedPerson = computed(() => store.personById(form.value.person));

// Person picker. A real platform has thousands of employees, so this is a
// search-as-you-type picker against the identity directory (here: the store),
// not a wall of cards. We show a capped number of matches; an empty query
// shows a few recent/suggested people so the step is never blank.
const personQuery = ref('');
const personLimit = 6;
const filteredPeople = computed(() => {
  const q = personQuery.value.trim().toLowerCase();
  // Exclude the already-selected person: they are shown in the pinned chip above.
  const all = store.people.filter((p) => p.id !== form.value.person);
  const matches = q
    ? all.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          (store.teamById(p.team)?.name || '').toLowerCase().includes(q),
      )
    : all;
  return matches.slice(0, personLimit);
});
const moreCount = computed(() => {
  const q = personQuery.value.trim().toLowerCase();
  const total = q ? filteredPeople.value.length : store.people.length;
  return Math.max(0, total - personLimit);
});
function pickPerson(id) {
  form.value.person = id;
}
const selectedTeam = computed(() =>
  selectedPerson.value ? store.teamById(selectedPerson.value.team) : null,
);
const selectedModel = computed(() => store.hardware.find((h) => h.id === form.value.model));
const selectedImage = computed(() => store.images.find((i) => i.id === form.value.image));
const selectedProfile = computed(() => profiles.find((p) => p.id === form.value.profile));

// Result / live status chain.
const created = ref(null);
const lifecycle = ['besteld', 'provisioning', 'geleverd', 'in gebruik'];

function finish() {
  // provisionWorkplace already kicks off the status chain in the store.
  created.value = store.provisionWorkplace({
    person: form.value.person,
    model: form.value.model,
    image: form.value.image,
    profile: form.value.profile,
  });
}

const cliCommand = computed(
  () =>
    `bg werkplek provision \\\n  --person ${form.value.person} \\\n  --model ${form.value.model} \\\n  --image ${form.value.image} \\\n  --profile ${form.value.profile}${form.value.encrypted ? ' \\\n  --encrypted' : ''}${form.value.mdm ? ' \\\n  --mdm' : ''}`,
);

// Presentation mode can auto-drive this wizard on stage. The form here is a ref,
// so the inner object is exposed (the driver mutates exposed.form.value).
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() => presentation.registerWizard('werkplek', { form, wizardRef: wizardApi, finish }));
onBeforeUnmount(() => presentation.unregisterWizard('werkplek'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Werkplek uitrollen"
      lede="Rol in een paar stappen een autonome, versleutelde en MDM-beheerde Rijkslaptop uit voor een medewerker."
      :crumbs="[
        { text: 'Begane Grond', href: '/' },
        { text: 'Werkplekken', href: '/werkplekken' },
        { text: 'Uitrollen', href: '/werkplekken/nieuw' },
      ]"
    />

    <!-- Result screen with the animated lifecycle -->
    <div v-if="created">
      <nldd-card>
        <nldd-container padding="32">
          <div class="rp-done-head">
            <nldd-icon name="check-mark-circle" aria-hidden="true" class="rp-done-icon"></nldd-icon>
            <div>
              <nldd-title size="3"><h2>Werkplek wordt uitgerold</h2></nldd-title>
              <nldd-rich-text>
                <p>
                  {{ store.personById(created.person)?.name }} krijgt een
                  <strong>{{ selectedModel?.name }}</strong> met image
                  <strong>{{ selectedImage?.name }}</strong>.
                </p>
              </nldd-rich-text>
            </div>
            <StatusBadge :status="created.status" />
          </div>

          <nldd-spacer size="24" />

          <ol class="rp-lifecycle">
            <li
              v-for="(stage, i) in lifecycle"
              :key="stage"
              :class="{
                'rp-stage-done': lifecycle.indexOf(created.status) > i,
                'rp-stage-active': created.status === stage,
              }"
            >
              <span class="rp-stage-dot">
                <nldd-icon
                  v-if="lifecycle.indexOf(created.status) > i"
                  name="check-mark"
                  aria-hidden="true"
                ></nldd-icon>
              </span>
              <span class="rp-stage-label">{{ stage }}</span>
            </li>
          </ol>

          <nldd-spacer size="24" />

          <nldd-button-group orientation="horizontal">
            <nldd-button
              variant="primary"
              text="Naar werkplek"
              end-icon="arrow-right"
              @click="router.push(`/werkplekken/${created.id}`)"
            ></nldd-button>
            <nldd-button
              variant="secondary"
              text="Naar vloot"
              start-icon="person-2"
              @click="router.push('/werkplekken')"
            ></nldd-button>
          </nldd-button-group>

          <CliHint :command="cliCommand" />
        </nldd-container>
      </nldd-card>
    </div>

    <!-- Wizard -->
    <Wizard v-else ref="wizardRef" :steps="steps" finish-label="Uitrollen" @finish="finish">
      <template #default="{ step }">
        <!-- Step 1: person (search-as-you-type, scales to a large directory) -->
        <div v-if="step === 0">
          <nldd-title size="4"><h2>Voor wie is deze werkplek?</h2></nldd-title>
          <nldd-spacer size="8" />
          <nldd-rich-text><p>Zoek de medewerker in de Rijksgids.</p></nldd-rich-text>
          <nldd-spacer size="12" />

          <nldd-search-field
            placeholder="Zoek op naam, rol of team"
            accessible-label="Zoek medewerker"
            :value="personQuery"
            @input="(e) => (personQuery = e.target.value)"
          ></nldd-search-field>

          <!-- Currently selected person, always visible even when filtered out. -->
          <template v-if="selectedPerson">
            <nldd-spacer size="12" />
            <div class="rp-pick rp-pick-on rp-pick-selected">
              <span class="rp-pick-avatar">{{ selectedPerson.avatar }}</span>
              <span class="rp-pick-main">
                <strong>{{ selectedPerson.name }}</strong>
                <span class="rp-pick-sub">{{ selectedPerson.role }} · {{ store.teamById(selectedPerson.team)?.name }}</span>
              </span>
              <nldd-tag color="success" size="md">Geselecteerd</nldd-tag>
            </div>
          </template>

          <nldd-spacer size="16" />
          <div class="rp-pick-list">
            <button
              v-for="p in filteredPeople"
              :key="p.id"
              type="button"
              class="rp-pick"
              :class="{ 'rp-pick-on': form.person === p.id }"
              @click="pickPerson(p.id)"
            >
              <span class="rp-pick-avatar">{{ p.avatar }}</span>
              <span class="rp-pick-main">
                <strong>{{ p.name }}</strong>
                <span class="rp-pick-sub">{{ p.role }} · {{ store.teamById(p.team)?.name }}</span>
              </span>
            </button>
            <p v-if="!filteredPeople.length" class="rp-pick-empty">Geen medewerker gevonden voor "{{ personQuery }}".</p>
          </div>
          <p v-if="moreCount > 0" class="rp-pick-more">
            En nog {{ moreCount }} resultaten. Verfijn je zoekopdracht.
          </p>
        </div>

        <!-- Step 2: hardware -->
        <div v-else-if="step === 1">
          <nldd-title size="4"><h2>Welk model?</h2></nldd-title>
          <nldd-spacer size="16" />
          <div class="rp-pick-grid">
            <button
              v-for="hw in store.hardware"
              :key="hw.id"
              type="button"
              class="rp-pick"
              :class="{ 'rp-pick-on': form.model === hw.id }"
              @click="form.model = hw.id"
            >
              <nldd-icon name="rectangle-stack" aria-hidden="true" class="rp-pick-icon"></nldd-icon>
              <span class="rp-pick-main">
                <strong>{{ hw.name }}</strong>
                <span class="rp-pick-sub">{{ hw.cpu }} · {{ hw.ram }} · {{ hw.storage }}</span>
                <span class="rp-pick-sub">{{ hw.stock }} op voorraad · levertijd {{ hw.lead }}</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Step 3: image -->
        <div v-else-if="step === 2">
          <nldd-title size="4"><h2>Welke OS-image?</h2></nldd-title>
          <nldd-spacer size="16" />
          <div class="rp-pick-grid">
            <button
              v-for="img in store.images"
              :key="img.id"
              type="button"
              class="rp-pick"
              :class="{ 'rp-pick-on': form.image === img.id }"
              @click="form.image = img.id"
            >
              <nldd-icon name="cloud" aria-hidden="true" class="rp-pick-icon"></nldd-icon>
              <span class="rp-pick-main">
                <strong>{{ img.name }}</strong>
                <span class="rp-pick-sub">{{ img.base }}</span>
                <span class="rp-pick-sub">{{ img.desc }}</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Step 4: profile -->
        <div v-else-if="step === 3">
          <nldd-title size="4"><h2>Software-profiel</h2></nldd-title>
          <nldd-rich-text><p>Bepaalt welke tooling vooraf is geïnstalleerd.</p></nldd-rich-text>
          <nldd-spacer size="16" />
          <div class="rp-pick-grid">
            <button
              v-for="pr in profiles"
              :key="pr.id"
              type="button"
              class="rp-pick"
              :class="{ 'rp-pick-on': form.profile === pr.id }"
              @click="form.profile = pr.id"
            >
              <nldd-icon :name="pr.icon" aria-hidden="true" class="rp-pick-icon"></nldd-icon>
              <span class="rp-pick-main">
                <strong>{{ pr.name }}</strong>
                <span class="rp-pick-tags">
                  <nldd-tag v-for="t in pr.tools" :key="t" color="neutral" size="md">{{ t }}</nldd-tag>
                </span>
              </span>
            </button>
          </div>
        </div>

        <!-- Step 5: policy -->
        <div v-else-if="step === 4">
          <nldd-title size="4"><h2>Encryptie- en MDM-policy</h2></nldd-title>
          <nldd-rich-text>
            <p>De Rijksbaseline schrijft beide voor. Uitzetten kan alleen met motivatie.</p>
          </nldd-rich-text>
          <nldd-spacer size="16" />
          <div class="rp-policy">
            <label class="rp-policy-row" :class="{ 'rp-policy-on': form.encrypted }">
              <input v-model="form.encrypted" type="checkbox" />
              <nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon>
              <span>
                <strong>Full-disk-encryptie (LUKS)</strong>
                <span class="rp-pick-sub">Verplicht volgens BIO. Aanbevolen aan te laten.</span>
              </span>
            </label>
            <label class="rp-policy-row" :class="{ 'rp-policy-on': form.mdm }">
              <input v-model="form.mdm" type="checkbox" />
              <nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>
              <span>
                <strong>MDM-beheer & automatische updates</strong>
                <span class="rp-pick-sub">Centraal patchen, op afstand wissen bij verlies.</span>
              </span>
            </label>
          </div>
        </div>

        <!-- Step 6: review -->
        <div v-else-if="step === 5">
          <nldd-title size="4"><h2>Controleer en rol uit</h2></nldd-title>
          <nldd-spacer size="16" />
          <dl class="rp-review">
            <div><dt>Medewerker</dt><dd>{{ selectedPerson?.name }} · {{ selectedTeam?.name }}</dd></div>
            <div><dt>Hardware</dt><dd>{{ selectedModel?.name }}</dd></div>
            <div><dt>Image</dt><dd>{{ selectedImage?.name }} ({{ selectedImage?.base }})</dd></div>
            <div><dt>Profiel</dt><dd>{{ selectedProfile?.name }}</dd></div>
            <div>
              <dt>Policy</dt>
              <dd>
                <nldd-tag :color="form.encrypted ? 'success' : 'critical'" size="md">
                  {{ form.encrypted ? 'Versleuteld' : 'Geen encryptie' }}
                </nldd-tag>
                <nldd-tag :color="form.mdm ? 'success' : 'warning'" size="md">
                  {{ form.mdm ? 'MDM aan' : 'MDM uit' }}
                </nldd-tag>
              </dd>
            </div>
          </dl>
          <nldd-spacer size="16" />
          <CliHint :command="cliCommand" />
        </div>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-pick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.75rem;
}
/* Person picker: a vertical results list (search-driven), not a wall of cards. */
.rp-pick-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 22rem;
  overflow-y: auto;
}
.rp-pick-selected {
  align-items: center;
}
.rp-pick-selected nldd-tag {
  margin-left: auto;
}
.rp-pick-empty {
  opacity: 0.6;
  padding: 0.75rem 0.25rem;
  margin: 0;
}
.rp-pick-more {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  opacity: 0.6;
}
.rp-pick {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
  box-sizing: border-box;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  transition: border-color 0.12s ease, background 0.12s ease;
}
.rp-pick:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-pick-on {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-pick-avatar {
  flex: 0 0 auto;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  background: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-pick-icon {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.15rem;
  flex: 0 0 auto;
  opacity: 0.7;
}
.rp-pick-main {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}
.rp-pick-sub {
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-pick-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.35rem;
}
.rp-policy {
  display: grid;
  gap: 0.75rem;
}
.rp-policy-row {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1.5px solid var(--semantics-dividers-color);
  cursor: pointer;
}
.rp-policy-row span {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.rp-policy-row nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
  margin-top: 0.1rem;
  opacity: 0.7;
}
.rp-policy-on {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-review {
  display: grid;
  gap: 0.6rem;
  margin: 0;
}
.rp-review div {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1rem;
  align-items: baseline;
}
.rp-review dt {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-review dd {
  margin: 0;
  font-weight: 600;
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-done-head {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-done-icon {
  width: 2.6rem;
  height: 2.6rem;
  flex: 0 0 auto;
  color: var(--nldd-color-success, #39870c);
}
.rp-lifecycle {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  padding: 0;
  margin: 0;
}
.rp-lifecycle li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1 1 0;
  min-width: 140px;
  position: relative;
  opacity: 0.45;
}
.rp-lifecycle li::after {
  content: '';
  flex: 1;
  height: 2px;
  background: var(--semantics-dividers-color);
  margin: 0 0.4rem;
}
.rp-lifecycle li:last-child::after {
  display: none;
}
.rp-stage-dot {
  flex: 0 0 auto;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  border: 2px solid var(--semantics-dividers-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--semantics-surfaces-default-background-color, #fff);
}
.rp-stage-dot nldd-icon {
  width: 1rem;
  height: 1rem;
  color: white;
}
.rp-stage-label {
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}
.rp-stage-done,
.rp-stage-active {
  opacity: 1;
}
.rp-stage-done .rp-stage-dot {
  background: var(--nldd-color-success, #39870c);
  border-color: var(--nldd-color-success, #39870c);
}
.rp-stage-active .rp-stage-dot {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  animation: rp-pulse 1.1s ease-in-out infinite;
}
@keyframes rp-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(21, 66, 115, 0.4);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(21, 66, 115, 0);
  }
}
</style>
