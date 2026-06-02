<script setup>
// API explorer: an OpenAPI-style mock of the Begane Grond REST API. The same
// actions that the `bg` CLI exposes are available as HTTP endpoints. Users can
// browse endpoints per domain (method, path, request/response samples), mint a
// masked personal access token (kept in component state, not the store), and
// copy a Forgejo Actions snippet that drives the API from CI.
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();
const router = useRouter();

const BASE = 'https://api.bg.rijks.app/v1';

// Pretty-print a JS object as a JSON string for the code blocks.
const j = (obj) => JSON.stringify(obj, null, 2);

// Build a representative list-response sample. A real ADR-conforme lijst-API
// returns a page, not the whole collection, so we show the first `n` items plus
// a truncation marker ("+N meer") instead of dumping all 123 apps / 81 oncall-
// records into a single code block.
function sample(rows, n = 2) {
  const arr = Array.isArray(rows) ? rows : [];
  if (arr.length <= n) return arr;
  return [...arr.slice(0, n), { '...': `+${arr.length - n} meer` }];
}

// --- The endpoint catalogue, grouped per platform domain --------------------
// Each endpoint mirrors a real CLI verb / store action and uses live seed data
// in its response sample so the explorer stays consistent with the rest of the
// demo.
const firstInst = store.instances[0];
const firstApp = store.apps[0];
const firstRack = store.racks.find((r) => r.units.length) || store.racks[0];

