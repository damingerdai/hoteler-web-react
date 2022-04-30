module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: '18'
    }
  },
  plugins: ['react', 'prettier'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': ['error', 'prefer-single'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          'src/setupTests.ts',
          'src/setupProxy.js'
        ]
      }
    ],
    'import/prefer-default-export': ['off'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function', 'function-expression']
      }
    ],
    'react/require-default-props': ['off'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-param-reassign': ['error', { props: false }]
  }
};
