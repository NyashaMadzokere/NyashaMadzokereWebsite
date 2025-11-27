# 🚀 Complete Deployment Guide

Deploy your portfolio website to production! This guide covers everything.

## 📋 Pre-Deployment Checklist

- [ ] Backend tested locally ✅
- [ ] Admin panel working ✅
- [ ] MongoDB Atlas connected ✅
- [ ] All content customized
- [ ] Environment variables ready

---

## 🎯 Deployment Strategy

```
Frontend (GitHub Pages) → Free
    ↓
Backend API (Heroku/Railway) → Free tier
    ↓
Database (MongoDB Atlas) → Free tier
    ↓
Domain (Optional - GoDaddy) → ~$10-15/year
```

---

## Part 1: Deploy Frontend to GitHub Pages

### Step 1: Prepare Frontend

1. **Update API URL** in `script.js`:

```javascript
// Find this line (around line 435)
const API_URL = 'https://your-backend-url.herokuapp.com/api';
// Update with your actual backend URL (we'll get this in Part 2)
```

2. **Update sitemap.xml** with your domain:
   - Replace `nyashamadzokere.github.io` with your GitHub username

### Step 2: Create GitHub Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `yourusername.github.io` (replace with your GitHub username)
3. **Make it Public**
4. **Don't initialize** with README

### Step 3: Push to GitHub

```bash
# In your project root directory
git init
git add .
git commit -m "Initial commit: Portfolio website"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. **Source**: Select `main` branch
3. **Folder**: `/ (root)`
4. Click **Save**

Your site will be live at: **https://yourusername.github.io**

---

## Part 2: Deploy Backend to Heroku (Free)

### Step 1: Install Heroku CLI

**Windows**: Download from https://devcenter.heroku.com/articles/heroku-cli

**Or use npm**:
```bash
npm install -g heroku-cli
```

### Step 2: Login to Heroku

```bash
heroku login
```

Opens browser for login.

### Step 3: Create Heroku App

```bash
cd backend
heroku create your-portfolio-api
```

Replace `your-portfolio-api` with your preferred name (must be unique).

### Step 4: Set Environment Variables

```bash
# MongoDB (use your existing Atlas connection string)
heroku config:set MONGODB_URI="mongodb+srv://madzokeren_db_user:kFfn6LmtvGiHPkMM@nyashamadzokere.vedsmnm.mongodb.net/portfolio?appName=NyashaMadzokere"

# JWT Secret (use a long random string)
heroku config:set JWT_SECRET="your-super-secret-jwt-key-make-it-long-and-random"

# Node Environment
heroku config:set NODE_ENV=production

# Frontend URL (your GitHub Pages URL)
heroku config:set FRONTEND_URL="https://yourusername.github.io"

# Email Configuration (if you want contact form to work)
heroku config:set SMTP_HOST="smtp.gmail.com"
heroku config:set SMTP_PORT="587"
heroku config:set SMTP_USER="your-email@gmail.com"
heroku config:set SMTP_PASS="your-app-password"
heroku config:set CONTACT_EMAIL="your-email@gmail.com"
```

### Step 5: Deploy

```bash
git add .
git commit -m "Deploy backend to Heroku"
git push heroku main
```

### Step 6: Verify Deployment

```bash
# Check logs
heroku logs --tail

# Test health endpoint
heroku open
# Then add /health to URL
```

Your backend will be at: **https://your-portfolio-api.herokuapp.com**

---

## Part 3: Update Frontend with Backend URL

### Step 1: Update script.js

In your **root** `script.js`, find and update:

```javascript
// Around line 435
const API_URL = 'https://your-portfolio-api.herokuapp.com/api';
```

### Step 2: Update admin/js/auth.js

In `admin/js/auth.js`:

```javascript
const API_URL = 'https://your-portfolio-api.herokuapp.com/api';
```

### Step 3: Update CORS in Backend

Your backend CORS should already allow your GitHub Pages URL, but verify in Heroku:

```bash
heroku config:set ALLOWED_ORIGINS="https://yourusername.github.io,http://localhost:3000,http://localhost:8080"
```

### Step 4: Push Frontend Updates

```bash
# In root directory
git add .
git commit -m "Update API URLs for production"
git push origin main
```

GitHub Pages will auto-deploy in 1-2 minutes.

---

## Part 4: Deploy Admin Panel

### Option A: Same GitHub Pages (Recommended)

Your admin panel is in the `admin` folder. It's already in your repo!

**Access**: `https://yourusername.github.io/admin/login.html`

### Option B: Separate Deployment

