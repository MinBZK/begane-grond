<script setup>
// RFC register. The store holds the architecture/policy RFCs (id, title,
// status). We render them as a list with a StatusBadge, plus a small RFC flow
// diagram (concept -> in beoordeling -> geaccepteerd) so the lifecycle is
// tangible. A new RFC can be drafted inline (lands in the store as 'concept')
// and reviewers can advance an RFC to the next stage; both mutate live and are
// written to the audit-log, which keeps governance and traceability connected.
import { ref, computed } from 'vue';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import MetricCard from '../../components/shared/MetricCard.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();

// The canonical RFC lifecycle. 'verworpen' is a terminal off-ramp from review.
const FLOW = [
  { status: 'concept', label: 'Concept', icon: 'pencil', desc: 'Auteur werkt het voorstel uit.' },
  { status: 'in beoordeling', label: 'In beoordeling', icon: 'eye', desc: 'Architectuurboard beoordeelt.' },
  { status: 'geaccepteerd', label: 'Geaccepteerd', icon: 'check-mark-circle', desc: 'Vastgesteld beleid.' },
];
const ORDER = ['concept', 'in beoordeling', 'geaccepteerd'];
const NEXT = {
  concept: 'in beoordeling',
  'in beoordeling': 'geaccepteerd',
};

// A lifecycle stage is "reached" if it is at or before the RFC's current stage.
function stageReached(current, stage) {
  const ci = ORDER.indexOf(current);
  const si = ORDER.indexOf(stage);
  if (ci === -1) return false; // e.g. 'verworpen'
  return si <= ci;
}

const stageCount = (status) => store.rfcs.filter((r) => r.status === status).length;

const rfcsSorted = computed(() => {
  const order = { 'in beoordeling': 0, concept: 1, geaccepteerd: 2, verworpen: 3 };
  return [...store.rfcs].sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));
});

// --- Inline "nieuwe RFC" drafting ---
const draftOpen = ref(false);
const draftTitle = ref('');
const lastCreatedId = ref('');

function openDraft() {
  draftOpen.value = true;
  draftTitle.value = '';
}
function submitDraft() {
  const title = draftTitle.value.trim();
  if (!title) return;
  const id = `rfc-${String(store.rfcs.length + 12).padStart(3, '0')}`;
  store.rfcs.push({ id, title, status: 'concept' });
  store.audit('RFC opgesteld', `${id} ${title}`);
  lastCreatedId.value = id;
  draftOpen.value = false;
}

// Advance an RFC one stage along the lifecycle and audit the transition.
function advance(rfc) {
  const next = NEXT[rfc.status];
  if (!next) return;
  rfc.status = next;
  store.audit('RFC-status gewijzigd', `${rfc.id} → ${next}`);
}
function nextLabel(rfc) {
  const next = NEXT[rfc.status];
  if (next === 'in beoordeling') return 'Indienen ter beoordeling';
  if (next === 'geaccepteerd') return 'Accepteren';
  return '';
}

const crumbs = [
  { text: 'Platform', href: '/' },
  { text: 'Governance', href: '/governance' },
  { text: "RFC's", href: '/governance/rfcs' },
];
</script>

