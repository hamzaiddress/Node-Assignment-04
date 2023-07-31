const Cart = require('../schema/cart.schema');
const Product = require('../schema/product.schema');
const productService = require('./product.service');

async function createCart(cart){
    // Create a new Cart
    const newCart = new Cart(cart);
    const saveCart = await newCart.save();
    if(saveCart){
        const {date, totalQuantity, totalPrice, products, userId} = saveCart;
        return {date, totalQuantity, totalPrice, products, userId}
    }
}

async function getAllCarts(res){
    try {
        // Fetch all carts from the database
        const carts = await Cart.find().populate('userId');
        return carts;
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function patchCart(cartId, updatedFields, res){
    try {    
        // Find the Cart by ID and update the fields
        const cart = await Cart.findByIdAndUpdate(cartId, updatedFields, { new: true });
    
        if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
        }
    
        res.json(cart);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function deleteCart(cartId, res){
    try {
    
        // Find the Cart by ID and remove it
        const cart = await Cart.findByIdAndRemove(cartId);
    
        if (!cart) {
          return res.status(404).json({ error: 'cart not found' });
        }
    
        res.json({ message: 'Cart deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function checkoutCart(cartId, res){
  try {
    
    // Find the Cart by ID 
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'cart not found' });
    }
    for (const pro of cart.products) {
      const stringProductId = pro.product.toString();
      const product = await Product.findOne({ _id: stringProductId });
      if (product) {
    
        const updatedQuantity = product.quantity - pro.quantity;    
        const updatedProduct = await Product.findByIdAndUpdate(
          product._id,
          { quantity: updatedQuantity },
          { new: true }
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
      }
    }
    res.json({ message: 'Order placed Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
    createCart,
    patchCart,
    deleteCart,
    getAllCarts,
    checkoutCart
}
