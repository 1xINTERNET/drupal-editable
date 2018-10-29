const base = require("../../jest.config.base.js");
const pack = require("./package");
const path = require("path");
const dirName = path.basename(__dirname);

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  rootDir: "../..",
  testMatch: [`<rootDir>/packages/${dirName}/**/*.spec.js`]
};
