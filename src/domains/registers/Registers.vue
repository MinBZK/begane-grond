<script setup>
// Basisregistraties / databronnen catalogue. The authoritative data sources
// that laws and services read from (the stelsel van basisregistraties). This is
// the critical coupling: a machine-readable law's input.source points at one of
// these registers for values like income or insurance status.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';

const store = usePlatformStore();

const kindFilter = ref('all'); // all | basisregistratie | sectoraal
const filtered = computed(() =>
  kindFilter.value === 'all'
    ? store.registers
    : store.registers.filter((r) => r.kind === kindFilter.value),
);

const basisCount = computed(() => store.registers.filter((r) => r.kind === 'basisregistratie').length);
const totalConsumers = computed(() => store.registerConsumers.length);

function consumerCount(id) {
  return store.consumersOfRegister(id).length;
}
function authorityName(id) {
  return store.orgById(id)?.name || id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Basisregistraties"
      lede="Het stelsel van gezaghebbende databronnen waar wetten en diensten uit lezen. Een machine-leesbare wet haalt waarden zoals inkomen of verzekeringsstatus rechtstreeks uit een register. Dit is de bron onder de uitvoering."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Basisregistraties', href: '/registers' },
      ]"
    >
      <template #actions>
        <router-link to="/koppelvlakken/fsc">
          <nldd-button variant="secondary" text="Koppelvlakken (FSC)" start-icon="link"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.registers.length" label="Databronnen" sub="in het stelsel" icon="cylinder-split" />
      <MetricCard :value="basisCount" label="Basisregistraties" sub="gezaghebbend" icon="certificate" />
      <MetricCard :value="totalConsumers" label="Afnemers" sub="diensten en wetten" icon="link" to="/wetten" />
      <MetricCard value="AVG" label="Toegang gelogd" sub="elke uitlezing in audit-log" icon="lock-closed" to="/governance/audit" />
    </nldd-container>

    <nldd-spacer size="16" />
    <nldd-inline-dialog
      title="Bron bij de bron"
      supporting-text="Elke dienst leest hetzelfde register, niet een eigen kopie. Zo werkt iedereen met dezelfde gegevens en is herleidbaar waar een waarde vandaan komt."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <!-- Kind filter -->
    <div class="rp-cat-filter">
      <button type="button" class="rp-cat" :class="{ 'rp-cat-on': kindFilter === 'all' }" @click="kindFilter = 'all'">Alle</button>
      <button type="button" class="rp-cat" :class="{ 'rp-cat-on': kindFilter === 'basisregistratie' }" @click="kindFilter = 'basisregistratie'">Basisregistraties</button>
      <button type="button" class="rp-cat" :class="{ 'rp-cat-on': kindFilter === 'sectoraal' }" @click="kindFilter = 'sectoraal'">Sectoraal</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="r in filtered" :key="r.id" :to="`/registers/${r.id}`" class="rp-reg-link">
        <nldd-card :accessible-label="r.name">
          <nldd-container padding="20">
            <div class="rp-reg-head">
              <nldd-icon name="cylinder-split" aria-hidden="true" class="rp-reg-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2>{{ r.name }}</h2></nldd-title>
                <p class="rp-reg-sub">{{ authorityName(r.authority) }}</p>
              </div>
              <StatusBadge :status="r.status" />
            </div>

            <nldd-spacer size="10" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag :color="r.kind === 'basisregistratie' ? 'accent' : 'neutral'" size="md">{{ r.kind }}</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ r.fields.length }} velden</nldd-tag>
              <nldd-tag color="neutral" size="md">{{ consumerCount(r.id) }} afnemers</nldd-tag>
              <nldd-tag color="success" size="md">{{ r.availability }}</nldd-tag>
            </nldd-container>

            <nldd-spacer size="12" />
            <p class="rp-reg-class"><nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon> {{ r.classification }}</p>

            <nldd-spacer size="10" />
            <div class="rp-reg-fields">
              <span v-for="f in r.fields.slice(0, 5)" :key="f" class="rp-field-chip">{{ f }}</span>
              <span v-if="r.fields.length > 5" class="rp-field-chip rp-field-more">+{{ r.fields.length - 5 }}</span>
            </div>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-cat-filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-cat {
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
.rp-reg-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.rp-reg-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-reg-icon {
  width: 1.6rem;
  height: 1.6rem;
  flex: 0 0 auto;
  opacity: 0.8;
}
.rp-reg-sub {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  opacity: 0.65;
}
.rp-reg-class {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.75;
}
.rp-reg-class nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-reg-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.rp-field-chip {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.78rem;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-field-more {
  opacity: 0.6;
}
</style>
