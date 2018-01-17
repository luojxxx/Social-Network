var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Post = require('../models/post');
var User = require('../models/user');
var pageSize = 3;

router.get('/:page', function(req, res, next) {
  var page = parseInt(req.params.page);

  var filter = {};
  var projection = {};
  var options = {
    skip: pageSize*page, 
    limit: pageSize, 
    sort:{dateSubmitted:-1}
  };

  var postCount = Post.find(filter).count();
  var postResults = Post.find(filter, projection, options);

  Promise.all([postCount, postResults])
  .then((values)=>{
    res.status(200);
    res.send({pages: Math.ceil(values[0]/pageSize), docs: values[1]});
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

router.get('/tag/:_id', function(req, res, next) {
  var id = req.params._id;

  var filter = {_id: id};

  Post.find(filter)
  .then((post)=>{
    res.json(post);
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;