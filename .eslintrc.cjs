module.exports = {
  extends: [
    `airbnb`,
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
  ],
  plugins: [`@typescript-eslint`, `react`, `react-hooks`, `@emotion`],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    sourceType: `module`,
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [`.js`, `.jsx`, `.ts`, `.tsx`],
      },
    },
  },
  rules: {
    "arrow-parens": [`error`, `as-needed`],
    "comma-dangle": [
      `error`,
      {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
        functions: `only-multiline`,
      },
    ],
    "consistent-return": `off`,
    "curly": [`error`, `multi-line`, `consistent`],
    "function-paren-newline": `off`,
    "implicit-arrow-linebreak": `off`,
    "import/extensions": [
      `error`,
      `ignorePackages`,
      {
        js: `never`,
        jsx: `never`,
        ts: `never`,
        tsx: `never`,
      },
    ],
    "jsx-quotes": [`error`, `prefer-double`],
    "keyword-spacing": [
      `error`,
      {
        overrides: {
          if: { after: true },
          while: { after: true },
          for: { after: true },
          switch: { after: true },
          catch: { after: true },
        },
      },
    ],
    "max-classes-per-file": `off`,
    "max-len": [
      `error`,
      {
        code: 81,
        ignoreRegExpLiterals: true,
      },
    ],
    "no-confusing-arrow": `off`,
    "no-console": `off`,
    "no-continue": `off`,
    "no-else-return": [
      `error`,
      {
        allowElseIf: true,
      },
    ],
    "no-mixed-operators": `off`,
    "no-multi-spaces": [
      `error`,
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          VariableDeclarator: true,
          ImportDeclaration: true,
        },
      },
    ],
    "no-nested-ternary": `off`,
    "no-param-reassign": `off`,
    "no-plusplus": `off`,
    "no-return-assign": `off`,
    "no-shadow": `off`,
    "no-undef-init": `off`,
    "no-underscore-dangle": `off`,
    "no-unused-expressions": [
      `error`,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "no-use-before-define": `off`,
    "nonblock-statement-body-position": `off`,
    "object-curly-newline": [
      `error`,
      {
        consistent: true,
      },
    ],
    "operator-linebreak": [
      `error`,
      `after`,
      { overrides: { "?": `before`, ":": `before` } },
    ],
    "prefer-destructuring": [
      `error`,
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    "quotes": [`error`, `backtick`],
    "quote-props": [`error`, `consistent`, { unnecessary: false }],
    "semi": [`error`, `never`],
    "semi-style": [`error`, `first`],

    // Begin Plugin rules
    // "prettier/prettier": [`error`, { endOfLine: `off` }],
    "@emotion/pkg-renaming": `error`,

    // Begin React rules
    "react/jsx-indent": [
      `error`,
      2,
      { checkAttributes: true, indentLogicalExpressions: true },
    ],
    "react/destructuring-assignment": `off`,
    "react/react-in-jsx-scope": `off`,
    "react/jsx-closing-tag-location": `off`,
    "react/jsx-filename-extension": [
      `error`,
      {
        extensions: [`.js`, `.jsx`, `.tsx`],
      },
    ],
    "react/jsx-curly-newline": `off`,
    "react/jsx-one-expression-per-line": `off`,
    "react/jsx-props-no-spreading": `off`,
    "react/jsx-uses-react": `off`,
    "react/jsx-uses-vars": `error`,
    "react/jsx-wrap-multilines": `off`,
    "react/no-array-index-key": `off`,
    "react/no-danger": `off`,
    "react/no-multi-comp": `off`,
    "react/prefer-stateless-function": `off`,
    "react/prop-types": `off`,
    "react/require-default-props": `off`,
    "react/state-in-constructor": `off`,
    "react/static-property-placement": `off`,
    "react/default-props-match-prop-types": `off`,
    "react/no-unescaped-entities": [`error`, { forbid: [`>`] }],
    "react/sort-comp": [
      `error`,
      {
        order: [
          `static-variables`,
          `static-methods`,
          `lifecycle`,
          `everything-else`,
          `render`,
        ],
      },
    ],

    "jsx-a11y/accessible-emoji": `off`,
    "jsx-a11y/alt-text": `off`,
    "jsx-a11y/anchor-has-content": `off`,
    "jsx-a11y/anchor-is-valid": `off`,
    "jsx-a11y/aria-activedescendant-has-tabindex": `off`,
    "jsx-a11y/aria-props": `off`,
    "jsx-a11y/aria-proptypes": `off`,
    "jsx-a11y/aria-role": `off`,
    "jsx-a11y/aria-unsupported-elements": `off`,
    "jsx-a11y/click-events-have-key-events": `off`,
    "jsx-a11y/heading-has-content": `off`,
    "jsx-a11y/html-has-lang": `off`,
    "jsx-a11y/iframe-has-title": `off`,
    "jsx-a11y/img-redundant-alt": `off`,
    "jsx-a11y/interactive-supports-focus": `off`,
    "jsx-a11y/label-has-for": `off`,
    "jsx-a11y/label-has-associated-control": `off`,
    "jsx-a11y/lang": `off`,
    "jsx-a11y/media-has-caption": `off`,
    "jsx-a11y/mouse-events-have-key-events": `off`,
    "jsx-a11y/no-access-key": `off`,
    "jsx-a11y/no-autofocus": `off`,
    "jsx-a11y/no-distracting-elements": `off`,
    "jsx-a11y/no-interactive-element-to-noninteractive-role": `off`,
    "jsx-a11y/no-noninteractive-element-interactions": `off`,
    "jsx-a11y/no-noninteractive-element-to-interactive-role": `off`,
    "jsx-a11y/no-noninteractive-tabindex": `off`,
    "jsx-a11y/no-onchange": `off`,
    "jsx-a11y/no-redundant-roles": `off`,
    "jsx-a11y/no-static-element-interactions": `off`,
    "jsx-a11y/role-has-required-aria-props": `off`,
    "jsx-a11y/role-supports-aria-props": `off`,
    "jsx-a11y/scope": `off`,
    "jsx-a11y/tabindex-no-positive": `off`,
    "jsx-a11y/control-has-associated-label": `off`,
  },
}
