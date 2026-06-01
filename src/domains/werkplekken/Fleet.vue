<script setup>
// Fleet overview: every provisioned Rijkslaptop in the field. Shows the
// assigned person, hardware model, OS image, lifecycle status and compliance
// posture (encrypted / up-to-date). Each row clicks through to the detail page.
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();
const router = useRouter();

const personName = (id) => store.personById(id)?.name || id;
const modelName = (id) => store.hardware.find((h) => h.id === id)?.name || id;
const imageName = (id) => store.images.find((i) => i.id === id)?.name || id;

// KPI roll-up across the whole fleet.
const total = computed(() => store.workplaces.length);
const live = computed(() => store.workplaces.filter((w) => w.status === 'in gebruik').length);
const provisioning = computed(
  () => store.workplaces.filter((w) => w.status !== 'in gebruik').length,
);
const compliant = computed(
  () => store.workplaces.filter((w) => w.encrypted && w.updated).length,
);
const compliancePct = computed(() =>
  total.value ? Math.round((compliant.value / total.value) * 100) : 0,
);

// The fleet runs into the hundreds, so the grid is search- and filter-driven
// with a capped initial render instead of dumping every laptop on one screen.
const PAGE = 24;
const query = ref('');
const statusFilter = ref('all');
const complianceFilter = ref('all');
const limit = ref(PAGE);

// Status chips: an "all" entry plus each lifecycle status that actually occurs.
const statusOptions = computed(() => {
  const counts = {};
  for (const w of store.workplaces) counts[w.status] = (counts[w.status] || 0) + 1;
  return [
    { value: 'all', label: 'Alle', count: store.workplaces.length },
    ...Object.keys(counts)
      .sort()
      .map((s) => ({ value: s, label: s, count: counts[s] })),
  ];
});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.workplaces.filter((w) => {
    if (statusFilter.value !== 'all' && w.status !== statusFilter.value) return false;
    if (complianceFilter.value === 'compliant' && !(w.encrypted && w.updated)) return false;
    if (complianceFilter.value === 'issue' && w.encrypted && w.updated) return false;
    if (!q) return true;
    return (
      personName(w.person).toLowerCase().includes(q) ||
      w.id.toLowerCase().includes(q) ||
      modelName(w.model).toLowerCase().includes(q) ||
      imageName(w.image).toLowerCase().includes(q)
    );
  });
});

const visible = computed(() => filtered.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, filtered.value.length - limit.value));

function setStatus(value) {
  statusFilter.value = value;
  limit.value = PAGE;
}
function setCompliance(value) {
  complianceFilter.value = complianceFilter.value === value ? 'all' : value;
  limit.value = PAGE;
}
function onQuery(value) {
  query.value = value;
  limit.value = PAGE;
}
function showMore() {
  limit.value += PAGE;
}

