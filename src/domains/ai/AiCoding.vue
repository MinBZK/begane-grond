<script setup>
// AI-assisted coding showcase: the in-IDE assistant as a platform offering, the
// MCP tools this platform exposes to that assistant (order infra, look up
// on-call, promote a deploy), an AI PR-review with mock review comments on a
// sample PR, a list of running AI-agent runs, and an AI-governance block that
// maps data classification to allowed models.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();

// --- In-IDE assistant offerings -------------------------------------------
const assistants = [
  {
    id: 'rp-code',
    name: 'rp code (CLI-agent)',
    tagline: 'Agentische assistent in de terminal, Claude-Code-stijl',
    desc: 'Leest je repo, draait tests, opent PRs. Praat met het platform via MCP.',
    model: 'Overheids-LLM L',
    badge: 'aanbevolen',
    badgeColor: 'success',
    icon: 'terminal',
  },
  {
    id: 'rp-copilot',
    name: 'IDE-completions',
    tagline: 'Inline code-suggesties in VS Code en JetBrains',
    desc: 'Copilot-stijl autocomplete op een soeverein model, geen code naar buiten.',
    model: 'Overheids-LLM S',
    badge: 'GA',
    badgeColor: 'accent',
    icon: 'sparkles',
  },
  {
    id: 'rp-review',
    name: 'AI-PR-review',
    tagline: 'Automatische review-comments op elke pull request',
    desc: 'Draait als CI-stap, plaatst inline opmerkingen, blokkeert niet.',
    model: 'Claude (via gateway)',
    badge: 'beta',
    badgeColor: 'warning',
    icon: 'eye',
  },
];

// --- MCP tools the platform exposes to the assistant ----------------------
const mcpTools = [
  {
    name: 'rp.infra.order',
    desc: 'Neem een infra-dienst af (Postgres, Kafka, LLM-key) namens je team.',
    scope: 'schrijft',
    example: '"Geef me een Postgres-acceptatie voor app-toeslagen"',
    icon: 'cloud',
  },
  {
    name: 'rp.oncall.who',
    desc: 'Zoek op wie nu piket heeft voor een team of dienst.',
    scope: 'leest',
    example: '"Wie is on-call voor Toeslagen?"',
    icon: 'person-circle',
  },
  {
    name: 'rp.app.promote',
    desc: 'Promoot een release van acceptatie naar productie, met gate-checks.',
    scope: 'schrijft',
    example: '"Promoot paspoort van acc naar prod"',
    icon: 'arrow-up-arrow-down',
  },
  {
    name: 'rp.incident.list',
    desc: 'Haal de status van lopende incidenten op.',
    scope: 'leest',
    example: '"Wat is de status van inc-2024-017?"',
    icon: 'exclamation-triangle',
  },
  {
    name: 'rp.repo.search',
    desc: 'Zoek door code en repos op code.overheid.nl.',
    scope: 'leest',
    example: '"Waar wordt BSN-validatie gedaan?"',
    icon: 'magnifier',
  },
  {
    name: 'rp.fleet.campaign',
    desc: 'Start een fleet-shift campagne over meerdere repos.',
    scope: 'schrijft',
    example: '"Voeg security.txt toe aan alle open repos"',
    icon: 'ship-wheel',
  },
];

// --- AI-agent runs (live-ish list) ----------------------------------------
// Local reactive list so the demo can show progress and let you ack/stop.
const agentRuns = ref([
  {
    id: 'run-8841',
    task: 'Voert fleet-campagne uit: security.txt (RFC 9116)',
    tool: 'rp.fleet.campaign',
    by: 'fatima',
    status: 'actief',
    progress: 62,
    step: 'PR #4 van 4 openen',
    started: '4 min geleden',
  },
  {
    id: 'run-8839',
    task: 'Genereert runbook voor inc-2024-017',
    tool: 'rp.incident.list',
    by: 'sanne',
    status: 'actief',
    progress: 40,
    step: 'Tijdlijn samenvatten',
    started: '2 min geleden',
  },
  {
    id: 'run-8835',
    task: 'Bumpt NLDD design-system naar 0.9 in platformportaal',
    tool: 'rp.repo.search',
    by: 'ans',
    status: 'afgerond',
    progress: 100,
    step: 'PR #12 gemerged',
    started: '22 min geleden',
  },
  {
    id: 'run-8830',
    task: 'Stelt schaal-advies op voor kafka-toeslagen-prod',
    tool: 'rp.infra.order',
    by: 'sanne',
    status: 'mitigated',
    progress: 88,
    step: 'Wacht op goedkeuring tech-lead',
    started: '1 uur geleden',
  },
]);

