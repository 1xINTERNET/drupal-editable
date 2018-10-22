const path = require("path");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const webpack = require("webpack");

module.exports = opts => {
  console.log(opts.bundleName);
  return {
    entry: [path.resolve(opts.sourceDirectory, "index")],
    output: {
      path: opts.buildDirectory,
      filename:
        (opts.bundleName || "lib") +
        (process.env.NODE_ENV === "development" ? ".dev" : "") +
        ".js",
      library: opts.namespace,
      libraryTarget: "umd"
    },
    devtool: "source-map",
    mode: process.env.NODE_ENV,
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    resolve: {
      extensions: [
        ".web.js",
        ".mjs",
        ".js",
        ".json",
        ".web.jsx",
        ".jsx",
        ".ts",
        ".tsx"
      ]
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
          test: /\.(ts|tsx|js|jsx|mjs)$/,
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
          test: /\.(js|jsx|mjs|tsx|ts)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/preset-env",
                "@babel/preset-typescript"
              ],
              plugins: [
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-syntax-export-default-from",
                ...(process.env.NODE_ENV === "production"
                  ? ["transform-react-remove-prop-types"]
                  : [])
              ]
            }
          }
        }
      ]
    }
  };
};
