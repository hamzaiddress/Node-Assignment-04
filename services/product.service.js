const Product = require('../schema/product.schema');

async function createProduct(product){
    // Create a new Product
    const newProduct = new Product(product);
    const saveProduct = await newProduct.save();
    if(saveProduct){
        const {id, title, description, price, quantity, category} = saveProduct;
        return {id, title, description, price, quantity, category}
    }
}

async function findProductByName(productName, res){
    try {
      const regex = new RegExp(productName, 'i');
        // Filter product from data base
        const products = await Product.findOne({title:regex, quantity: { $gt: 0 }});
        return products;
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function getAllProducts(res){
    try {
        // Fetch all products from the database
        const products = await Product.find().populate('category');
        return products;
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function patchProduct(productId, updatedFields, res){
    try {    
        // Find the Product by ID and update the fields
        const product = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
    
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function deleteProduct(productId, res){
    try {
    
        // Find the product by ID and remove it
        const product = await Product.findByIdAndRemove(productId);
    
        if (!product) {
          return res.status(404).json({ error: 'product not found' });
        }
    
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    createProduct,
    patchProduct,
    deleteProduct,
    getAllProducts,
    findProductByName
}
