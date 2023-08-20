const path = require('path');
const sassVars = require(__dirname + "/src/theme.js");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const sass = require("sass");
const sassUtils = require("node-sass-utils")(sass);

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                use: [{loader: "file-loader"}]
            },
            { 
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        sassOptions: {
                            functions: {
                                "get($keys)": function(keys) {
                                    keys = keys.getValue().split(".");
                                    let result = sassVars;
                                    let i;
                                    for (i = 0; i < keys.length; i++) {
                                        result = result[keys[i]];
                                    }
                                    result = sassUtils.castToSass(result);
                                    return result;
                                }
                            }
                        }
                    }
                }]
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: 'public/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[{ 
            from: './public/favicon.ico' 
        },]})
    ]
};