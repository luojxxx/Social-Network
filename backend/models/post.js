var mongoose = require('mongoose');

// Post Schema
var postSchema = mongoose.Schema({
  submittedBy: {
    type: String,
    required: true
  },
  dateSubmitted: {
    type: Date, 
    default: Date.now
  },
  score: {
    type: Number,
    default: 1
  },
  contentTitle: {
    type: String,
    required: true
  },
  contentLink: {
    type: String,
    default: ''
  },
  contentDescription: {
    type: String,
    default: ''
  },
  comments: {
    type: Array,
    default: []
  }
});

var Post = module.exports = mongoose.model('post', postSchema);