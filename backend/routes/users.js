var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var User = require('../models/user');
var Post = require('../models/post');
var pageSize = 5;

router.get('/verify', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userProfile = req.user;

    Post.find({submittedByUserId:userProfile._id}, 'score')
    .then((results)=>{
      var totalVotes = 0;
      for (idx in results) {
        totalVotes += results[idx].score;
      }

      User.findOneAndUpdate(
        {_id: userProfile._id},
        {totalVotes: totalVotes})
      .then(()=>{
        var filteredUserProfile = {
          _id: userProfile._id,
          userName: userProfile.userName,
          email: userProfile.email,
          submitted: userProfile.submitted,
          voteHistory: userProfile.voteHistory,
          saved: userProfile.saved,
          totalVotes: userProfile.totalVotes
        }
        res.status(200);
        res.json(filteredUserProfile);
      })
    })
})

router.put('/saved/:_id', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var saved = req.user.saved;
    var postId = req.params._id;
    postId = postId.substring(0,257)

    if (saved.includes(postId)) {
      saved = saved.filter(e => e !== postId);
    } else {
      saved.push(postId);
    }

    User.findOneAndUpdate(
      {_id: userId},
      {saved: saved})
    .then(()=>{
      res.status(204);
      res.send('Post saved');
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    })
})

router.get('/:_id/submitted/:page', function(req, res, next) {
  var userId = req.params._id;
  userId = userId.substring(0,257)
  var page = parseInt(req.params.page);

  var filterPosts = {submittedByUserId: userId};
  var filterUser = {_id: userId};
  var projection = {};
  var options = {skip: pageSize*page, limit: pageSize, sort:{dateSubmitted:-1}};

  var count = Post.find(filterPosts).count();
  var paginatedResults = Post.find(filterPosts, projection, options)
  .then((allSubmitedPosts)=>{
      return allSubmitedPosts
    })
  var userInfo = User.findOne(filterUser)
  .then((userAccount)=>{
    var filteredAccount = {
      userName: userAccount.userName,
      totalVotes: userAccount.totalVotes
    }
    return filteredAccount
  })

  Promise.all([count, paginatedResults, userInfo])
  .then((values)=>{
    res.status(200);
    res.send({
      totalPosts: values[0], 
      pages: Math.ceil(values[0]/pageSize), 
      docs: values[1],
      userName: values[2].userName,
      totalVotes: values[2].totalVotes
    });
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  });
});

router.get('/:_id/:field/:page', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userProfile = req.user;
    var field = req.params.field;
    field = field.substring(0,65);
    var page = parseInt(req.params.page);

    var saved = userProfile.saved;
    var upVoted = [];
    var downVoted = [];
    for (var key in userProfile.voteHistory) {
      let item = userProfile.voteHistory[key];
      if (item === 1) {
        upVoted.push(key);
      }
      if (item === -1) {
        downVoted.push(key);
      }
    }

    var searchQuery = [];
    if (field === 'saved') {
      searchQuery = saved;
    } else if (field === 'upvoted') {
      searchQuery = upVoted;
    } else if (field === 'downvoted') {
      searchQuery = downVoted;
    } else {
      res.status(400);
      res.send('Non-valid subfield');
    }

    var query = {'_id': {$in: searchQuery}};
    var fields = {};
    var options = {skip: pageSize*page, limit: pageSize};

    var count = Post.find(query).count();
    var paginatedResults = Post.find(query, fields, options);

    Promise.all([count, paginatedResults])
    .then((values)=>{
      res.status(200);
      res.send({
        totalPosts: userProfile.submitted.length, 
        pages: Math.ceil(values[0]/pageSize), 
        docs: values[1],
        userName: userProfile.userName,
        totalVotes: userProfile.totalVotes
      });
    })
    .catch((err)=>{
      res.status(404);
      res.send(err);
    });

})

router.put('/:id/changeusername', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = String(req.user._id);
    var newUserName = req.body.userName;
    newUserName = newUserName.substring(0,33)

    if (req.params.id === userId) {
      User.find({userName: newUserName})
      .then((results)=>{
        if (results.length ===0) {
          User.findOneAndUpdate({_id: userId},
            {userName: newUserName})
          .then((success)=>{
            res.status(200)
            res.json({changed:'true', userName: newUserName})
          })
          .catch((err)=>{
            res.status(400)
            res.send(err)
          })
        } else {
          res.status(200)
          res.json({changed:'false', })
        }
      })
      .catch((err)=>{
        res.status(400)
        res.send(err)
      })
    }
})

module.exports = router;