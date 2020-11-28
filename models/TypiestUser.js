const mongoose = require('mongoose');

const TypiestSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
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

module.exports = TypiestUser = mongoose.model('typiestUser', TypiestSchema);
