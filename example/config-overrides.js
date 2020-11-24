const { addBabelPlugin, override } = require("customize-cra");

module.exports = override(
  addBabelPlugin([
    "@nozbe/zacs/babel",
    {
      platform: "web",
      production: false,
      keepDeclarations: true,
    },
  ])
);
