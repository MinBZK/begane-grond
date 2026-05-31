import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// NLDD ships as Lit web components (custom elements). Vue must not try to
// resolve `nldd-*` tags as Vue components, hence isCustomElement. The
// spa-fallback middleware rewrites client-routed paths to index.html so a
// deep link like /fysiek/racks/r12 served by the dev server still boots the
// SPA (mirrors ~/regelrecht/frontend/vite.config.js).
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('nldd-'),
        },
      },
    }),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          const url = req.url.split('?')[0];
          if (url !== '/' && !url.includes('.') && !url.startsWith('/@') && !url.startsWith('/node_modules') && !url.startsWith('/src')) {
            req.url = '/index.html';
          }
          next();
        });
      },
    },
  ],
  build: {
    cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari18'],
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
