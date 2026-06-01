<script setup>
// Promotion wizard: walk an app's release from one environment to the next.
// Step 1 picks the from/to environments (defaults to the first stage where the
// version actually differs). Step 2 runs the release gates as checks (tests
// green, security green, and a change approval when the target is prod). Step 3
// plays a faked deploy pipeline (build -> test -> scan -> deploy) and, on
// finish, calls store.promote() so the matrix and release history update live.
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';
import Wizard from '../../components/shared/Wizard.vue';
import { usePresentation } from '../../presentation/usePresentation.js';
import { controlledDelay } from '../../presentation/drive.js';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const ENVS = ['dev', 'test', 'acc', 'prod'];
const ENV_LABEL = { dev: 'Dev', test: 'Test', acc: 'Acceptatie', prod: 'Productie' };

const appId = computed(() => route.params.app);
const app = computed(() => store.appById(appId.value));
const team = computed(() => (app.value ? store.teamById(app.value.team) : null));
const repo = computed(() => (app.value ? store.repoById(app.value.repo) : null));
const deployment = computed(() => store.deployments.find((d) => d.app === appId.value));

const steps = [
  { title: 'Omgevingen' },
  { title: 'Gates' },
  { title: 'Deploy' },
];

// Default to the first hop where the version differs, so the obvious promotion
// is pre-selected. Fall back to test -> acc.
function firstDrift() {
  const d = deployment.value;
  if (!d) return { from: 'test', to: 'acc' };
  for (let i = 0; i < ENVS.length - 1; i++) {
    if (d[ENVS[i]] !== d[ENVS[i + 1]]) return { from: ENVS[i], to: ENVS[i + 1] };
  }
  return { from: 'acc', to: 'prod' };
}

const drift = firstDrift();
const fromEnv = ref(drift.from);
const toEnv = ref(drift.to);

// "to" is always one step right of "from". Keep them coupled.
watch(fromEnv, (v) => {
  const idx = ENVS.indexOf(v);
  toEnv.value = ENVS[Math.min(idx + 1, ENVS.length - 1)];
});

const fromVersion = computed(() => (deployment.value ? deployment.value[fromEnv.value] : '—'));
const toVersion = computed(() => (deployment.value ? deployment.value[toEnv.value] : '—'));
const targetIsProd = computed(() => toEnv.value === 'prod');

// --- Gates -------------------------------------------------------------
// These read from the real store data so the checks feel grounded: CI status
// from the repo, an open critical CVE blocks security, and a matching approved
// change is required when promoting to prod.
const ciGreen = computed(() => repo.value?.ci === 'green');
const openCritical = computed(() =>
  store.vulnerabilities.some(
    (v) => v.app === appId.value && v.status !== 'opgelost' && (v.severity === 'critical' || v.severity === 'high')
  )
);
const approvedChange = computed(() =>
  store.changes.some((c) => c.team === app.value?.team && c.status === 'goedgekeurd')
);

const gates = computed(() => {
  const list = [
    {
      id: 'tests',
      label: 'Tests groen',
      detail: repo.value ? `CI van ${repo.value.name}` : 'Geen repo gekoppeld',
      pass: ciGreen.value,
    },
    {
      id: 'security',
      label: 'Security groen',
      detail: openCritical.value ? 'Open kritieke kwetsbaarheid gevonden' : 'Geen open kritieke kwetsbaarheden',
      pass: !openCritical.value,
    },
  ];
  if (targetIsProd.value) {
    list.push({
      id: 'change',
      label: 'Wijziging goedgekeurd (change)',
      detail: approvedChange.value ? 'Goedgekeurde change aanwezig' : 'Geen goedgekeurde change voor dit team',
      pass: approvedChange.value,
    });
  }
  return list;
});

// User must explicitly acknowledge each gate (or override a soft fail) before
// continuing. For the demo we let them tick the box even on a red gate, but we
// surface the risk clearly.
const acknowledged = ref({});
const allAcknowledged = computed(() => gates.value.every((g) => acknowledged.value[g.id]));
const anyFailing = computed(() => gates.value.some((g) => !g.pass));

// --- Deploy pipeline ---------------------------------------------------
const PIPELINE = [
  { id: 'build', label: 'Build', icon: 'terminal' },
  { id: 'test', label: 'Test', icon: 'check-mark-circle' },
  { id: 'scan', label: 'Security scan', icon: 'shield-check-mark' },
  { id: 'deploy', label: 'Deploy', icon: 'cloud' },
];
const pipelineStatus = ref({});
const deploying = ref(false);
const done = ref(false);

