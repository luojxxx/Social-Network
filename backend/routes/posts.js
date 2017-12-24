var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  Post.find()
  .then((allPosts)=>{
    res.json(allPosts);
  });
});

router.get('/:_id', function(req, res, next) {
  var id = req.params._id;
  var query = {_id: id};

  Post.find(query)
  .then((post)=>{
    res.json(post);
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

router.post('/', function(req, res, next) {
  var postdata = req.body;
  var newPost = {
    submittedBy: postdata.submittedBy,
    contentTitle: postdata.contentTitle,
    contentLink: postdata.contentLink,
    contentDescription: postdata.contentDescription
  };

  Post.create(newPost)
  .then(()=>{
    res.status(201);
    res.send('Added new post');
  })
  .catch((err)=>{
    res.send(err);
  })
});

router.put('/:_id/vote', function(req, res, next) {
  var postId = req.params._id;
  var putData = req.body;
  var userId = putData.userId;
  var vote = putData.vote;

  if (vote != -1 && vote != 0 && vote !=1) {
    res.status(400);
    res.send('Invalid vote');
    return
  }

  var userPriorVote = 0;
  User.findOne({_id: userId})
  .then((result)=>{
    if (result.hasOwnProperty('voteHistory') == false) {
      result.voteHistory = {};
    }
    if (result.voteHistory.hasOwnProperty(postId) == false) {
      userPriorVote = 0;
      result.voteHistory[postId] = vote;
    } else {
      userPriorVote = result.voteHistory[postId];
      result.voteHistory[postId] = vote;
    }
    result.markModified('voteHistory');
    result.save();
    User.update({_id: userId}, result);
  })

  var scoreDiff = vote - userPriorVote;

  Post.findOneAndUpdate({_id: postId},
  {
    $inc: {'score': scoreDiff}
  })
  .then(()=>{
    res.send('Update complete');
  })

});

router.put('/:_id/comment', function(req, res, next) {
  var id = req.params._id;
  var updatedPost = req.body;

  var query = {_id: id};
  var update = {
    name: updatedPost.name,
    type: updatedPost.type
  }
  Post.findOneAndUpdate(query, update, {})
  .then(()=>{
    res.send('Update complete');
  })
  .catch((err)=>{
    res.send(err);
  })
});

router.delete('/:_id', function(req, res, next) {
  var id = req.params._id;

  var query = {_id: id};
  Post.remove(query)
  .then(()=>{
    res.status(204);
    res.send('Delete complete');
  })
  .catch((err)=>{
    res.send(err);
  });
});

module.exports = router;