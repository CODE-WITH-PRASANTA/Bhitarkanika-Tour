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

    const name = (req.body.name || req.body.fullName || '').trim();
    if (!name) {
      res.status(400);
      throw new Error('Customer name is required');
    }

    const email = (req.body.email || '').trim();
    const phone = (req.body.phone || req.body.mobile || '').trim();
    const homeTown = (req.body.homeTown || req.body.city || '').trim();
    const aadhar = (req.body.aadhar || req.body.passport || '').trim();
    const subject = (req.body.subject || '').trim();
    const tour = (req.body.tour || req.body.service || '').trim() || subject || 'General Enquiry';

    let message = (req.body.message || '').trim();
    const metaParts = [];
    if (homeTown && !message.includes(homeTown)) metaParts.push(`Home Town: ${homeTown}`);
    if (aadhar && !message.includes(aadhar)) metaParts.push(`ID / Aadhaar: ${aadhar}`);
    if (metaParts.length > 0) {
      message = message ? `${metaParts.join(' | ')} — ${message}` : metaParts.join(' | ');
    }

    const item = await Enquiry.create({
      name,
      email,
      phone,
      homeTown,
      aadhar,
      subject: subject || `Enquiry for ${tour}`,
      message,
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
