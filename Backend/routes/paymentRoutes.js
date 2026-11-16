const express = require('express');
const {
  createOrder,
  verifyPayment,
  recordPaymentFailure,
  requestRefund,
  getMyRefunds,
  getAllRefundsAdmin,
  updateRefundStatusAdmin,
} = require('../controllers/paymentController');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Order creation & payment verification with optional user binding
router.post('/create-order', optionalAuth, createOrder);
router.post('/verify-payment', optionalAuth, verifyPayment);
router.post('/payment-failed', optionalAuth, recordPaymentFailure);

// User-specific refund requests (protected routes)
router.post('/request-refund', protect, requestRefund);
router.get('/my-refunds', protect, getMyRefunds);

// Admin-specific refund management routes
router.get('/admin-refunds', getAllRefundsAdmin);
router.put('/admin-refunds/:id', updateRefundStatusAdmin);

module.exports = router;
