# Deployment Guide for GitHub Pages

This guide will walk you through deploying your Shopify Developer portfolio to GitHub Pages step by step.

## Prerequisites

- A GitHub account (create one at https://github.com)
- Git installed on your computer (download from https://git-scm.com)
- Your portfolio files ready

## Step 1: Prepare Your Repository

### Option A: Create a User Site (Recommended)

1. **Create a new repository** on GitHub
2. **Name it exactly**: `yourusername.github.io` (replace `yourusername` with your GitHub username)
3. **Make it Public**
4. **Do NOT initialize** with README, .gitignore, or license

Your site will be available at: `https://yourusername.github.io`

### Option B: Create a Project Site

1. **Create a new repository** with any name (e.g., `portfolio`)
2. **Make it Public**

Your site will be available at: `https://yourusername.github.io/portfolio`

## Step 2: Customize Your Site

Before deploying, update these important items:

### 1. Update Personal Information

In `index.html`, update:
```html
<!-- Line ~10: Page title -->
<title>Your Name - Expert Shopify Developer</title>

<!-- Line ~5: Meta description -->
<meta name="description" content="Your custom description">

<!-- Lines ~11-14: Open Graph tags -->
<meta property="og:url" content="https://yourusername.github.io/">
<meta property="og:title" content="Your Name - Expert Shopify Developer">

<!-- Update all instances of "Nyasha Madzokere" with your name -->
```

### 2. Update Contact Information

In `index.html`, find the contact section and update:
```html
<!-- Email -->
<a href="mailto:your-email@example.com">your-email@example.com</a>

<!-- Phone -->
<a href="tel:+1234567890">+1 (234) 567-890</a>

<!-- Social media links -->
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
```

### 3. Update URLs in Configuration Files

In `sitemap.xml`, replace all instances of:
```
https://nyashamadzokere.github.io/
```
with your GitHub Pages URL:
```
https://yourusername.github.io/
```

In `robots.txt`, update the sitemap URL:
```
Sitemap: https://yourusername.github.io/sitemap.xml
```

### 4. Optional: Add Custom Domain

If you have a custom domain, uncomment and edit `CNAME`:
```
yourdomain.com
```

## Step 3: Initialize Git Repository

Open your terminal/command prompt in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit: Shopify developer portfolio"

# Rename branch to main (if needed)
git branch -M main
```

## Step 4: Connect to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push your code
git push -u origin main
```

If prompted, enter your GitHub username and password (or personal access token).

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (tab at the top)
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**:
   - Branch: Select `main`
   - Folder: Select `/ (root)`
5. Click **Save**

## Step 6: Wait for Deployment

- GitHub will build and deploy your site (usually takes 1-3 minutes)
- You'll see a green success message with your site URL
- Visit `https://yourusername.github.io` to see your live site!

## Step 7: Post-Deployment Tasks

### Test Your Website
- Check all links work
- Test on mobile devices
- Verify forms work correctly
- Test social media sharing

### Submit to Search Engines

1. **Google Search Console**
   - Go to https://search.google.com/search-console
   - Add your property
   - Verify ownership
   - Submit your sitemap: `https://yourusername.github.io/sitemap.xml`

2. **Bing Webmaster Tools**
   - Go to https://www.bing.com/webmasters
   - Add your site
   - Submit sitemap

### Set Up Analytics (Optional)

Add Google Analytics by inserting before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Making Updates

Whenever you want to update your site:

```bash
# Make your changes to the files

# Stage changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild and deploy your site!

## Using a Custom Domain

### 1. Add CNAME File

Edit the `CNAME` file in your repository:
```
yourdomain.com
```

Commit and push:
```bash
git add CNAME
git commit -m "Add custom domain"
git push
```

### 2. Configure DNS

Add these DNS records at your domain registrar:

**For apex domain (yourdomain.com):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: yourusername.github.io
```

### 3. Enable HTTPS

1. Go to repository Settings → Pages
2. Check **Enforce HTTPS**
3. Wait for certificate to provision (can take up to 24 hours)

## Troubleshooting

### Site Not Loading
- Wait 5-10 minutes after first deployment
- Check that GitHub Pages is enabled in Settings
- Verify the branch is set to `main`

### 404 Error
- Ensure `index.html` is in the root directory
- Check repository is public
- Verify the URL is correct

### Custom Domain Not Working
- Wait up to 48 hours for DNS propagation
- Check CNAME file is correct
- Verify DNS records at your registrar

### Images Not Loading
- Check file paths are relative (not absolute)
- Ensure images are committed to repository
- Verify case sensitivity in file names

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [Markdown Guide](https://www.markdownguide.org)

## Need Help?

- Check the main [README.md](README.md) for more information
- Open an issue on GitHub
- Contact: nyasha@example.com

---

**Congratulations!** 🎉 Your portfolio is now live on the internet!

Share it with potential clients, on your resume, and across social media platforms.

