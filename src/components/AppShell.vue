<script setup>
// The application chrome: NLDD page + top navigation bar + a grouped side
// navigation + theme toggle + a command palette (Cmd/Ctrl-K) + a global
// "+ Nieuw" action. Modelled on ~/regelrecht/docs/src/layouts/Base.astro,
// translated from Astro to a Vue SFC. Domain views render in the default slot.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { domains, waveLabels } from '../nav.js';
import { commandItems } from '../lib/commands.js';
import { usePlatformStore } from '../stores/index.js';
import { usePresentation } from '../presentation/usePresentation.js';
import { tours as allTours, toursForPersonas } from '../presentation/tours.js';
import NotificationInbox from './shared/NotificationInbox.vue';

const route = useRoute();
const router = useRouter();
const store = usePlatformStore();
const presentation = usePresentation();

// --- Notification bell ---
const inboxOpen = ref(false);
function toggleInbox() {
  inboxOpen.value = !inboxOpen.value;
}
function closeInbox() {
  inboxOpen.value = false;
}

// --- Side navigation, grouped by build wave ---
const groups = computed(() => {
  // 'H' is the top group (the overviews) and renders without a header label.
  const order = ['H', 'A', 'D', 'G', 'I', 'O', 'R', 'M'];
  return order
    .map((w) => ({
      wave: w,
      label: waveLabels[w] || '',
      domains: domains.filter((d) => d.wave === w),
    }))
    .filter((g) => g.domains.length);
});

const activeDomain = computed(() => route.meta?.domain || 'home');

// --- Theme toggle (system / light / dark) ---
const theme = ref('system');
function prefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
function applyTheme() {
  const dark = theme.value === 'dark' || (theme.value === 'system' && prefersDark());
  const root = document.documentElement;
  root.setAttribute('data-scheme', dark ? 'dark' : 'light');
  root.style.colorScheme = dark ? 'dark' : 'light';
  root.classList.toggle('dark', dark);
}
function setTheme(t) {
  theme.value = t;
  try { localStorage.setItem('rp-theme', t); } catch { /* best-effort: localStorage may be unavailable */ }
  applyTheme();
}

// --- Command palette (omni-search) ---
const paletteOpen = ref(false);
const query = ref('');

// The order groups appear in: navigation first, then the entity types. Anything
// not listed falls to the end in first-seen order.
const GROUP_ORDER = [
  'Domein', 'Tour', 'Actie', 'Pagina',
  'Applicatie', 'Koppelvlak', 'Team', 'Persoon', 'Dataset', 'Datacontract',
  'Basisregistratie', 'Wet', 'Verwerking', 'Algoritme', 'Component', 'Repository',
  'Instance', 'Domein', 'Datacenter', 'Incident', 'Campagne',
];
const PER_GROUP = 6;

// Items tied to the active personas' teams rank first within their group, so a
// search surfaces "your" apps/koppelvlakken before everyone else's.
function personaScore(item) {
  try {
    const myAppIds = new Set(store.myApps.map((a) => `/apps/${a.id}`));
    const myApiTeams = new Set(store.myTeams.map((t) => t.id));
    if (item.to && myAppIds.has(item.to)) return 0;
    if (item.subtitle && [...myApiTeams].some((id) => (item.subtitle || '').includes(store.teamById(id)?.name || '###'))) return 1;
  } catch (e) {}
  return 2;
}

