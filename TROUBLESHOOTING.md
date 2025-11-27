# 🔧 Troubleshooting Guide

Common issues and solutions for your portfolio website.

## ❌ "Failed to fetch" Error

### **Problem**
Cannot connect to backend API.

### **Solutions**

#### 1. Check Backend is Running

**In backend terminal**, you should see:
```
🚀 Server running in development mode
📡 Listening on port 5000
✅ MongoDB Connected
```

**If not running:**
```bash
cd backend
npm run dev
```

#### 2. Check API URL

**In browser console (F12):**
```javascript
// Check API URL
console.log(API_URL);
// Should be: http://localhost:5000/api
```

**If wrong**, update in `admin/js/auth.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

#### 3. Test Backend Connection

**In browser console:**
```javascript
fetch('http://localhost:5000/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

**Should return:**
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123
}
```

#### 4. Check CORS

Backend should allow your frontend origin. Check `backend/server.js`:
```javascript
origin: ['http://localhost:3000', 'http://localhost:8080']
```

---

## ❌ "Error loading messages" - Contact Messages

### **Problem**
Cannot load contact form submissions.

### **Solutions**

#### 1. Check Authentication

**Must be logged in as Admin:**
```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user.role); // Should be "admin"
```

**If not admin:**
- First user created = Admin automatically
- Create new account (will be admin)
- Or update existing user in database

#### 2. Check Backend Logs

**Look for:**
```
Fetching contacts - User: email@example.com Role: admin
Found X contact submissions
```

**If you see "Admin access denied":**
- Your account isn't admin
- Create new account (first = admin)

#### 3. Test API Directly

**In browser console:**
```javascript
const token = localStorage.getItem('authToken');
fetch('http://localhost:5000/api/contact', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

---

## ❌ Blank Blog Post Page

### **Problem**
Blog post page shows blank or error.

### **Solutions**

#### 1. Check Slug in URL

URL should be: `blog-post.html?slug=post-slug-here`

#### 2. Seed Database

```bash
cd backend
npm run seed
```

This creates blog posts with correct slugs.

#### 3. Check API

```bash
curl http://localhost:5000/api/blog
```

Should return blog posts.

---

## ❌ MongoDB Connection Error

### **Problem**
Backend can't connect to MongoDB.

### **Solutions**

#### 1. Check MongoDB Atlas

- Cluster is running
- IP address whitelisted (0.0.0.0/0 for development)
- Connection string correct in `.env`

#### 2. Check Connection String

In `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

**Verify:**
- Username correct
- Password correct (no spaces)
- Database name: `portfolio`

#### 3. Test Connection

```bash
# In backend folder
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(console.error)"
```

---

## ❌ CORS Error

### **Problem**
"Access to fetch blocked by CORS policy"

### **Solutions**

#### 1. Update CORS in Backend

In `backend/server.js`, ensure your frontend URL is allowed:
```javascript
origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080'
]
```

#### 2. Restart Backend

After changing CORS, restart:
```bash
# Stop (Ctrl+C)
npm run dev
```

---

## ❌ "Not authorized" Error

### **Problem**
401 Unauthorized errors.

### **Solutions**

#### 1. Token Expired

**Logout and login again:**
```javascript
localStorage.clear();
window.location.href = 'login.html';
```

#### 2. Invalid Token

**Get fresh token:**
- Login again
- Check token in localStorage

#### 3. Check JWT Secret

In `backend/.env`:
```env
JWT_SECRET=your-long-secret-key-here
```

**Must match** between login and API calls.

---

## ❌ Admin Panel Not Loading

### **Problem**
Admin pages show blank or errors.

### **Solutions**

#### 1. Check File Paths

**Make sure you're serving from correct directory:**
```bash
# If serving from admin folder
cd admin
python -m http.server 8080
# Access: http://localhost:8080/login.html

# If serving from root
cd ..
python -m http.server 8080
# Access: http://localhost:8080/admin/login.html
```

#### 2. Check Browser Console

**Press F12** and check for:
- 404 errors (wrong paths)
- CORS errors
- Network errors

#### 3. Verify Files Exist

```bash
ls admin/
# Should see: login.html, dashboard.html, etc.
```

---

## ❌ Contact Form Not Sending

### **Problem**
Form submits but no email received.

### **Solutions**

#### 1. Check SMTP Settings

In `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

#### 2. Check Backend Logs

**Look for email errors:**
```
Error sending email: ...
```

#### 3. Test Email

**Use Gmail App Password** (not regular password):
- Google Account → Security
- 2-Step Verification → App passwords
- Generate password for "Mail"

---

## 🔍 Debugging Steps

### **Step 1: Check Backend**
```bash
# Backend terminal should show:
✅ MongoDB Connected
🚀 Server running
📡 Listening on port 5000
```

### **Step 2: Check Frontend**
```bash
# Frontend should be served
python -m http.server 8080
```

### **Step 3: Check Browser Console**
- Press F12
- Go to Console tab
- Look for errors
- Check Network tab for failed requests

### **Step 4: Test API**
```bash
# Health check
curl http://localhost:5000/health

# With auth
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/contact
```

---

## 📞 Still Having Issues?

1. **Check backend terminal** - Look for error messages
2. **Check browser console** - Look for JavaScript errors
3. **Check Network tab** - See failed requests
4. **Share error messages** - From console/terminal

---

**Most common fix:** Make sure backend is running! 🚀

