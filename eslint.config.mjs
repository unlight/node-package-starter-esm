import 'eslint-plugin-only-warn';

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import unicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';
import wixEditor from 'eslint-plugin-wix-editor';
import { fixupPluginRules } from '@eslint/compat';
import { plugin as ex } from 'eslint-plugin-exception-handling';

export default defineConfig(
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  unicorn.configs.recommended,
  prettier,
  {
    ignores: ['dist/', 'coverage/', '@generated/**'],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'max-lines': [1, { max: 300 }],
      'max-params': [1, { max: 3 }],
      'no-unneeded-ternary': [1],
    },
  },
  {
    plugins: {
      'wix-editor': fixupPluginRules(wixEditor),
    },
    rules: {
      'wix-editor/no-instanceof-array': 1,
      'wix-editor/no-not-not': 1,
      'wix-editor/no-unneeded-match': 1,
      'wix-editor/prefer-filter': 1,
      'wix-editor/prefer-ternary': 1,
      'wix-editor/return-boolean': 1,
      'wix-editor/simplify-boolean-expression': 1,
    },
  },
  {
    rules: {
      'unicorn/prevent-abbreviations': [
        'warn',
        {
          replacements: {
            args: false,
          },
        },
      ],
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-objects': [
        'warn',
        {
          order: 'asc',
          type: 'natural',
        },
      ],
    },
  },
  {
    plugins: { ex },
    rules: {
      'ex/might-throw': 1,
      'ex/no-unhandled': 1,
      'ex/use-error-cause': 1,
    },
  },
  {
    extends: [tseslint.configs.disableTypeChecked],
    files: [
      '*.config.mjs',
      '*.config.mts',
      '.remarkrc.cjs',
      'stryker.conf.mjs',
    ],
  },
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      '@typescript-eslint/camelcase': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      'consistent-return': 0,
      'import/max-dependencies': 0,
      'max-lines': 0,
    },
  },
);
