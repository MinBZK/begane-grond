<script setup>
// Instance detail: connection info (a faked DSN / bootstrap-servers block per
// kind), mock sparkline metrics, lifecycle actions (scale / delete), and the
// cross-layer relation links (team, app, rack, datacenter) that make the
// person -> team -> app -> instance -> rack -> datacenter chain clickable.
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';
import HavenLogo from '../../components/shared/HavenLogo.vue';
import Sparkline from './Sparkline.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const instance = computed(() => store.instanceById(route.params.id));
const service = computed(
  () => store.serviceCatalog.find((s) => s.kind === instance.value?.kind) || null,
);

const ENV_LABELS = { dev: 'Ontwikkel', test: 'Test', acc: 'Acceptatie', prod: 'Productie' };

const team = computed(() => store.teamById(instance.value?.team));
const app = computed(() => (instance.value?.app ? store.appById(instance.value.app) : null));
const rack = computed(() => (instance.value?.rack ? store.rackById(instance.value.rack) : null));
const datacenter = computed(() =>
  instance.value?.dc ? store.datacenterById(instance.value.dc) : null,
);

// --- Faked connection info per service kind ---
const connection = computed(() => {
  const i = instance.value;
  if (!i) return { language: 'bash', code: '' };
  const host = `${i.name}.${i.dc.replace('dc-', '')}.rijks.internal`;
  switch (i.kind) {
    case 'postgres':
      return {
        language: 'bash',
        code: `# DSN (wachtwoord uit secret store)
postgresql://app@${host}:5432/${i.name.replace(/-/g, '_')}?sslmode=verify-full

# psql
psql "host=${host} port=5432 dbname=${i.name.replace(/-/g, '_')} user=app sslmode=verify-full"`,
      };
    case 'kafka':
      return {
        language: 'bash',
        code: `# Bootstrap servers (mTLS)
${host}:9093,${host.replace(i.name, i.name + '-2')}:9093

# Topic-prefix (ACL): ${i.team.replace('team-', '')}.*`,
      };
    case 'redis':
      return {
        language: 'bash',
        code: `# Redis (TLS)
rediss://default@${host}:6380/0`,
      };
    case 'objectstore':
      return {
        language: 'bash',
        code: `# S3-compatible endpoint
AWS_ENDPOINT_URL=https://${host}:9000
AWS_S3_BUCKET=${i.name}
# sleutels via: bg secret get ${i.team.replace('team-', '')}/objectstore`,
      };
    case 'mail':
      return {
        language: 'bash',
        code: `# SMTP-relay (STARTTLS, submission)
SMTP_HOST=${host}
SMTP_PORT=587
SMTP_AUTH=login`,
      };
    case 'kubernetes':
      return {
        language: 'bash',
        code: `# Kubeconfig context
bg infra kubeconfig ${i.name} >> ~/.kube/config
kubectl config use-context ${i.name}
kubectl get nodes`,
      };
    case 'llm':
      return {
        language: 'bash',
        code: `# OpenAI-compatibele gateway (soeverein)
OPENAI_BASE_URL=https://llm.rijks.internal/v1
OPENAI_API_KEY=$(bg secret get ${i.team.replace('team-', '')}/llm-gateway-key)
# model: ${i.size}`,
      };
    default:
      return {
        language: 'bash',
        code: `# Endpoint
https://${host}`,
      };
  }
});

// --- Mock metrics: deterministic-ish series so the page feels alive ---
function series(seed, n = 24, base = 50, amp = 30) {
  const out = [];
  let v = base;
  for (let k = 0; k < n; k++) {
    v += Math.sin((k + seed) * 0.7) * (amp / 3) + (((k * (seed + 3)) % 7) - 3);
    out.push(Math.max(2, Math.round(v)));
  }
  return out;
}
const metrics = computed(() => {
  const i = instance.value;
  const s = (i?.name?.length || 5) % 9;
  return [
    { label: 'CPU', unit: '%', color: 'var(--nldd-color-brand, #154273)', data: series(s, 24, 42, 28), last: (d) => `${d[d.length - 1]}%` },
    { label: 'Geheugen', unit: '%', color: '#39870c', data: series(s + 2, 24, 55, 18), last: (d) => `${d[d.length - 1]}%` },
    { label: 'Latency p99', unit: 'ms', color: '#b85c00', data: series(s + 5, 24, 30, 40), last: (d) => `${d[d.length - 1]} ms` },
  ];
});

