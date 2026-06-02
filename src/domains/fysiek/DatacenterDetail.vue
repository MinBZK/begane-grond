<script setup>
// Detail of a single datacenter: KPIs, the alleys with their hot/cold aisle
// orientation, a rack list, and the instances that physically live here. Links
// to the floorplan and to individual racks so the user can keep drilling down.
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import DataTable from '../../components/shared/DataTable.vue';

const route = useRoute();
const store = usePlatformStore();

const dc = computed(() => store.datacenterById(route.params.dc));
const alleys = computed(() => store.alleysByDatacenter(route.params.dc));
const racks = computed(() => store.racksByDatacenter(route.params.dc));
const instances = computed(() => store.instances.filter((i) => i.dc === route.params.dc));
const procurement = computed(() => store.procurement.filter((p) => p.dc === route.params.dc));

function rackWatts(rack) {
  return rack.units.reduce((s, u) => s + (u.watts || 0), 0);
}
function rackFill(rack) {
  const used = rack.units.reduce((s, u) => s + (u.height || 0), 0);
  return Math.round((used / rack.heightU) * 100);
}
const pctPower = computed(() => (dc.value?.capacityKw ? Math.round((dc.value.usedKw / dc.value.capacityKw) * 100) : 0));

const rackColumns = [
  { key: 'label', label: 'Rack', mono: true },
  { key: 'alley', label: 'Rij' },
  { key: 'team', label: 'Eigenaar' },
  { key: 'fill', label: 'Bezetting', align: 'right' },
  { key: 'watts', label: 'Vermogen', align: 'right', mono: true },
  { key: 'go', label: '', align: 'right' },
];
const allRackRows = computed(() =>
  racks.value.map((r) => ({
    id: r.id,
    label: r.label,
    alley: store.alleys.find((a) => a.id === r.alley)?.name || r.alley,
    team: store.teamById(r.team)?.name || r.team,
    fill: rackFill(r),
    watts: rackWatts(r),
  })),
);

// A datacenter can hold dozens of racks. Filter on label/rij/eigenaar and cap
// the table to a sane initial count with a "toon meer" control.
const rackQuery = ref('');
const rackLimit = ref(25);
const filteredRackRows = computed(() => {
  const q = rackQuery.value.trim().toLowerCase();
  if (!q) return allRackRows.value;
  return allRackRows.value.filter(
    (r) =>
      r.label.toLowerCase().includes(q) ||
      String(r.alley).toLowerCase().includes(q) ||
      String(r.team).toLowerCase().includes(q),
  );
});
const visibleRackRows = computed(() => filteredRackRows.value.slice(0, rackLimit.value));
const moreRacks = computed(() => Math.max(0, filteredRackRows.value.length - rackLimit.value));

// Instances physically hosted here run into the dozens per datacenter. Offer a
// search plus an env filter and cap the list, instead of rendering them all.
const instQuery = ref('');
const instEnv = ref('alle');
const instLimit = ref(24);
const instEnvs = computed(() => {
  const set = new Set(instances.value.map((i) => i.env).filter(Boolean));
  return ['alle', ...Array.from(set).sort()];
});
const filteredInstances = computed(() => {
  const q = instQuery.value.trim().toLowerCase();
  return instances.value.filter((i) => {
    if (instEnv.value !== 'alle' && i.env !== instEnv.value) return false;
    if (!q) return true;
    const team = (store.teamById(i.team)?.name || i.team || '').toLowerCase();
    return i.name.toLowerCase().includes(q) || team.includes(q);
  });
});
const visibleInstances = computed(() => filteredInstances.value.slice(0, instLimit.value));
const moreInstances = computed(() => Math.max(0, filteredInstances.value.length - instLimit.value));

function aisleColor(aisle) {
  return aisle === 'hot' ? 'critical' : 'accent';
}
function aisleLabel(aisle) {
  return aisle === 'hot' ? 'Hot aisle' : 'Cold aisle';
}
</script>

