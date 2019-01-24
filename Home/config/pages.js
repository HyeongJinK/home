const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HTMLLayout = require('./layout');

//'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', 

exports.entry = {
    include: ['./src/include.js']
    , main: ['./src/index.js']
};

exports.pages = [
    new HtmlWebPackPlugin({
        template: "./src/views/index.ejs",
        filename: "./index.ejs",
        chunks: ['include', 'main']
    })
    // , new HtmlWebPackPlugin({
    //     template: "./src/views/test.html",
    //     filename: "./test.html",
    //     chunks: ['include']
    // })
    , new HTMLLayout({
        include: path.resolve('./src/views/includes')
        , layout: path.resolve('./src/views/layouts')
    })
];