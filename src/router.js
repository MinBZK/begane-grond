import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './nav.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes,
    // Anything unknown falls back to the overview dashboard.
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const base = 'Rijksplatform';
  document.title = to.meta?.title ? `${to.meta.title} · ${base}` : base;
});

export default router;
