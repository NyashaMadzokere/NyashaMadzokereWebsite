# Frontend-Backend Integration Guide

Complete guide to connect your portfolio frontend with the backend API.

## 📋 Overview

This guide will help you integrate the backend API with your frontend portfolio to enable:
- Contact form functionality
- Dynamic project loading
- Skills display
- Analytics tracking

## 🚀 Quick Start

### 1. Update Frontend JavaScript

Open `script.js` and update the contact form handler:

```javascript
// Add API URL configuration at the top
const API_CONFIG = {
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api'
        : 'https://your-api-domain.com/api'
};

// Update contact form section
const contactForm = {
    form: document.getElementById('contactForm'),
    
    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch(`${API_CONFIG.baseURL}/contact`, {
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
                this.showMessage('error', result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            this.showMessage('error', 'Failed to send message. Please try again later or contact me directly via email.');
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    },
    
    showMessage(type, message) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            background: ${type === 'success' ? 'rgba(150, 191, 72, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            color: ${type === 'success' ? '#96bf48' : '#ef4444'};
            border: 1px solid ${type === 'success' ? 'rgba(150, 191, 72, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            animation: slideDown 0.3s ease;
        `;
        
        this.form.insertBefore(messageEl, this.form.firstChild);
        
        setTimeout(() => {
            messageEl.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
};
```

### 2. Load Projects Dynamically (Optional)

Add this function to load projects from the API:

```javascript
const portfolioLoader = {
    container: document.querySelector('.portfolio-grid'),
    
    async init() {
        if (!this.container) return;
        await this.loadProjects();
    },
    
    async loadProjects() {
        try {
            const response = await fetch(`${API_CONFIG.baseURL}/projects?featured=true`);
            const result = await response.json();
            
            if (result.success && result.data.length > 0) {
                this.renderProjects(result.data);
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    },
    
    renderProjects(projects) {
        this.container.innerHTML = projects.map(project => `
            <div class="portfolio-item">
                <div class="portfolio-image">
                    ${project.image 
                        ? `<img src="${project.image}" alt="${project.title}">`
                        : `<div class="portfolio-placeholder">
                               <i class="fas fa-shopping-bag"></i>
                           </div>`
                    }
                    <div class="portfolio-overlay">
                        ${project.liveUrl 
                            ? `<a href="${project.liveUrl}" target="_blank" class="portfolio-link" aria-label="View project">
                                   <i class="fas fa-external-link-alt"></i>
                               </a>`
                            : ''
                        }
                    </div>
                </div>
                <div class="portfolio-content">
                    <span class="portfolio-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="portfolio-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing init calls
    portfolioLoader.init();
});
```

### 3. Add Analytics Tracking (Optional)

Track page views:

```javascript
const analytics = {
    init() {
        this.trackPageView();
    },
    
    async trackPageView() {
        try {
            await fetch(`${API_CONFIG.baseURL}/analytics/pageview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page: window.location.pathname,
                    referrer: document.referrer || 'direct'
                })
            });
        } catch (error) {
            console.error('Analytics error:', error);
        }
    }
};

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // ... existing init calls
    analytics.init();
});
```

## 🔧 Configuration Options

### Environment-Based API URLs

For different environments:

```javascript
const getAPIBaseURL = () => {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:5000/api';
    }
    
    if (hostname.includes('github.io')) {
        return 'https://your-heroku-app.herokuapp.com/api';
    }
    
    return 'https://api.yourdomain.com/api';
};

const API_CONFIG = {
    baseURL: getAPIBaseURL()
};
```

### Error Handling

Add comprehensive error handling:

```javascript
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};

// Usage
try {
    const result = await apiRequest('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
    });
    
    if (result.success) {
        // Handle success
    }
} catch (error) {
    // Handle error
}
```

## 🌐 CORS Configuration

If you encounter CORS errors:

### Backend (server.js)

Ensure CORS is configured correctly:

```javascript
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://yourusername.github.io',
        'https://yourdomain.com'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

### Frontend

If still having issues, you might need to deploy backend first or use a CORS proxy during development.

## 📱 Testing the Integration

### 1. Test Locally

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Serve Frontend:**
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node
   npx http-server -p 3000
   ```

3. **Test Contact Form:**
   - Open http://localhost:3000
   - Fill out and submit contact form
   - Check backend console for logs
   - Check your email for message

### 2. Test API Endpoints

Using curl or Postman:

```bash
# Health check
curl http://localhost:5000/health

# Contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing the API"
  }'

# Get projects
curl http://localhost:5000/api/projects
```

## 🚀 Production Deployment

### 1. Deploy Backend

Follow the [Backend Deployment Guide](backend/DEPLOYMENT.md)

Get your API URL (e.g., `https://your-app.herokuapp.com`)

### 2. Update Frontend

Replace the API URL in your frontend:

```javascript
const API_CONFIG = {
    baseURL: 'https://your-app.herokuapp.com/api'
};
```

### 3. Deploy Frontend

Push to GitHub Pages:

```bash
git add .
git commit -m "Connect to production API"
git push origin main
```

### 4. Test Production

Visit your GitHub Pages site and test:
- Contact form submission
- Check email delivery
- Check browser console for errors

## 🐛 Common Issues & Solutions

### Issue: CORS Error

**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
- Add your frontend URL to backend CORS origins
- Update `ALLOWED_ORIGINS` in backend `.env`
- Restart backend server

### Issue: 404 Not Found

**Error:** `POST http://... 404 (Not Found)`

**Solution:**
- Verify API URL is correct
- Check backend is running
- Verify route paths match

### Issue: Contact Form Not Sending

**Error:** `Failed to send message`

**Solution:**
- Check backend logs for errors
- Verify SMTP credentials
- Test email configuration
- Check rate limiting (try from different IP)

### Issue: Projects Not Loading

**Error:** Projects section empty

**Solution:**
- Check browser console for errors
- Verify projects exist in database
- Run `npm run seed` to add sample data
- Check API response in Network tab

## 📊 Monitoring & Debugging

### Frontend Debugging

Add console logging:

```javascript
const contactForm = {
    async handleSubmit(e) {
        console.log('Submitting form...', data);
        
        try {
            const response = await fetch(...);
            console.log('Response:', response);
            
            const result = await response.json();
            console.log('Result:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
```

### Backend Monitoring

Check logs:

```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Local
# Logs appear in console where you ran npm run dev
```

## 📝 Best Practices

1. **Environment Variables**
   - Never commit API URLs with credentials
   - Use environment-based configuration

2. **Error Handling**
   - Always wrap API calls in try-catch
   - Show user-friendly error messages
   - Log errors for debugging

3. **Loading States**
   - Show loading indicators during API calls
   - Disable buttons to prevent double submissions

4. **Rate Limiting**
   - Respect API rate limits
   - Don't make unnecessary API calls
   - Cache responses when appropriate

5. **Security**
   - Validate input on frontend AND backend
   - Sanitize user input
   - Use HTTPS in production

## 🎯 Next Steps

- [ ] Set up backend with database
- [ ] Deploy backend to hosting platform
- [ ] Update frontend with API URLs
- [ ] Test all integrations
- [ ] Monitor for errors
- [ ] Add more features (authentication, admin panel)

## 📚 Additional Resources

- [Backend README](backend/README.md)
- [Backend Deployment Guide](backend/DEPLOYMENT.md)
- [Frontend README](README.md)

## 📞 Support

Need help with integration?
- Open an issue on GitHub
- Email: nyasha@example.com

---

**Happy coding!** 🚀

