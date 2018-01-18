var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var UserNotification = require('../models/user_notification');
var Notification = require('../models/notification');
var pageSize = 2;

router.get('/:page', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var page = parseInt(req.params.page);

    console.log(userId)

    UserNotification.findOne({userId: userId})
    .then((userNotifications)=>{
      var notificationArray = userNotifications.notifications;

      var filter = {'_id': {$in: notificationArray}};
      var projection = {};
      var options = {
        skip: pageSize*page, 
        limit: pageSize, 
        sort:{dateSubmitted:-1}
      };

      var count = Notification.find(filter).count();
      var filteredResults = Notification.find(filter, projection, options);

      Promise.all([count, filteredResults])
      .then((values)=>{
        res.status(200);
        res.send({pages: Math.ceil(values[0]/pageSize), docs: values[1]});
      })
      .catch((err)=>{
        res.status(404);
        res.send(err);
      })
    })
});

module.exports = router;