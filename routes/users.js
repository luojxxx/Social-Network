var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var User = require('../models/user');
var UserNotification = require('../models/user_notification');
var Post = require('../models/post');
var config = require('../config');

router.get('/verify', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userProfile = req.user;

    var mainProfile = Post.find({submittedByUserId:userProfile._id}, 'score')
    .then((results)=>{
      var totalVotes = 0;
      for (idx in results) {
        totalVotes += results[idx].score;
      }

      return User.findOneAndUpdate(
        {_id: userProfile._id},
        {totalVotes: totalVotes})
      .then(()=>{
         var filteredUserProfile = {
          _id: userProfile._id,
          userName: userProfile.userName,
          email: userProfile.email,
          submitted: userProfile.submitted,
          upvotes: userProfile.upvotes,
          downvotes: userProfile.downvotes,
          saved: userProfile.saved,
          totalVotes: userProfile.totalVotes
        }
        return filteredUserProfile;
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

    var newNotifications = UserNotification.findOne({userId: userProfile._id})
    .then((results)=>{
      return results.newNotifications
    })

    Promise.all([mainProfile, newNotifications])
    .then((values)=>{
      res.status(200);
      res.send({
        ...values[0],
        newNotifications: values[1]
      });
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    });
})

router.put('/saved/', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var saved = req.user.saved;
    var postId = req.body.postId;
    postId = postId.substring(0,257)

    if (saved.filter(e => String(e) === postId).length > 0) {
      saved = saved.filter(e => String(e) !== postId);
    } else {
      saved.unshift(mongoose.Types.ObjectId(postId));
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

router.get('/profile/:userId/submitted/:page', function(req, res, next) {
  var userId = req.params.userId;
  userId = userId.substring(0,257)
  var page = parseInt(req.params.page);

  var filterPosts = {submittedByUserId: userId};
  var filterUser = {_id: userId};
  var projection = {};
  var options = {skip: config.pageSize*page, limit: config.pageSize, sort:{dateSubmitted:-1}};

  var count = Post.find(filterPosts).count();
  var paginatedResults = Post.find(filterPosts, projection, options);
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
      pages: Math.ceil(values[0]/config.pageSize), 
      docs: values[1],
      userName: values[2].userName,
      totalVotes: values[2].totalVotes
    });
  })
  .catch((err)=>{
    res.status(400);
    res.send(err);
  });
});

router.get('/profile/:userId/:field/:page', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userProfile = req.user;
    var field = req.params.field;
    field = field.substring(0,65);
    var page = parseInt(req.params.page);

    var saved = userProfile.saved;
    var upVoted = userProfile.upvotes;
    var downVoted = userProfile.downvotes;

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

    var stack = [];
    for (var i = searchQuery.length - 1; i > 0; i--) {
        var rec = {
            "$cond": [
                { "$eq": [ "$_id", searchQuery[i-1] ] },
                i
            ]
        };

        if ( stack.length == 0 ) {
            rec["$cond"].push( i+1 );
        } else {
            var lval = stack.pop();
            rec["$cond"].push( lval );
        }

        stack.push( rec );
    }

    var query = {'$match': {'_id': {$in: searchQuery}}};
    var projection = {'$addFields': {weight: stack[0]}};
    var skip = {'$skip': config.pageSize*page};
    var limit = {'$limit': config.pageSize};
    var sort = {'$sort': {weight: 1}};

    var count = Post.aggregate([query, {'$count': 'total'}])
                .then((result)=>{
                  if (result.length === 0) {
                    return 0;
                  }
                  return result[0].total
                })
                .catch((err)=>{
                  res.status(400);
                  res.send(err);
                })
    var paginatedResults = Post.aggregate([query, projection, skip, limit, sort]);

    Promise.all([count, paginatedResults])
    .then((values)=>{
      res.status(200);
      res.send({
        totalPosts: userProfile.submitted.length, 
        pages: Math.ceil(values[0]/config.pageSize), 
        docs: values[1],
        userName: userProfile.userName,
        totalVotes: userProfile.totalVotes
      });
    })
    .catch((err)=>{
      res.status(400);
      res.send(err);
    });
})

router.put('/changeusername', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = String(req.user._id);
    var newUserName = req.body.userName;
    newUserName = newUserName.substring(0,33)

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
})

module.exports = router;