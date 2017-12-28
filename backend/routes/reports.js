var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Report = require('../models/report');

router.post('/:_id', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var postId = String(req.params._id);

    Report.findOne({postId:postId})
    .then((searchResults)=>{
      if (searchResults === null){
        Report.create({
          postId: postId,
          submittedByUserIds: [userId]
        })
        .then(()=>{
          res.status(204);
          res.send('Post has been reported');
        })
        .catch((err)=>{
          res.status(400);
          res.send(err);
        })
      } else {
        Report.update({postId:postId}, {
          $addToSet: {'submittedByUserIds': userId}
        })
        .then(()=>{
          res.status(204);
          res.send('Post has been reported');
        })
        .catch((err)=>{
          res.status(400);
          res.send(err);
        })
      }
    })
})

module.exports = router;