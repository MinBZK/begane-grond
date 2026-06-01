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
import { usePlatformStore } from './stores/index.js';

const router = useRouter();
const store = usePlatformStore();
const p = usePresentation();
p.init(router, store);

// Deep-link restore: ?present=1&slide=12 opens the deck on that slide. Wait for
// the router to be ready so the initial navigation does not swallow start().
router.isReady().then(() => {
  const q = router.currentRoute.value.query;
  if (q.present) {
    const n = Math.max(1, parseInt(q.slide || '1', 10)) - 1;
    p.start(n);
  }
});

// Global stage shortcut: Shift+P starts the presentation from the top.
function onGlobalKey(e) {
  const t = e.target;
  const typing =
    t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
  if (typing) return;
  if (e.shiftKey && (e.key === 'P' || e.key === 'p') && !p.active.value) {
    e.preventDefault();
    p.start(0);
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
