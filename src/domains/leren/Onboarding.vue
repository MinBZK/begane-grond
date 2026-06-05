<script setup>
// "Leren & onboarding" — the front door for people new to the Begane Grond.
// Combines the operational onboarding paths from the store (interactive
// step-by-step checklists), a searchable docs hub of runbooks and guides, and
// curriculum-style learning paths for the government standards (accessibility,
// security, open source). Everything is clickable into the rest of the platform.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';
import PathChecklist from './PathChecklist.vue';
import StandardsPathCard from './StandardsPathCard.vue';
import DocsHub from './DocsHub.vue';
import { docs, standardsPaths } from './docs.js';

const store = usePlatformStore();

const me = computed(() => store.currentPerson);
const myTeam = computed(() => (me.value ? store.teamOfPerson(me.value.id) : null));
const myWorkplace = computed(() => (me.value ? store.workplacesByPerson(me.value.id)[0] : null));

// The two operational onboarding paths live in the store. We pull them by id so
// the checklist always reflects the real seed data, and attach per-step deep
// links into the relevant parts of the platform.
const newDevPath = computed(() => store.learningPaths.find((p) => p.id === 'lp-newdev'));
const prodPath = computed(() => store.learningPaths.find((p) => p.id === 'lp-prod'));

// Per-step metadata: a short hint plus a cross-layer link, so each checklist
// item is a genuine jumping-off point and not a dead line of text.
const newDevMeta = [
  { hint: 'Bestel een autonome Linux-werkplek en wacht op uitrol.', to: '/werkplekken/nieuw', linkText: 'Werkplek aanvragen', icon: 'house' },
  { hint: 'Vind je teamrepo in de code-catalogus en clone hem.', to: '/code', linkText: 'Naar de repos', icon: 'folder-stack' },
  { hint: 'Volg de README en draai de service lokaal met de bg-CLI.', to: '/cli', linkText: 'bg-CLI openen', icon: 'terminal' },
  { hint: 'Open een merge request en laat CI groen worden.', to: '/code', linkText: 'Open een PR', icon: 'arrow-up-arrow-down' },
];
const prodMeta = [
  { hint: 'Genereer een nieuwe service uit een gebaand pad.', to: '/apps/nieuw', linkText: 'Nieuwe app', icon: 'plus' },
  { hint: 'Neem Postgres, Kafka of een cluster af uit de catalogus.', to: '/infra', linkText: 'Infra afnemen', icon: 'cloud' },
  { hint: 'Controleer dat de pijplijn slaagt op test en acceptatie.', to: '/observability', linkText: 'Pijplijn bekijken', icon: 'check-mark-circle' },
  { hint: 'Promoot je release stap voor stap naar productie.', to: '/environments', linkText: 'Omgevingen', icon: 'arrow-up-arrow-down' },
];

// KPI tiles summarising what the onboarding hub offers.
const stats = computed(() => ({
  paths: store.learningPaths.length,
  runbooks: docs.filter((d) => d.kind === 'runbook').length,
  guides: docs.filter((d) => d.kind === 'guide').length,
  standards: standardsPaths.length,
}));

