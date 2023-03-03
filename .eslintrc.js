module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  plugins: ['prettier', 'import', 'react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 1,
    'react/forbid-prop-types': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 0,
    'no-plusplus': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'react/jsx-one-expression-per-line': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': ['error', { variables: false }],
    'global-require': 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false,
        },
      },
    ],
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-unsafe-member-access': 1,
    '@typescript-eslint/no-unsafe-call': 1,
  },
  ignorePatterns: ['/*.*'],
};
