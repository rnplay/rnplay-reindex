const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const constants = require('postcss-constants');

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.css'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    }
  }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'node_modules/codemirror'),
        loaders: ['style', 'css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss'],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'node_modules/codemirror'),
        loaders: ['style', 'css'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
      test: /\.json$/,
      loader: 'json-loader'
      }
    ]
  },
  postcss: function() {
    return [autoprefixer, constants];
  }
};
