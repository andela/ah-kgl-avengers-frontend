import path from 'path';
import Dotenv from 'dotenv-webpack';
import Webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  mode: process.env.mode,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  resolve: { extensions: ['.js', '.jsx'], modules: ['node_modules'] },
  stats: 'errors-only',
  module: {
    rules: [
      {
        test: [/\.css$/, /\.scss$/],
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: [/\.js$/, /\.jsx/],
        loader: 'babel-loader',
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: [/\.png$/, /\.svg/, /\.jpe?g$/, /\.gif$/],
        loader: 'url-loader',
        options: {
          output: path.join(__dirname, 'dist', 'assets'),
          name: '[name].[ext]',
          limit: 100000,
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true,
    }),
    new Webpack.NoEmitOnErrorsPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin({ filename: '[name.css', chunkFilename: '[id].css]' }),
  ],
  // Webpack dev server configuration
  devServer: {
    port: 8000,
    hot: true,
    compress: true,
    allowedHosts: ['.ngrok.io'],
    contentBase: path.join(__dirname, 'dist'),
    index: path.join(__dirname, 'dist'),
    historyApiFallback: {
      disableDotRule: true,
    },
  },
};

export default config;