<template>
  <div v-if="dc" class="rp-page">
    <PageHeader
      :title="dc.name"
      :lede="`Soeverein datacenter in ${dc.city}. Redundantie ${dc.redundancy}, uplinks ${dc.uplinks}.`"
      :crumbs="[
        { text: 'Fundament', href: '/fysiek' },
        { text: 'Datacenters', href: '/fysiek' },
        { text: dc.name, href: `/fysiek/datacenters/${dc.id}` },
      ]"
    >
      <template #actions>
        <StatusBadge :status="dc.status" size="lg" />
        <nldd-button variant="primary" text="Open zaalindeling" start-icon="rectangle-stack" :href="`/fysiek/datacenters/${dc.id}/floor`"></nldd-button>
      </template>
    </PageHeader>

    <nldd-collection layout="grid" item-width="200px">
      <MetricCard :value="`${dc.usedKw} kW`" :label="`van ${dc.capacityKw} kW`" :sub="`${pctPower}% benut`" icon="cloud" />
      <MetricCard :value="dc.pue" label="PUE" sub="energie-efficiëntie" icon="starburst-filled" />
      <MetricCard :value="racks.length" label="Racks geplaatst" :sub="`${dc.racks} gepland`" icon="rectangle-stack" />
      <MetricCard :value="instances.length" label="Instances" sub="draaien hier fysiek" icon="cylinder-split" />
    </nldd-collection>

    <nldd-spacer size="28" />

    <div class="rp-detail-grid">
      <div>
        <nldd-title size="3"><h2>Rijen en aisles</h2></nldd-title>
        <nldd-rich-text><p>Warmte-afvoer volgens het hot-aisle / cold-aisle principe. Rode rijen blazen warme lucht uit, blauwe rijen zuigen koude lucht aan.</p></nldd-rich-text>
        <nldd-spacer size="12" />
        <nldd-collection layout="grid" item-width="240px">
          <nldd-card v-for="alley in alleys" :key="alley.id" :accessible-label="alley.name">
            <nldd-container padding="16">
              <div class="rp-alley-head">
                <nldd-title size="5"><h3>{{ alley.name }}</h3></nldd-title>
                <nldd-tag :color="aisleColor(alley.aisle)" size="md">{{ aisleLabel(alley.aisle) }}</nldd-tag>
              </div>
              <nldd-spacer size="10" />
              <div class="rp-alley-racks">
                <router-link
                  v-for="rid in alley.racks"
                  :key="rid"
                  :to="`/fysiek/racks/${rid}`"
                  class="rp-alley-rack"
                  :class="alley.aisle === 'hot' ? 'rp-hot' : 'rp-cold'"
                >
                  {{ store.rackById(rid)?.label || rid }}
                </router-link>
              </div>
            </nldd-container>
          </nldd-card>
          <nldd-card v-if="!alleys.length" accessible-label="Geen rijen">
            <nldd-container padding="16">
              <nldd-rich-text><p>Nog geen rijen ingericht. Dit datacenter is {{ dc.status }}.</p></nldd-rich-text>
            </nldd-container>
          </nldd-card>
        </nldd-collection>

        <nldd-spacer size="28" />

        <nldd-title size="3"><h2>Racks</h2></nldd-title>
        <nldd-spacer size="12" />
        <nldd-search-field
          placeholder="Zoek op rack, rij of eigenaar"
          accessible-label="Zoek rack"
          :value="rackQuery"
          @input="(e) => (rackQuery = e.target.value)"
        ></nldd-search-field>
        <nldd-spacer size="12" />
        <DataTable :columns="rackColumns" :rows="visibleRackRows" row-key="id">
          <template #cell="{ row, col, value }">
            <template v-if="col.key === 'fill'">
              <div class="rp-fill-cell">
                <div class="rp-fill-bar"><div class="rp-fill-bar-in" :style="{ width: value + '%' }"></div></div>
                <span class="rp-mono">{{ value }}%</span>
              </div>
            </template>
            <template v-else-if="col.key === 'watts'">{{ value }} W</template>
            <template v-else-if="col.key === 'go'">
              <router-link :to="`/fysiek/racks/${row.id}`" class="rp-rack-go">Open <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon></router-link>
            </template>
            <template v-else>{{ value }}</template>
          </template>
        </DataTable>
        <p v-if="!filteredRackRows.length" class="rp-empty-line">Geen racks gevonden voor "{{ rackQuery }}".</p>
        <div v-if="moreRacks > 0" class="rp-more-row">
          <nldd-button variant="secondary" :text="`Toon meer (nog ${moreRacks})`" start-icon="chevron-down" @click="rackLimit += 25"></nldd-button>
        </div>

        <template v-if="procurement.length">
          <nldd-spacer size="28" />
          <nldd-title size="3"><h2>Lopende inkoop voor deze locatie</h2></nldd-title>
          <nldd-spacer size="12" />
          <nldd-list>
            <nldd-list-item v-for="p in procurement" :key="p.id">
              <nldd-title-cell :text="p.item" :supporting-text="`${p.supplier} · ${p.lead} levertijd`"></nldd-title-cell>
              <nldd-spacer-cell></nldd-spacer-cell>
              <nldd-text-cell :text="`€ ${p.amount.toLocaleString('nl-NL')}`"></nldd-text-cell>
              <nldd-icon-cell><StatusBadge :status="p.status" /></nldd-icon-cell>
            </nldd-list-item>
          </nldd-list>
        </template>
      </div>

      <aside class="rp-detail-aside">
        <RelationLinks
          title="Doorklikken"
          :links="[
            { text: 'Zaalindeling (floorplan)', to: `/fysiek/datacenters/${dc.id}/floor`, icon: 'rectangle-stack' },
            { text: 'Netwerktopologie', to: '/fysiek/netwerk', icon: 'arrow-up-arrow-down' },
            { text: 'Inkoop & planning', to: '/fysiek/inkoop', icon: 'euro-sign' },
          ]"
        />

        <nldd-spacer size="16" />

        <nldd-card accessible-label="Instances in dit datacenter">
          <nldd-container padding="20">
            <div class="rp-inst-head">
              <nldd-title size="5"><h3>Instances hier</h3></nldd-title>
              <nldd-tag color="neutral" size="md">{{ instances.length }} totaal</nldd-tag>
            </div>
            <template v-if="instances.length">
              <nldd-spacer size="12" />
              <nldd-search-field
                placeholder="Zoek op naam of team"
                accessible-label="Zoek instance"
                :value="instQuery"
                @input="(e) => (instQuery = e.target.value)"
              ></nldd-search-field>
              <nldd-spacer size="8" />
              <nldd-dropdown accessible-label="Filter op omgeving">
                <select :value="instEnv" @change="(e) => (instEnv = e.target.value)">
                  <option v-for="env in instEnvs" :key="env" :value="env">
                    {{ env === 'alle' ? 'Alle omgevingen' : env }}
                  </option>
                </select>
              </nldd-dropdown>
              <nldd-spacer size="12" />
              <div v-if="filteredInstances.length" class="rp-inst-list">
                <router-link v-for="i in visibleInstances" :key="i.id" :to="`/infra/instances/${i.id}`" class="rp-inst-row">
                  <div class="rp-inst-main">
                    <span class="rp-mono">{{ i.name }}</span>
                    <span class="rp-inst-meta">{{ store.teamById(i.team)?.name || i.team }} · {{ i.env }}</span>
                  </div>
                  <StatusBadge :status="i.status" />
                </router-link>
              </div>
              <nldd-rich-text v-else><p>Geen instances gevonden voor deze filters.</p></nldd-rich-text>
              <div v-if="moreInstances > 0" class="rp-more-row">
                <nldd-button variant="secondary" :text="`Toon meer (nog ${moreInstances})`" start-icon="chevron-down" @click="instLimit += 24"></nldd-button>
              </div>
            </template>
            <nldd-rich-text v-else><p>Nog geen instances op deze locatie.</p></nldd-rich-text>
          </nldd-container>
        </nldd-card>
      </aside>
    </div>
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Datacenter niet gevonden" :crumbs="[{ text: 'Datacenters', href: '/fysiek' }]" />
    <nldd-inline-dialog title="Onbekend datacenter" supporting-text="Dit datacenter bestaat niet of is verwijderd."></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) {
  .rp-detail-grid {
    grid-template-columns: 1fr;
  }
}
.rp-alley-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-alley-racks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-alley-rack {
  text-decoration: none;
  color: inherit;
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  padding: 0.3rem 0.55rem;
  border-radius: 6px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
}
.rp-alley-rack.rp-hot {
  background: rgba(213, 43, 30, 0.1);
  border-color: rgba(213, 43, 30, 0.4);
}
.rp-alley-rack.rp-cold {
  background: rgba(33, 99, 196, 0.1);
  border-color: rgba(33, 99, 196, 0.4);
}
.rp-alley-rack:hover {
  filter: brightness(0.96);
}
.rp-fill-cell {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
}
.rp-fill-bar {
  width: 70px;
  height: 8px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  overflow: hidden;
}
.rp-fill-bar-in {
  height: 100%;
  background: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-rack-go {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  font-weight: 600;
}
.rp-rack-go nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-inst-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}
.rp-inst-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-empty-line {
  margin: 0.75rem 0 0;
  opacity: 0.6;
}
.rp-more-row {
  margin-top: 0.85rem;
}
.rp-inst-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-radius: 8px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
  text-decoration: none;
  color: inherit;
}
.rp-inst-row:hover {
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
}
.rp-inst-main {
  display: flex;
  flex-direction: column;
}
.rp-inst-meta {
  font-size: 0.75rem;
  opacity: 0.6;
}
.rp-mono {
  font-family: ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
}
</style>
