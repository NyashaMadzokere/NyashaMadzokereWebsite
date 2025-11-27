const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['pageview', 'click', 'form_submit', 'download'],
        default: 'pageview'
    },
    page: {
        type: String,
        required: true
    },
    referrer: {
        type: String,
        default: 'direct'
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    sessionId: {
        type: String
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

// Indexes for analytics queries
AnalyticsSchema.index({ type: 1, createdAt: -1 });
AnalyticsSchema.index({ page: 1, createdAt: -1 });
AnalyticsSchema.index({ createdAt: -1 });

// TTL index to automatically delete old analytics data after 90 days
AnalyticsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });

module.exports = mongoose.model('Analytics', AnalyticsSchema);

