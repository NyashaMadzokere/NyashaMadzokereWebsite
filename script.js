// ========================
// Custom Cursor
// ========================
const cursor = {
    dot: document.querySelector('[data-cursor-dot]'),
    outline: document.querySelector('[data-cursor-outline]'),
    
    init() {
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => this.move(e));
            document.addEventListener('mousedown', () => this.click());
            document.addEventListener('mouseup', () => this.release());
            
            // Add hover effects
            const hoverable = document.querySelectorAll('a, button, .service-card, .portfolio-item, .tech-icon');
            hoverable.forEach(el => {
                el.addEventListener('mouseenter', () => this.hover());
                el.addEventListener('mouseleave', () => this.unhover());
            });
        }
    },
    
    move(e) {
        this.dot.style.left = `${e.clientX}px`;
        this.dot.style.top = `${e.clientY}px`;
        this.outline.style.left = `${e.clientX}px`;
        this.outline.style.top = `${e.clientY}px`;
    },
    
    hover() {
        this.outline.style.width = '60px';
        this.outline.style.height = '60px';
        this.dot.style.width = '4px';
        this.dot.style.height = '4px';
    },
    
    unhover() {
        this.outline.style.width = '40px';
        this.outline.style.height = '40px';
        this.dot.style.width = '8px';
        this.dot.style.height = '8px';
    },
    
    click() {
        this.outline.style.width = '30px';
        this.outline.style.height = '30px';
    },
    
    release() {
        this.outline.style.width = '40px';
        this.outline.style.height = '40px';
    }
};

// ========================
// Navigation
// ========================
const navigation = {
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileToggle: document.getElementById('mobileMenuToggle'),
    navMenu: document.getElementById('navMenu'),
    
    init() {
        this.handleScroll();
        this.handleActiveLink();
        this.handleMobileMenu();
        this.handleSmoothScroll();
        
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.handleActiveLink();
        });
    },
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    handleActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    
    handleMobileMenu() {
        this.mobileToggle.addEventListener('click', () => {
            this.mobileToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    },
    
    handleSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ========================
// Stats Counter
// ========================
const statsCounter = {
    stats: document.querySelectorAll('.stat-number'),
    animated: false,
    
    init() {
        window.addEventListener('scroll', () => this.animate());
    },
    
    animate() {
        if (this.animated) return;
        
        const heroSection = document.querySelector('.hero');
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const scrollY = window.pageYOffset;
        
        if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
            this.animated = true;
            this.stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
};

// ========================
// Skills Progress Bars
// ========================
const skillsAnimation = {
    skillBars: document.querySelectorAll('.skill-progress'),
    animated: false,
    
    init() {
        window.addEventListener('scroll', () => this.animate());
    },
    
    animate() {
        if (this.animated) return;
        
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.offsetTop;
        const sectionHeight = skillsSection.offsetHeight;
        const scrollY = window.pageYOffset + window.innerHeight;
        
        if (scrollY > sectionTop + 200) {
            this.animated = true;
            this.skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 100);
            });
        }
    }
};

// ========================
// Intersection Observer for Animations
// ========================
const animateOnScroll = {
    observer: null,
    
    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe elements
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-card, .contact-item, .skill-category, .tech-stack');
        elements.forEach(el => this.observer.observe(el));
    }
};

