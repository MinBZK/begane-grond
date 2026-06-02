<script setup>
// Scans & audits: a security pipeline view across every repo. Four scanner
// types (dependency, container, secret, pentest) produce green/red results per
// repo, derived from the seed (CI status, open vulnerabilities, license) so the
// board is varied but stable. "Scan opnieuw" re-runs a scanner with a short
// in-flight state and writes to the audit log. Below: the running audit trail
// from the store, filtered to security-relevant actions.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// The four scanner types shown as columns on the board.
const SCANNERS = [
  { id: 'dependency', name: 'Dependency-scan', icon: 'folder-stack', desc: 'Bekende CVEs in dependencies (SCA)' },
  { id: 'container', name: 'Container-scan', icon: 'cloud', desc: 'Base-image en OS-pakketten (Trivy)' },
  { id: 'secret', name: 'Secret-scan', icon: 'lock-closed', desc: 'Hardcoded secrets in de git-historie' },
  { id: 'pentest', name: 'Pentest', icon: 'shield-check-mark', desc: 'Periodieke handmatige penetratietest' },
];

// Deterministic result per repo+scanner, from real-ish signals.
function scanResult(repo, scanner) {
  const openVuln = store.vulnerabilities.find((v) => v.repo === repo.id && v.status !== 'opgelost');
  if (scanner === 'dependency') {
    if (openVuln) return { pass: false, findings: openVuln.severity === 'critical' ? 2 : 1, note: openVuln.cve };
    return { pass: true, findings: 0, note: 'geen kwetsbare dependencies' };
  }
  if (scanner === 'container') {
    // Repos with red CI are assumed to ship an outdated base image.
    if (repo.ci === 'red') return { pass: false, findings: 3, note: 'verouderde base-image' };
    return { pass: true, findings: 0, note: 'image up-to-date' };
  }
  if (scanner === 'secret') {
    // Demo: one specific repo has a flagged historic secret.
    if (repo.id === 'repo-toeslagen') return { pass: false, findings: 1, note: 'API-key in oude commit' };
    return { pass: true, findings: 0, note: 'schoon' };
  }
  // pentest: only mature repos have a recent clean pentest; brons/open issues pending.
  const app = store.appById(repo.app);
  if (!app) return { pass: true, findings: 0, note: 'n.v.t. (geen app)' };
  if (app.maturity === 'goud') return { pass: true, findings: 0, note: 'laatste pentest groen' };
  if (app.maturity === 'zilver') return { pass: false, findings: 1, note: '1 medium-bevinding open' };
  return { pass: true, findings: 0, note: 'gepland Q3' };
}

// Build the full board: per repo, a result per scanner.
const board = computed(() =>
  store.repos.map((repo) => {
    const results = {};
    for (const sc of SCANNERS) results[sc.id] = scanResult(repo, sc.id);
    const failed = Object.values(results).filter((r) => !r.pass).length;
    return { repo, app: store.appById(repo.app), results, failed };
  }),
);

// Per-scanner rollup for the headline tiles.
function scannerPass(scannerId) {
  return board.value.filter((row) => row.results[scannerId].pass).length;
}
const totalRuns = computed(() => board.value.length * SCANNERS.length);
const totalFindings = computed(() =>
  board.value.reduce(
    (sum, row) => sum + Object.values(row.results).reduce((s, r) => s + r.findings, 0),
    0,
  ),
);
const cleanRepos = computed(() => board.value.filter((row) => row.failed === 0).length);

// At scale the board has one row per repository (hundreds). Rendering all of
// them at once makes the page unmanageably long and buries the repos that
// actually need attention. Filter by query + status and cap the rendered rows,
// defaulting the view to repos with open findings.
const query = ref('');
const statusFilter = ref('bevindingen'); // 'bevindingen' | 'schoon' | 'alle'
const limit = ref(25);
const STATUS_OPTIONS = [
  { id: 'bevindingen', label: 'Met bevindingen' },
  { id: 'schoon', label: 'Schoon' },
  { id: 'alle', label: 'Alle repos' },
];

