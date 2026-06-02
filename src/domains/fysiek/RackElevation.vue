<script setup>
// Classic 42U rack elevation. The rack is drawn bottom (U1) to top (U42) as a
// CSS grid of unit slots; devices span their height, show a status LED, label,
// team and watts. Empty slots stay visible. Tabs switch between Elevation,
// Power, Cooling and Cabling. Devices can be placed into a free slot and
// removed, both through store actions that mutate the rack live.
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const store = usePlatformStore();

const rack = computed(() => store.rackById(route.params.rack));
const dc = computed(() => (rack.value ? store.datacenterById(rack.value.dc) : null));
const alley = computed(() => (rack.value ? store.alleys.find((a) => a.id === rack.value.alley) : null));
const team = computed(() => (rack.value ? store.teamById(rack.value.team) : null));
// CI runner pools that physically run in this rack (cross-layer link).
const runnersHere = computed(() => (rack.value ? store.runnersByRack(rack.value.id) : []));

const tab = ref('elevatie');

// Build a U1..U42 map. For each occupied unit we know its device; spanned
// units point back to the device so we render the device once and skip spans.
const slots = computed(() => {
  if (!rack.value) return [];
  const occupiedBy = {};
  for (const d of rack.value.units) {
    for (let k = 0; k < (d.height || 1); k++) occupiedBy[d.u + k] = d;
  }
  const out = [];
  // Top to bottom for visual order (U42 first).
  for (let u = rack.value.heightU; u >= 1; u--) {
    const d = occupiedBy[u];
    out.push({ u, device: d, isStart: d && d.u === u, free: !d });
  }
  return out;
});

const usedU = computed(() => (rack.value ? rack.value.units.reduce((s, d) => s + (d.height || 1), 0) : 0));
const freeU = computed(() => (rack.value ? rack.value.heightU - usedU.value : 0));
const totalWatts = computed(() => (rack.value ? rack.value.units.reduce((s, d) => s + (d.watts || 0), 0) : 0));
const fillPct = computed(() => (rack.value ? Math.round((usedU.value / rack.value.heightU) * 100) : 0));

// Cabling relevant to this rack: match on device labels present in the rack.
const rackLabels = computed(() => new Set((rack.value?.units || []).map((d) => d.label)));
const rackCables = computed(() =>
  store.cables.filter((c) => {
    const a = c.from.split(':')[0];
    const b = c.to.split(':')[0];
    return rackLabels.value.has(a) || rackLabels.value.has(b);
  }),
);

function ledColor(status) {
  if (status === 'warn') return '#e08c00';
  if (status === 'crit') return '#d52b1e';
  return '#218838';
}
function typeColor(type) {
  return {
    server: 'rgba(33,99,196,0.14)',
    gpu: 'rgba(224,140,0,0.20)',
    switch: 'rgba(120,72,200,0.16)',
    pdu: 'rgba(80,80,80,0.12)',
    patch: 'rgba(33,150,120,0.14)',
  }[type] || 'rgba(0,0,0,0.05)';
}
function typeLabel(type) {
  return { server: 'Server', gpu: 'AI / GPU', switch: 'Switch', pdu: 'PDU', patch: 'Patchpaneel', blank: 'Blank' }[type] || type;
}

// --- Place device dialog ---
const showPlace = ref(false);
const form = ref({ label: '', type: 'server', height: 2, u: '', watts: 300, status: 'ok' });
const placed = ref(null);

const freeStarts = computed(() => {
  // U positions where a device of the chosen height fits without overlap.
  if (!rack.value) return [];
  const occupied = new Set();
  for (const d of rack.value.units) {
    for (let k = 0; k < (d.height || 1); k++) occupied.add(d.u + k);
  }
  const h = Number(form.value.height) || 1;
  const res = [];
  for (let u = 1; u <= rack.value.heightU - h + 1; u++) {
    let ok = true;
    for (let k = 0; k < h; k++) if (occupied.has(u + k)) ok = false;
    if (ok) res.push(u);
  }
  return res;
});

