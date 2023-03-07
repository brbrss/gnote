var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

{
  const session = require('express-session');
  app.use(session({
    store: new (require('connect-pg-simple')(session))({
      createTableIfMissing: true
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  }));
}

{
  const Model = require('./model/model');
  Model.init();
}

{
  const indexRouter = require('./routes/index');
  const usersRouter = require('./routes/users');
  const pointRouter = require('./routes/point');
  const noteRouter = require('./routes/note');
  const searchRouter = require('./routes/search');
  const tagRouter = require('./routes/tag');
  //app.use('/', indexRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/point', pointRouter);
  app.use('/api/note', noteRouter);
  app.use('/api/tag', tagRouter);
  app.use('/api/search', searchRouter);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
