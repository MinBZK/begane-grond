<script setup>
// Compliance scorecards: per app a BIO-style scorecard over the platform's
// compliance controls (encryptie, logging, toegang, patch-status, back-ups,
// toegankelijkheid). Each control gets a green/orange/red rating; the card
// rolls those up into a percentage score and a letter grade. Values are
// derived deterministically from the seed (app maturity + repo CI + known
// open vulnerabilities) so the demo stays stable across refreshes but still
// looks like a real, varied audit.
import { ref, computed, watch } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

const controls = store.complianceControls;

// Human-readable label + icon + short "what it checks" per control.
const CONTROL_META = {
  encryptie: { label: 'Encryptie', icon: 'lock-closed', check: 'TLS in transit en at-rest, PKIoverheid-certificaten' },
  logging: { label: 'Logging', icon: 'books-vertical', check: 'Centrale logging, retentie en onweerlegbaarheid' },
  toegang: { label: 'Toegang', icon: 'shield-check-mark', check: 'RBAC, MFA en least-privilege' },
  'patch-status': { label: 'Patch-status', icon: 'arrow-up-arrow-down', check: 'Geen openstaande kritieke CVEs, tijdig patchen' },
  'back-ups': { label: 'Back-ups', icon: 'cloud', check: 'Geteste herstelprocedure, 3-2-1 strategie' },
  toegankelijkheid: { label: 'Toegankelijkheid', icon: 'eye', check: 'WCAG 2.2 AA voor frontends' },
};

// Rating vocabulary: groen=voldoet, oranje=aandacht, rood=voldoet niet.
const RATINGS = {
  groen: { color: 'success', score: 100, label: 'Voldoet', tag: 'groen' },
  oranje: { color: 'warning', score: 55, label: 'Aandacht', tag: 'oranje' },
  rood: { color: 'critical', score: 0, label: 'Voldoet niet', tag: 'rood' },
};

// Tiny deterministic hash so "plausible" ratings are stable per app+control.
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

// Derive a rating for one control on one app. Real signals first (CI red,
// open critical CVE, frontend a11y), then a stable pseudo-random fallback
// nudged by app maturity so gold apps score better than bronze.
function rateControl(app, control) {
  const repo = store.repoById(app.repo);
  const openVuln = store.vulnerabilities.find(
    (v) => v.app === app.id && v.status !== 'opgelost',
  );
  const isFrontend = app.type === 'website' || app.stack.includes('Vue') || app.stack.includes('NLDD');

  if (control === 'patch-status') {
    if (openVuln && openVuln.severity === 'critical') return 'rood';
    if (openVuln) return 'oranje';
  }
  if (control === 'toegankelijkheid') {
    if (!isFrontend) return 'groen'; // no UI surface, not applicable -> compliant
    return repo && repo.ci === 'green' ? 'groen' : 'oranje';
  }
  if (control === 'logging' && repo && repo.ci === 'red') return 'oranje';

  // Maturity bias: goud rarely fails, brons fails more often.
  const bias = { goud: 0, zilver: 1, brons: 2 }[app.maturity] ?? 1;
  const roll = (hash(`${app.id}:${control}`) % 10) + bias;
  if (roll >= 11) return 'rood';
  if (roll >= 8) return 'oranje';
  return 'groen';
}

// Build a full scorecard object per app.
const scorecards = computed(() =>
  store.apps.map((app) => {
    const cells = controls.map((c) => {
      const rating = rateControl(app, c);
      return { control: c, rating, ...RATINGS[rating], meta: CONTROL_META[c] };
    });
    const total = cells.reduce((sum, cell) => sum + cell.score, 0);
    const score = Math.round(total / cells.length);
    const greens = cells.filter((c) => c.rating === 'groen').length;
    const reds = cells.filter((c) => c.rating === 'rood').length;
    const team = store.teamById(app.team);
    return { app, team, cells, score, greens, reds, grade: gradeFor(score), gradeColor: gradeColor(score) };
  }),
);

// At platform scale there is a scorecard per application (100+), which renders
// as an unmanageable wall of cards. Filter on name/team/maturity plus a risk
// segment, then cap the grid at an initial N with a "toon meer" affordance.
const query = ref('');
const riskFilter = ref('all'); // all | risk | compliant
const limit = ref(24);

const RISK_SEGMENTS = [
  { id: 'all', label: 'Alle' },
  { id: 'risk', label: 'Met rode controls' },
  { id: 'compliant', label: 'Volledig compliant' },
];

const filteredScorecards = computed(() => {
  const q = query.value.trim().toLowerCase();
  return scorecards.value.filter((sc) => {
    if (riskFilter.value === 'risk' && sc.reds === 0) return false;
    if (riskFilter.value === 'compliant' && !(sc.reds === 0 && sc.score >= 90)) return false;
    if (!q) return true;
    return (
      sc.app.name.toLowerCase().includes(q) ||
      (sc.team?.name || '').toLowerCase().includes(q) ||
      sc.app.maturity.toLowerCase().includes(q)
    );
  });
});

