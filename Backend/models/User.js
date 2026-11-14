const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        'Please enter a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      select: false, // Don't return password hash by default
    },
    avatar: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    resetPasswordOtp: {
      type: String,
      select: false,
    },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

// Method to set password with PBKDF2 hash
userSchema.methods.setPassword = function (password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  this.password = `${salt}:${hash}`;
};

// Method to verify password
userSchema.methods.verifyPassword = function (password) {
  if (!this.password) return false;
  const parts = this.password.split(':');
  if (parts.length !== 2) return false;
  const [salt, storedHash] = parts;
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return hash === storedHash;
};

// Method to generate OTP for password reset
userSchema.methods.generateResetOtp = function () {
  // 6-digit random code
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  this.resetPasswordOtp = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  return otp;
};

// Method to verify OTP
userSchema.methods.verifyResetOtp = function (otp) {
  if (!this.resetPasswordOtp || !this.resetPasswordExpire) return false;
  if (Date.now() > this.resetPasswordExpire.getTime()) return false;
  const hashedInput = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');
  return this.resetPasswordOtp === hashedInput;
};

module.exports = mongoose.model('User', userSchema);