// Cross-layer relations for "where am I in the platform" on the right.
const meLinks = computed(() => {
  if (!me.value) return [];
  const links = [
    { text: me.value.name, to: `/teams/mensen/${me.value.id}`, icon: 'person' },
  ];
  if (myTeam.value) links.push({ text: myTeam.value.name, to: `/teams/${myTeam.value.id}`, icon: 'person-2' });
  if (myWorkplace.value) links.push({ text: `Werkplek ${myWorkplace.value.id}`, to: `/werkplekken/${myWorkplace.value.id}`, icon: 'house' });
  links.push({ text: 'On-call rooster', to: '/teams/on-call', icon: 'clock' });
  return links;
});
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Leren & onboarding"
      lede="Word wegwijs op het Begane Grond. Volg een onboarding-pad, doorzoek de docs-hub en haal je standaarden-badges binnen."
      :crumbs="[{ text: 'Begane Grond', href: '/' }, { text: 'Leren', href: '/leren' }]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Docs-hub" start-icon="books-vertical" @click="$router.push('/leren#docs')" />
        <nldd-button variant="primary" text="Nieuwe app starten" start-icon="plus" @click="$router.push('/apps/nieuw')" />
      </template>
    </PageHeader>

    <NerdsBadge richtlijn="gebruikersbehoeften" />
    <nldd-spacer size="20" />

    <!-- Welcome banner -->
    <nldd-card accessible-label="Welkom">
      <nldd-container padding="24">
        <div class="rp-welcome">
          <span class="rp-welcome-avatar" aria-hidden="true">{{ me?.avatar || 'RP' }}</span>
          <div class="rp-welcome-text">
            <nldd-title size="3"><h2>Welkom{{ me ? `, ${me.name.split(' ')[0]}` : '' }} 👋</h2></nldd-title>
            <nldd-rich-text>
              <p>
                Je bent ingelogd als <strong>{{ me?.role || 'developer' }}</strong>
                <template v-if="myTeam"> bij <router-link :to="`/teams/${myTeam.id}`" class="rp-link">{{ myTeam.name }}</router-link></template>.
                Begin links met een onboarding-pad. Alle stappen linken door naar de juiste plek in het platform.
              </p>
            </nldd-rich-text>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="4" gap="16">
      <MetricCard :value="stats.paths" label="Onboarding-paden" sub="stap voor stap" icon="starburst-filled" />
      <MetricCard :value="stats.runbooks" label="Runbooks" sub="operationeel" icon="terminal" />
      <MetricCard :value="stats.guides" label="Guides" sub="uitleg & how-to" icon="books-vertical" />
      <MetricCard :value="stats.standards" label="Standaarden-paden" sub="WCAG · BIO · open source" icon="shield-check-mark" />
    </nldd-container>

    <nldd-spacer size="32" />

    <!-- Onboarding paths + my-place sidebar -->
    <nldd-title size="3"><h2>Onboarding-paden</h2></nldd-title>
    <nldd-rich-text><p>Twee kant-en-klare routes. Vink stappen af om je voortgang bij te houden.</p></nldd-rich-text>
    <nldd-spacer size="16" />

    <div class="rp-paths-layout">
      <div class="rp-paths-main">
        <PathChecklist
          v-if="newDevPath"
          :path="newDevPath"
          icon="person-circle"
          lede="Van rijksaccount tot je eerste merge."
          :meta="newDevMeta"
          :pre-done="1"
        />
        <PathChecklist
          v-if="prodPath"
          :path="prodPath"
          icon="ship-wheel"
          lede="Van een gebaand pad tot een dienst in productie."
          :meta="prodMeta"
          :pre-done="0"
        />
      </div>
      <aside class="rp-paths-aside">
        <RelationLinks title="Jouw plek in het platform" :links="meLinks" />
        <nldd-spacer size="16" />
        <nldd-card accessible-label="Hulp nodig">
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Hulp nodig?</h3></nldd-title>
            <nldd-spacer size="8" />
            <nldd-rich-text>
              <p>Stel je vraag in de teamruimte of vraag het de platform-LLM.</p>
            </nldd-rich-text>
            <nldd-spacer size="12" />
            <nldd-button-group orientation="horizontal">
              <nldd-button variant="secondary" text="Teamruimte" start-icon="envelope" @click="myTeam && $router.push(`/teams/${myTeam.id}`)" />
              <nldd-button variant="secondary" text="Vraag het AI" start-icon="sparkles" @click="$router.push('/ai/llm')" />
            </nldd-button-group>
          </nldd-container>
        </nldd-card>
      </aside>
    </div>

    <nldd-spacer size="32" />

    <!-- Docs hub -->
    <div id="docs">
      <DocsHub />
    </div>

    <nldd-spacer size="32" />

    <!-- Standards learning paths -->
    <nldd-title size="3"><h2>Leerpaden: overheidsstandaarden</h2></nldd-title>
    <nldd-rich-text>
      <p>Verdiep je in de standaarden die elke rijksdienst raakt. Rond de modules af en koppel je werk aan de bijbehorende standaard.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="340px">
      <StandardsPathCard v-for="sp in standardsPaths" :key="sp.id" :path="sp" />
    </nldd-collection>

    <nldd-spacer size="32" />

    <CliHint
      command="bg learn start nieuwe-developer"
      label="Start een onboarding-pad ook vanaf de CLI:"
    />
  </div>
</template>

<style scoped>
.rp-welcome {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.rp-welcome-avatar {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background: var(--semantics-actions-primary-default-background-color, #154273);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
}
.rp-welcome-text {
  min-width: 0;
}
.rp-paths-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.85fr) minmax(260px, 1fr);
  gap: 1.5rem;
  align-items: start;
}
.rp-paths-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.rp-paths-aside {
  position: sticky;
  top: 1rem;
}
@media (max-width: 900px) {
  .rp-paths-layout {
    grid-template-columns: 1fr;
  }
  .rp-paths-aside {
    position: static;
  }
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  font-weight: 600;
}
</style>
