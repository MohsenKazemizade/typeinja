const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  agreewithrules: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CutomerUser = mongoose.model('customerUser', CustomerSchema);
