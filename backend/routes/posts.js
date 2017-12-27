var express = require('express');
var router = express.Router();
var passport = require('passport');

var Post = require('../models/post');
var User = require('../models/user');

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

router.get('/:_id/graph', function(req, res, next) {
  var postId = req.params._id;
  var query = {$match: {_id: postId}};

  Post.aggregate(query, {
    $graphLookup: {
      from: 'posts',
      startWith: '$children',
      connectFromField: 'children',
      connectToField: '_id',
      as: 'connections'
    }
  })
  .then((result)=>{
    res.status(200);
    res.json(result);
  })
  .catch((err)=>{
    res.status(400);
    res.send(err);
  })
});

router.get('/tag/:_id', function(req, res, next) {
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

router.post('/', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var allUserInfo = req.user;
    var postData = req.body;
    var newPost = {
      submittedByUserId: allUserInfo._id,
      submittedByUserName: allUserInfo.userName,
      contentTitle: postData.contentTitle,
      contentLink: postData.contentLink,
      contentDescription: postData.contentDescription,
      contentTag: postData.contentTag,
      parent: postData.parent
    };

    Post.create(newPost)
    .then((createdPost)=>{
      if (postData.parent != '') {
        Post.update(
          {_id: postData.parent}, 
          {$addToSet: {'children': createdPost._id}}
          )
        .then(()=>{
          res.status(201);
          res.send('Added new post');
        })
        .catch((err)=>{
          res.status(400);
          res.send(err);
        })
      } else {
        res.status(200);
        res.send('Added new post');
      }
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    })
})

router.put('/:_id/vote', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var allUserInfo = req.user;
    var userId = allUserInfo._id;

    var postId = req.params._id;
    var vote = req.body.vote;

    if (vote != -1 && vote != 0 && vote !=1) {
      res.status(400);
      res.send('Invalid vote');
      return
    }

    var userPriorVote = 0;
    User.findOne({_id: userId})
    .then((result)=>{
      if (typeof(result.voteHistory) === 'undefined') {
        result.voteHistory = {};
      }
      if (!(postId in result.voteHistory)) {
        userPriorVote = 0;
        result.voteHistory[postId] = vote;
      } else {
        userPriorVote = result.voteHistory[postId];
        result.voteHistory[postId] = vote;
      }
      result.markModified('voteHistory');
      result.save();

      User.update({_id: userId}, result)
      .then(()=>{

        var scoreDiff = vote - userPriorVote;
        Post.findOneAndUpdate({_id: postId},
        {
          $inc: {score: scoreDiff}
        })
        .then(()=>{
          res.status(200);
          res.send('Update complete');
        })

        .catch((err)=>{
          res.send(400);
          res.send(err);
        })
      })
      .catch((err)=>{
        res.send(400);
        res.send(err);
      })
    })
    .catch((err)=>{
      res.send(400);
      res.send(err);
    })
})

router.delete('/:_id', function(req, res, next) {
  var id = req.params._id;

  var query = {_id: id};
  Post.update(query, {
    submittedByUserName: 'deleted',
    contentTitle: 'deleted',
    contentDescription: '',
    contentLink: ''
  })
  .then(()=>{
    res.status(204);
    res.send('Delete complete');
  })
  .catch((err)=>{
    res.send(400);
    res.send(err);
  })
});

module.exports = router;