// Grouped, capped, persona-boosted search results. Empty query shows the most
// useful navigation groups (domains + actions); a query searches label,
// subtitle and keywords across everything.
const resultGroups = computed(() => {
  const q = query.value.trim().toLowerCase();
  const items = commandItems();
  const matched = q
    ? items.filter(
        (i) =>
          i.label.toLowerCase().includes(q) ||
          (i.subtitle || '').toLowerCase().includes(q) ||
          (i.keywords || '').toLowerCase().includes(q) ||
          (i.hint || '').toLowerCase().includes(q),
      )
    : items.filter((i) => i.hint === 'Domein' || i.hint === 'Actie');

  // Bucket by hint.
  const buckets = new Map();
  for (const i of matched) {
    const key = i.hint || 'Overig';
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(i);
  }

  const orderOf = (h) => {
    const idx = GROUP_ORDER.indexOf(h);
    return idx === -1 ? GROUP_ORDER.length : idx;
  };
  return [...buckets.entries()]
    .sort((a, b) => orderOf(a[0]) - orderOf(b[0]))
    .map(([hint, list]) => {
      const sorted = q ? [...list].sort((a, b) => personaScore(a) - personaScore(b)) : list;
      return { hint, items: sorted.slice(0, PER_GROUP), more: Math.max(0, sorted.length - PER_GROUP) };
    });
});
const hasResults = computed(() => resultGroups.value.some((g) => g.items.length));
const paletteWindow = ref(null);
function openPalette() {
  paletteOpen.value = true;
  query.value = '';
  // nldd-window does not auto-open on mount; it needs an explicit .show().
  // Defer to a macrotask (not nextTick): the opening click must fully finish
  // first, otherwise the dialog's own backdrop-click handler sees that same
  // click land "outside" the freshly-opened dialog and closes it immediately.
  setTimeout(() => {
    paletteWindow.value?.show?.();
    const el = document.getElementById('rp-palette-input');
    el?.focus?.();
  }, 0);
}
function closePalette() {
  // Drive the dialog's own close so the native <dialog> state stays in sync,
  // then unmount via the reactive flag.
  paletteWindow.value?.hide?.();
  paletteOpen.value = false;
}
function go(item) {
  closePalette();
  if (item.tour) {
    // Route through startTour so a persona-specific tour switches persona first,
    // same as launching it from the tour launcher.
    const tour = allTours.find((t) => t.id === item.tour);
    if (tour) startTour(tour);
  } else if (item.to) {
    router.push(item.to);
  }
}

// --- Persona switcher ---
// Begane Grond is the logged-in side of developer.overheid.nl; the persona
// switcher is the "login". You can be one person, or several at once (e.g. a
// Logius data engineer plus a BZK tech lead), and the personal dashboard and
// inbox aggregate across the set. Persisted so a reload keeps who you are.
const PERSONA_KEY = 'rp-personas';
const activeIds = computed(() => store.activePersonas);
const activePeople = computed(() => store.activePeople);
// People grouped by organisation, for the switcher menu. NLDD first (the home
// org), then the rest alphabetically by short name.
const peopleByOrg = computed(() => {
  const map = new Map();
  for (const p of store.people) {
    const org = p.org || 'overig';
    if (!map.has(org)) map.set(org, []);
    map.get(org).push(p);
  }
  const orgs = [...map.keys()].sort((a, b) => {
    if (a === 'nldd') return -1;
    if (b === 'nldd') return 1;
    return (store.orgById(a)?.short || a).localeCompare(store.orgById(b)?.short || b);
  });
  return orgs.map((org) => ({
    org,
    label: store.orgById(org)?.name || org,
    people: map.get(org),
  }));
});
function isActivePersona(id) {
  return store.activePersonas.includes(id);
}
function persistPersonas() {
  try { localStorage.setItem(PERSONA_KEY, JSON.stringify(store.activePersonas)); } catch (e) {}
}
function pickPersona(id) {
  store.setPersona(id);
  persistPersonas();
}
function togglePersona(id) {
  store.togglePersona(id);
  persistPersonas();
}

// --- Tour launcher ---
// Tours are choosable walks through the platform (the pitch, the engineer's
// path, the compliance walk, the "build a koppelvlak" quest). The launcher
// splits them into "voor jou" (audience matches an active persona) and thematic.
const tourLauncherOpen = ref(false);
function openTourLauncher() {
  tourLauncherOpen.value = true;
}
function closeTourLauncher() {
  tourLauncherOpen.value = false;
}
const personaTours = computed(() => toursForPersonas(store.activePersonas));
const thematicTours = computed(() => {
  const personaIds = new Set(personaTours.value.map((t) => t.id));
  return allTours.filter((t) => !personaIds.has(t.id));
});
// Start a tour. If it is written for a specific persona you are not currently,
// become that persona first, so the quest is genuinely "what if you worked at
// Logius" — the dashboard, inbox and "mine" views all reframe to that person.
function startTour(tour) {
  closeTourLauncher();
  if (Array.isArray(tour.audience) && !tour.audience.some((id) => store.activePersonas.includes(id))) {
    pickPersona(tour.audience[0]);
  }
  presentation.startTour(tour.id, 0);
}

function onKeydown(e) {
  if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
    e.preventDefault();
    paletteOpen.value ? closePalette() : openPalette();
  } else if (e.key === 'Escape' && paletteOpen.value) {
    closePalette();
  }
}

