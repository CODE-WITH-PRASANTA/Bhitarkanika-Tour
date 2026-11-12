const express = require('express');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
} = require('../controllers/blogCategoryController');

const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);
router.patch('/:id/status', toggleCategoryStatus);
router
  .route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;

