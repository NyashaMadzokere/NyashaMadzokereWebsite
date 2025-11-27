// Content Loader - Loads website content from API
// Add this to your main script.js or include as separate file

const contentLoader = {
    apiURL: (function() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000/api';
        }
        return 'https://your-backend-url.herokuapp.com/api';
    })(),
    
    contentCache: {},
    
    async init() {
        // Optionally load content on page load
        // Uncomment to enable:
        // await this.loadAllContent();
    },
    
    async loadAllContent() {
        try {
            const response = await fetch(`${this.apiURL}/content`);
            const data = await response.json();
            
            if (data.success) {
                data.data.forEach(section => {
                    this.contentCache[section.section] = section;
                });
                this.updatePageContent();
            }
        } catch (error) {
            console.error('Error loading content:', error);
        }
    },
    
    async loadSection(sectionName) {
        try {
            const response = await fetch(`${this.apiURL}/content/${sectionName}`);
            const data = await response.json();
            
            if (data.success) {
                this.contentCache[sectionName] = data.data;
                return data.data;
            }
        } catch (error) {
            console.error(`Error loading ${sectionName}:`, error);
        }
        return null;
    },
    
    updatePageContent() {
        // Update Hero Section
        if (this.contentCache.hero) {
            const hero = this.contentCache.hero;
            const heroTitle = document.querySelector('.hero-title');
            const heroDesc = document.querySelector('.hero-description');
            
            if (heroTitle && hero.title) {
                heroTitle.innerHTML = hero.title.replace(/\n/g, '<br>');
            }
            if (heroDesc && hero.description) {
                heroDesc.textContent = hero.description;
            }
            
            // Update stats
            if (hero.content && hero.content.stats) {
                hero.content.stats.forEach((stat, index) => {
                    const statEl = document.querySelectorAll('.stat-number')[index];
                    if (statEl) {
                        statEl.setAttribute('data-target', stat.number);
                        statEl.textContent = '0';
                    }
                });
            }
        }
        
        // Update About Section
        if (this.contentCache.about) {
            const about = this.contentCache.about;
            const aboutTitle = document.querySelector('#about h3');
            const aboutDesc = document.querySelector('#about p');
            
            if (aboutTitle && about.title) {
                aboutTitle.textContent = about.title;
            }
            if (aboutDesc && about.description) {
                aboutDesc.textContent = about.description;
            }
        }
        
        // Update Services Section
        if (this.contentCache.services) {
            const services = this.contentCache.services;
            const servicesTitle = document.querySelector('#services .section-title');
            
            if (servicesTitle && services.title) {
                servicesTitle.textContent = services.title;
            }
        }
        
        // Update Contact Section
        if (this.contentCache.contact) {
            const contact = this.contentCache.contact;
            const contactTitle = document.querySelector('#contact .section-title');
            const contactEmail = document.querySelector('#contact a[href^="mailto:"]');
            const contactPhone = document.querySelector('#contact a[href^="tel:"]');
            
            if (contactTitle && contact.title) {
                contactTitle.textContent = contact.title;
            }
            if (contact.content) {
                if (contactEmail && contact.content.email) {
                    contactEmail.href = `mailto:${contact.content.email}`;
                    contactEmail.textContent = contact.content.email;
                }
                if (contactPhone && contact.content.phone) {
                    contactPhone.href = `tel:${contact.content.phone}`;
                    contactPhone.textContent = contact.content.phone;
                }
            }
        }
    },
    
    getSection(sectionName) {
        return this.contentCache[sectionName] || null;
    }
};

// Auto-load on page load (optional)
// document.addEventListener('DOMContentLoaded', () => {
//     contentLoader.init();
// });

