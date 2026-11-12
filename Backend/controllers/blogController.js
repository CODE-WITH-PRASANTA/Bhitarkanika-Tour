const mongoose = require('mongoose');
const Blog = require('../models/Blog');

const makeSlug = (text = '') =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'blog-post';

const ensureUniqueSlug = async (title, excludeId = null) => {
  const base = makeSlug(title);
  let candidate = base;
  let counter = 1;

  while (true) {
    const query = excludeId
      ? { slug: candidate, _id: { $ne: excludeId } }
      : { slug: candidate };
    const exists = await Blog.findOne(query).select('_id');
    if (!exists) return candidate;
    counter += 1;
    candidate = `${base}-${counter}`;
  }
};

const buildFileUrl = (req, filename) =>
  `${req.protocol}://${req.get('host')}/uploads/blogs/${filename}`;

const parseArrayField = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value !== 'string' || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [value];
  } catch {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

const parseBoolean = (value, defaultValue = true) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return defaultValue;
};

const ensureBlogHasSlug = async (blog) => {
  if (!blog) return blog;
  if (!blog.slug && blog.title) {
    blog.slug = await ensureUniqueSlug(blog.title, blog._id);
    await blog.save();
  }
  return blog;
};

/**
 * Get all blogs (optionally filtered by ?published=true|false).
 */
const getAllBlogs = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.published === 'true') filter.published = true;
    if (req.query.published === 'false') filter.published = false;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    for (const b of blogs) {
      if (!b.slug && b.title) {
        b.slug = await ensureUniqueSlug(b.title, b._id);
        await b.save();
      }
    }
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

/**
 * Get only published blogs for the public frontend.
 */
const getPublishedBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    for (const b of blogs) {
      if (!b.slug && b.title) {
        b.slug = await ensureUniqueSlug(b.title, b._id);
        await b.save();
      }
    }
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single blog by ID.
 */
const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }
    await ensureBlogHasSlug(blog);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single blog by slug (or ID fallback).
 */
const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const query = mongoose.Types.ObjectId.isValid(slug)
      ? { $or: [{ slug }, { _id: slug }] }
      : { slug };

    const blog = await Blog.findOne(query);
    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }
    await ensureBlogHasSlug(blog);
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new blog post (supports multipart/form-data with image uploads or JSON).
 */
const createBlog = async (req, res, next) => {
  try {
    const uploadedMain = req.files?.mainImage?.[0];
    const uploadedContent = req.files?.contentImages || [];

    const mainImage = uploadedMain
      ? buildFileUrl(req, uploadedMain.filename)
      : req.body.mainImage;

    if (!mainImage) {
      res.status(400);
      throw new Error('Main image is required');
    }

    const existingContentImages = parseArrayField(req.body.contentImages);
    const newContentImages = uploadedContent.map((file) =>
      buildFileUrl(req, file.filename)
    );

    const slug = await ensureUniqueSlug(req.body.title);

    const blog = await Blog.create({
      title: req.body.title,
      slug,
      description: req.body.description,
      location: req.body.location,
      idealSeason: req.body.idealSeason,
      category: req.body.category,
      quote: req.body.quote || '',
      tags: parseArrayField(req.body.tags),
      mainImage,
      contentImages: [...existingContentImages, ...newContentImages],
      published: parseBoolean(req.body.published, true),
      date: req.body.date || new Date().toISOString().slice(0, 10),
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Update an existing blog post by ID.
 */
const updateBlog = async (req, res, next) => {
  try {
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    const uploadedMain = req.files?.mainImage?.[0];
    const uploadedContent = req.files?.contentImages || [];

    const mainImage = uploadedMain
      ? buildFileUrl(req, uploadedMain.filename)
      : req.body.mainImage || existingBlog.mainImage;

    const existingContentImages =
      req.body.existingContentImages !== undefined
        ? parseArrayField(req.body.existingContentImages)
        : req.body.contentImages !== undefined
          ? parseArrayField(req.body.contentImages)
          : existingBlog.contentImages;

    const newContentImages = uploadedContent.map((file) =>
      buildFileUrl(req, file.filename)
    );

    const updates = {
      title: req.body.title ?? existingBlog.title,
      slug:
        req.body.title && req.body.title !== existingBlog.title
          ? await ensureUniqueSlug(req.body.title, existingBlog._id)
          : existingBlog.slug || (await ensureUniqueSlug(existingBlog.title, existingBlog._id)),
      description: req.body.description ?? existingBlog.description,
      location: req.body.location ?? existingBlog.location,
      idealSeason: req.body.idealSeason ?? existingBlog.idealSeason,
      category: req.body.category ?? existingBlog.category,
      quote: req.body.quote ?? existingBlog.quote,
      tags:
        req.body.tags !== undefined
          ? parseArrayField(req.body.tags)
          : existingBlog.tags,
      mainImage,
      contentImages: [...existingContentImages, ...newContentImages],
      published: parseBoolean(req.body.published, existingBlog.published),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Toggle or set the published status of a blog post.
 */
const togglePublish = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    blog.published =
      req.body?.published !== undefined
        ? parseBoolean(req.body.published, !blog.published)
        : !blog.published;

    await blog.save();
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a blog post by ID.
 */
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }
    res.status(200).json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  togglePublish,
  deleteBlog,
};
