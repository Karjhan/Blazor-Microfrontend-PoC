const { ModuleFederationPlugin } = require("webpack").container;
const { VueLoaderPlugin } = require("vue-loader");
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/main.js',
  output: {
    publicPath: 'auto',
    filename: "bundle.js"
  },
  devServer: {
    port: 8080, 
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
          esModule: false,
        },
      },
      {
        test: /\.s?css$/,
        use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: () => [autoprefixer()],
                },
              },
            },
            "sass-loader",
          ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
        name: "vueMfe",
        filename: "remoteEntry.js",
        exposes: {
          './Component': './src/components/HelloWorld.vue',
        },
        shared: {
          vue: {
            singleton: true,
            eager: true,
            requiredVersion: '^3.0.0',
          },
         'bootstrap-vue': {
            singleton: true,
            eager: true,
            requiredVersion: '^0.5.1', 
          }
        }
    }),
  ],
  resolve: {
    extensions: [ ".*", '.tsx', '.ts', '.js', '.vue' ],
    alias: {
        vue: path.resolve('./node_modules/vue')
    }
},
};