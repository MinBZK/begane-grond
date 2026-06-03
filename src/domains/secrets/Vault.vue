<script setup>
// Secrets vault: every team's secrets grouped in an expandable tree. Values are
// always masked; the only thing you can do is rotate, which flips the "rotated"
// label live via the store and writes to the audit log. Mirrors the real CLI
// (`bg secret rotate …`) so the demo reads like the actual platform.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';
import HavenBadge from '../../components/shared/HavenBadge.vue';

const store = usePlatformStore();

// Icon per secret type so the tree scans quickly.
const TYPE_ICON = {
  'DB-wachtwoord': 'cylinder-split',
  'API-key': 'sparkles',
  certificaat: 'certificate',
};
const iconFor = (type) => TYPE_ICON[type] || 'lock-closed';

// Parse "over N dagen" into a number so we can warn on near-expiry secrets.
const daysLeft = (expires) => {
  const m = /(\d+)/.exec(expires || '');
  return m ? Number(m[1]) : null;
};
const expiryStatus = (sec) => {
  const d = daysLeft(sec.expires);
  if (d === null) return 'ok';
  if (d <= 14) return 'kritiek';
  if (d <= 30) return 'binnenkort';
  return 'ok';
};
const expiryColor = (sec) => {
  const s = expiryStatus(sec);
  if (s === 'kritiek') return 'critical';
  if (s === 'binnenkort') return 'warning';
  return 'neutral';
};

// "rotated" is freeform Dutch ("zojuist", "3 dagen geleden"). The store sets
// "zojuist" on rotate; treat that as freshly rotated for the success styling.
const justRotated = (sec) => sec.rotated === 'zojuist';

// Search + type filter so the tree stays usable now the kluis spans many teams.
const query = ref('');
const typeFilter = ref('alle');
// Build the type chips live from the data, so we never list a type with 0 hits.
const types = computed(() => {
  const seen = [...new Set(store.secrets.map((s) => s.type))];
  return ['alle', ...seen];
});
const setType = (t) => {
  typeFilter.value = t;
};

// Secrets that match the active search query and type filter.
const matchingSecrets = computed(() => {
  const q = query.value.trim().toLowerCase();
  return store.secrets.filter((s) => {
    if (typeFilter.value !== 'alle' && s.type !== typeFilter.value) return false;
    if (!q) return true;
    const teamName = (store.teamById(s.team)?.name || '').toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q) ||
      teamName.includes(q)
    );
  });
});

// Group the matching secrets by team, in the team order from the store.
const allGroups = computed(() => {
  const byTeam = new Map();
  for (const s of matchingSecrets.value) {
    if (!byTeam.has(s.team)) byTeam.set(s.team, []);
    byTeam.get(s.team).push(s);
  }
  return store.teams
    .map((team) => ({ team, secrets: byTeam.get(team.id) || [] }))
    .filter((g) => g.secrets.length > 0);
});

// Cap the number of team groups shown; reveal more on demand.
const limit = ref(12);
const groups = computed(() => allGroups.value.slice(0, limit.value));
const moreCount = computed(() => Math.max(0, allGroups.value.length - limit.value));
const showMore = () => {
  limit.value += 12;
};

// Collapse groups by default so the page stays short; a search expands matches.
const open = ref({});
const isOpen = (id) => {
  // When searching, auto-expand so hits are visible without extra clicks.
  if (open.value[id] !== undefined) return open.value[id];
  return query.value.trim() !== '' || typeFilter.value !== 'alle';
};
const toggle = (id) => {
  open.value[id] = !isOpen(id);
};

const total = computed(() => store.secrets.length);
const expiringSoon = computed(
  () => store.secrets.filter((s) => expiryStatus(s) !== 'ok').length,
);
const apiKeys = computed(
  () => store.secrets.filter((s) => s.type === 'API-key').length,
);

// Which secret is mid-rotation (for a tiny in-flight state on the button).
const rotating = ref(null);
const lastRotated = ref(null);
async function rotate(sec) {
  rotating.value = sec.id;
  // Tiny delay so the status change is perceptible in the demo.
  await new Promise((r) => setTimeout(r, 650));
  store.rotateSecret(sec.id);
  rotating.value = null;
  lastRotated.value = sec;
}

