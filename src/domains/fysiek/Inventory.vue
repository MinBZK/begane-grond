<script setup>
// Hardware inventory: a flat, searchable list of every installed device across
// all racks and datacenters. Built by flattening store.racks[].units and
// joining the datacenter and team. This is the "what do we physically own"
// view that complements the per-rack elevation.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const TYPE_LABEL = {
  server: 'Compute',
  gpu: 'AI / GPU',
  switch: 'Switch',
  pdu: 'PDU',
  patch: 'Patchpaneel',
};

// Flatten every unit in every rack into one inventory row. Storage servers are
// surfaced as their own type so the table reads honestly.
const allItems = computed(() => {
  const rows = [];
  for (const rack of store.racks) {
    const dc = store.datacenterById(rack.dc);
    for (const u of rack.units) {
      const isStorage = u.type === 'server' && (u.label || '').startsWith('storage');
      rows.push({
        id: `${rack.id}-u${u.u}`,
        label: u.label,
        kind: isStorage ? 'storage' : u.type,
        kindLabel: isStorage ? 'Storage' : TYPE_LABEL[u.type] || u.type,
        dc: dc?.name || rack.dc,
        dcId: rack.dc,
        rack: rack.label,
        rackId: rack.id,
        position: `U${u.u}`,
        height: u.height,
        team: store.teamById(u.team)?.name || (u.team ? u.team : '—'),
        watts: u.watts || 0,
        status: u.status || 'ok',
        // Spec summary depends on the kind.
        spec: u.type === 'gpu'
          ? `${u.gpuCount}× ${u.gpuModel} · ${u.vcpu} vCPU · ${u.memGB} GB`
          : isStorage
            ? `${u.storageTB} TB · ${u.vcpu} vCPU · ${u.memGB} GB`
            : u.type === 'server'
              ? `${u.vcpu} vCPU · ${u.memGB} GB`
              : '—',
      });
    }
  }
  return rows;
});

// --- Filters ---
const query = ref('');
const kindFilter = ref('all');
const dcFilter = ref('all');
const limit = ref(40);

const KINDS = [
  { id: 'all', label: 'Alle' },
  { id: 'server', label: 'Compute' },
  { id: 'gpu', label: 'AI / GPU' },
  { id: 'storage', label: 'Storage' },
  { id: 'switch', label: 'Switch' },
];

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return allItems.value.filter((it) => {
    if (kindFilter.value !== 'all' && it.kind !== kindFilter.value) return false;
    if (dcFilter.value !== 'all' && it.dcId !== dcFilter.value) return false;
    if (!q) return true;
    return (
      it.label.toLowerCase().includes(q) ||
      it.rack.toLowerCase().includes(q) ||
      it.team.toLowerCase().includes(q) ||
      it.dc.toLowerCase().includes(q) ||
      it.kindLabel.toLowerCase().includes(q)
    );
  });
});

const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));
function resetLimit() {
  limit.value = 40;
}

// --- KPI roll-up across the (full, unfiltered) inventory ---
const cap = computed(() => store.computeCapacity());
const totalDevices = computed(() => allItems.value.length);
const totalWattsKw = computed(() =>
  Math.round(allItems.value.reduce((s, i) => s + i.watts, 0) / 1000),
);

const columns = [
  { key: 'label', label: 'Apparaat', mono: true },
  { key: 'kindLabel', label: 'Type' },
  { key: 'spec', label: 'Specificatie' },
  { key: 'location', label: 'Locatie' },
  { key: 'team', label: 'Team' },
  { key: 'watts', label: 'Vermogen', align: 'right' },
  { key: 'status', label: 'Status' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Inventory"
      lede="Alle geïnstalleerde hardware over alle datacenters en racks: compute, storage, AI-versnellers en netwerk. Zoek op apparaat, rack, team of datacenter."
      :crumbs="[
        { text: 'Fundament', href: '/fysiek' },
        { text: 'Inventory', href: '/fysiek/inventory' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar datacenters" start-icon="chevron-left" href="/fysiek"></nldd-button>
      </template>
    </PageHeader>

    <nldd-collection layout="grid" item-width="220px">
      <MetricCard :value="totalDevices" label="Apparaten" sub="in alle racks" icon="rectangle-stack" />
      <MetricCard :value="`${(cap.vcpu / 1000).toFixed(1)}k`" label="Rekenkracht" :sub="`vCPU over ${cap.computeNodes} compute-nodes`" icon="cylinder-split" />
      <MetricCard :value="`${Math.round(cap.memGB / 1024)} TB`" label="Werkgeheugen" sub="RAM over alle nodes" icon="rectangle-stack" />
      <MetricCard :value="cap.gpus" label="GPU's" :sub="`in ${cap.gpuNodes} AI-nodes`" icon="sparkles" />
      <MetricCard :value="`${totalWattsKw} kW`" label="Vermogen" sub="opgeteld over alle apparaten" icon="cloud" />
    </nldd-collection>

    <nldd-spacer size="24" />

    <div class="rp-inv-toolbar">
      <nldd-search-field
        class="rp-inv-search"
        placeholder="Zoek op apparaat, rack, team of datacenter"
        accessible-label="Zoek hardware"
        :value="query"
        @input="(e) => ((query = e.target.value), resetLimit())"
      ></nldd-search-field>
      <nldd-segmented-control>
        <button
          v-for="k in KINDS"
          :key="k.id"
          type="button"
          :aria-pressed="kindFilter === k.id"
          @click="((kindFilter = k.id), resetLimit())"
        >{{ k.label }}</button>
      </nldd-segmented-control>
      <nldd-dropdown>
        <select :value="dcFilter" @change="(e) => ((dcFilter = e.target.value), resetLimit())">
          <option value="all">Alle datacenters</option>
          <option v-for="d in store.datacenters" :key="d.id" :value="d.id">{{ d.name }}</option>
        </select>
      </nldd-dropdown>
    </div>

    <nldd-spacer size="12" />
    <p class="rp-inv-count">{{ filtered.length }} van {{ totalDevices }} apparaten</p>
    <nldd-spacer size="8" />

    <DataTable :columns="columns" :rows="visible" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'kindLabel'">
          <nldd-tag :color="row.kind === 'gpu' ? 'warning' : row.kind === 'storage' ? 'accent' : 'neutral'" size="md">{{ value }}</nldd-tag>
        </template>
        <template v-else-if="col.key === 'location'">
          <router-link :to="`/fysiek/racks/${row.rackId}`" class="rp-link">{{ row.dc }} · {{ row.rack }} · {{ row.position }}</router-link>
        </template>
        <template v-else-if="col.key === 'watts'">{{ value }} W</template>
        <template v-else-if="col.key === 'status'"><StatusBadge :status="value" /></template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <p v-if="moreCount > 0" class="rp-inv-more">
      Nog {{ moreCount }} apparaten. Verfijn je zoekopdracht of filter.
    </p>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-inv-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.rp-inv-search { flex: 1 1 18rem; }
.rp-inv-count {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-inv-more {
  margin: 0.8rem 0 0;
  font-size: 0.85rem;
  opacity: 0.6;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
}
.rp-link:hover { text-decoration: underline; }
</style>
