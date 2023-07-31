const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: String,
    level: Number
  });

  module.exports = mongoose.model('Category', categorySchema);
