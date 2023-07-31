const mongoose = require('mongoose');
const { Schema } = mongoose;

const productDetail = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: Number
})

const cartSchema = new mongoose.Schema({
    date: String,
    totalQuantity: Number,
    totalPrice: Number,
    products: [
      {type: productDetail, require : true}
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  });

  module.exports = mongoose.model('Cart', cartSchema);
