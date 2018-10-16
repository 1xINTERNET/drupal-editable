module.exports = {
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFiles: ["./setupTests.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    "^setupTests.js$",
    "(tests/.*.mock).(jsx?|tsx?)$"
  ],
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};
