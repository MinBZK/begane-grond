<script setup>
// RepoDetail — a single repository page on code.overheid.nl. Combines a
// README preview, language/stars/CI summary, faked issues and pull requests,
// an open-source compliance panel (CONTRIBUTING, Code of Conduct, secret
// scan), and cross-layer relation links to the linked app and owning team.
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const store = usePlatformStore();

const repo = computed(() => store.repoById(route.params.repo));
const app = computed(() => (repo.value?.app ? store.appById(repo.value.app) : null));
const team = computed(() => (app.value ? store.teamById(app.value.team) : null));
// The runner pool this repo's CI runs on: from a recent job, else the team's
// own pool, else the shared pool. Links the code layer to the physical runners.
const ciPool = computed(() => {
  const job = store.ciJobs.find((j) => j.repo === repo.value?.id);
  if (job) return store.runnerById(job.pool);
  const teamPool = store.runners.find((r) => r.team === team.value?.id);
  return teamPool || store.runners.find((r) => r.id === 'pool-shared') || store.runners[0];
});
const org = computed(() => (team.value ? store.orgById(team.value.org) : null));
const vulns = computed(() =>
  store.vulnerabilities.filter((v) => v.repo === repo.value?.id),
);

// Deterministic, plausible README content per repository.
const README = {
  'repo-paspoort': {
    tagline: 'Service voor het aanvragen en muteren van reisdocumenten.',
    body: [
      'De Paspoortaanvraag-service verwerkt aanvragen voor paspoorten en identiteitskaarten. De service draait op het Begane Grond en koppelt via FSC met de BRP en de Reisdocumentenadministratie (RAAS).',
      'Geschreven in Rust (Axum) met een Postgres-backend. Migraties via sqlx, gedragstests via Cucumber. De service is intern omdat zij persoonsgegevens en documentnummers verwerkt.',
    ],
    run: 'cargo run --bin paspoort-api',
  },
  'repo-toeslagen': {
    tagline: 'Rekenmotor voor toeslagen: huur, zorg, kinderopvang.',
    body: [
      'De Toeslagenmotor berekent voorschotten en definitieve toekenningen. De rekenregels zijn versioneerd per toeslagjaar en publiek inzichtelijk, zodat burgers en juristen de werking kunnen controleren.',
      'Event-driven via Kafka, met een Postgres-projectie voor bevragingen. Volledig open onder EUPL-1.2 als onderdeel van transparante uitvoering.',
    ],
    run: 'cargo run --bin toeslagen-engine -- --jaar 2026',
  },
  'repo-platformportaal': {
    tagline: 'Het internal developer platform dat je nu bekijkt.',
    body: [
      'Het Platformportaal is de selfservice-frontend van het Begane Grond: infra bestellen, apps aanmaken, werkplekken uitrollen en de fysieke laag tot in het rack volgen.',
      'Gebouwd met Vue 3 en het NLDD design system. Toegankelijk volgens WCAG 2.2 AA, getest met pa11y in CI.',
    ],
    run: 'npm install && npm run dev',
  },
  'repo-datadeling': {
    tagline: 'Generieke API voor gegevensdeling tussen overheidsorganisaties.',
    body: [
      'De Datadeling-API biedt een uniform koppelvlak voor het delen van gegevens conform de API Design Rules (ADR). Authenticatie via OAuth NL GOV, logging conform het Logboek Dataverwerkingen.',
      'Python met FastAPI, beheerd met uv. Batchverwerking en scheduling inbegrepen.',
    ],
    run: 'uv run uvicorn datadeling.main:app --reload',
  },
  'repo-platform-config': {
    tagline: 'De bron van waarheid van het platform: alle infra, omgevingen en governance als code.',
    body: [
      'Deze repository is wat het platform draaiend houdt. Elke wizard en elke knop in het Platformportaal schrijft hierheen: infra afnemen, een release promoten, een secret roteren. Niets verandert buiten een commit om, dus alles is herleidbaar en terug te draaien.',
      'Gedeclareerd in HCL en YAML, versleuteld waar nodig met sops. De gewenste staat per omgeving staat in environments/, en drift is een afwijking van wat hier staat. Open onder EUPL-1.2, zodat de werking controleerbaar is.',
    ],
    run: 'bg config log --path infra/',
  },
  'repo-stuc': {
    tagline: 'Open-source engine achter rijksbrede fleet-transformaties.',
    body: [
      'STUC is de engine die rijksbrede transformaties over repositories uitvoert (codemods, FSC-koppelingen, logging-middleware). Teams gebruiken hem niet rechtstreeks: het loopt via bg fleet, zodat campagnes overal hetzelfde verlopen.',
      'Geschreven in Python, ontwikkeld in de open onder EUPL-1.2. De engine staat los op code.overheid.nl, maar het gebruik zit native in bg.',
    ],
    run: 'bg fleet campaign run camp-securitytxt',
  },
};

