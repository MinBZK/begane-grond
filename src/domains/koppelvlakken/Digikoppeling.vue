<script setup>
// Digikoppeling / FSC overview: a mock service directory of the federation. Each
// peer organisation is shown as a card with its OIN, the services it offers, and
// whether it runs an inway (publishes services) or outway (consumes services).
// Below the cards sits the OIN-register as a clean table. Services link through
// to the matching koppelvlak in the API-catalog where possible.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import DataTable from '../../components/shared/DataTable.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// FSC modes: inway = aanbieder (publishes), outway = afnemer (consumes). The seed
// only carries inways; we render a clear badge per mode.
const MODE = {
  inway: { label: 'Inway (aanbieder)', color: 'brand', icon: 'arrow-up-arrow-down', desc: 'Biedt diensten aan via de service-directory' },
  outway: { label: 'Outway (afnemer)', color: 'accent', icon: 'cloud', desc: 'Neemt diensten af van andere peers' },
};

const peers = computed(() => store.fscPeers);

const totalServices = computed(() =>
  store.fscPeers.reduce((s, p) => s + p.services.length, 0),
);
const inwayCount = computed(() => store.fscPeers.filter((p) => p.mode === 'inway').length);

// Match an offered service name to a koppelvlak in the API-catalog so the card
// can link straight through to its spec.
function apiFor(serviceName) {
  return store.apis.find((a) => a.name === serviceName);
}

// OIN-register rows: one line per offered service, the level at which the
// directory is queried.
const registerColumns = [
  { key: 'org', label: 'Organisatie' },
  { key: 'oin', label: 'OIN', mono: true },
  { key: 'service', label: 'Aangeboden dienst' },
  { key: 'mode', label: 'Modus' },
];
const registerRows = computed(() =>
  store.fscPeers.flatMap((p) =>
    p.services.map((svc, idx) => ({
      id: `${p.id}-${idx}`,
      org: p.org,
      oin: p.oin,
      service: svc,
      mode: p.mode,
    })),
  ),
);

// Format an OIN into grouped blocks for legibility on the cards.
function fmtOin(oin) {
  return oin.replace(/(.{8})(.{12})/, '$1 $2');
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Digikoppeling / FSC"
      lede="De service-directory van de federatie. Welke overheidsorganisatie (peer) biedt welke diensten aan, onder welk OIN, via inway of outway. Een mock van Federated Service Connectivity."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Koppelvlakken', href: '/koppelvlakken' },
        { text: 'Digikoppeling / FSC', href: '/koppelvlakken/fsc' },
      ]"
    >
      <template #actions>
        <router-link to="/koppelvlakken">
          <nldd-button variant="secondary" text="API-catalogus" start-icon="link"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="peers.length" label="Peers" sub="aangesloten organisaties" icon="apartment-building" />
      <MetricCard :value="totalServices" label="Aangeboden diensten" sub="in de directory" icon="link" />
      <MetricCard :value="inwayCount" label="Inways" sub="actieve aanbieders" icon="shield-check-mark" />
    </nldd-container>

    <nldd-spacer size="28" />

    <nldd-title size="4"><h2>Service-directory</h2></nldd-title>
    <nldd-spacer size="12" />

    <nldd-collection layout="grid" item-width="360px">
      <nldd-card v-for="p in peers" :key="p.id" :accessible-label="`Peer ${p.org}`">
        <nldd-container padding="20">
          <div class="rp-peer-head">
            <div class="rp-peer-avatar"><nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon></div>
            <div>
              <nldd-title size="5"><h3>{{ p.org }}</h3></nldd-title>
              <span class="rp-peer-oin rp-mono">OIN {{ fmtOin(p.oin) }}</span>
            </div>
          </div>

          <nldd-spacer size="14" />

          <div class="rp-peer-mode">
            <nldd-tag :color="MODE[p.mode].color" size="md">
              {{ MODE[p.mode].label }}
            </nldd-tag>
            <p class="rp-peer-mode-desc">{{ MODE[p.mode].desc }}</p>
          </div>

          <nldd-spacer size="14" />

          <p class="rp-peer-label">Aangeboden diensten</p>
          <nldd-list>
            <nldd-list-item v-for="svc in p.services" :key="svc">
              <nldd-icon-cell name="link" aria-hidden="true"></nldd-icon-cell>
              <nldd-title-cell>
                <router-link v-if="apiFor(svc)" to="/koppelvlakken" class="rp-link">{{ svc }}</router-link>
                <span v-else>{{ svc }}</span>
              </nldd-title-cell>
              <nldd-description-cell v-if="apiFor(svc)">{{ apiFor(svc).version }} · {{ apiFor(svc).rateLimit }}</nldd-description-cell>
            </nldd-list-item>
          </nldd-list>

          <nldd-spacer size="14" />

          <p class="rp-peer-label">FSC-endpoint</p>
          <nldd-code-viewer language="bash">{{ `fsc://${p.oin}@directory.fsc.overheid.nl` }}</nldd-code-viewer>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="32" />

    <nldd-title size="4"><h2>OIN-register</h2></nldd-title>
    <nldd-rich-text>
      <p>Het Organisatie-Identificatienummer (OIN) per aangeboden dienst. Het register is de bron voor routering en adressering binnen Digikoppeling.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <DataTable :columns="registerColumns" :rows="registerRows" row-key="id">
      <template #cell="{ row, col, value }">
        <template v-if="col.key === 'org'">
          <span class="rp-org-cell">
            <nldd-icon name="apartment-building" aria-hidden="true"></nldd-icon>
            {{ value }}
          </span>
        </template>
        <template v-else-if="col.key === 'oin'">
          <span class="rp-mono">{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'service'">
          <router-link v-if="apiFor(value)" to="/koppelvlakken" class="rp-link">{{ value }}</router-link>
          <span v-else>{{ value }}</span>
        </template>
        <template v-else-if="col.key === 'mode'">
          <nldd-tag :color="MODE[value].color" size="md">{{ value }}</nldd-tag>
        </template>
        <template v-else>{{ value }}</template>
      </template>
    </DataTable>

    <nldd-spacer size="24" />

    <CliHint command="rp fsc directory list --register oin" label="Doorzoek het OIN-register ook via de CLI:" />
  </div>
</template>

<style scoped>
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover {
  text-decoration: underline;
}
.rp-peer-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rp-peer-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color, #f0f4f8);
  flex: 0 0 auto;
}
.rp-peer-avatar nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.8;
}
.rp-peer-oin {
  font-size: 0.78rem;
  opacity: 0.65;
}
.rp-peer-mode {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-peer-mode-desc {
  margin: 0;
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-peer-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin: 0 0 0.5rem;
}
.rp-org-cell {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}
.rp-org-cell nldd-icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.7;
}
</style>
