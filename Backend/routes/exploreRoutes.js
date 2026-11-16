const express = require('express');
const exploreController = require('../controllers/exploreController');

const router = express.Router();

router
  .route('/')
  .get(exploreController.getAll)
  .post(exploreController.create);

router.post('/bulk-delete', exploreController.bulkDelete);

router
  .route('/:id')
  .get(exploreController.getById)
  .put(exploreController.update)
  .delete(exploreController.remove);

module.exports = router;
