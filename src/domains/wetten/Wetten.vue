<script setup>
// The RegelRecht corpus overview: every machine-readable law in the platform,
// its coverage (fraction with executable logic), the team that owns it and the
// service that executes it. This is the entry point of the "wet -> systeem"
// golden path. A status filter narrows the corpus; the trajecten section shows
// the open edit workspaces.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

// Status filter chips. 'alle' shows the full corpus.
const STATUSES = ['alle', 'harvested', 'in bewerking', 'enriched', 'gepubliceerd'];
const statusFilter = ref('alle');

const filtered = computed(() =>
  statusFilter.value === 'alle'
    ? store.wetten
    : store.wetten.filter((w) => w.status === statusFilter.value),
);

const publishedCount = computed(() => store.wettenByStatus('gepubliceerd').length);

// Active trajecten only: publishWet() marks a traject 'goedgekeurd' and detaches
// it from the wet, but leaves it in store.trajecten. Filter completed ones out so
// the metric and the list reflect work that is actually still underway.
const COMPLETED_TRAJECT_STATUSES = ['goedgekeurd', 'afgesloten'];
const activeTrajecten = computed(() =>
  store.trajecten.filter((t) => !COMPLETED_TRAJECT_STATUSES.includes(t.status)),
);

function ownerName(teamId) {
  return store.teamById(teamId)?.name || teamId;
}
function serviceForWet(wetId) {
  return store.appForWet(wetId);
}
function coveragePct(w) {
  return Math.round((w.coverage || 0) * 100);
}
function layerLabel(layer) {
  return layer === 'MINISTERIELE_REGELING' ? 'Ministeriële regeling' : 'Wet';
}
function memberName(id) {
  return store.personById(id)?.name || id;
}
function memberAvatar(id) {
  return store.personById(id)?.avatar || '··';
}
function wetName(id) {
  return store.wetById(id)?.name || id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Wet- en regelgeving uitvoeren"
      lede="Applicaties die een wet of beleidsregel uitvoeren, met de wettekst als bron (RegelRecht). Elke wet is vertaald naar uitvoerbare logica: definities, invoer uit basisregistraties en uitkomsten. Vanaf de geharveste tekst tot een draaiende dienst, met scenario's die bewijzen dat de uitvoering klopt."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Wet uitvoeren', href: '/wetten' },
      ]"
    >
      <template #actions>
        <router-link to="/wetten/nieuw">
          <nldd-button variant="primary" text="Wet naar systeem" start-icon="plus"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.wetten.length" label="Wetten in corpus" sub="machine-leesbaar" icon="books-vertical" />
      <MetricCard :value="publishedCount" label="Gepubliceerd" sub="live in uitvoering" icon="check-mark-circle" />
      <MetricCard :value="`${store.avgCoverage}%`" label="Gemiddelde dekking" sub="uitvoerbare logica" icon="sparkles" />
      <MetricCard :value="activeTrajecten.length" label="Actieve trajecten" sub="wijzigingen onderweg" icon="pencil" />
    </nldd-container>

    <nldd-spacer size="16" />
    <nldd-inline-dialog
      title="Van tekst naar uitvoering"
      supporting-text="Een wet wordt geharvest uit BWB, machine-leesbaar gemaakt met invoer uit basisregistraties, getoetst met scenario's en als dienst uitgerold. De keten blijft herleidbaar: elke uitkomst is terug te voeren op een artikel en een bron."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <!-- Status filter -->
    <div class="rp-cat-filter">
      <button
        v-for="s in STATUSES"
        :key="s"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': statusFilter === s }"
        @click="statusFilter = s"
      >{{ s === 'alle' ? 'Alle' : s }}</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="440px">
      <router-link v-for="w in filtered" :key="w.id" :to="`/wetten/${w.id}`" class="rp-wet-link">
        <nldd-card :accessible-label="w.name">
          <nldd-container padding="20">
            <div class="rp-wet-head">
              <nldd-icon name="file-text" aria-hidden="true" class="rp-wet-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ w.name }}</h2></nldd-title>
                <p class="rp-wet-sub rp-mono">{{ w.bwbId }} · {{ w.version }}</p>
              </div>
              <StatusBadge :status="w.status" />
            </div>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag :color="w.layer === 'WET' ? 'accent' : 'neutral'" size="md">{{ layerLabel(w.layer) }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ ownerName(w.owner) }}</nldd-tag>
              <nldd-tag v-if="serviceForWet(w.id)" color="success" size="md">{{ serviceForWet(w.id).name }}</nldd-tag>
            </nldd-container>

            <nldd-spacer size="14" />
            <div class="rp-cov-row">
              <span class="rp-cov-label">Dekking</span>
              <div class="rp-cov-track">
                <div class="rp-cov-fill" :style="{ width: coveragePct(w) + '%' }"></div>
              </div>
              <span class="rp-cov-pct rp-mono">{{ coveragePct(w) }}%</span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- Active trajecten -->
    <nldd-title size="3"><h2>Actieve trajecten</h2></nldd-title>
    <nldd-rich-text>
      <p>Open werkruimtes waarin een wet wordt gewijzigd of machine-leesbaar gemaakt. Elk traject hangt aan een branch en een team.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="440px">
      <router-link
        v-for="t in activeTrajecten"
        :key="t.id"
        :to="`/wetten/${t.wet}`"
        class="rp-wet-link"
      >
        <nldd-card :accessible-label="t.name">
          <nldd-container padding="20">
            <div class="rp-traj-head">
              <nldd-icon name="pencil" aria-hidden="true" class="rp-wet-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="5"><h3>{{ t.name }}</h3></nldd-title>
                <p class="rp-wet-sub">{{ wetName(t.wet) }}</p>
              </div>
              <StatusBadge :status="t.status" />
            </div>
            <nldd-spacer size="12" />
            <div class="rp-traj-foot">
              <span class="rp-traj-branch rp-mono"><nldd-icon name="chevron-left-forward-slash-chevron-right" aria-hidden="true"></nldd-icon>{{ t.branch }}</span>
              <div class="rp-avatars">
                <span v-for="m in t.members" :key="m" class="rp-avatar" :title="memberName(m)">{{ memberAvatar(m) }}</span>
              </div>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.rp-min-width-0 { min-width: 0; flex: 1 1 auto; }

