<script setup>
// The reusable "on what authority" block. Shows an artefact's legal basis as a
// thin reference into RegelRecht: the cited article (with juriconnect + a
// deep-link to regelrecht.rijks.app), the nature of the handeling
// (legal_character · decision_type), and the competent authority. RegelRecht
// owns the law; this only points at it.
//
// Pass either a raw grondslag (a wet-id string, a structured reference, or a
// record carrying grondslag/wet) — it is normalised here via readGrondslag.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import {
  readGrondslag,
  produceFor,
  describeProduces,
  competentAuthorityName,
  grondslagComplete,
} from '../../lib/grondslag.js';

const props = defineProps({
  // The raw grondslag to render (string wet-id, reference object, or record).
  grondslag: { default: null },
  title: { type: String, default: 'Grondslag' },
  // When true, render the "n.v.t." empty state instead of hiding the block.
  showEmpty: { type: Boolean, default: false },
});

const store = usePlatformStore();
const g = computed(() => readGrondslag(store, props.grondslag));
const produces = computed(() => (g.value ? produceFor(store, g.value) : null));
const producesLabel = computed(() => describeProduces(produces.value));
const authority = computed(() => (g.value ? competentAuthorityName(store, g.value.competent_authority) : null));
const complete = computed(() => grondslagComplete(g.value));
const status = computed(() => {
  if (!g.value || (!g.value.wetId && !g.value.bwb_id)) return { label: 'geen grondslag', color: 'critical' };
  return complete.value ? { label: 'compleet', color: 'success' } : { label: 'onvolledig', color: 'warning' };
});
</script>

<template>
  <nldd-card v-if="g || showEmpty" accessible-label="Grondslag">
    <nldd-container padding="20">
      <div class="rp-g-head">
        <nldd-title size="5"><h3>{{ title }}</h3></nldd-title>
        <nldd-tag :color="status.color" size="md">{{ status.label }}</nldd-tag>
      </div>
      <nldd-spacer size="14" />

      <template v-if="g && (g.wetId || g.bwb_id)">
        <dl class="rp-g-kv">
          <dt>Wettelijke taak</dt>
          <dd>
            <router-link v-if="g.wetId" :to="`/wetten/${g.wetId}`" class="rp-g-link">{{ g.wetName || g.wetId }}</router-link>
            <span v-else>{{ g.wetName || g.bwb_id }}</span>
            <span v-if="g.article" class="rp-g-art"> · artikel {{ g.article }}<template v-if="g.paragraph">, lid {{ g.paragraph }}</template></span>
          </dd>

          <dt v-if="producesLabel">Aard</dt>
          <dd v-if="producesLabel">{{ producesLabel }}</dd>

          <dt>Bevoegd gezag</dt>
          <dd>
            <router-link v-if="g.competent_authority?.orgId" :to="`/teams/organisatie`" class="rp-g-link">{{ authority }}</router-link>
            <span v-else>{{ authority || '—' }}</span>
            <span v-if="g.competent_authority?.type === 'CATEGORY'" class="rp-g-art"> · per context te bepalen</span>
          </dd>

          <dt>Juriconnect</dt>
          <dd><code class="rp-g-jci">{{ g.juriconnect || '—' }}</code></dd>

          <template v-if="g.avgCategorie">
            <dt>AVG-grondslag</dt>
            <dd>{{ g.avgCategorie }}</dd>
          </template>
        </dl>

        <nldd-spacer size="14" />
        <a v-if="g.rrUrl" :href="g.rrUrl" target="_blank" rel="noopener" class="rp-g-rr">
          <nldd-icon name="external-link" aria-hidden="true"></nldd-icon>
          <span>Bekijk de machine-leesbare wet op RegelRecht</span>
          <nldd-icon name="arrow-right" aria-hidden="true" class="rp-g-rr-arrow"></nldd-icon>
        </a>
        <p v-else class="rp-g-norr">Niet in het RegelRecht-corpus; alleen via juriconnect te citeren.</p>
      </template>

      <nldd-inline-dialog
        v-else
        title="Geen grondslag vastgelegd"
        supporting-text="Deze handeling raakt een burger of recht, maar verwijst nog niet naar een wetsartikel. Leg de grondslag vast."
      ></nldd-inline-dialog>
    </nldd-container>
  </nldd-card>
</template>

<style scoped>
.rp-g-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.rp-g-kv { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem 1rem; margin: 0; }
.rp-g-kv dt { opacity: 0.6; font-size: 0.85rem; }
.rp-g-kv dd { margin: 0; font-weight: 600; }
.rp-g-art { font-weight: 400; opacity: 0.7; }
.rp-g-link { color: var(--semantics-actions-primary-default-background-color); text-decoration: none; font-weight: 600; }
.rp-g-link:hover { text-decoration: underline; }
.rp-g-jci { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.82rem; font-weight: 500; }
.rp-g-rr {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.7rem 0.85rem; border-radius: 10px;
  border: 1px solid var(--semantics-dividers-color);
  background: var(--semantics-surfaces-tinted-background-color);
  text-decoration: none; color: inherit; font-size: 0.9rem;
}
.rp-g-rr:hover { border-color: var(--semantics-actions-primary-default-background-color); }
.rp-g-rr > nldd-icon { width: 1.05rem; height: 1.05rem; opacity: 0.75; }
.rp-g-rr span { flex: 1 1 auto; }
.rp-g-rr-arrow { opacity: 0.4; }
.rp-g-norr { font-size: 0.85rem; opacity: 0.65; margin: 0; }
</style>
