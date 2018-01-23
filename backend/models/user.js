var mongoose = require('mongoose');
var UserNotification = require('./user_notification');

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

module.exports.findOrCreate = function(googleId, callback) {
  var query = {googleId: googleId};

  User.find(googleId, function(err, results){
    if (results.length == 0) {
      User.create(googleId)
      .then((newUser)=>{
        UserNotification.create({userId:newUser._id})
        callback(err, googleId)
      })
    } else {
      callback(err, googleId);
    }
  });
};

module.exports.authToken = function(googleId, token, callback) {
  var query = {googleId: googleId};
  var update = {
    token: token
  };

  User.findOneAndUpdate(query, update, callback);
}

