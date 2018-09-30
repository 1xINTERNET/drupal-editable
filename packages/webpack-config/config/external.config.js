// external configuration for wepack
module.exports = opts => ({
  externals: {
    // These three should always be considered externals
    "react-dom": "ReactDOM",
    react: "React",
    "prop-types": "PropTypes",
    // editable core should also be excluded from the bundle
    ...(process.env.NODE_ENV !== "test"
      ? { "@drupal-editable/core": "Editable" }
      : {}),
    // @TODO use callback function here to externalise all the other editable
    // libs
    // custom external properties
    ...(opts.externals || {})
  }
});