// ========================
// Back to Top Button
// ========================
const backToTop = {
    button: document.getElementById('backToTop'),
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', () => this.toggle());
        this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    toggle() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ========================
// Contact Form
// ========================
const contactForm = {
    form: document.getElementById('contactForm'),
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show success message (you would typically send this to a server)
        this.showMessage('success', 'Thank you for your message! I\'ll get back to you soon.');
        this.form.reset();
    },
    
    showMessage(type, message) {
        // Create message element
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
        
        // Insert at top of form
        this.form.insertBefore(messageEl, this.form.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
};

// ========================
// Parallax Effect for Hero
// ========================
const parallax = {
    hero: document.querySelector('.hero'),
    orbs: document.querySelectorAll('.gradient-orb'),
    
    init() {
        if (!this.hero) return;
        window.addEventListener('scroll', () => this.animate());
    },
    
    animate() {
        const scrolled = window.pageYOffset;
        const heroHeight = this.hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            this.orbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                orb.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.1}px) scale(${1 + scrolled * 0.0001})`;
            });
        }
    }
};

// ========================
// Portfolio Filter (Future Enhancement)
// ========================
const portfolioFilter = {
    init() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Add click event to portfolio links
        portfolioItems.forEach(item => {
            const link = item.querySelector('.portfolio-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    // You can add modal or external link functionality here
                    console.log('Portfolio item clicked');
                });
            }
        });
    }
};

// ========================
// Blog Filter & Load More
// ========================
const blogManager = {
    filters: document.querySelectorAll('.filter-btn'),
    blogCards: document.querySelectorAll('.blog-card'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    itemsPerPage: 6,
    currentPage: 1,
    currentFilter: 'all',
    
    init() {
        if (!this.filters.length) return;
        
        this.setupFilters();
        this.setupLoadMore();
        this.showInitialPosts();
    },
    
    setupFilters() {
        this.filters.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    },
    
    setupLoadMore() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
    },
    
    handleFilter(e) {
        const btn = e.target;
        const category = btn.getAttribute('data-category');
        
        // Update active state
        this.filters.forEach(f => f.classList.remove('active'));
        btn.classList.add('active');
        
        // Reset pagination
        this.currentPage = 1;
        this.currentFilter = category;
        
        // Filter and show posts
        this.filterPosts(category);
    },
    
    filterPosts(category) {
        let visibleCount = 0;
        
        this.blogCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;
            
            if (shouldShow) {
                visibleCount++;
                if (visibleCount <= this.itemsPerPage) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                } else {
                    card.classList.add('hidden');
                }
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Update load more button visibility
        this.updateLoadMoreBtn(visibleCount);
    },
    
    showInitialPosts() {
        let count = 0;
        this.blogCards.forEach((card, index) => {
            if (count < this.itemsPerPage) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
                count++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        this.updateLoadMoreBtn(this.blogCards.length);
    },
    
    loadMore() {
        this.currentPage++;
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        let visibleCount = 0;
        
        this.blogCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = this.currentFilter === 'all' || cardCategory === this.currentFilter;
            
            if (shouldShow) {
                if (!card.classList.contains('hidden')) {
                    visibleCount++;
                } else if (visibleCount < endIndex) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    visibleCount++;
                }
            }
        });
        
        // Scroll to first new item
        const firstNewItem = Array.from(this.blogCards).find((card, index) => {
            return !card.classList.contains('hidden') && 
                   index >= startIndex && 
                   index < endIndex;
        });
        
        if (firstNewItem) {
            setTimeout(() => {
                firstNewItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
        
        this.updateLoadMoreBtn(visibleCount);
    },
    
    updateLoadMoreBtn(visibleCount) {
        if (!this.loadMoreBtn) return;
        
        // Count total filterable items
        let totalFilterableItems = 0;
        this.blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const shouldCount = this.currentFilter === 'all' || cardCategory === this.currentFilter;
            if (shouldCount) totalFilterableItems++;
        });
        
        // Show/hide load more button
        if (visibleCount >= totalFilterableItems) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'inline-flex';
        }
    }
};

// ========================
// Blog API Loader (Optional - for dynamic loading)
// ========================
const blogAPI = {
    apiURL: (function() {
        // Development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000/api';
        }
        // Production (update after deploying backend)
        return 'https://your-portfolio-api.herokuapp.com/api';
    })(),
    blogGrid: document.getElementById('blogGrid'),
    
    async init() {
        // Uncomment to load blogs from API
        // await this.loadBlogs();
    },
    
    async loadBlogs() {
        try {
            const response = await fetch(`${this.apiURL}/blog?limit=10&published=true`);
            const result = await response.json();
            
            if (result.success && result.data.length > 0) {
                this.renderBlogs(result.data);
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
        }
    },
    
    renderBlogs(blogs) {
        if (!this.blogGrid) return;
        
        this.blogGrid.innerHTML = blogs.map(blog => `
            <article class="blog-card" data-category="${blog.category}">
                <div class="blog-image">
                    ${blog.featuredImage 
                        ? `<img src="${blog.featuredImage}" alt="${blog.title}">`
                        : `<div class="blog-image-placeholder">
                               <i class="fas fa-newspaper"></i>
                           </div>`
                    }
                    <span class="blog-badge">${blog.category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="far fa-calendar"></i> ${this.formatDate(blog.publishedDate)}</span>
                        <span><i class="far fa-clock"></i> ${blog.readTime} min read</span>
                    </div>
                    <h3>
                        <a href="blog/${blog.slug}">${blog.title}</a>
                    </h3>
                    <p>${blog.excerpt}</p>
                    <div class="blog-footer">
                        <div class="blog-tags">
                            ${blog.tags.map(tag => `<span>${tag}</span>`).join('')}
                        </div>
                        <a href="blog/${blog.slug}" class="read-more">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </article>
        `).join('');
        
        // Reinitialize blog manager
        blogManager.init();
    },
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
};

// ========================
// Typing Effect (Optional)
// ========================
const typingEffect = {
    element: null,
    text: 'Shopify Developer',
    index: 0,
    speed: 100,
    
    init() {
        // You can enable this by adding a data attribute to any element
        this.element = document.querySelector('[data-typing]');
        if (this.element) {
            this.text = this.element.getAttribute('data-typing');
            this.element.textContent = '';
            this.type();
        }
    },
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
};

// ========================
// Loading Animation
// ========================
const loader = {
    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Add entrance animations with delay
            const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons, .hero-stats');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.animation = `fadeIn 0.8s ease forwards`;
                }, index * 100);
            });
        });
    }
};

// ========================
// Smooth Scroll for All Links
// ========================
const smoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

// ========================
// Performance Observer (Optional)
// ========================
const performanceMonitor = {
    init() {
        if ('PerformanceObserver' in window) {
            // Monitor page load performance
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page loaded in ${pageLoadTime}ms`);
            });
        }
    }
};

