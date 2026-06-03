<script setup>
// Infra-as-code: the page that makes the platform's core claim explicit. The
// UI is just a friendly editor over a git repo of declared config. Every wizard
// and every button writes a commit to platform-config (see store.audit ->
// store.commit), so nothing changes outside a commit, and everything is
// traceable and reversible. This page shows that seam: a live commit log with
// viewable diffs (section B is the proof), the repo framing (section A), and
// desired state vs. drift (section C, reusing the EnvMatrix drift derivation).
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();

// --- KPIs -------------------------------------------------------------------
const commitCount = computed(() => store.commits.length);
const declaredResources = computed(() => store.instances.length + store.apps.length);

// Drift derivation, identical to EnvMatrix: an app drifts when its environments
// do not all run the same version. Here we frame it as "what git declares as
// desired state vs. what actually runs".
const driftRows = computed(() =>
  store.deployments.map((d) => ({
    key: d.app,
    name: store.appById(d.app)?.name || d.app,
    versions: { dev: d.dev, test: d.test, acc: d.acc, prod: d.prod },
    drift: new Set([d.dev, d.test, d.acc, d.prod]).size > 1,
  })),
);
const inSyncCount = computed(() => driftRows.value.filter((r) => !r.drift).length);
const driftCount = computed(() => driftRows.value.filter((r) => r.drift).length);

// --- Section A: the repo as source of truth ---------------------------------
const REPO_TREE = `platform-config/
├── apps/                 # elke applicatie als declaratie
│   └── toeslagen/app.yaml
├── infra/                # databases, clusters, queues als resources
│   └── toeslagen-postgres-prod.tf
├── environments/         # gewenste versie per omgeving (desired state)
│   └── app-toeslagen.yaml
├── secrets/              # versleuteld (sops), nooit platte tekst
├── governance/rfcs/      # besluiten als code
└── fleet/                # vloot-brede wijzigingen`;

const SAMPLE_FILE = `# infra/toeslagen-postgres-prod.tf
resource "platform_instance" "toeslagen-postgres-prod" {
  name    = "toeslagen-postgres-prod"
  kind    = "postgres"
  size    = "L"
  env     = "prod"
  team    = "team-toeslagen"
  managed = true
}`;

// --- Section B: the commit log (the proof) ----------------------------------
const commitColumns = [
  { key: 'sha', label: 'Commit', mono: true },
  { key: 'message', label: 'Bericht' },
  { key: 'actor', label: 'Actor' },
  { key: 'path', label: 'Bestand', mono: true },
  { key: 'at', label: 'Wanneer' },
];

function actorName(id) {
  return store.personById(id)?.name || id;
}

// --- Section C: desired state & drift ---------------------------------------
const driftColumns = [
  { key: 'name', label: 'Applicatie' },
  { key: 'dev', label: 'Dev', mono: true },
  { key: 'test', label: 'Test', mono: true },
  { key: 'acc', label: 'Acc', mono: true },
  { key: 'prod', label: 'Prod', mono: true },
  { key: 'state', label: 'Status' },
];
// Only the apps that actually drift, capped so the panel stays scannable. The
// full matrix lives on /environments.
const driftTableRows = computed(() =>
  driftRows.value
    .filter((r) => r.drift)
    .slice(0, 12)
    .map((r) => ({
      id: r.key,
      name: r.name,
      dev: r.versions.dev,
      test: r.versions.test,
      acc: r.versions.acc,
      prod: r.versions.prod,
      state: 'drift',
    })),
);

