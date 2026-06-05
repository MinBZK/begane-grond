<script setup>
// The golden-path wizard. Walks a team through: pick a template, name the app,
// choose which infra to provision, configure the repository, and review. On
// finish it calls store.createApp(...) which also scaffolds a repo and orders
// the selected infra, then shows a success screen with deep links + CLI hint.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();
const route = useRoute();

// Template-specific scaffolding preview, shown in step 1 so the choice is
// concrete: the tree the user gets and the infra it pairs well with.
const TEMPLATE_META = {
  'tpl-vue-nldd': {
    icon: 'rectangle-stack', lang: 'Vue',
    tree: ['src/', '  App.vue', '  main.ts', 'public/', 'vite.config.ts', '.forgejo/workflows/ci.yml', 'LICENSE (EUPL-1.2)'],
    suggests: ['kubernetes'],
  },
  'tpl-rust-api': {
    icon: 'cylinder-split', lang: 'Rust',
    tree: ['src/', '  main.rs', '  routes/', 'migrations/', 'openapi.yaml', 'features/', '.forgejo/workflows/ci.yml', 'LICENSE (EUPL-1.2)'],
    suggests: ['postgres', 'kubernetes'],
  },
  'tpl-python-job': {
    icon: 'folder-stack', lang: 'Python',
    tree: ['src/', '  job.py', 'pyproject.toml', 'uv.lock', 'tests/', '.forgejo/workflows/ci.yml', 'LICENSE (EUPL-1.2)'],
    suggests: ['postgres', 'kafka'],
  },
  'tpl-astro-docs': {
    icon: 'books-vertical', lang: 'Astro',
    tree: ['src/', '  pages/', '  content/', 'astro.config.mjs', '.forgejo/workflows/ci.yml', 'LICENSE (EUPL-1.2)'],
    suggests: [],
  },
};
function tplMeta(id) {
  return TEMPLATE_META[id] || { icon: 'sparkles', lang: 'onbekend', tree: [], suggests: [] };
}

const INFRA = [
  { kind: 'postgres', name: 'PostgreSQL', icon: 'cylinder-split', desc: 'Managed database, dev-size' },
  { kind: 'kafka', name: 'Kafka', icon: 'folder-stack', desc: 'Event streaming / message broker' },
  { kind: 'kubernetes', name: 'Kubernetes-namespace', icon: 'ship-wheel', desc: 'Namespace op het platformcluster' },
];

// Government-specific golden paths. These are not generic scaffolding but
// deliberate, compliant-by-default starting points that live elsewhere on the
// platform. Picking one routes the team to the right specialized flow, so they
// show how the building blocks connect rather than duplicating them here.
const GOV_PATHS = [
  {
    id: 'gov-regelrecht',
    name: 'Wet of beleid uitvoeren',
    icon: 'certificate',
    desc: 'Een applicatie die wet- en regelgeving uitvoert, met de wettekst als bron (RegelRecht).',
    tags: ['RegelRecht', 'BWB-harvest', 'machine-leesbaar'],
    to: '/wetten/nieuw',
    cta: 'Start bij de wet',
  },
  {
    id: 'gov-register',
    name: 'Register-koppeling',
    icon: 'cylinder-split',
    desc: 'Een dienst die put uit de basisregistraties: BRP, BRK, BAG, HR.',
    tags: ['BRP', 'BRK', 'OIN/TOOI'],
    to: '/registers',
    cta: 'Kies een register',
  },
  {
    id: 'gov-api',
    name: 'Nieuw koppelvlak / API',
    icon: 'link',
    desc: 'Een API die compliant-by-default is: ADR, OAuth NL GOV, Logboek en problem+json komen automatisch mee.',
    tags: ['ADR', 'OAuth NL GOV', 'Logboek', 'problem+json'],
    to: '/koppelvlakken/nieuw',
    cta: 'Start het gebaande pad',
  },
  {
    id: 'gov-fsc',
    name: 'Digikoppeling / FSC',
    icon: 'link',
    desc: 'Een veilig koppelvlak tussen overheidsorganisaties, op vertrouwen.',
    tags: ['Digikoppeling', 'FSC', 'PKIoverheid'],
    to: '/koppelvlakken/fsc',
    cta: 'Open koppelvlakken',
  },
  {
    id: 'gov-notificaties',
    name: 'Notificatie-service',
    icon: 'envelope',
    desc: 'Gebeurtenissen publiceren waar andere diensten op abonneren.',
    tags: ['CloudEvents', 'pub/sub', 'abonnementen'],
    to: '/notificaties',
    cta: 'Open notificaties',
  },
  {
    id: 'gov-standaarden',
    name: 'Conform de standaarden',
    icon: 'check-mark-circle',
    desc: 'De afdwingbare defaults: NLDD, API Design Rules, WCAG 2.2 AA, BIO.',
    tags: ['NLDD', 'ADR', 'WCAG', 'BIO'],
    to: '/standaarden',
    cta: 'Bekijk standaarden',
  },
];

