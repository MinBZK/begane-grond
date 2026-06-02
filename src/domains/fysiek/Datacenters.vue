<script setup>
// Overview of the Rijksoverheid datacenters: one tile per DC with status, PUE
// and a capacity bar (usedKw / capacityKw). This is the entry point of the
// physical-infrastructure domain; click a tile to drill into the detail page.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

const totalCapacity = computed(() => store.datacenters.reduce((s, d) => s + d.capacityKw, 0));
const totalUsed = computed(() => store.datacenters.reduce((s, d) => s + d.usedKw, 0));
// Actually-modelled racks (not the dc.racks capacity field, which is a planned
// total). The capacity sum lives in the sub-label.
const totalRacks = computed(() => store.racks.length);
const rackCapacity = computed(() => store.datacenters.reduce((s, d) => s + d.racks, 0));
const dcOperationeel = computed(() => store.datacenters.filter((d) => d.status === 'operationeel').length);
const dcInAanbouw = computed(() => store.datacenters.filter((d) => d.status === 'in aanbouw').length);
const avgPue = computed(() => {
  const live = store.datacenters.filter((d) => d.usedKw > 0);
  if (!live.length) return '—';
  return (live.reduce((s, d) => s + d.pue, 0) / live.length).toFixed(2);
});

function pct(dc) {
  if (!dc.capacityKw) return 0;
  return Math.round((dc.usedKw / dc.capacityKw) * 100);
}
function barColor(p) {
  if (p >= 80) return 'var(--rp-crit, #d52b1e)';
  if (p >= 60) return 'var(--rp-warn, #e08c00)';
  return 'var(--rp-ok, #218838)';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Datacenters"
      lede="Eigen, soevereine datacenters van het Rijk. Capaciteit, energie-efficiëntie (PUE) en bezetting in één oogopslag."
      :crumbs="[{ text: 'Fundament', href: '/fysiek' }, { text: 'Datacenters', href: '/fysiek' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Netwerktopologie" start-icon="arrow-up-arrow-down" href="/fysiek/netwerk"></nldd-button>
        <nldd-button variant="primary" text="Inkoop & planning" start-icon="euro-sign" href="/fysiek/inkoop"></nldd-button>
      </template>
    </PageHeader>

    <nldd-collection layout="grid" item-width="220px">
      <MetricCard :value="store.datacenters.length" label="Datacenters" :sub="`${dcOperationeel} operationeel${dcInAanbouw ? `, ${dcInAanbouw} in aanbouw` : ''}`" icon="apartment-building" />
      <MetricCard :value="`${totalUsed} kW`" :label="`van ${totalCapacity} kW capaciteit`" :sub="`${Math.round((totalUsed / totalCapacity) * 100)}% benut`" icon="cloud" />
      <MetricCard :value="totalRacks" label="Racks in productie" :sub="`${rackCapacity} rackposities capaciteit`" icon="rectangle-stack" />
      <MetricCard :value="avgPue" label="Gemiddelde PUE" sub="lager is beter" icon="starburst-filled" />
    </nldd-collection>

    <nldd-spacer size="28" />

    <nldd-collection layout="grid" item-width="380px">
      <router-link
        v-for="dc in store.datacenters"
        :key="dc.id"
        :to="`/fysiek/datacenters/${dc.id}`"
        class="rp-dc-link"
      >
        <nldd-card :accessible-label="dc.name">
          <nldd-container padding="20">
            <div class="rp-dc-head">
              <div>
                <nldd-title size="4"><h2>{{ dc.name }}</h2></nldd-title>
                <div class="rp-dc-city">
                  <nldd-icon name="house" aria-hidden="true"></nldd-icon>
                  {{ dc.city }}
                </div>
              </div>
              <StatusBadge :status="dc.status" />
            </div>

            <nldd-spacer size="16" />

            <div class="rp-dc-bar-label">
              <span>Vermogen</span>
              <span class="rp-mono">{{ dc.usedKw }} / {{ dc.capacityKw }} kW</span>
            </div>
            <div class="rp-dc-bar">
              <div class="rp-dc-bar-fill" :style="{ width: pct(dc) + '%', background: barColor(pct(dc)) }"></div>
            </div>
            <div class="rp-dc-bar-pct">{{ pct(dc) }}% benut</div>

            <nldd-spacer size="16" />

            <div class="rp-dc-stats">
              <div>
                <span class="rp-dc-stat-val">{{ dc.pue }}</span>
                <span class="rp-dc-stat-lbl">PUE</span>
              </div>
              <div>
                <span class="rp-dc-stat-val">{{ dc.redundancy }}</span>
                <span class="rp-dc-stat-lbl">Redundantie</span>
              </div>
              <div>
                <span class="rp-dc-stat-val">{{ dc.racks }}</span>
                <span class="rp-dc-stat-lbl">Racks</span>
              </div>
              <div>
                <span class="rp-dc-stat-val rp-dc-stat-sm">{{ dc.uplinks }}</span>
                <span class="rp-dc-stat-lbl">Uplinks</span>
              </div>
            </div>

            <nldd-spacer size="14" />
            <div class="rp-dc-foot">
              Bekijk datacenter
              <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-dc-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-dc-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.rp-dc-city {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  opacity: 0.7;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.rp-dc-city nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-dc-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  margin-bottom: 0.35rem;
}
.rp-dc-bar {
  height: 12px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  overflow: hidden;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
}
.rp-dc-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease;
}
.rp-dc-bar-pct {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-top: 0.3rem;
}
.rp-dc-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  text-align: center;
}
.rp-dc-stat-val {
  display: block;
  font-weight: 700;
  font-size: 1.1rem;
}
.rp-dc-stat-sm {
  font-size: 0.8rem;
}
.rp-dc-stat-lbl {
  display: block;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  opacity: 0.55;
  margin-top: 0.1rem;
}
.rp-dc-foot {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-dc-foot nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-mono {
  font-variant-numeric: tabular-nums;
  font-family: ui-monospace, monospace;
}
</style>
