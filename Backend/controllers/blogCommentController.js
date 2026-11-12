const BlogComment = require('../models/BlogComment');
const Blog = require('../models/Blog');

const makeInitials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'U';

/**
 * Get all blog comments (for Admin Panel).
 */
const getAllComments = async (req, res, next) => {
  try {
    const comments = await BlogComment.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get approved comments for a specific blog by blogId.
 */
const getCommentsByBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const comments = await BlogComment.find({
      blogId,
      status: 'Approved',
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new comment on a blog post, preventing duplicate submissions.
 */
const createComment = async (req, res, next) => {
  try {
    const { blogId, name, email, message } = req.body;

    if (!blogId || !name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400);
      throw new Error('Blog ID, name, email, and comment message are required');
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      res.status(404);
      throw new Error('Blog not found');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedMessage = message.trim();

    // Prevent duplicate comment by the same email & message on the same blog
    const duplicate = await BlogComment.findOne({
      blogId: blog._id,
      email: normalizedEmail,
      message: new RegExp(
        `^${trimmedMessage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
        'i'
      ),
    });

    if (duplicate) {
      res.status(409);
      throw new Error('You have already posted this comment on this blog.');
    }

    const comment = await BlogComment.create({
      blogId: blog._id,
      blogTitle: blog.title,
      blogSlug: blog.slug || String(blog._id),
      name: name.trim(),
      email: normalizedEmail,
      message: trimmedMessage,
      initials: makeInitials(name),
      status: 'Pending',
    });

    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Update comment status (Approved / Pending / Spam).
 */
const updateCommentStatus = async (req, res, next) => {
  try {
    const comment = await BlogComment.findById(req.params.id);
    if (!comment) {
      res.status(404);
      throw new Error('Comment not found');
    }

    if (req.body.status) {
      comment.status = req.body.status;
    }

    await comment.save();

    // Sync approved comments count to parent blog
    const approvedCount = await BlogComment.countDocuments({
      blogId: comment.blogId,
      status: 'Approved',
    });
    await Blog.findByIdAndUpdate(comment.blogId, { comments: approvedCount });

    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Delete a blog comment by ID.
 */
const deleteComment = async (req, res, next) => {
  try {
    const deleted = await BlogComment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Comment not found');
    }

    // Sync approved comments count to parent blog
    const approvedCount = await BlogComment.countDocuments({
      blogId: deleted.blogId,
      status: 'Approved',
    });
    await Blog.findByIdAndUpdate(deleted.blogId, { comments: approvedCount });

    res.status(200).json({ success: true, message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllComments,
  getCommentsByBlog,
  createComment,
  updateCommentStatus,
  deleteComment,
};

