const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "angularMfe",
    publicPath: "http://localhost:4300/",
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
      extensions: ['.ts', '.js', '.json']
    }
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: [
        {
            test: /\.m?js/,
            type: "javascript/auto",
            resolve: {
                fullySpecified: false,
            },
        },
        {
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        name: "angularMfe",
        filename: "remoteEntry.js", 
        exposes: {
          './Component': './src/app/app.component.ts', 
        },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
