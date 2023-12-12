const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const babelLoader = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      },
    },
  ],
};

const resolve = {
  extensions: [".js", "jsx"],
};

const serverConfig = {
  target: "node",
  mode: "development",
  entry: "./src/server/server.jsx",
  // externals: [nodeExternals()],
  output: {
    filename: "server.cjs",
    path: path.join(__dirname, "/dist"),
  },
  module: babelLoader,
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3000,
    }),
  ],
  resolve,
};

const clientConfig = {
  target: "web",
  mode: "development",
  entry: "./src/client/index.jsx",
  output: {
    filename: "client.js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/static",
  },
  module: babelLoader,
  plugins: [
    new htmlWebpackPlugin({
      template: `${__dirname}/src/client/index.html`,
    }),
  ],
  resolve,
};

module.exports = [serverConfig, clientConfig];
