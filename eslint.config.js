import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import configPrettier from 'eslint-config-prettier';
import globals from 'globals';

// Flat config (ESLint 9). Formatting is owned by Prettier, so configPrettier
// switches off every stylistic rule that would fight it. ESLint here only
// catches correctness problems (undefined vars, unused vars, Vue mistakes).
export default [
  {
    // seed.js is 38k lines of generated data; linting it is pointless and slow.
    ignores: ['dist/**', 'node_modules/**', '.vite/**', 'src/data/seed.js'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  configPrettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {
      // Unused vars are a real smell, but allow intentionally-ignored args
      // prefixed with _ (common in event handlers and Vue render props).
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // The design system uses custom elements (nldd-*); don't flag them.
      'vue/no-undef-components': 'off',
      // Demo data and copy are Dutch; multi-word component names are not a
      // concern for a single-app SPA with page-level components.
      'vue/multi-word-component-names': 'off',
      // Template-rewriting rules are OFF on purpose. Their --fix output (attribute
      // reordering, slot-syntax rewrites) produces a template AST that the Vue 3 +
      // rolldown compiler in this toolchain rejects at build time
      // ("Cannot read properties of undefined (reading 'type')"). ESLint here
      // enforces script-level correctness only; template formatting is left alone.
      // Migrating the deprecated slot syntax is a separate, build-verified change.
      'vue/attributes-order': 'off',
      'vue/no-deprecated-slot-attribute': 'off',
    },
  },
];
