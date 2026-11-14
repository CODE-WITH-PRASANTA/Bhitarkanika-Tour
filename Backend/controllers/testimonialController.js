const Testimonial = require('../models/Testimonial');

const buildFileUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/testimonials/${filename}`;

/**
 * Get all testimonials from database.
 */
const getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single testimonial by ID.
 */
const getById = async (req, res, next) => {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Testimonial not found');
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new testimonial (supports file upload or image URL).
 */
const create = async (req, res, next) => {
  try {
    const body = { ...req.body };

    if (req.file) {
      body.image = buildFileUrl(req, req.file.filename);
    }

    if (!body.image) {
      body.image = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&h=160&q=80";
    }

    if (typeof body.isVerified === 'string') {
      body.isVerified = body.isVerified === 'true';
    }

    if (body.rating) {
      body.rating = Number(body.rating);
    }

    const item = await Testimonial.create(body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Update an existing testimonial.
 */
const update = async (req, res, next) => {
  try {
    const body = { ...req.body };

    if (req.file) {
      body.image = buildFileUrl(req, req.file.filename);
    }

    if (typeof body.isVerified === 'string') {
      body.isVerified = body.isVerified === 'true';
    }

    if (body.rating) {
      body.rating = Number(body.rating);
    }

    const item = await Testimonial.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      res.status(404);
      throw new Error('Testimonial not found');
    }

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Remove testimonial.
 */
const remove = async (req, res, next) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Testimonial not found');
    }
    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
