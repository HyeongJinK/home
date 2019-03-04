console.log("\x1b[31m", "\nApp Setting Start...")
console.log("\x1b[32m")

//모듈 로드
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
require('./routes/user/module/passport')(passport);
//라우터
const indexRouter = require('./routes/index');
const profileRouter = require('./routes/etc/profile/profileRoute')
const systemDB = require('./routes/system/db');
const usersRouter = require('./routes/user/user');
const packBookListRouter = require('./routes/packBook/pack');
const packkoListRouter = require('./routes/packBook/packko');
const boardRouter = require('./routes/board/boardRoute');
const projectRouter = require('./routes/project/projectRoute');
const fileRouter = require("./routes/file/fileRoute");
//const youtubeRouter = require('./routes/youtube/youtube');
//템플릿
const templateRouter = require('./routes/template');
//스케쥴
require('./routes/packBook/schedule').translateSchedules();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout_new');
app.set("layout extractScripts", true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

//로그인 설정
app.use(session({ secret: 'secret', resave: true, saveUninitialized: false })); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

app.use((req, res, next) => {
  if (req.session.passport) {
    res.locals.user = req.session.passport.user;
  } else {
    res.locals.user = null;
  }
  next();
});

//라우팅 설정
app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/core', systemDB);
app.use('/user', usersRouter);
app.use('/pack', packBookListRouter);
app.use('/packko', packkoListRouter);
app.use('/board', boardRouter);
app.use('/project', projectRouter);
app.use('/file', fileRouter);
//app.use('/youtube', youtubeRouter);
app.use('/template', templateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {menu: ['에러']});
});

module.exports = app;
console.log("\x1b[31m", "\nApp Setting Finish...");
console.log("\x1b[37m");