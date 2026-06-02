<script setup>
// Domain detail: the DNS records, the DNSSEC and IPv6 state, the internet.nl
// score and the linked PKIoverheid certificate. Everything cross-links: the
// owning app to /apps/:id, the team to /teams/:id, the certificate to the
// secrets vault, and the standards page for the internet.nl context.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const domein = computed(() => store.domeinById(route.params.id));
const app = computed(() => (domein.value ? store.appById(domein.value.app) : null));
const team = computed(() => (domein.value ? store.teamById(domein.value.team) : null));
const cert = computed(() =>
  domein.value ? store.certificates.find((c) => c.id === domein.value.tls) || null : null,
);

// internet.nl score colour: success at 95+, warning at 80+, critical below.
const scoreColor = computed(() => {
  if (!domein.value) return 'neutral';
  const s = domein.value.internetnl;
  if (s >= 95) return 'success';
  if (s >= 80) return 'warning';
  return 'critical';
});

// A certificate expiring soon is a warning. The seed expresses the lifetime as a
// Dutch phrase like "over 30 dagen"; pull the day count out and flag it under 30.
const certExpiringSoon = computed(() => {
  const expires = cert.value?.expires || '';
  const match = expires.match(/\d+/);
  if (!match) return false;
  return Number(match[0]) < 30;
});

const recordColumns = [
  { key: 'type', label: 'Type' },
  { key: 'name', label: 'Naam', mono: true },
  { key: 'value', label: 'Waarde', mono: true },
];
const recordRows = computed(() =>
  domein.value
    ? domein.value.records.map((r, i) => ({ id: `${r.type}-${r.name}-${i}`, ...r }))
    : [],
);

const relations = computed(() => {
  if (!domein.value) return [];
  const links = [];
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  if (cert.value) links.push({ text: cert.value.cn, to: '/secrets/certificaten', icon: 'lock-closed' });
  links.push({ text: 'internet.nl-standaarden', to: '/standaarden', icon: 'check-mark-circle' });
  return links;
});

const cli = computed(() =>
  domein.value ? `bg dns show ${domein.value.id}\nbg dns dnssec verify ${domein.value.id}` : '',
);
</script>

<template>
  <div v-if="domein" class="rp-page">
    <PageHeader
      :title="domein.fqdn"
      :lede="`Domein van ${app?.name || domein.app}, geregistreerd bij ${domein.registrar}.`"
      :crumbs="[
        { text: 'Domeinen', href: '/dns' },
        { text: domein.fqdn, href: `/dns/${domein.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar overzicht" start-icon="chevron-left" href="/dns"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="domein.dnssec ? 'Ja' : 'Nee'" label="DNSSEC" sub="ondertekende zone" :icon="domein.dnssec ? 'shield-check-mark' : 'exclamation-triangle'" />
      <MetricCard :value="domein.internetnl" label="internet.nl" sub="score van 100" icon="check-mark-circle" />
      <MetricCard :value="domein.ipv6 ? 'Ja' : 'Nee'" label="IPv6" sub="dual-stack" :icon="domein.ipv6 ? 'check-mark-circle' : 'exclamation-triangle'" />
      <MetricCard :value="domein.status" label="Status" sub="levenscyclus" :icon="domein.status === 'actief' ? 'check-mark-circle' : 'exclamation-triangle'" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- DNS records -->
      <nldd-card accessible-label="DNS-records" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-rec-head">
            <nldd-title size="4"><h2>DNS-records</h2></nldd-title>
            <nldd-tag :color="scoreColor" size="md">internet.nl {{ domein.internetnl }}</nldd-tag>
          </div>
          <nldd-spacer size="14" />
          <DataTable :columns="recordColumns" :rows="recordRows" row-key="id" />
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Koppelingen" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Linked certificate -->
    <nldd-title size="3"><h2>TLS-certificaat</h2></nldd-title>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="TLS-certificaat">
      <nldd-container padding="20">
        <template v-if="cert">
          <div class="rp-cert-head">
            <nldd-icon name="lock-closed" aria-hidden="true" class="rp-cert-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <p class="rp-cert-cn rp-mono">{{ cert.cn }}</p>
              <p class="rp-cert-ca">{{ cert.ca }}</p>
            </div>
            <nldd-tag :color="certExpiringSoon ? 'warning' : 'success'" size="md">{{ cert.expires }}</nldd-tag>
          </div>
          <p v-if="certExpiringSoon" class="rp-cert-warn">
            <nldd-icon name="exclamation-triangle" aria-hidden="true"></nldd-icon>
            Het certificaat verloopt binnenkort. Plan tijdig een vernieuwing.
          </p>
        </template>
        <p v-else class="rp-empty">Geen certificaat gekoppeld aan dit domein.</p>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Domein niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar overzicht" @click="router.push('/dns')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-min-width-0 { min-width: 0; flex: 1 1 auto; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-rec-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-cert-head { display: flex; align-items: center; gap: 0.75rem; }
.rp-cert-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-cert-cn { margin: 0; font-weight: 700; }
.rp-cert-ca { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-cert-warn { display: flex; align-items: center; gap: 0.4rem; margin: 0.8rem 0 0; font-size: 0.85rem; opacity: 0.8; }
.rp-cert-warn nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
.rp-mono { font-variant-numeric: tabular-nums; font-family: ui-monospace, monospace; }
.rp-empty { opacity: 0.6; margin: 0; }
</style>
