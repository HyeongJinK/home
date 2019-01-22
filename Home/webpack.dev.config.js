const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const HtmlLayoutWebpackPlugin = require('html-layout-webpack-plugin');

module.exports = {
    entry: {
        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
        , test: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/test.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    mode: 'development',
    target: 'web',
    devtool: '#source-map',
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                    //, options: {minimize: true}
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/view/index.html",
            filename: "./index.html",
            chunks: ['main']
        })
        , new HtmlWebPackPlugin({
            template: "./src/view/test.html",
            filename: "./test.html",
            chunks: ['test']
        })
        , new HtmlLayoutWebpackPlugin({
            include: path.resolve('./src/view/includes')
            , layout: path.resolve('./src/view/layouts')
        })
        , new webpack.HotModuleReplacementPlugin()
        , new webpack.NoEmitOnErrorsPlugin()
        
    ]
}