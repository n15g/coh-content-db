import globals from 'globals'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import stylistic from '@stylistic/eslint-plugin'
import * as tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { ignores: ['dist/'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  stylistic.configs.customize({
    flat: true,
    semi: false,
  }),
  eslintPluginUnicorn.configs['flat/recommended'], // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2546
]
