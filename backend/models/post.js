var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

// Post Schema
var postSchema = mongoose.Schema({
  submittedByUserId: {
    type: String,
    required: true
  },
  submittedByUserName: {
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
  contentTag: {
    type: String,
    default: ''
  },
  contentLink: {
    type: String,
    default: ''
  },
  contentDescription: {
    type: String,
    default: ''
  },
  parent: {
    type: String,
    default: ''
  },
  children: {
    type: Array,
    default: []
  }
});

postSchema.index(
  {
    contentTitle: 'text', 
    contentTag: 'text', 
    contentLink: 'text', 
    contentDescription: 'text'
  }, 
  {weights: {
    contentTitle: 5, 
    contentTag: 3, 
    contentLink: 3, 
    contentDescription: 1
  }});

postSchema.plugin(mongoosePaginate);

var Post = module.exports = mongoose.model('post', postSchema);