function stopRun(id) {
  const r = agentRuns.value.find((x) => x.id === id);
  if (r && r.status === 'actief') {
    r.status = 'concept';
    r.step = 'Gestopt door gebruiker';
    store.audit('AI-agent-run gestopt', r.id);
  }
}

const activeRuns = computed(() => agentRuns.value.filter((r) => r.status === 'actief').length);

function personName(id) {
  return store.personById(id)?.name || id;
}

// --- AI PR review (mock comments on a sample PR) --------------------------
const samplePr = {
  repo: 'minbzk/toeslagenmotor',
  number: 318,
  title: 'Voeg retry-logica toe aan Kafka-consumer',
  author: 'sanne',
  branch: 'feat/kafka-retry',
  files: 4,
  additions: 86,
  deletions: 12,
};
const reviewComments = [
  {
    id: 'rc-1',
    severity: 'kritiek',
    color: 'critical',
    file: 'src/consumer.rs',
    line: 142,
    title: 'Onbegrensde retry-loop',
    body: 'De retry-lus heeft geen max-aantal of backoff. Bij een blijvende fout draait dit oneindig en blokkeert de consumer. Voeg exponentiële backoff en een dead-letter-pad toe.',
    suggestion: 'let backoff = Duration::from_millis(100 * 2u64.pow(attempt.min(6)));',
  },
  {
    id: 'rc-2',
    severity: 'beveiliging',
    color: 'warning',
    file: 'src/config.rs',
    line: 28,
    title: 'Secret uit omgeving, niet hardcoden',
    body: 'De Kafka-API-key lijkt als constante ingebakken. Lees hem uit de Vault via RP_KAFKA_KEY. Zie het secrets-domein.',
    suggestion: 'let key = std::env::var("RP_KAFKA_KEY")?;',
  },
  {
    id: 'rc-3',
    severity: 'stijl',
    color: 'neutral',
    file: 'src/consumer.rs',
    line: 90,
    title: 'Ongebruikte import',
    body: 'use std::thread; wordt niet meer gebruikt na de async-refactor. Verwijderen scheelt een clippy-warning.',
    suggestion: null,
  },
  {
    id: 'rc-4',
    severity: 'goed',
    color: 'success',
    file: 'tests/consumer_test.rs',
    line: 12,
    title: 'Nette dekking',
    body: 'Goede toevoeging: de nieuwe test dekt zowel de happy-path als de timeout. Dit voldoet aan de BDD-conventie van het Rust-template.',
    suggestion: null,
  },
];

