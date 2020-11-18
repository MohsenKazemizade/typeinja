const mongoose = require('mongoose');

const TypiestSchema = new mongoose.Schema({
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  agreeWithRules: {
    type: Boolean,
    required: true,
  },
});

module.exports = TypiestUser = mongoose.model('typiestUser', TypiestSchema);
