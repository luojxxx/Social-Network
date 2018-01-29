var mongoose = require('mongoose');

// User Schema
var userNotificationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  notifications: {
    type: Array,
    default: []
  },
  newNotifications: {
    type: Boolean,
    default: false
  }
});

var UserNotification = module.exports = mongoose.model('user_notification', userNotificationSchema);