const groups = computed(() => [
  {
    id: 'infra',
    title: 'Infrastructuur',
    icon: 'rectangle-stack',
    to: '/infra/instances/' + (firstInst?.id || ''),
    endpoints: [
      {
        method: 'GET',
        path: '/infra/instances',
        summary: 'Lijst alle instances van een team',
        query: '?team=team-platform',
        response: sample(
          store.instances
            .filter((i) => i.team === 'team-platform')
            .map((i) => ({ id: i.id, kind: i.kind, env: i.env, status: i.status, dc: i.dc, costMonth: i.costMonth })),
        ),
      },
      {
        method: 'POST',
        path: '/infra/instances',
        summary: 'Bestel een nieuwe managed instance',
        request: { kind: 'postgres', name: 'pg-burgerzaken-staging', team: 'team-burgerzaken', app: 'app-paspoort', env: 'acc', size: 'M', dc: 'dc-denhaag' },
        status: 202,
        response: { id: 'postgres-1042', status: 'requested', name: 'pg-burgerzaken-staging', watch: `${BASE}/infra/instances/postgres-1042` },
      },
      {
        method: 'GET',
        path: '/infra/instances/{id}',
        summary: 'Toon één instance',
        response: firstInst
          ? { id: firstInst.id, kind: firstInst.kind, team: firstInst.team, app: firstInst.app, env: firstInst.env, size: firstInst.size, status: firstInst.status, rack: firstInst.rack, dc: firstInst.dc, costMonth: firstInst.costMonth }
          : {},
      },
      {
        method: 'DELETE',
        path: '/infra/instances/{id}',
        summary: 'Ruim een instance op',
        status: 204,
        response: null,
      },
    ],
  },
  {
    id: 'apps',
    title: 'Applicaties',
    icon: 'rectangle-stack',
    to: '/apps/' + (firstApp?.id || ''),
    endpoints: [
      {
        method: 'GET',
        path: '/apps',
        summary: 'Lijst alle applicaties',
        response: sample(store.apps.map((a) => ({ id: a.id, name: a.name, team: a.team, repo: a.repo, maturity: a.maturity, health: a.health }))),
      },
      {
        method: 'POST',
        path: '/apps',
        summary: 'Gebaand pad: maak app + repo + CI',
        request: { name: 'Inkomstenmonitor', team: 'team-platform', template: 'tpl-rust-api', withInfra: ['postgres', 'redis'], visibility: 'open' },
        status: 201,
        response: { app: { id: 'app-1041', name: 'Inkomstenmonitor', repo: 'repo-1042' }, repoUrl: 'https://code.overheid.nl/nldd/inkomstenmonitor' },
      },
      {
        method: 'POST',
        path: '/apps/{id}/promote',
        summary: 'Promoot een release tussen omgevingen',
        request: { from: 'acc', to: 'prod' },
        response: { app: firstApp?.id || 'app-paspoort', env: 'prod', version: 'v2.4.0' },
      },
    ],
  },
  {
    id: 'oncall',
    title: 'On-call & incidenten',
    icon: 'heart',
    to: '/teams/on-call',
    endpoints: [
      {
        method: 'GET',
        path: '/oncall',
        summary: 'Wie is er piket per team',
        response: sample(store.oncall.map((o) => ({ team: o.team, person: o.person, until: o.until, escalation: o.escalation }))),
      },
      {
        method: 'GET',
        path: '/incidents',
        summary: 'Lijst open incidenten',
        query: '?status=open',
        response: sample(store.incidents.map((i) => ({ id: i.id, title: i.title, severity: i.severity, status: i.status, service: i.service, team: i.team }))),
      },
      {
        method: 'POST',
        path: '/incidents/{id}/ack',
        summary: 'Bevestig / neem een incident over',
        response: { id: 'inc-2024-017', status: 'mitigated', by: store.currentUser },
      },
    ],
  },
  {
    id: 'fleet',
    title: 'Fleet-shift',
    icon: 'ship-wheel',
    to: '/fleet/' + (store.campaigns[0]?.id || ''),
    endpoints: [
      {
        method: 'GET',
        path: '/fleet/campaigns',
        summary: 'Lijst alle campagnes',
        response: sample(store.campaigns.map((c) => ({ id: c.id, title: c.title, type: c.type, status: c.status, repos: c.repos.length, progress: c.progress }))),
      },
      {
        method: 'POST',
        path: '/fleet/campaigns/{id}/run',
        summary: 'Rol een campagne uit als massa-PR',
        response: { id: store.campaigns[0]?.id || 'camp-securitytxt', status: 'actief', progress: { open: store.campaigns[0]?.repos.length || 4, merged: 0, failing: 0 } },
      },
    ],
  },
  {
    id: 'ai',
    title: 'LLM-gateway',
    icon: 'sparkles',
    to: '/ai/llm',
    endpoints: [
      {
        method: 'GET',
        path: '/ai/models',
        summary: 'Beschikbare soevereine modellen',
        response: sample(store.llmModels.map((m) => ({ id: m.id, name: m.name, residency: m.residency, context: m.context, pricePer1m: m.pricePer1m })), 3),
      },
      {
        method: 'POST',
        path: '/ai/chat/completions',
        summary: 'OpenAI-compatibel chat-endpoint',
        request: { model: 'overheids-llm-l', messages: [{ role: 'user', content: 'Vat dit changelog samen' }] },
        response: { id: 'cmpl-9a2f', model: 'overheids-llm-l', residency: 'Nederland', usage: { prompt_tokens: 812, completion_tokens: 134 }, choices: [{ message: { role: 'assistant', content: '...' } }] },
      },
    ],
  },
  {
    id: 'fysiek',
    title: 'Fysiek (racks)',
    icon: 'cylinder-split',
    to: '/fysiek/racks/' + (firstRack?.id || ''),
    endpoints: [
      {
        method: 'GET',
        path: '/racks/{id}',
        summary: 'Toon de unit-indeling van een rack',
        response: firstRack
          ? { id: firstRack.id, dc: firstRack.dc, label: firstRack.label, heightU: firstRack.heightU, team: firstRack.team, units: firstRack.units.map((u) => ({ u: u.u, height: u.height, type: u.type, label: u.label, watts: u.watts, status: u.status })) }
          : {},
      },
      {
        method: 'POST',
        path: '/racks/{id}/devices',
        summary: 'Plaats apparatuur in een rack',
        request: { u: 14, height: 2, type: 'server', label: 'k8s-node-04', team: 'team-platform', watts: 420 },
        status: 201,
        response: { rack: firstRack?.id || 'r-dh-a1', placed: 'k8s-node-04', u: 14 },
      },
    ],
  },
]);

// Currently expanded endpoint key (one per accordion-like list).
const open = ref(`${groups.value[0].id}-0`);
function toggle(key) {
  open.value = open.value === key ? '' : key;
}

