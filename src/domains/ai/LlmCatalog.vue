<script setup>
// LLM model catalogue (store.llmModels) with sovereignty/residency/classification
// metadata, a procurement wizard that fakes an LLM instance via store.orderInstance
// (kind 'llm') and yields a masked API key + endpoint, plus a per-team
// token/cost mock. This is the "afname" side of the AI domain.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import Wizard from '../../components/shared/Wizard.vue';
import { usePresentation } from '../../presentation/usePresentation.js';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import CliHint from '../../components/shared/CliHint.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();

const models = computed(() => store.llmModels);

// KPI sub-labels derived live from the store instead of hardcoded counts, so
// they keep matching the catalogue when the seed changes.
const sovereignCount = computed(
  () => models.value.filter((m) => m.residency === 'Nederland').length,
);
const euCount = computed(() => models.value.filter((m) => m.residency === 'EU').length,
);
const residencyLabel = computed(() => {
  const parts = [];
  if (sovereignCount.value) parts.push(`${sovereignCount.value} soeverein`);
  if (euCount.value) parts.push(`${euCount.value} EU`);
  return parts.join(', ') || 'geen';
});
// Active LLM instances live: every store instance of kind 'llm'.
const llmInstances = computed(() => store.instances.filter((i) => i.kind === 'llm'));
const llmInstanceSub = computed(() => {
  if (!llmInstances.value.length) return 'geen actieve instance';
  if (llmInstances.value.length === 1) return llmInstances.value[0].name;
  return `${llmInstances.value.length} instances`;
});

// Map a residency/host string to a tag colour for the sovereignty badge.
function residencyColor(residency) {
  if (residency === 'Nederland') return 'success';
  if (residency === 'EU') return 'accent';
  return 'warning';
}

// Per-1M price drives a tiny bar so the catalogue reads at a glance.
const maxPrice = computed(() => Math.max(...models.value.map((m) => m.pricePer1m)));

// --- Token usage / cost mock per team -------------------------------------
// Deterministic synthetic numbers seeded off the team id so the screen feels
// real without touching the store. Tokens in millions this month.
const usageByTeam = computed(() =>
  store.teams.map((t) => {
    const seed = t.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const tokensM = ((seed % 17) + 1) * 1.7; // millions of tokens
    const model = models.value[seed % models.value.length];
    const cost = Math.round(tokensM * model.pricePer1m);
    return {
      team: t.id,
      name: t.name,
      model: model.name,
      modelId: model.id,
      tokensM: tokensM.toFixed(1),
      requests: ((seed % 9) + 2) * 1240,
      cost,
      cached: 20 + (seed % 45), // cache hit %
    };
  }),
);
// Search + cap for the per-team usage table: 99 teams is an unreadable wall, so
// filter on team/model and show an initial slice with a "toon meer" control.
const usageQuery = ref('');
const usageLimit = ref(25);
const filteredUsage = computed(() => {
  const q = usageQuery.value.trim().toLowerCase();
  if (!q) return usageByTeam.value;
  return usageByTeam.value.filter(
    (r) => r.name.toLowerCase().includes(q) || r.model.toLowerCase().includes(q),
  );
});
const visibleUsage = computed(() => filteredUsage.value.slice(0, usageLimit.value));
const usageMoreCount = computed(() =>
  Math.max(0, filteredUsage.value.length - usageLimit.value),
);
// Global totals (all teams) feed the KPI cards at the top.
const totalTokensM = computed(() =>
  usageByTeam.value.reduce((a, r) => a + parseFloat(r.tokensM), 0).toFixed(1),
);
const totalCost = computed(() => usageByTeam.value.reduce((a, r) => a + r.cost, 0));
// Footer totals reflect the full filtered set (not just the visible slice) so
// the table footer stays meaningful while the body is capped.
const filteredTokensM = computed(() =>
  filteredUsage.value.reduce((a, r) => a + parseFloat(r.tokensM), 0).toFixed(1),
);
const filteredCost = computed(() => filteredUsage.value.reduce((a, r) => a + r.cost, 0));
const maxTeamCost = computed(() =>
  filteredUsage.value.length ? Math.max(...filteredUsage.value.map((r) => r.cost)) : 1,
);

