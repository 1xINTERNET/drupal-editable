module.exports = opts => {
  const isDev = process.env.NODE_ENV === "development";
  return {
    output: {
      filename: `lib${isDev ? ".dev" : ""}.js`
    },
    devtool: isDev ? "eval" : "source-map",
    mode: process.env.NODE_ENV,
    ...(!isDev
      ? {
          performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
          }
        }
      : {}),
    optimization: {
      minimize: !isDev
    }
  };
};
