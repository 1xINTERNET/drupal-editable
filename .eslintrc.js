module.exports = {
  extends: ["plugin:prettier/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: true
  },
  rules: {
    "prettier/prettier": "error",
    "import/no-extraneous-dependencies": 0,
    "global-require": 0,
    "import/prefer-default-export": 0,
    "no-nested-ternary": 0,
    "react/jsx-filename-extension": 0,
    "import/no-webpack-loader-syntax": 0
  }
};
