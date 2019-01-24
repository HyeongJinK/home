const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const pages = require('./config/pages');

module.exports = {
    entry: {
        include: ['./src/include.js']
        , main: ['./src/index.js']
        , server: ['./src/server/app-dev.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    target: 'node',
    node: {
        // express로 작업할 때 필요 없으면 빌드 실패
        __dirname: false, // 이것을 넣지 않으면, __dirname
        __filename: false, // and __filename return blank
    },
    externals: [nodeExternals()],
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.ejs$/,
                use: [{
                    loader: "html-loader"
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
    plugins: pages.pages,
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