<script setup>
// The legality chain (bevoegdheidsketen). The government may do nothing unless a
// law allows it; this screen makes that chain visible where it was implicit:
//
//   wetsartikel (juriconnect + legal_character) → bevoegd gezag
//     → de artefacten die zich erop beroepen → de handelingen (commits) eronder.
//
// It references RegelRecht (the source of truth) rather than copying it: every
// row links out to regelrecht.rijks.app for the machine-readable law.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import NerdsBadge from '../../components/shared/NerdsBadge.vue';
import { readGrondslag, produceFor, describeProduces, competentAuthorityName, regelrechtUrl, RR_LAW_SLUGS } from '../../lib/grondslag.js';

const store = usePlatformStore();

// Group every artefact-with-grondslag by the wet it cites, so each wet becomes a
// chain: authority → artefacten → handelingen.
const chains = computed(() => {
  const byWet = new Map();
  for (const a of store.artefactenMetGrondslag) {
    const key = a.grondslag.wetId || a.grondslag.bwb_id;
    if (!key) continue;
    if (!byWet.has(key)) byWet.set(key, { grondslag: a.grondslag, artefacten: [] });
    byWet.get(key).artefacten.push(a);
  }
  return [...byWet.values()].map((c) => {
    const produces = produceFor(store, c.grondslag);
    const authority = competentAuthorityName(store, c.grondslag.competent_authority);
    // Handelingen (commits) whose legal basis cites the same wet.
    const handelingen = store.commitsMetGrondslag.filter(
      (cm) => cm.legalBasis.wetId === c.grondslag.wetId || cm.legalBasis.bwb_id === c.grondslag.bwb_id,
    );
    return { ...c, produces, producesLabel: describeProduces(produces), authority, handelingen };
  });
});

