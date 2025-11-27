const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');
const { protect, editorAccess } = require('../middleware/auth');

// ========================
// Validation Rules
// ========================

const blogValidation = [
    body('title')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    body('excerpt')
        .trim()
        .isLength({ min: 10, max: 300 })
        .withMessage('Excerpt must be between 10 and 300 characters'),
    body('content')
        .trim()
        .isLength({ min: 100 })
        .withMessage('Content must be at least 100 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
];

// ========================
// Public Routes
// ========================

/**
 * @route   GET /api/blog
 * @desc    Get all blog posts
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { 
            category, 
            tag,
            featured, 
            search,
            limit = 10, 
            page = 1,
            sort = '-publishedDate'
        } = req.query;
        
        // Build query for published posts only
        const query = { published: true };
        
        if (category) query.category = category;
        if (featured) query.featured = featured === 'true';
        if (tag) query.tags = tag;
        if (search) {
            query.$text = { $search: search };
        }

        // Execute query with pagination
        const blogs = await Blog.find(query)
            .select('-content') // Exclude full content for list view
            .sort(sort)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Blog.countDocuments(query);

        res.json({
            success: true,
            count: blogs.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching blog posts'
        });
    }
});

/**
 * @route   GET /api/blog/featured
 * @desc    Get featured blog posts
 * @access  Public
 */
router.get('/featured', async (req, res) => {
    try {
        const { limit = 3 } = req.query;
        
        const blogs = await Blog.find({ published: true, featured: true })
            .select('-content')
            .sort('-publishedDate')
            .limit(parseInt(limit));

        res.json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching featured blogs:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching featured blog posts'
        });
    }
});

/**
 * @route   GET /api/blog/categories
 * @desc    Get all blog categories with post counts
 * @access  Public
 */
router.get('/categories', async (req, res) => {
    try {
        const categories = await Blog.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            success: true,
            count: categories.length,
            data: categories.map(cat => ({
                category: cat._id,
                count: cat.count
            }))
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories'
        });
    }
});

/**
 * @route   GET /api/blog/tags
 * @desc    Get all blog tags
 * @access  Public
 */
router.get('/tags', async (req, res) => {
    try {
        const tags = await Blog.aggregate([
            { $match: { published: true } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ]);

        res.json({
            success: true,
            count: tags.length,
            data: tags.map(tag => ({
                tag: tag._id,
                count: tag.count
            }))
        });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tags'
        });
    }
});

/**
 * @route   GET /api/blog/:slug
 * @desc    Get single blog post by slug
 * @access  Public
 */
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ 
            slug: req.params.slug,
            published: true 
        });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        // Increment view count
        blog.views += 1;
        await blog.save();

        // Get related posts (same category, exclude current)
        const relatedPosts = await Blog.find({
            published: true,
            category: blog.category,
            _id: { $ne: blog._id }
        })
        .select('-content')
        .limit(3)
        .sort('-publishedDate');

        res.json({
            success: true,
            data: blog,
            related: relatedPosts
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching blog post'
        });
    }
});

/**
 * @route   POST /api/blog/:id/like
 * @desc    Like a blog post
 * @access  Public
 */
router.post('/:id/like', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            likes: blog.likes
        });
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({
            success: false,
            message: 'Error liking blog post'
        });
    }
});

// ========================
// Admin Routes (TODO: Add authentication middleware)
// ========================

/**
 * @route   POST /api/blog
 * @desc    Create new blog post
 * @access  Private
 */
router.post('/', protect, editorAccess, blogValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const blog = new Blog(req.body);
        await blog.save();

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating blog post'
        });
    }
});

/**
 * @route   PUT /api/blog/:id
 * @desc    Update blog post
 * @access  Private
 */
router.put('/:id', protect, editorAccess, blogValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            message: 'Blog post updated successfully',
            data: blog
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating blog post'
        });
    }
});

/**
 * @route   DELETE /api/blog/:id
 * @desc    Delete blog post
 * @access  Private
 */
router.delete('/:id', protect, editorAccess, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog post not found'
            });
        }

        res.json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting blog post'
        });
    }
});

module.exports = router;

