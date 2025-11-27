# Customization Guide

This guide will help you customize your portfolio to match your personal brand and showcase your unique work.

## Table of Contents
1. [Quick Customization](#quick-customization)
2. [Colors & Branding](#colors--branding)
3. [Content Updates](#content-updates)
4. [Adding Images](#adding-images)
5. [Advanced Customization](#advanced-customization)

## Quick Customization

### Essential Changes (Do These First!)

#### 1. Personal Information

**In `index.html`, update:**

```html
<!-- Line ~91: Hero Section -->
<h1 class="hero-title">
    <span class="gradient-text">Your Title Here</span>
    <br>Your Tagline
    <br>Goes Here
</h1>

<!-- Line ~95: Description -->
<p class="hero-description">
    Your personal description and value proposition...
</p>

<!-- Lines ~107-119: Statistics -->
<span class="stat-number" data-target="50">0</span> <!-- Change 50 to your number -->
<span class="stat-label">Your Label</span>
```

#### 2. Contact Information

```html
<!-- Line ~790: Email -->
<a href="mailto:your-email@example.com">your-email@example.com</a>

<!-- Line ~798: Phone -->
<a href="tel:+1234567890">+1 (234) 567-890</a>

<!-- Lines ~815-825: Social Media -->
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

#### 3. Meta Tags for SEO

```html
<!-- Lines ~5-7: Basic meta tags -->
<meta name="description" content="Your description">
<meta name="keywords" content="Your, Keywords, Here">
<meta name="author" content="Your Name">

<!-- Lines ~10-14: Open Graph -->
<meta property="og:url" content="https://yoursite.com/">
<meta property="og:title" content="Your Name - Your Title">
<meta property="og:description" content="Your description">
```

## Colors & Branding

### Changing the Color Scheme

Edit `styles.css` starting at line ~3:

```css
:root {
    /* Primary Colors - Change these for your brand */
    --primary-color: #96bf48;      /* Main brand color */
    --secondary-color: #5c8a2e;    /* Secondary color */
    --accent-color: #7fb800;       /* Accent highlights */
    
    /* Or try these alternative color schemes: */
    
    /* Blue Theme */
    /* --primary-color: #3b82f6;
       --secondary-color: #1e40af;
       --accent-color: #60a5fa; */
    
    /* Purple Theme */
    /* --primary-color: #8b5cf6;
       --secondary-color: #6d28d9;
       --accent-color: #a78bfa; */
    
    /* Orange Theme */
    /* --primary-color: #f59e0b;
       --secondary-color: #d97706;
       --accent-color: #fbbf24; */
}
```

### Color Scheme Presets

#### Professional Blue
```css
--primary-color: #2563eb;
--secondary-color: #1e40af;
--accent-color: #3b82f6;
```

#### Modern Purple
```css
--primary-color: #7c3aed;
--secondary-color: #5b21b6;
--accent-color: #8b5cf6;
```

#### Vibrant Orange
```css
--primary-color: #ea580c;
--secondary-color: #c2410c;
--accent-color: #f97316;
```

#### Tech Cyan
```css
--primary-color: #06b6d4;
--secondary-color: #0891b2;
--accent-color: #22d3ee;
```

## Content Updates

### About Section

**Location:** `index.html`, lines ~180-220

Update your personal story:
```html
<h3>Your Headline Here</h3>
<p>
    Your first paragraph about your experience and expertise...
</p>
<p>
    Your second paragraph about your approach and values...
</p>
```

Update your key features:
```html
<div class="feature-item">
    <i class="fas fa-check-circle"></i>
    <span>Your Feature Here</span>
</div>
```

### Services Section

**Location:** `index.html`, lines ~230-360

For each service card, update:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-your-icon"></i> <!-- Change icon -->
    </div>
    <h3>Service Title</h3>
    <p>Service description...</p>
    <ul class="service-features">
        <li>Feature 1</li>
        <li>Feature 2</li>
        <li>Feature 3</li>
    </ul>
</div>
```

**Available Font Awesome Icons:**
- `fa-paint-brush` - Design
- `fa-code` - Development
- `fa-store` - E-commerce
- `fa-mobile-alt` - Mobile
- `fa-chart-line` - Analytics
- `fa-rocket` - Performance
- `fa-cog` - Configuration
- More at: https://fontawesome.com/icons

### Portfolio Projects

**Location:** `index.html`, lines ~370-500

Update each project:
```html
<div class="portfolio-item">
    <div class="portfolio-image">
        <!-- Add your project image -->
        <img src="assets/projects/project1.jpg" alt="Project name">
    </div>
    <div class="portfolio-content">
        <span class="portfolio-category">Category</span>
        <h3>Project Title</h3>
        <p>Project description...</p>
        <div class="portfolio-tags">
            <span>Tech 1</span>
            <span>Tech 2</span>
            <span>Tech 3</span>
        </div>
    </div>
</div>
```

### Skills Section

**Location:** `index.html`, lines ~510-620

Update skill percentages:
```html
<div class="skill-item">
    <div class="skill-info">
        <span>Skill Name</span>
        <span>90%</span> <!-- Change percentage -->
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="90"></div> <!-- Match percentage -->
    </div>
</div>
```

Add/remove technologies:
```html
<div class="tech-icon" title="Technology Name">
    <i class="fab fa-icon-name"></i>
    <span>Tech Name</span>
</div>
```

## Adding Images

### 1. Create Assets Folder

```bash
mkdir assets
mkdir assets/projects
mkdir assets/images
```

### 2. Add Your Images

```
assets/
├── og-image.jpg           (1200x630px for social sharing)
├── favicon.png            (32x32px or 64x64px)
├── apple-touch-icon.png   (180x180px)
├── profile.jpg            (500x500px recommended)
└── projects/
    ├── project1.jpg       (800x600px recommended)
    ├── project2.jpg
    └── project3.jpg
```

### 3. Update Image References

**Profile Image (if adding):**
```html
<!-- In About section -->
<div class="about-image">
    <img src="assets/profile.jpg" alt="Your Name">
</div>
```

**Portfolio Images:**
```html
<div class="portfolio-image">
    <img src="assets/projects/project1.jpg" alt="Project Name">
</div>
```

**Open Graph Image:**
```html
<!-- In <head> section -->
<meta property="og:image" content="https://yoursite.com/assets/og-image.jpg">
```

### Image Optimization Tips

- **Use WebP format** for better compression
- **Compress images** before uploading (use TinyPNG or Squoosh)
- **Use appropriate sizes** - don't upload huge images
- **Add descriptive alt text** for accessibility and SEO

## Advanced Customization

### Adding New Sections

1. **Create HTML structure:**
```html
<section id="your-section" class="your-section">
    <div class="container">
        <div class="section-header">
            <span class="section-tag">Section Tag</span>
            <h2 class="section-title">Section Title</h2>
        </div>
        <!-- Your content here -->
    </div>
</section>
```

2. **Add navigation link:**
```html
<li><a href="#your-section" class="nav-link">Section Name</a></li>
```

3. **Add CSS styling in `styles.css`:**
```css
.your-section {
    padding: 6rem 0;
    background: var(--dark-bg-secondary);
}
```

### Custom Animations

Add to `styles.css`:
```css
@keyframes yourAnimation {
    0% { 
        transform: translateY(0);
        opacity: 1;
    }
    50% { 
        transform: translateY(-10px);
        opacity: 0.8;
    }
    100% { 
        transform: translateY(0);
        opacity: 1;
    }
}

.your-element {
    animation: yourAnimation 2s ease-in-out infinite;
}
```

### Adding Google Analytics

Before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Making the Contact Form Functional

The form currently shows a message but doesn't send emails. To make it work:

**Option 1: Using Formspree (Easiest)**
```html
<form action="https://formspree.io/f/your-form-id" method="POST">
    <!-- Your form fields -->
</form>
```

**Option 2: Using Netlify Forms**
```html
<form name="contact" method="POST" data-netlify="true">
    <!-- Your form fields -->
</form>
```

**Option 3: Using EmailJS**
Add EmailJS SDK and configure in `script.js`. See: https://www.emailjs.com

### Typography Customization

Change fonts in `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;600;700&display=swap" rel="stylesheet">
```

Update in `styles.css`:
```css
:root {
    --font-primary: 'Your Font', sans-serif;
    --font-display: 'Your Display Font', sans-serif;
}
```

### Responsive Breakpoints

Adjust in `styles.css`:
```css
/* Tablet */
@media (max-width: 968px) {
    /* Your styles */
}

/* Mobile */
@media (max-width: 768px) {
    /* Your styles */
}

/* Small mobile */
@media (max-width: 480px) {
    /* Your styles */
}
```

## Testing Your Changes

After making changes:

1. **Test locally** - Open `index.html` in your browser
2. **Check responsive design** - Use browser dev tools
3. **Validate HTML** - https://validator.w3.org
4. **Check SEO** - https://search.google.com/test/mobile-friendly
5. **Test performance** - https://pagespeed.web.dev

## Best Practices

- ✅ **Keep backups** before major changes
- ✅ **Test on multiple devices** and browsers
- ✅ **Optimize images** before uploading
- ✅ **Use semantic HTML** for better SEO
- ✅ **Keep content concise** and scannable
- ✅ **Update regularly** with new projects
- ✅ **Check for broken links** periodically

## Need Help?

- 📖 Refer to [README.md](README.md) for general information
- 🚀 Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- 🐛 Open an issue on GitHub for bugs
- 💬 Contact via email for questions

---

Happy customizing! Make this portfolio truly yours. 🎨

