<script setup>
// TLS-certificate inventory. Shows CN, issuing CA (PKIoverheid), expiry with a
// near-expiry warning, and the bound service (clickable through to the app).
// Read-only inventory: renewal is handled by the CA pipeline, surfaced here.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// Parse "over N dagen" into a number so we can flag near-expiry certs.
const daysLeft = (expires) => {
  const m = /(\d+)/.exec(expires || '');
  return m ? Number(m[1]) : null;
};

// Lifecycle status derived from days-to-expiry. Drives the StatusBadge colour
// (the badge maps these Dutch words via its built-in vocabulary).
const certStatus = (cert) => {
  const d = daysLeft(cert.expires);
  if (d === null) return 'onbekend';
  if (d <= 0) return 'verstoord';
  if (d <= 14) return 'kritiek';
  if (d <= 30) return 'verloopt binnenkort';
  return 'geldig';
};

// The DataTable + StatusBadge palette is keyed on these words; map the ones the
// shared badge does not already know to a colour locally.
const STATUS_COLOR = {
  geldig: 'success',
  'verloopt binnenkort': 'warning',
  kritiek: 'critical',
  verstoord: 'critical',
  onbekend: 'neutral',
};

const appForService = (cert) => store.apps.find((a) => a.id === cert.service) || null;

const columns = [
  { key: 'cn', label: 'Common name (CN)', mono: true },
  { key: 'ca', label: 'Uitgevende CA' },
  { key: 'service', label: 'Gekoppelde dienst' },
  { key: 'expires', label: 'Vervaldatum' },
  { key: 'status', label: 'Status' },
];

// Enrich rows with derived status so the table and metrics share one source.
const rows = computed(() =>
  store.certificates.map((c) => ({
    ...c,
    status: certStatus(c),
    days: daysLeft(c.expires),
    app: appForService(c),
  })),
);

const total = computed(() => rows.value.length);
const expiringSoon = computed(
  () => rows.value.filter((r) => r.status !== 'geldig' && r.status !== 'onbekend').length,
);
const soonest = computed(() => {
  const withDays = rows.value.filter((r) => r.days !== null);
  if (!withDays.length) return null;
  return withDays.reduce((a, b) => (a.days <= b.days ? a : b));
});
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Certificaten"
      lede="TLS-certificaten uitgegeven door de PKIoverheid-keten, gekoppeld aan de diensten die ze beveiligen. Vernieuwing loopt automatisch; verlopende certificaten worden hier gemarkeerd."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Secrets', href: '/secrets' },
        { text: 'Certificaten', href: '/secrets/certificaten' },
      ]"
    >
      <template #actions>
        <router-link to="/secrets">
          <nldd-button
            variant="secondary"
            text="Secrets-kluis"
            start-icon="lock-closed"
          ></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard
        :value="total"
        label="Actieve certificaten"
        sub="onder PKIoverheid"
        icon="certificate"
      />
      <MetricCard
        :value="expiringSoon"
        label="Vernieuwing nodig"
        :sub="expiringSoon ? 'binnen 30 dagen' : 'niets op korte termijn'"
        icon="clock"
      />
      <MetricCard
        v-if="soonest"
        :value="soonest.expires.replace(/^over\s*/, '')"
        label="Eerste vervaldatum"
        :sub="soonest.cn"
        icon="calendar-event"
      />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      v-if="expiringSoon"
      title="Let op: certificaten verlopen binnenkort"
      :supporting-text="`${expiringSoon} certificaat/certificaten vervalt binnen 30 dagen. De ACME-pipeline vernieuwt automatisch op T-21 dagen; controleer of de gekoppelde dienst de nieuwe keten oppikt.`"
    ></nldd-inline-dialog>

    <nldd-spacer v-if="expiringSoon" size="16" />

    <DataTable :columns="columns" :rows="rows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'ca'">
          <span class="rp-ca">
            <nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>
            {{ value }}
          </span>
        </template>

        <template v-else-if="col.key === 'service'">
          <router-link v-if="row.app" :to="`/apps/${row.app.id}`" class="rp-svc-link">
            <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
            {{ row.app.name }}
          </router-link>
          <span v-else class="rp-muted">{{ value }}</span>
        </template>

        <template v-else-if="col.key === 'expires'">
          <span
            class="rp-expiry"
            :class="{ 'rp-expiry-warn': row.status !== 'geldig' && row.status !== 'onbekend' }"
          >
            <nldd-icon
              v-if="row.status !== 'geldig' && row.status !== 'onbekend'"
              name="exclamation-triangle"
              aria-hidden="true"
            ></nldd-icon>
            {{ value }}
            <span v-if="row.days !== null" class="rp-days">({{ row.days }} dagen)</span>
          </span>
        </template>

        <template v-else-if="col.key === 'status'">
          <nldd-tag :color="STATUS_COLOR[row.status] || 'neutral'" size="md">
            {{ row.status }}
          </nldd-tag>
        </template>

        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <CliHint
      command="bg cert list --ca pkioverheid"
      label="Certificaten opvragen via de CLI:"
    />
  </div>
</template>

<style scoped>
.rp-ca {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-ca nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.7;
}
.rp-svc-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  color: var(--semantics-action-default-color, currentColor);
  font-weight: 600;
}
.rp-svc-link nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
}
.rp-svc-link:hover {
  text-decoration: underline;
}
.rp-muted {
  opacity: 0.6;
}
.rp-expiry {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.rp-expiry nldd-icon {
  width: 0.95rem;
  height: 0.95rem;
  color: var(--semantics-feedback-warning-color, #b35900);
}
.rp-expiry-warn {
  font-weight: 600;
}
.rp-days {
  opacity: 0.55;
  font-size: 0.82rem;
}
</style>
