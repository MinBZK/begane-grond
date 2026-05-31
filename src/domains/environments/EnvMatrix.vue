<script setup>
// Environment matrix: for every app, the version that is currently live in
// dev / test / acc / prod. Shows drift between environments at a glance, a
// health badge per app (from the app catalog), and a "promote" action that
// jumps into the promotion wizard. All data is read live from the store, so
// promotions done in the wizard reflect back here immediately.
import { computed, ref } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const ENVS = ['dev', 'test', 'acc', 'prod'];
const ENV_LABEL = { dev: 'Dev', test: 'Test', acc: 'Acceptatie', prod: 'Productie' };

function appName(id) {
  const a = store.appById(id);
  return a ? a.name : id;
}

// Join each deployment row with its app for name + health + team.
const rows = computed(() =>
  store.deployments.map((d) => {
    const app = store.appById(d.app);
    return {
      key: d.app,
      name: app ? app.name : d.app,
      health: app ? app.health : 'ok',
      team: app ? store.teamById(app.team) : null,
      versions: { dev: d.dev, test: d.test, acc: d.acc, prod: d.prod },
      // An app "drifts" when not every environment runs the same version.
      drift: new Set([d.dev, d.test, d.acc, d.prod]).size > 1,
      // Is there something newer upstream than prod? (dev ahead of prod)
      aheadOfProd: d.dev !== d.prod,
    };
  })
);

const totalApps = computed(() => rows.value.length);
const inSync = computed(() => rows.value.filter((r) => !r.drift).length);
const needPromotion = computed(() => rows.value.filter((r) => r.aheadOfProd).length);
const unhealthy = computed(() => rows.value.filter((r) => r.health !== 'ok').length);

// The catalog now holds 120+ apps with a pipeline, so the matrix is far too
// long to scan as one wall of rows. Add a search box, a status filter and a
// capped view with a "show more" affordance, so the table stays scannable and
// drift jumps out instead of drowning in in-sync rows.
const query = ref('');
const statusFilter = ref('all'); // all | drift | promote | unhealthy
const limit = ref(25);

const STATUS_FILTERS = [
  { id: 'all', label: 'Alles' },
  { id: 'drift', label: 'Drift' },
  { id: 'promote', label: 'Te promoten' },
  { id: 'unhealthy', label: 'Aandacht nodig' },
];

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return rows.value.filter((r) => {
    if (statusFilter.value === 'drift' && !r.drift) return false;
    if (statusFilter.value === 'promote' && !r.aheadOfProd) return false;
    if (statusFilter.value === 'unhealthy' && r.health === 'ok') return false;
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.key.toLowerCase().includes(q) ||
      (r.team?.name || '').toLowerCase().includes(q)
    );
  });
});

const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));

function setStatusFilter(id) {
  statusFilter.value = id;
  limit.value = 25;
}
function showMore() {
  limit.value += 25;
}

// Recent promotions: the release log grows without bound, so only the most
// recent handful belong in this side panel. The full history lives behind the
// "Alle releases" button.
const RELEASE_PREVIEW = 8;
const recentReleases = computed(() => store.releases.slice(0, RELEASE_PREVIEW));

