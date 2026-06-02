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

// Government-specific golden paths. These are opinionated, compliant-by-default
// starting points that live elsewhere on the platform; the card routes there
// instead of scaffolding a generic repository.
const GOV_PATHS = [
  {
    id: 'gov-regelrecht',
    name: 'RegelRecht-dienst',
    icon: 'certificate',
    desc: 'Een wet als geteste, draaiende dienst. De wettekst zelf is de bron: geharvest uit wetten.overheid.nl, machine-leesbaar gemaakt en uitgerold.',
    tags: ['BWB-harvest', 'machine-leesbaar', 'Given/When/Then'],
    to: '/wetten/nieuw',
    cta: 'Start bij de wet',
  },
  {
    id: 'gov-register',
    name: 'Register-koppeling',
    icon: 'cylinder-split',
    desc: 'Een dienst die put uit de basisregistraties. Sluit aan op BRP, BRK, BAG of HR, met OIN/TOOI en AVG-classificatie geregeld.',
    tags: ['BRP', 'BRK', 'BAG', 'OIN/TOOI'],
    to: '/registers',
    cta: 'Kies een register',
  },
  {
    id: 'gov-fsc',
    name: 'Digikoppeling / FSC',
    icon: 'link',
    desc: 'Een veilig koppelvlak tussen overheidsorganisaties. Vertrouwen tussen partijen via PKIoverheid, geen losse API-sleutels.',
    tags: ['Digikoppeling', 'FSC', 'PKIoverheid'],
    to: '/koppelvlakken/fsc',
    cta: 'Open koppelvlakken',
  },
  {
    id: 'gov-notificaties',
    name: 'Notificatie-service',
    icon: 'envelope',
    desc: 'Publiceer gebeurtenissen waar andere diensten op kunnen abonneren, volgens het NL GOV CloudEvents-profiel.',
    tags: ['CloudEvents', 'pub/sub', 'abonnementen'],
    to: '/notificaties',
    cta: 'Open notificaties',
  },
  {
    id: 'gov-standaarden',
    name: 'Conform de standaarden',
    icon: 'check-mark-circle',
    desc: 'De afdwingbare defaults van het Rijk in één plek: NLDD design system, API Design Rules, WCAG 2.2 AA en de BIO.',
    tags: ['NLDD', 'ADR', 'WCAG 2.2', 'BIO'],
    to: '/standaarden',
    cta: 'Bekijk standaarden',
  },
];

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
      <MetricCard :value="store.templates.length + GOV_PATHS.length" label="Golden paths" sub="beschikbaar" icon="books-vertical" />
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

    <nldd-spacer size="32" />

    <nldd-title size="3"><h2>Specifiek voor de overheid</h2></nldd-title>
    <nldd-spacer size="6" />
    <nldd-rich-text>
      <p>
        Geen kale scaffolding, maar de bouwstenen die het Rijk uniek maken. Deze golden paths
        starten in hun eigen flow elders op het platform en laten zien hoe alles samenhangt:
        van wet tot register tot koppelvlak.
      </p>
    </nldd-rich-text>
    <nldd-spacer size="16" />

    <nldd-collection layout="grid" item-width="360px">
      <router-link v-for="g in GOV_PATHS" :key="g.id" :to="g.to" class="rp-gov-link">
        <nldd-card :accessible-label="g.name">
          <nldd-container padding="24">
            <div class="rp-tpl-head">
              <div class="rp-tpl-icon rp-gov-icon">
                <nldd-icon :name="g.icon" aria-hidden="true"></nldd-icon>
              </div>
              <div>
                <nldd-title size="4"><h3>{{ g.name }}</h3></nldd-title>
                <span class="rp-tpl-lang">Specifiek voor de overheid</span>
              </div>
            </div>

            <nldd-spacer size="12" />
            <nldd-rich-text><p>{{ g.desc }}</p></nldd-rich-text>
            <nldd-spacer size="16" />

            <div class="rp-tpl-section-label">Sluit aan op</div>
            <div class="rp-tpl-tags">
              <nldd-tag v-for="t in g.tags" :key="t" color="neutral" size="md">{{ t }}</nldd-tag>
            </div>

            <nldd-spacer size="16" />
            <span class="rp-gov-cta">{{ g.cta }} →</span>
          </nldd-container>
        </nldd-card>
      </router-link>
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

.rp-gov-link { text-decoration: none; color: inherit; display: block; }
.rp-gov-link nldd-card { transition: box-shadow 0.15s ease; }
.rp-gov-link:hover nldd-card {
  box-shadow: 0 0 0 1px var(--semantics-actions-primary-default-background-color, #154273) inset;
  border-radius: 12px;
}
.rp-gov-icon { background: var(--semantics-actions-primary-default-background-color, #154273); }
.rp-gov-icon nldd-icon { color: #fff; }
.rp-gov-cta { font-weight: 600; color: var(--semantics-actions-primary-default-background-color, #154273); }
</style>
