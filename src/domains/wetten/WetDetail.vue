<script setup>
// The RegelRecht editor for one law. Five tabs walk from the legal text, via
// the machine-readable model (where the law-reads-from-register coupling is
// clickable), through the BDD scenarios and an engine preview, to the raw YAML.
// "Wijziging starten" opens a traject and re-runs the scenarios with one
// failing case so the impact of a change is immediately visible.
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const wet = computed(() => store.wetById(route.params.id));
const firstArticle = computed(() => wet.value?.articles?.[0] || null);
const service = computed(() => (wet.value ? store.appForWet(wet.value.id) : null));
const scenarios = computed(() => (wet.value ? store.scenariosByWet(wet.value.id) : []));
const traject = computed(() => (wet.value?.traject ? store.trajectById(wet.value.traject) : null));

const tab = ref('tekst');
const coveragePct = computed(() => Math.round((wet.value?.coverage || 0) * 100));

function layerLabel(layer) {
  return layer === 'MINISTERIELE_REGELING' ? 'Ministeriële regeling' : 'Wet';
}

// --- Sidebar relations ---
const registerLinks = computed(() =>
  !wet.value
    ? []
    : store.registersForWet(wet.value.id).map((r) => ({
        text: r.name,
        to: `/registers/${r.id}`,
        icon: 'cylinder-split',
      })),
);
const serviceLinks = computed(() =>
  service.value ? [{ text: service.value.name, to: `/apps/${service.value.id}`, icon: 'rectangle-stack' }] : [],
);

// Resolve an input's source to a clickable chip (register or another wet).
function sourceChip(source) {
  if (!source) return null;
  if (source.kind === 'register') {
    const reg = store.registerById(source.id);
    return { label: reg?.name || source.id, to: `/registers/${source.id}`, kind: 'register', output: source.output };
  }
  const w = store.wetById(source.id);
  return { label: w?.name || source.id, to: `/wetten/${source.id}`, kind: 'wet', output: source.output };
}

// --- Synthesised legal-text paragraph from the machine-readable model ---
function articleProse(art) {
  if (!art) return '';
  const outs = (art.outputs || []).map((o) => o.name).join(' en ');
  const defs = (art.definitions || []).map((d) => `${d.name} (${d.value})`).join(', ');
  const parts = [];
  if (art.legalCharacter)
    parts.push(`Dit artikel heeft het karakter van een ${art.legalCharacter.toLowerCase()}${art.decisionType ? ` (${art.decisionType.toLowerCase()})` : ''}.`);
  if (outs) parts.push(`Op grond van dit artikel wordt ${outs} vastgesteld.`);
  if (defs) parts.push(`Daarbij gelden de volgende begrippen: ${defs}.`);
  if (!parts.length) parts.push('Voor dit artikel is nog geen uitvoerbare logica vastgelegd. Het is geharvest uit BWB en wacht op vertaling.');
  return parts.join(' ');
}

// --- Engine preview (deterministic) ---
const exec = reactive({ bsn: '999993653', rekendatum: '2025-01-01' });
const execResult = ref(null);

function runEngine() {
  if (!wet.value) return;
  const art = firstArticle.value;
  const isZorgtoeslag = wet.value.id === 'zorgtoeslagwet';
  let outputs;
  if (isZorgtoeslag) {
    outputs = [
      { name: 'heeft_recht_op_zorgtoeslag', value: 'ja' },
      { name: 'hoogte_zorgtoeslag', value: '€ 2.096,92' },
    ];
  } else {
    outputs = (art?.outputs || []).map((o) => ({
      name: o.name,
      value: o.type === 'boolean' ? 'waar' : o.type === 'bedrag' ? '€ 0,00' : 'berekend',
    }));
    if (!outputs.length) outputs = [{ name: 'resultaat', value: 'geen uitvoerbare logica' }];
  }
  const trace = [];
  for (const inp of art?.inputs || []) {
    const chip = sourceChip(inp.source);
    let sample = inp.type === 'boolean' ? 'waar' : inp.type === 'bedrag' ? '€ 25.000' : 'opgehaald';
    if (inp.name === 'heeft_toeslagpartner') sample = 'onwaar';
    if (inp.name === 'standaardpremie') sample = '€ 2.112';
    trace.push(`${inp.name} ← ${chip?.label || inp.source?.id}: ${sample}`);
  }
  trace.push(`artikel ${art?.number || '1'} toegepast op rekendatum ${exec.rekendatum}`);
  execResult.value = { outputs, trace, bsn: exec.bsn };
}

