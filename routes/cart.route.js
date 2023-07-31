const express = require("express");
const router = express.Router();
const cartService = require('../services/cart.service');
// get all carts
router.get("/", async (req, res) => {
  try {
    // Fetch all carts from the database
    const carts = await cartService.getAllCarts(res);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create cart and validate token
router.post("/", async (req, res) => {
  try {
    const { date, totalQuantity, totalPrice, products,userId } = req.body;
    const savedCart = await cartService.createCart({
      date,
      totalQuantity,
      totalPrice,
      products,
      userId
    });
    res.json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete cart api
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await cartService.deleteCart(id, res);
  res.send("cart deleted");
});

// patch/update cart api
router.patch("/:id", async (req, res) => {
  const cartId = req.params.id;
  const updatedFields = req.body;
  const updatedCart = await cartService.patchCart(cartId, updatedFields, res);
  res.send(updatedCart);
});

router.get('/:cartId/checkout', async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const checkout = await cartService.checkoutCart(cartId, res);
    res.json(checkout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  
})

module.exports = router;