// ========================
// Service Worker Registration (Optional for PWA)
// ========================
const serviceWorker = {
    init() {
        if ('serviceWorker' in navigator) {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js')
            //     .then(reg => console.log('Service Worker registered', reg))
            //     .catch(err => console.log('Service Worker registration failed', err));
        }
    }
};

// ========================
// Initialize All Features
// ========================
document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    navigation.init();
    statsCounter.init();
    skillsAnimation.init();
    animateOnScroll.init();
    backToTop.init();
    contactForm.init();
    parallax.init();
    portfolioFilter.init();
    blogManager.init();
    blogAPI.init();
    typingEffect.init();
    loader.init();
    smoothScroll.init();
    performanceMonitor.init();
    serviceWorker.init();
    
    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #96bf48; font-size: 20px; font-weight: bold;');
    console.log('%c Built with ❤️ for the Shopify community', 'color: #94a3b8; font-size: 12px;');
});

// ========================
// Utility Functions
// ========================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add optimized scroll event listener
const optimizedScroll = throttle(() => {
    // Any scroll-based functionality can be added here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Handle viewport resize
const handleResize = debounce(() => {
    // Recalculate any viewport-dependent values
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}, 250);

window.addEventListener('resize', handleResize);
handleResize(); // Initial call

// Prevent horizontal scroll
document.body.style.overflowX = 'hidden';

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add focus visible styles for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Log page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cursor,
        navigation,
        statsCounter,
        skillsAnimation,
        animateOnScroll,
        backToTop,
        contactForm,
        parallax,
        portfolioFilter
    };
}

