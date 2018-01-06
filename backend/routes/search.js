var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');

var Post = require('../models/post');
var User = require('../models/user');

router.get('/:searchQuery', function(req, res, next) {
  var searchQuery = req.params.searchQuery;

  Post.find(
    {$text: {$search: searchQuery}},
    {searchScore: {$meta: 'textScore'}})
  .sort({searchScore: {$meta: 'textScore'}})
  .then((searchResults)=>{
    res.status(200);
    res.json(searchResults);
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;