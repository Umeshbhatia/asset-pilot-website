// Enhanced Asset Pilot JavaScript with Perfect Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initPhoneMockup();
    initCounterAnimations();
    initGallery();
    initLightbox();
    initContactForm();
    initScrollAnimations();
    initMobileMenu();

    console.log('🚀 Asset Pilot initialized successfully!');

    // Navigation functionality
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link:not(.btn)');
        const navbar = document.getElementById('mainNav');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - (navbar?.offsetHeight || 80);
                        window.scrollTo({
                            top: Math.max(0, offsetTop),
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        updateActiveNavLink(href);
                        
                        // Close mobile menu if open
                        closeMobileMenu();
                    }
                }
            });
        });

        function updateActiveNavLink(activeHref) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === activeHref) {
                    link.classList.add('active');
                }
            });
        }

        // Update active nav on scroll
        let ticking = false;
        function updateNavOnScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sections = document.querySelectorAll('section[id]');
                    const scrollPos = window.pageYOffset + 100;
                    
                    sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;
                        const sectionId = '#' + section.getAttribute('id');
                        
                        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                            updateActiveNavLink(sectionId);
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', updateNavOnScroll);
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarMenu = document.querySelector('.navbar-menu');
        
        if (navbarToggler && navbarMenu) {
            navbarToggler.addEventListener('click', function() {
                navbarMenu.classList.toggle('active');
                navbarToggler.classList.toggle('active');
                
                // Animate hamburger icon
                const icons = navbarToggler.querySelectorAll('.navbar-toggler-icon');
                icons.forEach((icon, index) => {
                    if (navbarToggler.classList.contains('active')) {
                        if (index === 0) {
                            icon.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        } else if (index === 1) {
                            icon.style.opacity = '0';
                        } else if (index === 2) {
                            icon.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                        }
                    } else {
                        icon.style.transform = 'none';
                        icon.style.opacity = '1';
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.navbar') && navbarMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
    }

    function closeMobileMenu() {
        const navbarMenu = document.querySelector('.navbar-menu');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarMenu && navbarToggler) {
            navbarMenu.classList.remove('active');
            navbarToggler.classList.remove('active');
            
            // Reset hamburger icon
            const icons = navbarToggler.querySelectorAll('.navbar-toggler-icon');
            icons.forEach(icon => {
                icon.style.transform = 'none';
                icon.style.opacity = '1';
            });
        }
    }

    // Scroll effects for navbar
    function initScrollEffects() {
        const navbar = document.getElementById('mainNav');
        let lastScrollTop = 0;
        let ticking = false;

        function updateNavbar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    // Enhanced Phone Mockup with smooth transitions
    function initPhoneMockup() {
        const screens = document.querySelectorAll('.screen-content');
        const phoneIndicator = document.querySelector('.phone-indicator');
        let currentScreen = 0;
        
        const screenData = [
            { 
                title: 'Secure Login', 
                description: 'Role-based authentication system' 
            },
            { 
                title: 'Dashboard Overview', 
                description: 'Real-time metrics and status tracking' 
            },
            { 
                title: 'Navigation Menu', 
                description: 'Access all application features' 
            },
            { 
                title: 'Complaint Management', 
                description: 'Track all service requests and status' 
            },
            { 
                title: 'Parts Inventory', 
                description: 'Manage stock and part requests' 
            },
            { 
                title: 'Real-time Notifications', 
                description: 'Stay updated on all activities' 
            }
        ];
        
        function updateIndicator() {
            if (phoneIndicator && screenData[currentScreen]) {
                const titleElement = phoneIndicator.querySelector('.screen-title');
                const descElement = phoneIndicator.querySelector('.screen-description');
                
                if (titleElement) {
                    titleElement.style.opacity = '0';
                    setTimeout(() => {
                        titleElement.textContent = screenData[currentScreen].title;
                        titleElement.style.opacity = '1';
                    }, 200);
                }
                
                if (descElement) {
                    descElement.style.opacity = '0';
                    setTimeout(() => {
                        descElement.textContent = screenData[currentScreen].description;
                        descElement.style.opacity = '1';
                    }, 300);
                }
            }
        }
        
        function rotateScreens() {
            if (screens.length === 0) return;
            
            // Hide current screen with fade out
            const currentScreenElement = screens[currentScreen];
            currentScreenElement.style.opacity = '0';
            currentScreenElement.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                currentScreenElement.classList.remove('active');
                
                // Move to next screen
                currentScreen = (currentScreen + 1) % screens.length;
                
                // Show next screen with fade in
                const nextScreenElement = screens[currentScreen];
                nextScreenElement.classList.add('active');
                
                setTimeout(() => {
                    nextScreenElement.style.opacity = '1';
                    nextScreenElement.style.transform = 'scale(1)';
                }, 50);
                
                // Update indicator
                updateIndicator();
            }, 400);
        }
        
        // Initialize first screen
        if (screens.length > 0) {
            screens[0].classList.add('active');
            screens[0].style.opacity = '1';
            screens[0].style.transform = 'scale(1)';
            updateIndicator();
            
            // Start rotation
            setInterval(rotateScreens, 4500);
        }
    }

    // Counter animations with intersection observer
    function initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                    counter.classList.add('counted');
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });

        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 60; // 60 steps for smooth animation
            const duration = 2000;
            const stepTime = duration / 60;

            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number for display
                let displayValue;
                if (target === 99.9) {
                    displayValue = current.toFixed(1);
                } else if (target >= 10) {
                    displayValue = Math.floor(current);
                } else {
                    displayValue = Math.floor(current);
                }
                
                element.textContent = displayValue;
            }, stepTime);
        }
    }

    // Enhanced Gallery functionality
    function initGallery() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items with smooth animation
                galleryItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        setTimeout(() => {
                            item.classList.remove('hidden');
                            item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
                        }, 150);
                    } else {
                        item.style.animation = 'fadeOut 0.3s ease both';
                        setTimeout(() => {
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
            });
        });

        // Lazy loading for gallery images
        const galleryImages = document.querySelectorAll('.gallery-image img');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (!img.classList.contains('loaded')) {
                        img.style.opacity = '0';
                        img.style.transform = 'scale(1.1)';
                        
                        img.onload = () => {
                            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                            img.style.opacity = '1';
                            img.style.transform = 'scale(1)';
                        };
                        
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, { threshold: 0.1 });

        galleryImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced Lightbox functionality
    function initLightbox() {
        const lightboxModal = document.getElementById('lightboxModal');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxDescription = document.getElementById('lightboxDescription');
        const lightboxClose = document.querySelector('.lightbox-close');
        const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

        // Make openLightbox function global
        window.openLightbox = function(element) {
            const galleryCard = element.closest('.gallery-card');
            if (!galleryCard) return;

            const img = galleryCard.querySelector('.gallery-image img');
            const title = galleryCard.querySelector('.gallery-overlay-content h5')?.textContent || 
                         galleryCard.querySelector('.gallery-info h6')?.textContent || 'Image';
            const description = galleryCard.querySelector('.gallery-overlay-content p')?.textContent || '';
            
            if (img && lightboxImage) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxTitle.textContent = title;
                lightboxDescription.textContent = description;
                
                lightboxModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                // Fade in animation
                setTimeout(() => {
                    lightboxModal.style.opacity = '1';
                }, 10);
            }
        };

        // Make closeLightbox function global
        window.closeLightbox = function() {
            lightboxModal.style.opacity = '0';
            
            setTimeout(() => {
                lightboxModal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };

        // Event listeners
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        if (lightboxBackdrop) {
            lightboxBackdrop.addEventListener('click', closeLightbox);
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
                closeLightbox();
            }
        });

        // Gallery card click handlers
        const galleryCards = document.querySelectorAll('.gallery-card');
        galleryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.btn')) {
                    openLightbox(this);
                }
            });
        });
    }

    // Enhanced Contact Form
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        const inputs = contactForm?.querySelectorAll('.form-control');
        
        // Enhanced input focus effects
        inputs?.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value.trim() !== '') {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = document.getElementById('firstName')?.value.trim();
                const lastName = document.getElementById('lastName')?.value.trim();
                const email = document.getElementById('email')?.value.trim();
                const message = document.getElementById('message')?.value.trim();
                
                // Validation
                if (!firstName || !lastName || !email || !message) {
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    
                    // Remove filled classes
                    inputs?.forEach(input => {
                        input.parentElement?.classList.remove('filled');
                    });
                    
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2500);
            });
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }

    // Scroll animations with intersection observer
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .gallery-card, .testimonial-card, .about-text, .about-visual');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('fade-in');
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            info: '#3b82f6'
        };
        
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                background: ${colors[type] || colors.info};
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                font-weight: 500;
                max-width: 400px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                animation: slideInRight 0.3s ease;
            ">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 18px;
                    opacity: 0.8;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Smooth scrolling for all internal links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            const href = link.getAttribute('href');
            if (href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbar = document.getElementById('mainNav');
                    const offsetTop = target.offsetTop - (navbar?.offsetHeight || 80);
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                }
            }
        }
    });

    // Parallax effect for hero background
    function initParallax() {
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            let ticking = false;
            
            function updateParallax() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBackground.style.transform = `translateY(${rate}px)`;
                ticking = false;
            }
            
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            });
        }
    }
    
    initParallax();

    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.8); }
        }
        
        .form-group.focused .form-label {
            color: var(--color-primary);
            transform: translateY(-2px);
        }
        
        .form-group.filled .form-label {
            font-weight: 500;
        }
        
        .navbar-toggler.active .navbar-toggler-icon:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px) !important;
        }
        
        .navbar-toggler.active .navbar-toggler-icon:nth-child(2) {
            opacity: 0 !important;
        }
        
        .navbar-toggler.active .navbar-toggler-icon:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px) !important;
        }
        
        @media (max-width: 768px) {
            .navbar-menu {
                animation: slideDown 0.3s ease;
            }
            
            .navbar-menu.active {
                animation: slideDown 0.3s ease;
            }
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Back to top button
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--color-primary), var(--color-teal-300));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(backToTopBtn);
        
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        backToTopBtn.style.opacity = '1';
                        backToTopBtn.style.transform = 'translateY(0)';
                    } else {
                        backToTopBtn.style.opacity = '0';
                        backToTopBtn.style.transform = 'translateY(20px)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    initBackToTop();

    // Enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Console welcome message
    console.log(`
    🚀 Asset Pilot - Smart Asset Management
    
    ✅ Enhanced phone mockup with smooth transitions
    ✅ Perfect image containers with proper aspect ratios  
    ✅ Advanced gallery filtering and lightbox
    ✅ Mobile-responsive navigation
    ✅ Smooth scroll animations
    ✅ Contact form validation
    ✅ Performance optimized
    
    All interactive elements are fully functional!
    © 2025 Asset Pilot. All rights reserved.
    `);
});

// Utility functions
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

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/57978ca4b5a663170f1aa16f28379115/569f0f3b-3403-46e7-8072-32a751f2db99/d458bdf9.png',
        'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/57978ca4b5a663170f1aa16f28379115/569f0f3b-3403-46e7-8072-32a751f2db99/c6474fc7.png',
        'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/57978ca4b5a663170f1aa16f28379115/569f0f3b-3403-46e7-8072-32a751f2db99/f5b7e688.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

preloadImages();