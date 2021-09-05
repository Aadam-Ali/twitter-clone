const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now },
  username: String,
});

module.exports = mongoose.model('Tweet', tweetSchema);
