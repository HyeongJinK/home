const path = require('path')
const webpack = require('webpack')
const pages = require('./config/pages');

module.exports = {
    entry: pages.entry,
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
                test: /\.ejs$/,
                use: [ "html-loader" ]
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
    plugins: pages.pages.concat([
        new webpack.HotModuleReplacementPlugin()
        , new webpack.NoEmitOnErrorsPlugin()  
    ]),
    devServer: {
        host: '127.0.0.1'
        , contentBase: path.join(__dirname, "dist")
        , compress: true
        , hot: true
        , inline: true
        , port: 9000
        , open: true
    }
}