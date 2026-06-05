<script setup>
// One basisregistratie in detail: its fields, the data holder, the AVG
// classification and availability, and crucially its consumers (which services
// and laws read which field). The consumers list is the traceability spine.
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const register = computed(() => store.registerById(route.params.id));
const authority = computed(() => (register.value ? store.orgById(register.value.authority) : null));
const consumers = computed(() => (register.value ? store.consumersOfRegister(register.value.id) : []));

// Resolve each consumer (app or wet) to a name + deep link.
const consumerRows = computed(() =>
  consumers.value.map((c) => {
    const isWet = c.type === 'wet';
    const entity = isWet ? store.wetById(c.consumer) : store.appById(c.consumer);
    return {
      id: c.id,
      naam: entity?.name || c.consumer,
      soort: isWet ? 'Wet' : 'Dienst',
      veld: c.via,
      to: isWet ? `/wetten/${c.consumer}` : `/apps/${c.consumer}`,
    };
  }),
);
const consumerColumns = [
  { key: 'naam', label: 'Afnemer' },
  { key: 'soort', label: 'Soort' },
  { key: 'veld', label: 'Afgenomen veld', mono: true },
];

// The consumers list is the traceability spine and grows unbounded at platform
// scale (a popular register is read by dozens of services and laws). Filter on
// afnemer/veld + a soort-chip, and cap the table at an initial N rows with a
// "Toon meer" control so the page stays manageable.
const query = ref('');
const soortFilter = ref('alle');
const limit = ref(25);
const soortFilters = [
  { id: 'alle', label: 'Alle' },
  { id: 'Dienst', label: 'Diensten' },
  { id: 'Wet', label: 'Wetten' },
];

const filteredConsumers = computed(() => {
  const q = query.value.trim().toLowerCase();
  return consumerRows.value.filter((r) => {
    if (soortFilter.value !== 'alle' && r.soort !== soortFilter.value) return false;
    if (!q) return true;
    return r.naam.toLowerCase().includes(q) || r.veld.toLowerCase().includes(q);
  });
});
const visibleConsumers = computed(() => filteredConsumers.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filteredConsumers.value.length - limit.value));

const relations = computed(() => {
  if (!register.value) return [];
  const links = [{ text: 'Koppelvlakken (Digikoppeling/FSC)', to: '/koppelvlakken/fsc', icon: 'link' }];
  if (authority.value) links.push({ text: authority.value.name, to: '/teams/organisatie', icon: 'apartment-building' });
  return links;
});
</script>

<template>
  <div v-if="register" class="rp-page">
    <PageHeader
      :title="register.name"
      :lede="`Gezaghebbende databron, beheerd door ${authority?.name || register.authority}. Diensten en wetten lezen hier rechtstreeks uit.`"
      :crumbs="[
        { text: 'Basisregistraties', href: '/registers' },
        { text: register.name, href: `/registers/${register.id}` },
      ]"
    >
      <template #actions>
        <a :href="`https://oin.logius.nl`" rel="noopener external">
          <nldd-button variant="secondary" :text="`OIN ${register.oin.slice(0, 8)}…`" end-icon="external-link"></nldd-button>
        </a>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="register.fields.length" label="Velden" sub="beschikbaar" icon="cylinder-split" />
      <MetricCard :value="consumers.length" label="Afnemers" sub="diensten en wetten" icon="link" />
      <MetricCard :value="register.availability" label="Beschikbaarheid" sub="SLA" icon="check-mark-circle" />
      <MetricCard :value="register.kind === 'basisregistratie' ? 'Basis' : 'Sectoraal'" label="Soort register" :sub="register.status" icon="certificate" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- Fields -->
      <nldd-card accessible-label="Velden" class="rp-span2">
        <nldd-container padding="20">
          <nldd-title size="5"><h2>Velden</h2></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-field-grid">
            <div v-for="f in register.fields" :key="f" class="rp-field-row">
              <nldd-icon name="circle-filled" aria-hidden="true"></nldd-icon>
              <span class="rp-mono">{{ f }}</span>
            </div>
          </div>
          <nldd-spacer size="16" />
          <p class="rp-class"><nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon> Classificatie: {{ register.classification }}</p>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Aansluiting" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Consumers -->
    <nldd-title size="3"><h2>Wie leest dit register</h2></nldd-title>
    <nldd-rich-text>
      <p>Elke afnemer leest een specifiek veld. Klik door naar de dienst of de wet die het gebruikt.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <div class="rp-consumer-filters">
      <nldd-search-field
        placeholder="Zoek op afnemer of veld"
        accessible-label="Zoek afnemer"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <div class="rp-chips">
        <nldd-button
          v-for="f in soortFilters"
          :key="f.id"
          :variant="soortFilter === f.id ? 'primary' : 'secondary'"
          :text="f.label"
          @click="soortFilter = f.id"
        ></nldd-button>
      </div>
    </div>

    <nldd-spacer size="12" />

    <DataTable :columns="consumerColumns" :rows="visibleConsumers" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'naam'">
          <router-link :to="row.to" class="rp-link">{{ row.naam }}</router-link>
        </template>
        <template v-else-if="col.key === 'soort'">
          <nldd-tag :color="row.soort === 'Wet' ? 'accent' : 'neutral'" size="md">{{ row.soort }}</nldd-tag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <p v-if="!filteredConsumers.length" class="rp-consumer-empty">
      Geen afnemers gevonden voor deze filters.
    </p>
    <div v-if="moreCount > 0" class="rp-consumer-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="limit += 25"
      ></nldd-button>
    </div>

    <nldd-spacer size="24" />
    <CliHint :command="`bg register show ${register.id}\nbg register connect ${register.id} --field ${register.fields[0]} --app app-toeslagen`" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Register niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar basisregistraties" @click="router.push('/registers')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-span2 {
  grid-column: span 2;
}
@media (max-width: 1007px) {
  .rp-span2 {
    grid-column: auto;
  }
}
.rp-field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.5rem;
}
.rp-field-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 8px;
}
.rp-field-row nldd-icon {
  width: 0.6rem;
  height: 0.6rem;
  opacity: 0.5;
  flex: 0 0 auto;
}
.rp-class {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  font-size: 0.88rem;
  opacity: 0.75;
}
.rp-class nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-consumer-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.rp-consumer-filters nldd-search-field {
  flex: 1 1 16rem;
  min-width: 12rem;
}
.rp-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-consumer-empty {
  opacity: 0.6;
  margin: 0.75rem 0 0;
}
.rp-consumer-more {
  margin-top: 0.75rem;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
</style>
