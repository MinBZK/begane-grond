<script setup>
// The NLDD design system as a first-class platform building block, with its own
// page. The story is not "here is a component" but what a shared design system
// gives a government: accessibility and the rijkshuisstijl baked in, speed for
// teams, and the honest dogfooding argument that this very screen renders with
// it. The "live voorbeelden" section is real nldd-* components, so the page is
// its own proof. Data comes from store.designSystem (seeded, derived numbers).
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';

const store = usePlatformStore();
const ds = computed(() => store.designSystem);

const ownerTeam = computed(() => store.teamById(ds.value.owner));
const adoption = computed(() => ds.value.websiteApps + ds.value.frontendRepos);

const relationLinks = [
  { text: 'Componenten', to: '/componenten', icon: 'puzzle-piece' },
  { text: 'Toegankelijkheid', to: '/toegankelijkheid', icon: 'person' },
  { text: 'Standaarden', to: '/standaarden', icon: 'check-mark-circle' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      :title="ds.name"
      lede="Het gedeelde UI-fundament van het platform. Geen los component, maar de basis waarop elke overheidsfrontend wordt gebouwd: toegankelijkheid en de rijkshuisstijl zitten in de componenten, zodat teams ze erven in plaats van opnieuw te maken. Deze pagina, de hele app en de presentatie zijn er zelf mee gebouwd."
      :crumbs="[
        { text: 'Platform', href: '/' },
        { text: 'Design system', href: '/design-system' },
      ]"
    >
      <template #actions>
        <nldd-button variant="secondary" text="Componenten" start-icon="puzzle-piece" href="/componenten"></nldd-button>
      </template>
    </PageHeader>

    <!-- KPIs -->
    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="ds.componentCount" label="Componenten" :sub="`versie ${ds.version}`" icon="square-on-square" />
      <MetricCard :value="adoption" label="Frontends erop gebouwd" :sub="`${ds.websiteApps} sites, ${ds.frontendRepos} repos`" icon="chevron-left-forward-slash-chevron-right" />
      <MetricCard :value="ds.wcagLevel" label="Toegankelijk" sub="ingebouwd, niet achteraf" icon="person" to="/toegankelijkheid" />
      <MetricCard value="1" label="Rijkshuisstijl" sub="één look voor elke dienst" icon="square-on-square" to="/standaarden" />
    </nldd-container>

    <nldd-spacer size="28" />

    <!-- Why a shared design system is a platform building block -->
    <nldd-title size="3"><h2>Waarom dit een platform-bouwblok is</h2></nldd-title>
    <nldd-spacer size="12" />
    <ul class="rp-pillars">
      <li v-for="p in ds.pillars" :key="p.id" class="rp-pillar">
        <span class="rp-pillar-ic"><nldd-icon :name="p.icon" aria-hidden="true"></nldd-icon></span>
        <div class="rp-pillar-body">
          <p class="rp-pillar-title">{{ p.title }}</p>
          <p class="rp-pillar-text">{{ p.body }}</p>
          <router-link :to="p.to" class="rp-pillar-link">
            {{ p.toLabel }}
            <nldd-icon name="chevron-right" aria-hidden="true"></nldd-icon>
          </router-link>
        </div>
      </li>
    </ul>

    <nldd-spacer size="28" />

    <!-- Live samples: the page renders the actual components it describes. -->
    <nldd-title size="3"><h2>Live voorbeelden</h2></nldd-title>
    <nldd-rich-text>
      <p>Dit zijn echte componenten uit het design system, hier op de pagina gerenderd. Geen plaatjes: wat je ziet is wat teams overnemen.</p>
    </nldd-rich-text>
    <nldd-spacer size="16" />
    <nldd-card accessible-label="Voorbeeldcomponenten">
      <nldd-container padding="24">
        <div class="rp-sample">
          <span class="rp-sample-label">Knoppen</span>
          <div class="rp-sample-row">
            <nldd-button variant="primary" text="Primair"></nldd-button>
            <nldd-button variant="secondary" text="Secundair"></nldd-button>
            <nldd-button variant="subtle" text="Subtiel"></nldd-button>
          </div>
        </div>
        <nldd-spacer size="18" />
        <div class="rp-sample">
          <span class="rp-sample-label">Tags en status</span>
          <div class="rp-sample-row">
            <nldd-tag color="success" size="md">operationeel</nldd-tag>
            <nldd-tag color="warning" size="md">aandacht</nldd-tag>
            <nldd-tag color="critical" size="md">verstoord</nldd-tag>
            <nldd-tag color="accent" size="md">actief</nldd-tag>
            <nldd-tag color="neutral" size="md">concept</nldd-tag>
          </div>
        </div>
        <nldd-spacer size="18" />
        <div class="rp-sample">
          <span class="rp-sample-label">Formuliervelden</span>
          <div class="rp-sample-row rp-sample-fields">
            <nldd-form-field label="Naam van de dienst" class="rp-field">
              <nldd-text-field placeholder="bijv. Paspoortaanvraag"></nldd-text-field>
            </nldd-form-field>
            <nldd-form-field label="Omgeving" class="rp-field">
              <nldd-dropdown>
                <select>
                  <option>Ontwikkel</option>
                  <option>Test</option>
                  <option>Acceptatie</option>
                  <option>Productie</option>
                </select>
              </nldd-dropdown>
            </nldd-form-field>
          </div>
        </div>
        <nldd-spacer size="18" />
        <div class="rp-sample">
          <span class="rp-sample-label">Melding</span>
          <nldd-inline-dialog
            title="Toegankelijk van nature"
            supporting-text="Deze melding, de knoppen en de velden hierboven komen rechtstreeks uit het design system, inclusief focus-volgorde, contrast en schermlezer-labels."
          ></nldd-inline-dialog>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <!-- Ownership + source -->
    <nldd-card accessible-label="Beheer en bron">
      <nldd-container padding="20">
        <div class="rp-meta-row">
          <div>
            <p class="rp-meta-label">Beheerd door</p>
            <router-link v-if="ownerTeam" :to="`/teams/${ownerTeam.id}`" class="rp-link">{{ ownerTeam.name }}</router-link>
            <span v-else>{{ ds.owner }}</span>
          </div>
          <div>
            <p class="rp-meta-label">Pakket</p>
            <code>{{ ds.package }}</code>
          </div>
          <div>
            <p class="rp-meta-label">Licentie</p>
            <span>{{ ds.license }}</span>
          </div>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />
    <RelationLinks title="Doorklikken" :links="relationLinks" />
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-pillars {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 0.85rem;
}
.rp-pillar {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color, #d6dbe1);
}
.rp-pillar-ic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 9px;
  background: var(--semantics-surfaces-tinted-background-color, #eef1f5);
  flex: 0 0 auto;
}
.rp-pillar-ic nldd-icon { width: 1.2rem; height: 1.2rem; opacity: 0.85; }
.rp-pillar-body { min-width: 0; }
.rp-pillar-title { font-weight: 700; margin: 0 0 0.25rem; }
.rp-pillar-text { margin: 0 0 0.5rem; font-size: 0.92rem; line-height: 1.4; opacity: 0.85; }
.rp-pillar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-pillar-link:hover { text-decoration: underline; }
.rp-pillar-link nldd-icon { width: 0.85rem; height: 0.85rem; }
.rp-sample-label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 0.5rem;
}
.rp-sample-row {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rp-sample-fields {
  align-items: flex-start;
}
.rp-field {
  flex: 1 1 16rem;
  min-width: 14rem;
  max-width: 22rem;
}
.rp-meta-row {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.rp-meta-label {
  font-size: 0.78rem;
  font-weight: 600;
  opacity: 0.6;
  margin: 0 0 0.2rem;
}
.rp-meta-row code {
  font-family: var(--ro-font-mono, ui-monospace, monospace);
  font-weight: 600;
}
.rp-link {
  color: var(--semantics-actions-primary-default-background-color, #154273);
  text-decoration: none;
  font-weight: 600;
}
.rp-link:hover { text-decoration: underline; }
</style>