onMounted(() => {
  try {
    const v = localStorage.getItem('rp-theme');
    if (v) theme.value = v;
  } catch { /* best-effort: localStorage may be unavailable */ }
  applyTheme();
  // Restore the active persona set from a previous session.
  try {
    const raw = localStorage.getItem(PERSONA_KEY);
    if (raw) {
      const ids = JSON.parse(raw).filter((id) => store.people.some((p) => p.id === id));
      if (ids.length) {
        store.currentUser = ids[0];
        store.activePersonas = ids;
      }
    }
  } catch (e) {}
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme();
    });
  }
  document.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <nldd-page>
    <nldd-skip-link slot="header" href="#hoofdinhoud" text="Direct naar de inhoud">
      <nldd-top-navigation-bar
        logo-title="Begane Grond"
        logo-subtitle="developer platform voor de Rijksoverheid"
        logo-href="/"
        website-href="/"
      >
        <nldd-menu-bar slot="utility">
          <nldd-menu-bar-item
            text="Zoeken"
            icon="search"
            @click="openPalette"
          ></nldd-menu-bar-item>
          <nldd-menu-bar-item
            :text="store.unreadCount ? `Notificaties (${store.unreadCount})` : 'Notificaties'"
            icon="envelope"
            accessible-label="Notificaties"
            :class="{ 'rp-bell-alert': store.unreadCritical }"
            @click="toggleInbox"
          ></nldd-menu-bar-item>
          <nldd-menu-bar-item text="Nieuw" icon="plus" expandable>
            <nldd-menu>
              <nldd-menu-item text="Nieuwe applicatie" @click="router.push('/apps/nieuw')"></nldd-menu-item>
              <nldd-menu-item text="Dienst afnemen" @click="router.push('/infra')"></nldd-menu-item>
              <nldd-menu-item text="Werkplek uitrollen" @click="router.push('/werkplekken/nieuw')"></nldd-menu-item>
              <nldd-menu-item text="Fleet-campagne" @click="router.push('/fleet/nieuw')"></nldd-menu-item>
            </nldd-menu>
          </nldd-menu-bar-item>
          <nldd-menu-bar-item text="Thema" icon="sun" expandable>
            <nldd-menu>
              <nldd-menu-item text="Systeem" type="radio" :selected="theme === 'system' || undefined" @click="setTheme('system')"></nldd-menu-item>
              <nldd-menu-item text="Licht" type="radio" :selected="theme === 'light' || undefined" @click="setTheme('light')"></nldd-menu-item>
              <nldd-menu-item text="Donker" type="radio" :selected="theme === 'dark' || undefined" @click="setTheme('dark')"></nldd-menu-item>
            </nldd-menu>
          </nldd-menu-bar-item>
          <nldd-menu-bar-item
            :text="activePeople.length > 1 ? `${store.currentPerson?.name?.split(' ')[0]} +${activePeople.length - 1}` : (store.currentPerson?.name || 'Anne Schuth')"
            icon="person-circle"
            expandable
          >
            <nldd-menu>
              <nldd-menu-item text="Mijn overzicht" @click="router.push('/zelf')"></nldd-menu-item>
              <nldd-menu-item text="Doe een tour…" @click="openTourLauncher"></nldd-menu-item>
              <nldd-menu-item v-if="activeIds.length > 1 || activeIds[0] !== 'ans'" text="Terug naar Anne (NLDD)" @click="pickPersona('ans')"></nldd-menu-item>
              <template v-for="grp in peopleByOrg" :key="grp.org">
                <nldd-menu-item :text="grp.label" disabled></nldd-menu-item>
                <nldd-menu-item
                  v-for="p in grp.people"
                  :key="p.id"
                  type="checkbox"
                  :text="`${p.name} · ${p.role}`"
                  :selected="isActivePersona(p.id) || undefined"
                  @click="togglePersona(p.id)"
                ></nldd-menu-item>
              </template>
            </nldd-menu>
          </nldd-menu-bar-item>
        </nldd-menu-bar>
      </nldd-top-navigation-bar>
    </nldd-skip-link>

    <nldd-container layout="grid" column-count="1" md-column-count="1" class="rp-shell">
      <div class="rp-shell-grid">
        <nav class="rp-sidenav" aria-label="Hoofdnavigatie">
          <template v-for="group in groups" :key="group.wave">
            <p v-if="group.label" class="rp-sidenav-group">{{ group.label }}</p>
            <ul>
              <li v-for="d in group.domains" :key="d.key">
                <router-link
                  :to="d.path"
                  :class="{ 'rp-active': activeDomain === d.key }"
                >
                  <nldd-icon :name="d.icon" aria-hidden="true"></nldd-icon>
                  <span>{{ d.label }}</span>
                </router-link>
              </li>
            </ul>
          </template>
        </nav>
        <main id="hoofdinhoud" tabindex="-1" class="rp-main rp-min-width-0">
          <slot />
        </main>
      </div>
    </nldd-container>

    <div slot="footer">
      <nldd-page-footer>
        <nldd-page-footer-legal-bar accessible-label="Juridisch">
          <nldd-page-footer-legal-bar-item slot="start" text="Begane Grond — demo / mock-up" />
          <nldd-page-footer-legal-bar-item slot="end" text="Toegankelijkheid" href="/standaarden" />
        </nldd-page-footer-legal-bar>
        <div class="rp-footer-present">
          <button type="button" class="rp-present-link" @click="openTourLauncher">
            <nldd-icon name="caret-right" aria-hidden="true"></nldd-icon>
            Tour starten
            <span class="rp-present-hint">kies een rondleiding</span>
          </button>
          <button type="button" class="rp-present-link" @click="presentation.start(0)">
            <nldd-icon name="presentation" aria-hidden="true"></nldd-icon>
            Presentatie
            <span class="rp-present-hint">Shift + P</span>
          </button>
        </div>
      </nldd-page-footer>
    </div>
  </nldd-page>

  <!-- Command palette -->
  <nldd-window
    v-if="paletteOpen"
    ref="paletteWindow"
    accessible-label="Snel navigeren"
    centered
    top="12vh"
    width="min(42rem, 92vw)"
    @close="paletteOpen = false"
  >
    <nldd-container padding="16">
      <nldd-search-field
        id="rp-palette-input"
        placeholder="Zoek overal… (app, koppelvlak, wet, register, persoon, incident)"
        accessible-label="Zoeken"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
    </nldd-container>
    <nldd-container padding="16" padding-top="0" class="rp-palette-results">
      <template v-for="group in resultGroups" :key="group.hint">
        <p class="rp-palette-group">{{ group.hint }}</p>
        <nldd-list role="listbox" :aria-label="group.hint">
          <nldd-list-item
            v-for="item in group.items"
            :key="item.to + item.label"
            role="option"
            @click="go(item)"
          >
            <nldd-icon-cell :icon="item.icon || 'arrow-right'"></nldd-icon-cell>
            <nldd-spacer-cell size="12" />
            <nldd-cell width="full">
              <nldd-text-cell :text="item.label"></nldd-text-cell>
              <nldd-description-cell v-if="item.subtitle" :text="item.subtitle"></nldd-description-cell>
            </nldd-cell>
          </nldd-list-item>
        </nldd-list>
        <p v-if="group.more" class="rp-palette-more">+ {{ group.more }} meer · verfijn je zoekopdracht</p>
      </template>
      <p v-if="query && !hasResults" class="rp-palette-empty">Niets gevonden voor "{{ query }}".</p>
    </nldd-container>
  </nldd-window>

  <!-- Tour launcher -->
  <div v-if="tourLauncherOpen" class="rp-tour-backdrop" @click="closeTourLauncher"></div>
  <div v-if="tourLauncherOpen" class="rp-tour-modal" role="dialog" aria-label="Kies een tour">
    <div class="rp-tour-head">
      <nldd-title size="4"><h2>Kies een rondleiding</h2></nldd-title>
      <button type="button" class="rp-tour-close" aria-label="Sluiten" @click="closeTourLauncher">
        <nldd-icon name="dismiss" aria-hidden="true"></nldd-icon>
      </button>
    </div>
    <nldd-rich-text>
      <p>Loop het platform door langs een verhaal: vanuit een persona, of langs een thema.</p>
    </nldd-rich-text>

    <template v-if="personaTours.length">
      <p class="rp-tour-group">Voor jou — {{ store.currentPerson?.name }}</p>
      <div class="rp-tour-grid">
        <button v-for="t in personaTours" :key="t.id" type="button" class="rp-tour-card" @click="startTour(t)">
          <nldd-icon :name="t.icon" aria-hidden="true"></nldd-icon>
          <strong>{{ t.title }}</strong>
          <span>{{ t.lead }}</span>
        </button>
      </div>
    </template>

    <p class="rp-tour-group">Thematische tours</p>
    <div class="rp-tour-grid">
      <button v-for="t in thematicTours" :key="t.id" type="button" class="rp-tour-card" @click="startTour(t)">
        <nldd-icon :name="t.icon" aria-hidden="true"></nldd-icon>
        <strong>{{ t.title }}</strong>
        <span>{{ t.lead }}</span>
      </button>
    </div>
  </div>

  <!-- Notification bell popover -->
  <div v-if="inboxOpen" class="rp-inbox-backdrop" @click="closeInbox"></div>
  <div v-if="inboxOpen" class="rp-inbox-pop" role="dialog" aria-label="Notificaties">
    <div class="rp-inbox-pop-head">
      <nldd-title size="5"><h2>Notificaties</h2></nldd-title>
      <router-link to="/notificaties" @click="closeInbox" class="rp-inbox-pop-all">Beheer</router-link>
    </div>
    <NotificationInbox variant="compact" :limit="12" @navigate="closeInbox" />
  </div>
