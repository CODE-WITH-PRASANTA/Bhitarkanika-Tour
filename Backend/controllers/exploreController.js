const Explore = require('../models/Explore');

/**
 * Get all explore items
 * @route GET /api/explores
 */
const getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }
    if (req.query.published !== undefined && req.query.published !== 'all') {
      filter.published = req.query.published === 'true' || req.query.published === true;
    }
    if (req.query.search) {
      const q = req.query.search.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { shortDesc: { $regex: q, $options: 'i' } },
        { fullDesc: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ];
    }

    const items = await Explore.find(filter).sort({ createdAt: -1 });
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
 * Get single explore item by ID
 * @route GET /api/explores/:id
 */
const getById = async (req, res, next) => {
  try {
    const item = await Explore.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Explore item not found' });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * Helper to normalize fields
 */
const normalizeExploreData = (body) => {
  const data = { ...body };
  if (!data.shortDesc && data.description) {
    data.shortDesc = data.description;
  }
  if (!data.description) {
    data.description = data.fullDesc || data.shortDesc || '';
  }
  if (!data.image && data.imageUrl) {
    data.image = data.imageUrl;
  }
  if (!data.imageUrl && data.image) {
    data.imageUrl = data.image;
  }
  return data;
};

/**
 * Create new explore item
 * @route POST /api/explores
 */
const create = async (req, res, next) => {
  try {
    const normalized = normalizeExploreData(req.body);
    const item = await Explore.create(normalized);
    res.status(201).json({
      success: true,
      message: 'Explore item created successfully',
      data: item,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Update explore item
 * @route PUT /api/explores/:id
 */
const update = async (req, res, next) => {
  try {
    const normalized = normalizeExploreData(req.body);
    const item = await Explore.findByIdAndUpdate(req.params.id, normalized, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Explore item not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Explore item updated successfully',
      data: item,
    });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

/**
 * Delete single explore item
 * @route DELETE /api/explores/:id
 */
const remove = async (req, res, next) => {
  try {
    const item = await Explore.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Explore item not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Explore item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk delete explore items
 * @route POST /api/explores/bulk-delete
 */
const bulkDelete = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: 'No item IDs provided for deletion' });
    }
    const result = await Explore.deleteMany({ _id: { $in: ids } });
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} explore item(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
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
  bulkDelete,
};
