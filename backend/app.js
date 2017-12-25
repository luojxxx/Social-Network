// nodemon

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

var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var recommendations = require('./routes/recommendations');

var User = require('./models/user');


// Server setup
var app = express();

mongoose.connect('mongodb://cloudjing:1quT7UbzaTQWhTIQ@cluster0-shard-00-00-njrb5.mongodb.net:27017,cluster0-shard-00-01-njrb5.mongodb.net:27017,cluster0-shard-00-02-njrb5.mongodb.net:27017/Testdata?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
var db = mongoose.connection;

passport.use(new GoogleStrategy({
    clientID: '621988682029-ht1leobitvdckn2nu390lkkbtvolqefc.apps.googleusercontent.com',
    clientSecret: 'RD7x4w6QbmsI8B7-7_jcfwcH',
    callbackURL: 'http://localhost:3000/auth/google/callback'
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/google/' }),
  function(req, res) {
    // Successful authentication, redirect to page that will record token
    var userId = req.user[0]._id;
    // var token = jwt.encode(userId, 'secretrandomizersecret');
    var token = userId+makeToken();
    User.authToken(userId, token, ()=>{
      res.redirect('http://localhost:3001/authtoken?token='+token);
    })
  });

app.get('/', function(req, res) {
    res.send('Home');
});

app.use('/api/', index);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/recommendations', recommendations);

app.get('/protected',
  passport.authenticate('bearer', { session: false }),
  function(req,res){
  res.send('Nice one')
})


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


function makeToken() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}