const METHOD_COLOR = { GET: 'success', POST: 'accent', DELETE: 'critical', PUT: 'warning', PATCH: 'warning' };

function curlFor(g, e) {
  const lines = [`curl -X ${e.method} \\`, `  ${BASE}${e.path}${e.query || ''} \\`, `  -H "Authorization: Bearer $RIJKSPLATFORM_TOKEN"`];
  if (e.request) {
    lines[lines.length - 1] += ' \\';
    lines.push('  -H "Content-Type: application/json" \\');
    lines.push(`  -d '${JSON.stringify(e.request)}'`);
  }
  return lines.join('\n');
}

// --- Personal access tokens (masked, component-local) -----------------------
const scopes = ['infra:read', 'infra:write', 'apps:write', 'fleet:run', 'ai:invoke', 'oncall:read'];
const newToken = reactive({ name: '', scope: 'infra:read', expiry: '90' });
const tokens = ref([
  { id: 'pat_1', name: 'ci-deploy', scope: 'apps:write', created: '12 dagen geleden', lastUsed: '2 uur geleden', secret: 'rpp_live_a91f7c34d8b2e0f6c1a5', revealed: false },
  { id: 'pat_2', name: 'fleet-runner', scope: 'fleet:run', created: '3 dagen geleden', lastUsed: 'zojuist', secret: 'rpp_live_5f3a9e21b7c04d8f2a6e', revealed: false },
]);
const justCreated = ref(null);

function maskOf(secret) {
  return secret.slice(0, 9) + '••••••••••••••••' + secret.slice(-4);
}

function randomSecret() {
  const hex = '0123456789abcdef';
  let s = '';
  for (let i = 0; i < 20; i++) s += hex[Math.floor(Math.random() * 16)];
  return 'rpp_live_' + s;
}

function createToken() {
  if (!newToken.name.trim()) return;
  const secret = randomSecret();
  const t = { id: 'pat_' + (tokens.value.length + 1), name: newToken.name.trim(), scope: newToken.scope, created: 'zojuist', lastUsed: 'nog niet gebruikt', secret, revealed: true };
  tokens.value.unshift(t);
  justCreated.value = { name: t.name, secret };
  store.audit('API-token aangemaakt', t.name);
  newToken.name = '';
}

function revokeToken(id) {
  const t = tokens.value.find((x) => x.id === id);
  tokens.value = tokens.value.filter((x) => x.id !== id);
  if (t) store.audit('API-token ingetrokken', t.name);
  if (justCreated.value && t && justCreated.value.name === t.name) justCreated.value = null;
}

function copy(text) {
  navigator.clipboard?.writeText(text);
}

// --- Forgejo Actions automation snippet (code.overheid.nl runs on Forgejo) ---
const ghActions = `name: deploy-naar-acc
on:
  push:
    branches: [main]

jobs:
  promote:
    runs-on: nldd-runner          # eigen CI-runner in DC Den Haag
    steps:
      - name: Promoot release via Begane Grond-API
        env:
          RIJKSPLATFORM_TOKEN: \${{ secrets.RIJKSPLATFORM_TOKEN }}
        run: |
          curl -fsS -X POST \\
            https://api.bg.rijks.app/v1/apps/app-paspoort/promote \\
            -H "Authorization: Bearer $RIJKSPLATFORM_TOKEN" \\
            -H "Content-Type: application/json" \\
            -d '{"from":"test","to":"acc"}'

      - name: Wacht tot de instance ready is
        env:
          RIJKSPLATFORM_TOKEN: \${{ secrets.RIJKSPLATFORM_TOKEN }}
        run: |
          bg infra watch pg-burgerzaken-staging --timeout 5m --output json`;

const ghSecretCmd = `fj secret set RIJKSPLATFORM_TOKEN \\
  --repo minbzk/paspoort \\
  --body 'rpp_live_••••••••••••••••'   # Forgejo CLI; kan ook via code.overheid.nl`;

