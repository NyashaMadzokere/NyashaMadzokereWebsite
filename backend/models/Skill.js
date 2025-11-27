const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Shopify', 'Frontend', 'Backend', 'Tools', 'Other']
    },
    percentage: {
        type: Number,
        required: [true, 'Percentage is required'],
        min: 0,
        max: 100
    },
    icon: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for faster queries
SkillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', SkillSchema);

