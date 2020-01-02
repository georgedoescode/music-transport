const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './app/js/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        overlay: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.worker\.js$/,
                use: { 
                    loader: 'worker-loader' 
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/public/index.html",
            filename: "index.html",
            minify: {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
        }),
        new CleanWebpackPlugin()
    ]
}