const BlogCategory = require('../models/BlogCategory');

const createSlug = (name = '') =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

/**
 * Get all blog categories (supports ?active=true).
 */
const getAllCategories = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    if (req.query.active === 'false') filter.isActive = false;

    const categories = await BlogCategory.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single blog category by ID.
 */
const getCategoryById = async (req, res, next) => {
  try {
    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new blog category.
 */
const createCategory = async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    if (!name) {
      res.status(400);
      throw new Error('Category name is required');
    }

    const slug = createSlug(name);
    const existing = await BlogCategory.findOne({
      $or: [{ name: new RegExp(`^${name}$`, 'i') }, { slug }],
    });

    if (existing) {
      res.status(409);
      throw new Error('A category with this name already exists');
    }

    const category = await BlogCategory.create({
      name,
      slug,
      description: req.body.description?.trim() || '',
      isActive: req.body.isActive !== undefined ? Boolean(req.body.isActive) : true,
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Update an existing blog category.
 */
const updateCategory = async (req, res, next) => {
  try {
    const existing = await BlogCategory.findById(req.params.id);
    if (!existing) {
      res.status(404);
      throw new Error('Category not found');
    }

    const name = req.body.name !== undefined ? req.body.name.trim() : existing.name;
    if (!name) {
      res.status(400);
      throw new Error('Category name is required');
    }

    const slug = createSlug(name);
    const duplicate = await BlogCategory.findOne({
      _id: { $ne: req.params.id },
      $or: [{ name: new RegExp(`^${name}$`, 'i') }, { slug }],
    });

    if (duplicate) {
      res.status(409);
      throw new Error('Another category with this name already exists');
    }

    const updated = await BlogCategory.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug,
        description:
          req.body.description !== undefined
            ? req.body.description.trim()
            : existing.description,
        isActive:
          req.body.isActive !== undefined
            ? Boolean(req.body.isActive)
            : existing.isActive,
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
 * Toggle or set active status of a blog category.
 */
const toggleCategoryStatus = async (req, res, next) => {
  try {
    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    category.isActive =
      req.body?.isActive !== undefined
        ? Boolean(req.body.isActive)
        : !category.isActive;

    await category.save();
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a blog category.
 */
const deleteCategory = async (req, res, next) => {
  try {
    const deleted = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Category not found');
    }
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
};