const form = reactive({
  template: '',
  name: '',
  team: store.currentPerson?.team || store.teams[0]?.id,
  description: '',
  infra: [],
  visibility: 'open',
  license: 'EUPL-1.2',
});

onMounted(() => {
  const pre = route.query.template;
  if (pre && store.templates.some((t) => t.id === pre)) {
    form.template = pre;
    form.infra = [...tplMeta(pre).suggests];
  }
});

const selectedTemplate = computed(() => store.templates.find((t) => t.id === form.template));
const selectedTeam = computed(() => store.teamById(form.team));

function pickTemplate(id) {
  form.template = id;
  // Pre-tick the infra the template pairs well with, but only if untouched.
  if (!form.infra.length) form.infra = [...tplMeta(id).suggests];
}

function toggleInfra(kind) {
  const i = form.infra.indexOf(kind);
  if (i === -1) form.infra.push(kind);
  else form.infra.splice(i, 1);
}

// Derived repo slug, mirrors the store's createApp naming so the preview is
// honest about what will be created.
const repoSlug = computed(() => {
  const base = form.name.trim().toLowerCase().replace(/\s+/g, '-') || 'nieuwe-app';
  return `nldd/${base}`;
});

const cliCommand = computed(() => {
  const parts = [`bg app new "${form.name || 'mijn-app'}"`];
  parts.push(`--team ${form.team}`);
  if (form.template) parts.push(`--template ${form.template}`);
  if (form.infra.length) parts.push(`--with-infra ${form.infra.join(',')}`);
  parts.push(`--visibility ${form.visibility}`);
  return parts.join(' ');
});

const created = ref(null); // { app, repoId }
// How many commits this golden-path creation wrote to platform-config, and the
// sha of the app-declaration commit to link to. createApp audits the infra
// orders first and the app last, and audit() unshifts, so commits[0] after the
// call is the app commit: the right one to land on. This is the seam.
const createdCommits = ref(0);
const createdCommitSha = ref('');

function onFinish() {
  if (!form.name.trim()) return;
  const before = store.commits.length;
  created.value = store.createApp({
    name: form.name.trim(),
    team: form.team,
    template: form.template,
    withInfra: form.infra,
    visibility: form.visibility,
  });
  createdCommits.value = store.commits.length - before;
  createdCommitSha.value = store.commits[0]?.sha || '';
}

const createdRepo = computed(() =>
  created.value ? store.repoById(created.value.repoId) : null,
);
const createdInstances = computed(() =>
  created.value ? store.instancesByApp(created.value.app.id) : [],
);

const successLinks = computed(() => {
  if (!created.value) return [];
  const links = [
    { text: created.value.app.name, to: `/apps/${created.value.app.id}`, icon: 'rectangle-stack' },
    { text: createdRepo.value?.name || 'Repository', to: `/code/${created.value.repoId}`, icon: 'folder-stack' },
    { text: selectedTeam.value?.name || 'Team', to: `/teams/${form.team}`, icon: 'person-2' },
  ];
  for (const inst of createdInstances.value) {
    links.push({ text: inst.name, to: `/infra/instances/${inst.id}`, icon: 'cloud' });
  }
  return links;
});

