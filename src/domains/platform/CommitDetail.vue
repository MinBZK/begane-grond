<script setup>
// A single commit on platform-config, shown as a focused page: message, author,
// file, and the full diff. This is the "kijk naar de onderliggende code" payoff
// of the IaC story. The wizard seams (order, app, promotie) and the commit log
// link here by sha. From here you can step further out to the repo on /code,
// so the chain closes: wizard -> commit -> repository.
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const route = useRoute();
const store = usePlatformStore();

const sha = computed(() => route.params.sha);
const commit = computed(() => store.commitBySha(sha.value) || null);

const author = computed(() => (commit.value ? store.personById(commit.value.actor) : null));
const authorName = computed(() => author.value?.name || commit.value?.actor || 'onbekend');

// The config repo this commit lives in. Linking here closes the loop from a
// click back to the actual repository.
const configRepo = computed(() => store.repoById('repo-platform-config'));

// Icon hint per action family, mirroring AuditLog so the commit reads the same
// across screens.
const familyIcon = computed(() => {
  const a = (commit.value?.action || '').toLowerCase();
  if (a.includes('secret')) return 'lock-closed';
  if (a.includes('infra') || a.includes('instance')) return 'cloud';
  if (a.includes('release') || a.includes('promo')) return 'arrow-up-arrow-down';
  if (a.includes('rfc')) return 'books-vertical';
  if (a.includes('applicatie') || a.includes('app')) return 'rectangle-stack';
  if (a.includes('campagne')) return 'ship-wheel';
  if (a.includes('werkplek') || a.includes('device')) return 'person';
  return 'chevron-left-forward-slash-chevron-right';
});

const relationLinks = computed(() => {
  const out = [];
  if (configRepo.value) {
    out.push({ text: configRepo.value.name, to: `/code/${configRepo.value.id}`, icon: 'folder-stack' });
  }
  if (author.value) {
    out.push({ text: authorName.value, to: `/teams/mensen/${author.value.id}`, icon: 'person' });
  }
  out.push({ text: 'Alle commits', to: '/platform/iac', icon: 'chevron-left-forward-slash-chevron-right' });
  return out;
});
</script>

<template>
  <div class="rp-page">
    <template v-if="commit">
      <PageHeader
        :title="commit.message"
        lede="Eén commit op de config-repo van het platform. Dit is de wijziging die je actie opleverde: het bestand, de diff, de auteur. Herleidbaar en terug te draaien zoals elke commit."
        :crumbs="[
          { text: 'Platform', href: '/' },
          { text: 'Infra als code', href: '/platform/iac' },
          { text: commit.sha, href: `/platform/iac/${commit.sha}` },
        ]"
      >
        <template #actions>
          <router-link to="/platform/iac">
            <nldd-button variant="secondary" text="Terug naar log" start-icon="arrow-left"></nldd-button>
          </router-link>
          <router-link v-if="configRepo" :to="`/code/${configRepo.id}`">
            <nldd-button variant="secondary" text="Open de repository" start-icon="folder-stack"></nldd-button>
          </router-link>
        </template>
      </PageHeader>

      <!-- Commit metadata -->
      <nldd-card accessible-label="Commit-gegevens">
        <nldd-container padding="20">
          <div class="rp-commit-meta">
            <span class="rp-commit-ic"><nldd-icon :name="familyIcon" aria-hidden="true"></nldd-icon></span>
            <div class="rp-commit-body">
              <p class="rp-commit-msg">{{ commit.message }}</p>
              <p class="rp-commit-sub">
                <span class="rp-commit-sha">{{ commit.sha }}</span>
                ·
                <router-link v-if="author" :to="`/teams/mensen/${author.id}`" class="rp-link">{{ authorName }}</router-link>
                <span v-else>{{ authorName }}</span>
                ·
                <span class="rp-commit-when"><nldd-icon name="clock" aria-hidden="true"></nldd-icon> {{ commit.at }}</span>
              </p>
              <p class="rp-commit-path">
                <router-link v-if="configRepo" :to="`/code/${configRepo.id}`" class="rp-link">{{ configRepo.name }}</router-link>
                <span v-else>platform-config</span>
                <span class="rp-commit-file"> / {{ commit.path }}</span>
              </p>
            </div>
          </div>
        </nldd-container>
      </nldd-card>

      <nldd-spacer size="24" />

      <!-- The diff -->
      <nldd-title size="3"><h2>De wijziging</h2></nldd-title>
      <nldd-spacer size="12" />
      <nldd-card accessible-label="Diff">
        <nldd-container padding="20">
          <nldd-code-viewer language="text">{{ commit.diff }}</nldd-code-viewer>
        </nldd-container>
      </nldd-card>

      <nldd-spacer size="20" />
      <CliHint :command="`bg config diff ${commit.sha}`" />

      <nldd-spacer size="24" />
      <RelationLinks title="Doorklikken" :links="relationLinks" />
    </template>

    <!-- Unknown sha: stay graceful. -->
    <template v-else>
      <PageHeader
        title="Commit niet gevonden"
        lede="Deze commit staat niet in de huidige sessie. Het log reset bij een refresh."
        :crumbs="[{ text: 'Platform', href: '/' }, { text: 'Infra als code', href: '/platform/iac' }]"
      >
        <template #actions>
          <router-link to="/platform/iac">
            <nldd-button variant="secondary" text="Terug naar log" start-icon="arrow-left"></nldd-button>
          </router-link>
        </template>
      </PageHeader>
    </template>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-commit-meta {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}
.rp-commit-ic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 8px;
  background: var(--semantics-surfaces-tinted-background-color);
  flex: 0 0 auto;
}
.rp-commit-ic nldd-icon { width: 1.25rem; height: 1.25rem; opacity: 0.8; }
.rp-commit-body { min-width: 0; }
.rp-commit-msg { font-weight: 700; font-size: 1.05rem; margin: 0 0 0.3rem; }
.rp-commit-sub,
.rp-commit-path {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  opacity: 0.85;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.rp-commit-sha,
.rp-commit-file {
  font-family: var(--ro-font-mono, ui-monospace, monospace);
  font-weight: 600;
}
.rp-commit-when {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.rp-commit-when nldd-icon { width: 0.85rem; height: 0.85rem; opacity: 0.6; }
.rp-link {
  color: var(--semantics-actions-primary-default-background-color);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover { text-decoration: underline; }
</style>
