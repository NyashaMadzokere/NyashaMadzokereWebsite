const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = require('./config/database');
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const projectsRoutes = require('./routes/projects');
const skillsRoutes = require('./routes/skills');
const analyticsRoutes = require('./routes/analytics');
const blogRoutes = require('./routes/blog');
const contentRoutes = require('./routes/content');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// Middleware
// ========================

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:8080',
            process.env.FRONTEND_URL
        ].filter(Boolean);
        
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General API rate limiting
// Skip rate limiting for authenticated requests (they have Authorization header)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    skip: (req) => {
        // Skip rate limiting for authenticated requests (admin users)
        return !!req.headers.authorization;
    }
});
app.use('/api/', limiter);

// Contact form submission rate limiting (only for POST - public submissions)
// This is stricter to prevent spam, but doesn't affect authenticated admin users
const contactSubmissionLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 contact form submissions per hour
    message: 'Too many contact form submissions, please try again later.',
    skip: (req) => {
        // Skip rate limiting for authenticated requests (admin users)
        return !!req.headers.authorization;
    }
});

// Apply strict rate limiting only to POST requests (form submissions)
// GET requests (admin viewing messages) use the general limiter (100 req/15min)
app.post('/api/contact', contactSubmissionLimiter);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ========================
// Routes
// ========================

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/content', contentRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'Shopify Developer Portfolio API',
        version: '1.0.0',
        endpoints: {
            health: 'GET /health',
            contact: 'POST /api/contact',
            projects: {
                getAll: 'GET /api/projects',
                getOne: 'GET /api/projects/:id',
                create: 'POST /api/projects',
                update: 'PUT /api/projects/:id',
                delete: 'DELETE /api/projects/:id'
            },
            blog: {
                getAll: 'GET /api/blog',
                getOne: 'GET /api/blog/:slug',
                getFeatured: 'GET /api/blog/featured',
                getCategories: 'GET /api/blog/categories',
                getTags: 'GET /api/blog/tags',
                like: 'POST /api/blog/:id/like',
                create: 'POST /api/blog',
                update: 'PUT /api/blog/:id',
                delete: 'DELETE /api/blog/:id'
            },
            skills: {
                getAll: 'GET /api/skills',
                update: 'PUT /api/skills'
            },
            analytics: {
                pageView: 'POST /api/analytics/pageview',
                getStats: 'GET /api/analytics/stats'
            }
        }
    });
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========================
// Error Handling
// ========================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found on this server.'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ========================
// Start Server
// ========================

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
    console.log(`📡 Listening on port ${PORT}`);
    console.log(`🌐 API URL: http://localhost:${PORT}/api`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log('='.repeat(50));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    process.exit(1);
});

module.exports = app;

