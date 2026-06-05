<script setup>
// New fleet-shift campaign wizard. Five steps, modeled after stuc / Fleetshift:
//   1) type        — regex codemod / LLM-transformatie / file-creation
//   2) target repos — pick from store.repos, or a platform code-search query
//   3) definition   — regex+replacement / LLM-prompt / file to add
//   4) preview      — faked per-repo dry-run diffs in <nldd-code>
//   5) rollout      — on finish: store.createCampaign + store.runCampaign
// After finish we show a live rollout screen and a CliHint with the bg command.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';
import { usePresentation } from '../../presentation/usePresentation.js';

const store = usePlatformStore();

const TYPES = [
  { value: 'regex', label: 'Regex-codemod', icon: 'magnifier', desc: 'Zoek-en-vervang met een reguliere expressie over alle bestanden.' },
  { value: 'llm', label: 'LLM-transformatie', icon: 'sparkles', desc: 'Beschrijf de gewenste wijziging; de soevereine LLM-gateway stelt per repo een diff voor.' },
  { value: 'file-creation', label: 'Bestand toevoegen', icon: 'rectangle-stack', desc: 'Voeg in elke repo hetzelfde bestand toe (bijv. security.txt, LICENSE).' },
];

// Form state with sensible defaults so the wizard is filled from the start.
const form = reactive({
  type: 'regex',
  title: '',
  owner: store.currentPerson?.team || store.teams[0]?.id,
  // repo selection
  selectMode: 'pick', // 'pick' | 'search'
  repos: ['repo-paspoort', 'repo-toeslagen'],
  searchQuery: 'path:**/package.json nldd-design-system',
  // regex definition
  pattern: 'nldd-design-system@0\\.8\\.\\d+',
  replacement: 'nldd-design-system@0.9.0',
  glob: 'package.json',
  // llm definition
  prompt: 'Voeg in elke service een /healthz endpoint toe dat 200 OK teruggeeft, met een testcase. Houd de bestaande codestijl aan.',
  // file-creation definition
  filePath: '.well-known/security.txt',
  fileBody: 'Contact: mailto:security@rijksoverheid.nl\nExpires: 2027-01-01T00:00:00.000Z\nPreferred-Languages: nl, en\nPolicy: https://www.ncsc.nl/contact/kwetsbaarheid-melden',
});

function typeMeta(v) {
  return TYPES.find((t) => t.value === v) || TYPES[0];
}
function teamName(id) {
  return store.teamById(id)?.name || id;
}

// Repos matched by the code-search query: a deterministic subset so the demo
// feels real without a backend.
const searchMatches = computed(() =>
  store.repos.filter((r) => ['Vue', 'Rust', 'Python'].includes(r.lang)),
);

// The code-search can match a large slice of the fleet, so the preview list of
// matched repos is capped with a raise-the-cap control rather than dumped whole.
const searchLimit = ref(25);
const visibleSearchMatches = computed(() => searchMatches.value.slice(0, searchLimit.value));
const moreSearchCount = computed(() => Math.max(0, searchMatches.value.length - searchLimit.value));

// The effective repo list depends on the selection mode.
const targetRepos = computed(() => {
  const ids = form.selectMode === 'search'
    ? searchMatches.value.map((r) => r.id)
    : form.repos;
  return ids.map((id) => store.repoById(id)).filter(Boolean);
});

function toggleRepo(id) {
  const i = form.repos.indexOf(id);
  if (i === -1) form.repos.push(id);
  else form.repos.splice(i, 1);
}

// Filter for the manual repo list. A real fleet spans hundreds of repos, so the
// manual picker is search-driven rather than a full wall of rows. We cap the
// rendered set at an initial N and let the user raise the cap, so an empty
// filter never paints the whole fleet at once.
const repoFilter = ref('');
const repoLimit = ref(25);
const filteredRepos = computed(() => {
  const q = repoFilter.value.trim().toLowerCase();
  if (!q) return store.repos;
  return store.repos.filter(
    (r) => r.name.toLowerCase().includes(q) || (r.lang || '').toLowerCase().includes(q),
  );
});
const visibleRepos = computed(() => filteredRepos.value.slice(0, repoLimit.value));
const moreRepoCount = computed(() => Math.max(0, filteredRepos.value.length - repoLimit.value));