// Step validity gates so the primary button never produces a broken app.
const canFinish = computed(() => form.template && form.name.trim() && form.team);

// Presentation mode can auto-drive this wizard on stage.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() =>
  presentation.registerWizard('app', { form, wizardRef: wizardApi, finish: onFinish, pickTemplate, toggleInfra }),
);
onBeforeUnmount(() => presentation.unregisterWizard('app'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Nieuwe applicatie"
      lede="Het gebaande pad: van leeg scherm naar een werkende repository met CI, infra en het design system. In een paar stappen klaar."
      :crumbs="[{ text: 'Home', href: '/' }, { text: 'Applicaties', href: '/apps' }, { text: 'Nieuw', href: '/apps/nieuw' }]"
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
              <nldd-title size="3"><h2>{{ created.app.name }} is aangemaakt</h2></nldd-title>
              <nldd-rich-text>
                <p>
                  Het gebaande pad is uitgerold. De repository staat klaar, CI draait groen en
                  <template v-if="createdInstances.length">de gekozen infra wordt nu geprovisioned.</template>
                  <template v-else>er is nog geen infra afgenomen.</template>
                </p>
              </nldd-rich-text>
            </div>
          </div>

          <nldd-spacer size="20" />

          <nldd-container layout="grid" column-count="3" gap="16">
            <div class="rp-done-fact">
              <span class="rp-done-fact-label">Repository</span>
              <span class="rp-done-fact-value rp-mono">{{ createdRepo?.name }}</span>
              <nldd-tag color="success" size="md">{{ form.license }}</nldd-tag>
            </div>
            <div class="rp-done-fact">
              <span class="rp-done-fact-label">Zichtbaarheid</span>
              <span class="rp-done-fact-value">{{ form.visibility === 'open' ? 'Open' : 'Intern' }}</span>
              <nldd-tag :color="form.visibility === 'open' ? 'success' : 'neutral'" size="md">
                {{ form.visibility === 'open' ? 'open-tenzij' : 'intern' }}
              </nldd-tag>
            </div>
            <div class="rp-done-fact">
              <span class="rp-done-fact-label">Infra</span>
              <span class="rp-done-fact-value">{{ createdInstances.length }} component(en)</span>
              <nldd-tag color="warning" size="md" v-if="createdInstances.length">provisioning</nldd-tag>
              <nldd-tag color="neutral" size="md" v-else>geen</nldd-tag>
            </div>
          </nldd-container>

          <nldd-spacer size="20" />

          <RelationLinks title="Ga verder met" :links="successLinks" />

          <CliHint :command="cliCommand" label="Ditzelfde resultaat via de CLI:" />

          <!-- The seam: this golden-path creation is a set of commits on
               platform-config. We point at them rather than dumping code. -->
          <router-link v-if="createdCommits" :to="`/platform/iac/${createdCommitSha}`" class="rp-commit-seam">
            <nldd-icon name="chevron-left-forward-slash-chevron-right" aria-hidden="true"></nldd-icon>
            <span class="rp-commit-text">
              Deze applicatie is <code>{{ createdCommits }}</code> {{ createdCommits === 1 ? 'commit' : 'commits' }} op <code>platform-config</code>
            </span>
            <nldd-icon name="arrow-right" aria-hidden="true" class="rp-commit-arrow"></nldd-icon>
          </router-link>

          <nldd-spacer size="20" />
          <nldd-button-group orientation="horizontal">
            <router-link :to="`/apps/${created.app.id}`">
              <nldd-button variant="primary" text="Open de applicatie" end-icon="arrow-right"></nldd-button>
            </router-link>
            <router-link to="/apps">
              <nldd-button variant="secondary" text="Terug naar catalogus" start-icon="rectangle-stack"></nldd-button>
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
        { title: 'Gebaand pad' },
        { title: 'Basis' },
        { title: 'Infra' },
        { title: 'Repository' },
        { title: 'Samenvatting' },
      ]"
      finish-label="Applicatie aanmaken"
      @finish="onFinish"
    >
      <template #default="{ step, go }">
        <!-- Step 0: template -->
        <div v-if="step === 0">
          <nldd-title size="4"><h2>Kies een gebaand pad</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Het startpunt bepaalt de taal, de steiger en welke checks meekomen.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-tpl-grid">
            <button
              v-for="t in store.templates"
              :key="t.id"
              type="button"
              class="rp-tpl-choice"
              :class="{ 'rp-selected': form.template === t.id }"
              @click="pickTemplate(t.id)"
            >
              <div class="rp-tpl-choice-head">
                <nldd-icon :name="tplMeta(t.id).icon" aria-hidden="true"></nldd-icon>
                <strong>{{ t.name }}</strong>
                <nldd-icon v-if="form.template === t.id" name="check-mark-circle" class="rp-tick" aria-hidden="true"></nldd-icon>
              </div>
              <span class="rp-tpl-choice-desc">{{ t.desc }}</span>
              <div class="rp-tpl-choice-tags">
                <nldd-tag v-for="p in t.provides" :key="p" color="accent" size="md">{{ p }}</nldd-tag>
              </div>
            </button>
          </div>

          <!-- Government-specific golden paths: deliberate, compliant defaults
               that route to the specialized flow elsewhere on the platform. -->
          <nldd-spacer size="24" />
          <nldd-title size="4"><h3>Specifiek voor de overheid</h3></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Geen kale steiger, maar de bouwstenen die het Rijk uniek maakt. Deze starten in hun eigen flow.</p></nldd-rich-text>
          <nldd-spacer size="12" />
          <div class="rp-tpl-grid">
            <router-link
              v-for="g in GOV_PATHS"
              :key="g.id"
              :to="g.to"
              class="rp-tpl-choice rp-gov-choice"
            >
              <div class="rp-tpl-choice-head">
                <nldd-icon :name="g.icon" aria-hidden="true"></nldd-icon>
                <strong>{{ g.name }}</strong>
                <nldd-icon name="arrow-right" class="rp-gov-arrow" aria-hidden="true"></nldd-icon>
              </div>
              <span class="rp-tpl-choice-desc">{{ g.desc }}</span>
              <div class="rp-tpl-choice-tags">
                <nldd-tag v-for="p in g.tags" :key="p" color="neutral" size="md">{{ p }}</nldd-tag>
              </div>
              <span class="rp-gov-cta">{{ g.cta }} →</span>
            </router-link>
          </div>

          <template v-if="selectedTemplate">
            <nldd-spacer size="20" />
            <div class="rp-preview">
              <div class="rp-preview-label">Steiger-preview · {{ tplMeta(form.template).lang }}</div>
              <pre class="rp-tree"><code>{{ tplMeta(form.template).tree.join('\n') }}</code></pre>
            </div>
          </template>
        </div>

        <!-- Step 1: basics -->
        <div v-else-if="step === 1">
          <nldd-title size="4"><h2>Naam, team en doel</h2></nldd-title>
          <nldd-spacer size="16" />
          <nldd-form-field label="Naam van de applicatie">
            <nldd-text-field
              placeholder="Bijv. Vergunningcheck"
              :value="form.name"
              @input="(e) => (form.name = e.target.value)"
            ></nldd-text-field>
          </nldd-form-field>
          <nldd-spacer size="12" />
          <nldd-form-field label="Eigenaarsteam">
            <nldd-dropdown>
              <select :value="form.team" @change="(e) => (form.team = e.target.value)">
                <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-spacer size="12" />
          <nldd-form-field label="Korte beschrijving">
            <nldd-text-field
              placeholder="Wat doet deze applicatie?"
              :value="form.description"
              @input="(e) => (form.description = e.target.value)"
            ></nldd-text-field>
          </nldd-form-field>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            v-if="!form.name.trim()"
            title="Naam verplicht"
            supporting-text="Geef de applicatie een naam voordat je verder gaat."
          ></nldd-inline-dialog>
        </div>

        <!-- Step 2: infra -->
        <div v-else-if="step === 2">
          <nldd-title size="4"><h2>Welke infra heb je nodig?</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text>
            <p>Wat je hier aanvinkt wordt direct mee-besteld in dev-size. Later opschalen of bijbestellen kan altijd via de service-catalogus.</p>
          </nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-infra-grid">
            <button
              v-for="opt in INFRA"
              :key="opt.kind"
              type="button"
              class="rp-infra-choice"
              :class="{ 'rp-selected': form.infra.includes(opt.kind) }"
              @click="toggleInfra(opt.kind)"
            >
              <nldd-checkbox
                :checked="form.infra.includes(opt.kind) || undefined"
                @click.stop="toggleInfra(opt.kind)"
              ></nldd-checkbox>
              <nldd-icon :name="opt.icon" aria-hidden="true"></nldd-icon>
              <span class="rp-infra-text">
                <strong>{{ opt.name }}</strong>
                <span>{{ opt.desc }}</span>
              </span>
              <nldd-tag
                v-if="tplMeta(form.template).suggests.includes(opt.kind)"
                color="accent"
                size="md"
              >aanbevolen</nldd-tag>
            </button>
          </div>

          <nldd-spacer size="16" />
          <nldd-rich-text>
            <p class="rp-muted">{{ form.infra.length }} component(en) geselecteerd.</p>
          </nldd-rich-text>
        </div>

        <!-- Step 3: repository -->
        <div v-else-if="step === 3">
          <nldd-title size="4"><h2>Repository</h2></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text><p>Het Rijk werkt open-tenzij. De repository krijgt standaard een EUPL-1.2-licentie.</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <nldd-form-field label="Zichtbaarheid">
            <nldd-radio-button-group>
              <label class="rp-radio-row">
                <input type="radio" name="vis" value="open" :checked="form.visibility === 'open'" @change="form.visibility = 'open'" />
                <span><strong>Open</strong>, publiek op code.overheid.nl (open-tenzij)</span>
              </label>
              <label class="rp-radio-row">
                <input type="radio" name="vis" value="intern" :checked="form.visibility === 'intern'" @change="form.visibility = 'intern'" />
                <span><strong>Intern</strong>, alleen binnen het Rijk (vraagt motivatie)</span>
              </label>
            </nldd-radio-button-group>
          </nldd-form-field>

          <nldd-spacer size="16" />
          <div class="rp-repo-preview">
            <span class="rp-done-fact-label">Wordt aangemaakt als</span>
            <nldd-code-viewer language="bash">{{ `git clone https://code.overheid.nl/${repoSlug}.git` }}</nldd-code-viewer>
            <div class="rp-repo-tags">
              <nldd-tag color="success" size="md">{{ form.license }}</nldd-tag>
              <nldd-tag :color="form.visibility === 'open' ? 'success' : 'neutral'" size="md">{{ form.visibility }}</nldd-tag>
              <nldd-tag color="neutral" size="md">CONTRIBUTING.md</nldd-tag>
              <nldd-tag color="neutral" size="md">security.txt</nldd-tag>
            </div>
          </div>
        </div>

        <!-- Step 4: summary -->
        <div v-else-if="step === 4">
          <nldd-title size="4"><h2>Klaar om aan te maken</h2></nldd-title>
          <nldd-spacer size="16" />

          <nldd-list>
            <nldd-list-item @click="go(1)">
              <nldd-icon-cell slot="start" name="rectangle-stack"></nldd-icon-cell>
              <nldd-title-cell overline="Applicatie" :text="form.name || 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(0)">
              <nldd-icon-cell slot="start" name="sparkles"></nldd-icon-cell>
              <nldd-title-cell overline="Gebaand pad" :text="selectedTemplate?.name || 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(1)">
              <nldd-icon-cell slot="start" name="person-2"></nldd-icon-cell>
              <nldd-title-cell overline="Team" :text="selectedTeam?.name || 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(2)">
              <nldd-icon-cell slot="start" name="cloud"></nldd-icon-cell>
              <nldd-title-cell overline="Infra" :text="form.infra.length ? form.infra.join(', ') : 'geen'"></nldd-title-cell>
            </nldd-list-item>
            <nldd-list-item @click="go(3)">
              <nldd-icon-cell slot="start" name="folder-stack"></nldd-icon-cell>
              <nldd-title-cell overline="Repository" :text="`${repoSlug} · ${form.visibility} · ${form.license}`"></nldd-title-cell>
            </nldd-list-item>
          </nldd-list>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            v-if="!canFinish"
            title="Nog niet compleet"
            supporting-text="Kies een gebaand pad en geef de applicatie een naam voordat je hem aanmaakt."
          ></nldd-inline-dialog>

          <CliHint :command="cliCommand" label="Liever via de CLI? Dit commando doet hetzelfde:" />
        </div>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.rp-muted { opacity: 0.7; }

.rp-tpl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.75rem; }
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
  border-color: var(--semantics-actions-primary-default-background-color);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color) inset;
}
.rp-tpl-choice-head { display: flex; align-items: center; gap: 0.5rem; }
.rp-tpl-choice-head nldd-icon { width: 1.2rem; height: 1.2rem; }
.rp-tick { margin-left: auto; color: var(--semantics-feedback-success-icon-color); }
.rp-tpl-choice-desc { font-size: 0.85rem; opacity: 0.75; }
.rp-tpl-choice-tags { display: flex; gap: 0.3rem; flex-wrap: wrap; }

