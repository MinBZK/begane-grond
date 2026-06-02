<script setup>
// Green IT for the Begane Grond. Where /kosten reads the platform through a
// euro lens, this screen reads the exact same instances through an *energy and
// CO2* lens: estimated kWh and emissions per service/app, rolled up per team,
// trended over the year, and tied back to MVI (maatschappelijk verantwoord
// inkopen / sustainable procurement) so the demo shows the full chain from a
// running pod to a purchase order.
//
// The energy model deliberately matches the one in /kosten (same KWH_PER_EURO,
// CO2_PER_KWH and per-datacenter PUE) so the two screens reconcile: this page
// is the sustainability sibling of the cost overview.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import DataTable from '../../components/shared/DataTable.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// --- Energy model (shared with /kosten) -------------------------------------
// Demo proxy: one euro of monthly compute stands for ~0.9 kWh of IT load. We
// multiply by the datacenter PUE for cooling/power overhead, and convert to CO2
// with the Dutch grid emission factor.
const KWH_PER_EURO = 0.9; // IT-load proxy
const CO2_PER_KWH = 0.27; // kg CO2 per kWh, NL grid mix
const HOURS_PER_MONTH = 730;

const pueOf = (dcId) => store.datacenterById(dcId)?.pue || 1.3;

function energyForInstance(inst) {
  const itKwh = (inst.costMonth || 0) * KWH_PER_EURO;
  const kwh = itKwh * pueOf(inst.dc);
  const co2 = kwh * CO2_PER_KWH;
  const watts = (kwh / HOURS_PER_MONTH) * 1000; // average draw incl. overhead
  return { kwh, co2, watts, itKwh };
}

// --- Totals -----------------------------------------------------------------
const enriched = computed(() =>
  store.instances.map((i) => ({ ...i, _e: energyForInstance(i) })),
);
const totalKwh = computed(() => enriched.value.reduce((s, i) => s + i._e.kwh, 0));
const totalCo2 = computed(() => enriched.value.reduce((s, i) => s + i._e.co2, 0));
const totalWatts = computed(() => enriched.value.reduce((s, i) => s + i._e.watts, 0));
// PUE overhead is the kWh spent on cooling/power that is *not* IT load.
const overheadKwh = computed(() =>
  enriched.value.reduce((s, i) => s + (i._e.kwh - i._e.itKwh), 0),
);
const overheadPct = computed(() =>
  totalKwh.value ? (overheadKwh.value / totalKwh.value) * 100 : 0,
);

// CO2 budget: a notional yearly cap so we can show "budget left" like the SLOs.
const CO2_BUDGET_YEAR = 6000; // kg/year
const co2Year = computed(() => totalCo2.value * 12);
const co2BudgetLeft = computed(() =>
  Math.max(0, Math.round((1 - co2Year.value / CO2_BUDGET_YEAR) * 100)),
);

// --- Formatting -------------------------------------------------------------
const fmtKwh = (n) => `${Math.round(n).toLocaleString('nl-NL')} kWh`;
const fmtCo2 = (n) => `${Math.round(n).toLocaleString('nl-NL')} kg`;
const fmtW = (n) => `${Math.round(n).toLocaleString('nl-NL')} W`;
const fmtEur = (n) => `€${Math.round(n).toLocaleString('nl-NL')}`;
const teamName = (id) => store.teamById(id)?.name || id;
const appName = (id) => store.appById(id)?.name || '—';
const dcName = (id) => store.datacenterById(id)?.name || id;

// Equivalence helpers to make abstract kWh tangible in the UI.
// ~1500 kWh average Dutch household per year -> 125 kWh/month.
const householdsEquiv = computed(() => (totalKwh.value / 125));
// A tree absorbs ~21 kg CO2 per year.
const treesEquiv = computed(() => Math.round(co2Year.value / 21));

// --- Shared team palette (matches /kosten) ----------------------------------
const TEAM_COLORS = {
  'team-platform': '#2563eb',
  'team-burgerzaken': '#0d9488',
  'team-toeslagen': '#d97706',
  'team-data': '#7c3aed',
};
const teamColor = (id) => TEAM_COLORS[id] || '#64748b';

