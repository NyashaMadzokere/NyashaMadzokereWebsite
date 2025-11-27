# Backend Deployment Guide

Complete guide for deploying the portfolio backend API to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB database set up (local or Atlas)
- [ ] Email SMTP credentials tested
- [ ] Dependencies installed and updated
- [ ] Code tested locally
- [ ] Git repository initialized

## 🌐 Deployment Options

### 1. Heroku (Easiest)

**Cost:** Free tier available

#### Steps:

1. **Install Heroku CLI**
   ```bash
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd backend
   heroku create your-portfolio-api
   ```

4. **Add MongoDB (mLab or MongoDB Atlas)**
   ```bash
   # Option 1: Add mLab addon
   heroku addons:create mongolab:sandbox
   
   # Option 2: Use MongoDB Atlas (recommended)
   # Create cluster at https://www.mongodb.com/cloud/atlas
   # Then set the connection string:
   heroku config:set MONGODB_URI="your-atlas-connection-string"
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://yourusername.github.io
   heroku config:set SMTP_HOST=smtp.gmail.com
   heroku config:set SMTP_PORT=587
   heroku config:set SMTP_USER=your-email@gmail.com
   heroku config:set SMTP_PASS=your-app-password
   heroku config:set CONTACT_EMAIL=your-email@gmail.com
   heroku config:set JWT_SECRET=your-secret-key
   ```

6. **Create Procfile** (already included)
   ```
   web: node server.js
   ```

7. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

8. **Open App**
   ```bash
   heroku open
   ```

9. **View Logs**
   ```bash
   heroku logs --tail
   ```

### 2. Railway (Modern & Simple)

**Cost:** Free tier with $5 credit monthly

#### Steps:

1. **Sign Up** at https://railway.app

2. **Install Railway CLI** (optional)
   ```bash
   npm install -g @railway/cli
   ```

3. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select `backend` folder as root

4. **Add MongoDB**
   - Click "New" → "Database" → "MongoDB"
   - Railway will automatically set `MONGODB_URI`

5. **Set Environment Variables**
   - Go to your service
   - Click "Variables" tab
   - Add all variables from `.env.example`

6. **Deploy**
   - Railway auto-deploys on git push
   - Get your URL from the dashboard

### 3. Render (Great Free Tier)

**Cost:** Free tier available

#### Steps:

1. **Sign Up** at https://render.com

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - Name: `portfolio-api`
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`

3. **Add MongoDB**
   - Use MongoDB Atlas (free tier)
   - Or add MongoDB addon on Render

4. **Environment Variables**
   - In service dashboard, go to "Environment"
   - Add all variables from `.env.example`

5. **Deploy**
   - Click "Create Web Service"
   - Auto-deploys on git push

### 4. DigitalOcean App Platform

**Cost:** $5/month

#### Steps:

1. **Sign Up** at https://www.digitalocean.com

2. **Create App**
   - Go to Apps
   - Click "Create App"
   - Connect GitHub
   - Select repository

3. **Configure**
   - Detected: Node.js
   - Build Command: `npm install`
   - Run Command: `npm start`

4. **Add MongoDB**
   - Use MongoDB Atlas
   - Or create MongoDB cluster on DigitalOcean

5. **Environment Variables**
   - Add all variables in App settings

6. **Deploy**
   - Click "Create Resources"

### 5. AWS EC2 (Most Control)

**Cost:** Free tier for 12 months, then ~$5-10/month

#### Steps:

1. **Launch EC2 Instance**
   - Login to AWS Console
   - Launch Ubuntu 20.04 LTS instance
   - Configure security group (allow ports 22, 80, 443, 5000)

2. **Connect to Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install MongoDB**
   ```bash
   sudo apt-get install mongodb -y
   sudo systemctl start mongodb
   sudo systemctl enable mongodb
   ```

5. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio/backend
   npm install
   ```

6. **Setup Environment**
   ```bash
   nano .env
   # Add your environment variables
   ```

7. **Install PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name portfolio-api
   pm2 startup
   pm2 save
   ```

8. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt-get install nginx
   sudo nano /etc/nginx/sites-available/default
   ```

   Add:
   ```nginx
   location /api {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

   ```bash
   sudo systemctl restart nginx
   ```

9. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.yourdomain.com
   ```

### 6. Vercel (Serverless)

**Cost:** Free tier available

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Create** `vercel.json`
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add SMTP_USER
   # ... add all variables
   ```

## 🗄️ MongoDB Atlas Setup (Recommended)

1. **Create Account** at https://www.mongodb.com/cloud/atlas

2. **Create Cluster**
   - Choose "Shared" (Free)
   - Select region closest to your deployment
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Add New Database User
   - Remember username and password

4. **Whitelist IP**
   - Go to "Network Access"
   - Add IP Address
   - For development: `0.0.0.0/0` (all IPs)
   - For production: Add your server IP

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Use this as `MONGODB_URI`

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2FA** on your Google account

2. **Create App Password**
   - Google Account → Security
   - 2-Step Verification
   - App passwords
   - Select "Mail" and "Other"
   - Copy the generated password

3. **Use in Environment**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=generated-app-password
   ```

### SendGrid Setup

1. **Sign Up** at https://sendgrid.com

2. **Create API Key**
   - Settings → API Keys
   - Create API Key
   - Full Access
   - Copy the key

3. **Use in Environment**
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=your-sendgrid-api-key
   ```

## 🔗 Update Frontend

After deployment, update your frontend to use the production API:

In `script.js`:

```javascript
// Replace localhost with your API URL
const API_URL = 'https://your-api-domain.com/api';

// Or use environment detection
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://your-api-domain.com/api';

// Update fetch calls
fetch(`${API_URL}/contact`, { ... })
```

## ✅ Post-Deployment Checklist

- [ ] API is accessible via URL
- [ ] Health check endpoint working (`/health`)
- [ ] Contact form sending emails
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled
- [ ] Environment variables set
- [ ] MongoDB connected
- [ ] Logs are accessible
- [ ] Rate limiting working
- [ ] Error handling working

## 🐛 Troubleshooting

### API Not Responding
- Check logs for errors
- Verify environment variables
- Check MongoDB connection
- Verify port settings

### CORS Errors
- Add frontend URL to `ALLOWED_ORIGINS`
- Check CORS middleware configuration

### Email Not Sending
- Verify SMTP credentials
- Check firewall/port settings
- Test with different email provider

### Database Connection Failed
- Check MongoDB URI format
- Verify database user credentials
- Check IP whitelist in MongoDB Atlas

## 📊 Monitoring

### Heroku
```bash
heroku logs --tail
heroku ps
```

### PM2 (on VPS)
```bash
pm2 logs
pm2 status
pm2 monit
```

### Railway/Render
- Use built-in logs viewer in dashboard

## 🔄 Updates & Maintenance

To update your deployed API:

```bash
# Make changes locally
git add .
git commit -m "Update API"
git push

# Most platforms auto-deploy on push
# For Heroku:
git push heroku main
```

## 📞 Support

Having deployment issues?
- Check platform documentation
- Open an issue on GitHub
- Email: nyasha@example.com

---

**Good luck with your deployment!** 🚀

