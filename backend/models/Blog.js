const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: [true, 'Excerpt is required'],
        trim: true,
        maxlength: [300, 'Excerpt cannot be more than 300 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Shopify',
            'Development',
            'E-commerce',
            'Tutorials',
            'Tips & Tricks',
            'Case Studies',
            'News',
            'Other'
        ]
    },
    tags: [{
        type: String,
        trim: true
    }],
    featuredImage: {
        type: String,
        default: ''
    },
    author: {
        name: {
            type: String,
            default: 'Nyasha Madzokere'
        },
        bio: String,
        avatar: String
    },
    readTime: {
        type: Number,
        default: 5
    },
    published: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    publishedDate: {
        type: Date
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        author: String,
        email: String,
        content: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        approved: {
            type: Boolean,
            default: false
        }
    }],
    seo: {
        metaTitle: String,
        metaDescription: String,
        keywords: [String],
        ogImage: String
    }
}, {
    timestamps: true
});

// Create slug from title before saving
BlogSchema.pre('save', function(next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    }
    
    // Set published date if publishing for first time
    if (this.isModified('published') && this.published && !this.publishedDate) {
        this.publishedDate = new Date();
    }
    
    // Calculate read time based on content (average 200 words per minute)
    if (this.content && (!this.readTime || this.isModified('content'))) {
        const wordCount = this.content.split(/\s+/).length;
        this.readTime = Math.ceil(wordCount / 200);
    }
    
    next();
});

// Virtual for URL
BlogSchema.virtual('url').get(function() {
    return `/blog/${this.slug}`;
});

// Indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ published: 1, publishedDate: -1 });
BlogSchema.index({ featured: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ createdAt: -1 });

// Text index for search
BlogSchema.index({ 
    title: 'text', 
    excerpt: 'text', 
    content: 'text', 
    tags: 'text' 
});

module.exports = mongoose.model('Blog', BlogSchema);