<template>
  <div class="rp-page">
    <PageHeader
      title="RFC's"
      lede="Requests for Comments leggen architectuur- en beleidsbeslissingen vast. Een RFC doorloopt concept, beoordeling en acceptatie. Geaccepteerde RFC's worden Rijksbreed beleid."
      :crumbs="crumbs"
    >
      <template #actions>
        <nldd-button-group orientation="horizontal">
          <router-link to="/governance">
            <nldd-button variant="secondary" text="Beleids-gates" start-icon="shield-check-mark"></nldd-button>
          </router-link>
          <nldd-button variant="primary" text="Nieuwe RFC" start-icon="plus" @click="openDraft"></nldd-button>
        </nldd-button-group>
      </template>
    </PageHeader>

    <nldd-container layout="grid" column-count="3" gap="16">
      <MetricCard :value="stageCount('concept')" label="Concept" sub="in voorbereiding" icon="pencil" />
      <MetricCard :value="stageCount('in beoordeling')" label="In beoordeling" sub="bij de board" icon="eye" />
      <MetricCard :value="stageCount('geaccepteerd')" label="Geaccepteerd" sub="vastgesteld beleid" icon="check-mark-circle" />
    </nldd-container>

    <nldd-spacer size="24" />

    <!-- RFC lifecycle flow diagram. -->
    <nldd-card>
      <nldd-container padding="24">
        <nldd-title size="4"><h2>De RFC-stroom</h2></nldd-title>
        <nldd-spacer size="20" />
        <div class="rp-flow">
          <template v-for="(stage, i) in FLOW" :key="stage.status">
            <div class="rp-flow-node">
              <div class="rp-flow-disc">
                <nldd-icon :name="stage.icon" aria-hidden="true"></nldd-icon>
              </div>
              <div class="rp-flow-label">{{ stage.label }}</div>
              <div class="rp-flow-count">{{ stageCount(stage.status) }} RFC's</div>
              <div class="rp-flow-desc">{{ stage.desc }}</div>
            </div>
            <div v-if="i < FLOW.length - 1" class="rp-flow-arrow" aria-hidden="true">
              <nldd-icon name="arrow-right"></nldd-icon>
            </div>
          </template>
        </div>
      </nldd-container>
    </nldd-card>

    <nldd-spacer size="24" />

    <!-- Inline draft form. -->
    <nldd-card v-if="draftOpen">
      <nldd-container padding="24">
        <nldd-title size="5"><h3>Nieuwe RFC opstellen</h3></nldd-title>
        <nldd-spacer size="12" />
        <nldd-form-field label="Titel van het voorstel">
          <nldd-text-field
            :value="draftTitle"
            placeholder="bv. Verplicht SBOM bij elke release"
            @input="(e) => (draftTitle = e.target.value)"
          ></nldd-text-field>
        </nldd-form-field>
        <nldd-spacer size="16" />
        <nldd-button-group orientation="horizontal">
          <nldd-button variant="secondary" text="Annuleren" @click="draftOpen = false"></nldd-button>
          <nldd-button variant="primary" text="Opslaan als concept" start-icon="check-mark" @click="submitDraft"></nldd-button>
        </nldd-button-group>
      </nldd-container>
    </nldd-card>

    <template v-if="lastCreatedId && !draftOpen">
      <nldd-inline-dialog
        title="RFC aangemaakt"
        :supporting-text="`${lastCreatedId} staat nu als concept in het register en in het audit-log.`"
      ></nldd-inline-dialog>
      <CliHint command="bg rfc new --title &quot;...&quot;" />
      <nldd-spacer size="24" />
    </template>

    <!-- RFC list with status and stage-advance action. -->
    <nldd-card>
      <nldd-container padding="20">
        <nldd-title size="4"><h2>Register</h2></nldd-title>
        <nldd-spacer size="16" />
        <div class="rp-rfc-list">
          <div v-for="rfc in rfcsSorted" :key="rfc.id" class="rp-rfc-row">
            <div class="rp-rfc-id">{{ rfc.id }}</div>
            <div class="rp-rfc-main">
              <div class="rp-rfc-title">{{ rfc.title }}</div>
              <div class="rp-rfc-stage">
                <span
                  v-for="stage in FLOW"
                  :key="stage.status"
                  class="rp-rfc-pip"
                  :class="{ 'rp-rfc-pip-on': stageReached(rfc.status, stage.status) }"
                  :title="stage.label"
                ></span>
              </div>
            </div>
            <div class="rp-rfc-status">
              <StatusBadge :status="rfc.status" />
            </div>
            <div class="rp-rfc-action">
              <nldd-button
                v-if="NEXT[rfc.status]"
                variant="secondary"
                size="sm"
                :text="nextLabel(rfc)"
                end-icon="arrow-right"
                @click="advance(rfc)"
              ></nldd-button>
              <nldd-tag v-else color="success" size="md">Vastgesteld</nldd-tag>
            </div>
          </div>
        </div>
      </nldd-container>
    </nldd-card>
  </div>
</template>

<style scoped>
.rp-flow {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.rp-flow-node {
  flex: 1;
  min-width: 12rem;
  text-align: center;
  padding: 1rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 12px;
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-flow-disc {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 0.6rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--semantics-actions-primary-default-background-color);
  color: white;
}
.rp-flow-disc nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
}
.rp-flow-label {
  font-weight: 700;
}
.rp-flow-count {
  font-size: 0.85rem;
  opacity: 0.7;
  margin-top: 0.15rem;
}
.rp-flow-desc {
  font-size: 0.8rem;
  opacity: 0.6;
  margin-top: 0.45rem;
}
.rp-flow-arrow {
  display: flex;
  align-items: center;
  opacity: 0.4;
}
.rp-flow-arrow nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
}
.rp-rfc-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.rp-rfc-row {
  display: grid;
  grid-template-columns: 6rem 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 10px;
}
.rp-rfc-row:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-rfc-id {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-rfc-title {
  font-weight: 600;
}
.rp-rfc-stage {
  display: flex;
  gap: 0.3rem;
  margin-top: 0.4rem;
}
.rp-rfc-pip {
  width: 1.6rem;
  height: 0.35rem;
  border-radius: 999px;
  background: var(--semantics-dividers-color);
}
.rp-rfc-pip-on {
  background: var(--semantics-actions-primary-default-background-color);
}
@media (max-width: 720px) {
  .rp-rfc-row {
    grid-template-columns: 1fr auto;
  }
  .rp-rfc-id {
    display: none;
  }
}
</style>
