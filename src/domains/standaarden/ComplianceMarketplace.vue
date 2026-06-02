<script setup>
// Compliance marketplace for "the Dutch standards" story. Reads the global
// standards catalogue from the store (NLDD, internet.nl, ADR, BIO, WCAG) and
// presents, per standard, an overall status plus a per-app
// "pas-toe-of-leg-uit" (comply-or-explain) score. Public-facing services get an
// internet.nl-style badge. All per-app scoring is derived locally from app
// metadata since the seed only carries the global standard status.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import InternetNlBadge from './InternetNlBadge.vue';
import ComplianceMatrix from './ComplianceMatrix.vue';

const store = usePlatformStore();

// Icon + one-line "why this matters" per standard kind, used on the cards.
const META = {
  Design: { icon: 'sparkles', tagline: 'Eén herkenbare rijkshuisstijl in elke interface.' },
  Internet: { icon: 'cloud', tagline: 'Moderne internetstandaarden: HTTPS, DNSSEC, DMARC, IPv6.' },
  API: { icon: 'link', tagline: 'Voorspelbare REST-API’s volgens de API Design Rules.' },
  Security: { icon: 'shield-check-mark', tagline: 'Baseline Informatiebeveiliging Overheid als ondergrens.' },
  Toegankelijkheid: { icon: 'eye', tagline: 'Bruikbaar voor iedereen, WCAG 2.2 niveau AA.' },
};

// Which standards apply to which kind of app. A website does not ship an API;
// an internal service is not bound to internet.nl the same way a public one is.
function appliesTo(std, app) {
  if (std.kind === 'API') return app.type === 'service';
  if (std.kind === 'Internet') return true;
  if (std.kind === 'Design' || std.kind === 'Toegankelijkheid') {
    return app.type === 'website' || app.type === 'service';
  }
  return true;
}

// Deterministic per-app verdict per standard, derived from app maturity, health
// and stack. Returns 'voldoet' | 'deels' | 'uitgezonderd' | 'n.v.t.'.
function verdict(std, app) {
  if (!appliesTo(std, app)) return 'n.v.t.';
  const goud = app.maturity === 'goud';
  const zilver = app.maturity === 'zilver';
  switch (std.kind) {
    case 'Design':
      if (app.stack.includes('NLDD') || app.stack.includes('Vue')) return 'voldoet';
      return app.type === 'website' ? 'deels' : 'n.v.t.';
    case 'Internet':
      if (goud) return 'voldoet';
      if (zilver) return 'deels';
      return 'voldoet';
    case 'API':
      if (goud) return 'voldoet';
      if (app.id === 'app-toeslagen') return 'deels';
      if (app.id === 'app-datadeling') return 'uitgezonderd';
      return 'deels';
    case 'Security':
      if (app.health === 'warn') return 'deels';
      return 'voldoet';
    case 'Toegankelijkheid':
      if (goud) return 'voldoet';
      if (zilver) return 'deels';
      return 'deels';
    default:
      return 'voldoet';
  }
}

// "Leg uit" rationale shown when an app does not (fully) comply.
const EXEMPTION = {
  'app-toeslagen|std-adr': 'Legacy v1-endpoints volgen nog niet de ADR-naamgeving. Migratie gepland in Q3 (RFC-2025-014).',
  'app-toeslagen|std-internetnl': 'IPv6 op de mailrelay staat nog uit; DNSSEC en HTTPS zijn groen.',
  'app-toeslagen|std-bio': 'Twee BIO-maatregelen rond logging-retentie staan op "deels" na de laatste audit.',
  'app-toeslagen|std-wcag': 'Het rekenoverzicht heeft contrastfouten op twee schermen; fix in sprint 24.',
  'app-datadeling|std-adr': 'Uitgezonderd: dit is een interne koppelvlak-API zonder publiek contract, ADR niet verplicht.',
  'app-datadeling|std-wcag': 'Headless data-API zonder UI; WCAG geldt alleen voor de bijbehorende docs-site.',
  'app-platformportaal|std-internetnl': 'Volledig groen op internet.nl, geen openstaande punten.',
};

function exemptionFor(std, app) {
  return EXEMPTION[`${app.id}|${std.id}`] || '';
}

// Per-standard coverage across all applicable apps -> overall score for the card.
const standardsView = computed(() =>
  store.standards.map((std) => {
    const apps = store.apps.filter((a) => appliesTo(std, a));
    const verdicts = apps.map((a) => verdict(std, a));
    const full = verdicts.filter((v) => v === 'voldoet').length;
    const partial = verdicts.filter((v) => v === 'deels').length;
    const exempt = verdicts.filter((v) => v === 'uitgezonderd').length;
    const total = apps.length || 1;
    const score = Math.round(((full + exempt + partial * 0.5) / total) * 100);
    return {
      ...std,
      meta: META[std.kind] || { icon: 'certificate', tagline: '' },
      apps,
      full,
      partial,
      exempt,
      total: apps.length,
      score,
      // Marketplace plugin (if any) whose AI-skills cover this standard, so the
      // card can offer to install the assistant that knows this standard.
      plugin: store.pluginForStandard(std.id),
    };
  })
);