function openPlace() {
  placed.value = null;
  form.value = { label: '', type: 'server', height: 2, u: freeStarts.value[0] || '', watts: 300, status: 'ok' };
  showPlace.value = true;
}
function confirmPlace() {
  if (!form.value.label || !form.value.u) return;
  const device = {
    u: Number(form.value.u),
    height: Number(form.value.height),
    type: form.value.type,
    label: form.value.label,
    team: rack.value.team,
    watts: Number(form.value.watts) || 0,
    status: form.value.status,
  };
  store.placeDevice(rack.value.id, device);
  placed.value = device;
  showPlace.value = false;
}
function remove(u) {
  store.removeDevice(rack.value.id, u);
}

const cableColumns = [
  { key: 'from', label: 'Van', mono: true },
  { key: 'to', label: 'Naar', mono: true },
  { key: 'type', label: 'Type' },
  { key: 'length', label: 'Lengte' },
  { key: 'color', label: 'Kleur' },
  { key: 'status', label: 'Status' },
];
</script>

<template>
  <div v-if="rack" class="rp-page">
    <PageHeader
      :title="`Rack ${rack.label}`"
      :lede="`${rack.heightU}U rack in ${dc?.name}, ${alley?.name}. Eigenaar: ${team?.name || rack.team}.`"
      :crumbs="[
        { text: 'Fundament', href: '/fysiek' },
        { text: dc?.name || 'Datacenter', href: `/fysiek/datacenters/${rack.dc}` },
        { text: 'Zaalindeling', href: `/fysiek/datacenters/${rack.dc}/floor` },
        { text: rack.label, href: `/fysiek/racks/${rack.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="primary" text="Device plaatsen" start-icon="plus" @click="openPlace"></nldd-button>
      </template>
    </PageHeader>

    <div class="rp-rack-stats">
      <div><span class="rp-rs-val">{{ usedU }}U</span><span class="rp-rs-lbl">bezet</span></div>
      <div><span class="rp-rs-val">{{ freeU }}U</span><span class="rp-rs-lbl">vrij</span></div>
      <div><span class="rp-rs-val">{{ fillPct }}%</span><span class="rp-rs-lbl">bezetting</span></div>
      <div><span class="rp-rs-val">{{ totalWatts }} W</span><span class="rp-rs-lbl">vermogen</span></div>
      <div><span class="rp-rs-val">{{ rack.units.length }}</span><span class="rp-rs-lbl">devices</span></div>
    </div>

    <nldd-spacer size="20" />

    <div class="rp-rack-layout">
      <!-- Left: the elevation drawing (always shown) -->
      <div class="rp-elevation">
        <div class="rp-elev-frame">
          <div class="rp-elev-toplbl">{{ rack.label }} · voorkant</div>
          <div class="rp-elev-grid">
            <div
              v-for="s in slots"
              :key="s.u"
              class="rp-elev-row"
              :class="{ 'rp-elev-free': s.free }"
              :style="s.isStart ? { gridRow: `span ${s.device.height || 1}` } : null"
              v-show="s.free || s.isStart"
            >
              <span class="rp-elev-u">{{ s.u }}</span>
              <template v-if="s.isStart">
                <div class="rp-elev-device" :style="{ background: typeColor(s.device.type) }">
                  <span class="rp-elev-led" :style="{ background: ledColor(s.device.status) }"></span>
                  <div class="rp-elev-dmain">
                    <span class="rp-elev-dlabel">{{ s.device.label }}</span>
                    <span class="rp-elev-dmeta">
                      {{ typeLabel(s.device.type) }} · {{ s.device.height }}U
                      <template v-if="s.device.watts"> · {{ s.device.watts }}W</template>
                    </span>
                  </div>
                  <button class="rp-elev-rm" title="Verwijderen" @click="remove(s.device.u)">
                    <nldd-icon name="dismiss" aria-hidden="true"></nldd-icon>
                  </button>
                </div>
              </template>
              <span v-else class="rp-elev-empty">leeg</span>
            </div>
          </div>
          <div class="rp-elev-botlbl">U1 — bodem</div>
        </div>
      </div>

      <!-- Right: tabbed detail -->
      <div class="rp-rack-detail">
        <nldd-tab-bar>
          <nldd-tab-bar-item text="Overzicht" :selected="tab === 'elevatie'" @select="tab = 'elevatie'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="Stroom" :selected="tab === 'stroom'" @select="tab = 'stroom'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="Koeling" :selected="tab === 'koeling'" @select="tab = 'koeling'"></nldd-tab-bar-item>
          <nldd-tab-bar-item text="Bekabeling" :selected="tab === 'bekabeling'" @select="tab = 'bekabeling'"></nldd-tab-bar-item>
        </nldd-tab-bar>

        <nldd-spacer size="16" />

        <!-- Overzicht -->
        <nldd-card v-if="tab === 'elevatie'" accessible-label="Devices">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Geïnstalleerde apparatuur</h3></nldd-title>
            <nldd-spacer size="12" />
            <nldd-list>
              <nldd-list-item v-for="d in [...rack.units].sort((a, b) => b.u - a.u)" :key="d.u">
                <nldd-icon-cell>
                  <span class="rp-led-inline" :style="{ background: ledColor(d.status) }"></span>
                </nldd-icon-cell>
                <nldd-title-cell :text="d.label" :supporting-text="`U${d.u} · ${typeLabel(d.type)} · ${d.height}U`"></nldd-title-cell>
                <nldd-spacer-cell></nldd-spacer-cell>
                <nldd-text-cell :text="d.team ? (store.teamById(d.team)?.name || d.team) : '—'"></nldd-text-cell>
                <nldd-text-cell :text="`${d.watts || 0} W`"></nldd-text-cell>
              </nldd-list-item>
            </nldd-list>
            <nldd-rich-text v-if="!rack.units.length"><p>Dit rack is leeg. Plaats een device om te beginnen.</p></nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <!-- Stroom -->
        <nldd-card v-else-if="tab === 'stroom'" accessible-label="Stroom">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Stroomverdeling</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-power-total">
              <span class="rp-power-big">{{ totalWatts }} W</span>
              <span class="rp-power-sub">≈ {{ (totalWatts / 1000).toFixed(2) }} kW belasting · gevoed via {{ rack.units.filter((d) => d.type === 'pdu').length || 1 }}× PDU</span>
            </div>
            <nldd-spacer size="16" />
            <div v-for="d in rack.units.filter((x) => (x.watts || 0) > 0)" :key="d.u" class="rp-power-row">
              <span class="rp-power-lbl rp-mono">{{ d.label }}</span>
              <div class="rp-power-bar">
                <div class="rp-power-bar-in" :style="{ width: Math.min(100, (d.watts / 700) * 100) + '%' }"></div>
              </div>
              <span class="rp-mono rp-power-w">{{ d.watts }} W</span>
            </div>
            <nldd-spacer size="12" />
            <nldd-rich-text><p class="rp-fade">PDU-capaciteit per fase: 16A @ 230V (≈ 3680 W). Huidige belasting laat ruimte voor uitbreiding.</p></nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <!-- Koeling -->
        <nldd-card v-else-if="tab === 'koeling'" accessible-label="Koeling">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Koeling en airflow</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-cool-grid">
              <div class="rp-cool-tile rp-cool-cold">
                <nldd-icon name="cloud" aria-hidden="true"></nldd-icon>
                <span class="rp-cool-val">Voor koud, achter warm</span>
                <span class="rp-cool-lbl">containment in {{ alley?.name }}</span>
              </div>
              <div class="rp-cool-tile">
                <span class="rp-cool-val">{{ (totalWatts / 1000 * 3.412).toFixed(1) }} kBTU/u</span>
                <span class="rp-cool-lbl">warmteafgifte</span>
              </div>
              <div class="rp-cool-tile">
                <span class="rp-cool-val" :style="{ color: rack.units.some((d) => d.status === 'warn') ? '#e08c00' : '#218838' }">
                  {{ rack.units.some((d) => d.status === 'warn') ? 'Let op' : 'Nominaal' }}
                </span>
                <span class="rp-cool-lbl">thermische status</span>
              </div>
              <div class="rp-cool-tile">
                <span class="rp-cool-val">22 °C</span>
                <span class="rp-cool-lbl">aanvoertemperatuur</span>
              </div>
            </div>
            <nldd-spacer size="14" />
            <nldd-rich-text>
              <p class="rp-fade">
                Containment volgens hot-aisle/cold-aisle. Koude lucht wordt aan de voorzijde aangezogen, warme lucht via de achterzijde afgevoerd naar de naastgelegen warme gang.
              </p>
            </nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <!-- Bekabeling -->
        <nldd-card v-else accessible-label="Bekabeling">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Bekabeling</h3></nldd-title>
            <nldd-spacer size="12" />
            <DataTable :columns="cableColumns" :rows="rackCables" row-key="id">
              <template #cell="{ col, value }">
                <template v-if="col.key === 'status'"><StatusBadge :status="value" /></template>
                <template v-else-if="col.key === 'color'">
                  <span class="rp-cable-color"><span class="rp-cable-dot" :class="`rp-cab-${value}`"></span>{{ value }}</span>
                </template>
                <template v-else>{{ value }}</template>
              </template>
            </DataTable>
            <nldd-rich-text v-if="!rackCables.length"><p class="rp-fade">Geen geregistreerde patches voor dit rack.</p></nldd-rich-text>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="16" />

        <RelationLinks
          title="Doorklikken"
          :links="[
            { text: dc?.name || 'Datacenter', to: `/fysiek/datacenters/${rack.dc}`, icon: 'apartment-building' },
            { text: 'Zaalindeling', to: `/fysiek/datacenters/${rack.dc}/floor`, icon: 'rectangle-stack' },
            ...(team ? [{ text: `Team ${team.name}`, to: `/teams/${team.id}`, icon: 'person-2' }] : []),
            ...runnersHere.map((r) => ({ text: `CI-runner: ${r.name}`, to: '/environments/runners', icon: 'ship-wheel' })),
            { text: 'Netwerktopologie', to: '/fysiek/netwerk', icon: 'arrow-up-arrow-down' },
          ]"
        />
      </div>
    </div>

    <!-- Place device dialog -->
    <nldd-modal-dialog v-if="showPlace" open title="Device plaatsen" @close="showPlace = false">
      <div class="rp-place-form">
        <nldd-form-field label="Naam / label">
          <nldd-text-field :value="form.label" placeholder="bv. k8s-node-04" @input="(e) => (form.label = e.target.value)"></nldd-text-field>
        </nldd-form-field>
        <nldd-form-field label="Type">
          <nldd-dropdown>
            <select :value="form.type" @change="(e) => (form.type = e.target.value)">
              <option value="server">Server</option>
              <option value="gpu">AI / GPU</option>
              <option value="switch">Switch</option>
              <option value="pdu">PDU</option>
              <option value="patch">Patchpaneel</option>
            </select>
          </nldd-dropdown>
        </nldd-form-field>
        <div class="rp-place-row">
          <nldd-form-field label="Hoogte (U)">
            <nldd-dropdown>
              <select :value="form.height" @change="(e) => { form.height = e.target.value; form.u = freeStarts[0] || ''; }">
                <option v-for="h in [1, 2, 4, 6, 8]" :key="h" :value="h">{{ h }}U</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-form-field label="Positie (start-U)">
            <nldd-dropdown>
              <select :value="form.u" @change="(e) => (form.u = e.target.value)">
                <option v-for="u in freeStarts" :key="u" :value="u">U{{ u }}</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
        </div>
        <nldd-form-field label="Vermogen (W)">
          <nldd-number-field :value="form.watts" @input="(e) => (form.watts = e.target.value)"></nldd-number-field>
        </nldd-form-field>
        <nldd-spacer size="8" />
        <nldd-rich-text v-if="!freeStarts.length"><p class="rp-fade">Geen vrije ruimte voor deze hoogte. Kies een kleiner device of verwijder eerst iets.</p></nldd-rich-text>
      </div>
      <nldd-button-group slot="actions" orientation="horizontal">
        <nldd-button variant="secondary" text="Annuleren" @click="showPlace = false"></nldd-button>
        <nldd-button variant="primary" text="Plaatsen" start-icon="check-mark" :disabled="!form.label || !form.u || undefined" @click="confirmPlace"></nldd-button>
      </nldd-button-group>
    </nldd-modal-dialog>

    <CliHint
      v-if="placed"
      :command="`bg rack place ${rack.id} --label ${placed.label} --type ${placed.type} --u ${placed.u} --height ${placed.height}`"
      :label="`Geplaatst: ${placed.label}. Dit kan ook via de CLI:`"
    />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Rack niet gevonden" :crumbs="[{ text: 'Datacenters', href: '/fysiek' }]" />
    <nldd-inline-dialog title="Onbekend rack" supporting-text="Dit rack bestaat niet of is verwijderd."></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-rack-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  padding: 0.25rem 0;
}
.rp-rs-val {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rp-rs-lbl {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  opacity: 0.55;
}
.rp-rack-layout {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 920px) {
  .rp-rack-layout {
    grid-template-columns: 1fr;
  }
}
/* --- Elevation --- */
.rp-elev-frame {
  border: 3px solid var(--semantics-text-default-color, #2a2a2a);
  border-radius: 10px;
  padding: 0;
  background: var(--semantics-surfaces-default-background-color, #fff);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.rp-elev-toplbl,
.rp-elev-botlbl {
  background: var(--semantics-text-default-color, #2a2a2a);
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  padding: 0.3rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.rp-elev-grid {
  display: grid;
  grid-auto-rows: 22px;
  gap: 2px;
  padding: 6px;
  background: repeating-linear-gradient(
    var(--semantics-surfaces-tinted-background-color, #eef1f5) 0 22px,
    transparent 22px 24px
  );
}
.rp-elev-row {
  display: flex;
  align-items: stretch;
  gap: 4px;
  min-height: 22px;
}
.rp-elev-u {
  width: 22px;
  flex: 0 0 22px;
  font-size: 0.6rem;
  font-variant-numeric: tabular-nums;
  opacity: 0.45;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, monospace;
}
.rp-elev-free {
  opacity: 0.85;
}
.rp-elev-empty {
  flex: 1;
  border: 1px dashed var(--semantics-dividers-color, #cdd3da);
  border-radius: 4px;
  font-size: 0.6rem;
  color: var(--semantics-text-default-color, #1a1a1a);
  opacity: 0.3;
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.rp-elev-device {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--semantics-dividers-color, #cdd3da);
  padding: 0 0.5rem;
}
.rp-elev-led {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex: 0 0 9px;
  box-shadow: 0 0 5px currentColor;
}
.rp-elev-dmain {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  line-height: 1.15;
  padding: 2px 0;
}
.rp-elev-dlabel {
  font-size: 0.78rem;
  font-weight: 700;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-elev-dmeta {
  font-size: 0.62rem;
  opacity: 0.6;
}
.rp-elev-rm {
  border: none;
  background: transparent;
  cursor: pointer;
  opacity: 0.4;
  display: flex;
  align-items: center;
  padding: 2px;
}
.rp-elev-rm:hover {
  opacity: 1;
  color: #d52b1e;
}
.rp-elev-rm nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
/* --- Power --- */
.rp-power-total {
  display: flex;
  flex-direction: column;
}
.rp-power-big {
  font-size: 2rem;
  font-weight: 700;
}
.rp-power-sub {
  opacity: 0.6;
  font-size: 0.85rem;
}
.rp-power-row {
  display: grid;
  grid-template-columns: 130px 1fr 70px;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
}
.rp-power-lbl {
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-power-bar {
  height: 8px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  overflow: hidden;
}
.rp-power-bar-in {
  height: 100%;
  background: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-power-w {
  text-align: right;
  font-size: 0.8rem;
}
/* --- Cooling --- */
.rp-cool-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}
.rp-cool-tile {
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.rp-cool-tile nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  opacity: 0.7;
}
.rp-cool-hot {
  background: rgba(213, 43, 30, 0.08);
  border-color: rgba(213, 43, 30, 0.35);
}
.rp-cool-cold {
  background: rgba(33, 99, 196, 0.08);
  border-color: rgba(33, 99, 196, 0.35);
}
.rp-cool-val {
  font-weight: 700;
  font-size: 1.05rem;
}
.rp-cool-lbl {
  font-size: 0.72rem;
  opacity: 0.6;
}
/* --- shared --- */
.rp-led-inline {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.rp-cable-color {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-cable-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.rp-cab-blauw { background: #2163c4; }
.rp-cab-geel { background: #e6c200; }
.rp-cab-groen { background: #218838; }
.rp-cab-rood { background: #d52b1e; }
.rp-place-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 300px;
}
.rp-place-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.rp-mono {
  font-family: ui-monospace, monospace;
  font-variant-numeric: tabular-nums;
}
.rp-fade {
  opacity: 0.6;
  font-size: 0.85rem;
}
</style>
