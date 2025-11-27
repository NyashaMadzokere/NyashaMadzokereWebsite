const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protect routes - verify JWT token
 */
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // Check if token exists
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route. Please login.'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET || 'your-secret-key-change-in-production'
            );

            // Get user from token
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'Your account has been deactivated'
                });
            }

            // Add user to request object
            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token. Please login again.'
            });
        }

    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication error'
        });
    }
};

/**
 * Admin only access
 */
exports.adminOnly = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated. Please login.'
        });
    }
    
    if (req.user.role === 'admin') {
        next();
    } else {
        console.log('Admin access denied - User:', req.user.email, 'Role:', req.user.role);
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin only. Your role: ' + req.user.role
        });
    }
};

/**
 * Admin or Editor access
 */
exports.editorAccess = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'editor')) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: 'Access denied. Admin or Editor access required.'
        });
    }
};