const openapiUrl = `${BASE}/openapi.json`;
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="API-explorer"
      lede="De REST-API achter het Begane Grond. Dezelfde acties als de bg-CLI, maar als HTTP-endpoints, handig voor eigen integraties en CI. Volgt de API Design Rules (ADR), met OAuth2-bearer-tokens."
      :crumbs="[
        { text: 'Home', href: '/' },
        { text: 'CLI & API', href: '/cli' },
        { text: 'API-explorer', href: '/cli/api' },
      ]"
    >
      <template #actions>
        <nldd-button
          variant="secondary"
          text="bg-CLI"
          start-icon="terminal"
          @click="router.push('/cli')"
        ></nldd-button>
        <nldd-button
          variant="primary"
          text="OpenAPI-spec"
          start-icon="link"
          @click="copy(openapiUrl)"
        ></nldd-button>
      </template>
    </PageHeader>

    <!-- Base URL banner ----------------------------------------------------- -->
    <nldd-card accessible-label="Basis-URL">
      <nldd-container padding="16">
        <div class="rp-base-row">
          <div>
            <span class="rp-base-label">Basis-URL</span>
            <code class="rp-base-url">{{ BASE }}</code>
          </div>
          <nldd-tag color="accent" size="md">ADR · OAuth2 · application/json</nldd-tag>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="28" />

    <!-- Endpoints per domain ------------------------------------------------ -->
    <nldd-title size="3"><h2>Endpoints</h2></nldd-title>
    <nldd-rich-text>
      <p>Per platformlaag. Klik een endpoint open voor het request- en response-voorbeeld.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <div class="rp-endpoint-groups">
      <nldd-card v-for="g in groups" :key="g.id" :accessible-label="g.title">
        <nldd-container padding="20">
          <div class="rp-eg-head">
            <div class="rp-eg-title">
              <nldd-icon :name="g.icon" aria-hidden="true"></nldd-icon>
              <nldd-title size="5"><h3>{{ g.title }}</h3></nldd-title>
            </div>
            <router-link :to="g.to" class="rp-eg-link">
              <span>In de portal openen</span>
              <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
            </router-link>
          </div>
          <nldd-spacer size="12" />

          <ul class="rp-ep-list">
            <li v-for="(e, idx) in g.endpoints" :key="g.id + '-' + idx" class="rp-ep">
              <button class="rp-ep-row" :aria-expanded="open === g.id + '-' + idx" @click="toggle(g.id + '-' + idx)">
                <nldd-tag :color="METHOD_COLOR[e.method] || 'neutral'" size="md">{{ e.method }}</nldd-tag>
                <code class="rp-ep-path">{{ e.path }}<span class="rp-ep-query">{{ e.query || '' }}</span></code>
                <span class="rp-ep-summary">{{ e.summary }}</span>
                <nldd-icon
                  :name="open === g.id + '-' + idx ? 'chevron-right' : 'chevron-right'"
                  aria-hidden="true"
                  class="rp-ep-chev"
                  :class="{ 'rp-open': open === g.id + '-' + idx }"
                ></nldd-icon>
              </button>

              <div v-if="open === g.id + '-' + idx" class="rp-ep-detail">
                <div class="rp-ep-cols">
                  <div class="rp-ep-col">
                    <span class="rp-ep-coltitle">cURL</span>
                    <nldd-code-viewer language="bash">{{ curlFor(g, e) }}</nldd-code-viewer>
                  </div>
                  <div v-if="e.request" class="rp-ep-col">
                    <span class="rp-ep-coltitle">Request body</span>
                    <nldd-code-viewer language="json">{{ j(e.request) }}</nldd-code-viewer>
                  </div>
                </div>
                <nldd-spacer size="12" />
                <div class="rp-ep-respline">
                  <span class="rp-ep-coltitle">Response</span>
                  <nldd-tag :color="(e.status || 200) < 300 ? 'success' : 'critical'" size="md">
                    {{ e.status || 200 }} {{ e.status === 204 ? 'No Content' : 'OK' }}
                  </nldd-tag>
                </div>
                <nldd-spacer size="8" />
                <nldd-code-viewer v-if="e.response !== null" language="json">{{ j(e.response) }}</nldd-code-viewer>
                <nldd-rich-text v-else><p class="rp-no-body">Geen response-body.</p></nldd-rich-text>
              </div>
            </li>
          </ul>
        </nldd-container>
      </nldd-card>
    </div>

    <nldd-spacer size="32" />

    <!-- Tokens + automation -------------------------------------------------- -->
    <nldd-container layout="grid" column-count="2" gap="20">
      <!-- Personal access tokens -->
      <nldd-card accessible-label="Personal access tokens">
        <nldd-container padding="20">
          <div class="rp-eg-title">
            <nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon>
            <nldd-title size="4"><h2>Personal access tokens</h2></nldd-title>
          </div>
          <nldd-rich-text>
            <p>Maak een token met de minimaal benodigde scope. Het volledige token wordt eenmalig getoond.</p>
          </nldd-rich-text>
          <nldd-spacer size="16" />

          <nldd-container layout="grid" column-count="2" gap="12">
            <nldd-form-field label="Naam">
              <nldd-text-field
                placeholder="bijv. ci-deploy"
                :value="newToken.name"
                @input="(e) => (newToken.name = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-form-field label="Scope">
              <nldd-dropdown>
                <select :value="newToken.scope" @change="(e) => (newToken.scope = e.target.value)">
                  <option v-for="s in scopes" :key="s" :value="s">{{ s }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </nldd-container>
          <nldd-spacer size="12" />
          <nldd-form-field label="Geldigheid (dagen)">
            <nldd-dropdown>
              <select :value="newToken.expiry" @change="(e) => (newToken.expiry = e.target.value)">
                <option value="30">30 dagen</option>
                <option value="90">90 dagen</option>
                <option value="365">1 jaar</option>
              </select>
            </nldd-dropdown>
          </nldd-form-field>
          <nldd-spacer size="16" />
          <nldd-button variant="primary" text="Token aanmaken" start-icon="plus" @click="createToken"></nldd-button>

          <!-- One-time reveal of the freshly created token -->
          <div v-if="justCreated" class="rp-token-reveal">
            <nldd-spacer size="16" />
            <nldd-inline-dialog
              title="Kopieer dit token nu"
              supporting-text="Het wordt hierna alleen gemaskeerd getoond en kan niet opnieuw worden opgehaald."
            ></nldd-inline-dialog>
            <nldd-spacer size="10" />
            <nldd-code-viewer language="bash">{{ justCreated.secret }}</nldd-code-viewer>
          </div>

          <nldd-spacer size="20" />
          <nldd-title size="5"><h3>Actieve tokens</h3></nldd-title>
          <nldd-spacer size="10" />
          <nldd-list>
            <nldd-list-item v-for="t in tokens" :key="t.id">
              <div class="rp-token-row">
                <div class="rp-token-main">
                  <div class="rp-token-name">
                    <strong>{{ t.name }}</strong>
                    <nldd-tag color="neutral" size="md">{{ t.scope }}</nldd-tag>
                  </div>
                  <code class="rp-token-secret">{{ t.revealed ? t.secret : maskOf(t.secret) }}</code>
                  <span class="rp-token-meta">Aangemaakt {{ t.created }} · laatst gebruikt {{ t.lastUsed }}</span>
                </div>
                <div class="rp-token-actions">
                  <nldd-button
                    variant="secondary"
                    size="sm"
                    :text="t.revealed ? 'Verberg' : 'Toon'"
                    start-icon="eye"
                    @click="t.revealed = !t.revealed"
                  ></nldd-button>
                  <nldd-button
                    variant="secondary"
                    size="sm"
                    text="Intrekken"
                    start-icon="dismiss"
                    @click="revokeToken(t.id)"
                  ></nldd-button>
                </div>
              </div>
            </nldd-list-item>
          </nldd-list>
        </nldd-container>
      </nldd-card>

      <!-- Forgejo Actions automation (code.overheid.nl runs on Forgejo) -->
      <nldd-card accessible-label="Automatisering met Forgejo Actions">
        <nldd-container padding="20">
          <div class="rp-eg-title">
            <nldd-icon name="folder-stack" aria-hidden="true"></nldd-icon>
            <nldd-title size="4"><h2>Automatiseren in CI</h2></nldd-title>
          </div>
          <nldd-rich-text>
            <p>
              Zet je token als repository-secret en stuur de API aan vanuit Forgejo Actions
              op code.overheid.nl. De bg-CLI is op de eigen runners voorgeïnstalleerd.
            </p>
          </nldd-rich-text>
          <nldd-spacer size="14" />
          <span class="rp-ep-coltitle">Secret zetten (eenmalig)</span>
          <nldd-spacer size="6" />
          <nldd-code-viewer language="bash">{{ ghSecretCmd }}</nldd-code-viewer>
          <nldd-spacer size="16" />
          <span class="rp-ep-coltitle">.forgejo/workflows/deploy.yml</span>
          <nldd-spacer size="6" />
          <nldd-code-viewer language="yaml">{{ ghActions }}</nldd-code-viewer>
          <nldd-spacer size="14" />
          <nldd-inline-dialog
            title="Rate limiting"
            supporting-text="De API hanteert per token een limiet (zie Retry-After-header). Gebruik exponentiële backoff in scripts."
          ></nldd-inline-dialog>
        </nldd-container>
      </nldd-card>
    </nldd-container>

    <nldd-spacer size="32" />

    <RelationLinks
      title="Verder klikken"
      :links="[
        { text: 'bg-CLI (zelfde acties op de terminal)', to: '/cli', icon: 'terminal' },
        { text: 'Koppelvlakken & FSC', to: '/apps', icon: 'link' },
        { text: 'Infra-catalogus', to: '/infra/order/postgres', icon: 'rectangle-stack' },
        { text: 'LLM-gateway', to: '/ai/llm', icon: 'sparkles' },
      ]"
    />

    <nldd-spacer size="24" />
    <CliHint
      command="bg api token create --name ci-deploy --scope apps:write --output json"
      label="Liever vanaf de CLI? Maak hetzelfde token zo aan:"
    />
  </div>
