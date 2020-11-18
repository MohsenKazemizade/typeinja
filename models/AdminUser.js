const mongoose = require('mangoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = AdminUser = mongoose.module('adminUser', AdminSchema);
