<script setup>
// Fleet overview: every provisioned Rijkslaptop in the field. Shows the
// assigned person, hardware model, OS image, lifecycle status and compliance
// posture (encrypted / up-to-date). Each row clicks through to the detail page.
import { computed } from 'vue';
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
        { text: 'Rijksplatform', href: '/' },
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

    <nldd-collection layout="grid" item-width="340px">
      <nldd-card
        v-for="wp in store.workplaces"
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
  </div>
</template>

<style scoped>
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
