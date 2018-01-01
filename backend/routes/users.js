var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Post = require('../models/post');

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
    var postId = String(req.params._id);

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

router.get('/:_id', function(req, res, next) {
  var userId = req.params._id;
  var query = {_id: userId};

  User.findOne(query)
  .then((userProfile)=>{
    Post.find({submittedByUserId: userProfile._id})
    .then((allSubmitedPosts)=>{
      var filteredUserProfile = {
        userName: userProfile.userName,
        submitted: allSubmitedPosts,
        totalVotes: userProfile.totalVotes
      }
      res.status(200);
      res.json(filteredUserProfile);
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    })
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;

router.get('/:_id/:field', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userProfile = req.user;
    var field = req.params.field;

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
      res.send('Not a field user sub-field');
    }

    Post.find({
      '_id': {$in: searchQuery}
    })
    .then((results)=>{
      res.status(200);
      res.json(results);
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    })

})

router.put('/:id/username', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = String(req.user._id);
    var newUserName = req.body.userName;

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