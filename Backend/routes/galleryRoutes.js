const express = require('express');
const {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require('../controllers/galleryController');
const { uploadGalleryImage } = require('../middleware/upload');

const router = express.Router();

router.route('/').get(getAllGallery).post(uploadGalleryImage, createGallery);
router
  .route('/:id')
  .get(getGalleryById)
  .put(uploadGalleryImage, updateGallery)
  .delete(deleteGallery);

module.exports = router;
