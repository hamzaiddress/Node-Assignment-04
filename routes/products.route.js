const express = require("express");
const router = express.Router();
const productService = require('../services/product.service');
const isAdmin = require('../middlewear/isAdmin.middlewear');
const auth = require('../middlewear/jwt.middlewear');
//create product and validate is Admin
router.post("/search", auth.verifyToken, async (req, res) => {
  try {
    const { productName } = req.body;
    const productList = await productService.findProductByName(
      productName);
    res.json(productList);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// get all products
router.get("/", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create product and validate is Admin
router.post("/", isAdmin.checkIsAdmin, async (req, res) => {
  try {
    const { title, description, quantity, price, category } = req.body;
    const savedProduct = await productService.createProduct({
      title,
      description,
      quantity,
      price,
      category
    });
    res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete product api and check isAdmin
router.delete("/:id", isAdmin.checkIsAdmin, async (req, res) => {
  const id = req.params.id;
  await productService.deleteProduct(id, res);
  res.send("product deleted");
});

// patch/update product api and check is admin
router.patch("/:id", isAdmin.checkIsAdmin, async (req, res) => {
  const productId = req.params.id;
  const updatedFields = req.body;
  const updatedProduct = await productService.patchProduct(productId, updatedFields, res);
  res.send(updatedProduct);
});

module.exports = router;