// Highlight the cell that differs from the environment to its left, so the
// "where does the version change" reads instantly in the grid.
function changed(versions, env) {
  const idx = ENVS.indexOf(env);
  if (idx === 0) return false;
  return versions[env] !== versions[ENVS[idx - 1]];
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Omgevingen"
      lede="Welke versie van elke applicatie draait in dev, test, acceptatie en productie. Promoot een release met één klik door de keten."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Omgevingen', href: '/environments' }]"
    >
      <template #actions>
        <router-link to="/environments/runners">
          <nldd-button variant="secondary" text="CI-runners" start-icon="ship-wheel"></nldd-button>
        </router-link>
        <router-link to="/environments/releases">
          <nldd-button variant="secondary" text="Release-historie" start-icon="clock"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="totalApps" label="Applicaties" sub="met deploy-pijplijn" icon="rectangle-stack" />
      <MetricCard :value="inSync" label="In sync" sub="alle omgevingen gelijk" icon="check-mark-circle" />
      <MetricCard :value="needPromotion" label="Te promoten" sub="dev voorloopt op prod" icon="arrow-up-arrow-down" />
      <MetricCard :value="unhealthy" label="Aandacht nodig" sub="gezondheid niet ok" icon="exclamation-triangle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Versiematrix</h2></nldd-title>
        <nldd-spacer size="4" />
        <nldd-rich-text>
          <p>Een gemarkeerde versie betekent dat die omgeving een andere versie draait dan de omgeving links ervan.</p>
        </nldd-rich-text>
        <nldd-spacer size="16" />

        <div class="rp-matrix-controls">
          <nldd-search-field
            class="rp-matrix-search"
            placeholder="Zoek op applicatie, id of team"
            accessible-label="Zoek applicatie"
            :value="query"
            @input="(e) => { query = e.target.value; limit = 25; }"
          ></nldd-search-field>
          <div class="rp-matrix-filters">
            <nldd-button
              v-for="f in STATUS_FILTERS"
              :key="f.id"
              size="sm"
              :variant="statusFilter === f.id ? 'primary' : 'secondary'"
              :text="f.label"
              @click="setStatusFilter(f.id)"
            ></nldd-button>
          </div>
        </div>

        <nldd-spacer size="12" />

        <div class="rp-matrix-wrap">
          <table class="rp-matrix">
            <thead>
              <tr>
                <th class="rp-col-app">Applicatie</th>
                <th>Gezondheid</th>
                <th v-for="env in ENVS" :key="env" class="rp-col-env">{{ ENV_LABEL[env] }}</th>
                <th class="rp-col-act"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in visible" :key="r.key">
                <td class="rp-col-app">
                  <router-link :to="`/apps/${r.key}`" class="rp-app-link">
                    <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
                    <span>
                      <strong>{{ r.name }}</strong>
                      <small v-if="r.team">{{ r.team.name }}</small>
                    </span>
                  </router-link>
                </td>
                <td>
                  <StatusBadge :status="r.health" />
                </td>
                <td v-for="env in ENVS" :key="env" class="rp-col-env">
                  <span class="rp-ver" :class="{ 'rp-ver-changed': changed(r.versions, env) }">
                    {{ r.versions[env] }}
                  </span>
                </td>
                <td class="rp-col-act">
                  <router-link :to="`/environments/promotie/${r.key}`">
                    <nldd-button
                      variant="primary"
                      size="sm"
                      text="Promoten"
                      end-icon="arrow-right"
                    ></nldd-button>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="!filtered.length" class="rp-matrix-empty">
          Geen applicatie gevonden voor deze filters.
        </p>

        <div v-if="moreCount > 0" class="rp-matrix-more">
          <span>{{ visible.length }} van {{ filtered.length }} applicaties</span>
          <nldd-button
            variant="secondary"
            size="sm"
            :text="`Toon meer (nog ${moreCount})`"
            end-icon="chevron-down"
            @click="showMore"
          ></nldd-button>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="2" gap="16">
      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Promotieketen</h3></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-chain">
            <template v-for="(env, i) in ENVS" :key="env">
              <div class="rp-chain-node">
                <span class="rp-chain-dot" :class="`rp-env-${env}`"></span>
                <span>{{ ENV_LABEL[env] }}</span>
              </div>
              <nldd-icon v-if="i < ENVS.length - 1" name="arrow-right" aria-hidden="true" class="rp-chain-arrow"></nldd-icon>
            </template>
          </div>
          <nldd-spacer size="12" />
          <nldd-rich-text>
            <p>Een release schuift altijd één stap op. Elke stap doorloopt de gates: tests groen, security groen en, naar productie, een goedgekeurde wijziging (change).</p>
          </nldd-rich-text>
        </nldd-container>
      </nldd-card>

      <nldd-card>
        <nldd-container padding="20">
          <nldd-title size="5"><h3>Recente promoties</h3></nldd-title>
          <nldd-spacer size="12" />
          <nldd-list>
            <nldd-list-item v-for="rel in recentReleases" :key="rel.id">
              <nldd-title-cell
                :text="`${appName(rel.app)} ${rel.version}`"
                :supporting-text="`naar ${rel.env} · ${rel.when}`"
              ></nldd-title-cell>
              <nldd-spacer-cell></nldd-spacer-cell>
              <nldd-icon-cell name="arrow-up-arrow-down"></nldd-icon-cell>
            </nldd-list-item>
          </nldd-list>
          <nldd-spacer size="12" />
          <router-link to="/environments/releases">
            <nldd-button variant="secondary" text="Alle releases" end-icon="chevron-right"></nldd-button>
          </router-link>
        </nldd-container>
      </nldd-card>
    </nldd-container>
  </div>
</template>

<style scoped>
.rp-matrix-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}
.rp-matrix-search {
  flex: 1 1 18rem;
  min-width: 14rem;
}
.rp-matrix-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-matrix-empty {
  margin: 1rem 0 0;
  opacity: 0.6;
}
.rp-matrix-more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.9rem;
  font-size: 0.85rem;
  opacity: 0.85;
}
.rp-matrix-wrap {
  overflow-x: auto;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
}
.rp-matrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.rp-matrix th,
.rp-matrix td {
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  text-align: left;
  white-space: nowrap;
}
.rp-matrix thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.65;
}
.rp-matrix tbody tr:last-child td {
  border-bottom: none;
}
.rp-matrix tbody tr:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-col-env {
  text-align: center;
}
.rp-col-act {
  text-align: right;
}
.rp-app-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
}
.rp-app-link nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.7;
}
.rp-app-link span {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.rp-app-link small {
  opacity: 0.6;
  font-size: 0.78rem;
}
.rp-ver {
  display: inline-block;
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.85rem;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
}
.rp-ver-changed {
  background: var(--semantics-surfaces-tinted-background-color);
  font-weight: 700;
  box-shadow: inset 0 0 0 1px var(--semantics-dividers-color);
}
.rp-chain {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-chain-node {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  font-weight: 600;
  font-size: 0.88rem;
}
.rp-chain-dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: #aaa;
}
.rp-env-dev { background: #8b8b8b; }
.rp-env-test { background: #2e7d9a; }
.rp-env-acc { background: #d98a00; }
.rp-env-prod { background: #1a7a3e; }
.rp-chain-arrow {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.5;
}
</style>
