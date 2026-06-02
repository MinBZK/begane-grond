<script setup>
// Skills-marketplace: a catalog of AI-assistant plugins that steer generative
// AI toward compliance with Dutch government standards. Modelled on
// github.com/developer-overheid-nl/skills-marketplace, a neutral marketplace
// of plugins (each bundling "skills", i.e. AI capabilities) installable into
// bg code or a Claude-Code-style editor such as Cursor. This is the missing
// link between the platform's AI offering and its standards: the assistant
// learns the standard you must meet.
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();
const router = useRouter();

const myTeam = computed(() => store.teamOfPerson(store.currentUser));
const installedForMyTeam = computed(() =>
  myTeam.value ? store.pluginsInstalledByTeam(myTeam.value.id) : [],
);

const totalSkills = computed(() => store.skillPlugins.reduce((n, p) => n + p.skills, 0));
// Real current installs across teams (not the per-plugin cumulative counter).
const totalInstalls = computed(() =>
  store.teams.reduce((n, t) => n + store.pluginsInstalledByTeam(t.id).length, 0),
);
// Only teams that actually installed something (avoids ~95 empty cards).
const teamsWithPlugins = computed(() =>
  store.teams.filter((t) => store.pluginsInstalledByTeam(t.id).length),
);

// With ~99 teams the per-team overview can still grow to dozens of cards, so we
// add a name filter and an initial cap with a "Toon meer"-button.
const teamQuery = ref('');
const teamLimit = ref(24);
const filteredTeams = computed(() => {
  const q = teamQuery.value.trim().toLowerCase();
  if (!q) return teamsWithPlugins.value;
  return teamsWithPlugins.value.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      store
        .pluginsInstalledByTeam(t.id)
        .some((pid) => (store.skillPluginById(pid)?.name || pid).toLowerCase().includes(q)),
  );
});
const visibleTeams = computed(() => filteredTeams.value.slice(0, teamLimit.value));
const moreTeams = computed(() => Math.max(0, filteredTeams.value.length - teamLimit.value));
function showMoreTeams() {
  teamLimit.value += 24;
}

function isInstalled(pluginId) {
  return installedForMyTeam.value.includes(pluginId);
}
function toggle(plugin) {
  if (!myTeam.value) return;
  if (isInstalled(plugin.id)) store.uninstallSkill(myTeam.value.id, plugin.id);
  else store.installSkill(myTeam.value.id, plugin.id);
}

