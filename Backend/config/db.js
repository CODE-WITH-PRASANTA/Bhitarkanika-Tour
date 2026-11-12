const mongoose = require('mongoose');

/**
 * Connect to MongoDB using MONGO_URI from environment variables.
 * Logs a warning instead of exiting if MongoDB is not running locally,
 * allowing the HTTP server to start and serve health checks.
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bhitarkanika_tour';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`MongoDB connection warning: ${error.message}`);
  }
};

module.exports = connectDB;