// Deterministic id suffix for a recorded release (no clock API in this path).
let _releaseSeq = 0;
function releaseSeq() {
  _releaseSeq += 1;
  return `${appId.value}-${toEnv.value}-${_releaseSeq}`;
}

function resetPipeline() {
  pipelineStatus.value = {};
  done.value = false;
}

// `maybeControl` is a drive control token when auto-driven in presentation mode,
// or a MouseEvent when triggered by the button. Only treat it as a control when
// it carries the expected shape, so the pipeline is pause/abort-aware on stage.
async function runDeploy(maybeControl) {
  if (deploying.value || done.value) return;
  const control =
    maybeControl && typeof maybeControl.isPaused === 'function'
      ? maybeControl
      : { aborted: false, isPaused: () => false };
  deploying.value = true;
  resetPipeline();
  for (const stage of PIPELINE) {
    if (control.aborted) { deploying.value = false; return; }
    pipelineStatus.value = { ...pipelineStatus.value, [stage.id]: 'running' };
    // eslint-disable-next-line no-await-in-loop
    await controlledDelay(850, control);
    if (control.aborted) { deploying.value = false; return; }
    pipelineStatus.value = { ...pipelineStatus.value, [stage.id]: 'ready' };
  }
  // Commit the promotion to the store and record a release line.
  store.promote(appId.value, fromEnv.value, toEnv.value);
  store.releases.unshift({
    id: `rel-${releaseSeq()}`,
    app: appId.value,
    version: fromVersion.value,
    env: toEnv.value,
    by: store.currentUser,
    when: 'zojuist',
    notes: `Gepromoot van ${ENV_LABEL[fromEnv.value]} naar ${ENV_LABEL[toEnv.value]}`,
  });
  deploying.value = false;
  done.value = true;
}

const cliCommand = computed(
  () => `rp app promote ${appId.value} --from ${fromEnv.value} --to ${toEnv.value}`
);

const relationLinks = computed(() => {
  const out = [];
  if (app.value) out.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (repo.value) out.push({ text: repo.value.name, to: `/code/${repo.value.id}`, icon: 'folder-stack' });
  if (team.value) out.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  out.push({ text: 'Release-historie', to: '/environments/releases', icon: 'clock' });
  return out;
});

function pipelineLabel(id) {
  const s = pipelineStatus.value[id];
  if (s === 'running') return 'bezig';
  if (s === 'ready') return 'klaar';
  return 'wacht';
}