</template>

<style scoped>
/* Command palette (omni-search) grouped results */
.rp-palette-results {
  max-height: 60vh;
  overflow-y: auto;
}
.rp-palette-group {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.55;
  margin: 0.75rem 0 0.25rem;
  font-weight: 600;
}
.rp-palette-group:first-child {
  margin-top: 0;
}
.rp-palette-more {
  font-size: 0.78rem;
  opacity: 0.55;
  margin: 0.2rem 0 0;
  padding-left: 0.25rem;
}
.rp-palette-empty {
  opacity: 0.6;
  padding: 1rem 0.25rem;
  margin: 0;
}

/* Tour launcher */
.rp-tour-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 70;
}
.rp-tour-modal {
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  width: min(44rem, 92vw);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 71;
  background: var(--semantics-surfaces-default-background-color, #fff);
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}
.rp-tour-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.rp-tour-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: inherit;
}
.rp-tour-close nldd-icon {
  width: 1.2rem;
  height: 1.2rem;
}
.rp-tour-group {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.55;
  font-weight: 600;
  margin: 1.25rem 0 0.5rem;
}
.rp-tour-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
.rp-tour-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--semantics-dividers-color);
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
.rp-tour-card:hover {
  border-color: var(--semantics-actions-primary-default-background-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-tour-card nldd-icon {
  width: 1.4rem;
  height: 1.4rem;
  opacity: 0.8;
}
.rp-tour-card span {
  font-size: 0.85rem;
  opacity: 0.7;
}
.rp-bell-alert::after {
  content: '';
  position: absolute;
  top: 0.5rem;
  right: 0.4rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--semantics-feedback-critical-color);
}
.rp-inbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
}
.rp-inbox-pop {
  position: fixed;
  top: 4.2rem;
  right: 1rem;
  z-index: 61;
  width: min(30rem, 94vw);
  max-height: 78vh;
  overflow-y: auto;
  background: var(--semantics-surfaces-background-color);
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 12px;
  box-shadow: 0 8px 28px rgb(0 0 0 / 0.18);
  padding: 1rem 1.1rem 1.1rem;
}
.rp-inbox-pop-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.rp-inbox-pop-all {
  font-size: 0.88rem;
}
.rp-footer-present {
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem 0.25rem;
}
.rp-present-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  font-size: 0.85rem;
  color: var(--semantics-text-subtle-color);
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
}
.rp-present-link:hover {
  color: var(--semantics-actions-primary-default-background-color);
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-present-link nldd-icon {
  width: 0.9rem;
  height: 0.9rem;
}
.rp-present-hint {
  font-family: ui-monospace, monospace;
  font-size: 0.72rem;
  opacity: 0.6;
  border: 1px solid var(--semantics-dividers-color);
  border-radius: 4px;
  padding: 0.05rem 0.35rem;
}
</style>

<style scoped>
.rp-shell {
  width: 100%;
}
.rp-shell-grid {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 0;
  align-items: start;
}
@media (max-width: 1007px) {
  .rp-shell-grid {
    grid-template-columns: 1fr;
  }
  .rp-sidenav {
    display: none;
  }
}
.rp-sidenav {
  position: sticky;
  top: 0;
  align-self: start;
  padding: 1.25rem 0.75rem 2rem;
  border-right: 1px solid var(--semantics-dividers-color);
  min-height: 70vh;
}
.rp-sidenav-group {
  margin: 1rem 0.5rem 0.25rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.6;
}
.rp-sidenav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.rp-sidenav a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  font-size: 0.92rem;
}
.rp-sidenav a:hover {
  background: var(--semantics-surfaces-tinted-background-color);
}
.rp-sidenav a.rp-active {
  background: var(--semantics-surfaces-tinted-background-color);
  font-weight: 700;
}
.rp-sidenav nldd-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex: 0 0 auto;
}
.rp-main {
  padding: 1.5rem 2rem 4rem;
}
@media (max-width: 640px) {
  .rp-main {
    padding: 1rem 1rem 3rem;
  }
}
</style>
