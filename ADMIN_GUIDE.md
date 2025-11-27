## 📘 Admin Dashboard Complete Guide

Complete guide for using the admin dashboard to manage your portfolio website.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

New packages added:
- `bcryptjs` - Password hashing
- `jsonwebtoken` - Authentication tokens

### 2. Start Backend

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Access Admin Panel

Open in browser: `http://localhost:5000` or serve the `admin` folder:

```bash
# Using Python
cd admin
python -m http.server 8080

# Or using Node
npx http-server admin -p 8080
```

Then visit: `http://localhost:8080/login.html`

## 🔐 First Time Setup

### Create Admin Account

1. Visit: `http://localhost:8080/register.html`
2. Fill in details:
   - **Name**: Your full name
   - **Email**: Your email
   - **Password**: Min 6 characters
3. Click "Create Account"
4. **First user is automatically Admin!**

### Login

1. Visit: `http://localhost:8080/login.html`
2. Enter credentials
3. Click "Sign In"
4. Redirected to dashboard

## 📊 Dashboard Features

### Main Dashboard
- **Stats Cards**: Blog posts, projects, messages, total views
- **Recent Blog Posts**: Quick access to latest posts
- **Recent Messages**: Latest contact form submissions

### Navigation Menu
- 🏠 Dashboard - Overview and stats
- 📝 Blog Posts - Manage blog content
- 💼 Projects - Manage portfolio projects
- ✉️ Contact Messages - View form submissions
- ⚙️ Settings - Account settings

## ✍️ Managing Blog Posts

### View All Posts

API Endpoint: `GET /api/blog`

From dashboard:
1. Click "Blog Posts" in sidebar
2. View all posts in table
3. Filter by category or status

### Create New Post

API Endpoint: `POST /api/blog` (Protected)

Using Postman/Thunder Client:
```http
POST http://localhost:5000/api/blog
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "My Blog Post Title",
  "excerpt": "Brief description of the post",
  "content": "# Full Content\n\nYour markdown content...",
  "category": "Shopify",
  "tags": ["tag1", "tag2", "tag3"],
  "published": true,
  "featured": false,
  "readTime": 5
}
```

### Update Post

API Endpoint: `PUT /api/blog/:id` (Protected)

```http
PUT http://localhost:5000/api/blog/POST_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

### Delete Post

API Endpoint: `DELETE /api/blog/:id` (Protected)

```http
DELETE http://localhost:5000/api/blog/POST_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

## 💼 Managing Projects

### Create Project

API Endpoint: `POST /api/projects` (Protected)

```http
POST http://localhost:5000/api/projects
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Project Name",
  "category": "Fashion E-commerce",
  "description": "Brief description",
  "tags": ["Shopify", "Liquid"],
  "technologies": ["JavaScript", "CSS"],
  "liveUrl": "https://example.com",
  "featured": true,
  "published": true
}
```

### Update/Delete

Same pattern as blog posts, use `/api/projects/:id`

## ✉️ Viewing Contact Messages

### Get All Messages

API Endpoint: `GET /api/contact` (Admin Only)

```http
GET http://localhost:5000/api/contact
Authorization: Bearer YOUR_TOKEN_HERE
```

**Note**: Only admins can view contact submissions.

## 🔑 Authentication & Security

### How Authentication Works

1. **Login** → Receives JWT token
2. **Token stored** in localStorage
3. **All API requests** include: `Authorization: Bearer TOKEN`
4. **Token expires** in 7 days

### Getting Your Token

After login, check browser console or localStorage:

```javascript
// In browser console
localStorage.getItem('authToken')
```

### Using Token in API Requests

**Postman:**
1. Authorization tab
2. Select "Bearer Token"
3. Paste your token

**cURL:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/blog
```

**JavaScript:**
```javascript
fetch('http://localhost:5000/api/blog', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ /* data */ })
})
```

## 👥 User Roles

### Admin
- Full access to everything
- Can create/edit/delete all content
- Can view contact messages
- Can manage users

### Editor
- Can create/edit/delete blog posts
- Can create/edit/delete projects
- Cannot view contact messages
- Cannot manage users

## 🛠️ API Endpoints Reference

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login
GET    /api/auth/me             - Get current user (Protected)
PUT    /api/auth/update-profile - Update profile (Protected)
PUT    /api/auth/change-password - Change password (Protected)
GET    /api/auth/users          - Get all users (Admin only)
DELETE /api/auth/users/:id      - Delete user (Admin only)
```