</template>

<style scoped>
.rp-page {
  padding-bottom: 3rem;
}
.rp-base-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-base-label {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.2rem;
}
.rp-base-url {
  font-size: 1.05rem;
  font-weight: 700;
  font-family: var(--font-mono, ui-monospace, monospace);
}
.rp-endpoint-groups {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-eg-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.rp-eg-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-eg-title nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.75;
}
.rp-eg-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  font-size: 0.85rem;
  font-weight: 600;
}
.rp-eg-link:hover {
  text-decoration: underline;
}
.rp-eg-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-ep-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.rp-ep {
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
  overflow: hidden;
}
.rp-ep-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}
.rp-ep-row:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-ep-path {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
}
.rp-ep-query {
  opacity: 0.55;
  font-weight: 400;
}
.rp-ep-summary {
  opacity: 0.7;
  font-size: 0.88rem;
  flex: 1;
}
.rp-ep-chev {
  width: 1rem;
  height: 1rem;
  opacity: 0.5;
  transition: transform 0.15s ease;
  flex-shrink: 0;
}
.rp-ep-chev.rp-open {
  transform: rotate(90deg);
}
.rp-ep-detail {
  padding: 0 0.85rem 0.95rem;
  border-top: 1px solid var(--semantics-dividers-color);
}
.rp-ep-detail > .rp-ep-cols {
  padding-top: 0.85rem;
}
.rp-ep-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}
.rp-ep-cols .rp-ep-col:only-child {
  grid-column: 1 / -1;
}
.rp-ep-col {
  min-width: 0;
}
.rp-ep-coltitle {
  display: inline-block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.4rem;
}
.rp-ep-respline {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-no-body {
  opacity: 0.55;
  font-size: 0.88rem;
  margin: 0;
}
.rp-token-reveal {
  border-radius: 10px;
}
.rp-token-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  flex-wrap: wrap;
}
.rp-token-main {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}
.rp-token-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.rp-token-secret {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.85rem;
  opacity: 0.85;
}
.rp-token-meta {
  font-size: 0.78rem;
  opacity: 0.6;
}
.rp-token-actions {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}
code {
  font-family: var(--font-mono, ui-monospace, monospace);
}
</style>
