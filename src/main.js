// NLDD design system: registers all nldd-* custom elements + ships the design
// tokens / global styles. Import order mirrors ~/regelrecht/frontend/src/main.js.
import '@nldd/design-system';
import '@nldd/design-system/styles';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.js';
import './styles/app.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
