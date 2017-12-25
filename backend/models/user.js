var mongoose = require('mongoose');

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
  submitted: {
    type: Array,
    default: []
  },
  voteHistory: {},
  saved: {
    type: Array,
    default: []
  }
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.findOrCreate = function(googleId, callback) {
  var query = {googleId: googleId};

  User.find(googleId, function(err, results){
    if (results.length == 0) {
      User.create(googleId, callback(err, results));
    } else {
      callback(err, results);
    }
  });
};

module.exports.authToken = function(_id, token, callback) {
  var query = {_id: _id};
  var update = {
    token: token
  };

  User.findOneAndUpdate(query, update, callback);
}