Deploy `admin` folder separately to Netlify or Vercel for better performance.

---

## Part 5: MongoDB Atlas Configuration

### Step 1: Whitelist IP Addresses

1. Go to MongoDB Atlas dashboard
2. **Network Access** → **Add IP Address**
3. Add:
   - `0.0.0.0/0` (allows all - for Heroku)
   - Your home IP (optional)

### Step 2: Verify Connection

Your Heroku app should connect automatically with the connection string you set.

---

## Part 6: Test Everything

### Frontend
- ✅ https://yourusername.github.io
- ✅ All sections load
- ✅ Contact form works
- ✅ Blog posts display

### Backend API
- ✅ https://your-portfolio-api.herokuapp.com/health
- ✅ https://your-portfolio-api.herokuapp.com/api
- ✅ https://your-portfolio-api.herokuapp.com/api/blog

### Admin Panel
- ✅ https://yourusername.github.io/admin/login.html
- ✅ Can login
- ✅ Dashboard loads
- ✅ Can create blog posts

---

## Part 7: Custom Domain (Optional)

### Step 1: Buy Domain

From GoDaddy, Namecheap, or any registrar.

### Step 2: Configure GitHub Pages

1. In repository **Settings** → **Pages**
2. **Custom domain**: Enter `yourdomain.com`
3. GitHub will provide DNS records

### Step 3: Configure DNS

At your domain registrar, add:

**A Records**:
```
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153
```

**CNAME Record**:
```
www → yourusername.github.io
```

### Step 4: Update Backend CORS

```bash
heroku config:set FRONTEND_URL="https://yourdomain.com"
heroku config:set ALLOWED_ORIGINS="https://yourdomain.com,https://yourusername.github.io"
```

### Step 5: Update Frontend

Update all URLs in:
- `sitemap.xml`
- `robots.txt`
- `index.html` (meta tags)

---

## 🎯 Alternative: Railway (Easier than Heroku)

### Step 1: Sign Up

Go to: https://railway.app

### Step 2: New Project

1. **New Project** → **Deploy from GitHub repo**
2. Select your repository
3. **Root Directory**: `backend`

### Step 3: Add MongoDB

1. **New** → **Database** → **MongoDB**
2. Railway auto-creates and sets `MONGODB_URI`

### Step 4: Add Environment Variables

In Railway dashboard:
- `JWT_SECRET`
- `NODE_ENV=production`
- `FRONTEND_URL`
- Email settings (if needed)

### Step 5: Deploy

Railway auto-deploys on git push!

Get your URL: `https://your-app.railway.app`

---

## 🔧 Troubleshooting

### Frontend Not Loading

- Check GitHub Pages is enabled
- Verify repository is public
- Check `index.html` is in root

### Backend Not Working

```bash
# Check Heroku logs
heroku logs --tail

# Restart app
heroku restart

# Check config
heroku config
```

### CORS Errors

- Verify `FRONTEND_URL` in Heroku config
- Check CORS allows your domain
- Hard refresh browser (Ctrl+Shift+R)

### Database Connection Issues

- Verify MongoDB Atlas IP whitelist
- Check connection string in Heroku config
- Verify database name in connection string

### Admin Panel Not Working

- Check API URL in `admin/js/auth.js`
- Verify backend is running
- Check browser console for errors

---

## 📊 Post-Deployment Checklist

- [ ] Frontend live on GitHub Pages
- [ ] Backend API responding
- [ ] Admin panel accessible
- [ ] Can login to admin
- [ ] Contact form sending emails
- [ ] Blog posts loading
- [ ] All links working
- [ ] Mobile responsive
- [ ] SEO meta tags correct

---

## 🎉 You're Live!

Your portfolio is now:
- ✅ **Frontend**: https://yourusername.github.io
- ✅ **Backend**: https://your-portfolio-api.herokuapp.com
- ✅ **Admin**: https://yourusername.github.io/admin/login.html
- ✅ **Database**: MongoDB Atlas (cloud)

---

## 📈 Next Steps

1. **Submit to Google Search Console**
2. **Submit sitemap**: `https://yourusername.github.io/sitemap.xml`
3. **Test on mobile devices**
4. **Share on social media**
5. **Add to your resume**

---

## 💰 Cost Breakdown

- **GitHub Pages**: FREE
- **Heroku**: FREE (hobby tier)
- **MongoDB Atlas**: FREE (M0 tier)
- **Domain**: ~$10-15/year (optional)

**Total: FREE** (or ~$10/year with domain)

---

**Ready to deploy? Start with Part 1!** 🚀

