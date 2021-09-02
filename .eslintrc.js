module.exports = {
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    // 'eslint:recommended',
    // 'plugin:react/recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['components', './src/components'],
          ['vo-hooks', './src/hooks/index']
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx', '.json', '.vue', '.d.ts']
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    },
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      flowVersion: '0.53' // Flow version
    }
  },
  rules: {
    'max-len': ['error', 170, 2], // 一行的字符不能超过100
    // "quotes": [2, "single"], // 单引号
    semi: 0, // 不强制使用分号
    'no-trailing-spaces': 1, // 一行结束后面有空格就发出警告
    'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
    'eol-last': 0, // 文件以单一的换行符结束

    // 解决window下换行格式的报错
    'linebreak-style': 'off',
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/media-has-caption': 0,

    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [1],

    'no-unused-vars': 'off', // 不能有声明后未被使用的变量或参数
    '@typescript-eslint/no-unused-vars': ['error'],

    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],

    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    'import/prefer-default-export': 0,
    'func-names': 'off',
    'arrow-body-style': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus': 'off',
    'no-return-assign': 0,
    'no-nested-ternary': 0,
    'global-require': 0,
    'no-async-promise-executor': 0,
    'react/no-array-index-key': 0,
    'no-undef': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off', // 避免循环以支持数组迭代
    'no-param-reassign': 'off' // 禁止对函数参数再赋值
  },
  globals: {
    AWechat: true,
    WeixinJSBridge: true
  }
}
