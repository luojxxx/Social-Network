var mongoose = require('mongoose');

// User Schema
var notificationSchema = mongoose.Schema({
  notificationType: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  data: {}
});

var Notification = module.exports = mongoose.model('notification', notificationSchema);

