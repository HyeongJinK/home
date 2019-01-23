const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLLayout = require('./layout');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'web',
    devtool: '#source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                    , options: {minimize: true}
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.jpg$/,
                use: [{loader: "url-loader"}]
                //use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/view/index.html",
            filename: "./index.html",
            chunks: ['main']
        })
        , new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
        , new HTMLLayout({
            include: path.resolve('./src/view/includes')
            , layout: path.resolve('./src/view/layouts')
        })
        // , new webpack.LoaderOptionsPlugin({
        //     minimize : true
        // })
    ]
}