// --- YAML rendering of the machine-readable model ---
const yaml = computed(() => {
  const w = wet.value;
  const art = firstArticle.value;
  if (!w || !art) return '# geen artikel beschikbaar';
  const lines = [];
  lines.push(`wet: ${w.id}`);
  lines.push(`naam: "${w.name}"`);
  lines.push(`bwb: ${w.bwbId}`);
  lines.push(`geldig_vanaf: ${w.validFrom}`);
  lines.push(`artikel:`);
  lines.push(`  nummer: "${art.number}"`);
  lines.push(`  titel: "${art.title}"`);
  if (art.legalCharacter) lines.push(`  rechtskarakter: ${art.legalCharacter}`);
  if (art.decisionType) lines.push(`  beslissoort: ${art.decisionType}`);
  if (art.definitions?.length) {
    lines.push(`  definities:`);
    for (const d of art.definitions) lines.push(`    ${d.name}: "${d.value}"`);
  }
  lines.push(`  uitvoering:`);
  if (art.parameters?.length) {
    lines.push(`    parameters:`);
    for (const p of art.parameters) lines.push(`      - naam: ${p.name}\n        type: ${p.type}\n        verplicht: ${p.required ? 'true' : 'false'}`);
  }
  if (art.inputs?.length) {
    lines.push(`    invoer:`);
    for (const inp of art.inputs) {
      lines.push(`      - naam: ${inp.name}`);
      lines.push(`        type: ${inp.type}`);
      if (inp.source) {
        lines.push(`        bron:`);
        lines.push(`          soort: ${inp.source.kind}`);
        lines.push(`          id: ${inp.source.id}`);
        lines.push(`          veld: ${inp.source.output}`);
      }
    }
  }
  if (art.outputs?.length) {
    lines.push(`    uitvoer:`);
    for (const o of art.outputs) lines.push(`      - naam: ${o.name}\n        type: ${o.type}`);
  }
  if (art.openTerms?.length) {
    lines.push(`  open_normen:`);
    for (const t of art.openTerms) lines.push(`    - ${t.id} (gedelegeerd aan ${t.delegatedTo}, ${t.delegationType})`);
  }
  return lines.join('\n');
});

// --- Wijziging starten ---
const showChange = ref(false);
const changeDone = ref(false);

function confirmChange() {
  if (!wet.value) return;
  store.createTraject({
    name: `Wijziging ${wet.value.name}`,
    wet: wet.value.id,
    members: [store.currentUser],
    team: wet.value.owner,
  });
  // Re-run scenarios with one deliberately failing so the impact is visible.
  store.runScenarios(wet.value.id, { failOne: true });
  changeDone.value = true;
  showChange.value = false;
  tab.value = 'scenarios';
}

function runScenarios() {
  if (wet.value) store.runScenarios(wet.value.id);
}
</script>