// --- AI governance: data classification -> allowed models -----------------
const governance = [
  { classification: 'Openbaar', color: 'success', models: 'alle modellen', residency: 'NL of EU', note: 'Geen beperkingen.' },
  { classification: 'Intern', color: 'accent', models: 'NL- en EU-modellen', residency: 'NL of EU', note: 'Claude-gateway toegestaan, data blijft in de EU.' },
  { classification: 'Departementaal Vertrouwelijk', color: 'warning', models: 'alleen soevereine modellen', residency: 'Nederland', note: 'Uitsluitend Overheids-LLM L/S. Geen data buiten NL.' },
  { classification: 'Staatsgeheim', color: 'critical', models: 'geen LLM-gebruik', residency: 'n.v.t.', note: 'Niet toegestaan via de gateway.' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="AI-assisted coding"
      lede="De ontwikkelassistent als platformdienst: agentisch werken in de IDE, praten met het platform via MCP, automatische PR-reviews en lopende AI-agent-runs. Soeverein waar het moet."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'AI & LLM', href: '/ai' },
      ]"
    >
      <template #actions>
        <router-link to="/ai/skills">
          <nldd-button variant="secondary" text="Skills-marketplace" start-icon="puzzle-piece"></nldd-button>
        </router-link>
        <router-link to="/ai/llm">
          <nldd-button variant="secondary" text="LLM-catalogus" start-icon="sparkles"></nldd-button>
        </router-link>
        <nldd-button variant="primary" text="Assistent installeren" start-icon="terminal"></nldd-button>
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="mcpTools.length" label="MCP-tools beschikbaar" sub="platform-acties via de assistent" icon="link" />
      <MetricCard :value="activeRuns" label="Lopende agent-runs" sub="op dit moment" icon="sparkles" />
      <MetricCard value="3" label="Assistent-varianten" sub="CLI, IDE, PR-review" icon="terminal" />
      <MetricCard value="100%" label="Op soevereine modellen" sub="voor vertrouwelijke code" icon="shield-check-mark" />
    </nldd-container>

    <nldd-spacer size="32" />

    <!-- In-IDE assistant offerings -->
    <nldd-title size="3"><h2>De assistent in je IDE</h2></nldd-title>
    <nldd-rich-text><p>Drie smaken, allemaal op platform-modellen. Je code verlaat de Rijksomgeving niet.</p></nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-collection layout="grid" item-width="340px">
      <nldd-card v-for="a in assistants" :key="a.id" :accessible-label="a.name">
        <nldd-container padding="20">
          <div class="rp-asst-head">
            <nldd-icon :name="a.icon" aria-hidden="true" class="rp-asst-icon"></nldd-icon>
            <nldd-tag :color="a.badgeColor" size="sm">{{ a.badge }}</nldd-tag>
          </div>
          <nldd-spacer size="10" />
          <nldd-title size="5"><h3>{{ a.name }}</h3></nldd-title>
          <nldd-rich-text><p class="rp-asst-tagline">{{ a.tagline }}</p></nldd-rich-text>
          <nldd-spacer size="8" />
          <nldd-rich-text><p>{{ a.desc }}</p></nldd-rich-text>
          <nldd-spacer size="12" />
          <div class="rp-asst-model">
            <nldd-icon name="sparkles" aria-hidden="true"></nldd-icon>
            <span>Draait op <strong>{{ a.model }}</strong></span>
          </div>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="16" />
    <CliHint command="rp code install --ide vscode --model overheids-llm-l" label="Installeer de CLI-agent:" />

    <nldd-spacer size="36" />

    <!-- MCP tools -->
    <nldd-title size="3"><h2>Platform-tools via MCP</h2></nldd-title>
    <nldd-rich-text>
      <p>De assistent praat met dit platform via het Model Context Protocol. Zo kan hij infra afnemen, on-call opzoeken of een deploy promoten, met dezelfde rechten als jij.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-collection layout="grid" item-width="320px">
      <nldd-card v-for="t in mcpTools" :key="t.name" :accessible-label="t.name">
        <nldd-container padding="18">
          <div class="rp-mcp-head">
            <nldd-icon :name="t.icon" aria-hidden="true" class="rp-mcp-icon"></nldd-icon>
            <code class="rp-mcp-name">{{ t.name }}</code>
            <nldd-tag :color="t.scope === 'schrijft' ? 'warning' : 'neutral'" size="sm">{{ t.scope }}</nldd-tag>
          </div>
          <nldd-spacer size="10" />
          <nldd-rich-text><p>{{ t.desc }}</p></nldd-rich-text>
          <nldd-spacer size="8" />
          <p class="rp-mcp-example">{{ t.example }}</p>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="36" />

    <!-- AI PR review -->
    <nldd-title size="3"><h2>AI-PR-review</h2></nldd-title>
    <nldd-rich-text><p>De assistent reviewt elke pull request en plaatst inline opmerkingen. Adviserend, niet blokkerend.</p></nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="Voorbeeld pull request">
      <nldd-container padding="24">
        <div class="rp-pr-head">
          <div>
            <div class="rp-pr-title">
              <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
              <span><code>{{ samplePr.repo }}</code> #{{ samplePr.number }}</span>
            </div>
            <nldd-title size="5"><h3>{{ samplePr.title }}</h3></nldd-title>
            <p class="rp-pr-meta">
              door {{ personName(samplePr.author) }} · <code>{{ samplePr.branch }}</code> ·
              {{ samplePr.files }} bestanden · <span class="rp-add">+{{ samplePr.additions }}</span>
              <span class="rp-del">−{{ samplePr.deletions }}</span>
            </p>
          </div>
          <nldd-tag color="accent" size="md">{{ reviewComments.length }} opmerkingen</nldd-tag>
        </div>

        <nldd-spacer size="20" />

        <ul class="rp-review">
          <li v-for="c in reviewComments" :key="c.id" class="rp-review-item">
            <div class="rp-review-gutter">
              <nldd-tag :color="c.color" size="sm">{{ c.severity }}</nldd-tag>
            </div>
            <div class="rp-review-body">
              <p class="rp-review-loc"><code>{{ c.file }}</code> : {{ c.line }}</p>
              <p class="rp-review-title">{{ c.title }}</p>
              <p class="rp-review-text">{{ c.body }}</p>
              <nldd-code-viewer v-if="c.suggestion" language="rust">{{ c.suggestion }}</nldd-code-viewer>
            </div>
          </li>
        </ul>

        <nldd-spacer size="16" />
        <nldd-inline-dialog
          title="Review-samenvatting"
          supporting-text="1 kritiek punt, 1 beveiligingspunt, 1 stijlpunt. De assistent stelt voor de retry-loop te begrenzen vóór merge."
        ></nldd-inline-dialog>
        <nldd-spacer size="16" />
        <nldd-button-group orientation="horizontal">
          <router-link to="/code/repo-toeslagen">
            <nldd-button variant="primary" text="Naar repo" end-icon="arrow-right"></nldd-button>
          </router-link>
          <nldd-button variant="secondary" text="Review opnieuw draaien" start-icon="sparkles"></nldd-button>
        </nldd-button-group>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="36" />

    <!-- AI-agent runs -->
    <nldd-title size="3"><h2>Lopende AI-agent-runs</h2></nldd-title>
    <nldd-rich-text><p>Agents die nu namens teams taken uitvoeren via de MCP-tools. Volg de voortgang of stop een run.</p></nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="Agent-runs">
      <nldd-container padding="8">
        <ul class="rp-runs">
          <li v-for="r in agentRuns" :key="r.id" class="rp-run">
            <div class="rp-run-main">
              <div class="rp-run-top">
                <nldd-icon name="sparkles" aria-hidden="true" class="rp-run-icon"></nldd-icon>
                <span class="rp-run-task">{{ r.task }}</span>
                <StatusBadge :status="r.status" size="sm" />
              </div>
              <p class="rp-run-meta">
                <code>{{ r.tool }}</code> · {{ personName(r.by) }} · {{ r.started }} · {{ r.step }}
              </p>
              <div class="rp-run-bar">
                <div
                  class="rp-run-fill"
                  :class="{ 'rp-run-done': r.status === 'afgerond', 'rp-run-stopped': r.status === 'concept' }"
                  :style="{ width: `${r.progress}%` }"
                ></div>
              </div>
            </div>
            <div class="rp-run-actions">
              <nldd-button
                v-if="r.status === 'actief'"
                variant="secondary"
                size="sm"
                text="Stop"
                start-icon="dismiss"
                @click="stopRun(r.id)"
              ></nldd-button>
              <nldd-tag v-else-if="r.status === 'afgerond'" color="success" size="sm">klaar</nldd-tag>
            </div>
          </li>
        </ul>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="36" />

    <!-- AI governance -->
    <nldd-title size="3"><h2>AI-governance: welke data naar welk model</h2></nldd-title>
    <nldd-rich-text>
      <p>De gateway dwingt af dat gegevensclassificatie en model bij elkaar passen. Vertrouwelijke code gaat nooit naar een niet-soeverein model.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="Governance-matrix">
      <nldd-container padding="8">
        <table class="rp-gov">
          <thead>
            <tr>
              <th>Classificatie</th>
              <th>Toegestane modellen</th>
              <th>Dataresidentie</th>
              <th>Toelichting</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in governance" :key="g.classification">
              <td><nldd-tag :color="g.color" size="sm">{{ g.classification }}</nldd-tag></td>
              <td>{{ g.models }}</td>
              <td>{{ g.residency }}</td>
              <td class="rp-gov-note">{{ g.note }}</td>
            </tr>
          </tbody>
        </table>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="16" />
    <nldd-inline-dialog
      title="Onderbouwing"
      supporting-text="Gebaseerd op RFC-012 (Soevereine LLM-gateway). Alle prompts en responses worden geanonimiseerd gelogd voor de AVG en auditeerbaarheid."
    ></nldd-inline-dialog>

    <nldd-spacer size="28" />

    <RelationLinks
      title="Gerelateerd"
      :links="[
        { text: 'LLM-catalogus en keys', to: '/ai/llm', icon: 'sparkles' },
        { text: 'Fleet-shift campagnes', to: '/fleet', icon: 'ship-wheel' },
        { text: 'On-call rooster', to: '/teams/on-call', icon: 'person-circle' },
        { text: 'Repos op code.overheid.nl', to: '/code', icon: 'folder-stack' },
        { text: 'Soevereine LLM (RFC-012)', to: '/governance', icon: 'books-vertical' },
      ]"
    />
  </div>
