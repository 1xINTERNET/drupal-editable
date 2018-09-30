const path = require("path");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const webpack = require("webpack");

module.exports = opts => {
  return {
    entry: [path.resolve(opts.sourceDirectory, "index.js")],
    output: {
      path: opts.buildDirectory,
      filename: "lib.js",
      library: opts.namespace,
      libraryTarget: "umd"
    },
    resolve: {
      extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      })
    ],
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          enforce: "pre",
          use: [
            {
              options: { formatter: eslintFormatter, eslintPath: "eslint" },
              loader: "eslint-loader"
            }
          ],
          include: opts.sourceDirectory
        },
        {
          test: /\.(js|jsx|mjs)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-export-default-from"
              ]
            }
          },
          include: opts.sourceDirectory
        }
      ]
    }
  };
};
