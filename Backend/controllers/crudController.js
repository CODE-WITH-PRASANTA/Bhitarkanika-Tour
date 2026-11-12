/**
 * Create standard CRUD controller handlers for a Mongoose model.
 * @param {import('mongoose').Model} Model
 * @param {string} resourceName
 */
const createCrudController = (Model, resourceName) => ({
  getAll: async (req, res, next) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(400);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!item) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      if (res.statusCode === 200) res.status(400);
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      res.status(200).json({ success: true, message: `${resourceName} deleted` });
    } catch (error) {
      next(error);
    }
  },
});

module.exports = createCrudController;