const stats = computed(() => ({
  wetten: chains.value.length,
  artefacten: chains.value.reduce((n, c) => n + c.artefacten.length, 0),
  metRr: chains.value.filter((c) => c.grondslag.rrUrl).length,
  handelingen: store.commitsMetGrondslag.length,
}));
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="Bevoegdheidsketen"
      lede="De overheid mag een handeling alleen verrichten als een wet die toestaat. Hier zie je de keten die anders impliciet blijft: van wetsartikel naar bevoegd gezag naar de artefacten en handelingen die zich erop beroepen. De wet zelf staat in RegelRecht; wij verwijzen ernaar."
      :crumbs="[{ text: 'Governance', href: '/governance' }, { text: 'Bevoegdheidsketen', href: '/governance/bevoegdheid' }]"
    />

    <NerdsBadge richtlijn="open-standaarden" />
    <nldd-spacer size="20" />

    <nldd-container layout="grid" column-count="4" md-column-count="2" sm-column-count="1" gap="16">
      <MetricCard :value="stats.wetten" label="Wetten als grondslag" sub="aangehaald door artefacten" icon="certificate" />
      <MetricCard :value="stats.artefacten" label="Artefacten met grondslag" sub="koppelvlakken, verwerkingen, …" icon="link" />
      <MetricCard :value="stats.handelingen" label="Handelingen met grondslag" sub="commits met juriconnect" icon="chevron-left-forward-slash-chevron-right" to="/governance/audit" />
      <MetricCard :value="`${stats.metRr}/${stats.wetten}`" label="Gekoppeld aan RegelRecht" sub="machine-leesbare bron" icon="external-link" />
    </nldd-container>

    <nldd-spacer size="28" />

    <div v-if="!chains.length" class="rp-empty">
      <p>Nog geen artefacten met een vastgelegde grondslag. Maak een koppelvlak met persoonsgegevens aan om de keten te vullen.</p>
    </div>

    <div v-for="c in chains" :key="c.grondslag.wetId || c.grondslag.bwb_id" class="rp-chain">
      <!-- Wetsartikel (de bron) -->
      <div class="rp-chain-law">
        <div class="rp-chain-law-head">
          <nldd-icon name="certificate" aria-hidden="true"></nldd-icon>
          <router-link v-if="c.grondslag.wetId" :to="`/wetten/${c.grondslag.wetId}`" class="rp-chain-lawname">
            {{ c.grondslag.wetName || c.grondslag.wetId }}
          </router-link>
          <span v-else class="rp-chain-lawname">{{ c.grondslag.wetName || c.grondslag.bwb_id }}</span>
          <nldd-tag v-if="c.producesLabel" color="accent" size="md">{{ c.producesLabel }}</nldd-tag>
        </div>
        <code class="rp-chain-jci">{{ c.grondslag.juriconnect }}</code>
        <a v-if="c.grondslag.rrUrl" :href="c.grondslag.rrUrl" target="_blank" rel="noopener" class="rp-chain-rr">
          RegelRecht <nldd-icon name="external-link" aria-hidden="true"></nldd-icon>
        </a>
      </div>

      <!-- Bevoegd gezag -->
      <div class="rp-chain-step">
        <span class="rp-chain-label">Bevoegd gezag</span>
        <strong>{{ c.authority || 'onbekend' }}</strong>
      </div>

      <!-- Artefacten die zich erop beroepen -->
      <div class="rp-chain-step">
        <span class="rp-chain-label">Beroept zich hierop</span>
        <div class="rp-chain-arts">
          <router-link v-for="a in c.artefacten" :key="a.route + a.name" :to="a.route" class="rp-chain-art">
            <nldd-tag color="neutral" size="md">{{ a.kind }}</nldd-tag>
            <span>{{ a.name }}</span>
          </router-link>
        </div>
      </div>

      <!-- Handelingen (commits) eronder -->
      <div v-if="c.handelingen.length" class="rp-chain-step">
        <span class="rp-chain-label">Handelingen ({{ c.handelingen.length }})</span>
        <ul class="rp-chain-handelingen">
          <li v-for="h in c.handelingen.slice(0, 5)" :key="h.id">
            <code>{{ h.sha }}</code> <span>{{ h.message }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rp-page { display: block; }
.rp-empty { opacity: 0.65; padding: 1.5rem 0.25rem; }
.rp-chain {
  border: 1px solid var(--semantics-dividers-color);
  border-left: 4px solid var(--semantics-actions-primary-default-background-color);
  border-radius: 12px;
  padding: 1.1rem 1.25rem;
  margin-bottom: 1rem;
}
.rp-chain-law-head { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
.rp-chain-law-head > nldd-icon { width: 1.2rem; height: 1.2rem; opacity: 0.75; }
.rp-chain-lawname { font-weight: 700; font-size: 1.05rem; text-decoration: none; color: var(--semantics-actions-primary-default-background-color); }
.rp-chain-lawname:hover { text-decoration: underline; }
.rp-chain-jci { display: inline-block; margin: 0.4rem 0 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.8rem; opacity: 0.7; }
.rp-chain-rr {
  display: inline-flex; align-items: center; gap: 0.3rem; margin-left: 0.75rem;
  font-size: 0.8rem; font-weight: 600; text-decoration: none;
  color: var(--semantics-actions-primary-default-background-color);
}
.rp-chain-rr nldd-icon { width: 0.8rem; height: 0.8rem; }
.rp-chain-step { margin-top: 0.9rem; padding-top: 0.9rem; border-top: 1px dashed var(--semantics-dividers-color); }
.rp-chain-label { display: block; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.55; font-weight: 600; margin-bottom: 0.4rem; }
.rp-chain-arts { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rp-chain-art {
  display: inline-flex; align-items: center; gap: 0.45rem;
  padding: 0.35rem 0.6rem; border-radius: 999px;
  border: 1px solid var(--semantics-dividers-color);
  text-decoration: none; color: inherit; font-size: 0.88rem;
}
.rp-chain-art:hover { border-color: var(--semantics-actions-primary-default-background-color); }
.rp-chain-handelingen { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }
.rp-chain-handelingen li { font-size: 0.85rem; }
.rp-chain-handelingen code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.78rem; opacity: 0.7; margin-right: 0.4rem; }
</style>
