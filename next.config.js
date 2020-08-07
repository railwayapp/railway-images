const webpack = require("webpack");

module.exports = {
  target: "serverless",
  webpack: config => {
    config.plugins.push(new webpack.IgnorePlugin(/^pg-native$/));

    return config;
  },
};
