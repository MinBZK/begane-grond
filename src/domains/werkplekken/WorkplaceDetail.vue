<script setup>
// Workplace detail: full posture of a single device plus lifecycle actions
// (re-image, revoke, hand over) and cross-layer links to the assigned person
// and their team. Edits mutate the store live.
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlatformStore } from '../../stores/index.js';
import PageHeader from '../../components/shared/PageHeader.vue';
import StatusBadge from '../../components/shared/StatusBadge.vue';
import RelationLinks from '../../components/shared/RelationLinks.vue';
import CliHint from '../../components/shared/CliHint.vue';

const store = usePlatformStore();
const route = useRoute();
const router = useRouter();

const wp = computed(() => store.workplaces.find((w) => w.id === route.params.id));
const person = computed(() => (wp.value ? store.personById(wp.value.person) : null));
const team = computed(() => (person.value ? store.teamById(person.value.team) : null));
const model = computed(() =>
  wp.value ? store.hardware.find((h) => h.id === wp.value.model) : null,
);
const image = computed(() =>
  wp.value ? store.images.find((i) => i.id === wp.value.image) : null,
);

// Devices on the same image, for the "vergelijkbaar" hint.
const sameImage = computed(() =>
  store.workplaces.filter((w) => wp.value && w.image === wp.value.image && w.id !== wp.value.id),
);

const relationLinks = computed(() => {
  const links = [];
  if (person.value)
    links.push({
      text: `Medewerker: ${person.value.name}`,
      to: `/teams/mensen/${person.value.id}`,
      icon: 'person',
    });
  if (team.value)
    links.push({ text: `Team: ${team.value.name}`, to: `/teams/${team.value.id}`, icon: 'person-2' });
  links.push({ text: 'Hardware-catalogus', to: '/werkplekken/hardware', icon: 'rectangle-stack' });
  return links;
});

// --- Lifecycle actions (mutate store live) ---
const toast = ref('');
function flash(msg) {
  toast.value = msg;
  setTimeout(() => (toast.value = ''), 3500);
}

function reimage() {
  if (!wp.value) return;
  wp.value.updated = true;
  wp.value.status = 'provisioning';
  wp.value.lastSeen = 'zojuist';
  store.audit('werkplek opnieuw geïmaged', wp.value.id);
  store.runStatusChain(wp.value, ['in gebruik']);
  flash('Her-imagen gestart. Het toestel wordt opnieuw uitgerold.');
}

const handoverOpen = ref(false);
const handoverTo = ref('');
function handover() {
  if (!wp.value || !handoverTo.value) return;
  const target = store.personById(handoverTo.value)?.name;
  wp.value.person = handoverTo.value;
  wp.value.status = 'provisioning';
  wp.value.updated = false;
  store.audit('werkplek overgedragen', `${wp.value.id} → ${handoverTo.value}`);
  store.runStatusChain(wp.value, ['in gebruik']);
  handoverOpen.value = false;
  flash(`Werkplek overgedragen aan ${target}.`);
}

function revoke() {
  if (!wp.value) return;
  store.audit('werkplek ingetrokken', wp.value.id);
  store.workplaces = store.workplaces.filter((w) => w.id !== wp.value.id);
  router.push('/werkplekken');
}

const otherPeople = computed(() =>
  store.people.filter((p) => !wp.value || p.id !== wp.value.person),
);
</script>

