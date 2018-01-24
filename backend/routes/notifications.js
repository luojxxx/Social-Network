var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var UserNotification = require('../models/user_notification');
var Notification = require('../models/notification');
var config = require('../config');

router.get('/:page', passport.authenticate('bearer', { session: false }),
  function(req,res){
    var userId = req.user._id;
    var page = parseInt(req.params.page);

    UserNotification.findOne({userId: userId})
    .then((userNotifications)=>{
      var notificationArray = userNotifications.notifications;

      var filter = {'_id': {$in: notificationArray}};
      var projection = {};
      var options = {
        skip: config.pageSize*page, 
        limit: config.pageSize, 
        sort:{dateCreated:-1}
      };

      var count = Notification.find(filter).count();
      var filteredResults = Notification.find(filter, projection, options);

      Promise.all([count, filteredResults])
      .then((values)=>{
        res.status(200);
        res.send({pages: Math.ceil(values[0]/config.pageSize), docs: values[1]});
      })
      .catch((err)=>{
        res.status(400);
        res.send(err);
      })
    })
});

module.exports = router;