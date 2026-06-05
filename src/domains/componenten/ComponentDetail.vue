<script setup>
// Component detail: shows what the component is, the register it builds on (if
// any), the teams that already use it, and where it lives. Everything
// cross-links: repo to /code, owner to /teams, register to /registers.
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();

const KIND_COLOR = { bibliotheek: 'neutral', service: 'accent', 'frontend-component': 'warning' };

const component = computed(() => store.componentById(route.params.id));
const repo = computed(() => (component.value ? store.repoById(component.value.repo) : null));
const owner = computed(() => (component.value ? store.teamById(component.value.owner) : null));
const register = computed(() =>
  component.value && component.value.register ? store.registerById(component.value.register) : null,
);

const usedByTeams = computed(() =>
  component.value
    ? (component.value.usedBy || []).map((id) => ({ id, name: store.teamById(id)?.name || id }))
    : [],
);

const relations = computed(() => {
  if (!component.value) return [];
  const links = [];
  if (repo.value) links.push({ text: repo.value.name, to: `/code/${repo.value.id}`, icon: 'chevron-left-forward-slash-chevron-right' });
  if (owner.value) links.push({ text: owner.value.name, to: `/teams/${owner.value.id}`, icon: 'person-2' });
  if (register.value) links.push({ text: register.value.name, to: `/registers/${register.value.id}`, icon: 'cylinder-split' });
  return links;
});

const cli = computed(() =>
  component.value
    ? `bg component show ${component.value.id}\nbg component add ${component.value.id} --team team-platform`
    : '',
);
</script>

<template>
  <div v-if="component" class="rp-page">
    <PageHeader
      :title="component.name"
      :lede="component.description"
      :crumbs="[
        { text: 'Componenten', href: '/componenten' },
        { text: component.name, href: `/componenten/${component.id}` },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Terug naar catalogus" start-icon="chevron-left" href="/componenten"></nldd-button>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="component.kind" label="Soort" sub="bibliotheek, service of frontend" icon="puzzle-piece" />
      <MetricCard :value="component.language" label="Taal" sub="implementatietaal" icon="chevron-left-forward-slash-chevron-right" />
      <MetricCard :value="`${component.reuses}x hergebruikt`" label="Hergebruik" sub="overgenomen door teams" icon="link" />
      <MetricCard :value="component.license" label="Licentie" sub="open source" icon="file-text" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-container layout="grid" column-count="3" md-column-count="1" gap="20">
      <!-- Description and register link -->
      <nldd-card accessible-label="Over dit component" class="rp-span2">
        <nldd-container padding="20">
          <div class="rp-c-head">
            <nldd-title size="4"><h2>Over dit component</h2></nldd-title>
            <nldd-tag :color="KIND_COLOR[component.kind] || 'neutral'" size="md">{{ component.kind }}</nldd-tag>
          </div>
          <nldd-spacer size="12" />
          <nldd-rich-text><p>{{ component.description }}</p></nldd-rich-text>
          <p v-if="register" class="rp-c-meta">
            <nldd-icon name="cylinder-split" aria-hidden="true"></nldd-icon>
            Sluit aan op register:
            <router-link :to="`/registers/${register.id}`" class="rp-link">{{ register.name }}</router-link>
          </p>
        </nldd-container>
      </nldd-card>

      <RelationLinks title="Herkomst en gebruik" :links="relations" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- Used by -->
    <nldd-card accessible-label="Gebruikt door">
      <nldd-container padding="20">
        <nldd-title size="5"><h3>Gebruikt door</h3></nldd-title>
        <nldd-spacer size="12" />
        <div class="rp-usedby">
          <router-link v-for="t in usedByTeams" :key="t.id" :to="`/teams/${t.id}`" class="rp-usedby-chip">
            <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
            <span>{{ t.name }}</span>
          </router-link>
        </div>
        <p v-if="!usedByTeams.length" class="rp-empty">Nog geen teams die dit component gebruiken.</p>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />
    <CliHint :command="cli" />
  </div>

  <div v-else class="rp-page">
    <PageHeader title="Component niet gevonden" />
    <nldd-button variant="secondary" text="Terug naar catalogus" @click="router.push('/componenten')"></nldd-button>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-span2 { grid-column: span 2; }
@media (max-width: 1007px) { .rp-span2 { grid-column: auto; } }
.rp-c-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-c-meta { display: flex; align-items: center; gap: 0.4rem; margin: 0.8rem 0 0; font-size: 0.88rem; }
.rp-c-meta nldd-icon { width: 0.95rem; height: 0.95rem; flex: 0 0 auto; }
.rp-usedby { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rp-usedby-chip { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.7rem; border-radius: 8px; border: 1px solid var(--semantics-dividers-color); text-decoration: none; color: inherit; }
.rp-usedby-chip:hover { background: var(--semantics-surfaces-tinted-background-color); }
.rp-usedby-chip nldd-icon { width: 1rem; height: 1rem; flex: 0 0 auto; }
.rp-empty { opacity: 0.6; margin: 0.5rem 0 0; }
.rp-link { color: var(--semantics-actions-primary-default-background-color); text-decoration: none; font-weight: 600; }
.rp-link:hover { text-decoration: underline; }
</style>
