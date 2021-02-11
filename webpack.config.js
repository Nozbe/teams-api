const path = require("path");

const webConfig = {
  target: "web",
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "teams-api.web.js",
    libraryTarget: "umd",
    globalObject: "this",
  },
};

const nodeConfig = {
  target: "node",
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "teams-api.node.js",
    libraryTarget: "umd",
    globalObject: "this",
  },
};

module.exports = [webConfig, nodeConfig];
