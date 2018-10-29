const baseConfig = require("../../webpack.config");

module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    filename: "editable-core.js",
    library: "Editable_Core"
  }
};
