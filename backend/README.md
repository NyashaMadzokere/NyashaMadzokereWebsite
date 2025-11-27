# Portfolio Backend API

RESTful API backend for the Shopify Developer Portfolio website. Built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Contact Form API** - Handle contact form submissions with email notifications
- **Projects Management** - CRUD operations for portfolio projects
- **Skills Management** - Manage technical skills and categories
- **Analytics Tracking** - Track page views and user interactions
- **Rate Limiting** - Protect against spam and abuse
- **Email Notifications** - Automated email responses using Nodemailer
- **Data Validation** - Input validation and sanitization
- **Error Handling** - Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- SMTP email account (Gmail, SendGrid, etc.)

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure your variables:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB (choose one option)
# Local:
MONGODB_URI=mongodb://localhost:27017/portfolio

# Cloud (MongoDB Atlas):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
```

### 3. Setup MongoDB

**Option A: Local MongoDB**

1. Install MongoDB: https://docs.mongodb.com/manual/installation/
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Add to `.env` as `MONGODB_URI`

### 4. Email Configuration

**Using Gmail:**

1. Enable 2-Factor Authentication in your Google account
2. Generate an App Password:
   - Go to Google Account → Security
   - Select "App passwords"
   - Generate password for "Mail"
3. Use the generated password in `SMTP_PASS`

**Using SendGrid:**

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

## 🚦 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

### Seed Database (Optional)

Populate with sample data:

```bash
npm run seed
```

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

### Contact Form

**Submit Contact Form**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

### Projects

**Get All Projects**
```http
GET /api/projects?category=Fashion&featured=true&limit=10&page=1
```

**Get Single Project**
```http
GET /api/projects/:id
```

**Create Project** (Admin)
```http
POST /api/projects
Content-Type: application/json

{
  "title": "Project Title",
  "category": "Fashion E-commerce",
  "description": "Project description...",
  "tags": ["Shopify", "React"],
  "technologies": ["Liquid", "JavaScript"],
  "featured": true
}
```

**Update Project** (Admin)
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "featured": true
}
```

**Delete Project** (Admin)
```http
DELETE /api/projects/:id
```

### Skills

**Get All Skills**
```http
GET /api/skills
```

**Update All Skills** (Admin)
```http
PUT /api/skills
Content-Type: application/json

{
  "skills": [
    {
      "name": "Liquid",
      "category": "Shopify",
      "percentage": 95
    }
  ]
}
```

### Analytics

**Track Page View**
```http
POST /api/analytics/pageview
Content-Type: application/json

{
  "page": "/",
  "referrer": "https://google.com"
}
```

**Get Analytics Stats** (Admin)
```http
GET /api/analytics/stats?days=30
```

## 🔗 Connecting Frontend to Backend

Update your frontend `script.js` to use the API:

```javascript
// In your contact form handler
const contactForm = {
    form: document.getElementById('contactForm'),
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showMessage('success', result.message);
                this.form.reset();
            } else {
                this.showMessage('error', result.message);
            }
        } catch (error) {
            this.showMessage('error', 'Failed to send message. Please try again.');
        }
    }
};
```

## 🌐 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-portfolio-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set SMTP_USER=your-email
   heroku config:set SMTP_PASS=your-password
   # ... set all other variables
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy to Railway

1. **Create account** at https://railway.app
2. **Create new project** from GitHub repo
3. **Add MongoDB** database service
4. **Set environment variables** in Railway dashboard
5. **Deploy** automatically on push

### Deploy to Render

1. **Create account** at https://render.com
2. **New Web Service** from GitHub repo
3. **Add environment variables**
4. **Deploy**

### Deploy to DigitalOcean

1. **Create Droplet** with Node.js
2. **Clone repository**
3. **Install dependencies**
4. **Setup PM2** for process management
5. **Configure Nginx** as reverse proxy

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ Rate limiting on API endpoints
- ✅ Helmet.js for security headers
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ MongoDB injection prevention
- ✅ XSS protection

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in CI mode:
```bash
npm run test:ci
```

## 📝 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [...]
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: MongoNetworkError**
- Check MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- Check network/firewall settings

### Email Not Sending

**Error: Invalid login**
- Verify SMTP credentials
- For Gmail, use App Password (not regular password)
- Check "Less secure apps" setting (if applicable)

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

## 📚 Additional Resources

- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: nyasha@example.com

---

**Built with ❤️ for the Shopify developer community**

