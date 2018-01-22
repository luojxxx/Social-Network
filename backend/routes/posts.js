var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var Post = require('../models/post');
var User = require('../models/user');
var UserNotification = require('../models/user_notification');
var Notification = require('../models/notification');

router.get('/:_id', function(req, res, next) {
  var postId = req.params._id;
  postId = postId.substring(0,257)
  var query = {_id: postId};

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

  Post.aggregate([
    {$match: {_id: mongoose.Types.ObjectId(postId)}}, 
    {$graphLookup: {
      from: 'posts',
      startWith: '$children',
      connectFromField: 'children',
      connectToField: '_id',
      maxDepth: 3,
      as: 'connections'}}
    ])
  .then((result)=>{
    var connections = result[0].connections;
    result = result.concat(connections);
    delete result[0].connections;
    res.status(200);
    res.json(result);
  })
  .catch((err)=>{
    res.status(400);
    res.send(err);
  })
});

router.post('/', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var userName = req.user.userName;
    var postData = req.body;
    postData.contentTitle = postData.contentTitle.substring(0,257)
    postData.contentTag = postData.contentTag.substring(0,65)
    postData.contentLink = postData.contentLink.substring(0,513)
    postData.contentDescription = postData.contentDescription.substring(0,10001)
    postData.parent = postData.parent.substring(0,257)
    postData.parent = (postData.parent !== '')
                      ?new mongoose.Types.ObjectId(postData.parent)
                      :null

    var newPost = {
      submittedByUserId: userId,
      submittedByUserName: userName,
      contentTitle: postData.contentTitle,
      contentTag: postData.contentTag,
      contentLink: postData.contentLink,
      contentDescription: postData.contentDescription,
      parent: postData.parent
    };

    Post.create(newPost)
    .then((createdPost)=>{

      User.update(
        {_id: userId},
        {$addToSet: {'submitted': createdPost._id}})
      .catch((err)=>{
        res.status(400);
        res.send(err);
      })

      if (newPost.parent != null) {
        Post.findOneAndUpdate(
          {_id: createdPost.parent},
          {$addToSet: {'children': createdPost._id}})
        .then((parentPost)=>{
          Notification.create({
            notificationType: 'reply',
            data: {
              parentPostId: parentPost._id,
              parentPostTitle: parentPost.contentTitle,
              newPostId: createdPost._id,
              newPostTitle: createdPost.contentTitle,
              newPostUserId: userId,
              newPostUserName: userName
            }
          })
          .then((newNotification)=>{
            UserNotification.findOneAndUpdate(
              {userId: parentPost.submittedByUserId},
              {$push: {
                notifications: {
                  $each: [newNotification._id],
                  $position: 0
                }
              }
            })
            .then(()=>{
              res.status(200);
              res.send(createdPost);
            })
            .catch((err)=>{
              res.status(400);
              res.send(err);
            })
          })
          .catch((err)=>{
            res.status(400);
            res.send(err);
          })
        })
      } else {
        res.status(200);
        res.send(createdPost);
      }
    })
})

router.put('/:_id', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var postId = req.params._id;
    var postData = req.body;
    postData.contentTitle = postData.contentTitle.substring(0,257)
    postData.contentTag = postData.contentTag.substring(0,65)
    postData.contentLink = postData.contentLink.substring(0,513)
    postData.contentDescription = postData.contentDescription.substring(0,10001)

    var updatePost = {
      contentTitle: postData.contentTitle,
      contentTag: postData.contentTag,
      contentLink: postData.contentLink,
      contentDescription: postData.contentDescription
    };

    Post.findOne({_id: postId})
    .then((post)=>{
      if (String(post.submittedByUserId) === String(userId)) {
        Post.findOneAndUpdate({_id: postId}, updatePost)
        .then(()=>{
          res.status(200);
          res.send('Completed update');
        })
      } else {
        res.status(401);
        res.send('Unauthorized edit')
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
    postId = postId.substring(0,257)
    var currentVote = req.body.vote;

    if (currentVote != -1 && currentVote != 0 && currentVote !=1) {
      res.status(400);
      res.send('Invalid vote');
      return
    }

    var userPriorVote = 0;
    User.findOne({_id: userId})
    .then((userProfile)=>{
      if (typeof(userProfile.voteHistory) === 'undefined') {
        userProfile.voteHistory = {};
      }
      if (!(postId in userProfile.voteHistory)) {
        userPriorVote = 0;
        userProfile.voteHistory[postId] = currentVote;
      } else {
        userPriorVote = userProfile.voteHistory[postId];
        userProfile.voteHistory[postId] = currentVote;
      }
      userProfile.markModified('voteHistory');
      userProfile.save();

      User.update({_id: userId}, userProfile)
      .then(()=>{
        var updateScore = currentVote - userPriorVote;
        Post.findOneAndUpdate({_id: postId},
        {
          $inc: {score: updateScore}
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

router.delete('/:_id', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var postId = req.params._id;
    postId = postId.substring(0,257)

    Post.findOne({_id: postId})
    .then((postToDelete)=>{
      if (String(postToDelete.submittedByUserId) === String(userId)) {
        Post.findOneAndUpdate({_id: postId}, {
          submittedByUserId: null,
          submittedByUserName: 'deleted',
          contentTitle: 'deleted',
          contentTag: '',
          contentLink: '',
          contentDescription: ''
        })
        .then(()=>{
          res.status(204);
          res.send('Delete complete');
        })
        .catch((err)=>{
          res.status(400);
          res.send(err);
        })
      } else {
        res.status(401);
        res.send(err);
      }
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    })

    
})

module.exports = router;