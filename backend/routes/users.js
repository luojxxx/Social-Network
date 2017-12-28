var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

router.get('/verify', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var allUserInfo = req.user;
    var userInfo = {
      _id: allUserInfo._id,
      userName: allUserInfo.userName,
      email: allUserInfo.email,
      submitted: allUserInfo.submitted,
      voteHistory: allUserInfo.voteHistory,
      saved: allUserInfo.saved
    }
    res.status(200);
    res.json(userInfo);
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

module.exports = router;