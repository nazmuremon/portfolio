// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Project accordion functionality
function toggleProject(header) {
    const projectCard = header.parentElement;
    const allProjectCards = document.querySelectorAll('.project-card');
    
    // Close all other project cards
    allProjectCards.forEach(card => {
        if (card !== projectCard) {
            card.classList.remove('active');
        }
    });
    
    // Toggle current project card
    projectCard.classList.toggle('active');
    
    // Load media when project is opened
    if (projectCard.classList.contains('active')) {
        loadProjectMedia(projectCard);
    }
}

// Load project media (lazy loading)
function loadProjectMedia(projectCard) {
    const lazyImages = projectCard.querySelectorAll('img.lazy-image');
    const lazyVideos = projectCard.querySelectorAll('video.lazy-video');
    
    // Load images
    lazyImages.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
            img.removeAttribute('data-src');
        }
    });
    
    // Load videos
    lazyVideos.forEach(video => {
        if (video.dataset.src) {
            video.src = video.dataset.src;
            video.classList.remove('lazy-video');
            video.removeAttribute('data-src');
            video.load(); // Reload video with new source
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .timeline-item, .project-card, .award-item, .certificate-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const barTop = bar.getBoundingClientRect().top;
        
        if (barTop < window.innerHeight - 100) {
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 500);
        }
    });
}

// Initialize progress bar animations
window.addEventListener('scroll', animateProgressBars);
document.addEventListener('DOMContentLoaded', animateProgressBars);

// Hero image parallax effect
function parallaxEffect() {
    const heroImage = document.querySelector('.hero-bg');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroImage.style.transform = `translateY(${parallax}px)`;
    }
}

// Initialize parallax effect
window.addEventListener('scroll', parallaxEffect);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img.lazy[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Form validation and submission (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
    return phoneRegex.test(phone);
}

// Smooth page transitions
function smoothPageTransition() {
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            });
        }
    });
}

// Initialize smooth page transitions
document.addEventListener('DOMContentLoaded', smoothPageTransition);

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #007BFF;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="spinner"></div>';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    
    const spinner = loader.querySelector('.spinner');
    spinner.style.cssText = `
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #007BFF;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.remove();
        }, 500);
    });
}

// Add spinner keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize loading animation
showLoading();

// Dark Mode Toggle Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
}

// Dark mode toggle event listener
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        // Add smooth transition effect
        body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // 60fps
    };
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
        const preload = new Image();
        preload.src = img.src;
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Analytics and tracking (placeholder)
function trackPageView() {
    // Placeholder for analytics tracking
    console.log('Page viewed:', window.location.pathname);
}

function trackEvent(category, action, label) {
    // Placeholder for event tracking
    console.log('Event tracked:', { category, action, label });
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', trackPageView);

// Track link clicks
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        trackEvent('Navigation', 'Click', this.getAttribute('href'));
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service
});

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(error) {
            console.log('ServiceWorker registration failed');
        });
    });
}