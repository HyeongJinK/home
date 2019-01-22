console.log("\x1b[31m", "\nApp Setting Start...")
console.log("\x1b[32m")

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); //수정사항이 생길 경우 다시 빌드
const webpackHotMiddleware = require('webpack-hot-middleware'); //새로고침
const config = require('../../webpack.dev.config');
//const expressLayouts = require('express-ejs-layouts');

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config);


//app.set('view engine', 'ejs');
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result)=> {
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
});

console.log("\x1b[31m", "\nApp Setting Finish...");
console.log("\x1b[37m");