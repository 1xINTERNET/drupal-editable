import typescript from "rollup-plugin-typescript";

module.exports = {
  input: "src/index.ts",
  plugins: [typescript()],
  output: {
    file: "bundle.js",
    format: "cjs"
  }
};
