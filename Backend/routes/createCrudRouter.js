const express = require('express');

/**
 * Create a standard RESTful Express router for a CRUD controller.
 * @param {object} controller
 */
const createCrudRouter = (controller) => {
  const router = express.Router();

  router.route('/').get(controller.getAll).post(controller.create);
  router
    .route('/:id')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.remove);

  return router;
};

module.exports = createCrudRouter;

