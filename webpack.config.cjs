const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

const babelLoader = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
}

const resolve = {
  extensions: ['.js', 'jsx', 'scss'],
}

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: './src/server/server.jsx',
  // externals: [nodeExternals()],
  output: {
    filename: 'server.cjs',
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PORT: 3000,
    }),
  ],
  resolve,
}

const clientConfig = {
  target: 'web',
  mode: 'development',
  entry: './src/client/index.jsx',
  output: {
    filename: 'client.js',
    path: path.join(__dirname, '/dist'),
    publicPath: '/static',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: `${__dirname}/src/client/index.html`,
    }),
  ],
  resolve,
}

module.exports = [serverConfig, clientConfig]
