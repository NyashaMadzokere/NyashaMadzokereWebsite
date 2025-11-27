const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        enum: [
            'Fashion E-commerce',
            'Beauty & Wellness',
            'Jewelry',
            'Home Decor',
            'Electronics',
            'Food & Beverage',
            'Sports & Fitness',
            'Other'
        ]
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    longDescription: {
        type: String,
        maxlength: [2000, 'Long description cannot be more than 2000 characters']
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    tags: [{
        type: String,
        trim: true
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    liveUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    completedDate: {
        type: Date
    },
    client: {
        name: String,
        website: String,
        testimonial: String
    }
}, {
    timestamps: true
});

// Create slug from title before saving
ProjectSchema.pre('save', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    }
    next();
});

// Indexes
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ published: 1 });
ProjectSchema.index({ order: 1 });

module.exports = mongoose.model('Project', ProjectSchema);

