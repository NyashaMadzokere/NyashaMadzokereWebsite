const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import models
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Blog = require('../models/Blog');

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Sample Projects Data
const projects = [
    {
        title: 'Luxury Fashion Store',
        category: 'Fashion E-commerce',
        description: 'Custom Shopify Plus theme with advanced filtering and size recommendation engine',
        longDescription: 'Built a fully custom Shopify Plus store for a luxury fashion brand featuring advanced product filtering, size recommendation AI, virtual try-on integration, and seamless checkout experience. Optimized for mobile and achieved 98+ performance score.',
        tags: ['Liquid', 'JavaScript', 'Shopify Plus'],
        technologies: ['Liquid', 'JavaScript', 'CSS3', 'Shopify Plus', 'GraphQL'],
        featured: true,
        published: true,
        order: 1
    },
    {
        title: 'Organic Skincare Brand',
        category: 'Beauty & Wellness',
        description: 'Minimalist design with subscription model and personalized product recommendations',
        longDescription: 'Created a clean, minimalist e-commerce experience with ReCharge subscription integration, personalized product quiz, and custom recommendation algorithm based on skin type and concerns.',
        tags: ['Theme Dev', 'Recharge', 'Custom App'],
        technologies: ['Liquid', 'React', 'Node.js', 'ReCharge API'],
        featured: true,
        published: true,
        order: 2
    },
    {
        title: 'Custom Jewelry Store',
        category: 'Jewelry',
        description: 'Interactive 3D product viewer with customization options and real-time pricing',
        longDescription: 'Developed an innovative jewelry customization experience with Three.js 3D product viewer, real-time price calculator, and custom engraving preview. Integrated with Shopify API for seamless inventory management.',
        tags: ['Three.js', 'Custom Build', 'API'],
        technologies: ['Three.js', 'JavaScript', 'Shopify API', 'WebGL'],
        featured: true,
        published: true,
        order: 3
    },
    {
        title: 'Modern Furniture Store',
        category: 'Home Decor',
        description: 'Headless Shopify with Next.js frontend for blazing fast performance',
        longDescription: 'Built a headless commerce solution using Shopify Storefront API and Next.js, achieving sub-second page loads and 100/100 Lighthouse scores. Features include AR furniture preview and room visualization.',
        tags: ['Headless', 'Next.js', 'Storefront API'],
        technologies: ['Next.js', 'React', 'TypeScript', 'Storefront API', 'Vercel'],
        featured: true,
        published: true,
        order: 4
    }
];

// Sample Skills Data
const skills = [
    // Shopify Category
    { name: 'Liquid Templating', category: 'Shopify', percentage: 95, icon: 'fab fa-shopify', order: 1 },
    { name: 'Theme Development', category: 'Shopify', percentage: 90, icon: 'fas fa-paint-brush', order: 2 },
    { name: 'Shopify CLI', category: 'Shopify', percentage: 85, icon: 'fas fa-terminal', order: 3 },
    
    // Frontend Category
    { name: 'JavaScript/ES6+', category: 'Frontend', percentage: 90, icon: 'fab fa-js', order: 1 },
    { name: 'React & Next.js', category: 'Frontend', percentage: 85, icon: 'fab fa-react', order: 2 },
    { name: 'HTML5 & CSS3', category: 'Frontend', percentage: 95, icon: 'fab fa-html5', order: 3 },
    
    // Backend Category
    { name: 'Node.js & Express', category: 'Backend', percentage: 80, icon: 'fab fa-node', order: 1 },
    { name: 'GraphQL & REST APIs', category: 'Backend', percentage: 85, icon: 'fas fa-code', order: 2 },
    { name: 'MongoDB', category: 'Backend', percentage: 75, icon: 'fas fa-database', order: 3 },
    
    // Tools Category
    { name: 'Git & GitHub', category: 'Tools', percentage: 90, icon: 'fab fa-git-alt', order: 1 },
    { name: 'VS Code', category: 'Tools', percentage: 95, icon: 'fas fa-code', order: 2 },
    { name: 'Figma', category: 'Tools', percentage: 80, icon: 'fab fa-figma', order: 3 }
];

