const crypto = require('crypto');
const AdminUser = require('../models/AdminUser');

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'f47e77afe975fd6173e9a35fa24edeae5056d522f622bffb043d029ab43f1ebe';

/**
 * Admin cookie security options
 */
const getAdminCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
});

/**
 * Generate a cryptographically signed session token for Admin.
 */
const generateAdminToken = (admin) => {
  const payload = {
    adminId: admin._id.toString(),
    userId: admin.userId,
    email: admin.email,
    role: admin.role || 'superadmin',
    isAdmin: true,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days validity
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
};

/**
 * Verify signed token and decode payload.
 */
const verifyAdminToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadStr, signature] = parts;
  const expectedSig = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadStr)
    .digest('base64url');

  try {
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);
    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(payloadStr, 'base64url').toString('utf8')
    );
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch (err) {
    return null;
  }
};

/**
 * Middleware: Protect Admin Routes
 */
const protectAdmin = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.btk_admin_token) {
      token = req.cookies.btk_admin_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Admin authorization required. Please log in to admin panel.',
      });
    }

    const decoded = verifyAdminToken(token);
    if (!decoded || !decoded.adminId || !decoded.isAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired admin session. Please log in again.',
      });
    }

    const admin = await AdminUser.findById(decoded.adminId);
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Admin user no longer exists or has been deactivated.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdminCookieOptions,
  generateAdminToken,
  verifyAdminToken,
  protectAdmin,
};
