const express = require('express');
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../controllers/testimonialController');
const { uploadTestimonialImage } = require('../middleware/upload');

const router = express.Router();

router.route('/').get(getAll).post(uploadTestimonialImage, create);
router
  .route('/:id')
  .get(getById)
  .put(uploadTestimonialImage, update)
  .delete(remove);

module.exports = router;
