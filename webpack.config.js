const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const settings = {
	host: 'localhost',
	port: 5500,
	proxy: 'habitat/'
};

module.exports = (env) => {
  const { mode = 'development' } = env;

  return [
    {
      mode,
      entry: { 
        app: './src/styles/app.scss' 
      },
      output: {
        filename: './node_modules/[name].log',
        path: path.resolve(__dirname),
        assetModuleFilename: './assets/img/[name][ext]',
      },
      devtool: mode === 'production' ? false : 'source-map',
      module: {
        rules: [
          {
            test: /\.(css|sass|scss)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ],
            sideEffects: true
          },
          {
            test: /\.(woff(2)?|ttf|eot)$/,
            type: 'asset/resource',
            generator: {
              filename: './assets/fonts/[name][ext][query]',
            }
          },
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: './assets/css/[name].min.css',
        }),
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['./assets/css/*.css', './assets/css/*.map']
        }),
        new BrowserSyncPlugin({
          host: settings.host,
          port: settings.port,
          proxy: settings.proxy,
          files: ['./**/*', '!./node_modules', '!./package.json'],
          notify: false,
          injectCss: true,
          reloadDelay: 0
        }),
      ],
      optimization: {
        minimizer: [
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          }),
        ],
      },
    },
  
    {
      mode,
      entry: { 
        app: './src/scripts/app.js' 
      },
      output: {
        filename: './assets/js/[name].min.js',
        path: path.resolve(__dirname),
        assetModuleFilename: './assets/img/[name][ext]',
      },
      devtool: mode === 'production' ? false : 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: ['./assets/js/*.js', './assets/js/*.map']
        }),
      ],
    }
  ]
};
