const path = require('path');
const cssnano = require("cssnano");
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
       'main': './src/index.js',
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      // splitChunks: {
      //   chunks: 'all',
      //   name: 'vender',
      // },
    },
    output: {
       filename: '[name].bundle.js',
       chunkFilename: '[name].[contenthash].bundle.js',
       path: path.resolve(__dirname, 'dist'),
       publicPath: '',
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: false,
      port: 9001,
      index: 'index.html'
    },
    module: {
       rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
         {
           test: /\.(jpe?g|png)$/,
           use: [
             {
               loader: 'file-loader'
             },
             {
               loader: 'image-webpack-loader',
               options: {
                 mozjpeg: {
                   progressive: true,
                   quality: 35
                 },
                 optipng: {
                   optimizationLevel: 3,
                 },
                 pngquant: {
                   quality: '65-90',
                   speed: 4
                 },
                 gifsicle: {
                   interlaced: false,
                 }
               }
             },
           ]
         },
         {
           test: /\.css$/,
           use: [
              'style-loader',
             'css-loader'
           ]
         },
         {
           test: /\.scss$/,
           use: [ 'style-loader', 'css-loader', 'sass-loader']
         },
         {
           test: /\.js/,
           exclude: /node-modules/,
           use: [
             {
               loader: 'babel-loader',
               options: {
                 presets: ['@babel/preset-env'],
                 plugins: ['transform-class-properties'],
               },
             }
           ]
         }
       ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new TerserPlugin({}),
      new HtmlWebpackPlugin({
          chunks: ['vender','runtime', 'main'],
          filename: './index.html',
          template: './index.html',
          inject: true,
          hash: false,
          title: 'webgl demo',
      }),
      new CleanWebpackPlugin(),
      new BundleAnalyzerPlugin(),
    ],
}
