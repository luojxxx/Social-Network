var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Post = require('../models/post');
var User = require('../models/user');
var config = require('../config');

router.get('/:searchQuery/:page', function(req, res, next) {
  var searchQuery = req.params.searchQuery;
  var page = parseInt(req.params.page);

  var filter = {$text: {$search: searchQuery}};
  var projection = {searchScore: {$meta: 'textScore'}}
  var options = {skip: config.pageSize*page, limit: config.pageSize}

  var searchCount = Post.find(filter, projection).count()
  var searchResults = Post.find(filter, projection, options)
    .sort(projection)

  Promise.all([searchCount, searchResults])
  .then((values)=>{
    res.status(200);
    res.send({pages: Math.ceil(values[0]/config.pageSize), docs: values[1]});
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;