const express = require("express");
const router = express.Router();
const categoryService = require('../services/category.service');
const isAdmin = require('../middlewear/isAdmin.middlewear');
// get all categories
router.get("/", async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await categoryService.getAllCategory();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create category and validate is Admin
router.post("/", isAdmin.checkIsAdmin, async (req, res) => {
  try {
    const { name, level} = req.body;
    const savedCategory= await categoryService.createCategory({
      name,
      level
    });
    res.json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete category api
router.delete("/:id", isAdmin.checkIsAdmin, async (req, res) => {
  const id = req.params.id;
  await categoryService.deleteCategory(id, res);
  res.send("Category deleted");
});

// patch/update category api
router.patch("/:id", isAdmin.checkIsAdmin, async (req, res) => {
  const categoryId = req.params.id;
  const updatedFields = req.body;
  const updatedCategory = await categoryService.patchCategory(categoryId, updatedFields, res);
  res.send(updatedCategory);
});

module.exports = router;
