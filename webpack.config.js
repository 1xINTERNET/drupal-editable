const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./src/index.ts"
  },
  externals: {
    "react-dom": "ReactDOM",
    react: "React"
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
    library: "Editable_Generic",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  }
};