const relationLinks = [
  { text: 'Infra-diensten', to: '/infra', icon: 'cloud' },
  { text: 'Applicaties', to: '/apps', icon: 'rectangle-stack' },
  { text: 'Vloot-campagnes', to: '/fleet', icon: 'ship-wheel' },
  { text: 'Audit-log', to: '/governance/audit', icon: 'eye' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Infra als code"
      lede="De UI is een editor boven git. Elke wizard en elke knop op dit platform schrijft een commit naar één config-repo. Niets verandert buiten een commit om, dus alles is herleidbaar en terug te draaien. Hieronder zie je die naad: de repo als bron van waarheid, de commits die je acties opleveren met hun diff, en de gewenste staat versus wat er echt draait."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Infra als code', href: '/platform/iac' }]"
    >
      <template #actions>
        <nldd-button-group orientation="horizontal">
          <router-link to="/governance/audit">
            <nldd-button variant="secondary" text="Audit-log" start-icon="eye"></nldd-button>
          </router-link>
          <router-link to="/environments">
            <nldd-button variant="secondary" text="Omgevingen" start-icon="arrow-up-arrow-down"></nldd-button>
          </router-link>
        </nldd-button-group>
      </template>
    </PageHeader>

    <!-- KPIs -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="commitCount" label="Commits in deze sessie" sub="op platform-config" icon="chevron-left-forward-slash-chevron-right" />
      <MetricCard :value="declaredResources" label="Gedeclareerde resources" sub="apps en infra-instances" icon="cloud" />
      <MetricCard :value="inSyncCount" label="In sync met git" sub="omgevingen gelijk" icon="check-mark-circle" />
      <MetricCard :value="driftCount" label="Drift" sub="wijkt af van desired state" icon="exclamation-triangle" to="/environments" />
    </nldd-container>

    <nldd-spacer size="28" />

    <!-- Section A: the repo as source of truth -->
    <nldd-card accessible-label="De UI is een editor boven git">
      <nldd-container padding="24">
        <nldd-title size="3"><h2>De UI is een editor boven git</h2></nldd-title>
        <nldd-spacer size="8" />
        <nldd-rich-text>
          <p class="rp-lead">
            Achter elke knop zit één repo: <code>platform-config</code>. Infra afnemen, een release promoten, een secret roteren: het wordt allemaal een wijziging in een bestand, vastgelegd in een commit. Je kunt altijd naar de onderliggende code kijken, en elke wijziging terugdraaien zoals je elke commit terugdraait.
          </p>
        </nldd-rich-text>
        <nldd-spacer size="18" />
        <div class="rp-repo-grid">
          <div>
            <p class="rp-sub">De repo</p>
            <nldd-code-viewer language="text">{{ REPO_TREE }}</nldd-code-viewer>
          </div>
          <div>
            <p class="rp-sub">Een gedeclareerde resource</p>
            <nldd-code-viewer language="text">{{ SAMPLE_FILE }}</nldd-code-viewer>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="28" />

    <!-- Section B: the commit log (the proof) -->
    <nldd-title size="3"><h2>Wat je acties opleveren</h2></nldd-title>
    <nldd-rich-text>
      <p>Elke handeling op het platform verschijnt hier als commit. Klik op een commit om de diff te zien. Voer elders een actie uit (bijvoorbeeld infra afnemen of een secret roteren) en de commit komt bovenaan binnen.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <DataTable :columns="commitColumns" :rows="store.commits" row-key="sha">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'sha'">
          <router-link :to="`/platform/iac/${row.sha}`" class="rp-sha">
            <span>{{ row.sha }}</span>
            <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
          </router-link>
        </template>
        <template v-else-if="col.key === 'message'">
          <router-link :to="`/platform/iac/${row.sha}`" class="rp-link">{{ value }}</router-link>
        </template>
        <template v-else-if="col.key === 'actor'">
          <router-link v-if="store.personById(row.actor)" :to="`/teams/mensen/${row.actor}`" class="rp-link">{{ actorName(row.actor) }}</router-link>
          <span v-else>{{ actorName(row.actor) }}</span>
        </template>
        <template v-else-if="col.key === 'at'">
          <span class="rp-at"><nldd-icon name="clock" aria-hidden="true"></nldd-icon> {{ value }}</span>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="32" />

    <!-- Section C: desired state vs. drift -->
    <nldd-title size="3"><h2>Desired state en drift</h2></nldd-title>
    <nldd-rich-text>
      <p>Git beschrijft welke versie er per omgeving hoort te draaien. Waar de werkelijkheid afwijkt, is er drift. Dit is de afwijking van de gedeclareerde staat, niet een live reconcile-lus.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <template v-if="driftTableRows.length">
      <DataTable :columns="driftColumns" :rows="driftTableRows" row-key="id">
        <template #cell="{ row, col, value }">
          <template v-if="col.key === 'name'">
            <router-link :to="`/apps/${row.id}`" class="rp-link">{{ value }}</router-link>
          </template>
          <template v-else-if="col.key === 'state'">
            <StatusBadge :status="'drift'" size="sm" />
          </template>
          <template v-else>{{ value }}</template>
        </template>
      </DataTable>
    </template>
    <nldd-rich-text v-else><p>Alle omgevingen draaien de gedeclareerde versie. Geen drift.</p></nldd-rich-text>

    <nldd-spacer size="20" />
    <CliHint command="bg config log --path infra/" />

    <nldd-spacer size="24" />
    <RelationLinks title="Doorklikken" :links="relationLinks" />
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-lead { font-size: 1.02rem; margin: 0; }
.rp-sub {
  font-size: 0.82rem;
  font-weight: 600;
  opacity: 0.65;
  margin: 0 0 0.4rem;
}
.rp-repo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
@media (max-width: 820px) {
  .rp-repo-grid { grid-template-columns: 1fr; }
}
.rp-sha {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  font-family: var(--ro-font-mono, ui-monospace, monospace);
  font-weight: 600;
  color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-sha:hover { text-decoration: underline; }
.rp-sha nldd-icon { width: 0.85rem; height: 0.85rem; opacity: 0.6; }
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover { text-decoration: underline; }
.rp-at {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  opacity: 0.8;
}
.rp-at nldd-icon { width: 0.9rem; height: 0.9rem; opacity: 0.6; }
</style>