// Preview can fan out over the whole target set, and each repo renders a full
// code-viewer, so cap the rendered diffs the same way.
const previewLimit = ref(8);
const visiblePreview = computed(() => targetRepos.value.slice(0, previewLimit.value));
const morePreviewCount = computed(() => Math.max(0, targetRepos.value.length - previewLimit.value));

// --- Faked per-repo dry-run diffs for the preview step ---
function diffFor(repo) {
  if (form.type === 'regex') {
    return [
      `diff --git a/${form.glob} b/${form.glob}`,
      `--- a/${form.glob}`,
      `+++ b/${form.glob}`,
      '@@ -14,7 +14,7 @@',
      '   "dependencies": {',
      `-    "@nldd/design-system": "0.8.${(repo.stars % 9)}"`,
      '+    "@nldd/design-system": "0.9.0"',
      '   }',
    ].join('\n');
  }
  if (form.type === 'llm') {
    const fileGuess = repo.lang === 'Rust' ? 'src/health.rs' : repo.lang === 'Python' ? 'app/health.py' : 'src/health.ts';
    return [
      `diff --git a/${fileGuess} b/${fileGuess}`,
      'new file mode 100644',
      `+++ b/${fileGuess}`,
      '@@ -0,0 +1,6 @@',
      '+// Gegenereerd door fleet-shift (Overheids-LLM EU)',
      '+pub async fn healthz() -> impl Responder {',
      '+    HttpResponse::Ok().body("OK")',
      '+}',
    ].join('\n');
  }
  // file-creation
  return [
    `diff --git a/${form.filePath} b/${form.filePath}`,
    'new file mode 100644',
    `+++ b/${form.filePath}`,
    `@@ -0,0 +1,${form.fileBody.split('\n').length} @@`,
    ...form.fileBody.split('\n').map((l) => `+${l}`),
  ].join('\n');
}

// --- Rollout result state ---
const launched = ref(null); // created campaign (reactive store object)
const cliCommand = computed(() => {
  const t = form.type;
  const repoArgs = targetRepos.value.map((r) => r.name).join(' ');
  if (t === 'regex') {
    return `bg fleet campaign run --type regex \\\n  --title "${form.title || typeMeta(t).label}" \\\n  --match '${form.pattern}' --replace '${form.replacement}' --glob '${form.glob}' \\\n  --repos ${repoArgs}`;
  }
  if (t === 'llm') {
    return `bg fleet campaign run --type llm --model overheids-llm-eu \\\n  --title "${form.title || typeMeta(t).label}" \\\n  --prompt "${form.prompt.slice(0, 60)}…" \\\n  --repos ${repoArgs}`;
  }
  return `bg fleet campaign run --type file-creation \\\n  --title "${form.title || typeMeta(t).label}" \\\n  --add ${form.filePath} \\\n  --repos ${repoArgs}`;
});

function finish() {
  const camp = store.createCampaign({
    title: form.title || typeMeta(form.type).label,
    type: form.type,
    owner: form.owner,
    repos: targetRepos.value.map((r) => r.id),
  });
  store.runCampaign(camp.id);
  launched.value = camp;
}

const wizardSteps = [
  { title: 'Type' },
  { title: 'Doel-repos' },
  { title: 'Definitie' },
  { title: 'Preview' },
  { title: 'Uitrollen' },
];

