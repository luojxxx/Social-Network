var mongoose = require('mongoose');
var UserNotification = require('./user_notification');
var Notification = require('./notification');

// User Schema
var userSchema = mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  token: {
    type: String
  },
  userName: {
    type: String,
    default: 'Anon'
  },
  email: {
    type: String,
    default: ''
  },
  submitted: {
    type: Array,
    default: []
  },
  upvotes: {
    type: Array,
    default: []
  },
  downvotes: {
    type: Array,
    default: []
  },
  saved: {
    type: Array,
    default: []
  },
  totalVotes: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  lastPosted: {
    type: Date,
    default: Date.now
  },
  lastVoted: {
    type: Date,
    default: Date.now
  }
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.findOrCreate = function(googleIdObject, callback) {
  User.find(googleIdObject, function(err, results) {

    if (results.length === 0) {
      return User.create(googleIdObject)
      .then((newUser)=>{
        return Notification.create({
          notificationType: 'message',
          data: {message: 'Welcome! Feel free to share whatever you like. Although please be mindful and respectful to others.'}
        })
        .then((newNotification)=>{
          return UserNotification.create({
            userId:newUser._id,
            notifications: [newNotification._id],
            newNotifications: true
          })
        })
        .then(()=>{
          callback(err, googleIdObject)
        })
      })

    } else {
      callback(err, googleIdObject);
    }

  })
  .catch((err)=>{
    res.status(400);
    res.send(err);
  })
};

module.exports.authToken = function(googleId, newToken, callback) {
  var query = {googleId: googleId};
  var update = {token: newToken};

  User.findOne(query)
  .then((userAccount)=>{
    if (typeof(userAccount.token) === 'undefined') {
      return User.findOneAndUpdate(query, update)
      .then(()=>{
        callback(newToken)
      })
    } else {
      callback(userAccount.token)
    }
  })
  .catch((err)=>{
    res.status(400);
    res.send(err);
  })
}