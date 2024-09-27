const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    entry: './src/index.js', 
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:3000/', 
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: 'svg-url-loader',
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
        ],
    },
    devServer: {
        port: 3000, 
        historyApiFallback: true, 
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'reactMfe', 
            filename: 'remoteEntry.js', 
            exposes: {
                './Component': './src/App.jsx', 
            },
            shared: {
                react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
                'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html', 
        }),
    ],
};