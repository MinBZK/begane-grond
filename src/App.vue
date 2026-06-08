<script setup>
// Application root: the normal app shell plus an optional presentation-mode
// overlay (a slide deck on the left, the live demo driven on the right). The
// presentation composable is initialised here, where router and store first
// exist, and a deep-link (?present=1&slide=N) is restored on boot.
import { onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import AppShell from './components/AppShell.vue';
import PresentationDeck from './presentation/PresentationDeck.vue';
import { usePresentation } from './presentation/usePresentation.js';
import { routeById } from './presentation/routes.js';
import { usePlatformStore } from './stores/index.js';

const router = useRouter();
const store = usePlatformStore();
const p = usePresentation();
p.init(router, store);

// Deep-link restore: ?present=1&slide=12 opens the deck on that slide. An
// optional &tour=<id> picks a tour, or &route=<id> picks a role-route — which
// also restores the persona, so a shared link lands you as the right person.
// Wait for the router to be ready so the initial navigation does not swallow start().
router.isReady().then(() => {
  const q = router.currentRoute.value.query;
  if (q.present) {
    const n = Math.max(1, parseInt(q.slide || '1', 10)) - 1;
    if (q.route) {
      store.setPersona(routeById(String(q.route)).persona);
      p.startRoute(String(q.route), n);
    } else if (q.tour) {
      p.startTour(String(q.tour), n);
    } else {
      p.start(n);
    }
  }
});

// Global stage shortcut: Shift+P starts the presentation from the top.
function onGlobalKey(e) {
  const t = e.target;
  // NLDD form fields are web components, so e.target is the custom element
  // (e.g. <nldd-text-field>), not the inner <input>. Treat those as typing too,
  // otherwise a capital P in any field name (e.g. "Postgres API") fires Shift+P.
  const tag = t?.tagName?.toLowerCase() || '';
  const typing =
    t &&
    (tag === 'input' ||
      tag === 'textarea' ||
      tag === 'select' ||
      t.isContentEditable ||
      tag.startsWith('nldd-'));
  if (typing) return;
  if (e.shiftKey && (e.key === 'P' || e.key === 'p') && !p.active.value) {
    e.preventDefault();
    p.start();
  }
}
onMounted(() => document.addEventListener('keydown', onGlobalKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onGlobalKey));
</script>

<template>
  <AppShell>
    <router-view />
  </AppShell>
  <PresentationDeck v-if="p.active.value" />
</template>
