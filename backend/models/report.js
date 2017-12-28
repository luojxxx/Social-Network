var mongoose = require('mongoose');

// Report Schema
var reportSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true
  },
  submittedByUserIds: {
    type: Array,
    default: []
  }
});

var Report = module.exports = mongoose.model('report', reportSchema);