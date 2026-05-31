<script setup>
// The application chrome: NLDD page + top navigation bar + a grouped side
// navigation + theme toggle + a command palette (Cmd/Ctrl-K) + a global
// "+ Nieuw" action. Modelled on ~/regelrecht/docs/src/layouts/Base.astro,
// translated from Astro to a Vue SFC. Domain views render in the default slot.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { domains, waveLabels } from '../nav.js';
import { commandItems } from '../lib/commands.js';

const route = useRoute();
const router = useRouter();

// --- Side navigation, grouped by build wave ---
const groups = computed(() => {
  const order = ['A', 'B', 'C', 'D'];
  return order.map((w) => ({
    wave: w,
    label: waveLabels[w],
    domains: domains.filter((d) => d.wave === w),
  }));
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
    <nldd-skip-link slot="header" text="Direct naar de inhoud">
      <nldd-top-navigation-bar
        logo-title="Rijksplatform"
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
          <nldd-menu-bar-item text="+ Nieuw" icon="plus" expandable>
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
          <nldd-menu-bar-item text="Ans Bakker" icon="person-circle" href="/zelf"></nldd-menu-bar-item>
        </nldd-menu-bar>
      </nldd-top-navigation-bar>
    </nldd-skip-link>

    <nldd-container layout="grid" column-count="1" md-column-count="1" class="rp-shell">
      <div class="rp-shell-grid">
        <nav class="rp-sidenav" aria-label="Hoofdnavigatie">
          <template v-for="group in groups" :key="group.wave">
            <p class="rp-sidenav-group">{{ group.label }}</p>
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
        <main class="rp-main rp-min-width-0">
          <slot />
        </main>
      </div>
    </nldd-container>

    <div slot="footer">
      <nldd-page-footer>
        <nldd-page-footer-legal-bar accessible-label="Juridisch">
          <nldd-page-footer-legal-bar-item slot="start" text="Rijksplatform — demo / mock-up" />
          <nldd-page-footer-legal-bar-item slot="end" text="Toegankelijkheid" href="/standaarden" />
        </nldd-page-footer-legal-bar>
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
</template>

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
