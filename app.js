const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

//Mongoose set up connection
const mongoDb =
  'mongodb+srv://test:test@cluster0.fcsfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

//Set up user schema
const User = mongoose.model(
  'User',
  new Schema({
    username: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      require: true,
      index: true,
      unique: true,
      sparse: true,
    },
  })
);

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get('/index', (req, res) => res.render('index'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/register', (req, res) => res.render('register'));

//Send registration info to database
app.post('/register', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

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
