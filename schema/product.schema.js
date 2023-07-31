const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  });

  module.exports = mongoose.model('Product', productSchema);