// --- Lifecycle actions ---
const flash = ref('');
function doScale() {
  store.scaleInstance(instance.value.id);
  flash.value = 'Bijschalen aangevraagd. Capaciteit wordt uitgebreid.';
}
function doDelete() {
  // eslint-disable-next-line no-alert
  if (!window.confirm(`Instance ${instance.value.name} definitief verwijderen?`)) return;
  store.deleteInstance(instance.value.id);
  router.push('/infra/instances');
}

// Haven attest applies to Kubernetes environments only. Compliant means an app
// here runs unmodified on any other Haven environment; the cert date is when the
// environment was last checked against the standard.
const isK8s = computed(() => instance.value?.kind === 'kubernetes');

const relationLinks = computed(() => {
  const links = [];
  if (team.value) links.push({ text: team.value.name, to: `/teams/${team.value.id}`, icon: 'person-2' });
  if (app.value) links.push({ text: app.value.name, to: `/apps/${app.value.id}`, icon: 'rectangle-stack' });
  if (rack.value) links.push({ text: `Rack ${rack.value.label}`, to: `/fysiek/racks/${rack.value.id}`, icon: 'cylinder-split' });
  if (datacenter.value) links.push({ text: datacenter.value.name, to: `/fysiek/datacenters/${datacenter.value.id}`, icon: 'apartment-building' });
  return links;
});
</script>

<template>
  <div class="rp-page">
    <template v-if="instance">
      <PageHeader
        :title="instance.name"
        :lede="`${service?.name || instance.kind} · ${ENV_LABELS[instance.env] || instance.env}`"
        :crumbs="[
          { text: 'Platform', href: '/' },
          { text: 'Infra-diensten', href: '/infra' },
          { text: 'Instances', href: '/infra/instances' },
          { text: instance.name, href: `/infra/instances/${instance.id}` },
        ]"
      >
        <template #actions>
          <StatusBadge :status="instance.status" />
        </template>
      </PageHeader>

      <!-- Top facts strip -->
      <nldd-card>
        <nldd-container padding="20">
          <dl class="rp-facts">
            <div><dt>Soort</dt><dd>{{ service?.name || instance.kind }}</dd></div>
            <div><dt>Omgeving</dt><dd><nldd-tag :color="instance.env === 'prod' ? 'accent' : 'neutral'" size="md">{{ ENV_LABELS[instance.env] || instance.env }}</nldd-tag></dd></div>
            <div><dt>Grootte</dt><dd class="rp-mono">{{ instance.size }}</dd></div>
            <div><dt>Tier</dt><dd>{{ service?.tier || '—' }}</dd></div>
            <div><dt>Kosten</dt><dd class="rp-mono">{{ instance.costMonth ? `€${instance.costMonth}/mnd` : '—' }}</dd></div>
            <div><dt>Landing</dt><dd>{{ rack ? `Rack ${rack.label}` : 'beheerde dienst' }} · {{ datacenter?.name || instance.dc }}</dd></div>
          </dl>
        </nldd-container>
      </nldd-card>

      <!-- Haven attest: only meaningful for Kubernetes environments. -->
      <template v-if="isK8s">
        <nldd-spacer size="20" />
        <a
          class="rp-haven"
          :class="{ 'rp-haven-off': !instance.havenCompliant }"
          href="https://haven.commonground.nl/"
          target="_blank"
          rel="noopener"
        >
          <span class="rp-haven-icon">
            <HavenLogo />
          </span>
          <span class="rp-haven-text">
            <strong v-if="instance.havenCompliant">Haven-gecertificeerd · sinds {{ instance.havenCertDate }}</strong>
            <strong v-else>Nog niet Haven-gecertificeerd</strong>
            <span class="rp-haven-sub" v-if="instance.havenCompliant">
              Deze omgeving voldoet aan de Haven-standaard. Een app die hier draait, draait
              op elke andere Haven-omgeving zonder herschrijven.
            </span>
            <span class="rp-haven-sub" v-else>
              Deze Kubernetes-omgeving voldoet nog niet aan de Haven-configuratie. Tot die tijd
              is overdraagbaarheid naar andere omgevingen niet gegarandeerd.
            </span>
          </span>
          <nldd-icon name="external-link" aria-hidden="true" class="rp-haven-out"></nldd-icon>
        </a>
      </template>

      <nldd-spacer size="20" />

      <nldd-container layout="grid" column-count="3" gap="16" class="rp-main">
        <!-- Left + middle: connection + metrics (span 2) -->
        <div class="rp-span2">
          <nldd-card>
            <nldd-container padding="20">
              <div class="rp-card-head">
                <nldd-icon name="link" aria-hidden="true"></nldd-icon>
                <nldd-title size="5"><h2>Connectie-info</h2></nldd-title>
              </div>
              <nldd-rich-text><p class="rp-dim">Endpoints en bootstrap-gegevens. Secrets staan in de secret store, niet hier.</p></nldd-rich-text>
              <nldd-spacer size="12" />
              <nldd-code-viewer :language="connection.language">{{ connection.code }}</nldd-code-viewer>
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="20" />

          <nldd-card>
            <nldd-container padding="20">
              <div class="rp-card-head">
                <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
                <nldd-title size="5"><h2>Metrics (laatste 24u)</h2></nldd-title>
              </div>
              <nldd-spacer size="16" />
              <div class="rp-metrics">
                <div v-for="m in metrics" :key="m.label" class="rp-metric">
                  <div class="rp-metric-head">
                    <span class="rp-metric-name">{{ m.label }}</span>
                    <span class="rp-metric-now">{{ m.last(m.data) }}</span>
                  </div>
                  <Sparkline :data="m.data" :color="m.color" :height="40" />
                </div>
              </div>
            </nldd-container>
          </nldd-card>
        </div>

        <!-- Right column: lifecycle + relations -->
        <div>
          <nldd-card>
            <nldd-container padding="20">
              <div class="rp-card-head">
                <nldd-icon name="gear" aria-hidden="true"></nldd-icon>
                <nldd-title size="5"><h2>Beheer</h2></nldd-title>
              </div>
              <nldd-spacer size="12" />
              <nldd-rich-text v-if="flash"><p class="rp-flash">{{ flash }}</p></nldd-rich-text>
              <div class="rp-actions">
                <nldd-button variant="primary" text="Bijschalen" start-icon="arrow-up-arrow-down" @click="doScale"></nldd-button>
                <nldd-button variant="secondary" text="Verwijderen" start-icon="dismiss" @click="doDelete"></nldd-button>
              </div>
              <nldd-spacer size="16" />
              <CliHint :command="`bg infra scale ${instance.name} --plus 1`" />
            </nldd-container>
          </nldd-card>

          <nldd-spacer size="20" />

          <RelationLinks title="Gerelateerd" :links="relationLinks" />
        </div>
      </nldd-container>
    </template>

    <!-- Not found / just deleted -->
    <template v-else>
      <PageHeader
        title="Instance niet gevonden"
        lede="Deze instance bestaat niet (meer)."
        :crumbs="[
          { text: 'Platform', href: '/' },
          { text: 'Infra-diensten', href: '/infra' },
          { text: 'Instances', href: '/infra/instances' },
        ]"
      />
      <nldd-inline-dialog title="Niet gevonden" supporting-text="Mogelijk is de instance verwijderd."></nldd-inline-dialog>
      <nldd-spacer size="16" />
      <router-link to="/infra/instances">
        <nldd-button variant="primary" text="Naar alle instances" start-icon="arrow-right"></nldd-button>
      </router-link>
    </template>
  </div>
