const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    section: {
        type: String,
        required: [true, 'Section name is required'],
        unique: true,
        enum: [
            'hero',
            'about',
            'services',
            'portfolio',
            'skills',
            'contact',
            'footer'
        ]
    },
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    content: {
        type: mongoose.Schema.Types.Mixed, // Can be string, array, or object
        default: {}
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index
ContentSchema.index({ section: 1 });

module.exports = mongoose.model('Content', ContentSchema);

