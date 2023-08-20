const { merge } = require('webpack-merge');
const defaultConfig = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(defaultConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify("https://localhost:8080/"),
            ENV_NAME: JSON.stringify("dev"),
            ASSET_BASE: JSON.stringify(""),
            INDEXEDDBNAME: JSON.stringify('zz2-farm-dev-db'),
            INDEXEDDBVERSION: JSON.stringify('1'),
        })
    ]
});
