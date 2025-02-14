/* eslint-env node */

module.exports = {
  //project: { tsconfigRootDir: __dirname }, /* Parsing error: Cannot read file '....guitar-shop/tsconfig.json'.eslint */
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "htmlacademy/react-typescript",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: 'tsconfig.json' },
  settings: { react: { version: 'detect' } },
  rules: {
    'indent': 'off'
  },
  overrides: [
    {
      files: ['*test*'],
      rules: { '@typescript-eslint/unbound-method': 'off' }
    },
  ],
}
