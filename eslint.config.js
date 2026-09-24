import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

/**
 * ESLint — CHUNK 01 gap.
 *
 * The tracker required ESLint and Prettier at CHUNK 01; neither was built, which
 * is why CHUNK 01 sat at Review. This closes that gap.
 *
 * Scope is deliberately narrow. This is a small content site, and a linter that
 * fires constantly on style opinions gets switched off. Formatting belongs to
 * Prettier, correctness belongs here.
 */
export default ts.config(
  {
    // Build output, dependencies and Astro's generated types. Linting
    // generated code produces noise nobody can act on.
    ignores: ['dist/**', 'node_modules/**', '.astro/**', '.vercel/**'],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,

  {
    rules: {
      // Unused variables are a real signal, but an underscore prefix is the
      // conventional way to say "deliberately unused".
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // `any` defeats the point of `strict`. Warn rather than error so it can
      // never block a build over a line someone is mid-way through writing.
      '@typescript-eslint/no-explicit-any': 'warn',

      // console.log left in shipped code is almost always an accident.
      // console.warn and console.error are legitimate.
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },

  {
    /**
     * Files under public/ are served straight to the browser — they are not
     * bundled, so they need browser globals declared. Only the handful
     * actually used is listed, so a typo in a global name is still an error.
     */
    files: ['public/**/*.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        matchMedia: 'readonly',
        console: 'readonly',
      },
    },
  },

  {
    // Build-time scripts run in Node and legitimately write to stdout — that
    // is their entire output channel.
    files: ['scripts/**/*.ts', '*.config.{js,mjs,ts}'],
    rules: {
      'no-console': 'off',
    },
  },
);
