import globals from 'globals'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['coverage/', 'dist/'] },
  { languageOptions: { globals: globals.browser } },

  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    rules: {
      '@typescript-eslint/naming-convention': ['error', { selector: 'objectLiteralProperty', format: null }], // camelCase, but ignore object literals
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }], // don't use public access modifier
    },
  },

  stylistic.configs.customize({
    flat: true,
    semi: false,
  }),

  eslintPluginUnicorn.configs['flat/recommended'], // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2546,
  /**
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
   * https://github.com/sindresorhus/meta/discussions/7 "Most programmers I know are dumb" is not a good reason to get rid of nulls.
   */
  { rules: { 'unicorn/no-null': 'off' } },
]