// --- Per-team energy breakdown (SVG bars) -----------------------------------
const byTeam = computed(() => {
  const map = new Map();
  for (const i of enriched.value) {
    const cur = map.get(i.team) || { team: i.team, kwh: 0, co2: 0, count: 0 };
    cur.kwh += i._e.kwh;
    cur.co2 += i._e.co2;
    cur.count += 1;
    map.set(i.team, cur);
  }
  // Make sure every known team appears, even at 0, so the bar chart is complete.
  for (const t of store.teams) {
    if (!map.has(t.id)) map.set(t.id, { team: t.id, kwh: 0, co2: 0, count: 0 });
  }
  return [...map.values()]
    .map((r) => ({ ...r, name: teamName(r.team), color: teamColor(r.team) }))
    .sort((a, b) => b.kwh - a.kwh);
});
const maxTeamKwh = computed(() => Math.max(...byTeam.value.map((t) => t.kwh), 1));

// --- Per-app / service energy (SVG bars) ------------------------------------
const byApp = computed(() => {
  const rows = store.apps.map((a) => {
    const insts = enriched.value.filter((i) => i.app === a.id);
    const kwh = insts.reduce((s, i) => s + i._e.kwh, 0);
    const co2 = insts.reduce((s, i) => s + i._e.co2, 0);
    return {
      id: a.id, name: a.name, team: a.team, kwh, co2,
      count: insts.length, color: teamColor(a.team), maturity: a.maturity,
    };
  });
  // Platform-shared infra (instances with no app, e.g. the k8s cluster).
  const shared = enriched.value.filter((i) => !i.app);
  if (shared.length) {
    rows.push({
      id: null,
      name: 'Gedeelde platform-infra',
      team: 'team-platform',
      kwh: shared.reduce((s, i) => s + i._e.kwh, 0),
      co2: shared.reduce((s, i) => s + i._e.co2, 0),
      count: shared.length,
      color: teamColor('team-platform'),
      maturity: null,
    });
  }
  return rows.sort((a, b) => b.kwh - a.kwh);
});
const maxAppKwh = computed(() => Math.max(...byApp.value.map((a) => a.kwh), 1));

// --- Datacenter PUE comparison ----------------------------------------------
// Each datacenter: PUE plus the kWh our instances draw there. Lower PUE bar is
// better; we map PUE 1.0..1.5 onto the bar width so differences read clearly.
const dcRows = computed(() =>
  store.datacenters.map((dc) => {
    const insts = enriched.value.filter((i) => i.dc === dc.id);
    const kwh = insts.reduce((s, i) => s + i._e.kwh, 0);
    const itKwh = insts.reduce((s, i) => s + i._e.itKwh, 0);
    return {
      ...dc,
      kwh,
      overheadKwh: kwh - itKwh,
      count: insts.length,
      // 0..1 fill where 1.0 PUE is empty and 1.5 PUE is full.
      fill: Math.min(Math.max((dc.pue - 1) / 0.5, 0), 1) * 100,
      rating: dc.pue <= 1.25 ? 'A' : dc.pue <= 1.32 ? 'B' : 'C',
    };
  }),
);
const bestPue = computed(() =>
  [...store.datacenters].sort((a, b) => a.pue - b.pue)[0],
);