const readme = computed(
  () =>
    README[repo.value?.id] || {
      tagline: 'Repository op code.overheid.nl.',
      body: ['Nog geen uitgebreide README beschikbaar.'],
      run: 'git clone',
    },
);

const cloneUrl = computed(() => `https://code.overheid.nl/${repo.value?.name}.git`);

// File tree shown like a code host's repo root. Files common to every
// government repo (license, contributing, security.txt, CI) plus a
// language-specific source layout. Deterministic per repo so the demo is
// stable; `you` marks where the README run-command points.
const COMMON = [
  { name: '.forgejo/workflows/ci.yml', kind: 'file', icon: 'gear', note: 'CI-pijplijn (Forgejo Actions)' },
  { name: '.well-known/security.txt', kind: 'file', icon: 'shield-check-mark', note: 'RFC 9116' },
  { name: 'CODE_OF_CONDUCT.md', kind: 'file', icon: 'file-text' },
  { name: 'CONTRIBUTING.md', kind: 'file', icon: 'file-text' },
  { name: 'LICENSE', kind: 'file', icon: 'certificate', note: 'EUPL-1.2' },
  { name: 'README.md', kind: 'file', icon: 'file-text' },
];
const BY_LANG = {
  Rust: [
    { name: 'src/', kind: 'dir', icon: 'folder' },
    { name: 'src/main.rs', kind: 'file', icon: 'chevron-left-forward-slash-chevron-right' },
    { name: 'src/lib.rs', kind: 'file', icon: 'chevron-left-forward-slash-chevron-right' },
    { name: 'tests/', kind: 'dir', icon: 'folder' },
    { name: 'Cargo.toml', kind: 'file', icon: 'cylinder-split' },
    { name: 'Cargo.lock', kind: 'file', icon: 'cylinder-split' },
  ],
  Vue: [
    { name: 'src/', kind: 'dir', icon: 'folder' },
    { name: 'src/main.js', kind: 'file', icon: 'chevron-left-forward-slash-chevron-right' },
    { name: 'src/App.vue', kind: 'file', icon: 'chevron-left-forward-slash-chevron-right' },
    { name: 'src/components/', kind: 'dir', icon: 'folder' },
    { name: 'package.json', kind: 'file', icon: 'cylinder-split' },
    { name: 'vite.config.js', kind: 'file', icon: 'gear' },
  ],
  Python: [
    { name: 'src/', kind: 'dir', icon: 'folder' },
    { name: 'src/__init__.py', kind: 'file', icon: 'chevron-left-forward-slash-chevron-right' },
    { name: 'src/cli.py', kind: 'file', icon: 'chevron-left-forward-slash-chevron-right' },
    { name: 'tests/', kind: 'dir', icon: 'folder' },
    { name: 'pyproject.toml', kind: 'file', icon: 'cylinder-split' },
    { name: 'uv.lock', kind: 'file', icon: 'cylinder-split' },
  ],
  // platform-config: the source of truth, declared as code (see IaC.vue).
  HCL: [
    { name: 'apps/', kind: 'dir', icon: 'folder', note: 'elke applicatie als declaratie' },
    { name: 'environments/', kind: 'dir', icon: 'folder', note: 'gewenste versie per omgeving' },
    { name: 'fleet/', kind: 'dir', icon: 'folder', note: 'vloot-brede wijzigingen' },
    { name: 'governance/', kind: 'dir', icon: 'folder', note: "RFC's en besluiten als code" },
    { name: 'infra/', kind: 'dir', icon: 'folder', note: 'databases, clusters, queues' },
    { name: 'secrets/', kind: 'dir', icon: 'folder', note: 'versleuteld (sops)' },
    { name: 'main.tf', kind: 'file', icon: 'cylinder-split' },
  ],
};
const fileTree = computed(() => {
  const lang = repo.value?.lang || 'Vue';
  const src = BY_LANG[lang] || BY_LANG.Vue;
  // Dirs first, then files, each group alphabetic, like a code host.
  return [...src, ...COMMON].sort((a, b) => {
    if (a.kind !== b.kind) return a.kind === 'dir' ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
});
const lastCommit = computed(() => ({
  msg: prs.value[0]?.title || readme.value.tagline,
  by: 'sanne',
  when: '2 uur geleden',
}));

// Faked open issues — seeded from openIssues count but with realistic titles.
const ISSUE_POOL = [
  { title: 'Tijdzone-bug bij aanvragen rond middernacht', label: 'bug', age: '3 dagen' },
  { title: 'Voeg rate limiting toe op het publieke endpoint', label: 'security', age: '5 dagen' },
  { title: 'Documenteer de FSC-koppeling in de README', label: 'docs', age: '1 week' },
  { title: 'Flaky integratietest in CI', label: 'ci', age: '1 week' },
  { title: 'Ondersteun paginering op /v1/items', label: 'feature', age: '2 weken' },
  { title: 'Verbeter foutmeldingen (problem+json)', label: 'enhancement', age: '2 weken' },
  { title: 'Bump dependency met bekende CVE', label: 'security', age: '3 weken' },
  { title: 'Toegankelijkheid: focus-volgorde in formulier', label: 'a11y', age: '3 weken' },
  { title: 'Refactor: splits monolithische handler op', label: 'refactor', age: '1 maand' },
  { title: 'Metric ontbreekt voor verwerkingstijd', label: 'observability', age: '1 maand' },
];
const PR_POOL = [
  { title: 'feat: ondersteuning voor machtigingen', author: 'sanne', age: '2 uur' },
  { title: 'fix: null-check op optioneel adresveld', author: 'joost', age: '1 dag' },
  { title: 'chore: bump NLDD naar 0.9', author: 'ans', age: '1 dag' },
  { title: 'docs: voeg security.txt toe (RFC 9116)', author: 'fatima', age: '2 dagen' },
  { title: 'test: extra BDD-scenario voor afwijzing', author: 'pieter', age: '3 dagen' },
  { title: 'perf: cache de rekenregel-lookup', author: 'sanne', age: '4 dagen' },
];
const LABEL_COLOR = {
  bug: 'critical',
  security: 'critical',
  ci: 'warning',
  docs: 'neutral',
  feature: 'accent',
  enhancement: 'accent',
  a11y: 'accent',
  refactor: 'neutral',
  observability: 'accent',
};

// A repo can have more open issues than the curated pool has entries (the seed
// now scales issue counts up to ~15). Cycle the pool deterministically so the
// list matches repo.openIssues exactly, keeping every entry distinct by number.
const issues = computed(() => {
  const n = repo.value?.openIssues || 0;
  return Array.from({ length: n }, (_, i) => ISSUE_POOL[i % ISSUE_POOL.length]);
});
const prs = computed(() => PR_POOL.slice(0, repo.value?.openPrs || 0));

function authorName(id) {
  const p = store.personById(id);
  return p ? p.name : id;
}

const issueColumns = [
  { key: 'num', label: '#', mono: true },
  { key: 'title', label: 'Titel' },
  { key: 'label', label: 'Label' },
  { key: 'age', label: 'Geopend', align: 'right' },
];
const prColumns = [
  { key: 'num', label: '#', mono: true },
  { key: 'title', label: 'Titel' },
  { key: 'author', label: 'Auteur' },
  { key: 'age', label: 'Geopend', align: 'right' },
];

// All issue rows, before filtering/capping. Stable numbers per repo.
const allIssueRows = computed(() =>
  issues.value.map((it, i) => ({ id: i, num: `#${412 + i}`, ...it })),
);

// Label filter (chips) + display cap, so a repo with many open issues stays
// manageable instead of rendering one tall table.
const issueLabel = ref('all');
const issueLimit = ref(10);
const issueLabels = computed(() => [
  ...new Set(allIssueRows.value.map((r) => r.label)),
]);
const filteredIssues = computed(() =>
  issueLabel.value === 'all'
    ? allIssueRows.value
    : allIssueRows.value.filter((r) => r.label === issueLabel.value),
);
const issueRows = computed(() => filteredIssues.value.slice(0, issueLimit.value));
const issuesMore = computed(() =>
  Math.max(0, filteredIssues.value.length - issueRows.value.length),
);
function pickIssueLabel(label) {
  issueLabel.value = label;
  issueLimit.value = 10;
}
const prRows = computed(() =>
  prs.value.map((pr, i) => ({
    id: i,
    num: `!${88 + i}`,
    title: pr.title,
    author: authorName(pr.author),
    age: pr.age,
  })),
);

// Open-source compliance checklist (NeRDS open-tenzij). Public repos must meet
// the full set; internal repos are exempt from the public-facing items.
const compliance = computed(() => {
  const open = repo.value?.visibility === 'open';
  const secretsClean = vulns.value.every((v) => v.status === 'opgelost');
  return [
    {
      key: 'license',
      label: 'EUPL-1.2-licentie',
      ok: repo.value?.license === 'EUPL-1.2',
      detail: `LICENSE aanwezig (${repo.value?.license})`,
    },
    {
      key: 'contributing',
      label: 'CONTRIBUTING.md',
      ok: true,
      detail: 'Bijdragerichtlijn met PR-proces en DCO',
    },
    {
      key: 'coc',
      label: 'Code of Conduct',
      ok: true,
      detail: 'Contributor Covenant 2.1',
    },
    {
      key: 'securitytxt',
      label: 'security.txt (RFC 9116)',
      ok: open,
      detail: open ? 'Gepubliceerd onder /.well-known/' : 'Niet vereist voor interne repo',
    },
    {
      key: 'secretscan',
      label: 'Secret-scan',
      ok: secretsClean,
      detail: secretsClean ? 'Geen secrets in geschiedenis' : 'Openstaande bevinding, zie beveiliging',
    },
    {
      key: 'sbom',
      label: 'SBOM gepubliceerd',
      ok: true,
      detail: 'CycloneDX, ververst per release',
    },
  ];
});

const complianceScore = computed(() => {
  const c = compliance.value;
  return { ok: c.filter((x) => x.ok).length, total: c.length };
});

const relationLinks = computed(() => {
  const links = [];
  if (app.value) {
    links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  }
  if (team.value) {
    links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  }
  if (org.value) {
    links.push({ text: org.value.name, to: '/teams', icon: 'apartment-building' });
  }
  return links;
});
</script>

<template>
  <div v-if="repo" class="rp-page">
    <PageHeader
      :title="repo.name"
      :lede="readme.tagline"
      :crumbs="[
        { text: 'Code', href: '/code' },
        { text: repo.name, href: `/code/${repo.id}` },
      ]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="Issues"
          start-icon="exclamation-triangle"
          @click="$router.push(`/code/${repo.id}`)"
        ></nldd-button>
        <nldd-button variant="primary" text="Clone" start-icon="terminal"></nldd-button>
      </template>
    </PageHeader>

    <div class="rp-meta-tags">
      <nldd-tag :color="repo.visibility === 'open' ? 'success' : 'neutral'" size="md">
        <nldd-icon
          :name="repo.visibility === 'open' ? 'eye' : 'lock-closed'"
          aria-hidden="true"
          class="rp-tag-icon"
        ></nldd-icon>
        {{ repo.visibility === 'open' ? 'Openbaar' : 'Intern' }}
      </nldd-tag>
      <nldd-tag v-if="repo.visibility === 'open'" color="accent" size="md">open-tenzij</nldd-tag>
      <nldd-tag color="accent" size="md">{{ repo.lang }}</nldd-tag>
      <nldd-tag color="accent" size="md">{{ repo.license }}</nldd-tag>
    </div>

    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="repo.stars" label="Stars" icon="starburst-filled" />
      <MetricCard :value="repo.openPrs" label="Open PR's" icon="arrow-up-arrow-down" />
      <MetricCard :value="repo.openIssues" label="Open issues" icon="exclamation-triangle" />
      <MetricCard
        :value="repo.ci === 'green' ? 'groen' : 'rood'"
        label="CI-status"
        :icon="repo.ci === 'green' ? 'check-mark-circle' : 'exclamation-triangle'"
      />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-detail-grid">
      <div class="rp-detail-main">
        <!-- File browser (repo root) -->
        <nldd-card accessible-label="Bestanden">
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Bestanden</h2></nldd-title>
              <nldd-tag color="neutral" size="md">main</nldd-tag>
            </div>
            <nldd-spacer size="8" />
            <p class="rp-lastcommit">
              <nldd-icon name="clock" aria-hidden="true"></nldd-icon>
              <strong>{{ authorName(lastCommit.by) }}</strong>
              <span>{{ lastCommit.msg }}</span>
              <span class="rp-lastcommit-when">{{ lastCommit.when }}</span>
            </p>
            <nldd-spacer size="12" />
            <ul class="rp-filetree">
              <li v-for="f in fileTree" :key="f.name" :class="{ 'rp-file-dir': f.kind === 'dir' }">
                <nldd-icon :name="f.icon" aria-hidden="true"></nldd-icon>
                <span class="rp-file-name">{{ f.name }}</span>
                <nldd-tag v-if="f.note" color="neutral" size="md">{{ f.note }}</nldd-tag>
              </li>
            </ul>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- README -->
        <nldd-card accessible-label="README">
          <nldd-container padding="24">
            <div class="rp-readme-head">
              <nldd-icon name="books-vertical" aria-hidden="true"></nldd-icon>
              <nldd-title size="4"><h2>README.md</h2></nldd-title>
            </div>
            <nldd-spacer size="8" />
            <nldd-rich-text>
              <p v-for="(para, i) in readme.body" :key="i">{{ para }}</p>
            </nldd-rich-text>
            <nldd-spacer size="16" />
            <nldd-title size="5"><h3>Lokaal draaien</h3></nldd-title>
            <nldd-spacer size="8" />
            <nldd-code-viewer language="bash">{{ `git clone ${cloneUrl}\n${readme.run}` }}</nldd-code-viewer>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- Pull requests -->
        <nldd-card accessible-label="Open pull requests">
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Open pull requests</h2></nldd-title>
              <nldd-tag color="accent" size="md">{{ repo.openPrs }}</nldd-tag>
            </div>
            <nldd-spacer size="12" />
            <DataTable v-if="prRows.length" :columns="prColumns" :rows="prRows" row-key="id">
              <template #cell="{ row, col, value }">
                <router-link
                  v-if="col.key === 'author'"
                  :to="`/teams/mensen/${prs[row.id].author}`"
                  class="rp-inline-link"
                >{{ value }}</router-link>
                <span v-else :class="{ 'rp-mono-cell': col.mono }">{{ value }}</span>
              </template>
            </DataTable>
            <nldd-rich-text v-else><p>Geen open pull requests. Schoon werk.</p></nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- Issues -->
        <nldd-card accessible-label="Open issues">
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Open issues</h2></nldd-title>
              <nldd-tag color="accent" size="md">{{ repo.openIssues }}</nldd-tag>
            </div>
            <nldd-spacer size="12" />
            <!-- Label filter: only worth showing when there is more than one label. -->
            <div v-if="allIssueRows.length && issueLabels.length > 1" class="rp-issue-filter">
              <nldd-button
                :variant="issueLabel === 'all' ? 'primary' : 'secondary'"
                size="sm"
                text="Alle"
                @click="pickIssueLabel('all')"
              ></nldd-button>
              <nldd-button
                v-for="lbl in issueLabels"
                :key="lbl"
                :variant="issueLabel === lbl ? 'primary' : 'secondary'"
                size="sm"
                :text="lbl"
                @click="pickIssueLabel(lbl)"
              ></nldd-button>
            </div>
            <nldd-spacer v-if="allIssueRows.length && issueLabels.length > 1" size="12" />
            <DataTable v-if="issueRows.length" :columns="issueColumns" :rows="issueRows" row-key="id">
              <template #cell="{ col, value }">
                <nldd-tag
                  v-if="col.key === 'label'"
                  :color="LABEL_COLOR[value] || 'neutral'"
                  size="md"
                >{{ value }}</nldd-tag>
                <span v-else :class="{ 'rp-mono-cell': col.mono }">{{ value }}</span>
              </template>
            </DataTable>
            <nldd-rich-text v-else><p>Geen open issues.</p></nldd-rich-text>
            <template v-if="issuesMore > 0">
              <nldd-spacer size="12" />
              <nldd-button
                variant="secondary"
                :text="`Toon meer (nog ${issuesMore})`"
                start-icon="chevron-down"
                @click="issueLimit += 10"
              ></nldd-button>
            </template>
          </nldd-container>
        </nldd-card>
      </div>

      <div class="rp-detail-side">
        <!-- Open-source compliance -->
        <nldd-card accessible-label="Open-source compliance">
          <nldd-container padding="20">
            <div class="rp-section-head">
              <nldd-title size="5"><h3>Open-source compliance</h3></nldd-title>
              <nldd-tag
                :color="complianceScore.ok === complianceScore.total ? 'success' : 'warning'"
                size="md"
              >{{ complianceScore.ok }}/{{ complianceScore.total }}</nldd-tag>
            </div>
            <nldd-spacer size="12" />
            <ul class="rp-checklist">
              <li v-for="c in compliance" :key="c.key" class="rp-check">
                <nldd-icon
                  :name="c.ok ? 'check-mark-circle' : 'exclamation-triangle'"
                  aria-hidden="true"
                  :class="['rp-check-icon', c.ok ? 'is-ok' : 'is-warn']"
                ></nldd-icon>
                <div>
                  <div class="rp-check-label">{{ c.label }}</div>
                  <div class="rp-check-detail">{{ c.detail }}</div>
                </div>
              </li>
            </ul>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <!-- CI / security at a glance -->
        <nldd-card accessible-label="CI en beveiliging">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>CI &amp; beveiliging</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-kv">
              <span>Laatste pipeline</span>
              <StatusBadge :status="repo.ci" />
            </div>
            <div v-if="ciPool" class="rp-kv">
              <span>Draait op runner</span>
              <router-link to="/environments/runners" class="rp-link">{{ ciPool.name }}</router-link>
            </div>
            <div class="rp-kv">
              <span>Secret-scan</span>
              <nldd-tag
                :color="vulns.every((v) => v.status === 'opgelost') ? 'success' : 'critical'"
                size="md"
              >{{ vulns.every((v) => v.status === 'opgelost') ? 'schoon' : 'bevinding' }}</nldd-tag>
            </div>
            <div class="rp-kv">
              <span>Dependency-scan</span>
              <nldd-tag :color="vulns.length ? 'warning' : 'success'" size="md">
                {{ vulns.length ? `${vulns.length} CVE` : 'geen' }}
              </nldd-tag>
            </div>
            <template v-if="vulns.length">
              <nldd-spacer size="12" />
              <nldd-list>
                <nldd-list-item v-for="v in vulns" :key="v.id">
                  <nldd-text-cell>
                    <nldd-icon name="shield-check-mark" aria-hidden="true" slot="start"></nldd-icon>
                    {{ v.cve }}
                  </nldd-text-cell>
                  <StatusBadge :status="v.severity" slot="end" />
                </nldd-list-item>
              </nldd-list>
            </template>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="20" />

        <RelationLinks
          v-if="relationLinks.length"
          title="Gekoppeld aan"
          :links="relationLinks"
        />
      </div>
    </div>

    <nldd-spacer size="24" />

    <CliHint :command="`git clone ${cloneUrl}`" label="Clone via de terminal:" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Repository niet gevonden" :crumbs="[{ text: 'Code', href: '/code' }]" />
    <nldd-inline-dialog
      title="Onbekende repository"
      supporting-text="Deze repository bestaat niet of is verplaatst."
    ></nldd-inline-dialog>
    <nldd-spacer size="16" />
    <nldd-button variant="primary" text="Terug naar overzicht" start-icon="arrow-right" @click="$router.push('/code')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-meta-tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-tag-icon {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
  vertical-align: -1px;
}
.rp-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: 1.25rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-detail-grid {
    grid-template-columns: 1fr;
  }
}
.rp-lastcommit {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 0.88rem;
  opacity: 0.85;
}
.rp-lastcommit nldd-icon {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
}
.rp-lastcommit span:not(.rp-lastcommit-when) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-lastcommit-when {
  margin-left: auto;
  opacity: 0.6;
  flex: 0 0 auto;
}
.rp-filetree {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
  overflow: hidden;
}
.rp-filetree li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  font-size: 0.92rem;
}
.rp-filetree li:last-child {
  border-bottom: none;
}
.rp-filetree li:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-filetree nldd-icon {
  width: 1.05rem;
  height: 1.05rem;
  flex: 0 0 auto;
  opacity: 0.7;
}
.rp-file-dir .rp-file-name {
  font-weight: 600;
}
.rp-file-name {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.88rem;
}
.rp-filetree li nldd-tag {
  margin-left: auto;
}
.rp-readme-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-readme-head nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.7;
}
.rp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-issue-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-inline-link {
  color: var(--semantics-action-default-color, inherit);
  text-decoration: none;
}
.rp-inline-link:hover {
  text-decoration: underline;
}
.rp-mono-cell {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-checklist {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.rp-check {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
}
.rp-check-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex: none;
  margin-top: 0.1rem;
}
.rp-check-icon.is-ok {
  color: var(--semantics-status-success-color);
}
.rp-check-icon.is-warn {
  color: var(--semantics-status-warning-color);
}
.rp-check-label {
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-check-detail {
  font-size: 0.8rem;
  opacity: 0.65;
}
.rp-kv {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.35rem 0;
}
.rp-kv .rp-link {
  color: var(--semantics-actions-primary-default-background-color);
  text-decoration: none;
  font-weight: 600;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.9rem;
}
.rp-kv .rp-link:hover {
  text-decoration: underline;
}
.rp-kv span {
  font-size: 0.9rem;
  opacity: 0.85;
}
</style>
