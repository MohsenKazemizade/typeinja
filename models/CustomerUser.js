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
  agreeWithRules: {
    type: Boolean,
    required: true,
  },
});

module.exports = CutomerUser = mongoose.model('customerUser', CustomerSchema);