.rp-gov-choice { text-decoration: none; color: inherit; }
.rp-gov-choice:hover { border-color: var(--semantics-actions-primary-default-background-color); }
.rp-gov-arrow { margin-left: auto; width: 1rem; height: 1rem; opacity: 0.5; }
.rp-gov-cta { font-size: 0.82rem; font-weight: 600; color: var(--semantics-actions-primary-default-background-color); margin-top: 0.15rem; }

.rp-preview { border: 1px solid var(--semantics-dividers-color); border-radius: 10px; overflow: hidden; }
.rp-preview-label {
  font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6;
  padding: 0.5rem 0.85rem; border-bottom: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-tree { margin: 0; padding: 0.85rem; font-size: 0.82rem; line-height: 1.5; overflow-x: auto; }

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
  border-color: var(--semantics-actions-primary-default-background-color);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color) inset;
}
.rp-infra-choice > nldd-icon { width: 1.3rem; height: 1.3rem; }
.rp-infra-text { display: flex; flex-direction: column; gap: 0.1rem; flex: 1 1 auto; }
.rp-infra-text span { font-size: 0.85rem; opacity: 0.75; }

.rp-radio-row { display: flex; align-items: center; gap: 0.55rem; padding: 0.4rem 0; cursor: pointer; }
.rp-repo-preview { display: flex; flex-direction: column; gap: 0.6rem; }
.rp-repo-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; }

.rp-done-head { display: flex; align-items: flex-start; gap: 1rem; }
.rp-done-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 3rem; height: 3rem; border-radius: 50%; flex: none;
  background: var(--semantics-feedback-success-background-color);
}
.rp-done-icon nldd-icon { width: 1.7rem; height: 1.7rem; color: var(--semantics-feedback-success-icon-color); }
.rp-done-fact { display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start; }
.rp-done-fact-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; }
.rp-done-fact-value { font-weight: 600; }
.rp-commit-seam {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0.7rem 0.85rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
  text-decoration: none;
  color: inherit;
}
.rp-commit-seam:hover {
  border-color: var(--semantics-actions-primary-default-background-color);
}
.rp-commit-seam > nldd-icon { width: 1.05rem; height: 1.05rem; opacity: 0.75; flex: 0 0 auto; }
.rp-commit-text { flex: 1 1 auto; font-size: 0.9rem; }
.rp-commit-text code { font-family: var(--ro-font-mono, ui-monospace, monospace); font-weight: 600; }
.rp-commit-arrow { opacity: 0.4; }
</style>
