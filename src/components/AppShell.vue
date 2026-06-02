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
  const order = ['H', 'A', 'B', 'C', 'D'];
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
  try { localStorage.setItem('rp-theme', t); } catch (e) {}
  applyTheme();
}

// --- Command palette ---
const paletteOpen = ref(false);
const query = ref('');
const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  const items = commandItems();
  if (!q) return items.slice(0, 12);
  return items
    .filter((i) => i.label.toLowerCase().includes(q) || (i.hint || '').toLowerCase().includes(q))
    .slice(0, 20);
});
function openPalette() {
  paletteOpen.value = true;
  query.value = '';
  requestAnimationFrame(() => {
    const el = document.getElementById('rp-palette-input');
    el?.focus?.();
  });
}
function closePalette() {
  paletteOpen.value = false;
}
function go(item) {
  closePalette();
  if (item.to) router.push(item.to);
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
  } catch (e) {}
  applyTheme();
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
          <nldd-menu-bar-item :text="store.currentPerson?.name || 'Anne Schuth'" icon="person-circle" href="/zelf"></nldd-menu-bar-item>
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
          <button type="button" class="rp-present-link" @click="presentation.start(0)">
            <nldd-icon name="caret-right" aria-hidden="true"></nldd-icon>
            Presentatie starten
            <span class="rp-present-hint">Shift + P</span>
          </button>
        </div>
      </nldd-page-footer>
    </div>
  </nldd-page>

  <!-- Command palette -->
  <nldd-window
    v-if="paletteOpen"
    accessible-label="Snel navigeren"
    centered
    top="12vh"
    width="min(42rem, 92vw)"
    @click.self="closePalette"
  >
    <nldd-container padding="16">
      <nldd-search-field
        id="rp-palette-input"
        placeholder="Ga naar… (datacenter, dienst, team, actie)"
        accessible-label="Zoeken"
        :value="query"
        @input="(e) => (query = e.target.value)"
      ></nldd-search-field>
    </nldd-container>
    <nldd-container padding="16" padding-top="0">
      <nldd-list role="listbox" aria-label="Resultaten">
        <nldd-list-item
          v-for="item in results"
          :key="item.to + item.label"
          role="option"
          @click="go(item)"
        >
          <nldd-icon-cell :icon="item.icon || 'arrow-right'"></nldd-icon-cell>
          <nldd-spacer-cell size="12" />
          <nldd-cell width="full">
            <nldd-text-cell :text="item.label"></nldd-text-cell>
            <nldd-description-cell v-if="item.hint" :text="item.hint"></nldd-description-cell>
          </nldd-cell>
        </nldd-list-item>
      </nldd-list>
    </nldd-container>
  </nldd-window>

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
.rp-bell-alert::after {
  content: '';
  position: absolute;
  top: 0.5rem;
  right: 0.4rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--semantics-feedback-critical-color, #d52b1e);
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
  background: var(--semantics-surfaces-background-color, #fff);
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
  color: var(--semantics-text-subtle-color, #5a6573);
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
}
.rp-present-link:hover {
  color: var(--semantics-actions-primary-default-background-color, #154273);
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