function goDetail(id) {
  router.push(`/werkplekken/${id}`);
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Werkplek-vloot"
      lede="Alle uitgerolde Rijkslaptops, hun toegewezen medewerker en hun nalevingsstatus. Klik een werkplek aan voor de levenscyclus."
      :crumbs="[
        { text: 'Begane Grond', href: '/' },
        { text: 'Werkplekken', href: '/werkplekken' },
      ]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="Hardware-catalogus"
          start-icon="rectangle-stack"
          @click="router.push('/werkplekken/hardware')"
        ></nldd-button>
        <nldd-button
          variant="primary"
          text="Werkplek uitrollen"
          start-icon="plus"
          @click="router.push('/werkplekken/nieuw')"
        ></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="total" label="Werkplekken" sub="totaal in beheer" icon="person-2" />
      <MetricCard :value="live" label="In gebruik" sub="actief uitgerold" icon="check-mark-circle" />
      <MetricCard
        :value="provisioning"
        label="In uitrol"
        sub="besteld of provisioning"
        icon="clock"
      />
      <MetricCard
        :value="compliancePct + '%'"
        label="Compliant"
        :sub="`${compliant} van ${total} versleuteld en up-to-date`"
        icon="shield-check-mark"
      />
    </nldd-container>

    <nldd-spacer size="24" />

    <div class="rp-fleet-filters">
      <nldd-search-field
        placeholder="Zoek op naam, werkplek-id, model of image"
        accessible-label="Zoek werkplek"
        :value="query"
        @input="(e) => onQuery(e.target.value)"
      ></nldd-search-field>

      <div class="rp-chip-row">
        <nldd-button
          v-for="opt in statusOptions"
          :key="opt.value"
          :variant="statusFilter === opt.value ? 'primary' : 'secondary'"
          :text="`${opt.label} (${opt.count})`"
          size="sm"
          @click="setStatus(opt.value)"
        ></nldd-button>
      </div>

      <div class="rp-chip-row">
        <nldd-button
          :variant="complianceFilter === 'compliant' ? 'primary' : 'secondary'"
          text="Compliant"
          start-icon="certificate"
          size="sm"
          @click="setCompliance('compliant')"
        ></nldd-button>
        <nldd-button
          :variant="complianceFilter === 'issue' ? 'primary' : 'secondary'"
          text="Aandacht nodig"
          start-icon="exclamation-triangle"
          size="sm"
          @click="setCompliance('issue')"
        ></nldd-button>
      </div>
    </div>

    <nldd-spacer size="16" />

    <p class="rp-fleet-count">
      {{ filtered.length }} werkplekken gevonden<span v-if="moreCount > 0"> ({{ visible.length }} getoond)</span>
    </p>

    <nldd-spacer size="12" />

    <nldd-collection layout="grid" item-width="340px">
      <nldd-card
        v-for="wp in visible"
        :key="wp.id"
        class="rp-wp-card"
        role="button"
        tabindex="0"
        @click="goDetail(wp.id)"
        @keyup.enter="goDetail(wp.id)"
      >
        <nldd-container padding="20">
          <div class="rp-wp-head">
            <div class="rp-wp-avatar">{{ store.personById(wp.person)?.avatar || '??' }}</div>
            <div class="rp-wp-id">
              <nldd-title size="5"><h3>{{ personName(wp.person) }}</h3></nldd-title>
              <span class="rp-wp-mono">{{ wp.id }}</span>
            </div>
            <StatusBadge :status="wp.status" />
          </div>

          <nldd-spacer size="12" />

          <dl class="rp-wp-meta">
            <div>
              <dt>Model</dt>
              <dd>{{ modelName(wp.model) }}</dd>
            </div>
            <div>
              <dt>Image</dt>
              <dd>{{ imageName(wp.image) }}</dd>
            </div>
            <div>
              <dt>Laatste check-in</dt>
              <dd>{{ wp.lastSeen }}</dd>
            </div>
          </dl>

          <nldd-spacer size="12" />

          <div class="rp-wp-badges">
            <nldd-tag :color="wp.encrypted ? 'success' : 'critical'" size="md">
              {{ wp.encrypted ? 'Versleuteld' : 'Niet versleuteld' }}
            </nldd-tag>
            <nldd-tag :color="wp.updated ? 'success' : 'warning'" size="md">
              {{ wp.updated ? 'Up-to-date' : 'Update nodig' }}
            </nldd-tag>
          </div>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <p v-if="!filtered.length" class="rp-fleet-empty">
      Geen werkplekken gevonden voor deze filters.
    </p>

    <div v-if="moreCount > 0" class="rp-fleet-more">
      <nldd-button
        variant="secondary"
        :text="`Toon meer (nog ${moreCount})`"
        start-icon="chevron-down"
        @click="showMore"
      ></nldd-button>
    </div>
  </div>
</template>

<style scoped>
.rp-fleet-filters {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.rp-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-fleet-count {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-fleet-empty {
  margin: 1.5rem 0;
  opacity: 0.6;
}
.rp-fleet-more {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.rp-wp-card {
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;
}
.rp-wp-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(21, 66, 115, 0.12);
}
.rp-wp-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rp-wp-avatar {
  flex: 0 0 auto;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  background: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-wp-id {
  flex: 1 1 auto;
  min-width: 0;
}
.rp-wp-mono {
  font-family: ui-monospace, monospace;
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-wp-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1rem;
  margin: 0;
}
.rp-wp-meta div {
  min-width: 0;
}
.rp-wp-meta dt {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-wp-meta dd {
  margin: 0.1rem 0 0;
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-wp-badges {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
</style>