// Standard name for a covered standard id (for the cross-link chips).
function standardName(id) {
  const s = store.standards.find((x) => x.id === id);
  return s ? s.name : id;
}
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Skills-marketplace"
      lede="Eén catalogus van AI-assistent-plugins die generatieve AI naar naleving van de Nederlandse overheidsstandaarden sturen. Installeer een plugin en je assistent kent de standaard die je moet volgen. Naar het model van developer-overheid-nl/skills-marketplace."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'AI & LLM', href: '/ai' },
      ]"
    >
      <template #actions>
        <router-link to="/ai">
          <nldd-button variant="secondary" text="AI-assisted coding" start-icon="sparkles"></nldd-button>
        </router-link>
        <a href="https://github.com/developer-overheid-nl/skills-marketplace" rel="noopener external">
          <nldd-button variant="secondary" text="marketplace.json" end-icon="external-link"></nldd-button>
        </a>
      </template>
    </PageHeader>

    <!-- KPI row -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="store.skillPlugins.length" label="Plugins" sub="in de marketplace" icon="puzzle-piece" />
      <MetricCard :value="totalSkills" label="Skills" sub="AI-capabilities totaal" icon="sparkles" />
      <MetricCard :value="installedForMyTeam.length" label="Geïnstalleerd" :sub="myTeam ? myTeam.name : 'jouw team'" icon="check-mark-circle" to="/zelf" />
      <MetricCard :value="totalInstalls" label="Installaties" sub="over alle teams" icon="person-2" />
    </nldd-container>

    <nldd-spacer size="16" />
    <nldd-container layout="grid" column-count="2" md-column-count="1" gap="12">
      <nldd-inline-dialog
        title="Installeer via bg, niet als losse tool"
        supporting-text="Op het platform installeer je een plugin met bg ai skill install, met team-context, dataclassificatie en audit. bg gebruikt onder water dezelfde marketplace. Rechtstreeks in je editor, zoals Cursor, kan ook buiten het platform om."
      ></nldd-inline-dialog>
      <nldd-inline-dialog
        title="Informatieve samenvattingen, geen officiële standaard"
        supporting-text="De plugins bevatten informatieve samenvattingen, niet de officiële standaarden zelf. De officiële definitie staat altijd bij Forum Standaardisatie."
      ></nldd-inline-dialog>
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Plugin catalog -->
    <nldd-title size="3"><h2>Plugins</h2></nldd-title>
    <nldd-spacer size="16" />
    <nldd-collection layout="grid" item-width="420px">
      <nldd-card v-for="p in store.skillPlugins" :key="p.id" :accessible-label="p.name">
        <nldd-container padding="20">
          <div class="rp-plugin-head">
            <nldd-icon name="puzzle-piece" aria-hidden="true" class="rp-plugin-icon"></nldd-icon>
            <div class="rp-min-width-0">
              <nldd-title size="4"><h3>{{ p.name }}</h3></nldd-title>
              <p class="rp-plugin-pub">door {{ p.publisher }}</p>
            </div>
            <nldd-tag v-if="isInstalled(p.id)" color="success" size="md">Geïnstalleerd</nldd-tag>
          </div>

          <nldd-spacer size="8" />
          <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
            <nldd-tag color="accent" size="md">{{ p.skills }} skills</nldd-tag>
            <nldd-tag v-for="pf in p.platforms" :key="pf" color="neutral" size="md">{{ pf }}</nldd-tag>
            <nldd-tag color="neutral" size="md">{{ p.installs }} installaties</nldd-tag>
          </nldd-container>

          <nldd-spacer size="10" />
          <nldd-rich-text><p>{{ p.desc }}</p></nldd-rich-text>

          <!-- Cross-link to the standards this plugin covers -->
          <template v-if="p.standards && p.standards.length">
            <nldd-spacer size="10" />
            <p class="rp-plugin-covers">Dekt standaard:</p>
            <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
              <router-link
                v-for="sid in p.standards"
                :key="sid"
                to="/standaarden"
                class="rp-std-chip"
              >
                <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
                <span>{{ standardName(sid) }}</span>
              </router-link>
            </nldd-container>
          </template>

          <nldd-spacer size="12" />
          <nldd-code-viewer language="bash">{{ p.install }}</nldd-code-viewer>
          <p class="rp-plugin-alt">
            Buiten het platform, rechtstreeks in je editor zoals Cursor:
            <code>{{ p.altInstall }}</code>
          </p>

          <nldd-spacer size="12" />
          <nldd-button
            :variant="isInstalled(p.id) ? 'secondary' : 'primary'"
            :text="isInstalled(p.id) ? 'Verwijderen' : 'Installeren voor mijn team'"
            :start-icon="isInstalled(p.id) ? 'dismiss' : 'plus'"
            @click="toggle(p)"
          ></nldd-button>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="32" />

    <!-- Per-team install overview -->
    <nldd-title size="3"><h2>Wie heeft wat geïnstalleerd</h2></nldd-title>
    <nldd-rich-text>
      <p>Per team is zichtbaar welke skill-plugins actief zijn. Zo weet je of een team de standaarden kent die het moet volgen.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-search-field
      placeholder="Zoek op team of plugin"
      accessible-label="Zoek team"
      :value="teamQuery"
      @input="(e) => (teamQuery = e.target.value)"
    ></nldd-search-field>
    <nldd-spacer size="16" />
    <nldd-collection layout="grid" item-width="320px">
      <nldd-card v-for="t in visibleTeams" :key="t.id" :accessible-label="t.name">
        <nldd-container padding="20">
          <router-link :to="'/teams/' + t.id" class="rp-team-link">
            <nldd-title size="5"><h3>{{ t.name }}</h3></nldd-title>
          </router-link>
          <nldd-spacer size="10" />
          <nldd-container layout="wrap" gap="6" horizontal-alignment="left">
            <template v-if="store.pluginsInstalledByTeam(t.id).length">
              <nldd-tag
                v-for="pid in store.pluginsInstalledByTeam(t.id)"
                :key="pid"
                color="accent"
                size="md"
              >{{ store.skillPluginById(pid)?.name || pid }}</nldd-tag>
            </template>
            <nldd-rich-text v-else><p class="rp-empty">Nog geen plugins.</p></nldd-rich-text>
          </nldd-container>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-rich-text v-if="!filteredTeams.length">
      <p class="rp-empty">Geen team gevonden voor "{{ teamQuery }}".</p>
    </nldd-rich-text>
    <template v-if="moreTeams > 0">
      <nldd-spacer size="16" />
      <nldd-button
        variant="secondary"
        :text="'Toon meer (nog ' + moreTeams + ')'"
        start-icon="chevron-down"
        @click="showMoreTeams"
      ></nldd-button>
    </template>

    <nldd-spacer size="24" />
    <CliHint command="bg ai skill install standaarden --team team-platform" />
  </div>
</template>

<style scoped>
.rp-plugin-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}
.rp-plugin-icon {
  width: 1.6rem;
  height: 1.6rem;
  flex: 0 0 auto;
  opacity: 0.8;
}
.rp-plugin-pub {
  margin: 0.1rem 0 0;
  font-size: 0.85rem;
  opacity: 0.65;
}
.rp-plugin-covers {
  margin: 0 0 0.4rem;
  font-size: 0.8rem;
  opacity: 0.7;
}
.rp-plugin-alt {
  margin: 0.45rem 0 0;
  font-size: 0.78rem;
  opacity: 0.65;
}
.rp-plugin-alt code {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.95em;
}
.rp-std-chip,
.rp-team-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  color: inherit;
}
.rp-std-chip {
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  font-size: 0.85rem;
}
.rp-std-chip:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-std-chip nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-empty {
  opacity: 0.6;
  font-size: 0.85rem;
  margin: 0;
}
</style>