// --- Procurement wizard ----------------------------------------------------
const wizardOpen = ref(false);
const ordered = ref(null);

const form = reactive({
  model: 'overheids-llm-l',
  team: store.currentPerson?.team || store.teams[0]?.id,
  app: '',
  env: 'prod',
  purpose: 'AI-assistent in de IDE',
  classification: 'Departementaal Vertrouwelijk',
});

const selectedModel = computed(
  () => models.value.find((m) => m.id === form.model) || models.value[0],
);
const teamApps = computed(() => store.appsByTeam(form.team));

// Team picker for the wizard: 99 teams is too many for a single dropdown, so
// this is a search-as-you-type picker capped to a handful of matches, with the
// selected team always pinned above. Mirrors the person picker in
// NewWorkplaceWizard.
const teamQuery = ref('');
const teamLimit = 6;
const selectedTeamObj = computed(() => store.teamById(form.team));
const filteredTeams = computed(() => {
  const q = teamQuery.value.trim().toLowerCase();
  const all = store.teams.filter((t) => t.id !== form.team);
  const matches = q ? all.filter((t) => t.name.toLowerCase().includes(q)) : all;
  return matches.slice(0, teamLimit);
});
const teamMoreCount = computed(() => {
  const q = teamQuery.value.trim().toLowerCase();
  const total = q
    ? store.teams.filter((t) => t.id !== form.team && t.name.toLowerCase().includes(q)).length
    : store.teams.length - 1;
  return Math.max(0, total - teamLimit);
});
function pickTeam(id) {
  form.team = id;
  // Reset the optional app link when the owner team changes.
  form.app = '';
}

const wizardSteps = [
  { title: 'Model' },
  { title: 'Eigenaar' },
  { title: 'Doel & classificatie' },
  { title: 'Samenvatting' },
];

function teamName(id) {
  return store.teamById(id)?.name || id;
}

// A plausibly-masked key + endpoint produced on finish. The real value is
// "shown once" in spirit; we mask all but the prefix.
const apiKey = ref('');
// Deterministic key suffix derived from the order, so no random API is used
// (the body is masked anyway). Mirrors the seed-hashing idiom used elsewhere.
function genKey() {
  const seed = `${form.model}:${form.team}:${form.env}`;
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = h.toString(36).padStart(8, '0').slice(0, 8);
  return `llm_sk_live_${rand}`;
}
const maskedKey = computed(() => {
  if (!apiKey.value) return '';
  // Mask the body, keep the prefix and the last 4 chars (matches bg ai key create).
  return `${apiKey.value.slice(0, 12)}${'•'.repeat(16)}${apiKey.value.slice(-4)}`;
});
const endpoint = computed(() => {
  if (!ordered.value) return '';
  return `https://llm.gateway.overheid.nl/v1/${selectedModel.value.id}`;
});
const revealed = ref(false);

const cliCommand = computed(() => {
  if (!ordered.value) return '';
  return `bg ai key create --model ${form.model} --team ${form.team} --env ${form.env}${form.app ? ` --app ${form.app}` : ''}`;
});

const usageSnippet = computed(() => {
  if (!ordered.value) return '';
  return `curl ${endpoint.value}/chat/completions \\
  -H "Authorization: Bearer $BG_LLM_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"${selectedModel.value.id}","messages":[{"role":"user","content":"Hallo"}]}'`;
});

function finish() {
  apiKey.value = genKey();
  ordered.value = store.orderInstance({
    kind: 'llm',
    name: `llm-${form.team.replace('team-', '')}-${form.env}`,
    team: form.team,
    app: form.app || null,
    env: form.env,
    size: form.model,
  });
}

function resetWizard() {
  wizardOpen.value = false;
  ordered.value = null;
  apiKey.value = '';
  revealed.value = false;
  teamQuery.value = '';
}

