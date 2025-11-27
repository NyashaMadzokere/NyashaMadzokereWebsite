const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
const Content = require('../models/Content');
const connectDB = require('../config/database');

const defaultContent = [
    {
        section: 'hero',
        title: 'Shopify Developer',
        subtitle: 'Crafting Exceptional E-commerce Experiences',
        description: 'I transform your e-commerce vision into powerful, scalable Shopify stores. Specializing in custom theme development, app integration, and conversion optimization.',
        content: {
            badge: 'Available for Projects',
            stats: [
                { number: 50, label: 'Projects Completed' },
                { number: 35, label: 'Happy Clients' },
                { number: 5, label: 'Years Experience' }
            ]
        },
        isActive: true
    },
    {
        section: 'about',
        title: 'Bringing Your E-commerce Vision to Life',
        subtitle: 'Expert Shopify Developer with a Passion for E-commerce',
        description: 'With over 5 years of experience in Shopify development, I specialize in creating high-performing, conversion-focused online stores. My expertise spans from custom theme development using Liquid to complex app integrations and API implementations.',
        content: {
            features: [
                'Custom Theme Development',
                'Shopify Plus Expertise',
                'App Development & Integration',
                'Performance Optimization'
            ]
        },
        isActive: true
    },
    {
        section: 'services',
        title: 'What I Can Do For You',
        subtitle: 'Comprehensive Shopify development services to elevate your e-commerce business',
        description: '',
        content: {
            services: [
                {
                    title: 'Custom Theme Development',
                    description: 'Unique, pixel-perfect Shopify themes built from scratch or customized to match your brand identity.',
                    features: ['Liquid templating', 'Mobile-first design', 'SEO optimization']
                },
                {
                    title: 'Store Setup & Migration',
                    description: 'Complete store setup from scratch or seamless migration from other platforms to Shopify.',
                    features: ['Platform migration', 'Data transfer', 'Configuration setup']
                },
                {
                    title: 'App Integration',
                    description: 'Seamless integration of third-party apps and custom solutions to extend your store\'s functionality.',
                    features: ['API integration', 'Custom apps', 'Automation setup']
                }
            ]
        },
        isActive: true
    },
    {
        section: 'contact',
        title: 'Let\'s Build Something Amazing',
        subtitle: 'Ready to take your Shopify store to the next level? Let\'s discuss your project',
        description: 'Feel free to reach out through any of these channels. I typically respond within 24 hours.',
        content: {
            email: 'nyasha@example.com',
            phone: '+1 (234) 567-890',
            location: 'Available Worldwide',
            social: {
                github: 'https://github.com/nyashamadzokere',
                linkedin: 'https://linkedin.com/in/nyashamadzokere',
                twitter: 'https://twitter.com/nyashamadzokere',
                dribbble: 'https://dribbble.com/nyashamadzokere'
            }
        },
        isActive: true
    }
];

async function seedContent() {
    try {
        await connectDB();
        console.log('🌱 Seeding content sections...');

        for (const content of defaultContent) {
            await Content.findOneAndUpdate(
                { section: content.section },
                content,
                { upsert: true, new: true }
            );
            console.log(`✅ ${content.section} section seeded`);
        }

        console.log('🎉 Content seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding content:', error);
        process.exit(1);
    }
}

seedContent();

