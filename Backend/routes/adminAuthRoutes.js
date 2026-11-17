const express = require('express');
const router = express.Router();
const {
  adminLogin,
  getAdminMe,
  adminLogout,
} = require('../controllers/adminAuthController');
const { protectAdmin } = require('../middleware/adminAuth');

router.post('/login', adminLogin);
router.get('/me', protectAdmin, getAdminMe);
router.post('/logout', adminLogout);

module.exports = router;