// KPI roll-up.
const totalApps = computed(() => store.apps.length);
const publicApps = computed(() =>
  store.apps.filter((a) => {
    const repo = store.repoById(a.repo);
    return repo && repo.visibility === 'open';
  })
);
const avgScore = computed(() => {
  const s = standardsView.value;
  return Math.round(s.reduce((acc, x) => acc + x.score, 0) / (s.length || 1));
});
const openPoints = computed(() =>
  standardsView.value.reduce((acc, x) => acc + x.partial, 0)
);

// Detail modal state.
const selected = ref(null);
function open(std) {
  selected.value = std;
  store.audit('compliance.view', std.id);
}
function close() {
  selected.value = null;
}

function teamName(app) {
  const t = store.teamById(app.team);
  return t ? t.name : 'geen team';
}

function isPublic(app) {
  const repo = store.repoById(app.repo);
  return repo && repo.visibility === 'open';
}

const detailLinks = computed(() => {
  if (!selected.value) return [];
  return selected.value.apps.slice(0, 4).map((a) => ({
    text: a.name,
    to: `/apps/${a.id}`,
    icon: 'rectangle-stack',
  }));
});

function scoreColor(score) {
  if (score >= 90) return 'success';
  if (score >= 70) return 'warning';
  return 'critical';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Standaarden &amp; compliance"
      lede="Eén marktplaats voor &lsquo;volgens de Nederlandse standaarden&rsquo;. Per standaard de status van het platform en per applicatie een pas-toe-of-leg-uit-score."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Standaarden', href: '/standaarden' }]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="Compliance-rapport"
          start-icon="books-vertical"
          @click="store.audit('compliance.report', 'all')"
        ></nldd-button>
        <nldd-button
          variant="primary"
          text="Standaard toevoegen"
          start-icon="plus"
          @click="store.audit('compliance.add-standard', 'new')"
        ></nldd-button>
      </template>
    </PageHeader>

    <!-- KPI strip -->
    <nldd-collection layout="grid" item-width="240px">
      <MetricCard
        :value="store.standards.length"
        label="Standaarden in de catalogus"
        sub="NLDD, internet.nl, ADR, BIO, WCAG"
        icon="certificate"
      />
      <MetricCard
        :value="avgScore + '%'"
        label="Gemiddelde naleving"
        sub="gewogen pas-toe-of-leg-uit"
        icon="check-mark-circle"
      />
      <MetricCard
        :value="publicApps.length + ' / ' + totalApps"
        label="Publieke diensten"
        sub="met internet.nl-badge"
        icon="cloud"
      />
      <MetricCard
        :value="openPoints"
        label="Openstaande punten"
        sub="op &lsquo;deels&rsquo; met een leg-uit"
        icon="exclamation-triangle"
      />
    </nldd-collection>

    <nldd-spacer size="28" />

    <!-- The marketplace: one card per standard -->
    <nldd-title size="3"><h2>Standaarden-marktplaats</h2></nldd-title>
    <nldd-rich-text>
      <p>
        Het Begane Grond werkt &lsquo;open en volgens de standaarden&rsquo;. Elke standaard hieronder
        is een afspraak die je app via de golden path automatisch erft. Klik door voor de
        naleving per applicatie en de onderbouwing waar iets nog niet voldoet.
      </p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="340px">
      <nldd-card
        v-for="std in standardsView"
        :key="std.id"
        class="rp-std-card"
        @click="open(std)"
      >
        <nldd-container padding="20">
          <div class="rp-std-head">
            <div class="rp-std-icon" :class="'rp-kind-' + std.kind.toLowerCase()">
              <nldd-icon :name="std.meta.icon" aria-hidden="true"></nldd-icon>
            </div>
            <div class="rp-std-titles">
              <nldd-title size="5"><h3>{{ std.name }}</h3></nldd-title>
              <span class="rp-std-kind">{{ std.kind }}</span>
            </div>
            <StatusBadge :status="std.status" />
          </div>

          <nldd-rich-text class="rp-std-tagline"><p>{{ std.meta.tagline }}</p></nldd-rich-text>

          <!-- An AI-skill plugin knows this standard: link to the marketplace. -->
          <router-link
            v-if="std.plugin"
            to="/ai/skills"
            class="rp-std-skill"
            @click.stop
            :title="'AI-skill: ' + std.plugin.name"
          >
            <nldd-icon name="sparkles" aria-hidden="true"></nldd-icon>
            <span>AI-skill beschikbaar</span>
          </router-link>

          <!-- Score bar -->
          <div class="rp-score-row">
            <span class="rp-score-label">Naleving</span>
            <span class="rp-score-val">{{ std.score }}%</span>
          </div>
          <div class="rp-score-bar">
            <div
              class="rp-score-fill"
              :class="'rp-fill-' + scoreColor(std.score)"
              :style="{ width: std.score + '%' }"
            ></div>
          </div>

          <nldd-spacer size="12" />

          <!-- Per-app verdict chips -->
          <div class="rp-app-chips">
            <span
              v-for="a in std.apps"
              :key="a.id"
              class="rp-app-chip"
              :class="'rp-v-' + verdict(std, a).replace('.', '').replace(/\s/g, '')"
              :title="a.name + ': ' + verdict(std, a)"
            >{{ a.name }}</span>
            <span v-if="!std.apps.length" class="rp-app-chip rp-v-nvt">Niet app-gebonden</span>
          </div>

          <nldd-spacer size="12" />
          <div class="rp-std-foot">
            <span>{{ std.full }} voldoet · {{ std.partial }} deels · {{ std.exempt }} uitgezonderd</span>
            <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
          </div>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- RegelRecht: laws published as executable specs -->
    <nldd-title size="3"><h2>Juridische uitvoerbaarheid</h2></nldd-title>
    <nldd-rich-text>
      <p>
        Naast de technische standaarden hoort ook de wet zelf machine-leesbaar te zijn. Met
        RegelRecht wordt een wettekst een uitvoerbare specificatie: getest met scenario's en
        gepubliceerd als draaiende dienst.
      </p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="340px">
      <router-link to="/wetten" class="rp-jur-link">
        <nldd-card class="rp-std-card" accessible-label="Machine-leesbare wet (RegelRecht)">
          <nldd-container padding="20">
            <div class="rp-std-head">
              <div class="rp-std-icon rp-kind-juridisch">
                <nldd-icon name="certificate" aria-hidden="true"></nldd-icon>
              </div>
              <div class="rp-std-titles">
                <nldd-title size="5"><h3>Wet- en regelgeving uitvoeren</h3></nldd-title>
                <span class="rp-std-kind">Juridisch</span>
              </div>
              <nldd-tag color="accent" size="md">RegelRecht</nldd-tag>
            </div>

            <nldd-rich-text class="rp-std-tagline">
              <p>Wetten gepubliceerd als uitvoerbare specificaties, getoetst en als dienst uitgerold.</p>
            </nldd-rich-text>

            <nldd-spacer size="12" />
            <div class="rp-std-foot">
              <span>{{ store.wetten.filter((w) => w.status === 'gepubliceerd').length }} gepubliceerde wetten</span>
              <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- internet.nl badge wall for public services -->
    <nldd-title size="3"><h2>Internet.nl-badges voor publieke diensten</h2></nldd-title>
    <nldd-rich-text>
      <p>
        Publieke diensten dragen een internet.nl-badge: de meting van moderne internetstandaarden
        (HTTPS, DNSSEC, DMARC, IPv6). Klik een badge om de bijbehorende app te openen.
      </p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="300px">
      <InternetNlBadge
        v-for="a in publicApps"
        :key="a.id"
        :app="a"
        :score="verdict(store.standards.find((s) => s.id === 'std-internetnl'), a) === 'voldoet' ? 100 : 78"
        :passed="verdict(store.standards.find((s) => s.id === 'std-internetnl'), a) === 'voldoet'"
        :domain="store.repoById(a.repo) ? store.repoById(a.repo).name.split('/')[1] + '.overheid.nl' : a.id + '.overheid.nl'"
      />
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- Full comply-or-explain matrix -->
    <nldd-title size="3"><h2>Pas-toe-of-leg-uit matrix</h2></nldd-title>
    <nldd-rich-text>
      <p>Alle applicaties tegen alle standaarden. Klik op een vakje voor de onderbouwing.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <ComplianceMatrix
      :standards="store.standards"
      :apps="store.apps"
      :verdict="verdict"
      :exemption="exemptionFor"
      :team-name="teamName"
    />

    <nldd-spacer size="24" />
    <CliHint command="rp compliance check --all --format table" label="Genereer dit overzicht ook via de CLI:" />

    <!-- Standard detail modal -->
    <nldd-modal-dialog v-if="selected" :open="true" @close="close">
      <div class="rp-detail">
        <div class="rp-detail-head">
          <div>
            <nldd-title size="3"><h2>{{ selected.name }}</h2></nldd-title>
            <div class="rp-detail-sub">{{ selected.kind }} · {{ selected.meta.tagline }}</div>
          </div>
          <nldd-button variant="secondary" text="Sluiten" end-icon="dismiss" @click="close"></nldd-button>
        </div>

        <nldd-spacer size="16" />

        <div class="rp-detail-tags">
          <StatusBadge :status="selected.status" />
          <nldd-tag :color="scoreColor(selected.score)" size="md">{{ selected.score }}% naleving</nldd-tag>
          <nldd-tag color="neutral" size="md">{{ selected.total }} applicaties</nldd-tag>
        </div>

        <nldd-spacer size="20" />

        <nldd-title size="5"><h3>Pas-toe-of-leg-uit per applicatie</h3></nldd-title>
        <nldd-spacer size="12" />
        <nldd-list>
          <nldd-list-item v-for="a in selected.apps" :key="a.id">
            <div class="rp-row">
              <div class="rp-row-main">
                <router-link :to="`/apps/${a.id}`" class="rp-row-link">{{ a.name }}</router-link>
                <span class="rp-row-meta">{{ teamName(a) }} · {{ a.stack.join(' · ') }}</span>
                <span v-if="exemptionFor(selected, a)" class="rp-row-explain">
                  <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
                  {{ exemptionFor(selected, a) }}
                </span>
              </div>
              <StatusBadge :status="verdict(selected, a)" />
            </div>
          </nldd-list-item>
        </nldd-list>

        <nldd-spacer size="20" />
        <RelationLinks v-if="detailLinks.length" title="Doorklikken naar apps" :links="detailLinks" />

        <CliHint :command="'rp compliance check --standard ' + selected.id" label="Toets deze standaard ook via de CLI:" />
      </div>
    </nldd-modal-dialog>
  </div>
</template>

<style scoped>
.rp-std-card {
  cursor: pointer;
  height: 100%;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.rp-std-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
.rp-std-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-std-icon {
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f6);
}
.rp-std-icon nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
}
.rp-kind-design { background: #efe6fb; color: #5a2ea6; }
.rp-kind-internet { background: #e3f0fc; color: #15508f; }
.rp-kind-api { background: #e6f6ec; color: #1f7a45; }
.rp-kind-security { background: #fdeede; color: #97551a; }
.rp-kind-toegankelijkheid { background: #fde9ef; color: #9c2a55; }
.rp-kind-juridisch { background: #e7eefb; color: #1f3f86; }
.rp-jur-link { text-decoration: none; color: inherit; display: block; height: 100%; }
.rp-std-titles {
  flex: 1 1 auto;
  min-width: 0;
}
.rp-std-kind {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-std-tagline {
  margin-top: 0.6rem;
  font-size: 0.9rem;
  opacity: 0.85;
  min-height: 2.6em;
}
.rp-score-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin: 0.4rem 0 0.3rem;
}
.rp-score-label { opacity: 0.65; }
.rp-score-val { font-weight: 700; }
.rp-score-bar {
  height: 8px;
  border-radius: 999px;
  background: var(--semantics-dividers-color, #e2e5ea);
  overflow: hidden;
}
.rp-score-fill {
  height: 100%;
  border-radius: 999px;
}
.rp-fill-success { background: #2e8b57; }
.rp-fill-warning { background: #d98a1f; }
.rp-fill-critical { background: #c0392b; }
.rp-app-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.rp-app-chip {
  font-size: 0.72rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid transparent;
  white-space: nowrap;
}
.rp-v-voldoet { background: #e6f6ec; color: #1f7a45; border-color: #bfe6cd; }
.rp-v-deels { background: #fdf3e0; color: #97551a; border-color: #f0d9af; }
.rp-v-uitgezonderd { background: #eef1f6; color: #46506a; border-color: #d4dae6; }
.rp-v-nvt { background: #f4f5f7; color: #8a8f99; border-color: #e2e5ea; }
.rp-std-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.78rem;
  opacity: 0.7;
}
.rp-std-foot nldd-icon {
  width: 1rem;
  height: 1rem;
}

/* Modal */
.rp-detail {
  min-width: min(620px, 86vw);
  max-width: 720px;
}
.rp-detail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.rp-detail-sub {
  opacity: 0.65;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.rp-detail-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}
.rp-row-main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}
.rp-row-link {
  font-weight: 600;
  color: inherit;
  text-decoration: none;
}
.rp-row-link:hover {
  text-decoration: underline;
}
.rp-row-meta {
  font-size: 0.8rem;
  opacity: 0.6;
}
.rp-row-explain {
  font-size: 0.8rem;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.2rem;
}
.rp-row-explain nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
  flex: 0 0 auto;
  color: #d98a1f;
}
.rp-std-skill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.5rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.78rem;
  text-decoration: none;
  color: inherit;
}
.rp-std-skill:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-std-skill nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
}
</style>
