
// Enhanced Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initImageGallery();
    initAnimations();
    initParticleEffects();
    initFloatingElements();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards for fade-in animation
    document.querySelectorAll('section, .project-card, .skill-category, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// StyleSyncs image gallery
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.showcase-image');
    const imageOverlay = document.querySelector('.image-overlay span');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            const newImage = thumbnail.getAttribute('data-image');
            const newLabel = thumbnail.getAttribute('data-label');
            
            if (mainImage && newImage) {
                mainImage.src = newImage;
                mainImage.alt = newLabel;
            }
            
            if (imageOverlay && newLabel) {
                imageOverlay.textContent = newLabel;
            }
        });
    });
}

// Cool particle effects
function initParticleEffects() {
    // Create floating particles on mouse move
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) { // Only create particles occasionally
            createParticle(e.clientX, e.clientY);
        }
    });
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(37, 99, 235, 0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
        animation: particleFade 2s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 2000);
}

// Enhanced floating elements
function initFloatingElements() {
    // Add more dynamic floating shapes
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingShape();
        }
    }, 3000);
}

function createFloatingShape() {
    const shape = document.createElement('div');
    const size = Math.random() * 60 + 20;
    const colors = [
        'rgba(37, 99, 235, 0.1)',
        'rgba(147, 51, 234, 0.08)',
        'rgba(59, 130, 246, 0.06)'
    ];
    
    shape.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp ${Math.random() * 10 + 15}s linear forwards;
    `;
    
    document.body.appendChild(shape);
    
    // Remove shape after animation
    setTimeout(() => {
        if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
        }
    }, 25000);
}

// Subtle animations for better UX
function initAnimations() {
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Add subtle animations to skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate stat numbers
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const current = parseInt(stat.textContent);
            const increment = Math.ceil(target / 50);
            
            if (current < target) {
                stat.textContent = Math.min(current + increment, target);
                setTimeout(animateStats, 50);
            }
        });
    };

    // Trigger stat animation when about section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(aboutSection);
    }
}

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Simple loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize smooth body fade-in
document.body.style.opacity = '0';
