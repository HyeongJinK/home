const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
    const SERVER_PATH = (argv.mode === 'production') ?
    './src/server/app.js' :
    './src/server/app-dev.js'

    return({
        entry: {
            server: SERVER_PATH,
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
        externals: [nodeExternals()], // Express를 사용할 때 오류가 발생하지 않도록 하려면 이 기능이 필요
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        }
    });
}