// Cross-layer link for a secret: if the name prefix matches an app slug, link
// to that app so the secret -> app -> instance -> rack chain stays clickable.
function appForSecret(sec) {
  const prefix = (sec.name.split('/')[0] || '').toLowerCase();
  return store.apps.find((a) => a.id.replace(/^app-/, '') === prefix) || null;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Secrets-kluis"
      lede="Centrale kluis voor wachtwoorden, API-keys en sleutels. Waarden zijn altijd gemaskeerd. Roteren kan met één klik of via de CLI."
      :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Secrets', href: '/secrets' }]"
    >
      <template #actions>
        <router-link to="/secrets/certificaten">
          <nldd-button
            variant="secondary"
            text="Certificaten"
            start-icon="certificate"
          ></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <HavenBadge service="Secrets" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard
        :value="total"
        label="Secrets in de kluis"
        sub="over alle teams"
        icon="lock-closed"
      />
      <MetricCard
        :value="apiKeys"
        label="API-keys"
        sub="hoogste rotatie-frequentie"
        icon="sparkles"
      />
      <MetricCard
        :value="expiringSoon"
        label="Verlopen binnenkort"
        :sub="expiringSoon ? 'roteer of vernieuw' : 'alles ruim binnen marge'"
        icon="clock"
      />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Zero-trust kluis"
      supporting-text="Niemand ziet de ruwe waarde, ook jij niet. Applicaties lezen secrets via een kortlevende token op runtime. Elke rotatie en elke uitlezing staat in het auditlog."
    ></nldd-inline-dialog>

    <nldd-spacer size="24" />

    <div class="rp-filters">
      <nldd-search-field
        placeholder="Zoek op secret, type of team"
        accessible-label="Zoek secret"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
      <div class="rp-type-chips">
        <nldd-button
          v-for="t in types"
          :key="t"
          size="sm"
          :variant="typeFilter === t ? 'primary' : 'secondary'"
          :text="t === 'alle' ? 'Alle types' : t"
          @click="setType(t)"
        ></nldd-button>
      </div>
    </div>

    <nldd-spacer size="16" />

    <div class="rp-tree">
      <p v-if="!allGroups.length" class="rp-empty">
        Geen secrets gevonden voor deze filters.
      </p>
      <nldd-card v-for="g in groups" :key="g.team.id" :accessible-label="g.team.name">
        <nldd-container padding="20">
          <button class="rp-team-row" type="button" @click="toggle(g.team.id)">
            <nldd-icon
              name="chevron-right"
              class="rp-chevron"
              :class="{ 'rp-chevron-open': isOpen(g.team.id) }"
              aria-hidden="true"
            ></nldd-icon>
            <nldd-icon name="person-2" aria-hidden="true" class="rp-team-icon"></nldd-icon>
            <span class="rp-team-name">{{ g.team.name }}</span>
            <nldd-tag color="neutral" size="md">{{ g.secrets.length }} secrets</nldd-tag>
            <router-link
              :to="`/teams/${g.team.id}`"
              class="rp-team-link"
              @click.stop
            >
              <nldd-icon name="arrow-right" aria-hidden="true"></nldd-icon>
              Naar team
            </router-link>
          </button>

          <div v-if="isOpen(g.team.id)" class="rp-secrets">
            <div v-for="sec in g.secrets" :key="sec.id" class="rp-secret">
              <div class="rp-secret-main">
                <nldd-icon
                  :name="iconFor(sec.type)"
                  aria-hidden="true"
                  class="rp-secret-icon"
                ></nldd-icon>
                <div class="rp-secret-id">
                  <span class="rp-secret-name">{{ sec.name }}</span>
                  <span class="rp-secret-type">{{ sec.type }}</span>
                </div>
              </div>

              <div class="rp-secret-value" title="Waarde is gemaskeerd">
                <nldd-icon name="eye" aria-hidden="true"></nldd-icon>
                <code>••••••••••••••••</code>
              </div>

              <div class="rp-secret-meta">
                <span class="rp-meta-line">
                  <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
                  <span :class="{ 'rp-fresh': justRotated(sec) }">
                    Geroteerd {{ sec.rotated }}
                  </span>
                </span>
                <nldd-tag :color="expiryColor(sec)" size="md">
                  Verloopt {{ sec.expires }}
                </nldd-tag>
              </div>

              <div class="rp-secret-actions">
                <router-link
                  v-if="appForSecret(sec)"
                  :to="`/apps/${appForSecret(sec).id}`"
                  class="rp-app-chip"
                >
                  <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
                  {{ appForSecret(sec).name }}
                </router-link>
                <nldd-button
                  variant="primary"
                  size="sm"
                  :text="rotating === sec.id ? 'Roteren…' : 'Roteer nu'"
                  start-icon="arrow-up-arrow-down"
                  :disabled="rotating === sec.id || undefined"
                  @click="rotate(sec)"
                ></nldd-button>
              </div>
            </div>
          </div>
        </nldd-container>
      </nldd-card>

      <nldd-button
        v-if="moreCount > 0"
        variant="secondary"
        :text="`Toon meer (nog ${moreCount} teams)`"
        start-icon="chevron-down"
        @click="showMore"
      ></nldd-button>
    </div>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      v-if="lastRotated"
      title="Secret geroteerd"
      :supporting-text="`Nieuwe waarde voor ${lastRotated.name} is uitgerold. Applicaties pikken de nieuwe waarde op bij de volgende token-refresh. De oude waarde is direct ingetrokken.`"
    ></nldd-inline-dialog>

    <CliHint
      :command="
        lastRotated
          ? `bg secret rotate ${lastRotated.name}`
          : 'bg secret rotate paspoort/db-password'
      "
      label="Roteren kan ook via de CLI:"
    />
  </div>
</template>

<style scoped>
.rp-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}
.rp-type-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.rp-empty {
  opacity: 0.6;
  margin: 0;
  padding: 0.5rem 0.25rem;
}
.rp-tree {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.rp-team-row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: left;
}
.rp-chevron {
  width: 1rem;
  height: 1rem;
  opacity: 0.6;
  transition: transform 0.15s ease;
}
.rp-chevron-open {
  transform: rotate(90deg);
}
.rp-team-icon {
  width: 1.2rem;
  height: 1.2rem;
  opacity: 0.75;
}
.rp-team-name {
  font-weight: 700;
  font-size: 1.05rem;
}
.rp-team-link {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--semantics-action-default-color, currentColor);
  opacity: 0.85;
}
.rp-team-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-team-link:hover {
  opacity: 1;
}
.rp-secrets {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rp-secret {
  display: grid;
  grid-template-columns: minmax(220px, 1.4fr) auto 1.2fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-secret-main {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  min-width: 0;
}
.rp-secret-icon {
  width: 1.3rem;
  height: 1.3rem;
  opacity: 0.7;
  flex: none;
}
.rp-secret-id {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.rp-secret-name {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rp-secret-type {
  font-size: 0.75rem;
  opacity: 0.6;
}
.rp-secret-value {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  opacity: 0.55;
}
.rp-secret-value nldd-icon {
  width: 1rem;
  height: 1rem;
}
.rp-secret-value code {
  letter-spacing: 0.1em;
  font-size: 0.9rem;
}
.rp-secret-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: flex-start;
}
.rp-meta-line {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  opacity: 0.8;
}
.rp-meta-line nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-fresh {
  color: var(--semantics-feedback-success-color, #1a7f37);
  font-weight: 600;
  opacity: 1;
}
.rp-secret-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: flex-end;
}
.rp-app-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 999px;
  text-decoration: none;
  color: inherit;
  background: var(--semantics-surfaces-default-background-color, #fff);
}
.rp-app-chip nldd-icon {
  width: 0.85rem;
  height: 0.85rem;
}
.rp-app-chip:hover {
  border-color: currentColor;
}
@media (max-width: 880px) {
  .rp-secret {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  .rp-secret-actions {
    justify-content: flex-start;
  }
}
</style>
