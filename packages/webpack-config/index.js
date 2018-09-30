const merge = require("webpack-merge");
const fs = require("fs");
const path = require("path");
const baseConfig = require("./config/base.config");
const buildConfig = require("./config/build.config");
const externalConfig = require("./config/external.config.js");

module.exports = () => {
  const appDir = fs.realpathSync(process.cwd());
  const pckg = require(path.resolve(process.cwd(), "package.json"));
  const opts = {
    sourceDirectory: path.resolve(appDir, "src"),
    buildDirectory: path.resolve(appDir, "dist"),
    ...pckg.config
  };

  return merge(baseConfig(opts), buildConfig(opts), externalConfig(opts));
};
