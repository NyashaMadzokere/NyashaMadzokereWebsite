const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { protect, adminOnly } = require('../middleware/auth');

// ========================
// Email Configuration
// ========================

const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

// ========================
// Validation Rules
// ========================

const contactValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters')
        .escape(),
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    body('subject')
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Subject must be between 5 and 200 characters')
        .escape(),
    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters')
        .escape()
];

// ========================
// Routes
// ========================

/**
 * @route   POST /api/contact
 * @desc    Send contact form email
 * @access  Public
 */
router.post('/', contactValidation, async (req, res) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, email, subject, message } = req.body;

        // Save to database (optional)
        const contact = new Contact({
            name,
            email,
            subject,
            message,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        await contact.save();

        // Send email
        const transporter = createTransporter();

        // Email to you (website owner)
        const mailToOwner = {
            from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #96bf48 0%, #5c8a2e 100%); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <h2 style="color: #333;">Contact Details</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; font-weight: bold; width: 100px;">Name:</td>
                                <td style="padding: 10px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; font-weight: bold;">Email:</td>
                                <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; font-weight: bold;">Subject:</td>
                                <td style="padding: 10px;">${subject}</td>
                            </tr>
                        </table>
                        
                        <h2 style="color: #333; margin-top: 30px;">Message</h2>
                        <div style="background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #96bf48;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                        
                        <p style="margin-top: 30px; color: #666; font-size: 12px;">
                            Received: ${new Date().toLocaleString()}<br>
                            IP Address: ${req.ip}
                        </p>
                    </div>
                    <div style="background: #333; padding: 20px; text-align: center; color: white; font-size: 12px;">
                        <p>This email was sent from your portfolio contact form</p>
                    </div>
                </div>
            `
        };

        // Auto-reply email to sender
        const mailToSender = {
            from: `"Nyasha Madzokere" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Thank you for contacting me - ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #96bf48 0%, #5c8a2e 100%); padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0;">Thank You!</h1>
                    </div>
                    <div style="padding: 30px; background: #f9f9f9;">
                        <p style="font-size: 16px; color: #333;">Hi ${name},</p>
                        <p style="font-size: 14px; color: #666; line-height: 1.6;">
                            Thank you for reaching out! I've received your message and will get back to you as soon as possible, 
                            typically within 24-48 hours.
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #96bf48;">
                            <h3 style="margin-top: 0; color: #333;">Your Message:</h3>
                            <p style="color: #666;"><strong>Subject:</strong> ${subject}</p>
                            <p style="color: #666;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        
                        <p style="font-size: 14px; color: #666; line-height: 1.6;">
                            In the meantime, feel free to check out my portfolio or connect with me on social media.
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.FRONTEND_URL}" 
                               style="background: #96bf48; color: white; padding: 12px 30px; 
                                      text-decoration: none; border-radius: 5px; display: inline-block;">
                                Visit My Portfolio
                            </a>
                        </div>
                    </div>
                    <div style="background: #333; padding: 20px; text-align: center; color: white; font-size: 12px;">
                        <p style="margin: 5px 0;">Nyasha Madzokere - Shopify Developer</p>
                        <p style="margin: 5px 0;">${process.env.FRONTEND_URL}</p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(mailToOwner);
        await transporter.sendMail(mailToSender);

        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully! I\'ll get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later or contact me directly via email.'
        });
    }
});

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions (protected - for admin)
 * @access  Private
 */
router.get('/', protect, adminOnly, async (req, res) => {
    try {
        // Debug logging
        console.log('Fetching contacts - User:', req.user.email, 'Role:', req.user.role);
        
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(100);

        console.log(`Found ${contacts.length} contact submissions`);

        res.json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            success: false,
            message: 'Error fetching contact submissions',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;