<template>
  <div v-if="!wp" class="rp-page">
    <PageHeader title="Werkplek niet gevonden" lede="Deze werkplek bestaat niet (meer)." />
    <nldd-button variant="primary" text="Terug naar vloot" start-icon="arrow-right" @click="router.push('/werkplekken')"></nldd-button>
  </div>

  <div v-else class="rp-page">
    <PageHeader
      :title="person?.name ? `Werkplek van ${person.name}` : wp.id"
      :lede="`${model?.name || wp.model} · image ${image?.name || wp.image}`"
      :crumbs="[
        { text: 'Rijksplatform', href: '/' },
        { text: 'Werkplekken', href: '/werkplekken' },
        { text: wp.id, href: `/werkplekken/${wp.id}` },
      ]"
    >
      <template #actions>
        <StatusBadge :status="wp.status" />
      </template>
    </PageHeader>

    <nldd-inline-dialog
      v-if="toast"
      title="Gelukt"
      :supporting-text="toast"
    ></nldd-inline-dialog>
    <nldd-spacer v-if="toast" size="16" />

    <nldd-container layout="grid" column-count="3" gap="16">
      <!-- Main: device card -->
      <div class="rp-col-2">
        <nldd-card>
          <nldd-container padding="24">
            <div class="rp-detail-head">
              <div class="rp-detail-avatar">{{ person?.avatar || '??' }}</div>
              <div>
                <nldd-title size="4"><h2>{{ person?.name || 'Niet toegewezen' }}</h2></nldd-title>
                <span class="rp-detail-sub">{{ person?.role }} · {{ team?.name }}</span>
              </div>
            </div>

            <nldd-spacer size="20" />

            <dl class="rp-detail-grid">
              <div><dt>Werkplek-ID</dt><dd class="rp-mono">{{ wp.id }}</dd></div>
              <div><dt>Status</dt><dd><StatusBadge :status="wp.status" /></dd></div>
              <div><dt>Model</dt><dd>{{ model?.name || wp.model }}</dd></div>
              <div><dt>Image</dt><dd>{{ image?.name || wp.image }}</dd></div>
              <div v-if="model"><dt>CPU</dt><dd>{{ model.cpu }}</dd></div>
              <div v-if="model"><dt>Geheugen</dt><dd>{{ model.ram }}</dd></div>
              <div v-if="model"><dt>Opslag</dt><dd>{{ model.storage }}</dd></div>
              <div><dt>Laatste check-in</dt><dd>{{ wp.lastSeen }}</dd></div>
            </dl>

            <nldd-spacer size="20" />

            <div class="rp-detail-compliance">
              <span class="rp-compliance-title">Naleving</span>
              <div class="rp-compliance-badges">
                <nldd-tag :color="wp.encrypted ? 'success' : 'critical'" size="md">
                  <nldd-icon name="lock-closed" aria-hidden="true"></nldd-icon>
                  {{ wp.encrypted ? 'Versleuteld' : 'Niet versleuteld' }}
                </nldd-tag>
                <nldd-tag :color="wp.updated ? 'success' : 'warning'" size="md">
                  <nldd-icon name="shield-check-mark" aria-hidden="true"></nldd-icon>
                  {{ wp.updated ? 'Up-to-date' : 'Update nodig' }}
                </nldd-tag>
                <nldd-tag color="success" size="md">
                  <nldd-icon name="check-mark-circle" aria-hidden="true"></nldd-icon>
                  MDM-beheerd
                </nldd-tag>
              </div>
            </div>
          </nldd-container>
        </nldd-card>

        <nldd-spacer size="16" />

        <!-- Lifecycle actions -->
        <nldd-card>
          <nldd-container padding="24">
            <nldd-title size="5"><h3>Levenscyclus</h3></nldd-title>
            <nldd-rich-text>
              <p>Beheer dit toestel: opnieuw uitrollen, overdragen aan een collega of intrekken.</p>
            </nldd-rich-text>
            <nldd-spacer size="16" />

            <div class="rp-actions">
              <button type="button" class="rp-action" @click="reimage">
                <nldd-icon name="arrow-up-arrow-down" aria-hidden="true"></nldd-icon>
                <span>
                  <strong>Her-imagen</strong>
                  <span class="rp-detail-sub">Schone image opnieuw uitrollen</span>
                </span>
              </button>

              <button type="button" class="rp-action" @click="handoverOpen = !handoverOpen">
                <nldd-icon name="person-2" aria-hidden="true"></nldd-icon>
                <span>
                  <strong>Overdragen</strong>
                  <span class="rp-detail-sub">Toewijzen aan een andere medewerker</span>
                </span>
              </button>

              <button type="button" class="rp-action rp-action-danger" @click="revoke">
                <nldd-icon name="dismiss" aria-hidden="true"></nldd-icon>
                <span>
                  <strong>Intrekken</strong>
                  <span class="rp-detail-sub">Op afstand wissen en uit beheer halen</span>
                </span>
              </button>
            </div>

            <div v-if="handoverOpen" class="rp-handover">
              <nldd-spacer size="16" />
              <nldd-form-field label="Overdragen aan">
                <nldd-dropdown>
                  <select v-model="handoverTo">
                    <option value="" disabled>Kies een medewerker…</option>
                    <option v-for="p in otherPeople" :key="p.id" :value="p.id">
                      {{ p.name }} — {{ store.teamById(p.team)?.name }}
                    </option>
                  </select>
                </nldd-dropdown>
              </nldd-form-field>
              <nldd-spacer size="12" />
              <nldd-button
                variant="primary"
                text="Overdracht bevestigen"
                start-icon="check-mark"
                :disabled="!handoverTo || undefined"
                @click="handover"
              ></nldd-button>
            </div>

            <CliHint :command="`rp werkplek reimage ${wp.id}\\nrp werkplek transfer ${wp.id} --to <person>\\nrp werkplek revoke ${wp.id}`" />
          </nldd-container>
        </nldd-card>
      </div>

      <!-- Side: relations + context -->
      <div>
        <RelationLinks title="Gerelateerd" :links="relationLinks" />

        <nldd-spacer size="16" />

        <nldd-card>
          <nldd-container padding="20">
            <nldd-title size="5"><h3>Image-context</h3></nldd-title>
            <nldd-spacer size="12" />
            <nldd-rich-text v-if="image">
              <p>
                <strong>{{ image.name }}</strong><br />
                {{ image.base }} — {{ image.desc }}
              </p>
            </nldd-rich-text>
            <nldd-spacer size="8" />
            <p class="rp-detail-sub">
              {{ sameImage.length }} ander{{ sameImage.length === 1 ? '' : 'e' }} toestel{{ sameImage.length === 1 ? '' : 'len' }} draait dezelfde image.
            </p>
          </nldd-container>
        </nldd-card>
      </div>
    </nldd-container>
  </div>
</template>

<style scoped>
.rp-col-2 {
  grid-column: span 2;
}
.rp-mono {
  font-family: ui-monospace, monospace;
}
.rp-detail-head {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.rp-detail-avatar {
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  background: var(--semantics-actions-primary-default-background-color, #154273);
}
.rp-detail-sub {
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.85rem 1.5rem;
  margin: 0;
}
.rp-detail-grid dt {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-detail-grid dd {
  margin: 0.15rem 0 0;
  font-weight: 600;
}
.rp-detail-compliance {
  padding-top: 1rem;
  border-top: 1px solid var(--semantics-dividers-color);
}
.rp-compliance-title {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.6;
}
.rp-compliance-badges {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
.rp-compliance-badges nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
  vertical-align: -1px;
}
.rp-actions {
  display: grid;
  gap: 0.6rem;
}
.rp-action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1.5px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.rp-action:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-action span {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.rp-action nldd-icon {
  width: 1.3rem;
  height: 1.3rem;
  flex: 0 0 auto;
  opacity: 0.7;
}
.rp-action-danger:hover {
  border-color: var(--nldd-color-critical, #b3261e);
}
.rp-action-danger nldd-icon {
  color: var(--nldd-color-critical, #b3261e);
  opacity: 1;
}
</style>
