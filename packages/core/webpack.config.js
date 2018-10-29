const baseConfig = require("../../webpack.config");
const TypescriptDeclarationPlugin = require("typescript-declaration-webpack-plugin");

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: "editable-core.js",
    library: "Editable_Core"
  },
  plugins: [
    ...baseConfig.plugins,
    new TypescriptDeclarationPlugin({
      out: "yeti-table.d.ts"
    })
  ]
};
