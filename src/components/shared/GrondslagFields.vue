<script setup>
// The reusable wizard input for an artefact's legal basis. Answers the three
// questions in RegelRecht terms: pick the wet, pick the article (its
// legal_character shown as confirmation of the nature), optionally lid/zin, and
// the competent authority (defaulted from the law's owning org). The juriconnect
// is built live and the RegelRecht deep-link previewed.
//
// v-model is a grondslag reference: { wetId, article, paragraph, sentence,
// competent_authority }. Empty/partial is allowed; the parent validates.
import { computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import {
  juriconnectFor,
  regelrechtUrl,
  RR_LAW_SLUGS,
  LEGAL_CHARACTERS,
  DECISION_TYPES,
} from '../../lib/grondslag.js';

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
});
const emit = defineEmits(['update:modelValue']);

const store = usePlatformStore();
const g = computed(() => props.modelValue || {});

function patch(p) {
  emit('update:modelValue', { ...g.value, ...p });
}

const wet = computed(() => (g.value.wetId ? store.wetById(g.value.wetId) : null));
const articles = computed(() => wet.value?.articles || []);
const article = computed(() =>
  articles.value.find((a) => String(a.number) === String(g.value.article)) || null,
);

// The default competent authority follows the law's owning team -> org.
const defaultAuthority = computed(() => {
  if (!wet.value?.owner) return null;
  const team = store.teamById(wet.value.owner);
  const org = team?.org ? store.orgById(team.org) : null;
  return org ? { name: org.name, type: 'INSTANCE', orgId: org.id } : null;
});

// Live juriconnect + RegelRecht deep-link preview.
const bwbId = computed(() => wet.value?.bwbId || null);
const juriconnect = computed(() =>
  juriconnectFor({ bwb_id: bwbId.value, article: g.value.article, paragraph: g.value.paragraph, sentence: g.value.sentence }),
);
const lawId = computed(() => (g.value.wetId ? RR_LAW_SLUGS[g.value.wetId] : null));
const rrUrl = computed(() => regelrechtUrl({ lawId: lawId.value, article: g.value.article }));

function pickWet(e) {
  const wetId = e.target.value;
  // Reset article + authority to the new law's defaults.
  const team = store.teamById(store.wetById(wetId)?.owner);
  const org = team?.org ? store.orgById(team.org) : null;
  patch({
    wetId,
    article: '',
    competent_authority: org ? { name: org.name, type: 'INSTANCE', orgId: org.id } : g.value.competent_authority,
  });
}

const producesLabel = computed(() => {
  if (!article.value) return '';
  const lc = article.value.legalCharacter ? LEGAL_CHARACTERS[article.value.legalCharacter] || article.value.legalCharacter : '';
  const dt = article.value.decisionType ? DECISION_TYPES[article.value.decisionType] || article.value.decisionType : '';
  return [lc, dt].filter(Boolean).join(' · ');
});
</script>

<template>
  <div class="rp-gf">
    <nldd-form-field label="Wet (de wettelijke taak)">
      <nldd-dropdown>
        <select :value="g.wetId || ''" @change="pickWet">
          <option value="">— Kies een wet —</option>
          <option v-for="w in store.wetten" :key="w.id" :value="w.id">{{ w.name }}</option>
        </select>
      </nldd-dropdown>
    </nldd-form-field>

    <template v-if="wet">
      <nldd-spacer size="12" />
      <div class="rp-gf-two">
        <nldd-form-field label="Artikel (de vindplaats)">
          <nldd-dropdown>
            <select :value="g.article || ''" @change="(e) => patch({ article: e.target.value })">
              <option value="">— Kies een artikel —</option>
              <option v-for="a in articles" :key="a.number" :value="a.number">
                Artikel {{ a.number }} — {{ a.title }}
              </option>
            </select>
          </nldd-dropdown>
        </nldd-form-field>
        <nldd-form-field label="Lid (optioneel)">
          <nldd-text-field
            placeholder="bijv. 1"
            :value="g.paragraph || ''"
            @input="(e) => patch({ paragraph: e.target.value })"
          ></nldd-text-field>
        </nldd-form-field>
      </div>

      <template v-if="article && producesLabel">
        <nldd-spacer size="8" />
        <p class="rp-gf-produces">
          <nldd-icon name="certificate" aria-hidden="true"></nldd-icon>
          Aard van de handeling: <strong>{{ producesLabel }}</strong>
        </p>
      </template>

      <nldd-spacer size="12" />
      <nldd-form-field label="Bevoegd gezag">
        <nldd-text-field
          :placeholder="defaultAuthority?.name || 'Bevoegd bestuursorgaan'"
          :value="g.competent_authority?.name || defaultAuthority?.name || ''"
          @input="(e) => patch({ competent_authority: { name: e.target.value, type: 'INSTANCE', orgId: defaultAuthority?.orgId } })"
        ></nldd-text-field>
      </nldd-form-field>

      <template v-if="juriconnect">
        <nldd-spacer size="12" />
        <div class="rp-gf-jci">
          <span class="rp-gf-jci-label">Juriconnect</span>
          <code>{{ juriconnect }}</code>
          <a v-if="rrUrl" :href="rrUrl" target="_blank" rel="noopener" class="rp-gf-rr">
            RegelRecht <nldd-icon name="external-link" aria-hidden="true"></nldd-icon>
          </a>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>
.rp-gf { display: block; }
.rp-gf-two { display: grid; grid-template-columns: 3fr 1fr; gap: 0.75rem; }
.rp-gf-produces {
  display: flex; align-items: center; gap: 0.4rem;
  font-size: 0.88rem; margin: 0; opacity: 0.85;
}
.rp-gf-produces nldd-icon { width: 1rem; height: 1rem; opacity: 0.7; }
.rp-gf-jci {
  display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
  padding: 0.6rem 0.75rem; border-radius: 8px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-gf-jci-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.55; font-weight: 600; }
.rp-gf-jci code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.82rem; flex: 1 1 auto; }
.rp-gf-rr {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.82rem; text-decoration: none; font-weight: 600;
  color: var(--semantics-actions-primary-default-background-color);
}
.rp-gf-rr nldd-icon { width: 0.85rem; height: 0.85rem; }
</style>
