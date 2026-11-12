const express = require('express');
const {
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  togglePublish,
  deleteBlog,
} = require('../controllers/blogController');
const { uploadBlogImages } = require('../middleware/upload');

const router = express.Router();

router.get('/published', getPublishedBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.route('/').get(getAllBlogs).post(uploadBlogImages, createBlog);
router.patch('/:id/publish', togglePublish);
router
  .route('/:id')
  .get(getBlogById)
  .put(uploadBlogImages, updateBlog)
  .delete(deleteBlog);

module.exports = router;