// Sample Blog Posts Data
const blogs = [
    {
        title: '10 Essential Shopify Liquid Filters Every Developer Should Know',
        slug: '10-essential-shopify-liquid-filters-every-developer-should-know',
        excerpt: 'Master these powerful Liquid filters to create more dynamic and efficient Shopify themes. From formatting dates to manipulating strings, these filters will level up your theme development.',
        content: `# 10 Essential Shopify Liquid Filters Every Developer Should Know

Master these powerful Liquid filters to create more dynamic and efficient Shopify themes. From formatting dates to manipulating strings, these filters will level up your theme development.

## 1. Date Filter

The date filter is crucial for formatting dates in a user-friendly way:

\`\`\`liquid
{{ product.created_at | date: "%B %d, %Y" }}
\`\`\`

This will output dates like "November 20, 2024" instead of raw timestamps.

## 2. Money Filter

Properly formatting prices is essential for e-commerce:

\`\`\`liquid
{{ product.price | money }}
\`\`\`

Automatically formats prices with currency symbol and proper decimals.

## 3. Truncate Filter

Limit text length for previews and excerpts:

\`\`\`liquid
{{ product.description | truncate: 100 }}
\`\`\`

Perfect for product cards and list views.

## 4. Strip HTML Filter

Remove HTML tags from content:

\`\`\`liquid
{{ product.description | strip_html }}
\`\`\`

Useful when you need plain text.

## 5. Capitalize Filter

Capitalize the first letter:

\`\`\`liquid
{{ product.type | capitalize }}
\`\`\`

## 6. Downcase/Upcase Filters

Convert text case:

\`\`\`liquid
{{ product.vendor | downcase }}
{{ product.title | upcase }}
\`\`\`

## 7. Replace Filter

Replace text within strings:

\`\`\`liquid
{{ product.title | replace: 'Shop', 'Store' }}
\`\`\`

## 8. Size Filter

Get the length of arrays or strings:

\`\`\`liquid
{{ product.images | size }}
{{ product.title | size }}
\`\`\`

## 9. First/Last Filters

Get first or last item from arrays:

\`\`\`liquid
{{ product.images | first }}
{{ product.tags | last }}
\`\`\`

## 10. Join Filter

Join array elements with a separator:

\`\`\`liquid
{{ product.tags | join: ', ' }}
\`\`\`

## Conclusion

These filters are just the beginning. Liquid offers many more powerful filters to help you build dynamic, efficient Shopify themes. Master these, and you'll be well on your way to becoming a Shopify development expert!`,
        category: 'Shopify',
        tags: ['Liquid', 'Shopify', 'Development'],
        readTime: 5,
        published: true,
        featured: true,
        publishedDate: new Date('2024-11-20')
    },
    {
        title: 'Building a Headless Shopify Store with Next.js and Storefront API',
        slug: 'building-a-headless-shopify-store-with-nextjs-and-storefront-api',
        excerpt: 'Learn how to build blazing-fast e-commerce experiences using Shopify\'s Storefront API with Next.js. Step-by-step guide with code examples and best practices.',
        content: `# Building a Headless Shopify Store with Next.js and Storefront API

Learn how to build blazing-fast e-commerce experiences using Shopify's Storefront API with Next.js. Step-by-step guide with code examples and best practices.

## Why Headless?

Headless commerce is revolutionizing the e-commerce landscape. By decoupling the frontend from Shopify's theme system, you gain:

- **Performance**: Lightning-fast page loads
- **Flexibility**: Use any frontend framework
- **Modern Stack**: Latest web technologies
- **Better SEO**: Server-side rendering capabilities

## Getting Started

First, install the necessary packages:

\`\`\`bash
npm install @shopify/storefront-api-client
npm install next react react-dom
\`\`\`

## Setting Up Storefront API

Create a Storefront API client:

\`\`\`javascript
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: 'your-store.myshopify.com',
  apiVersion: '2024-01',
  publicAccessToken: 'your-storefront-access-token'
});
\`\`\`

## Fetching Products

Query products using GraphQL:

\`\`\`javascript
const query = \`
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
\`;

const { data } = await client.request(query);
\`\`\`

## Building the Frontend

Create your Next.js pages and components to display products, handle cart, and process checkout.

[Continue reading for full implementation...]`,
        category: 'Development',
        tags: ['Next.js', 'Headless', 'React', 'Storefront API'],
        readTime: 8,
        published: true,
        featured: true,
        publishedDate: new Date('2024-11-18')
    },
    {
        title: 'Conversion Rate Optimization: 7 Proven Strategies for Shopify Stores',
        slug: 'conversion-rate-optimization-7-proven-strategies-for-shopify-stores',
        excerpt: 'Boost your online store\'s conversion rate with these data-driven strategies. Learn how to optimize product pages, checkout flow, and user experience for maximum sales.',
        content: `# Conversion Rate Optimization: 7 Proven Strategies for Shopify Stores

Boost your online store's conversion rate with these data-driven strategies. Learn how to optimize product pages, checkout flow, and user experience for maximum sales.

## Strategy 1: Optimize Product Pages

Your product pages are where conversions happen. Ensure they have:

- High-quality images
- Clear product descriptions
- Social proof (reviews, ratings)
- Clear call-to-action buttons
- Trust badges

## Strategy 2: Simplify Checkout

Reduce friction in the checkout process:

- Guest checkout option
- Progress indicators
- Multiple payment options
- Clear shipping information

[Continue reading for all 7 strategies...]`,
        category: 'E-commerce',
        tags: ['CRO', 'UX', 'Sales', 'Optimization'],
        readTime: 6,
        published: true,
        featured: false,
        publishedDate: new Date('2024-11-15')
    },
    {
        title: 'Complete Guide to Shopify Theme Sections: From Basics to Advanced',
        slug: 'complete-guide-to-shopify-theme-sections-from-basics-to-advanced',
        excerpt: 'Deep dive into Shopify theme sections. Learn how to create reusable, customizable sections that empower merchants to build their perfect store without touching code.',
        content: `# Complete Guide to Shopify Theme Sections: From Basics to Advanced

Deep dive into Shopify theme sections. Learn how to create reusable, customizable sections that empower merchants to build their perfect store without touching code.

## Understanding Sections

Theme sections are the building blocks of modern Shopify themes. They allow merchants to customize their store without touching code.

## Basic Section Structure

\`\`\`liquid
{% schema %}
{
  "name": "My Section",
  "settings": [
    {
      "type": "text",
      "id": "title",
      "label": "Title",
      "default": "Hello World"
    }
  ]
}
{% endschema %}
\`\`\`

## Advanced Features

Learn about:
- Section groups
- Presets
- Dynamic sections
- Section blocks

[Full tutorial content...]`,
        category: 'Tutorials',
        tags: ['Sections', 'Theme Dev', 'Tutorial', 'Shopify'],
        readTime: 12,
        published: true,
        featured: false,
        publishedDate: new Date('2024-11-12')
    },
    {
        title: '5 Quick Wins to Speed Up Your Shopify Store Today',
        slug: '5-quick-wins-to-speed-up-your-shopify-store-today',
        excerpt: 'Simple optimizations that make a big difference. Learn how to improve your store\'s performance score without complex technical knowledge. Actionable tips you can implement now.',
        content: `# 5 Quick Wins to Speed Up Your Shopify Store Today

Simple optimizations that make a big difference. Learn how to improve your store's performance score without complex technical knowledge. Actionable tips you can implement now.

## 1. Optimize Images

Compress and resize images before uploading:

- Use WebP format when possible
- Compress images with tools like TinyPNG
- Use appropriate image sizes (don't upload 4000px images for thumbnails)

## 2. Minimize Apps

Too many apps slow down your store:

- Remove unused apps
- Combine functionality when possible
- Test app impact on speed

## 3. Enable Lazy Loading

Lazy load images and videos:

\`\`\`liquid
<img src="{{ image | img_url: '800x' }}" loading="lazy" alt="{{ image.alt }}">
\`\`\`

## 4. Use CDN

Enable Shopify's CDN for faster asset delivery.

## 5. Minimize Custom Code

Review and optimize custom JavaScript and CSS.

[Full guide with more tips...]`,
        category: 'Tips & Tricks',
        tags: ['Performance', 'Optimization', 'Quick Tips'],
        readTime: 4,
        published: true,
        featured: true,
        publishedDate: new Date('2024-11-10')
    },
    {
        title: 'Mobile-First Design for Shopify: Why It Matters and How to Do It',
        slug: 'mobile-first-design-for-shopify-why-it-matters-and-how-to-do-it',
        excerpt: 'With over 70% of e-commerce traffic coming from mobile devices, mobile-first design isn\'t optional. Learn best practices for creating mobile-optimized Shopify experiences.',
        content: `# Mobile-First Design for Shopify: Why It Matters and How to Do It

With over 70% of e-commerce traffic coming from mobile devices, mobile-first design isn't optional. Learn best practices for creating mobile-optimized Shopify experiences.

## Why Mobile-First?

Mobile commerce is dominating the e-commerce landscape. Here's why mobile-first matters:

- **70%+ of traffic** comes from mobile devices
- **Better user experience** on all devices
- **Improved SEO** rankings
- **Higher conversion rates**

## Best Practices

### 1. Touch-Friendly Buttons

Make buttons at least 44x44 pixels for easy tapping.

### 2. Simplified Navigation

Use hamburger menus and simplified navigation structures.

### 3. Optimized Images

Serve appropriately sized images for mobile devices.

### 4. Fast Loading

Optimize for mobile network speeds.

[Complete mobile-first guide...]`,
        category: 'Shopify',
        tags: ['Mobile', 'Responsive', 'Design', 'UX'],
        readTime: 7,
        published: true,
        featured: false,
        publishedDate: new Date('2024-11-08')
    }
];

// Seed function
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seed...');

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await Blog.deleteMany({});
        console.log('✅ Cleared existing data');

        // Insert projects
        const createdProjects = await Project.insertMany(projects);
        console.log(`✅ Created ${createdProjects.length} projects`);

        // Insert skills
        const createdSkills = await Skill.insertMany(skills);
        console.log(`✅ Created ${createdSkills.length} skills`);

        // Insert blog posts
        const createdBlogs = await Blog.insertMany(blogs);
        console.log(`✅ Created ${createdBlogs.length} blog posts`);

        console.log('');
        console.log('🎉 Database seeded successfully!');
        console.log('');
        console.log('Sample data:');
        console.log(`- ${createdProjects.length} projects`);
        console.log(`- ${createdSkills.length} skills`);
        console.log(`- ${createdBlogs.length} blog posts`);
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run seed
seedDatabase();

