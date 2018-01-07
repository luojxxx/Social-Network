// nodemon
require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var mongoSanitize = require('express-mongo-sanitize');
var seedrandom = require('seedrandom');

var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var search = require('./routes/search');
var reports = require('./routes/reports');
var recommendations = require('./routes/recommendations');

var User = require('./models/user');


// Server setup
var app = express();

var databaseConnectionString = 'mongodb://'+process.env.DATABASE_USERNAME+':'+process.env.DATABASE_PASSWORD+process.env.DATABASE_STRING+process.env.DATABASE_NAME+process.env.DATABASE_OPTIONS

mongoose.connect(databaseConnectionString)
var db = mongoose.connection;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID+'.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.OAUTH_SERVER_CALLBACK_URL+'/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var rng = seedrandom();


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: process.env.EXPRESS_SESSIONS_SECRET, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/' }),
  function(req, res) {
    // Successful authentication, redirect to page that will record token
    var googleId = req.user.googleId;
    var token = googleId+makeToken();
    User.authToken(googleId, token, ()=>{
      res.redirect(process.env.OAUTH_CLIENT_CALLBACK_URL+'/authtoken?token='+token);
    })
  });

app.use('/api/', index);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/search', search);
app.use('/api/reports', reports);
app.use('/api/recommendations', recommendations);


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = (process.env.STAGE === 'development') ? err.message : 'Error';
  res.locals.error = (process.env.STAGE === 'development') ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


function makeToken() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 25; i++)
    text += possible.charAt(Math.floor(rng() * possible.length));

  return text;
}