</template>

<style scoped>
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
/* Assistant cards */
.rp-asst-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rp-asst-icon {
  width: 1.8rem;
  height: 1.8rem;
  color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-asst-tagline {
  font-weight: 600;
  opacity: 0.85;
  margin: 0;
}
.rp-asst-model {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-asst-model nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.7;
}
/* MCP cards */
.rp-mcp-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-mcp-icon {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.75;
  flex-shrink: 0;
}
.rp-mcp-name {
  font-size: 0.9rem;
  font-weight: 700;
}
.rp-mcp-example {
  margin: 0;
  font-style: italic;
  opacity: 0.7;
  font-size: 0.88rem;
}
/* PR review */
.rp-pr-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-pr-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  opacity: 0.8;
}
.rp-pr-title nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
}
.rp-pr-meta {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  opacity: 0.75;
}
.rp-add {
  color: var(--nldd-color-success, #39870c);
  font-weight: 700;
}
.rp-del {
  color: var(--nldd-color-critical, #d52b1e);
  font-weight: 700;
}
.rp-review {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.rp-review-item {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  border-left: 3px solid var(--semantics-dividers-color);
}
.rp-review-gutter {
  padding-top: 0.1rem;
}
.rp-review-loc {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-review-title {
  margin: 0.2rem 0 0.3rem;
  font-weight: 700;
}
.rp-review-text {
  margin: 0 0 0.5rem;
  font-size: 0.92rem;
}
/* Agent runs */
.rp-runs {
  list-style: none;
  margin: 0;
  padding: 0;
}
.rp-run {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-run:last-child {
  border-bottom: none;
}
.rp-run-main {
  flex: 1;
  min-width: 0;
}
.rp-run-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-run-icon {
  width: 1.2rem;
  height: 1.2rem;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  flex-shrink: 0;
}
.rp-run-task {
  font-weight: 600;
}
.rp-run-meta {
  margin: 0.3rem 0 0.5rem;
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-run-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-run-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--semantics-actions-primary-default-background-color, #154273);
  transition: width 0.4s ease;
}
.rp-run-fill.rp-run-done {
  background: var(--nldd-color-success, #39870c);
}
.rp-run-fill.rp-run-stopped {
  background: var(--nldd-color-critical, #d52b1e);
}
.rp-run-actions {
  flex-shrink: 0;
}
/* Governance table */
.rp-gov {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.rp-gov th,
.rp-gov td {
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  text-align: left;
  vertical-align: top;
}
.rp-gov thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.65;
}
.rp-gov tbody tr:last-child td {
  border-bottom: none;
}
.rp-gov-note {
  opacity: 0.8;
}
</style>
