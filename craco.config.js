const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

const configureWebpackConfig = (webpackConfig) => {
  webpackConfig.resolve.plugins.push(new TsconfigPathsPlugin());

  return webpackConfig;
};

module.exports = { webpack: { configure: configureWebpackConfig } };
