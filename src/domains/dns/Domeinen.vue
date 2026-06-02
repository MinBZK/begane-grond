<script setup>
// Domains & DNS catalog: every service runs on an overheid.nl / rijksoverheid.nl
// subdomain with DNSSEC, a PKIoverheid certificate and an internet.nl score. Each
// card shows the fqdn, the owning app and team, the DNSSEC state, the internet.nl
// score and whether IPv6 is enabled. Click through to /dns/:id for the records,
// the linked certificate and the standards.
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();
const router = useRouter();

// --- Add a new domain (inline form) ---
const adding = ref(false);
const form = ref({ fqdn: '', app: '', team: 'team-platform' });
const canSubmit = computed(() => /\.[a-z]{2,}$/i.test(form.value.fqdn.trim()));
function submitDomein() {
  if (!canSubmit.value) return;
  const dom = store.addDomein({
    fqdn: form.value.fqdn.trim(),
    app: form.value.app || null,
    team: form.value.team,
  });
  adding.value = false;
  form.value = { fqdn: '', app: '', team: 'team-platform' };
  router.push(`/dns/${dom.id}`);
}

const STATUSES = [
  { id: 'all', label: 'Alle' },
  { id: 'actief', label: 'Actief' },
  { id: 'aandacht', label: 'Aandacht' },
];

const statusFilter = ref('all');
const filtered = computed(() =>
  statusFilter.value === 'all'
    ? store.domeinen
    : store.domeinen.filter((d) => d.status === statusFilter.value),
);

const ipv6Count = computed(() => store.domeinen.filter((d) => d.ipv6).length);
const avgScore = computed(() => {
  const list = store.domeinen;
  if (!list.length) return 0;
  const total = list.reduce((sum, d) => sum + d.internetnl, 0);
  return Math.round(total / list.length);
});

