console.log("\x1b[31m", "\nApp Setting Start...")
console.log("\x1b[32m")

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware'); //수정사항이 생길 경우 다시 빌드
const webpackHotMiddleware = require('webpack-hot-middleware'); //새로고침
const config = require('../../webpack.dev.config');

const app = express()
, compiler = webpack(config)
, DIST_DIR = __dirname
, HTML_FILE = path.join(DIST_DIR, 'test.html');;

app.use(webpackDevMiddleware(compiler,
    {publicPath: config.output.publicPath}));
    
app.use(webpackHotMiddleware(compiler));

app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


//app.use(express.static("dist"));

app.get('*', (req, res) => {
    //res.sendFile(HTML_FILE);
    console.log(__dirname+ 'test');
    res.render('index');
    // compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    //     if (err)
    //         console.log(err);
    //     console.log("======================")
    //     console.log(result)
    //     console.log("======================")
    //     res.set('content-type', 'text/html')
    //     res.send(result)
    //     res.end()
    // })
});

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
});

console.log("\x1b[31m", "\nApp Setting Finish...");
console.log("\x1b[37m");