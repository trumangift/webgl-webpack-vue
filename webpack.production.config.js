const path = require('path');
const cssnano = require("cssnano");
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const AUTOPREFIXER_BROWSERS = [
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

function getHtmlWebPackPlugin() {
    return  new HtmlWebpackPlugin({
                chunks: ['vender','runtime', 'main'],
                filename: './index.html',
                template: './index.html',
                inject: true,
                hash: false,
                title: 'webgl demo',
            });
}

module.exports = {
    entry: {
       main: path.resolve(__dirname, 'src/index.js'),
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime'
      },
      splitChunks: {
        chunks: 'all',
        name: 'vender'
      },
    },
    output: {
       filename: '[name].[contenthash].js',
       path: path.resolve(__dirname, 'dist'),
       publicPath: '',
    },
    mode: 'production',
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
              MiniCssExtractPlugin.loader,
             'css-loader'
           ]
         },
         {
           test: /\.scss$/,
           use: [ MiniCssExtractPlugin.loader,'css-loader',
           {
             loader: 'postcss-loader',
             options: {
               ident: 'postcss',
               plugins: (loader) => [
                 cssnano(),
                 autoprefixer({
                   browsers: AUTOPREFIXER_BROWSERS
                 })
               ]
             }
           }, 'sass-loader']
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
       new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
       }),
       new OptimizeCSSAssetsPlugin({
          cssProcessor: cssnano,
          cssProcessorOptions: {
            discardComments: {
              removeAll: true,
            },
            safe: true,
          },
          canPrint: true,
      }),
      getHtmlWebPackPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(),
    ],
}
