const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Content = require('../models/Content');
const { protect, editorAccess } = require('../middleware/auth');

/**
 * @route   GET /api/content
 * @desc    Get all content sections
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const contents = await Content.find({ isActive: true }).sort({ section: 1 });

        res.json({
            success: true,
            count: contents.length,
            data: contents
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching content'
        });
    }
});

/**
 * @route   GET /api/content/:section
 * @desc    Get single content section
 * @access  Public
 */
router.get('/:section', async (req, res) => {
    try {
        const content = await Content.findOne({ 
            section: req.params.section,
            isActive: true
        });

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content section not found'
            });
        }

        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching content'
        });
    }
});

/**
 * @route   POST /api/content
 * @desc    Create content section
 * @access  Private
 */
router.post('/', protect, editorAccess, [
    body('section').notEmpty().withMessage('Section is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const content = new Content(req.body);
        await content.save();

        res.status(201).json({
            success: true,
            message: 'Content created successfully',
            data: content
        });
    } catch (error) {
        console.error('Error creating content:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating content'
        });
    }
});

/**
 * @route   PUT /api/content/:section
 * @desc    Update content section
 * @access  Private
 */
router.put('/:section', protect, editorAccess, async (req, res) => {
    try {
        const content = await Content.findOneAndUpdate(
            { section: req.params.section },
            req.body,
            { new: true, runValidators: true, upsert: true }
        );

        res.json({
            success: true,
            message: 'Content updated successfully',
            data: content
        });
    } catch (error) {
        console.error('Error updating content:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating content'
        });
    }
});

/**
 * @route   DELETE /api/content/:section
 * @desc    Delete content section (soft delete)
 * @access  Private
 */
router.delete('/:section', protect, editorAccess, async (req, res) => {
    try {
        const content = await Content.findOneAndUpdate(
            { section: req.params.section },
            { isActive: false },
            { new: true }
        );

        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'Content section not found'
            });
        }

        res.json({
            success: true,
            message: 'Content deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting content:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting content'
        });
    }
});

module.exports = router;