<template>
  <div v-if="wet" class="rp-page">
    <PageHeader
      :title="wet.name"
      :lede="`${layerLabel(wet.layer)} · ${wet.bwbId} · geldig vanaf ${wet.validFrom}. Machine-leesbare uitvoering volgens RegelRecht.`"
      :crumbs="[
        { text: 'Wetten', href: '/wetten' },
        { text: wet.name, href: `/wetten/${wet.id}` },
      ]"
    >
      <template #actions>
        <router-link v-if="service" :to="`/apps/${service.id}`">
          <nldd-button variant="secondary" text="Naar dienst" start-icon="rectangle-stack"></nldd-button>
        </router-link>
        <nldd-button variant="primary" text="Wijziging starten" start-icon="pencil" @click="showChange = true"></nldd-button>
        <a :href="wet.url" rel="noopener external">
          <nldd-button variant="secondary" text="Op wetten.overheid.nl" end-icon="external-link"></nldd-button>
        </a>
      </template>
    </PageHeader>

    <!-- Change notice -->
    <template v-if="changeDone">
      <nldd-inline-dialog
        title="Wijzigingstraject geopend"
        supporting-text="Er is een traject aangemaakt en de scenario's zijn opnieuw gedraaid. Eén scenario zakt: zie het tabblad Scenario's voor de impact van deze wijziging."
      ></nldd-inline-dialog>
      <nldd-spacer size="16" />
    </template>

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- Main -->
      <div class="rp-span2">
        <nldd-tab-bar accessible-label="Wetonderdelen">
          <nldd-tab-bar-item text="Tekst" :selected="tab === 'tekst'" @select="tab = 'tekst'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="Machine-leesbaar" :selected="tab === 'machine'" @select="tab = 'machine'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="Scenario's" :selected="tab === 'scenarios'" @select="tab = 'scenarios'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="Uitvoeren" :selected="tab === 'uitvoeren'" @select="tab = 'uitvoeren'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="YAML" :selected="tab === 'yaml'" @select="tab = 'yaml'"></nldd-tab-bar-item>
        </nldd-tab-bar>

        <nldd-spacer size="20" />

        <!-- Tekst -->
        <div v-if="tab === 'tekst'">
          <div v-for="art in wet.articles" :key="art.number" class="rp-article">
            <div class="rp-article-head">
              <nldd-title size="4"><h2>Artikel {{ art.number }}. {{ art.title }}</h2></nldd-title>
              <div class="rp-article-tags">
                <nldd-tag v-if="art.legalCharacter" color="accent" size="md">{{ art.legalCharacter }}</nldd-tag>
                <nldd-tag v-if="art.decisionType" color="neutral" size="md">{{ art.decisionType }}</nldd-tag>
              </div>
            </div>
            <nldd-spacer size="8" />
            <nldd-rich-text><p>{{ articleProse(art) }}</p></nldd-rich-text>
            <nldd-spacer size="16" />
          </div>
        </div>

        <!-- Machine-leesbaar -->
        <div v-else-if="tab === 'machine'">
          <template v-if="firstArticle">
            <nldd-rich-text>
              <p>De uitvoerbare vertaling van artikel {{ firstArticle.number }}. Elke invoer leest rechtstreeks uit een gezaghebbende bron: klik door naar het register of de wet die de waarde levert.</p>
            </nldd-rich-text>
            <nldd-spacer size="16" />

            <template v-if="firstArticle.definitions.length">
              <nldd-title size="5"><h3>Definities</h3></nldd-title>
              <nldd-spacer size="8" />
              <div class="rp-def-grid">
                <div v-for="d in firstArticle.definitions" :key="d.name" class="rp-def">
                  <span class="rp-mono">{{ d.name }}</span>
                  <span class="rp-def-val">{{ d.value }}</span>
                </div>
              </div>
              <nldd-spacer size="20" />
            </template>

            <template v-if="firstArticle.parameters.length">
              <nldd-title size="5"><h3>Parameters</h3></nldd-title>
              <nldd-spacer size="8" />
              <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
                <nldd-tag v-for="p in firstArticle.parameters" :key="p.name" color="neutral" size="md">
                  {{ p.name }}: {{ p.type }}{{ p.required ? ' *' : '' }}
                </nldd-tag>
              </nldd-container>
              <nldd-spacer size="20" />
            </template>

            <nldd-title size="5"><h3>Invoer uit bronnen</h3></nldd-title>
            <nldd-spacer size="8" />
            <div v-if="firstArticle.inputs.length" class="rp-io-list">
              <div v-for="inp in firstArticle.inputs" :key="inp.name" class="rp-io-row">
                <span class="rp-io-name rp-mono">{{ inp.name }}</span>
                <nldd-tag color="neutral" size="md">{{ inp.type }}</nldd-tag>
                <nldd-icon name="arrow-right" aria-hidden="true" class="rp-io-arrow"></nldd-icon>
                <router-link
                  v-if="sourceChip(inp.source)"
                  :to="sourceChip(inp.source).to"
                  class="rp-source-chip"
                  :class="sourceChip(inp.source).kind === 'register' ? 'rp-source-register' : 'rp-source-wet'"
                >
                  <nldd-icon :name="sourceChip(inp.source).kind === 'register' ? 'cylinder-split' : 'file-text'" aria-hidden="true"></nldd-icon>
                  <span>{{ sourceChip(inp.source).label }}</span>
                  <span class="rp-source-output rp-mono">.{{ sourceChip(inp.source).output }}</span>
                </router-link>
              </div>
            </div>
            <nldd-rich-text v-else><p class="rp-muted">Nog geen invoer gedefinieerd.</p></nldd-rich-text>
            <nldd-spacer size="20" />

            <nldd-title size="5"><h3>Uitvoer</h3></nldd-title>
            <nldd-spacer size="8" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag v-for="o in firstArticle.outputs" :key="o.name" color="success" size="md">
                {{ o.name }}: {{ o.type }}
              </nldd-tag>
              <span v-if="!firstArticle.outputs.length" class="rp-muted">Nog geen uitvoer gedefinieerd.</span>
            </nldd-container>

            <template v-if="firstArticle.openTerms.length">
              <nldd-spacer size="20" />
              <nldd-title size="5"><h3>Open normen</h3></nldd-title>
              <nldd-spacer size="8" />
              <div class="rp-io-list">
                <div v-for="t in firstArticle.openTerms" :key="t.id" class="rp-io-row">
                  <span class="rp-io-name rp-mono">{{ t.id }}</span>
                  <nldd-icon name="arrow-right" aria-hidden="true" class="rp-io-arrow"></nldd-icon>
                  <nldd-tag color="warning" size="md">gedelegeerd aan {{ t.delegatedTo }} ({{ t.delegationType }})</nldd-tag>
                </div>
              </div>
            </template>
          </template>
          <nldd-rich-text v-else><p class="rp-muted">Geen artikel beschikbaar.</p></nldd-rich-text>
        </div>

        <!-- Scenario's -->
        <div v-else-if="tab === 'scenarios'">
          <div class="rp-scn-head">
            <nldd-rich-text>
              <p>BDD-scenario's bewijzen dat de uitvoering klopt. Elk scenario beschrijft de feiten (gegeven), en de verwachte uitkomst (dan).</p>
            </nldd-rich-text>
            <nldd-button variant="secondary" text="Scenario's draaien" start-icon="check-mark-circle" @click="runScenarios"></nldd-button>
          </div>
          <nldd-spacer size="16" />
          <div v-if="scenarios.length" class="rp-scn-list">
            <div v-for="sc in scenarios" :key="sc.id" class="rp-scn">
              <div class="rp-scn-top">
                <strong>{{ sc.name }}</strong>
                <StatusBadge :status="sc.status === 'pass' ? 'geslaagd' : sc.status === 'fail' ? 'gezakt' : sc.status" />
              </div>
              <nldd-spacer size="8" />
              <div class="rp-scn-given">
                <span class="rp-scn-label">Gegeven</span>
                <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
                  <nldd-tag v-for="(g, i) in sc.given" :key="i" color="neutral" size="md">{{ g }}</nldd-tag>
                </nldd-container>
              </div>
              <nldd-spacer size="8" />
              <p class="rp-scn-then"><span class="rp-scn-label">Dan</span> {{ sc.then }}</p>
            </div>
          </div>
          <nldd-rich-text v-else><p class="rp-muted">Nog geen scenario's voor deze wet.</p></nldd-rich-text>
        </div>

        <!-- Uitvoeren -->
        <div v-else-if="tab === 'uitvoeren'">
          <nldd-rich-text>
            <p>Voer de wet uit op een casus. De engine haalt de invoer uit de aangesloten bronnen en past de artikelen toe. Hieronder zie je de uitkomst en de uitvoeringstrace.</p>
          </nldd-rich-text>
          <nldd-spacer size="16" />
          <div class="rp-exec-form">
            <nldd-form-field label="BSN">
              <nldd-text-field :value="exec.bsn" @input="(e) => (exec.bsn = e.target.value)"></nldd-text-field>
            </nldd-form-field>
            <nldd-form-field label="Rekendatum">
              <nldd-text-field :value="exec.rekendatum" @input="(e) => (exec.rekendatum = e.target.value)"></nldd-text-field>
            </nldd-form-field>
            <div class="rp-exec-btn">
              <nldd-button variant="primary" text="Uitvoeren" start-icon="sparkles" @click="runEngine"></nldd-button>
            </div>
          </div>

          <template v-if="execResult">
            <nldd-spacer size="20" />
            <nldd-container layout="grid" column-count="2" sm-column-count="1" gap="16">
              <nldd-card accessible-label="Uitkomst">
                <nldd-container padding="20">
                  <nldd-title size="5"><h3>Uitkomst</h3></nldd-title>
                  <nldd-spacer size="12" />
                  <div class="rp-out-list">
                    <div v-for="o in execResult.outputs" :key="o.name" class="rp-out-row">
                      <span class="rp-mono">{{ o.name }}</span>
                      <strong class="rp-out-val">{{ o.value }}</strong>
                    </div>
                  </div>
                </nldd-container>
              </nldd-card>
              <nldd-card accessible-label="Uitvoeringstrace">
                <nldd-container padding="20">
                  <nldd-title size="5"><h3>Uitvoeringstrace</h3></nldd-title>
                  <nldd-spacer size="12" />
                  <ol class="rp-trace">
                    <li v-for="(step, i) in execResult.trace" :key="i" class="rp-mono">{{ step }}</li>
                  </ol>
                </nldd-container>
              </nldd-card>
            </nldd-container>
          </template>
        </div>

        <!-- YAML -->
        <div v-else-if="tab === 'yaml'">
          <nldd-rich-text>
            <p>De machine-leesbare representatie zoals de engine die inleest. Dit bestand leeft in de repository van de uitvoerende dienst.</p>
          </nldd-rich-text>
          <nldd-spacer size="16" />
          <nldd-code-viewer language="yaml">{{ yaml }}</nldd-code-viewer>
        </div>
      </div>

      <!-- Aside -->
      <aside class="rp-aside">
        <nldd-card accessible-label="Status">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Status</h3></nldd-title>
            <nldd-spacer size="12" />
            <StatusBadge :status="wet.status" />
            <nldd-spacer size="16" />
            <div class="rp-cov-row">
              <span class="rp-cov-label">Dekking</span>
              <div class="rp-cov-track"><div class="rp-cov-fill" :style="{ width: coveragePct + '%' }"></div></div>
              <span class="rp-cov-pct rp-mono">{{ coveragePct }}%</span>
            </div>
            <template v-if="traject">
              <nldd-spacer size="16" />
              <router-link :to="`/wetten/${wet.id}`" class="rp-traj-chip">
                <nldd-icon name="pencil" aria-hidden="true"></nldd-icon>
                <span>Lopend traject: {{ traject.name }}</span>
              </router-link>
            </template>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="16" />
        <RelationLinks v-if="registerLinks.length" title="Databronnen" :links="registerLinks" />

        <template v-if="serviceLinks.length">
          <nldd-spacer size="16" />
          <RelationLinks title="Uitvoerende dienst" :links="serviceLinks" />
        </template>

        <template v-if="wet.implements">
          <nldd-spacer size="16" />
          <nldd-card accessible-label="Geeft uitvoering aan">
            <nldd-container padding="20">
              <nldd-title size="5"><h3>Geeft uitvoering aan</h3></nldd-title>
              <nldd-spacer size="12" />
              <router-link :to="`/wetten/${wet.implements.law}`" class="rp-traj-chip">
                <nldd-icon name="link" aria-hidden="true"></nldd-icon>
                <span>{{ store.wetById(wet.implements.law)?.name || wet.implements.law }}, art. {{ wet.implements.article }}</span>
              </router-link>
              <nldd-spacer size="8" />
              <p class="rp-muted">Open norm: <span class="rp-mono">{{ wet.implements.openTerm }}</span></p>
            </nldd-container>
          </nldd-card>
        </template>
      </aside>
    </nldd-container>

    <!-- Wijziging-modal -->
    <nldd-modal-dialog v-if="showChange" open accessible-label="Wijziging starten">
      <nldd-container padding="24">
        <nldd-title size="3"><h2>Wijziging starten</h2></nldd-title>
        <nldd-spacer size="12" />
        <nldd-rich-text>
          <p>
            Stel: de standaardpremie wordt aangepast bij de jaarovergang. Door een wijziging te starten opent het platform een
            <strong>traject</strong> (een branch met een eigen werkruimte) en draait het de scenario's opnieuw, zodat de impact van de
            wijziging direct zichtbaar is. Eén bestaand scenario zal zakken: dat is precies het signaal dat je wilt zien.
          </p>
        </nldd-rich-text>
        <nldd-spacer size="20" />
        <nldd-button-group orientation="horizontal">
          <nldd-button variant="primary" text="Traject openen" start-icon="pencil" @click="confirmChange"></nldd-button>
          <nldd-button variant="secondary" text="Annuleren" @click="showChange = false"></nldd-button>
        </nldd-button-group>
      </nldd-container>
    </nldd-modal-dialog>
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Wet niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar het corpus" start-icon="chevron-left" @click="router.push('/wetten')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.rp-muted { opacity: 0.65; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) {
  .rp-span2 { grid-column: auto; }
}

