var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
// var config = require('../config')
var pageSize = 3

var Post = require('../models/post');
var User = require('../models/user');

router.get('/:searchQuery/:page', function(req, res, next) {
  var searchQuery = req.params.searchQuery;
  var page = parseInt(req.params.page);

  var searchCount = Post.find({$text: {$search: searchQuery}},
    {searchScore: {$meta: 'textScore'}})
    .count()

  var searchResults = Post.find(
    {$text: {$search: searchQuery}},
    {searchScore: {$meta: 'textScore'}},
    {skip: pageSize*page, limit: pageSize}
    )
    .sort({searchScore: {$meta: 'textScore'}})

  Promise.all([searchCount, searchResults])
  .then((values)=>{
    res.status(200);
    res.send({pages: Math.ceil(values[0]/pageSize), docs: values[1]});
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;