function appName(id) {
  return store.appById(id)?.name || id;
}
function teamName(id) {
  return store.teamById(id)?.name || id;
}
// internet.nl score colour: success at 95+, warning at 80+, critical below.
function scoreColor(score) {
  if (score >= 95) return 'success';
  if (score >= 80) return 'warning';
  return 'critical';
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Domeinen & DNS"
      lede="Elke dienst draait op een overheid.nl of rijksoverheid.nl subdomein, met DNSSEC, een PKIoverheid-certificaat en een internet.nl-score. Kies een domein om de DNS-records, het certificaat en de gehaalde standaarden te zien."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Domeinen', href: '/dns' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Certificaten" start-icon="lock-closed" href="/secrets/certificaten"></nldd-button>
        <nldd-button variant="primary" text="Domein toevoegen" start-icon="plus" @click="adding = !adding"></nldd-button>
      </template>
    </PageHeader>

    <template v-if="adding">
      <nldd-card accessible-label="Domein toevoegen">
        <nldd-container padding="20">
          <nldd-title size="5"><h2>Nieuw domein registreren</h2></nldd-title>
          <nldd-spacer size="12" />
          <div class="rp-form-row">
            <nldd-form-field label="Domeinnaam (fqdn)" class="rp-grow">
              <nldd-text-field
                placeholder="bijv. nieuwedienst.overheid.nl"
                :value="form.fqdn"
                @input="(e) => (form.fqdn = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-form-field label="Dienst (optioneel)">
              <nldd-dropdown>
                <select :value="form.app" @change="(e) => (form.app = e.target.value)">
                  <option value="">Geen dienst</option>
                  <option v-for="a in store.apps" :key="a.id" :value="a.id">{{ a.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
            <nldd-form-field label="Team">
              <nldd-dropdown>
                <select :value="form.team" @change="(e) => (form.team = e.target.value)">
                  <option v-for="t in store.teams" :key="t.id" :value="t.id">{{ t.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </div>
          <nldd-spacer size="8" />
          <p class="rp-form-hint">Een nieuw domein start zonder DNSSEC en zonder internet.nl-score. Die schakel je daarna in op de domeinpagina.</p>
          <nldd-spacer size="12" />
          <nldd-button-group orientation="horizontal">
            <nldd-button variant="primary" text="Registreren" start-icon="check-mark" :disabled="!canSubmit || undefined" @click="submitDomein"></nldd-button>
            <nldd-button variant="secondary" text="Annuleren" @click="adding = false"></nldd-button>
          </nldd-button-group>
        </nldd-container>
      </nldd-card>
      <nldd-spacer size="24" />
    </template>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.domeinen.length" label="Domeinen" sub="in beheer" icon="globe" />
      <MetricCard :value="store.dnssecCount" label="DNSSEC aan" sub="ondertekende zones" icon="shield-check-mark" />
      <MetricCard :value="ipv6Count" label="IPv6" sub="dual-stack" icon="check-mark-circle" />
      <MetricCard :value="avgScore" label="Gem. internet.nl" sub="gemiddelde score" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Veilig vindbaar"
      supporting-text="DNSSEC, een geldig PKIoverheid-certificaat en een hoge internet.nl-score horen bij elk overheidsdomein. Het overzicht maakt afwijkingen meteen zichtbaar."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-cat-filter">
      <button
        v-for="s in STATUSES"
        :key="s.id"
        type="button"
        class="rp-cat"
        :class="{ 'rp-cat-on': statusFilter === s.id }"
        @click="statusFilter = s.id"
      >{{ s.label }}</button>
    </div>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="400px">
      <router-link v-for="d in filtered" :key="d.id" :to="`/dns/${d.id}`" class="rp-dom-link">
        <nldd-card :accessible-label="d.fqdn">
          <nldd-container padding="20">
            <div class="rp-dom-head">
              <nldd-icon name="globe" aria-hidden="true" class="rp-dom-icon"></nldd-icon>
              <div class="rp-min-width-0">
                <nldd-title size="4"><h2 class="rp-mono">{{ d.fqdn }}</h2></nldd-title>
                <p class="rp-dom-sub">{{ appName(d.app) }} · {{ teamName(d.team) }}</p>
              </div>
              <nldd-tag :color="scoreColor(d.internetnl)" size="md">{{ d.internetnl }}</nldd-tag>
            </div>

            <nldd-spacer size="12" />
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <nldd-tag v-if="d.dnssec" color="success" size="md">DNSSEC</nldd-tag>
              <nldd-tag v-else color="critical" size="md">geen DNSSEC</nldd-tag>
              <nldd-tag v-if="d.ipv6" color="neutral" size="md">IPv6</nldd-tag>
              <nldd-tag color="neutral" size="md">internet.nl {{ d.internetnl }}</nldd-tag>
            </nldd-container>
          </nldd-container>
        </nldd-card>
      </router-link>
    </nldd-collection>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-min-width-0 { min-width: 0; flex: 1 1 auto; }
.rp-cat-filter { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.rp-cat { padding: 0.45rem 0.85rem; border-radius: 999px; border: 1.5px solid var(--semantics-dividers-color); background: transparent; cursor: pointer; font-size: 0.9rem; }
.rp-cat:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-cat-on { border-color: var(--semantics-actions-primary-default-background-color, #154273); background: var(--semantics-surfaces-tinted-background-color); font-weight: 700; }
.rp-dom-link { text-decoration: none; color: inherit; display: block; }
.rp-dom-head { display: flex; align-items: flex-start; gap: 0.75rem; }
.rp-dom-icon { width: 1.6rem; height: 1.6rem; flex: 0 0 auto; opacity: 0.8; }
.rp-dom-sub { margin: 0.1rem 0 0; font-size: 0.85rem; opacity: 0.65; }
.rp-mono { font-variant-numeric: tabular-nums; font-family: ui-monospace, monospace; }
.rp-form-row { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: flex-end; }
.rp-grow { flex: 1 1 18rem; }
.rp-form-hint { margin: 0; font-size: 0.85rem; opacity: 0.65; }
</style>
