var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Post = require('../models/post');
var User = require('../models/user');
var config = require('../config');

router.get('/:page', function(req, res, next) {
  var page = parseInt(req.params.page);

  var filter = {};
  var projection = {};
  var options = {
    skip: config.pageSize*page, 
    limit: config.pageSize, 
    sort:{dateSubmitted:-1}
  };

  var postCount = Post.find(filter).count();
  var postResults = Post.find(filter, projection, options);

  Promise.all([postCount, postResults])
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