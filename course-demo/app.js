var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cookieSession = require('cookie-session')

const models = require("./models");
const { credentials } = require('./config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var handlebarsRouter = require('./routes/handlebars-examples');
var cookiesRouter = require('./routes/cookies');
const { config } = require('process');


var app = express();

app.disable('x-powered-by')

models.sequelize.sync().then(function () {
  console.log("> La base de datos se ha sincronizado");
}).catch(function (err) {
  console.log(" > Ocurrió un error sincronizando la base de datos", err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: './layouts/main' })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(cookieParser(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  maxAge: 4000,
  keys: [credentials.cookieSecret]
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/handlebar', handlebarsRouter);
app.use('/cookies', cookiesRouter);


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
  res.render('500');
});

module.exports = app;
