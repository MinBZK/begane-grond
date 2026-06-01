<script setup>
// Hardware catalogue: the standard Rijkslaptop models a team can order, with
// specs, stock, lead time and price. "Bestellen" routes straight into the
// provisioning wizard with the chosen model pre-selected.
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import CliHint from '../../components/shared/CliHint.vue';
import DeviceIllustration from './DeviceIllustration.vue';

const store = usePlatformStore();
const router = useRouter();

// How many fleet devices currently run each model (live count).
const deployedByModel = computed(() => {
  const map = {};
  for (const wp of store.workplaces) map[wp.model] = (map[wp.model] || 0) + 1;
  return map;
});

const stockColor = (n) => (n > 15 ? 'success' : n > 5 ? 'warning' : 'critical');

// Filter by device category. 'all' shows everything.
const categoryFilter = ref('all');
const filteredHardware = computed(() =>
  categoryFilter.value === 'all'
    ? store.hardware
    : store.hardware.filter((hw) => hw.category === categoryFilter.value),
);
// Categories that actually have devices, with a count for the chip.
const categories = computed(() =>
  store.deviceCategories
    .map((c) => ({ ...c, count: store.hardware.filter((hw) => hw.category === c.id).length }))
    .filter((c) => c.count > 0),
);

function order(modelId) {
  router.push({ path: '/werkplekken/nieuw', query: { model: modelId } });
}

const euro = (n) => '€ ' + n.toLocaleString('nl-NL');

const lastOrdered = ref('');
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Hardware-catalogus"
      lede="Alle uitgeefbare devices: autonome Linux-laptops, modulaire Framework-laptops, zware dev-workstations, tablets en diensttelefoons. Versleuteld en MDM-beheerd. Bestel direct of laat een medewerker uitrollen."
      :crumbs="[
        { text: 'Begane Grond', href: '/' },
        { text: 'Werkplekken', href: '/werkplekken' },
        { text: 'Hardware', href: '/werkplekken/hardware' },
      ]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="Naar vloot"
          start-icon="person-2"
          @click="router.push('/werkplekken')"
        ></nldd-button>
      </template>
    </PageHeader>

    <!-- Device-category filter -->
    <div class="rp-cat-filter">
      <button type="button" class="rp-cat" :class="{ 'rp-cat-on': categoryFilter === 'all' }" @click="categoryFilter = 'all'">
        Alle devices
      </button>
      <button
        v-for="c in categories"
        :key="c.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': categoryFilter === c.id }"
        @click="categoryFilter = c.id"
      >
        <nldd-icon :name="c.icon" aria-hidden="true"></nldd-icon>
        {{ c.label }} ({{ c.count }})
      </button>
    </div>
    <nldd-spacer size="20" />

    <nldd-collection layout="grid" item-width="380px">
      <nldd-card v-for="hw in filteredHardware" :key="hw.id" class="rp-hw-card">
        <nldd-container padding="24">
          <!-- Stylised device illustration -->
          <DeviceIllustration :type="hw.illustration" />
          <nldd-spacer size="16" />

          <div class="rp-hw-head">
            <div class="rp-min-width-0">
              <nldd-title size="4"><h2>{{ hw.name }}</h2></nldd-title>
              <span class="rp-hw-sub">{{ deployedByModel[hw.id] || 0 }}× in gebruik</span>
            </div>
            <nldd-tag v-if="hw.circular" color="success" size="md">circulair</nldd-tag>
          </div>

          <nldd-spacer size="16" />

          <div class="rp-hw-specs">
            <div>
              <nldd-icon name="gear" aria-hidden="true"></nldd-icon>
              <span>{{ hw.cpu }}</span>
            </div>
            <div>
              <nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon>
              <span>{{ hw.ram }} werkgeheugen</span>
            </div>
            <div>
              <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
              <span>{{ hw.storage }}</span>
            </div>
            <div v-if="hw.gpu">
              <nldd-icon name="sparkles" aria-hidden="true"></nldd-icon>
              <span>GPU: {{ hw.gpu }}</span>
            </div>
            <div>
              <nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon>
              <span>Full-disk-encryptie standaard</span>
            </div>
            <div v-if="hw.repairScore >= 9">
              <nldd-icon name="heart" aria-hidden="true"></nldd-icon>
              <span>Repareerbaarheid {{ hw.repairScore }}/10 (recht op reparatie)</span>
            </div>
          </div>
          <p v-if="hw.note" class="rp-hw-note">{{ hw.note }}</p>

          <nldd-spacer size="16" />

          <div class="rp-hw-stats">
            <div class="rp-hw-stat">
              <span class="rp-hw-stat-label">Voorraad</span>
              <nldd-tag :color="stockColor(hw.stock)" size="md">{{ hw.stock }} op voorraad</nldd-tag>
            </div>
            <div class="rp-hw-stat">
              <span class="rp-hw-stat-label">Levertijd</span>
              <span class="rp-hw-stat-value">{{ hw.lead }}</span>
            </div>
            <div class="rp-hw-stat">
              <span class="rp-hw-stat-label">Prijs</span>
              <span class="rp-hw-stat-value">{{ euro(hw.price) }}</span>
            </div>
          </div>

          <nldd-spacer size="20" />

          <nldd-button
            variant="primary"
            text="Bestellen"
            start-icon="plus"
            end-icon="arrow-right"
            @click="order(hw.id); lastOrdered = hw.id"
          ></nldd-button>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="24" />

    <CliHint
      :command="`rp werkplek hardware list${lastOrdered ? '\\nrp werkplek provision --model ' + lastOrdered : ''}`"
      label="Bekijk of bestel hardware ook via de CLI:"
    />
  </div>
</template>

<style scoped>
.rp-hw-card {
  height: 100%;
}
.rp-cat-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-cat {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
}
.rp-cat:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-cat-on {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color);
  font-weight: 700;
}
.rp-cat nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-hw-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
}
.rp-hw-note {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  opacity: 0.7;
  font-style: italic;
}
.rp-hw-sub {
  font-size: 0.8rem;
  opacity: 0.65;
}
.rp-hw-specs {
  display: grid;
  gap: 0.55rem;
}
.rp-hw-specs div {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.9rem;
}
.rp-hw-specs nldd-icon {
  width: 1.05rem;
  height: 1.05rem;
  opacity: 0.6;
  flex: 0 0 auto;
}
.rp-hw-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 0.85rem;
  border-top: 1px solid var(--semantics-dividers-color);
}
.rp-hw-stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.rp-hw-stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-hw-stat-value {
  font-weight: 700;
}
</style>