const visibleScorecards = computed(() => filteredScorecards.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filteredScorecards.value.length - limit.value));

// Reset the cap whenever the filter set changes, so "toon meer" always starts fresh.
watch([query, riskFilter], () => {
  limit.value = 24;
});

function gradeFor(score) {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 55) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}
function gradeColor(score) {
  if (score >= 75) return 'success';
  if (score >= 55) return 'warning';
  return 'critical';
}

// Platform-wide rollup.
const avgScore = computed(() => {
  if (!scorecards.value.length) return 0;
  const sum = scorecards.value.reduce((s, sc) => s + sc.score, 0);
  return Math.round(sum / scorecards.value.length);
});
const fullyCompliant = computed(() => scorecards.value.filter((s) => s.reds === 0 && s.score >= 90).length);
const atRisk = computed(() => scorecards.value.filter((s) => s.reds > 0).length);

// Per-control rollup across all apps, for the "zwakste controls" overview.
const controlRollup = computed(() =>
  controls
    .map((c) => {
      const meta = CONTROL_META[c];
      const all = scorecards.value.map((sc) => sc.cells.find((cell) => cell.control === c));
      const greens = all.filter((x) => x.rating === 'groen').length;
      const reds = all.filter((x) => x.rating === 'rood').length;
      const pct = scorecards.value.length
        ? Math.round((greens / scorecards.value.length) * 100)
        : 0;
      return { control: c, meta, greens, reds, total: scorecards.value.length, pct };
    })
    .sort((a, b) => a.pct - b.pct),
);

