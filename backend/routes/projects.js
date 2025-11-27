const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { protect, editorAccess } = require('../middleware/auth');

// ========================
// Validation Rules
// ========================

const projectValidation = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required'),
    body('description')
        .trim()
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),
    body('tags')
        .isArray({ min: 1 })
        .withMessage('At least one tag is required')
];

// ========================
// Routes
// ========================

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const { category, featured, limit = 20, page = 1 } = req.query;
        
        // Build query
        const query = { published: true };
        if (category) query.category = category;
        if (featured) query.featured = featured === 'true';

        // Execute query with pagination
        const projects = await Project.find(query)
            .sort({ order: 1, createdAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        const total = await Project.countDocuments(query);

        res.json({
            success: true,
            count: projects.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching projects'
        });
    }
});

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project
 * @access  Public
 */
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Increment view count
        project.views += 1;
        await project.save();

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching project'
        });
    }
});

/**
 * @route   POST /api/projects
 * @desc    Create new project
 * @access  Private
 */
router.post('/', protect, editorAccess, projectValidation, async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const project = new Project(req.body);
        await project.save();

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating project'
        });
    }
});

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private
 */
router.put('/:id', protect, editorAccess, projectValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating project'
        });
    }
});

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project
 * @access  Private
 */
router.delete('/:id', protect, editorAccess, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting project'
        });
    }
});

/**
 * @route   GET /api/projects/categories/list
 * @desc    Get all unique categories
 * @access  Public
 */
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Project.distinct('category');
        
        res.json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories'
        });
    }
});

module.exports = router;

