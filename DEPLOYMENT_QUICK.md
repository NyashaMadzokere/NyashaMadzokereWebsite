# ⚡ Quick Deployment (15 Minutes)

Fastest way to get your portfolio live!

## 🎯 Quick Steps

### 1. Frontend → GitHub Pages (5 min)

```bash
# In root directory
git init
git add .
git commit -m "Deploy portfolio"
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

Then: **Settings** → **Pages** → Enable

**Live at**: `https://yourusername.github.io`

---

### 2. Backend → Heroku (5 min)

```bash
cd backend
heroku create your-portfolio-api
heroku config:set MONGODB_URI="your-atlas-connection-string"
heroku config:set JWT_SECRET="your-secret-key"
heroku config:set FRONTEND_URL="https://yourusername.github.io"
git push heroku main
```

**Live at**: `https://your-portfolio-api.herokuapp.com`

---

### 3. Update Frontend URLs (2 min)

In `script.js` and `admin/js/auth.js`:
```javascript
const API_URL = 'https://your-portfolio-api.herokuapp.com/api';
```

Then:
```bash
git add .
git commit -m "Update API URLs"
git push origin main
```

---

### 4. Test (3 min)

- ✅ Visit: `https://yourusername.github.io`
- ✅ Visit: `https://your-portfolio-api.herokuapp.com/health`
- ✅ Visit: `https://yourusername.github.io/admin/login.html`
- ✅ Login and test dashboard

---

## 🎉 Done!

Your portfolio is live! 🚀

See `DEPLOYMENT_COMPLETE.md` for detailed instructions.

