const Category = require('../schema/category.schema');

async function createCategory(category){
    // Create a new Category
    const newCategory = new Category(category);
    const saveCategory = await newCategory.save();
    if(saveCategory){
        const {id, name, level} = saveCategory;
        return {id, name, level}
    }
}

async function getAllCategory(res){
    try {
        // Fetch all categories from the database
        const categories = await Category.find();
        return categories;
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
async function patchCategory(categoryId, updatedFields, res){
    try {    
        // Find the Category by ID and update the fields
        const category = await Category.findByIdAndUpdate(categoryId, updatedFields, { new: true });
    
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
    
        res.json(category);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function deleteCategory(categoryId, res){
    try {
    
        // Find the category by ID and remove it
        const category = await Category.findByIdAndRemove(categoryId);
    
        if (!category) {
          return res.status(404).json({ error: 'category not found' });
        }
    
        res.json({ message: 'Category deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = {
    createCategory,
    patchCategory,
    deleteCategory,
    getAllCategory
}
