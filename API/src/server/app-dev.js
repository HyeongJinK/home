console.log("\x1b[31m", "\nApp Setting Start...")
console.log("\x1b[32m")

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const route = require('../js/route/route');

const webpack = require('webpack');
const logger = require('morgan');   //콘솔에 로그기록
const webpackDevMiddleware = require('webpack-dev-middleware'); //수정사항이 생길 경우 다시 빌드
const webpackHotMiddleware = require('webpack-hot-middleware'); //새로고침
const config = require('../../webpack.dev.config');


const app = express()
, compiler = webpack(config);

app.use(webpackDevMiddleware(compiler,
    {publicPath: config.output.publicPath}));    
app.use(webpackHotMiddleware(compiler));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', route);

const PORT = process.env.PORT || 80
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}`)
});

console.log("\x1b[31m", "\nApp Setting Finish...");
console.log("\x1b[37m");