.rp-cat-filter { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.rp-cat {
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}
.rp-cat:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-cat-on {
  border-color: var(--semantics-actions-primary-default-background-color);
  background: var(--semantics-surfaces-tinted-background-color);
  font-weight: 700;
}

.rp-wet-link { text-decoration: none; color: inherit; display: block; }
.rp-wet-head, .rp-traj-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-wet-icon { width: 1.5rem; height: 1.5rem; flex: 0 0 auto; opacity: 0.8; }
.rp-wet-sub { margin: 0.15rem 0 0; font-size: 0.82rem; opacity: 0.65; }

.rp-cov-row { display: flex; align-items: center; gap: 0.6rem; }
.rp-cov-label { font-size: 0.78rem; opacity: 0.65; width: 3.5rem; flex: 0 0 auto; }
.rp-cov-track {
  flex: 1 1 auto;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-cov-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--semantics-actions-primary-default-background-color);
}
.rp-cov-pct { font-size: 0.82rem; width: 2.6rem; text-align: right; flex: 0 0 auto; }

.rp-traj-foot { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-traj-branch { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; opacity: 0.75; }
.rp-traj-branch nldd-icon { width: 0.9rem; height: 0.9rem; }
.rp-avatars { display: flex; }
.rp-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  margin-left: -0.4rem;
  border-radius: 50%;
  background: var(--semantics-surfaces-tinted-background-color);
  border: 2px solid var(--semantics-surfaces-base-background-color);
  font-size: 0.7rem;
  font-weight: 700;
}
.rp-avatar:first-child { margin-left: 0; }
</style>
