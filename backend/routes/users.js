var express = require('express');
var router = express.Router();
var passport = require('passport');

var Post = require('../models/post');
var User = require('../models/user');

router.get('/verify', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var allUserInfo = req.user;
    var userInfo = {
      userName: allUserInfo.userName,
      email: allUserInfo.email,
      submitted: allUserInfo.submitted,
      voteHistory: allUserInfo.voteHistory,
      saved: allUserInfo.saved
    }
    res.status(200);
    res.json(userInfo);
})

module.exports = router;