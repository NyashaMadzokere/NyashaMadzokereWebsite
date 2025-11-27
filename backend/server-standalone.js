/**
 * Standalone Server with MongoDB Connection
 * Use this file if you want to run the backend with database support
 */

const app = require('./server');
const connectDB = require('./config/database');

// Connect to database
connectDB();

// The server.js file already handles starting the server
// This file just adds the database connection

