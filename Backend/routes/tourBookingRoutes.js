const express = require('express');
const tourBookingController = require('../controllers/tourBookingController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

router.use(optionalAuth);
router.route('/').get(tourBookingController.getAll).post(tourBookingController.create);
router
  .route('/:id')
  .get(tourBookingController.getById)
  .put(tourBookingController.update)
  .delete(tourBookingController.remove);

module.exports = router;
