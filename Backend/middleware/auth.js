const crypto = require('crypto');
const User = require('../models/User');

const SECRET_KEY =
  process.env.JWT_SECRET ||
  'f47e77afe975fd6173e9a35fa24edeae5056d522f622bffb043d029ab43f1ebe';

/**
 * Cookie security options
 */
const getAuthCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: '/',
});

/**
 * Generate a cryptographically signed HMAC-SHA256 session token.
 */
const generateToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role || 'user',
    iat: Date.now(),
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days validity
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadStr)
    .digest('base64url');

  return `${payloadStr}.${signature}`;
};

/**
 * Verify signed token using timing-safe comparison and decode payload.
 */
const verifyToken = (token) => {
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
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadStr, 'base64url').toString('utf8')
    );
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
};

/**
 * Extract token from httpOnly cookie or Authorization Bearer header.
 */
const extractToken = (req) => {
  if (req.cookies && req.cookies.btk_token) {
    return req.cookies.btk_token;
  }
  if (req.signedCookies && req.signedCookies.btk_token) {
    return req.signedCookies.btk_token;
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

/**
 * Express middleware to authenticate requests (rejects if unauthenticated).
 */
const protect = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Please log in.',
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token. Please log in again.',
    });
  }

  try {
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user account for this session no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Optional authentication: Populates req.user if a valid token is present,
 * but allows guest users to proceed without error.
 */
const optionalAuth = async (req, res, next) => {
  const token = extractToken(req);
  if (!token) return next();

  const decoded = verifyToken(token);
  if (!decoded) return next();

  try {
    const user = await User.findById(decoded.userId).select('-password');
    if (user) req.user = user;
  } catch (err) {
    // Ignore and proceed as guest
  }
  next();
};

/**
 * Restrict route access to specific roles (e.g. 'admin').
 */
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to perform this action.',
      });
    }
    next();
  };
};

module.exports = {
  generateToken,
  verifyToken,
  protect,
  optionalAuth,
  authorizeRole,
  getAuthCookieOptions,
};