// Presentation mode can auto-drive this wizard on stage. It has no single form,
// so we expose the helpers a drive script needs: acknowledge every gate and run
// the deploy pipeline. A minimal form object is provided for the driver guard.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
function ackAll() {
  const next = { ...acknowledged.value };
  gates.value.forEach((g) => { next[g.id] = true; });
  acknowledged.value = next;
}
const presentation = usePresentation();
onMounted(() =>
  presentation.registerWizard('promotie', {
    form: {},
    wizardRef: wizardApi,
    finish: () => router.push('/environments'),
    ackAll,
    runDeploy,
  }),
);
onBeforeUnmount(() => presentation.unregisterWizard('promotie'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      :title="app ? `Promoten: ${app.name}` : 'Promoten'"
      lede="Schuif een release een stap op door de omgevingsketen. De gates bewaken kwaliteit en governance."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Omgevingen', href: '/environments' },
        { text: app ? app.name : 'Promoten', href: route.fullPath },
      ]"
    >
      <template #actions>
        <router-link to="/environments">
          <nldd-button variant="secondary" text="Terug naar matrix" start-icon="arrow-up-arrow-down"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-inline-dialog
      v-if="!app"
      title="Onbekende applicatie"
      supporting-text="Voor deze applicatie is geen deploy-pijplijn gevonden."
    ></nldd-inline-dialog>

    <div v-else class="rp-promote-grid">
      <div>
        <Wizard ref="wizardRef" :steps="steps" finish-label="Sluiten" @finish="router.push('/environments')">
          <template #default="{ step, go }">
            <!-- STEP 1: choose environments -->
            <div v-if="step === 0">
              <nldd-title size="5"><h3>Welke stap promoot je?</h3></nldd-title>
              <nldd-spacer size="12" />
              <nldd-form-field label="Van omgeving">
                <nldd-dropdown>
                  <select :value="fromEnv" @change="(e) => (fromEnv = e.target.value)">
                    <option v-for="env in ENVS.slice(0, 3)" :key="env" :value="env">
                      {{ ENV_LABEL[env] }} ({{ deployment[env] }})
                    </option>
                  </select>
                </nldd-dropdown>
              </nldd-form-field>
              <nldd-spacer size="16" />

              <div class="rp-hop">
                <div class="rp-hop-node">
                  <span class="rp-hop-env">{{ ENV_LABEL[fromEnv] }}</span>
                  <span class="rp-hop-ver">{{ fromVersion }}</span>
                </div>
                <nldd-icon name="arrow-right" aria-hidden="true" class="rp-hop-arrow"></nldd-icon>
                <div class="rp-hop-node rp-hop-target">
                  <span class="rp-hop-env">{{ ENV_LABEL[toEnv] }}</span>
                  <span class="rp-hop-ver rp-hop-ver-old">nu {{ toVersion }}</span>
                  <span class="rp-hop-ver">wordt {{ fromVersion }}</span>
                </div>
              </div>

              <nldd-spacer size="16" />
              <nldd-inline-dialog
                v-if="targetIsProd"
                title="Doel is productie"
                supporting-text="Een promotie naar productie vereist een goedgekeurde wijziging (change)."
              ></nldd-inline-dialog>
              <nldd-inline-dialog
                v-else-if="fromVersion === toVersion"
                title="Geen verschil"
                supporting-text="Deze omgevingen draaien al dezelfde versie. Promoten heeft geen effect."
              ></nldd-inline-dialog>
            </div>

            <!-- STEP 2: gates -->
            <div v-else-if="step === 1">
              <nldd-title size="5"><h3>Gates</h3></nldd-title>
              <nldd-spacer size="4" />
              <nldd-rich-text>
                <p>Bevestig elke gate voordat je deployt. Een rode gate kun je met motivatie overrulen, maar dat wordt vastgelegd in het auditlog.</p>
              </nldd-rich-text>
              <nldd-spacer size="16" />

              <ul class="rp-gates">
                <li v-for="g in gates" :key="g.id" class="rp-gate" :class="{ 'rp-gate-fail': !g.pass }">
                  <nldd-icon
                    :name="g.pass ? 'check-mark-circle' : 'exclamation-triangle'"
                    aria-hidden="true"
                    class="rp-gate-icon"
                    :class="g.pass ? 'rp-ok' : 'rp-bad'"
                  ></nldd-icon>
                  <div class="rp-gate-body">
                    <div class="rp-gate-label">
                      {{ g.label }}
                      <StatusBadge :status="g.pass ? 'ok' : 'warn'" size="sm" />
                    </div>
                    <div class="rp-gate-detail">{{ g.detail }}</div>
                  </div>
                  <nldd-checkbox
                    :checked="acknowledged[g.id] || undefined"
                    @change="(e) => (acknowledged = { ...acknowledged, [g.id]: e.target.checked })"
                  >{{ g.pass ? 'Bevestigd' : 'Overrulen' }}</nldd-checkbox>
                </li>
              </ul>

              <nldd-spacer size="12" />
              <nldd-inline-dialog
                v-if="anyFailing"
                title="Let op: rode gate"
                supporting-text="Eén of meer gates falen. Promoten kan, maar verhoogt het risico."
              ></nldd-inline-dialog>
              <nldd-inline-dialog
                v-else
                title="Alle gates groen"
                supporting-text="Deze promotie voldoet aan alle kwaliteits- en governance-eisen."
              ></nldd-inline-dialog>
            </div>

            <!-- STEP 3: deploy pipeline -->
            <div v-else>
              <nldd-title size="5"><h3>Deploy-pijplijn</h3></nldd-title>
              <nldd-spacer size="4" />
              <nldd-rich-text>
                <p>{{ done ? 'De promotie is voltooid.' : 'Start de pijplijn om de release te promoten.' }}</p>
              </nldd-rich-text>
              <nldd-spacer size="16" />

              <div class="rp-pipeline">
                <template v-for="(stage, i) in PIPELINE" :key="stage.id">
                  <div class="rp-pipe-stage" :class="`rp-pipe-${pipelineStatus[stage.id] || 'idle'}`">
                    <nldd-icon
                      :name="pipelineStatus[stage.id] === 'ready' ? 'check-mark' : stage.icon"
                      aria-hidden="true"
                    ></nldd-icon>
                    <span class="rp-pipe-label">{{ stage.label }}</span>
                    <StatusBadge
                      :status="pipelineStatus[stage.id] === 'running' ? 'provisioning' : pipelineStatus[stage.id] === 'ready' ? 'ready' : 'requested'"
                      size="sm"
                    />
                  </div>
                  <div v-if="i < PIPELINE.length - 1" class="rp-pipe-conn" :class="{ 'rp-pipe-conn-done': pipelineStatus[stage.id] === 'ready' }"></div>
                </template>
              </div>

              <nldd-spacer size="16" />
              <nldd-button
                v-if="!done"
                variant="primary"
                :text="deploying ? 'Bezig met deployen…' : `Deploy ${fromVersion} naar ${ENV_LABEL[toEnv]}`"
                start-icon="cloud"
                :disabled="deploying || undefined"
                @click="runDeploy"
              ></nldd-button>

              <div v-if="done">
                <nldd-inline-dialog
                  title="Gepromoot"
                  :supporting-text="`${app.name} ${fromVersion} draait nu in ${ENV_LABEL[toEnv]}.`"
                ></nldd-inline-dialog>
                <CliHint :command="cliCommand" />
              </div>
            </div>
          </template>
        </Wizard>
      </div>

      <aside class="rp-aside">
        <nldd-card>
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Samenvatting</h3></nldd-title>
            <nldd-spacer size="12" />
            <dl class="rp-summary">
              <dt>Applicatie</dt>
              <dd>{{ app.name }}</dd>
              <dt>Team</dt>
              <dd>{{ team ? team.name : '—' }}</dd>
              <dt>Van</dt>
              <dd>{{ ENV_LABEL[fromEnv] }} · <span class="rp-mono">{{ fromVersion }}</span></dd>
              <dt>Naar</dt>
              <dd>{{ ENV_LABEL[toEnv] }} · <span class="rp-mono">{{ toVersion }}</span></dd>
              <dt>Gezondheid</dt>
              <dd><StatusBadge :status="app.health" size="sm" /></dd>
            </dl>
          </nldd-container>
        </nldd-card>
        <nldd-spacer size="16" />
        <RelationLinks title="Doorklikken" :links="relationLinks" />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.rp-promote-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-promote-grid {
    grid-template-columns: 1fr;
  }
}
.rp-hop {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-hop-node {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.85rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  min-width: 130px;
}
.rp-hop-target {
  background: var(--semantics-surfaces-tinted-background-color);
  box-shadow: inset 0 0 0 2px var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-hop-env {
  font-weight: 700;
}
.rp-hop-ver {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.85rem;
}
.rp-hop-ver-old {
  opacity: 0.55;
  text-decoration: line-through;
}
.rp-hop-arrow {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.5;
}
.rp-gates {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.rp-gate {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.75rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
}
.rp-gate-fail {
  border-color: var(--semantics-feedback-warning-border-color, #d98a00);
  background: rgba(217, 138, 0, 0.06);
}
.rp-gate-icon {
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
}
.rp-ok { color: #1a7a3e; }
.rp-bad { color: #d98a00; }
.rp-gate-body {
  flex: 1;
  min-width: 0;
}
.rp-gate-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}
.rp-gate-detail {
  font-size: 0.83rem;
  opacity: 0.7;
}
.rp-pipeline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.rp-pipe-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.8rem 0.6rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  min-width: 110px;
}
.rp-pipe-stage nldd-icon {
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.7;
}
.rp-pipe-label {
  font-weight: 600;
  font-size: 0.85rem;
}
.rp-pipe-running {
  background: rgba(217, 138, 0, 0.08);
  border-color: #d98a00;
}
.rp-pipe-ready {
  background: rgba(26, 122, 62, 0.08);
  border-color: #1a7a3e;
}
.rp-pipe-ready nldd-icon {
  color: #1a7a3e;
  opacity: 1;
}
.rp-pipe-conn {
  width: 28px;
  height: 2px;
  background: var(--semantics-dividers-color);
  align-self: center;
}
.rp-pipe-conn-done {
  background: #1a7a3e;
}
.rp-summary {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem 0.8rem;
  margin: 0;
}
.rp-summary dt {
  opacity: 0.6;
  font-size: 0.85rem;
}
.rp-summary dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}
.rp-mono {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-weight: 400;
}
</style>
