const AdminUser = require('../models/AdminUser');
const {
  generateAdminToken,
  getAdminCookieOptions,
} = require('../middleware/adminAuth');

const formatAdmin = (admin) => ({
  _id: admin._id,
  id: admin._id,
  userId: admin.userId,
  name: admin.name || 'Sanctuary Administrator',
  email: admin.email,
  role: admin.role || 'superadmin',
  avatar: admin.avatar || '',
  lastLogin: admin.lastLogin,
  createdAt: admin.createdAt,
});

/**
 * Ensures the static admin credentials specified in .env always exist in MongoDB.
 */
const seedStaticAdmin = async () => {
  try {
    const staticUserId = (process.env.ADMIN_USER_ID || 'admin').toLowerCase().trim();
    const staticEmail = (process.env.ADMIN_EMAIL || 'admin@bhitarkanikatour.in').toLowerCase().trim();
    const staticPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const staticName = process.env.ADMIN_NAME || 'Sanctuary Administrator';

    let admin = await AdminUser.findOne({
      $or: [{ userId: staticUserId }, { email: staticEmail }],
    }).select('+password');

    if (!admin) {
      admin = new AdminUser({
        userId: staticUserId,
        email: staticEmail,
        name: staticName,
        role: 'superadmin',
        isActive: true,
      });
      admin.setPassword(staticPassword);
      await admin.save();
      console.log(`[ADMIN SEED] Created static admin user: ${staticUserId} (${staticEmail})`);
    } else {
      // Ensure password and active state match env
      let needsSave = false;
      if (!admin.verifyPassword(staticPassword)) {
        admin.setPassword(staticPassword);
        needsSave = true;
      }
      if (!admin.isActive) {
        admin.isActive = true;
        needsSave = true;
      }
      if (admin.userId !== staticUserId) {
        admin.userId = staticUserId;
        needsSave = true;
      }
      if (needsSave) {
        await admin.save();
        console.log(`[ADMIN SEED] Synchronized static admin credentials from .env`);
      }
    }
  } catch (error) {
    console.error('[ADMIN SEED] Error seeding static admin user:', error.message);
  }
};

/**
 * @desc   Admin Login
 * @route  POST /api/admin/login
 * @access Public
 */
const adminLogin = async (req, res, next) => {
  try {
    const { userId, email, username, password } = req.body;
    const identifier = (userId || email || username || '').toLowerCase().trim();

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both Admin User ID / Email and Password.',
      });
    }

    const staticUserId = (process.env.ADMIN_USER_ID || 'admin').toLowerCase().trim();
    const staticEmail = (process.env.ADMIN_EMAIL || 'admin@bhitarkanikatour.in').toLowerCase().trim();
    const staticPassword = process.env.ADMIN_PASSWORD || 'Admin@12345';

    // 1. Check database for existing admin
    let admin = await AdminUser.findOne({
      $or: [{ userId: identifier }, { email: identifier }],
    }).select('+password');

    // 2. If not found or password mismatch, check if matches env static credentials
    const matchesStatic =
      (identifier === staticUserId || identifier === staticEmail) &&
      password === staticPassword;

    if (!admin && matchesStatic) {
      admin = new AdminUser({
        userId: staticUserId,
        email: staticEmail,
        name: process.env.ADMIN_NAME || 'Sanctuary Administrator',
        role: 'superadmin',
        isActive: true,
      });
      admin.setPassword(staticPassword);
      await admin.save();
    } else if (admin && matchesStatic && !admin.verifyPassword(password)) {
      admin.setPassword(staticPassword);
      await admin.save();
    } else if (!admin || !admin.verifyPassword(password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Admin User ID or Password. Access denied.',
      });
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: 'This admin account has been deactivated.',
      });
    }

    // Update last login timestamp
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateAdminToken(admin);
    res.cookie('btk_admin_token', token, getAdminCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Admin authentication successful! Welcome to Command Center.',
      token,
      admin: formatAdmin(admin),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get Current Logged-in Admin Profile
 * @route  GET /api/admin/me
 * @access Private (Admin)
 */
const getAdminMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: formatAdmin(req.admin),
  });
};

/**
 * @desc   Admin Logout
 * @route  POST /api/admin/logout
 * @access Private / Public
 */
const adminLogout = async (req, res) => {
  res.clearCookie('btk_admin_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.status(200).json({
    success: true,
    message: 'Admin successfully logged out.',
  });
};

module.exports = {
  seedStaticAdmin,
  adminLogin,
  getAdminMe,
  adminLogout,
};
