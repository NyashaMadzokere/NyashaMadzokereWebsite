const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const { protect, editorAccess } = require('../middleware/auth');

/**
 * @route   GET /api/skills
 * @desc    Get all skills
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, order: 1 });

        res.json({
            success: true,
            count: skills.length,
            data: skills
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skills'
        });
    }
});

/**
 * @route   PUT /api/skills
 * @desc    Update all skills (bulk update)
 * @access  Private
 */
router.put('/', protect, editorAccess, async (req, res) => {
    try {
        const { skills } = req.body;

        if (!Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: 'Skills must be an array'
            });
        }

        // Delete all existing skills
        await Skill.deleteMany({});

        // Insert new skills
        const createdSkills = await Skill.insertMany(skills);

        res.json({
            success: true,
            message: 'Skills updated successfully',
            data: createdSkills
        });
    } catch (error) {
        console.error('Error updating skills:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating skills'
        });
    }
});

module.exports = router;

