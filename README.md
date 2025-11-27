# Nyasha Madzokere - Shopify Developer Portfolio

A modern, SEO-optimized personal portfolio website showcasing expertise in Shopify development and e-commerce solutions. Built with vanilla HTML, CSS, and JavaScript for optimal performance and easy deployment on GitHub Pages.

## 🌟 Features

### Design & UX
- **Modern & Unique Design**: Custom gradient orbs, smooth animations, and contemporary UI elements
- **Responsive Layout**: Fully responsive design that works seamlessly on all devices
- **Custom Cursor**: Interactive custom cursor effect for desktop users
- **Smooth Animations**: Intersection Observer API for scroll-triggered animations
- **Parallax Effects**: Subtle parallax scrolling for engaging visual experience

### SEO Optimization
- **Semantic HTML5**: Proper heading hierarchy and semantic elements
- **Meta Tags**: Comprehensive meta tags for search engines and social media
- **Open Graph & Twitter Cards**: Optimized social media sharing
- **Structured Data**: JSON-LD schema markup for enhanced search results
- **Fast Loading**: Optimized code and assets for quick page loads
- **Mobile-First**: Responsive design that prioritizes mobile experience
- **Accessibility**: ARIA labels and keyboard navigation support

### Performance
- **Lightweight**: No heavy frameworks or libraries
- **Optimized JavaScript**: Debounced and throttled event listeners
- **CSS Variables**: Easy theming and consistent styling
- **Lazy Loading Ready**: Structure supports image lazy loading

### Sections
1. **Hero**: Eye-catching introduction with animated statistics
2. **About**: Personal story and expertise highlight
3. **Services**: Detailed service offerings with hover effects
4. **Portfolio**: Project showcase with category tags
5. **Skills**: Technical skills with animated progress bars
6. **Contact**: Contact form and social media links
7. **Footer**: Quick navigation and additional information

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   Simply open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

3. **Use a local server (recommended)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   
   Then visit `http://localhost:8000`

## 📦 Deployment to GitHub Pages

### Method 1: Direct Push (Recommended)

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it: `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - Make it public
   - Don't initialize with README (we already have one)

2. **Push your code**
   ```bash
   git init
   git add.
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "main" branch
   - Click Save
   - Your site will be live at `https://yourusername.github.io`

### Method 2: Using GitHub Desktop

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Create new repository** and add all files
3. **Publish to GitHub** with repository name `yourusername.github.io`
4. **Enable GitHub Pages** in repository settings

### Method 3: Using Custom Domain

1. **Follow Method 1** to deploy to GitHub Pages
2. **Add custom domain**:
   - In repository root, create a file named `CNAME`
   - Add your domain (e.g., `nyashamadzokere.com`)
   - Commit and push
3. **Configure DNS**:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to `yourusername.github.io`

## 🎨 Customization

### 1. Personal Information

Edit `index.html` to update:
- Your name and title
- Contact information (email, phone, location)
- Social media links
- Statistics numbers
- Portfolio projects
- Service descriptions

### 2. Colors & Branding

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #96bf48;      /* Main brand color */
    --secondary-color: #5c8a2e;    /* Secondary color */
    --accent-color: #7fb800;       /* Accent color */
    /* ... other variables */
}
```

### 3. Content

Update text content in `index.html`:
- About section description
- Services offered
- Portfolio items
- Skills and percentages
- Contact information

### 4. Images

Add your images to an `assets` or `images` folder:
- Replace portfolio placeholder with actual project images
- Add a profile photo
- Create OG image (1200x630px) for social media sharing
- Update image paths in HTML

### 5. SEO Configuration

Update meta tags in `index.html`:
- Title and description
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Structured data (JSON-LD)

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with animations
├── script.js           # JavaScript functionality
├── README.md           # Documentation (this file)
├── robots.txt          # SEO crawler instructions
├── sitemap.xml         # XML sitemap for search engines
├── .gitignore          # Git ignore file
├── favicon.png         # Website favicon
└── assets/             # Images and media (create this folder)
    ├── og-image.jpg    # Open Graph image
    └── projects/       # Portfolio project images
```

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Vanilla JS, no dependencies
- **Font Awesome**: Icon library (CDN)
- **Google Fonts**: Inter & Space Grotesk

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance Optimizations
- Minimal HTTP requests
- Debounced/throttled scroll events
- CSS animations (GPU accelerated)
- Lazy loading structure
- Compressed code ready

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Laptop**: 968px - 1199px
- **Tablet**: 768px - 967px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ✅ SEO Checklist

- [x] Semantic HTML structure
- [x] Meta description and keywords
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] Mobile-friendly design
- [x] Fast loading time
- [x] Alt tags for images (add when you add images)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] HTTPS ready (GitHub Pages provides this)

## 🎯 Post-Deployment Tasks

1. **Test your website**
   - Check all links work correctly
   - Test on different devices and browsers
   - Verify mobile responsiveness

2. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Submit to Bing Webmaster Tools
   - Verify Open Graph tags with Facebook Debugger
   - Test Twitter Cards with Twitter Card Validator

3. **Analytics** (Optional)
   - Add Google Analytics
   - Add Google Tag Manager
   - Set up conversion tracking

4. **Performance**
   - Test with Google PageSpeed Insights
   - Test with GTmetrix
   - Optimize images if needed

5. **Social Media**
   - Share on LinkedIn
   - Share on Twitter
   - Add to your resume/CV

## 🔍 Testing Tools

- **SEO**: 
  - Google Search Console
  - Bing Webmaster Tools
  - Ahrefs Site Audit
  
- **Performance**: 
  - Google PageSpeed Insights
  - GTmetrix
  - WebPageTest
  
- **Mobile**: 
  - Google Mobile-Friendly Test
  - BrowserStack
  
- **Accessibility**: 
  - WAVE Web Accessibility Evaluation Tool
  - axe DevTools

## 📞 Support & Contact

For questions or issues with this portfolio template:
- Open an issue on GitHub
- Contact via email: nyasha@example.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Shopify community for inspiration

---

**Built with ❤️ for the Shopify developer community**

Last Updated: November 2024

