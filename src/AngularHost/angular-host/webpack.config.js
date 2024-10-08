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
    uniqueName: "angularHost",
    publicPath: "http://localhost:4200/",
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        name: "angularHost",
        library: { type: "module" },

        // For remotes (please adjust)
        // name: "angularHost",
        // filename: "remoteEntry.js",
        exposes: {
            './Component': './/src/app/app.component.ts',
        },

        remotes: {
          // React microfrontend
          reactMfe: "reactMfe@http://localhost:3000/remoteEntry.js",
          // Blazor microfrontend
          blazorApp: "blazorApp@http://localhost:5200/remoteEntry.js",
          // Angular microfrontend
          angularMfe: "angularMfe@http://localhost:4300/remoteEntry.js",
          // Vue microfrontend
          vueMfe: "vueMfe@http://localhost:8080/remoteEntry.js",
        },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          react: { singleton: true, eager: true, requiredVersion: '^18.3.1' },
          'react-dom': { singleton: true, eager: true, requiredVersion: '^18.3.1' },
          vue: { singleton: true, eager: true, requiredVersion: '^3.0.0' },
          'bootstrap-vue': { singleton: true,eager: true,requiredVersion: '^0.5.1' },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