const filteredBoard = computed(() => {
  const q = query.value.trim().toLowerCase();
  return board.value.filter((row) => {
    if (statusFilter.value === 'bevindingen' && row.failed === 0) return false;
    if (statusFilter.value === 'schoon' && row.failed > 0) return false;
    if (!q) return true;
    return (
      row.repo.name.toLowerCase().includes(q) ||
      row.repo.id.toLowerCase().includes(q) ||
      (row.app?.name || '').toLowerCase().includes(q)
    );
  });
});
const visibleBoard = computed(() => filteredBoard.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filteredBoard.value.length - limit.value));
const failingRepos = computed(() => board.value.filter((row) => row.failed > 0).length);
function setStatusFilter(id) {
  statusFilter.value = id;
  limit.value = 25;
}

// Re-run a single scanner on a repo: brief spinner, then re-audit. Result is
// deterministic so it stays the same, but the audit trail records the run.
const running = ref({}); // key `${repoId}:${scannerId}` -> true
async function rescan(row, scanner) {
  const key = `${row.repo.id}:${scanner.id}`;
  running.value = { ...running.value, [key]: true };
  await new Promise((r) => setTimeout(r, 700));
  store.audit('scan uitgevoerd', `${scanner.name} @ ${row.repo.name}`);
  const next = { ...running.value };
  delete next[key];
  running.value = next;
}
const isRunning = (row, scanner) => !!running.value[`${row.repo.id}:${scanner.id}`];

// Run every scanner over every repo at once (the "volledige scan" button).
async function rescanAll() {
  const all = {};
  for (const row of board.value) for (const sc of SCANNERS) all[`${row.repo.id}:${sc.id}`] = true;
  running.value = all;
  await new Promise((r) => setTimeout(r, 900));
  store.audit('volledige securityscan', `${store.repos.length} repos`);
  running.value = {};
}