// Presentation mode can auto-drive this wizard on stage. The wizard is gated
// behind wizardOpen, so we expose an open() helper the drive script calls first.
const wizardRef = ref(null);
const wizardApi = {
  next: () => wizardRef.value?.next(),
  goTo: (i) => wizardRef.value?.goTo(i),
};
function openWizard() {
  wizardOpen.value = true;
}
const presentation = usePresentation();
onMounted(() => presentation.registerWizard('llm', { form, wizardRef: wizardApi, finish, openWizard }));
onBeforeUnmount(() => presentation.unregisterWizard('llm'));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="LLM-catalogus"
      lede="Soevereine en EU-gehoste taalmodellen via de overheids-LLM-gateway. Neem een model af en krijg direct een API-key en endpoint."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'AI & LLM', href: '/ai' },
        { text: 'LLM-catalogus', href: '/ai/llm' },
      ]"
    >
      <template #actions>
        <nldd-button
          variant="primary"
          text="Model afnemen"
          start-icon="sparkles"
          @click="wizardOpen = true"
        ></nldd-button>
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="models.length" label="Modellen in catalogus" :sub="residencyLabel" icon="sparkles" />
      <MetricCard :value="`${totalTokensM}M`" label="Tokens deze maand" sub="alle teams" icon="arrow-up-arrow-down" />
      <MetricCard :value="`€${totalCost.toLocaleString('nl-NL')}`" label="Kosten deze maand" sub="token-verbruik" icon="euro-sign" />
      <MetricCard
        :value="llmInstances.length"
        label="Actieve LLM-instances"
        :sub="llmInstanceSub"
        icon="cloud"
        :to="llmInstances.length === 1 ? `/infra/instances/${llmInstances[0].id}` : '/infra/instances'"
      />
    </nldd-container>

    <nldd-spacer size="28" />

    <!-- Procurement wizard (inline, replaces catalogue while open) -->
    <div v-if="wizardOpen">
      <div class="rp-wiz-head">
        <nldd-title size="3"><h2>Model afnemen</h2></nldd-title>
        <nldd-button variant="secondary" text="Sluiten" start-icon="dismiss" @click="resetWizard"></nldd-button>
      </div>
      <nldd-spacer size="16" />

      <!-- Result screen -->
      <div v-if="ordered">
        <nldd-card accessible-label="API-key aangemaakt">
          <nldd-container padding="24">
            <div class="rp-prov-head">
              <div>
                <nldd-title size="4"><h2>{{ ordered.name }}</h2></nldd-title>
                <nldd-rich-text>
                  <p>{{ selectedModel.name }} voor {{ teamName(ordered.team) }} · omgeving {{ ordered.env }}</p>
                </nldd-rich-text>
              </div>
              <StatusBadge :status="ordered.status" />
            </div>

            <nldd-spacer size="20" />

            <div class="rp-key-grid">
              <div class="rp-key-block">
                <div class="rp-key-label">
                  <nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon>
                  API-key
                </div>
                <div class="rp-key-value">
                  <code>{{ revealed ? apiKey : maskedKey }}</code>
                  <nldd-button
                    variant="secondary"
                    size="sm"
                    :text="revealed ? 'Verberg' : 'Toon'"
                    :start-icon="revealed ? 'dismiss' : 'eye'"
                    @click="revealed = !revealed"
                  ></nldd-button>
                </div>
                <p class="rp-key-note">Wordt eenmalig getoond. Bewaar veilig in de Vault van je team.</p>
              </div>
              <div class="rp-key-block">
                <div class="rp-key-label">
                  <nldd-icon name="link" aria-hidden="true"></nldd-icon>
                  Endpoint
                </div>
                <div class="rp-key-value">
                  <code>{{ endpoint }}</code>
                </div>
                <p class="rp-key-note">OpenAI-compatible. Stel <code>BG_LLM_KEY</code> in als omgevingsvariabele.</p>
              </div>
            </div>

            <nldd-spacer size="20" />
            <nldd-title size="5"><h3>Eerste aanroep</h3></nldd-title>
            <nldd-spacer size="8" />
            <nldd-code-viewer language="bash">{{ usageSnippet }}</nldd-code-viewer>

            <nldd-spacer size="20" />
            <nldd-inline-dialog
              title="Veilig opgeslagen"
              supporting-text="De key is als secret aan je team gekoppeld. Roteer hem periodiek via de Vault."
            ></nldd-inline-dialog>

            <nldd-spacer size="20" />
            <nldd-button-group orientation="horizontal">
              <router-link :to="`/infra/instances/${ordered.id}`">
                <nldd-button variant="primary" text="Naar instance" end-icon="arrow-right"></nldd-button>
              </router-link>
              <router-link to="/secrets">
                <nldd-button variant="secondary" text="Naar Vault" start-icon="lock-closed"></nldd-button>
              </router-link>
              <nldd-button variant="secondary" text="Nog een afnemen" start-icon="plus" @click="resetWizard(); wizardOpen = true"></nldd-button>
            </nldd-button-group>

            <CliHint :command="cliCommand" />
          </nldd-container>
        </nldd-card>
      </div>

      <!-- The wizard -->
      <Wizard v-else ref="wizardRef" :steps="wizardSteps" finish-label="Key aanmaken" @finish="finish">
        <template #default="{ step }">
          <!-- Step 0: model -->
          <div v-if="step === 0">
            <nldd-title size="5"><h3>Welk model?</h3></nldd-title>
            <nldd-spacer size="12" />
            <div class="rp-choice-grid">
              <button
                v-for="m in models"
                :key="m.id"
                type="button"
                class="rp-choice"
                :class="{ 'rp-sel': form.model === m.id }"
                @click="form.model = m.id"
              >
                <span class="rp-choice-title">{{ m.name }}</span>
                <span class="rp-choice-sub">{{ m.context }} context · €{{ m.pricePer1m }}/1M tokens</span>
                <nldd-tag :color="residencyColor(m.residency)" size="sm">{{ m.host }}</nldd-tag>
              </button>
            </div>
          </div>

          <!-- Step 1: owner team + app -->
          <div v-else-if="step === 1">
            <nldd-title size="5"><h3>Voor welk team?</h3></nldd-title>
            <nldd-spacer size="12" />
            <nldd-form-field label="Eigenaar-team">
              <nldd-search-field
                placeholder="Zoek een team op naam"
                accessible-label="Zoek team"
                :value="teamQuery"
                @input="(e) => (teamQuery = e.target.value)"
              ></nldd-search-field>
            </nldd-form-field>

            <!-- Selected team stays pinned, even when filtered out of the list. -->
            <template v-if="selectedTeamObj">
              <nldd-spacer size="12" />
              <div class="rp-pick rp-pick-on rp-pick-selected">
                <span class="rp-pick-main">
                  <strong>{{ selectedTeamObj.name }}</strong>
                </span>
                <nldd-tag color="success" size="sm">Geselecteerd</nldd-tag>
              </div>
            </template>

            <nldd-spacer size="12" />
            <div class="rp-pick-list">
              <button
                v-for="t in filteredTeams"
                :key="t.id"
                type="button"
                class="rp-pick"
                @click="pickTeam(t.id)"
              >
                <span class="rp-pick-main">
                  <strong>{{ t.name }}</strong>
                </span>
              </button>
              <p v-if="!filteredTeams.length" class="rp-pick-empty">
                Geen team gevonden voor "{{ teamQuery }}".
              </p>
            </div>
            <p v-if="teamMoreCount > 0" class="rp-pick-more">
              En nog {{ teamMoreCount }} teams. Verfijn je zoekopdracht.
            </p>

            <nldd-spacer size="16" />
            <nldd-form-field label="Koppelen aan applicatie (optioneel)">
              <nldd-dropdown>
                <select v-model="form.app">
                  <option value="">Geen applicatie</option>
                  <option v-for="a in teamApps" :key="a.id" :value="a.id">{{ a.name }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
            <nldd-spacer size="16" />
            <nldd-form-field label="Omgeving">
              <nldd-dropdown>
                <select v-model="form.env">
                  <option v-for="env in store.environments" :key="env" :value="env">{{ env }}</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </div>

          <!-- Step 2: purpose + classification -->
          <div v-else-if="step === 2">
            <nldd-title size="5"><h3>Doel en gegevensclassificatie</h3></nldd-title>
            <nldd-spacer size="12" />
            <nldd-form-field label="Doel van gebruik">
              <nldd-text-field
                :value="form.purpose"
                placeholder="bijv. samenvatten van zaakdossiers"
                @input="(e) => (form.purpose = e.target.value)"
              ></nldd-text-field>
            </nldd-form-field>
            <nldd-spacer size="16" />
            <nldd-form-field label="Hoogste gegevensclassificatie">
              <nldd-dropdown>
                <select v-model="form.classification">
                  <option value="Openbaar">Openbaar</option>
                  <option value="Intern">Intern</option>
                  <option value="Departementaal Vertrouwelijk">Departementaal Vertrouwelijk</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
            <nldd-spacer size="16" />
            <nldd-inline-dialog
              v-if="form.classification === 'Departementaal Vertrouwelijk' && selectedModel.residency !== 'Nederland'"
              title="Let op: classificatie en model passen niet"
              :supporting-text="`${selectedModel.name} is ${selectedModel.host}-gehost en geschikt ${selectedModel.classification}. Kies een soeverein model voor Departementaal Vertrouwelijk.`"
            ></nldd-inline-dialog>
            <nldd-inline-dialog
              v-else
              title="Classificatie past bij model"
              :supporting-text="`${selectedModel.name} is geschikt ${selectedModel.classification}. Data blijft in ${selectedModel.residency}.`"
            ></nldd-inline-dialog>
          </div>

          <!-- Step 3: summary -->
          <div v-else-if="step === 3">
            <nldd-title size="5"><h3>Controleer de afname</h3></nldd-title>
            <nldd-spacer size="16" />
            <dl class="rp-summary">
              <div><dt>Model</dt><dd>{{ selectedModel.name }} <span class="rp-dim">(€{{ selectedModel.pricePer1m }}/1M)</span></dd></div>
              <div><dt>Host</dt><dd>{{ selectedModel.host }} · residentie {{ selectedModel.residency }}</dd></div>
              <div><dt>Team</dt><dd>{{ teamName(form.team) }}</dd></div>
              <div><dt>Applicatie</dt><dd>{{ form.app ? store.appById(form.app)?.name : 'geen' }}</dd></div>
              <div><dt>Omgeving</dt><dd>{{ form.env }}</dd></div>
              <div><dt>Doel</dt><dd>{{ form.purpose }}</dd></div>
              <div><dt>Classificatie</dt><dd>{{ form.classification }}</dd></div>
            </dl>
            <nldd-spacer size="16" />
            <nldd-inline-dialog
              title="Wat je krijgt"
              supporting-text="Een gemaskeerde API-key, een OpenAI-compatible endpoint en een aan je team gekoppelde instance. Verbruik telt mee in de kosten per team."
            ></nldd-inline-dialog>
          </div>
        </template>
      </Wizard>
    </div>

    <!-- Catalogue + usage (when wizard closed) -->
    <div v-else>
      <nldd-title size="3"><h2>Modellen</h2></nldd-title>
      <nldd-spacer size="12" />
      <nldd-collection layout="grid" item-width="340px">
        <nldd-card v-for="m in models" :key="m.id" :accessible-label="m.name">
          <nldd-container padding="20">
            <div class="rp-model-head">
              <nldd-icon name="sparkles" aria-hidden="true" class="rp-model-icon"></nldd-icon>
              <div>
                <nldd-title size="5"><h3>{{ m.name }}</h3></nldd-title>
                <nldd-tag :color="residencyColor(m.residency)" size="sm">{{ m.host }}</nldd-tag>
              </div>
            </div>
            <nldd-spacer size="14" />
            <dl class="rp-model-spec">
              <div><dt>Context</dt><dd class="rp-mono">{{ m.context }}</dd></div>
              <div><dt>Dataresidentie</dt><dd>{{ m.residency }}</dd></div>
              <div><dt>Classificatie</dt><dd>{{ m.classification }}</dd></div>
            </dl>
            <nldd-spacer size="12" />
            <div class="rp-price-row">
              <span class="rp-price">€{{ m.pricePer1m }}</span>
              <span class="rp-price-unit">per 1M tokens</span>
            </div>
            <div class="rp-price-bar">
              <div class="rp-price-fill" :style="{ width: `${(m.pricePer1m / maxPrice) * 100}%` }"></div>
            </div>
            <nldd-spacer size="16" />
            <nldd-button
              variant="primary"
              text="Afnemen"
              start-icon="sparkles"
              @click="form.model = m.id; wizardOpen = true"
            ></nldd-button>
          </nldd-container>
        </nldd-card>
      </nldd-collection>

      <nldd-spacer size="32" />

      <!-- Token usage / cost per team -->
      <nldd-title size="3"><h2>Token-verbruik en kosten per team</h2></nldd-title>
      <nldd-rich-text><p>Verbruik deze maand via de LLM-gateway. Cache-hits verlagen de kosten.</p></nldd-rich-text>
      <nldd-spacer size="12" />
      <nldd-search-field
        placeholder="Filter op team of model"
        accessible-label="Filter verbruik per team"
        :value="usageQuery"
        @input="(e) => (usageQuery = e.target.value)"
      ></nldd-search-field>
      <nldd-spacer size="16" />
      <nldd-card accessible-label="Verbruik per team">
        <nldd-container padding="8">
          <table class="rp-usage">
            <thead>
              <tr>
                <th>Team</th>
                <th>Model</th>
                <th class="rp-num">Requests</th>
                <th class="rp-num">Tokens</th>
                <th class="rp-num">Cache</th>
                <th>Kosten</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in visibleUsage" :key="row.team">
                <td>
                  <router-link class="rp-team-link" :to="`/teams/${row.team}`">{{ row.name }}</router-link>
                </td>
                <td><nldd-tag color="neutral" size="sm">{{ row.model }}</nldd-tag></td>
                <td class="rp-num rp-mono">{{ row.requests.toLocaleString('nl-NL') }}</td>
                <td class="rp-num rp-mono">{{ row.tokensM }}M</td>
                <td class="rp-num rp-mono">{{ row.cached }}%</td>
                <td>
                  <div class="rp-cost-cell">
                    <span class="rp-mono">€{{ row.cost.toLocaleString('nl-NL') }}</span>
                    <div class="rp-cost-bar">
                      <div class="rp-cost-fill" :style="{ width: `${(row.cost / maxTeamCost) * 100}%` }"></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="!filteredUsage.length">
                <td colspan="6" class="rp-usage-empty">Geen team gevonden voor "{{ usageQuery }}".</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><strong>{{ usageQuery ? 'Subtotaal' : 'Totaal' }}</strong></td>
                <td></td>
                <td></td>
                <td class="rp-num rp-mono"><strong>{{ filteredTokensM }}M</strong></td>
                <td></td>
                <td class="rp-mono"><strong>€{{ filteredCost.toLocaleString('nl-NL') }}</strong></td>
              </tr>
            </tfoot>
          </table>
        </nldd-container>
      </nldd-card>
      <p v-if="usageMoreCount > 0" class="rp-usage-more">
        {{ visibleUsage.length }} van {{ filteredUsage.length }} teams getoond.
        <nldd-button
          variant="secondary"
          size="sm"
          :text="`Toon meer (nog ${usageMoreCount})`"
          start-icon="chevron-down"
          @click="usageLimit += 25"
        ></nldd-button>
      </p>

      <nldd-spacer size="28" />

      <RelationLinks
        title="Gerelateerd"
        :links="[
          { text: 'AI-assisted coding', to: '/ai', icon: 'sparkles' },
          { text: 'LLM-instance llm-gilde-prod', to: '/infra/instances/llm-gilde-prod', icon: 'cloud' },
          { text: 'Secrets & keys (Vault)', to: '/secrets', icon: 'lock-closed' },
          { text: 'Kosten per team', to: '/kosten', icon: 'euro-sign' },
        ]"
      />
    </div>
  </div>
