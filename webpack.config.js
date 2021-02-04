const path = require("path");

module.exports = {
  target: "web",
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "teams-api.js",
    libraryTarget: "umd",
    globalObject: "this",
  },
};
