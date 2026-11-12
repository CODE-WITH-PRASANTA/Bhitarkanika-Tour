const Enquiry = require('../models/Enquiry');

/**
 * Get all enquiries sorted newest first.
 */
const getAll = async (req, res, next) => {
  try {
    const items = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single enquiry by ID.
 */
const getById = async (req, res, next) => {
  try {
    const item = await Enquiry.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Enquiry not found');
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new enquiry from the Contact page or Admin Panel.
 */
const create = async (req, res, next) => {
  try {
    const now = new Date();
    const defaultDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const defaultTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const subject = (req.body.subject || '').trim();
    const tour = (req.body.tour || '').trim() || subject || 'General Enquiry';

    const item = await Enquiry.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      subject,
      message: req.body.message || '',
      tour,
      start: req.body.start || 'Not set',
      end: req.body.end || 'Not set',
      travelers: Math.max(1, Number(req.body.travelers) || 1),
      status: req.body.status || 'New',
      date: req.body.date || defaultDate,
      time: req.body.time || defaultTime,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    if (res.statusCode === 200) res.status(400);
    next(error);
  }
};

/**
 * Update an enquiry by ID.
 */
const update = async (req, res, next) => {
  try {
    const existing = await Enquiry.findById(req.params.id);
    if (!existing) {
      res.status(404);
      throw new Error('Enquiry not found');
    }

    const updated = await Enquiry.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name ?? existing.name,
        email: req.body.email ?? existing.email,
        phone: req.body.phone ?? existing.phone,
        subject: req.body.subject ?? existing.subject,
        message: req.body.message ?? existing.message,
        tour: req.body.tour ?? existing.tour,
        start: req.body.start ?? existing.start,
        end: req.body.end ?? existing.end,
        travelers:
          req.body.travelers !== undefined
            ? Math.max(1, Number(req.body.travelers) || 1)
            : existing.travelers,
        status: req.body.status ?? existing.status,
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
 * Delete an enquiry by ID.
 */
const remove = async (req, res, next) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404);
      throw new Error('Enquiry not found');
    }
    res.status(200).json({ success: true, message: 'Enquiry deleted' });
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
