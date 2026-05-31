<script setup>
// Golden paths: the curated set of scaffolding templates a team can start from.
// Each template advertises what it provides out of the box. From here the user
// jumps into the new-app wizard with the template preselected.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';

const store = usePlatformStore();

// Per-template metadata: an icon, the language it scaffolds and the batteries
// that come included. The store's templates only carry id/name/desc/provides,
// so we enrich them here for a richer overview without touching the store.
const META = {
  'tpl-vue-nldd': { icon: 'rectangle-stack', lang: 'TypeScript / Vue', batteries: ['CI/CD', 'a11y-checks', 'NLDD'], time: '~5 min' },
  'tpl-rust-api': { icon: 'cylinder-split', lang: 'Rust', batteries: ['OpenAPI', 'migraties', 'BDD-tests'], time: '~7 min' },
  'tpl-python-job': { icon: 'folder-stack', lang: 'Python', batteries: ['uv', 'ruff', 'pytest'], time: '~4 min' },
  'tpl-astro-docs': { icon: 'books-vertical', lang: 'Astro', batteries: ['Pagefind', 'NLDD', 'CI/CD'], time: '~4 min' },
};

function meta(id) {
  return META[id] || { icon: 'sparkles', lang: '—', batteries: [], time: '—' };
}

const usageByTemplate = computed(() => {
  // Best-effort: count apps whose stack matches the template's headline tech.
  const counts = {};
  for (const tpl of store.templates) counts[tpl.id] = 0;
  for (const app of store.apps) {
    const stack = (app.stack || []).join(' ').toLowerCase();
    if (stack.includes('vue')) counts['tpl-vue-nldd']++;
    else if (stack.includes('rust')) counts['tpl-rust-api']++;
    else if (stack.includes('python')) counts['tpl-python-job']++;
  }
  return counts;
});
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Golden paths"
      lede="De aanbevolen startpunten voor een nieuwe applicatie. Een golden path levert een werkende repository met CI, tests en het design system, zodat een team binnen minuten productief is."
      :crumbs="[{ text: 'Home', href: '/' }, { text: 'Applicaties', href: '/apps' }, { text: 'Golden paths', href: '/apps/templates' }]"
    >
      <template #actions>
        <router-link to="/apps/nieuw">
          <nldd-button variant="primary" text="Start een golden path" start-icon="plus"></nldd-button>
        </router-link>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="store.templates.length" label="Golden paths" sub="beschikbaar" icon="books-vertical" />
      <MetricCard value="< 10 min" label="Tijd tot eerste commit" sub="gemiddeld" icon="clock" />
      <MetricCard value="EUPL-1.2" label="Standaardlicentie" sub="open-tenzij" icon="certificate" />
    </nldd-container>

    <nldd-spacer size="24" />

    <nldd-collection layout="grid" item-width="360px">
      <nldd-card v-for="tpl in store.templates" :key="tpl.id" :accessible-label="tpl.name">
        <nldd-container padding="24">
          <div class="rp-tpl-head">
            <div class="rp-tpl-icon">
              <nldd-icon :name="meta(tpl.id).icon" aria-hidden="true"></nldd-icon>
            </div>
            <div>
              <nldd-title size="4"><h3>{{ tpl.name }}</h3></nldd-title>
              <span class="rp-tpl-lang">{{ meta(tpl.id).lang }}</span>
            </div>
          </div>

          <nldd-spacer size="12" />
          <nldd-rich-text><p>{{ tpl.desc }}</p></nldd-rich-text>
          <nldd-spacer size="16" />

          <div class="rp-tpl-section-label">Levert mee</div>
          <div class="rp-tpl-tags">
            <nldd-tag v-for="p in tpl.provides" :key="p" color="accent" size="md">{{ p }}</nldd-tag>
          </div>

          <nldd-spacer size="12" />

          <div class="rp-tpl-section-label">Batterijen inbegrepen</div>
          <ul class="rp-tpl-batteries">
            <li v-for="b in meta(tpl.id).batteries" :key="b">
              <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
              {{ b }}
            </li>
          </ul>

          <nldd-spacer size="16" />

          <div class="rp-tpl-foot">
            <span class="rp-tpl-meta">
              <nldd-icon name="clock" aria-hidden="true"></nldd-icon>
              {{ meta(tpl.id).time }}
            </span>
            <span class="rp-tpl-meta">
              <nldd-icon name="rectangle-stack" aria-hidden="true"></nldd-icon>
              {{ usageByTemplate[tpl.id] }} in gebruik
            </span>
          </div>

          <nldd-spacer size="16" />

          <router-link :to="`/apps/nieuw?template=${tpl.id}`">
            <nldd-button variant="primary" text="Gebruik deze golden path" end-icon="arrow-right"></nldd-button>
          </router-link>
        </nldd-container>
      </nldd-card>
    </nldd-collection>

    <nldd-spacer size="24" />

    <nldd-inline-dialog
      title="Open-tenzij"
      supporting-text="Elke golden path scaffoldt standaard een EUPL-1.2 repository met CONTRIBUTING.md en een security.txt. Sluiten kan, maar vraagt een motivatie."
    ></nldd-inline-dialog>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-tpl-head { display: flex; align-items: center; gap: 0.8rem; }
.rp-tpl-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 12px;
  background: var(--semantics-surfaces-tinted-background-color);
  flex: none;
}
.rp-tpl-icon nldd-icon { width: 1.5rem; height: 1.5rem; }
.rp-tpl-lang { font-size: 0.85rem; opacity: 0.7; }
.rp-tpl-section-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
  margin-bottom: 0.4rem;
}
.rp-tpl-tags { display: flex; gap: 0.35rem; flex-wrap: wrap; }
.rp-tpl-batteries { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.3rem; }
.rp-tpl-batteries li { display: flex; align-items: center; gap: 0.45rem; font-size: 0.9rem; }
.rp-tpl-batteries nldd-icon { width: 1rem; height: 1rem; color: var(--semantics-feedback-success-icon-color, #2e7d32); }
.rp-tpl-foot { display: flex; gap: 1rem; flex-wrap: wrap; }
.rp-tpl-meta { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; opacity: 0.75; }
.rp-tpl-meta nldd-icon { width: 1rem; height: 1rem; }
</style>
