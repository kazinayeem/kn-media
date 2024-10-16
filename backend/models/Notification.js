const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "like", "comment", "follow"
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }, // For likes/comments
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
