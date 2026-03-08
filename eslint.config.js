import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginTypeScript from '@typescript-eslint/eslint-plugin';
import parserTypeScript from '@typescript-eslint/parser';
import parserVue from 'vue-eslint-parser';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules', 'dist', '.husky'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        URL: 'readonly',
        Event: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        MouseEvent: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        URL: 'readonly',
        Event: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        MouseEvent: 'readonly',
      },
    },
    plugins: {
      vue: pluginVue,
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      ...pluginVue.configs.recommended.rules,
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
    },
  },
  prettier,
];
