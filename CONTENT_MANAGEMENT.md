# 📝 Content Management Guide

Complete guide for managing your website content from the admin dashboard.

## 🎯 Overview

You can now edit all main website sections directly from the admin panel:
- ✅ Hero Section
- ✅ About Section
- ✅ Services Section
- ✅ Portfolio Section
- ✅ Skills Section
- ✅ Contact Section

## 🚀 Quick Start

### 1. Seed Default Content (First Time)

```bash
cd backend
npm run seed:content
```

This creates default content for all sections.

### 2. Access Content Editor

1. Login to admin: http://localhost:8080/login.html
2. Click **"Website Content"** in sidebar
3. Click on any section card to edit

## 📋 Editing Sections

### Hero Section

**Fields:**
- **Title**: Main heading (e.g., "Shopify Developer")
- **Subtitle**: Secondary heading
- **Description**: Hero paragraph text
- **Content (JSON)**: 
  ```json
  {
    "badge": "Available for Projects",
    "stats": [
      {"number": 50, "label": "Projects Completed"},
      {"number": 35, "label": "Happy Clients"},
      {"number": 5, "label": "Years Experience"}
    ]
  }
  ```

### About Section

**Fields:**
- **Title**: Section heading
- **Subtitle**: Secondary heading
- **Description**: Main about text
- **Content (JSON)**:
  ```json
  {
    "features": [
      "Custom Theme Development",
      "Shopify Plus Expertise",
      "App Development & Integration",
      "Performance Optimization"
    ]
  }
  ```

### Services Section

**Fields:**
- **Title**: Section heading
- **Subtitle**: Section description
- **Content (JSON)**: Array of service objects
  ```json
  {
    "services": [
      {
        "title": "Custom Theme Development",
        "description": "Service description...",
        "features": ["Feature 1", "Feature 2"]
      }
    ]
  }
  ```

### Contact Section

**Fields:**
- **Title**: Section heading
- **Description**: Contact intro text
- **Content (JSON)**:
  ```json
  {
    "email": "your@email.com",
    "phone": "+1 (234) 567-890",
    "location": "Available Worldwide",
    "social": {
      "github": "https://github.com/...",
      "linkedin": "https://linkedin.com/...",
      "twitter": "https://twitter.com/...",
      "dribbble": "https://dribbble.com/..."
    }
  }
  ```

## 🔧 API Endpoints

### Get All Content
```http
GET /api/content
```

### Get Single Section
```http
GET /api/content/hero
GET /api/content/about
GET /api/content/services
```

### Update Section
```http
PUT /api/content/hero
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "title": "New Title",
  "description": "New description",
  "content": {...}
}
```

## 💡 Frontend Integration

### Option 1: Static (Current)

Content is hardcoded in HTML. Edit via admin panel, then manually update HTML if needed.

### Option 2: Dynamic Loading

Include `js/content-loader.js` in your `index.html`:

```html
<script src="js/content-loader.js"></script>
<script>
    // Load content on page load
    document.addEventListener('DOMContentLoaded', () => {
        contentLoader.loadAllContent();
    });
</script>
```

Then update your HTML to use data attributes:

```html
<h1 class="hero-title" data-content="hero.title">Default Title</h1>
<p class="hero-description" data-content="hero.description">Default description</p>
```

## 📝 Example: Editing Hero Section

1. Go to: **Website Content** → **Hero Section**
2. Update fields:
   - Title: "Expert Shopify Developer"
   - Description: "Your new description"
3. Update JSON content:
   ```json
   {
     "badge": "Available Now",
     "stats": [
       {"number": 100, "label": "Projects"},
       {"number": 50, "label": "Clients"},
       {"number": 10, "label": "Years"}
     ]
   }
   ```
4. Click **Save Content**
5. Changes are saved to database

## 🎨 Content Structure

Each section can store:
- **title**: String
- **subtitle**: String
- **description**: String
- **content**: Any JSON structure (objects, arrays, etc.)
- **metadata**: Additional data
- **isActive**: Boolean (show/hide section)

## 🔄 Workflow

1. **Edit in Admin Panel**
   - Make changes
   - Save to database

2. **Update Frontend** (if using dynamic loading)
   - Content loads automatically
   - Or manually update HTML

3. **View Changes**
   - Refresh website
   - See updated content

## 🧪 Testing

### Test API

```bash
# Get all content
curl http://localhost:5000/api/content

# Get hero section
curl http://localhost:5000/api/content/hero

# Update hero (with auth)
curl -X PUT http://localhost:5000/api/content/hero \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title"}'
```

## 📊 Content vs Blog Posts

**Content Sections** (Hero, About, etc.):
- Static website sections
- Edited via "Website Content"
- Stored in `content` collection

**Blog Posts**:
- Dynamic articles
- Edited via "Blog Posts"
- Stored in `blogs` collection

## 🎯 Best Practices

1. **Backup Before Changes**: Export content JSON
2. **Test Locally**: Make changes, test, then deploy
3. **Use JSON Validator**: Ensure valid JSON in content field
4. **Version Control**: Keep track of content changes
5. **Preview**: Always preview before publishing

## 🐛 Troubleshooting

### Content Not Saving

- Check you're logged in
- Verify token is valid
- Check backend is running
- Review browser console for errors

### JSON Errors

- Validate JSON before saving
- Use JSON validator online
- Check for trailing commas
- Ensure proper quotes

### Content Not Loading

- Verify section name is correct
- Check `isActive` is true
- Review API response
- Check network tab in browser

## 📚 Next Steps

1. **Seed default content**: `npm run seed:content`
2. **Edit sections**: Via admin panel
3. **Customize**: Update to match your brand
4. **Deploy**: Push changes to production

---

**Your website content is now fully manageable from the admin dashboard!** 🎉

