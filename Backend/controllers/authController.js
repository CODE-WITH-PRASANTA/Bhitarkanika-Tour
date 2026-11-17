const User = require('../models/User');
const { generateToken, getAuthCookieOptions } = require('../middleware/auth');

/**
 * Format safe user object for response (no passwords).
 */
const formatUser = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone || '',
  avatar: user.avatar || '',
  role: user.role || 'user',
  authProvider: user.authProvider || 'local',
  createdAt: user.createdAt,
});

/**
 * Helper to safely decode Google ID Token payload if credential string passed
 */
const decodeGoogleJwt = (credential) => {
  try {
    const parts = credential.split('.');
    if (parts.length >= 2) {
      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString('utf8')
      );
      return payload;
    }
  } catch (err) {
    console.error('Error decoding Google JWT:', err);
  }
  return null;
};

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email address, and a password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in.',
      });
    }

    const user = new User({
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      authProvider: 'local',
    });

    user.setPassword(password);
    await user.save();

    const token = generateToken(user);
    res.cookie('btk_token', token, getAuthCookieOptions());

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Sign in user
 * @route  POST /api/auth/login
 * @access Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter your email and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. No account found with this email.',
      });
    }

    if (!user.password && user.authProvider === 'google') {
      return res.status(400).json({
        success: false,
        message: 'This account was created with Google. Please use Continue with Google.',
      });
    }

    const isMatch = user.verifyPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user);
    res.cookie('btk_token', token, getAuthCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Sign in or register with Google OAuth
 * @route  POST /api/auth/google
 * @access Public
 */
const googleLogin = async (req, res, next) => {
  try {
    const { credential, accessToken, code, redirectUri, email, name, picture, googleId } = req.body;

    let userEmail = email;
    let userName = name;
    let userPicture = picture;
    let userGoogleId = googleId;

    // 1. If authorization code was passed from OAuth popup / redirect flow
    if (code) {
      try {
        const tokenParams = new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          redirect_uri: redirectUri || 'postmessage',
          grant_type: 'authorization_code',
        });

        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: tokenParams.toString(),
        });

        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          if (tokenData.access_token) {
            const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            if (userRes.ok) {
              const profile = await userRes.json();
              userEmail = profile.email || userEmail;
              userName = profile.name || userName;
              userPicture = profile.picture || userPicture;
              userGoogleId = profile.sub || userGoogleId;
            }
          } else if (tokenData.id_token) {
            const decoded = decodeGoogleJwt(tokenData.id_token);
            if (decoded) {
              userEmail = decoded.email || userEmail;
              userName = decoded.name || userName;
              userPicture = decoded.picture || userPicture;
              userGoogleId = decoded.sub || userGoogleId;
            }
          }
        } else {
          console.error('Google token exchange error:', await tokenRes.text());
        }
      } catch (err) {
        console.error('Error exchanging Google code:', err);
      }
    }

    // 2. If OAuth2 access token was passed from Google GIS token client
    if (accessToken && !userEmail) {
      try {
        const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (userRes.ok) {
          const profile = await userRes.json();
          userEmail = profile.email || userEmail;
          userName = profile.name || userName;
          userPicture = profile.picture || userPicture;
          userGoogleId = profile.sub || userGoogleId;
        }
      } catch (err) {
        console.error('Error verifying Google access token:', err);
      }
    }

    // 3. If credential JWT (ID token) was passed from Google Identity Services button
    if (credential && !userEmail) {
      try {
        const tokenRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        if (tokenRes.ok) {
          const tokenInfo = await tokenRes.json();
          userEmail = tokenInfo.email || userEmail;
          userName = tokenInfo.name || userName;
          userPicture = tokenInfo.picture || userPicture;
          userGoogleId = tokenInfo.sub || userGoogleId;
        } else {
          const decoded = decodeGoogleJwt(credential);
          if (decoded) {
            userEmail = decoded.email || userEmail;
            userName = decoded.name || userName;
            userPicture = decoded.picture || userPicture;
            userGoogleId = decoded.sub || userGoogleId;
          }
        }
      } catch (err) {
        const decoded = decodeGoogleJwt(credential);
        if (decoded) {
          userEmail = decoded.email || userEmail;
          userName = decoded.name || userName;
          userPicture = decoded.picture || userPicture;
          userGoogleId = decoded.sub || userGoogleId;
        }
      }
    }

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'Could not obtain email from Google account.',
      });
    }

    const cleanEmail = userEmail.toLowerCase().trim();
    const queryConditions = [{ email: cleanEmail }];
    if (userGoogleId && typeof userGoogleId === 'string' && userGoogleId.trim().length > 0) {
      queryConditions.push({ googleId: userGoogleId.trim() });
    }
    let user = await User.findOne({ $or: queryConditions });

    if (user) {
      // Update avatar or googleId if not stored
      let changed = false;
      if (!user.googleId && userGoogleId) {
        user.googleId = userGoogleId;
        changed = true;
      }
      if (!user.avatar && userPicture) {
        user.avatar = userPicture;
        changed = true;
      }
      if (!user.authProvider || user.authProvider === 'local') {
        user.authProvider = 'google';
        changed = true;
      }
      if (changed) await user.save();
    } else {
      // Create new user via Google
      user = await User.create({
        name: userName || cleanEmail.split('@')[0],
        email: cleanEmail,
        avatar: userPicture || '',
        googleId: userGoogleId || '',
        authProvider: 'google',
      });
    }

    const token = generateToken(user);
    res.cookie('btk_token', token, getAuthCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Google authentication successful!',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Initiate forgot password (generate OTP)
 * @route  POST /api/auth/forgot-password
 * @access Public
 */
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email address.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address.',
      });
    }

    const otp = user.generateResetOtp();
    await user.save();

    console.log(`\n========================================`);
    console.log(`[PASSWORD RESET OTP] For ${cleanEmail}: ${otp}`);
    console.log(`========================================\n`);

    res.status(200).json({
      success: true,
      message: 'A 6-digit verification code has been generated.',
      otp, // included for seamless development/testing
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Reset password using OTP
 * @route  POST /api/auth/reset-password
 * @access Public
 */
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email, 6-digit verification code, and new password.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail }).select(
      '+resetPasswordOtp +resetPasswordExpire'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.',
      });
    }

    const isValid = user.verifyResetOtp(otp);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code. Please request a new one.',
      });
    }

    user.setPassword(newPassword);
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You are now signed in.',
      token,
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get current user profile
 * @route  GET /api/auth/me
 * @access Private
 */
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: formatUser(req.user),
  });
};

/**
 * @desc   Update logged-in user profile details
 * @route  PUT /api/auth/profile
 * @access Private
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (avatar) user.avatar = avatar.trim();

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: formatUser(user),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Change user password
 * @route  PUT /api/auth/change-password
 * @access Private
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // If local account with password, verify current password
    if (user.password && currentPassword) {
      if (!user.verifyPassword(currentPassword)) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect.',
        });
      }
    }

    user.setPassword(newPassword);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully!',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Sign out user (clear session cookie)
 * @route  POST /api/auth/logout
 * @access Public / Authenticated
 */
const logout = async (req, res) => {
  res.clearCookie('btk_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

module.exports = {
  register,
  login,
  googleLogin,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
  changePassword,
};

