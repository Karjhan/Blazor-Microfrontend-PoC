const { defineConfig } = require('@vue/cli-service');
//const { ModuleFederationPlugin } = require("webpack").container;

module.exports = defineConfig({
  // publicPath: 'http://localhost:8080/',
  // configureWebpack: {
  //   optimization: {
  //     runtimeChunk: false
  //   },
  //   experiments: {
  //     outputModule: true
  //   },
  //   plugins: [
  //     new ModuleFederationPlugin({
  //       name: "vueMfe",
  //       library: { type: "module" },
  //       filename: "remoteEntry.js",
  //       exposes: {
  //         './Component': './src/components/HelloWorld.vue',
  //       },
  //       shared: {
  //         vue: {
  //           singleton: true,
  //           eager: true,
  //           requiredVersion: '^3.0.0',
  //         }
  //       }
  //     }),
  //   ],
  // },
  // devServer: {
  //   port: 8080, 
  //   historyApiFallback: true,
  // },
  transpileDependencies: true
})