</template>

<style scoped>
.rp-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.rp-dim {
  opacity: 0.6;
}
/* Model cards */
.rp-model-head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rp-model-icon {
  width: 2rem;
  height: 2rem;
  color: var(--semantics-actions-primary-default-background-color, #154273);
  flex-shrink: 0;
}
.rp-model-spec {
  display: grid;
  gap: 0.1rem;
  margin: 0;
}
.rp-model-spec > div {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 0.5rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
  font-size: 0.9rem;
}
.rp-model-spec > div:last-child {
  border-bottom: none;
}
.rp-model-spec dt {
  font-weight: 600;
  opacity: 0.65;
}
.rp-model-spec dd {
  margin: 0;
}
.rp-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}
.rp-price {
  font-size: 1.6rem;
  font-weight: 700;
}
.rp-price-unit {
  opacity: 0.65;
  font-size: 0.85rem;
}
.rp-price-bar {
  margin-top: 0.5rem;
  height: 6px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-price-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #39870c, #b85c00);
}
/* Usage table */
.rp-usage {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.rp-usage th,
.rp-usage td {
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--semantics-dividers-color);
  text-align: left;
}
.rp-usage thead th {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.65;
}
.rp-usage tfoot td {
  border-bottom: none;
  border-top: 2px solid var(--semantics-dividers-color);
}
.rp-num {
  text-align: right;
}
.rp-usage-empty {
  text-align: center;
  opacity: 0.6;
  padding: 1rem;
}
.rp-usage-more {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 0.85rem 0 0;
  font-size: 0.88rem;
  opacity: 0.85;
}
.rp-team-link {
  color: inherit;
  font-weight: 600;
}
.rp-cost-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.rp-cost-bar {
  flex: 1;
  min-width: 60px;
  height: 6px;
  border-radius: 999px;
  background: var(--semantics-surfaces-tinted-background-color);
  overflow: hidden;
}
.rp-cost-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--semantics-actions-primary-default-background-color, #154273);
}
/* Wizard reuse */
.rp-wiz-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.rp-choice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
/* Team search-picker (wizard step 1): a capped results list, not a 99-option select. */
.rp-pick-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 18rem;
  overflow-y: auto;
}
.rp-pick {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.12s ease, background 0.12s ease;
}
.rp-pick-main strong {
  overflow-wrap: anywhere;
}
.rp-pick:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-pick-on {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-pick-selected {
  align-items: center;
}
.rp-pick-selected nldd-tag {
  margin-left: auto;
}
.rp-pick-main {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}
.rp-pick-empty {
  opacity: 0.6;
  padding: 0.75rem 0.25rem;
  margin: 0;
}
.rp-pick-more {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  opacity: 0.6;
}
.rp-choice {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-start;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
.rp-choice:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-choice.rp-sel {
  border-color: var(--semantics-actions-primary-default-background-color, #154273);
  background: var(--semantics-surfaces-tinted-background-color);
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-choice-title {
  font-weight: 700;
}
.rp-choice-sub {
  font-size: 0.82rem;
  opacity: 0.7;
}
.rp-summary {
  display: grid;
  gap: 0.1rem;
  margin: 0;
}
.rp-summary > div {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--semantics-dividers-color);
}
.rp-summary dt {
  font-weight: 600;
  opacity: 0.7;
}
.rp-summary dd {
  margin: 0;
}
.rp-prov-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
/* Key result */
.rp-key-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.rp-key-block {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-key-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
  margin-bottom: 0.5rem;
}
.rp-key-label nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-key-value {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.rp-key-value code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.95rem;
  word-break: break-all;
}
.rp-key-note {
  margin: 0.5rem 0 0;
  font-size: 0.8rem;
  opacity: 0.7;
}
.rp-key-note code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
