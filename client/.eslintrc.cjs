/**
 * This is our eslint configuration file for the server.
 * Note: If you make a change here, think about if it should be applied in the server config file as well.
 *
 * ESlint is a way to enforce certain code rules to keep the code base consistent.
 * Have a look at our project repo README or https://eslint.org/ for more information
 */

module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  plugins: ['react'],
  rules: {
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-console': 'error',
    'arrow-parens': ['error', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