// Detail drawer for one control of one app.
const focused = ref(null);
function focus(card, cell) {
  focused.value = { card, cell };
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Compliance-scorecards"
      lede="BIO-baseline per applicatie. Elke control is groen (voldoet), oranje (aandacht) of rood (voldoet niet). De scorekaart telt dat op tot een percentage en een cijfer. Signalen komen live uit CI, kwetsbaarheden en scans."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Security', href: '/security' }]"
    >
      <template #actions>
        <router-link to="/security/kwetsbaarheden">
          <nldd-button variant="secondary" text="Kwetsbaarheden" start-icon="exclamation-triangle"></nldd-button>
        </router-link>
        <router-link to="/security/scans">
          <nldd-button variant="secondary" text="Scans & audits" start-icon="shield-check-mark"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="avgScore + '%'" label="Gemiddelde compliance" sub="over alle applicaties" icon="shield-check-mark" />
      <MetricCard :value="fullyCompliant" label="Volledig compliant" sub="score ≥ 90% en geen rood" icon="check-mark-circle" />
      <MetricCard :value="atRisk" label="Met rode controls" :sub="atRisk ? 'directe opvolging nodig' : 'geen rode vlaggen'" icon="exclamation-triangle" />
      <MetricCard :value="controls.length" label="Controls per app" sub="BIO-baseline" icon="books-vertical" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Hoe lees je deze kaart?"
      supporting-text="Elke kolom is een control uit de BIO-baseline. Groen telt voor 100%, oranje voor 55%, rood voor 0%. Klik een cel aan voor de onderbouwing en wat er nodig is om hem groen te krijgen."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-toolbar">
      <nldd-search-field
        class="rp-search"
        placeholder="Zoek op applicatie, team of volwassenheid"
        accessible-label="Zoek scorekaart"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <div class="rp-segments" role="group" aria-label="Filter op risico">
        <nldd-button
          v-for="seg in RISK_SEGMENTS"
          :key="seg.id"
          :variant="riskFilter === seg.id ? 'primary' : 'secondary'"
          :text="seg.label"
          @click="riskFilter = seg.id"
        ></nldd-button>
      </div>
    </div>

    <nldd-spacer size="8" />
    <p class="rp-result-count">
      {{ filteredScorecards.length }} van {{ scorecards.length }} scorekaarten
    </p>
    <nldd-spacer size="16" />

    <div v-if="!filteredScorecards.length" class="rp-empty">
      <nldd-rich-text><p>Geen scorekaarten gevonden voor deze filters.</p></nldd-rich-text>
    </div>

    <div class="rp-cards">
      <nldd-card v-for="sc in visibleScorecards" :key="sc.app.id" :accessible-label="sc.app.name">
        <nldd-container padding="20">
          <div class="rp-card-head">
            <div class="rp-card-title">
              <nldd-icon name="rectangle-stack" aria-hidden="true" class="rp-app-icon"></nldd-icon>
              <div>
                <router-link :to="`/apps/${sc.app.id}`" class="rp-app-name">{{ sc.app.name }}</router-link>
                <div class="rp-app-sub">
                  <router-link :to="`/teams/${sc.team.id}`" class="rp-sub-link">{{ sc.team.name }}</router-link>
                  <span class="rp-dot">·</span>
                  <span>{{ sc.app.maturity }}</span>
                </div>
              </div>
            </div>
            <div class="rp-grade" :class="`rp-grade-${sc.gradeColor}`">
              <span class="rp-grade-letter">{{ sc.grade }}</span>
              <span class="rp-grade-score">{{ sc.score }}%</span>
            </div>
          </div>

          <nldd-spacer size="12" />

          <div class="rp-score-bar" :title="`${sc.score}% compliant`">
            <div
              v-for="cell in sc.cells"
              :key="cell.control"
              class="rp-bar-seg"
              :class="`rp-seg-${cell.color}`"
              :title="`${cell.meta.label}: ${cell.label}`"
            ></div>
          </div>

          <nldd-spacer size="16" />

          <div class="rp-controls">
            <button
              v-for="cell in sc.cells"
              :key="cell.control"
              type="button"
              class="rp-control"
              :class="`rp-control-${cell.color}`"
              @click="focus(sc, cell)"
            >
              <span class="rp-control-dot" :class="`rp-dot-${cell.color}`"></span>
              <nldd-icon :name="cell.meta.icon" aria-hidden="true" class="rp-control-icon"></nldd-icon>
              <span class="rp-control-label">{{ cell.meta.label }}</span>
              <nldd-tag :color="cell.color" size="md">{{ cell.label }}</nldd-tag>
            </button>
          </div>

          <nldd-spacer size="12" />

          <div class="rp-card-foot">
            <span class="rp-foot-item">
              <span class="rp-dot-success rp-control-dot"></span>{{ sc.greens }} groen
            </span>
            <span class="rp-foot-item">
              <span class="rp-dot-critical rp-control-dot"></span>{{ sc.reds }} rood
            </span>
            <router-link :to="`/apps/${sc.app.id}`" class="rp-foot-link">
              Naar applicatie
              <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
            </router-link>
          </div>
        </nldd-container>
      </nldd-card>
    </div>

    <div v-if="moreCount > 0" class="rp-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="limit += 24"
      ></nldd-button>
    </div>

    <nldd-spacer size="32" />

    <nldd-title size="3"><h2>Zwakste controls platform-breed</h2></nldd-title>
    <nldd-rich-text><p>Waar de hele organisatie nog winst kan boeken. Gesorteerd op het laagste percentage groene applicaties.</p></nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-card>
      <nldd-container padding="20">
        <div class="rp-rollup">
          <div v-for="r in controlRollup" :key="r.control" class="rp-rollup-row">
            <nldd-icon :name="r.meta.icon" aria-hidden="true" class="rp-rollup-icon"></nldd-icon>
            <div class="rp-rollup-label">
              <span class="rp-rollup-name">{{ r.meta.label }}</span>
              <span class="rp-rollup-check">{{ r.meta.check }}</span>
            </div>
            <div class="rp-rollup-bar">
              <div class="rp-rollup-fill" :class="r.pct >= 75 ? 'rp-seg-success' : r.pct >= 50 ? 'rp-seg-warning' : 'rp-seg-critical'" :style="{ width: r.pct + '%' }"></div>
            </div>
            <span class="rp-rollup-pct">{{ r.pct }}%</span>
            <span class="rp-rollup-count">{{ r.greens }}/{{ r.total }} apps</span>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-modal-dialog v-if="focused" :open="true" @close="focused = null">
      <div class="rp-drawer">
        <div class="rp-drawer-head">
          <nldd-title size="3"><h2>{{ focused.cell.meta.label }} — {{ focused.card.app.name }}</h2></nldd-title>
          <nldd-button variant="secondary" text="Sluiten" end-icon="dismiss" @click="focused = null"></nldd-button>
        </div>
        <nldd-spacer size="12" />
        <div class="rp-drawer-status">
          <nldd-tag :color="focused.cell.color" size="md">{{ focused.cell.label }}</nldd-tag>
          <span class="rp-drawer-score">weegt {{ focused.cell.score }}% mee</span>
        </div>
        <nldd-rich-text>
          <p><strong>Wat we toetsen:</strong> {{ focused.cell.meta.check }}</p>
        </nldd-rich-text>
        <nldd-rich-text v-if="focused.cell.rating === 'groen'">
          <p>Deze control voldoet aan de BIO-baseline. Geen actie nodig; bij de volgende periodieke audit wordt dit opnieuw geverifieerd.</p>
        </nldd-rich-text>
        <nldd-rich-text v-else-if="focused.cell.rating === 'oranje'">
          <p>Gedeeltelijk op orde. Er zijn aandachtspunten die binnen het kwartaal opgelost moeten zijn om afwaardering te voorkomen.</p>
        </nldd-rich-text>
        <nldd-rich-text v-else>
          <p>Deze control voldoet niet. Maak een issue aan op de repo en koppel het aan het eerstvolgende changemoment. Dit blokkeert promotie naar productie.</p>
        </nldd-rich-text>
        <nldd-spacer size="12" />
        <div class="rp-drawer-links">
          <router-link :to="`/apps/${focused.card.app.id}`">
            <nldd-button variant="secondary" text="Applicatie" start-icon="rectangle-stack"></nldd-button>
          </router-link>
          <router-link :to="`/code/${focused.card.app.repo}`">
            <nldd-button variant="secondary" text="Repository" start-icon="folder-stack"></nldd-button>
          </router-link>
          <router-link :to="`/teams/${focused.card.team.id}`">
            <nldd-button variant="secondary" text="Verantwoordelijk team" start-icon="person-2"></nldd-button>
          </router-link>
        </div>
      </div>
    </nldd-modal-dialog>
  </div>
</template>

<style scoped>
.rp-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.rp-search {
  flex: 1 1 280px;
  min-width: 220px;
}
.rp-segments {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-result-count {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.65;
}
.rp-empty {
  padding: 1.5rem 0;
  opacity: 0.75;
}
.rp-more {
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
}
.rp-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 1rem;
}
.rp-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.rp-card-title {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  min-width: 0;
}
.rp-app-icon {
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.7;
  flex: none;
  margin-top: 0.1rem;
}
.rp-app-name {
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  color: inherit;
}
.rp-app-name:hover {
  text-decoration: underline;
}
.rp-app-sub {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  opacity: 0.7;
  margin-top: 0.1rem;
}
.rp-sub-link {
  color: inherit;
  text-decoration: none;
}
.rp-sub-link:hover {
  text-decoration: underline;
}
.rp-dot {
  opacity: 0.5;
}
.rp-grade {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4.2rem;
  padding: 0.4rem 0;
  border-radius: 12px;
  flex: none;
}
.rp-grade-letter {
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1;
}
.rp-grade-score {
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0.9;
}
.rp-grade-success {
  background: color-mix(in srgb, #1a7f37 14%, transparent);
  color: #1a7f37;
}
.rp-grade-warning {
  background: color-mix(in srgb, #b35900 16%, transparent);
  color: #8a4500;
}
.rp-grade-critical {
  background: color-mix(in srgb, #b3261e 14%, transparent);
  color: #b3261e;
}
.rp-score-bar {
  display: flex;
  gap: 3px;
  height: 0.55rem;
}
.rp-bar-seg {
  flex: 1;
  border-radius: 3px;
}
.rp-seg-success {
  background: #2ea043;
}
.rp-seg-warning {
  background: #e6a23c;
}
.rp-seg-critical {
  background: #d23f3f;
}
.rp-controls {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-control {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 9px;
  background: var(--semantics-surfaces-tinted-background-color);
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: left;
  width: 100%;
}
.rp-control:hover {
  border-color: currentColor;
}
.rp-control-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  flex: none;
  display: inline-block;
}
.rp-dot-success {
  background: #2ea043;
}
.rp-dot-warning {
  background: #e6a23c;
}
.rp-dot-critical {
  background: #d23f3f;
}
.rp-control-icon {
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.7;
  flex: none;
}
.rp-control-label {
  font-weight: 600;
  font-size: 0.9rem;
  flex: 1;
}
.rp-card-foot {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.82rem;
  opacity: 0.85;
}
.rp-foot-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-foot-link {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: none;
  color: var(--semantics-action-default-color, currentColor);
}
.rp-foot-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-foot-link:hover {
  text-decoration: underline;
}
.rp-rollup {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.rp-rollup-row {
  display: grid;
  grid-template-columns: auto minmax(180px, 1.4fr) minmax(120px, 1fr) auto auto;
  align-items: center;
  gap: 0.85rem;
}
.rp-rollup-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.7;
}
.rp-rollup-label {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.rp-rollup-name {
  font-weight: 600;
}
.rp-rollup-check {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-rollup-bar {
  height: 0.5rem;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-rollup-fill {
  height: 100%;
  border-radius: 999px;
}
.rp-rollup-pct {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  min-width: 3ch;
  text-align: right;
}
.rp-rollup-count {
  font-size: 0.8rem;
  opacity: 0.65;
  white-space: nowrap;
}
.rp-drawer {
  max-width: 32rem;
}
.rp-drawer-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.rp-drawer-status {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}
.rp-drawer-score {
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-drawer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
@media (max-width: 720px) {
  .rp-rollup-row {
    grid-template-columns: auto 1fr auto;
  }
  .rp-rollup-bar,
  .rp-rollup-count {
    display: none;
  }
}
</style>