// --- CO2 trend (synthetic 12-month history, ending at the current monthly) ---
const trendMonths = ['jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec', 'jan', 'feb', 'mrt', 'apr', 'mei'];
const trendSeries = computed(() => {
  const end = totalCo2.value;
  // Gentle decline then a recent bump (extra Toeslagen replica's after the
  // incident), so the line tells a story rather than a straight ramp.
  const factors = [1.18, 1.14, 1.12, 1.08, 1.05, 1.02, 0.98, 0.95, 0.93, 0.95, 0.99, 1.0];
  return factors.map((f) => Math.round(end * f));
});
const trendPath = computed(() => {
  const w = 560;
  const h = 130;
  const pad = 10;
  const vals = trendSeries.value;
  const min = Math.min(...vals) * 0.9;
  const max = Math.max(...vals) * 1.04;
  const span = max - min || 1;
  const pts = vals.map((v, i) => {
    const x = pad + (i / (vals.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((v - min) / span) * (h - 2 * pad);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${h - pad} L${pts[0][0].toFixed(1)},${h - pad} Z`;
  return { line, area, pts, w, h };
});
const trendDelta = computed(() => {
  const s = trendSeries.value;
  const first = s[0] || 1;
  const last = s[s.length - 1] || 0;
  return Math.round(((last - first) / first) * 100);
});

// --- MVI / sustainable procurement link -------------------------------------
// Tie the running hardware back to the purchase orders, scored on MVI criteria
// so the procurement layer gets a green-IT readout. We derive a simple score
// from properties that exist in the seed (lead time, supplier, status).
const MVI_META = {
  'po-2024-031': { energyLabel: 'A', circular: 'terugname + refurbishment', score: 78, certified: true },
  'po-2024-044': { energyLabel: 'B', circular: 'onderdelen-recycling', score: 64, certified: true },
  'po-2024-058': { energyLabel: 'A', circular: 'staal, 90% recyclebaar', score: 82, certified: true },
  'po-2024-061': { energyLabel: 'B', circular: 'modulair vervangbaar', score: 60, certified: false },
};
const mviRows = computed(() =>
  store.procurement.map((p) => ({ ...p, ...(MVI_META[p.id] || { energyLabel: '?', circular: 'onbekend', score: 0, certified: false }) }))
    .sort((a, b) => b.score - a.score),
);
const mviAvg = computed(() => {
  const rows = mviRows.value.filter((r) => r.score > 0);
  return rows.length ? Math.round(rows.reduce((s, r) => s + r.score, 0) / rows.length) : 0;
});
const mviColumns = [
  { key: 'id', label: 'Inkoop', mono: true },
  { key: 'supplier', label: 'Leverancier' },
  { key: 'item', label: 'Artikel' },
  { key: 'energyLabel', label: 'Energielabel', align: 'center' },
  { key: 'circular', label: 'Circulariteit' },
  { key: 'status', label: 'Status' },
  { key: 'score', label: 'MVI-score', align: 'right' },
];

// --- Green coding / efficiency recommendations ------------------------------
// Actionable advice derived from the live data (idle dev/acc, oversized, etc).
const recommendations = computed(() => {
  const recs = [];
  const nonProd = enriched.value.filter((i) => i.env !== 'prod');
  if (nonProd.length) {
    const kwh = nonProd.reduce((s, i) => s + i._e.kwh, 0);
    recs.push({
      id: 'rec-scaledown',
      icon: 'clock',
      title: 'Niet-productie buiten kantooruren afschalen',
      detail: `${nonProd.length} acc/test/dev-instances draaien 24/7. Nachtelijk afschalen bespaart naar schatting ${fmtKwh(kwh * 0.45)} per maand.`,
      saving: kwh * 0.45,
      color: '#0d9488',
    });
  }
  if (bestPue.value) {
    const movable = enriched.value.filter((i) => i.dc !== bestPue.value.id && i.rack === null);
    const kwh = movable.reduce((s, i) => s + (i._e.kwh - i._e.itKwh), 0);
    recs.push({
      id: 'rec-pue',
      icon: 'apartment-building',
      title: `Verplaatsbare workloads naar ${bestPue.value.name}`,
      detail: `${bestPue.value.name} heeft de laagste PUE (${bestPue.value.pue}). Rackloze workloads daar plaatsen scheelt koel-overhead.`,
      saving: kwh,
      color: '#2563eb',
    });
  }
  recs.push({
    id: 'rec-greencoding',
    icon: 'sparkles',
    title: 'Green coding in de gebaande paden',
    detail: 'Efficiëntere queries, caching en rechtschalen van pods verlagen het verbruik bij de bron. Opnemen als scorecard-criterium.',
    saving: totalKwh.value * 0.08,
    color: '#7c3aed',
  });
  return recs;
});
const totalSaving = computed(() =>
  recommendations.value.reduce((s, r) => s + (r.saving || 0), 0),
);

// --- Service-level energy table ---------------------------------------------
const svcColumns = [
  { key: 'name', label: 'Instance' },
  { key: 'kind', label: 'Type' },
  { key: 'env', label: 'Omgeving' },
  { key: 'app', label: 'Dienst' },
  { key: 'dc', label: 'Datacenter' },
  { key: 'pue', label: 'PUE', align: 'right' },
  { key: 'watts', label: 'Vermogen', align: 'right' },
  { key: 'kwh', label: 'kWh/mnd', align: 'right' },
  { key: 'co2', label: 'CO2/mnd', align: 'right' },
];
const svcRows = computed(() =>
  [...enriched.value].sort((a, b) => b._e.kwh - a._e.kwh),
);

function exportFootprint() {
  store.audit('CO2-footprint geexporteerd', 'green-it-rapport');
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Green IT"
      lede="Energie- en CO2-voetafdruk van het Begane Grond. Verbruik per dienst en team, afgeleid uit de afgenomen infra en de PUE van elk datacenter, met een koppeling naar maatschappelijk verantwoord inkopen (MVI)."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Duurzaamheid', href: '/duurzaamheid' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Naar kosten" start-icon="euro-sign" @click="$router.push('/kosten')" />
        <nldd-button variant="primary" text="Exporteer CO2-rapport" start-icon="arrow-up-arrow-down" @click="exportFootprint" />
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-collection layout="grid" item-width="220px">
      <MetricCard
        :value="fmtKwh(totalKwh)"
        label="Energieverbruik"
        sub="per maand, incl. PUE"
        icon="cloud"
      />
      <MetricCard
        :value="fmtCo2(totalCo2)"
        label="CO2-uitstoot"
        :sub="`${CO2_PER_KWH} kg/kWh NL-mix`"
        icon="cloud"
      />
      <MetricCard
        :value="fmtW(totalWatts)"
        label="Gemiddeld vermogen"
        :sub="`${store.instances.length} diensten`"
        icon="cylinder-split"
        to="/infra/instances"
      />
      <MetricCard
        :value="`${co2BudgetLeft}%`"
        label="CO2-budget over"
        :sub="`van ${CO2_BUDGET_YEAR.toLocaleString('nl-NL')} kg/jaar`"
        icon="heart"
      />
    </nldd-collection>

    <nldd-spacer size="14" />

    <p class="rp-equiv">
      <nldd-icon name="sparkles" aria-hidden="true"></nldd-icon>
      Dat is vergelijkbaar met
      <strong>{{ householdsEquiv.toLocaleString('nl-NL', { maximumFractionDigits: 1 }) }}</strong>
      huishoudens aan stroom, en
      <strong>{{ treesEquiv.toLocaleString('nl-NL') }}</strong>
      bomen nodig om de jaarlijkse uitstoot te compenseren.
    </p>

    <nldd-spacer size="28" />

    <!-- Per-team + per-app energy bars -->
    <div class="rp-green-grid">
      <section>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Verbruik per team</h2></nldd-title>
              <nldd-tag color="neutral" size="md">{{ fmtKwh(totalKwh) }} / maand</nldd-tag>
            </div>
            <nldd-spacer size="16" />
            <ul class="rp-bars">
              <li v-for="t in byTeam" :key="t.team" class="rp-bar-row">
                <router-link :to="`/teams/${t.team}`" class="rp-bar-label">
                  <span class="rp-bar-dot" :style="{ background: t.color }"></span>
                  <span class="rp-bar-name">{{ t.name }}</span>
                </router-link>
                <div class="rp-bar-track">
                  <svg class="rp-bar-svg" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                    <rect x="0" y="2" width="100" height="8" rx="4" class="rp-bar-bg" />
                    <rect x="0" y="2" :width="(t.kwh / maxTeamKwh) * 100" height="8" rx="4" :fill="t.color" class="rp-bar-fill" />
                  </svg>
                </div>
                <div class="rp-bar-figs">
                  <strong>{{ fmtKwh(t.kwh) }}</strong>
                  <span class="rp-bar-sub">{{ fmtCo2(t.co2) }} CO2</span>
                </div>
              </li>
            </ul>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Verbruik per dienst</h2></nldd-title>
              <nldd-tag color="neutral" size="md">{{ byApp.length }} diensten</nldd-tag>
            </div>
            <nldd-spacer size="16" />
            <ul class="rp-bars">
              <li v-for="a in byApp" :key="a.id || 'shared'" class="rp-bar-row">
                <component
                  :is="a.id ? 'router-link' : 'span'"
                  :to="a.id ? `/apps/${a.id}` : undefined"
                  class="rp-bar-label"
                >
                  <span class="rp-bar-dot" :style="{ background: a.color }"></span>
                  <span class="rp-bar-name">{{ a.name }}</span>
                </component>
                <div class="rp-bar-track">
                  <svg class="rp-bar-svg" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                    <rect x="0" y="2" width="100" height="8" rx="4" class="rp-bar-bg" />
                    <rect x="0" y="2" :width="(a.kwh / maxAppKwh) * 100" height="8" rx="4" :fill="a.color" class="rp-bar-fill" />
                  </svg>
                </div>
                <div class="rp-bar-figs">
                  <strong>{{ fmtKwh(a.kwh) }}</strong>
                  <span class="rp-bar-sub">{{ a.count }} instance{{ a.count === 1 ? '' : 's' }}</span>
                </div>
              </li>
            </ul>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <!-- CO2 trend -->
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>CO2-trend</h2></nldd-title>
              <nldd-tag :color="trendDelta <= 0 ? 'success' : 'warning'" size="md">
                {{ trendDelta > 0 ? '+' : '' }}{{ trendDelta }}% over 12 mnd
              </nldd-tag>
            </div>
            <nldd-spacer size="16" />
            <svg :viewBox="`0 0 ${trendPath.w} ${trendPath.h + 24}`" class="rp-trend" role="img" aria-label="CO2-trend over twaalf maanden">
              <defs>
                <linearGradient id="rp-green-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0d9488" stop-opacity="0.24" />
                  <stop offset="100%" stop-color="#0d9488" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path :d="trendPath.area" fill="url(#rp-green-fill)" />
              <path :d="trendPath.line" fill="none" stroke="#0d9488" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <g v-for="(p, i) in trendPath.pts" :key="i">
                <circle :cx="p[0]" :cy="p[1]" r="3" fill="#0d9488" />
                <text :x="p[0]" :y="trendPath.h + 16" class="rp-trend-label">{{ trendMonths[i] }}</text>
              </g>
            </svg>
            <p class="rp-trend-note">
              De uitstoot daalde door rechtsschalen en een groenere stroommix, met een recente opleving door extra Kafka-replica's bij Toeslagen na incident-mitigatie. Huidige uitstoot: {{ fmtCo2(totalCo2) }} per maand ({{ fmtCo2(co2Year) }} per jaar).
            </p>
          </nldd-container>
        </nldd-card>
      </section>

      <!-- Side rail: PUE comparison + relations -->
      <aside>
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>PUE per datacenter</h2></nldd-title>
              <nldd-icon name="apartment-building" aria-hidden="true" class="rp-head-icon"></nldd-icon>
            </div>
            <nldd-spacer size="12" />
            <p class="rp-rail-lede">
              Power Usage Effectiveness: hoeveel totale stroom er nodig is per watt IT-load. Lager is beter. {{ bestPue?.name }} is het groenst (PUE {{ bestPue?.pue }}).
            </p>
            <ul class="rp-pue-list">
              <li v-for="dc in dcRows" :key="dc.id" class="rp-pue-row">
                <div class="rp-pue-head">
                  <router-link :to="`/fysiek/datacenters/${dc.id}`" class="rp-pue-name">
                    <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>
                    {{ dc.name }}
                  </router-link>
                  <span class="rp-pue-rating" :class="`rp-rating-${dc.rating.toLowerCase()}`">{{ dc.rating }}</span>
                </div>
                <div class="rp-pue-meter">
                  <div class="rp-pue-fill" :style="{ width: `${dc.fill}%` }"></div>
                  <div class="rp-pue-marker" :style="{ left: `${dc.fill}%` }"></div>
                </div>
                <div class="rp-pue-foot">
                  <span class="rp-pue-val">PUE {{ dc.pue }}</span>
                  <span class="rp-pue-load">{{ dc.count ? fmtKwh(dc.kwh) : 'geen load' }}</span>
                </div>
              </li>
            </ul>
            <nldd-spacer size="14" />
            <div class="rp-overhead">
              <div class="rp-overhead-bar">
                <div class="rp-overhead-it" :style="{ width: `${100 - overheadPct}%` }"></div>
                <div class="rp-overhead-cool" :style="{ width: `${overheadPct}%` }"></div>
              </div>
              <div class="rp-overhead-legend">
                <span><span class="rp-sw rp-sw-it"></span> IT-load</span>
                <span><span class="rp-sw rp-sw-cool"></span> koeling/overhead {{ overheadPct.toFixed(0) }}%</span>
              </div>
            </div>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <!-- Green coding recommendations -->
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-section-head">
              <nldd-title size="4"><h2>Bespaarpotentieel</h2></nldd-title>
              <nldd-tag color="success" size="md">−{{ fmtKwh(totalSaving) }}/mnd</nldd-tag>
            </div>
            <nldd-spacer size="12" />
            <ul class="rp-recs">
              <li v-for="r in recommendations" :key="r.id" class="rp-rec">
                <span class="rp-rec-icon" :style="{ background: r.color }">
                  <nldd-icon :name="r.icon" aria-hidden="true"></nldd-icon>
                </span>
                <div class="rp-rec-body">
                  <div class="rp-rec-title">{{ r.title }}</div>
                  <p class="rp-rec-detail">{{ r.detail }}</p>
                  <span class="rp-rec-save">−{{ fmtKwh(r.saving) }} per maand</span>
                </div>
              </li>
            </ul>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="24" />

        <RelationLinks
          title="Doorklikken"
          :links="[
            { text: 'Kosten en showback', to: '/kosten', icon: 'euro-sign' },
            { text: 'Datacenters en PUE', to: '/fysiek', icon: 'apartment-building' },
            { text: 'Afgenomen instances', to: '/infra/instances', icon: 'cylinder-split' },
            { text: 'Teams', to: '/teams', icon: 'person-2' },
          ]"
        />
      </aside>
    </div>

    <nldd-spacer size="32" />

    <!-- Per-instance energy table -->
    <nldd-card>
      <nldd-container padding="24">
        <div class="rp-section-head">
          <nldd-title size="4"><h2>Voetafdruk per dienst</h2></nldd-title>
          <nldd-tag color="neutral" size="md">{{ store.instances.length }} instances</nldd-tag>
        </div>
        <nldd-rich-text>
          <p>Per afgenomen instance: geschat vermogen, maandelijks verbruik en CO2, opgehoogd met de PUE van het datacenter waar hij draait. Klik door naar instance, dienst of datacenter.</p>
        </nldd-rich-text>
        <nldd-spacer size="16" />

        <DataTable :columns="svcColumns" :rows="svcRows" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'name'">
              <router-link :to="`/infra/instances/${row.id}`" class="rp-cell-link rp-mono">{{ row.name }}</router-link>
            </template>
            <template v-else-if="col.key === 'kind'">
              <nldd-tag color="accent" size="md">{{ row.kind }}</nldd-tag>
            </template>
            <template v-else-if="col.key === 'env'">
              <StatusBadge :status="row.env" />
            </template>
            <template v-else-if="col.key === 'app'">
              <router-link v-if="row.app" :to="`/apps/${row.app}`" class="rp-cell-link">{{ appName(row.app) }}</router-link>
              <span v-else class="rp-cell-muted">platform</span>
            </template>
            <template v-else-if="col.key === 'dc'">
              <router-link :to="`/fysiek/datacenters/${row.dc}`" class="rp-cell-link">{{ dcName(row.dc) }}</router-link>
            </template>
            <template v-else-if="col.key === 'pue'">
              <span class="rp-cell-energy">{{ pueOf(row.dc) }}</span>
            </template>
            <template v-else-if="col.key === 'watts'">
              <span class="rp-cell-energy">{{ fmtW(row._e.watts) }}</span>
            </template>
            <template v-else-if="col.key === 'kwh'">
              <span class="rp-cell-energy">{{ fmtKwh(row._e.kwh) }}</span>
            </template>
            <template v-else-if="col.key === 'co2'">
              <span class="rp-cell-energy">{{ fmtCo2(row._e.co2) }}</span>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="32" />

    <!-- MVI / sustainable procurement -->
    <nldd-card>
      <nldd-container padding="24">
        <div class="rp-section-head">
          <nldd-title size="4"><h2>Duurzaam inkopen (MVI)</h2></nldd-title>
          <nldd-tag :color="mviAvg >= 70 ? 'success' : 'warning'" size="md">gemiddelde score {{ mviAvg }}/100</nldd-tag>
        </div>
        <nldd-rich-text>
          <p>De fysieke laag van Green IT: elke hardware-inkoop wordt getoetst op maatschappelijk verantwoord inkopen. Energielabel, circulariteit en levensduur tellen mee in de MVI-score, naast prijs en levertijd.</p>
        </nldd-rich-text>
        <nldd-spacer size="16" />

        <DataTable :columns="mviColumns" :rows="mviRows" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'id'">
              <span class="rp-mono">{{ row.id }}</span>
            </template>
            <template v-else-if="col.key === 'energyLabel'">
              <span class="rp-label" :class="`rp-label-${row.energyLabel.toLowerCase()}`">{{ row.energyLabel }}</span>
            </template>
            <template v-else-if="col.key === 'circular'">
              <span class="rp-circular">
                <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
                {{ row.circular }}
              </span>
            </template>
            <template v-else-if="col.key === 'status'">
              <StatusBadge :status="row.status" />
            </template>
            <template v-else-if="col.key === 'score'">
              <div class="rp-score">
                <div class="rp-score-track">
                  <div class="rp-score-fill" :style="{ width: `${row.score}%`, background: row.score >= 75 ? '#0d9488' : row.score >= 60 ? '#d97706' : '#dc2626' }"></div>
                </div>
                <strong>{{ row.score }}</strong>
              </div>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>

        <nldd-spacer size="16" />
        <div class="rp-mvi-criteria">
          <nldd-tag color="success" size="md">Energielabel A/B verplicht</nldd-tag>
          <nldd-tag color="success" size="md">Terugname-garantie</nldd-tag>
          <nldd-tag color="accent" size="md">Minimaal 7 jaar levensduur</nldd-tag>
          <nldd-tag color="accent" size="md">CO2-prestatieladder leverancier</nldd-tag>
          <nldd-tag color="neutral" size="md">Recyclebaar verpakkingsmateriaal</nldd-tag>
        </div>

        <CliHint command="rp green report --by service --period maand --format csv" label="Hetzelfde rapport via de CLI:" />
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-equiv {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  opacity: 0.85;
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(13, 148, 136, 0.06));
}
.rp-equiv nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
  flex: 0 0 auto;
}

.rp-green-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-green-grid {
    grid-template-columns: 1fr;
  }
}

.rp-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.rp-head-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.5;
}

/* Horizontal bar charts (SVG) */
.rp-bars {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
}
.rp-bar-row {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr) 120px;
  align-items: center;
  gap: 0.85rem;
}
@media (max-width: 620px) {
  .rp-bar-row {
    grid-template-columns: 1fr;
    gap: 0.3rem;
  }
}
.rp-bar-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
  min-width: 0;
}
.rp-bar-label[href]:hover .rp-bar-name {
  text-decoration: underline;
}
.rp-bar-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 3px;
  flex: 0 0 auto;
}
.rp-bar-name {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-bar-track {
  min-width: 0;
}
.rp-bar-svg {
  width: 100%;
  height: 12px;
  display: block;
}
.rp-bar-bg {
  fill: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
}
.rp-bar-fill {
  transition: width 0.4s ease;
}
.rp-bar-figs {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.85rem;
  line-height: 1.25;
}
.rp-bar-sub {
  font-size: 0.72rem;
  opacity: 0.6;
}

/* Trend */
.rp-trend {
  width: 100%;
  height: auto;
}
.rp-trend-label {
  text-anchor: middle;
  font-size: 10px;
  fill: currentColor;
  opacity: 0.55;
}
.rp-trend-note {
  font-size: 0.85rem;
  opacity: 0.72;
  margin: 0.75rem 0 0;
}

/* PUE rail */
.rp-rail-lede {
  font-size: 0.85rem;
  opacity: 0.75;
  margin: 0 0 0.85rem;
}
.rp-pue-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-pue-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-pue-name {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-pue-name:hover {
  text-decoration: underline;
}
.rp-pue-name nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
  opacity: 0.6;
  flex: 0 0 auto;
}
.rp-pue-rating {
  flex: 0 0 auto;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  color: #fff;
}
.rp-rating-a { background: #0d9488; }
.rp-rating-b { background: #d97706; }
.rp-rating-c { background: #dc2626; }
.rp-pue-meter {
  position: relative;
  height: 0.5rem;
  margin: 0.4rem 0 0.3rem;
  border-radius: 99px;
  background: linear-gradient(90deg, #0d9488 0%, #d97706 60%, #dc2626 100%);
  opacity: 0.25;
}
.rp-pue-fill {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 99px;
  background: linear-gradient(90deg, #0d9488 0%, #d97706 60%, #dc2626 100%);
}
.rp-pue-marker {
  position: absolute;
  top: -3px;
  width: 3px;
  height: calc(0.5rem + 6px);
  border-radius: 2px;
  background: var(--semantics-text-default-color, #1f2933);
  transform: translateX(-50%);
}
.rp-pue-foot {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
}
.rp-pue-val {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}
.rp-pue-load {
  opacity: 0.6;
}

/* IT vs overhead split */
.rp-overhead-bar {
  display: flex;
  height: 0.7rem;
  border-radius: 99px;
  overflow: hidden;
}
.rp-overhead-it { background: #0d9488; }
.rp-overhead-cool { background: #94a3b8; }
.rp-overhead-legend {
  display: flex;
  gap: 1rem;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  opacity: 0.7;
}
.rp-sw {
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 2px;
  margin-right: 0.25rem;
}
.rp-sw-it { background: #0d9488; }
.rp-sw-cool { background: #94a3b8; }

/* Recommendations */
.rp-recs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-rec {
  display: flex;
  gap: 0.75rem;
}
.rp-rec-icon {
  flex: 0 0 auto;
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: grid;
  place-items: center;
}
.rp-rec-icon nldd-icon {
  width: 1.05rem;
  height: 1.05rem;
  color: #fff;
}
.rp-rec-title {
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-rec-detail {
  font-size: 0.82rem;
  opacity: 0.72;
  margin: 0.2rem 0 0.3rem;
}
.rp-rec-save {
  font-size: 0.78rem;
  font-weight: 600;
  color: #0d9488;
}

/* Table cells */
.rp-cell-link {
  text-decoration: none;
  color: var(--rp-link, #2563eb);
}
.rp-cell-link:hover {
  text-decoration: underline;
}
.rp-cell-muted {
  opacity: 0.5;
}
.rp-cell-energy {
  font-variant-numeric: tabular-nums;
  opacity: 0.85;
}
.rp-mono {
  font-family: var(--rp-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
}

/* Energy label badge */
.rp-label {
  display: inline-grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.8rem;
  color: #fff;
}
.rp-label-a { background: #0d9488; }
.rp-label-b { background: #65a30d; }
.rp-label-c { background: #d97706; }

.rp-circular {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
}
.rp-circular nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
  opacity: 0.55;
}

.rp-score {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
}
.rp-score-track {
  width: 80px;
  height: 0.5rem;
  border-radius: 99px;
  background: var(--semantics-surfaces-tinted-background-color, rgba(0, 0, 0, 0.05));
  overflow: hidden;
}
.rp-score-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease;
}

.rp-mvi-criteria {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
