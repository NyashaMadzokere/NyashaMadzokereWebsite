# 🚀 Admin Dashboard Quick Start

Get your admin panel up and running in 5 minutes!

## Step 1: Install New Dependencies

```bash
cd backend
npm install
```

This installs:
- `bcryptjs` - For password hashing
- `jsonwebtoken` - For authentication

## Step 2: Update .env File

Make sure your `backend/.env` has:

```env
JWT_SECRET=your-super-secret-key-make-it-long-and-random
```

## Step 3: Restart Backend

```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

## Step 4: Open Admin Panel

Open `admin/login.html` in your browser or serve it:

```bash
# From root directory
cd admin
python -m http.server 8080
```

Then visit: **http://localhost:8080/login.html**

## Step 5: Create Admin Account

1. Click "Create Admin Account" on login page
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
3. Click "Create Account"
4. **First user = Admin automatically!**

## Step 6: You're In! 🎉

You'll be redirected to dashboard with:
- Stats overview
- Recent blog posts
- Recent messages
- Full navigation menu

## 📝 Quick Actions

### Create Blog Post (Using Postman/API)

1. Get your token from localStorage (F12 → Console):
   ```javascript
   localStorage.getItem('authToken')
   ```

2. Use Postman:
   - URL: `POST http://localhost:5000/api/blog`
   - Headers:
     - `Authorization: Bearer YOUR_TOKEN`
     - `Content-Type: application/json`
   - Body:
   ```json
   {
     "title": "My First Post",
     "excerpt": "Brief description",
     "content": "# Hello\n\nMy content here",
     "category": "Shopify",
     "tags": ["test"],
     "published": true
   }
   ```

### View All Posts

Dashboard shows recent posts, or API:
```
GET http://localhost:5000/api/blog
```

### View Contact Messages (Admin Only)

```
GET http://localhost:5000/api/contact
Authorization: Bearer YOUR_TOKEN
```

## 🔑 Important URLs

- **Login**: `http://localhost:8080/login.html`
- **Dashboard**: `http://localhost:8080/dashboard.html`
- **API**: `http://localhost:5000/api`
- **API Docs**: `http://localhost:5000/api`

## ⚡ Testing Authentication

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your@email.com","password":"yourpassword"}'
```

### Test Protected Route:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/blog
```

## 🎯 What's Protected Now

✅ **Blog Management**:
- Create/Update/Delete require login

✅ **Projects Management**:
- Create/Update/Delete require login

✅ **Contact Messages**:
- View requires Admin role

✅ **User Management**:
- Requires Admin role

## ❌ What's Still Public

- Viewing blog posts (GET /api/blog)
- Viewing projects (GET /api/projects)
- Submitting contact form (POST /api/contact)
- Health check (/health)

## 🐛 Troubleshooting

### "Token invalid" error
- Login again to get fresh token
- Token expires after 7 days

### Can't access admin panel
- Make sure backend is running on port 5000
- Check API_URL in `admin/js/auth.js`

### "Access denied"
- Only admins can view contact messages
- First user is auto-admin
- Other users are "editor" by default

## 📚 Full Documentation

See [ADMIN_GUIDE.md](ADMIN_GUIDE.md) for complete documentation.

---

**You're all set!** 🎉 You now have a fully functional admin dashboard!

