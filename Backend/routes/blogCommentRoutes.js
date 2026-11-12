const express = require('express');
const {
  getAllComments,
  getCommentsByBlog,
  createComment,
  updateCommentStatus,
  deleteComment,
} = require('../controllers/blogCommentController');

const router = express.Router();

router.get('/blog/:blogId', getCommentsByBlog);
router.route('/').get(getAllComments).post(createComment);
router.patch('/:id/status', updateCommentStatus);
router.delete('/:id', deleteComment);

module.exports = router;

