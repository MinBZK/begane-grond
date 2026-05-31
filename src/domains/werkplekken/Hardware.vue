<script setup>
// Hardware catalogue: the standard Rijkslaptop models a team can order, with
// specs, stock, lead time and price. "Bestellen" routes straight into the
// provisioning wizard with the chosen model pre-selected.
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();
const router = useRouter();

// How many fleet devices currently run each model (live count).
const deployedByModel = computed(() => {
  const map = {};
  for (const wp of store.workplaces) map[wp.model] = (map[wp.model] || 0) + 1;
  return map;
});

const stockColor = (n) => (n > 15 ? 'success' : n > 5 ? 'warning' : 'critical');

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
      lede="De gestandaardiseerde autonome Rijkslaptops. Versleuteld, MDM-beheerd en met een immutable image. Bestel direct of laat een nieuwe medewerker uitrollen."
      :crumbs="[
        { text: 'Rijksplatform', href: '/' },
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

    <nldd-collection layout="grid" item-width="380px">
      <nldd-card v-for="hw in store.hardware" :key="hw.id" class="rp-hw-card">
        <nldd-container padding="24">
          <div class="rp-hw-head">
            <nldd-icon name="rectangle-stack" aria-hidden="true" class="rp-hw-icon"></nldd-icon>
            <div>
              <nldd-title size="4"><h2>{{ hw.name }}</h2></nldd-title>
              <span class="rp-hw-sub">{{ deployedByModel[hw.id] || 0 }}× in gebruik</span>
            </div>
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
            <div>
              <nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon>
              <span>Full-disk-encryptie standaard</span>
            </div>
          </div>

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
.rp-hw-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.rp-hw-icon {
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.5rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color);
  color: var(--semantics-actions-primary-default-background-color, #154273);
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