// Audit overview: surface security-relevant actions from the store's audit log.
const SECURITY_TERMS = ['scan', 'secret', 'vuln', 'security', 'incident', 'certificaat'];
const auditMatches = computed(() =>
  store.auditLog.filter((a) =>
    SECURITY_TERMS.some((t) => `${a.action} ${a.resource}`.toLowerCase().includes(t)),
  ),
);
// The audit log grows without bound; show only the most recent entries with a
// "toon meer" affordance so the page stays readable.
const auditLimit = ref(12);
const auditRows = computed(() => auditMatches.value.slice(0, auditLimit.value));
const auditMoreCount = computed(() => Math.max(0, auditMatches.value.length - auditLimit.value));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Scans & audits"
      lede="Geautomatiseerde securitypipeline over alle repositories: dependency-, container- en secret-scans plus periodieke pentests. Groen is schoon, rood vraagt opvolging. Onderaan loopt het auditspoor mee."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Security', href: '/security' }, { text: 'Scans & audits', href: '/security/scans' }]"
    >
      <template #actions>
        <router-link to="/security/kwetsbaarheden">
          <nldd-button variant="secondary" text="Kwetsbaarheden" start-icon="exclamation-triangle"></nldd-button>
        </router-link>
        <nldd-button variant="primary" text="Volledige scan" start-icon="magnifier" @click="rescanAll"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="totalRuns" label="Scan-resultaten" sub="over alle repos en scanners" icon="magnifier" />
      <MetricCard :value="cleanRepos + '/' + board.length" label="Schone repos" sub="alle scanners groen" icon="check-mark-circle" />
      <MetricCard :value="totalFindings" label="Open bevindingen" :sub="totalFindings ? 'te verhelpen' : 'niets open'" icon="exclamation-triangle" />
      <MetricCard :value="scannerPass('secret') + '/' + board.length" label="Secret-scan groen" sub="geen lekkende secrets" icon="lock-closed" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-title size="3"><h2>Scan-board</h2></nldd-title>
    <nldd-rich-text><p>Elke cel is de uitslag van één scanner op één repository. Klik op een uitslag om die scanner opnieuw te draaien.</p></nldd-rich-text>
    <nldd-spacer size="16" />

    <div class="rp-board-controls">
      <nldd-search-field
        class="rp-board-search"
        placeholder="Zoek op repository of app"
        accessible-label="Zoek repository"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <div class="rp-board-chips" role="group" aria-label="Filter op status">
        <nldd-button
          v-for="opt in STATUS_OPTIONS"
          :key="opt.id"
          :variant="statusFilter === opt.id ? 'primary' : 'secondary'"
          :text="opt.label"
          @click="setStatusFilter(opt.id)"
        ></nldd-button>
      </div>
    </div>
    <nldd-spacer size="8" />
    <p class="rp-board-count">
      {{ filteredBoard.length }} van {{ board.length }} repos · {{ failingRepos }} met open bevindingen
    </p>
    <nldd-spacer size="12" />

    <nldd-card>
      <nldd-container padding="0">
        <div class="rp-board-wrap">
          <table class="rp-board">
            <thead>
              <tr>
                <th class="rp-board-repo-h">Repository</th>
                <th v-for="sc in SCANNERS" :key="sc.id" :title="sc.desc">
                  <div class="rp-scanner-head">
                    <nldd-icon :name="sc.icon" aria-hidden="true"></nldd-icon>
                    <span>{{ sc.name }}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!visibleBoard.length">
                <td :colspan="SCANNERS.length + 1" class="rp-board-empty">
                  Geen repository gevonden voor deze filters.
                </td>
              </tr>
              <tr v-for="row in visibleBoard" :key="row.repo.id">
                <td class="rp-board-repo">
                  <router-link :to="`/code/${row.repo.id}`" class="rp-repo-link">{{ row.repo.name }}</router-link>
                  <span class="rp-repo-sub">
                    <router-link v-if="row.app" :to="`/apps/${row.app.id}`" class="rp-repo-sublink">{{ row.app.name }}</router-link>
                    <span v-else>geen gekoppelde app</span>
                  </span>
                </td>
                <td v-for="sc in SCANNERS" :key="sc.id">
                  <button
                    type="button"
                    class="rp-cell"
                    :class="row.results[sc.id].pass ? 'rp-cell-pass' : 'rp-cell-fail'"
                    :disabled="isRunning(row, sc) || undefined"
                    :title="`${sc.name}: ${row.results[sc.id].note}`"
                    @click="rescan(row, sc)"
                  >
                    <template v-if="isRunning(row, sc)">
                      <nldd-icon name="clock" aria-hidden="true" class="rp-cell-icon rp-spin"></nldd-icon>
                      <span class="rp-cell-text">scannen…</span>
                    </template>
                    <template v-else>
                      <nldd-icon
                        :name="row.results[sc.id].pass ? 'check-mark-circle' : 'exclamation-triangle'"
                        aria-hidden="true"
                        class="rp-cell-icon"
                      ></nldd-icon>
                      <span class="rp-cell-text">{{ row.results[sc.id].note }}</span>
                      <span v-if="row.results[sc.id].findings" class="rp-cell-count">{{ row.results[sc.id].findings }}</span>
                    </template>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </nldd-container>
    </nldd-card>

    <div v-if="moreCount > 0" class="rp-board-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="limit += 25"
      ></nldd-button>
    </div>

    <nldd-spacer size="16" />

    <div class="rp-legend">
      <span class="rp-legend-item"><span class="rp-swatch rp-swatch-pass"></span>Groen — schoon</span>
      <span class="rp-legend-item"><span class="rp-swatch rp-swatch-fail"></span>Rood — bevinding open</span>
      <span class="rp-legend-item"><nldd-icon name="clock" aria-hidden="true"></nldd-icon>Klik een cel om opnieuw te scannen</span>
    </div>

    <nldd-spacer size="16" />

    <CliHint command="bg fleet run --campaign securityscan --dry-run" label="Scannen kan ook in CI of via de CLI:" />

    <nldd-spacer size="32" />

    <nldd-title size="3"><h2>Auditspoor</h2></nldd-title>
    <nldd-rich-text><p>Onweerlegbaar logboek van security-acties: scans, rotaties en incidenten. Elke handeling op het platform laat een spoor na.</p></nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-card>
      <nldd-container padding="20">
        <nldd-list v-if="auditRows.length">
          <nldd-list-item v-for="a in auditRows" :key="a.id">
            <nldd-icon-cell slot="start" name="books-vertical"></nldd-icon-cell>
            <nldd-title-cell :text="a.action" :supporting-text="a.resource"></nldd-title-cell>
            <nldd-text-cell slot="end" :text="a.at"></nldd-text-cell>
          </nldd-list-item>
        </nldd-list>
        <div v-else class="rp-empty">
          <nldd-icon name="books-vertical" aria-hidden="true"></nldd-icon>
          <span>Nog geen security-acties gelogd. Draai een scan of roteer een secret.</span>
        </div>
        <div v-if="auditMoreCount > 0" class="rp-board-more">
          <nldd-button
            variant="secondary"
            :text="`Toon meer (nog ${auditMoreCount})`"
            start-icon="chevron-down"
            @click="auditLimit += 12"
          ></nldd-button>
        </div>
        <nldd-spacer size="12" />
        <div class="rp-audit-foot">
          <span>{{ auditRows.length }} van {{ auditMatches.length }} security-acties getoond</span>
          <span class="rp-actor">
            Laatste actie door
            <router-link :to="`/teams/mensen/${store.currentUser}`" class="rp-link">{{ store.personById(store.currentUser).name }}</router-link>
          </span>
        </div>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-board-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.rp-board-search {
  flex: 1 1 280px;
  min-width: 220px;
}
.rp-board-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-board-count {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-board-empty {
  text-align: center;
  opacity: 0.6;
  padding: 1.4rem 0.85rem;
}
.rp-board-more {
  display: flex;
  justify-content: center;
  margin-top: 0.85rem;
}
.rp-board-wrap {
  overflow-x: auto;
}
.rp-board {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.rp-board th,
.rp-board td {
  padding: 0.7rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  text-align: left;
  vertical-align: middle;
}
.rp-board thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-board tbody tr:last-child td {
  border-bottom: none;
}
.rp-board-repo-h {
  min-width: 220px;
}
.rp-scanner-head {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-scanner-head nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.8;
}
.rp-board-repo {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.rp-repo-link {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}
.rp-repo-link:hover {
  text-decoration: underline;
}
.rp-repo-sub {
  font-size: 0.76rem;
  opacity: 0.6;
}
.rp-repo-sublink {
  color: inherit;
  text-decoration: none;
}
.rp-repo-sublink:hover {
  text-decoration: underline;
}
.rp-cell {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  min-width: 150px;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font: inherit;
  text-align: left;
}
.rp-cell:hover {
  border-color: currentColor;
}
.rp-cell:disabled {
  cursor: progress;
  opacity: 0.8;
}
.rp-cell-pass {
  background: color-mix(in srgb, #2ea043 12%, transparent);
  color: #1a7f37;
}
.rp-cell-fail {
  background: color-mix(in srgb, #d23f3f 12%, transparent);
  color: #b3261e;
}
.rp-cell-icon {
  width: 1rem;
  height: 1rem;
  flex: none;
}
.rp-cell-text {
  flex: 1;
  font-size: 0.82rem;
  color: var(--semantics-text-default-color, #1b1b1b);
  opacity: 0.85;
}
.rp-cell-count {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  background: currentColor;
  color: #fff;
  border-radius: 999px;
  min-width: 1.3rem;
  text-align: center;
  padding: 0 0.3rem;
  font-size: 0.75rem;
}
.rp-cell-fail .rp-cell-count {
  color: #fff;
}
.rp-spin {
  animation: rp-spin 1s linear infinite;
}
@keyframes rp-spin {
  to {
    transform: rotate(360deg);
  }
}
.rp-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 0.82rem;
  opacity: 0.8;
}
.rp-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}
.rp-legend-item nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-swatch {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 4px;
  display: inline-block;
}
.rp-swatch-pass {
  background: #2ea043;
}
.rp-swatch-fail {
  background: #d23f3f;
}
.rp-empty {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  opacity: 0.6;
  padding: 1rem 0;
}
.rp-empty nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
}
.rp-audit-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.82rem;
  opacity: 0.75;
  flex-wrap: wrap;
}
.rp-link {
  color: var(--semantics-action-default-color, currentColor);
  text-decoration: none;
}
.rp-link:hover {
  text-decoration: underline;
}
</style>
