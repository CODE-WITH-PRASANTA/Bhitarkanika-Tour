const Gallery = require('../models/Gallery');

const buildGalleryFileUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/gallery/${filename}`;

/**
 * Get all gallery photographs.
 */
const getAllGallery = async (req, res, next) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single gallery photograph by ID.
 */
const getGalleryById = async (req, res, next) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Gallery photograph not found');
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new gallery photograph (supports multipart/form-data or JSON).
 */
const createGallery = async (req, res, next) => {
  try {
    const image = req.file
      ? buildGalleryFileUrl(req, req.file.filename)
      : req.body.image;

    if (!image) {
      res.status(400);
      throw new Error('Gallery image is required');
    }

    const item = await Gallery.create({
      title: req.body.title,
      category: req.body.category,
      location: req.body.location,
      image,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Update an existing gallery photograph by ID.
 */
const updateGallery = async (req, res, next) => {
  try {
    const existing = await Gallery.findById(req.params.id);
    if (!existing) {
      res.status(404);
      throw new Error('Gallery photograph not found');
    }

    const image = req.file
      ? buildGalleryFileUrl(req, req.file.filename)
      : req.body.image || existing.image;

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title ?? existing.title,
        category: req.body.category ?? existing.category,
        location: req.body.location ?? existing.location,
        image,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Delete a gallery photograph by ID.
 */
const deleteGallery = async (req, res, next) => {
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Gallery photograph not found');
    }
    res.status(200).json({ success: true, message: 'Gallery photograph deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};
