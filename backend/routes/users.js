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
    var upVotedPosts = [];
    var downVotedPosts = [];
    for (key in userProfile.voteHistory) {
      if (userProfile.voteHistory[key] === 1) {
        upVotedPosts.push(key);
      } else if (userProfile.voteHistory[key] === -1) {
        downVotedPosts.push(key);
      }
    }

    var filteredUserProfile = {
      userName: userProfile.userName,
      submitted: userProfile.submitted,
      totalVotes: userProfile.totalVotes
    }
    res.status(200);
    res.json(filteredUserProfile);

  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;