### Blog Posts
```
GET    /api/blog                - Get all posts (Public)
GET    /api/blog/:slug          - Get single post (Public)
GET    /api/blog/featured       - Get featured posts (Public)
GET    /api/blog/categories     - Get categories (Public)
POST   /api/blog                - Create post (Protected)
PUT    /api/blog/:id            - Update post (Protected)
DELETE /api/blog/:id            - Delete post (Protected)
```

### Projects
```
GET    /api/projects            - Get all (Public)
GET    /api/projects/:id        - Get one (Public)
POST   /api/projects            - Create (Protected)
PUT    /api/projects/:id        - Update (Protected)
DELETE /api/projects/:id        - Delete (Protected)
```

### Contact Messages
```
POST   /api/contact             - Submit form (Public)
GET    /api/contact             - Get all (Admin only)
```

## 🔧 Common Tasks

### Change Your Password

1. Login to dashboard
2. Go to Settings
3. Enter current password
4. Enter new password
5. Save changes

Or via API:
```http
PUT http://localhost:5000/api/auth/change-password
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "currentPassword": "old password",
  "newPassword": "new password"
}
```

### Add Another Admin User

1. Must be logged in as admin
2. Register new user
3. New users are "editor" by default
4. To make admin, update via API or database

### Logout

Click "Logout" button in dashboard, or:

```javascript
localStorage.removeItem('authToken');
localStorage.removeItem('user');
window.location.href = 'login.html';
```

## 🐛 Troubleshooting

### "Not authorized" Error

**Solution**: Your token expired or is invalid
1. Logout and login again
2. Get fresh token
3. Update Authorization header

### "Access denied" Error

**Solution**: You don't have permission
- Contact form viewing: Admin only
- User management: Admin only
- Blog/Projects: Editor or Admin

### Can't Access Admin Panel

**Solution**:
1. Make sure backend is running
2. Check API URL in `admin/js/auth.js`
3. Update if needed:
```javascript
const API_URL = 'http://localhost:5000/api';
```

### Token Not Working

**Solution**:
1. Check token format: `Bearer YOUR_TOKEN`
2. Verify token exists: Check localStorage
3. Try logging in again

## 📱 Mobile Access

The admin panel is responsive but works best on desktop. For mobile:
- Login works perfectly
- Dashboard view optimized
- Editing content better on desktop

## 🚀 Deployment

### Deploy Admin Panel

#### Option 1: Same Domain as Main Site
```
yourdomain.com/        → Main portfolio
yourdomain.com/admin/  → Admin panel
```

Just upload `admin` folder.

#### Option 2: Separate Subdomain
```
admin.yourdomain.com → Admin panel
```

Point subdomain to `admin` folder.

#### Option 3: Netlify/Vercel
Deploy `admin` folder separately.

**Update API URL** in `admin/js/auth.js`:
```javascript
const API_URL = 'https://your-api.herokuapp.com/api';
```

## 🔐 Security Best Practices

1. **Strong Passwords**: Use min 12 characters
2. **Change Default**: Change password after first login
3. **HTTPS Only**: Always use HTTPS in production
4. **Update Regularly**: Keep dependencies updated
5. **Backup**: Regular database backups
6. **Limit Access**: Only create necessary admin accounts

## 📊 Managing Content

### Blog Post Workflow

1. **Draft**: Create post, set `published: false`
2. **Review**: Preview and edit
3. **Publish**: Set `published: true`
4. **Feature**: Set `featured: true` for homepage

### SEO Optimization

When creating posts, include:
```json
{
  "title": "SEO-friendly title",
  "excerpt": "Compelling description",
  "seo": {
    "metaTitle": "Custom SEO title",
    "metaDescription": "Meta description",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

### Content Guidelines

- **Title**: 60 characters max
- **Excerpt**: 300 characters max
- **Content**: Use Markdown formatting
- **Tags**: 3-5 relevant tags
- **Category**: Choose appropriate category

## 🎯 Quick Commands

### Create Your First Blog Post

```bash
# Using curl
curl -X POST http://localhost:5000/api/blog \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "excerpt": "This is my first blog post",
    "content": "# Hello World\n\nWelcome to my blog!",
    "category": "Shopify",
    "tags": ["first", "hello"],
    "published": true
  }'
```

### Get All Your Posts

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/blog
```

### Update a Post

```bash
curl -X PUT http://localhost:5000/api/blog/POST_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"published": true}'
```

## 📞 Support

Having issues?
- Check backend logs
- Verify token in localStorage
- Test API with Postman
- Review browser console

## 🎉 You're Ready!

Your admin dashboard is fully functional:
- ✅ Secure authentication
- ✅ Protected routes
- ✅ Blog management
- ✅ Project management
- ✅ Contact form viewing
- ✅ User management

**Happy managing!** 🚀

---

**Pro Tip**: Use Postman collections to save all your API requests for quick access!

