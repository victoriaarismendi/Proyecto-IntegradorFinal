var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./database/models');
var session = require('express-session');

var indexRouter = require('./routes/index');
var productRouter = require ('./routes/product');
var profileRouter = require ('./routes/profile');

var app = express();

app.use(session({
  secret: 'a_secret_word',
  resave: false,
  saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
})


//Cookies middleware

app.use(function(req, res, next) {
  if (!req.session.user) {
      db.User.findByPk (req.cookies.userId)
      .then (function(user) {
      req.session.user = user;
      next ();
    })
  } else {
    next ();
  }
})



app.use('/', indexRouter);
app.use ('/product', productRouter);
app.use ('/profile', profileRouter);

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
  res.render('error');
});

module.exports = app;