// Presentation mode can auto-drive this wizard on stage.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
const presentation = usePresentation();
onMounted(() => presentation.registerWizard('campagne', { form, wizardRef: wizardApi, finish }));
onBeforeUnmount(() => presentation.unregisterWizard('campagne'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Nieuwe fleet-shift campagne"
      lede="Definieer één wijziging en rol die uit over de hele vloot. Bekijk eerst een dry-run met per-repo diffs voordat er PR's worden geopend."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Fleet-shift', href: '/fleet' },
        { text: 'Nieuwe campagne', href: '/fleet/nieuw' },
      ]"
    />

    <!-- Rollout result screen -->
    <div v-if="launched">
      <nldd-card :accessible-label="`Campagne ${launched.title}`">
        <nldd-container padding="24">
          <div class="rp-done-head">
            <div>
              <nldd-title size="4"><h2>{{ launched.title }}</h2></nldd-title>
              <nldd-rich-text>
                <p>{{ typeMeta(launched.type).label }} · {{ teamName(launched.owner) }} · {{ launched.repos.length }} repos</p>
              </nldd-rich-text>
            </div>
            <StatusBadge :status="launched.status" />
          </div>

          <nldd-spacer size="16" />
          <nldd-inline-dialog
            title="Campagne uitgerold"
            :supporting-text="`Er worden ${launched.repos.length} concept-PR's geopend. Volg de voortgang per repo op de campagnepagina.`"
          ></nldd-inline-dialog>

          <nldd-spacer size="20" />
          <nldd-button-group orientation="horizontal">
            <router-link :to="`/fleet/${launched.id}`">
              <nldd-button variant="primary" text="Naar campagne" end-icon="arrow-right"></nldd-button>
            </router-link>
            <router-link to="/fleet">
              <nldd-button variant="secondary" text="Alle campagnes" start-icon="folder-stack"></nldd-button>
            </router-link>
          </nldd-button-group>

          <CliHint :command="cliCommand" />
        </nldd-container>
      </nldd-card>
    </div>

    <!-- The wizard -->
    <Wizard v-else ref="wizardRef" :steps="wizardSteps" finish-label="Uitrollen" @finish="finish">
      <template #default="{ step }">
        <!-- Step 0: type -->
        <div v-if="step === 0">
          <nldd-title size="5"><h3>Wat voor wijziging?</h3></nldd-title>
          <nldd-spacer size="14" />
          <nldd-segmented-control>
            <button
              v-for="t in TYPES"
              :key="t.value"
              type="button"
              :aria-pressed="form.type === t.value"
              @click="form.type = t.value"
            >{{ t.label }}</button>
          </nldd-segmented-control>
          <nldd-spacer size="16" />
          <nldd-inline-dialog :title="typeMeta(form.type).label" :supporting-text="typeMeta(form.type).desc"></nldd-inline-dialog>

          <nldd-spacer size="20" />
          <nldd-container layout="grid" column-count="2" gap="16">
            <nldd-form-field label="Titel van de campagne">
              <nldd-text-field
                :value="form.title"
                placeholder="bijv. Bump NLDD naar 0.9"
                @input="(e) => (form.title = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-form-field label="Eigenaar-team">
              <nldd-dropdown>
                <select v-model="form.owner">
                  <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </nldd-container>
        </div>

        <!-- Step 1: target repos -->
        <div v-else-if="step === 1">
          <nldd-title size="5"><h3>Welke repos?</h3></nldd-title>
          <nldd-spacer size="14" />
          <nldd-segmented-control>
            <button type="button" :aria-pressed="form.selectMode === 'pick'" @click="form.selectMode = 'pick'">Handmatig kiezen</button>
            <button type="button" :aria-pressed="form.selectMode === 'search'" @click="form.selectMode = 'search'">Code-zoekopdracht</button>
          </nldd-segmented-control>
          <nldd-spacer size="16" />

          <!-- Manual pick -->
          <div v-if="form.selectMode === 'pick'">
            <nldd-search-field
              placeholder="Filter repos op naam of taal"
              accessible-label="Filter repos"
              :value="repoFilter"
              @input="(e) => (repoFilter = e.target.value)"
            ></nldd-search-field>
            <nldd-spacer size="12" />
            <div class="rp-repo-list">
            <button
              v-for="r in visibleRepos"
              :key="r.id"
              type="button"
              class="rp-repo-row"
              :class="{ 'rp-sel': form.repos.includes(r.id) }"
              @click="toggleRepo(r.id)"
            >
              <span class="rp-repo-check">
                <nldd-icon :name="form.repos.includes(r.id) ? 'check-mark' : 'plus'" aria-hidden="true"></nldd-icon>
              </span>
              <span class="rp-repo-name">{{ r.name }}</span>
              <nldd-tag color="neutral" size="md">{{ r.lang }}</nldd-tag>
              <nldd-tag :color="r.visibility === 'open' ? 'success' : 'neutral'" size="md">{{ r.visibility }}</nldd-tag>
              <span class="rp-repo-ci" :class="`rp-ci-${r.ci}`">CI {{ r.ci }}</span>
            </button>
            <p v-if="!filteredRepos.length" class="rp-repo-empty">Geen repos gevonden voor "{{ repoFilter }}".</p>
            </div>
            <nldd-spacer v-if="moreRepoCount > 0" size="12" />
            <nldd-button
              v-if="moreRepoCount > 0"
              variant="secondary"
              :text="`Toon meer (nog ${moreRepoCount})`"
              start-icon="chevron-down"
              @click="repoLimit += 25"
            ></nldd-button>
          </div>

          <!-- Platform code search (bg code search) -->
          <div v-else>
            <nldd-form-field label="Code-zoekopdracht (bg code search)">
              <nldd-text-field
                :value="form.searchQuery"
                @input="(e) => (form.searchQuery = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-spacer size="12" />
            <p class="rp-search-count">{{ searchMatches.length }} repos matchen <code>{{ form.searchQuery }}</code></p>
            <nldd-spacer size="8" />
            <div class="rp-repo-list">
              <div v-for="r in visibleSearchMatches" :key="r.id" class="rp-repo-row rp-static">
                <span class="rp-repo-check"><nldd-icon name="check-mark" aria-hidden="true"></nldd-icon></span>
                <span class="rp-repo-name">{{ r.name }}</span>
                <nldd-tag color="neutral" size="md">{{ r.lang }}</nldd-tag>
              </div>
            </div>
            <nldd-spacer v-if="moreSearchCount > 0" size="12" />
            <nldd-button
              v-if="moreSearchCount > 0"
              variant="secondary"
              :text="`Toon meer (nog ${moreSearchCount})`"
              start-icon="chevron-down"
              @click="searchLimit += 25"
            ></nldd-button>
          </div>

          <nldd-spacer size="14" />
          <p class="rp-target-count">
            <nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon>
            {{ targetRepos.length }} repos geselecteerd
          </p>
        </div>

        <!-- Step 2: definition -->
        <div v-else-if="step === 2">
          <nldd-title size="5"><h3>Definitie</h3></nldd-title>
          <nldd-spacer size="14" />

          <!-- regex -->
          <div v-if="form.type === 'regex'">
            <nldd-container layout="grid" column-count="2" gap="16">
              <nldd-form-field label="Patroon (regex)">
                <nldd-text-field :value="form.pattern" @input="(e) => (form.pattern = e.target.value)"></nldd-text-field>
              </nldd-form-field>
              <nldd-form-field label="Vervanging">
                <nldd-text-field :value="form.replacement" @input="(e) => (form.replacement = e.target.value)"></nldd-text-field>
              </nldd-form-field>
            </nldd-container>
            <nldd-spacer size="14" />
            <nldd-form-field label="Bestandsfilter (glob)">
              <nldd-text-field :value="form.glob" @input="(e) => (form.glob = e.target.value)"></nldd-text-field>
            </nldd-form-field>
          </div>

          <!-- llm -->
          <div v-else-if="form.type === 'llm'">
            <nldd-inline-dialog title="Model: Overheids-LLM EU" supporting-text="EU-residency, tot Intern geclassificeerd. De gateway stelt per repo een diff voor; jij bekijkt en mergt."></nldd-inline-dialog>
            <nldd-spacer size="14" />
            <nldd-form-field label="Prompt voor de transformatie">
              <textarea
                class="rp-textarea"
                :value="form.prompt"
                rows="6"
                @input="(e) => (form.prompt = e.target.value)"
              ></textarea>
            </nldd-form-field>
          </div>

          <!-- file-creation -->
          <div v-else>
            <nldd-form-field label="Pad van het toe te voegen bestand">
              <nldd-text-field :value="form.filePath" @input="(e) => (form.filePath = e.target.value)"></nldd-text-field>
            </nldd-form-field>
            <nldd-spacer size="14" />
            <nldd-form-field label="Inhoud">
              <textarea
                class="rp-textarea rp-mono"
                :value="form.fileBody"
                rows="6"
                @input="(e) => (form.fileBody = e.target.value)"
              ></textarea>
            </nldd-form-field>
          </div>
        </div>

        <!-- Step 3: preview / dry-run -->
        <div v-else-if="step === 3">
          <nldd-title size="5"><h3>Dry-run preview</h3></nldd-title>
          <nldd-spacer size="6" />
          <nldd-rich-text>
            <p>Voorgestelde diff per repo. Er worden nog geen PR's geopend.</p>
          </nldd-rich-text>
          <nldd-spacer size="16" />
          <div class="rp-preview-stack">
            <div v-for="r in visiblePreview" :key="r.id" class="rp-preview-item">
              <div class="rp-preview-head">
                <nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon>
                <span class="rp-repo-name">{{ r.name }}</span>
                <nldd-tag color="accent" size="md">1 bestand</nldd-tag>
              </div>
              <nldd-code-viewer>{{ diffFor(r) }}</nldd-code-viewer>
            </div>
          </div>
          <nldd-spacer v-if="morePreviewCount > 0" size="14" />
          <nldd-button
            v-if="morePreviewCount > 0"
            variant="secondary"
            :text="`Toon meer diffs (nog ${morePreviewCount})`"
            start-icon="chevron-down"
            @click="previewLimit += 8"
          ></nldd-button>
        </div>

        <!-- Step 4: rollout summary -->
        <div v-else-if="step === 4">
          <nldd-title size="5"><h3>Klaar om uit te rollen</h3></nldd-title>
          <nldd-spacer size="16" />
          <dl class="rp-summary">
            <div><dt>Type</dt><dd>{{ typeMeta(form.type).label }}</dd></div>
            <div><dt>Titel</dt><dd>{{ form.title || typeMeta(form.type).label }}</dd></div>
            <div><dt>Eigenaar</dt><dd>{{ teamName(form.owner) }}</dd></div>
            <div><dt>Repos</dt><dd>{{ targetRepos.length }} ({{ targetRepos.map((r) => r.name).join(', ') }})</dd></div>
            <div v-if="form.type === 'regex'"><dt>Codemod</dt><dd class="rp-mono">s/{{ form.pattern }}/{{ form.replacement }}/ in {{ form.glob }}</dd></div>
            <div v-else-if="form.type === 'llm'"><dt>Model</dt><dd>Overheids-LLM EU</dd></div>
            <div v-else><dt>Bestand</dt><dd class="rp-mono">{{ form.filePath }}</dd></div>
          </dl>
          <nldd-spacer size="16" />
          <nldd-inline-dialog
            title="Wat er gebeurt bij uitrollen"
            supporting-text="Er wordt per repo een concept-PR geopend met de getoonde diff. CI draait; jij beoordeelt en mergt. De campagne start in status actief."
          ></nldd-inline-dialog>
        </div>
      </template>
    </Wizard>
  </div>
</template>

<style scoped>
.rp-repo-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rp-repo-row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-radius: 10px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
.rp-repo-row.rp-static { cursor: default; }
.rp-repo-row:not(.rp-static):hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-repo-row.rp-sel {
  border-color: var(--semantics-actions-primary-default-background-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-repo-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1.5px solid var(--semantics-dividers-color);
  flex-shrink: 0;
}
.rp-repo-row.rp-sel .rp-repo-check,
.rp-repo-row.rp-static .rp-repo-check {
  background: var(--semantics-feedback-success-icon-color);
  border-color: var(--semantics-feedback-success-icon-color);
  color: white;
}
.rp-repo-check nldd-icon { width: 0.9rem; height: 0.9rem; }
.rp-repo-name {
  font-weight: 600;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9rem;
}
.rp-repo-ci {
  margin-left: auto;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
}
.rp-ci-green { color: var(--semantics-feedback-success-icon-color); }
.rp-ci-red { color: var(--semantics-feedback-critical-icon-color); }
.rp-search-count {
  font-size: 0.88rem;
  opacity: 0.85;
}
.rp-search-count code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-target-count {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-target-count nldd-icon { width: 1rem; height: 1rem; }
.rp-textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.85rem;
  border-radius: 8px;
  border: 1.5px solid var(--semantics-dividers-color);
  font: inherit;
  resize: vertical;
  background: var(--semantics-surfaces-background-color);
  color: inherit;
}
.rp-textarea.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
}
.rp-preview-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-preview-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.rp-preview-head nldd-icon { width: 1rem; height: 1rem; }
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
.rp-summary dt { font-weight: 600; opacity: 0.7; }
.rp-summary dd { margin: 0; }
.rp-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.rp-done-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
</style>
