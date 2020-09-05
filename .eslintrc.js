module.exports = {
  env: {
    es6: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/*.spec.js'],
      env: {
        es6: true,
        node: true,
        mocha: true,
      },
      plugins: ['mocha'],
    },
  ],
};
