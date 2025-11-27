const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

/**
 * @route   POST /api/analytics/pageview
 * @desc    Track page view
 * @access  Public
 */
router.post('/pageview', async (req, res) => {
    try {
        const { page, referrer } = req.body;

        const analytics = new Analytics({
            type: 'pageview',
            page: page || '/',
            referrer: referrer || 'direct',
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        await analytics.save();

        res.status(201).json({
            success: true,
            message: 'Page view tracked'
        });
    } catch (error) {
        console.error('Error tracking page view:', error);
        res.status(500).json({
            success: false,
            message: 'Error tracking page view'
        });
    }
});

/**
 * @route   GET /api/analytics/stats
 * @desc    Get analytics statistics
 * @access  Private (TODO: Add auth middleware)
 */
router.get('/stats', async (req, res) => {
    try {
        const { days = 30 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        // Total page views
        const totalViews = await Analytics.countDocuments({
            type: 'pageview',
            createdAt: { $gte: startDate }
        });

        // Page views by page
        const viewsByPage = await Analytics.aggregate([
            {
                $match: {
                    type: 'pageview',
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: '$page',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        // Views by day
        const viewsByDay = await Analytics.aggregate([
            {
                $match: {
                    type: 'pageview',
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Top referrers
        const topReferrers = await Analytics.aggregate([
            {
                $match: {
                    type: 'pageview',
                    createdAt: { $gte: startDate },
                    referrer: { $ne: 'direct' }
                }
            },
            {
                $group: {
                    _id: '$referrer',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            }
        ]);

        res.json({
            success: true,
            data: {
                totalViews,
                viewsByPage,
                viewsByDay,
                topReferrers
            }
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics'
        });
    }
});

module.exports = router;

