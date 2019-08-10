const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');


const DEBUG = process.env.mode !== 'production';
const PROD = !DEBUG;

const autoprefixerConfig = {
  browsers: [
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 2.3',
    'bb >= 10',
  ],
};

const plugins = [
  new webpack.ContextReplacementPlugin(
    // eslint-disable-next-line
    /moment[\/\\]locale$/,
    // eslint-disable-next-line
    /en|zh/
  ),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html'),
    hash: true,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    DEBUG: JSON.stringify(DEBUG),
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[name].css',
  }),
];

if (DEBUG) {
  plugins.push(new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map',
  }));
  // plugins.push(new BundleAnalyzerPlugin());
}

const cssLoaderWithModule = {
  importLoaders: 1,
  modules: true,
  localIdentName: DEBUG ? '[name]_[local]--[hash:base64:5]' : '[hash:base64:5]',
  sourceMap: DEBUG,
};

const cssLoaderWithoutModule = {
  sourceMap: DEBUG,
};


const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: DEBUG,
    plugins: () => [
      autoprefixer(autoprefixerConfig),
    ],
  },
};

const config = {
  entry: {
    app: [
      path.resolve(__dirname, './src/index.js'),
    ],
  },

  node: {
    __filename: true,
    __dirname: true,
    module: 'empty',
    net: 'empty',
    fs: 'empty',
  },

  output: {
    path: path.resolve(__dirname, './docs'),
    publicPath:  '/',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    globalObject: 'this',
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  cache: DEBUG,
  devtool: DEBUG ? 'inline-source-map' : false,
  devServer: {
    contentBase: [path.resolve(__dirname, './docs'),path.resolve(__dirname, './public')],
    inline: true,
    compress: true,
    port: 8900,
    hotOnly: true,
    open: true,
    historyApiFallback: true,
  },
  mode: process.env.mode,
  resolve: {
    extensions: ['.js', '.less'],
    alias: {
      src: path.resolve(__dirname, './src'),
      static: path.resolve(__dirname, './static'),
    },
  },
  externals: [
    {
      './cptable': 'var cptable',
    },
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, './node_modules'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: PROD,
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
              ],
              plugins: [
                'transform-class-properties',
                'lodash',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
              ],
            },
          },
        ],
      },
      {
        test: /[^_]\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: cssLoaderWithModule,
        },postcssLoader, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            javascriptEnabled: true 
          },
        }],
      },
      {
        test: /_\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: cssLoaderWithoutModule,
        }, postcssLoader, {
          loader: 'less-loader', // compiles Less to CSS
          options: { 
            javascriptEnabled: true,
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg)/,
        use: 'file-loader',
      }, {
        test: /\.(woff|eot|ttf)/,
        use: 'url-loader',
      }, {
        test: /\.(xlsx?|pdf)/,
        use: 'file-loader',
      }
    ],
  },

  plugins,
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  profile: true,
};

module.exports = config;