.rp-article-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.rp-article-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; }

.rp-def-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.5rem; }
.rp-def {
  display: flex; flex-direction: column; gap: 0.2rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 8px;
}
.rp-def-val { font-weight: 700; }

.rp-io-list { display: flex; flex-direction: column; gap: 0.5rem; }
.rp-io-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.rp-io-name { font-weight: 600; min-width: 9rem; }
.rp-io-arrow { width: 1rem; height: 1rem; opacity: 0.5; flex: 0 0 auto; }
.rp-source-chip {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  border: 1.5px solid var(--semantics-dividers-color);
  font-size: 0.85rem;
}
.rp-source-chip nldd-icon { width: 0.95rem; height: 0.95rem; }
.rp-source-chip:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-source-register { border-color: var(--semantics-actions-primary-default-background-color, #154273); }
.rp-source-wet { border-color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-source-output { opacity: 0.7; }

.rp-scn-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
.rp-scn-list { display: flex; flex-direction: column; gap: 0.75rem; }
.rp-scn {
  padding: 0.9rem 1rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
}
.rp-scn-top { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
.rp-scn-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.6; margin-right: 0.4rem; }
.rp-scn-given { display: flex; flex-direction: column; gap: 0.4rem; }
.rp-scn-then { margin: 0; }

.rp-exec-form { display: flex; gap: 1rem; align-items: flex-end; flex-wrap: wrap; }
.rp-exec-form nldd-form-field { min-width: 12rem; }
.rp-exec-form nldd-text-field { display: block; width: 100%; }
.rp-exec-btn { padding-bottom: 0.1rem; }
.rp-out-list { display: flex; flex-direction: column; gap: 0.5rem; }
.rp-out-row {
  display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
  padding: 0.5rem 0.65rem;
  border-radius: 8px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-out-val { font-size: 1.05rem; }
.rp-trace { margin: 0; padding-left: 1.1rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; }

.rp-cov-row { display: flex; align-items: center; gap: 0.6rem; }
.rp-cov-label { font-size: 0.78rem; opacity: 0.65; width: 3.5rem; flex: 0 0 auto; }
.rp-cov-track { flex: 1 1 auto; height: 0.5rem; border-radius: 999px; background: var(--semantics-surfaces-tinted-background-color); overflow: hidden; }
.rp-cov-fill { height: 100%; border-radius: 999px; background: var(--semantics-actions-primary-default-background-color, #154273); }
.rp-cov-pct { font-size: 0.82rem; width: 2.6rem; text-align: right; flex: 0 0 auto; }

.rp-traj-chip {
  display: inline-flex; align-items: center; gap: 0.45rem;
  text-decoration: none; color: inherit;
  font-size: 0.88rem;
}
.rp-traj-chip:hover { text-decoration: underline; }
.rp-traj-chip nldd-icon { width: 1rem; height: 1rem; }
</style>