</template>

<style scoped>
.rp-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem 1.5rem;
  margin: 0;
}
.rp-facts dt {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.2rem;
}
.rp-facts dd {
  margin: 0;
  font-weight: 600;
}
.rp-main {
  align-items: start;
}
.rp-span2 {
  grid-column: span 2;
}
.rp-card-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-card-head nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.7;
}
.rp-dim {
  opacity: 0.65;
}
.rp-metrics {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.rp-metric-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.3rem;
}
.rp-metric-name {
  font-weight: 600;
  font-size: 0.9rem;
}
.rp-metric-now {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 700;
}
.rp-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-flash {
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  background: var(--semantics-surfaces-tinted-background-color);
  font-size: 0.88rem;
}
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
/* Haven attest block */
.rp-haven {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
  background: var(--semantics-surfaces-tinted-background-color, #f4f6f9);
  text-decoration: none;
  color: inherit;
}
.rp-haven:hover {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-haven-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 10px;
  /* Haven brand accent (geel op zwart). */
  background: #ffbc2c;
  color: #000;
  flex: 0 0 auto;
}
.rp-haven-off .rp-haven-icon {
  background: var(--semantics-surfaces-default-background-color, #fff);
  color: inherit;
  opacity: 0.6;
}
.rp-haven-icon :deep(.rp-haven-logo) {
  width: 1.35rem;
  height: 1.35rem;
}
.rp-haven-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1 1 auto;
}
.rp-haven-sub {
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-haven-out {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  flex: 0 0 auto;
}

@media (max-width: 900px) {
  .rp-span2 {
    grid-column: auto;
  }
}
</style>
