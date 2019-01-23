const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const HTMLLayout = require('./layout');

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
            template: "./src/views/index.html",
            filename: "./index.html",
            chunks: ['main']
        })
        , new HtmlWebPackPlugin({
            template: "./src/views/test.html",
            filename: "./test.html",
            chunks: ['test']
        })
        , new HTMLLayout({
            include: path.resolve('./src/views/includes')
            , layout: path.resolve('./src/views/layouts')
        })
        , new webpack.HotModuleReplacementPlugin()
        , new webpack.NoEmitOnErrorsPlugin()  
    ]
}