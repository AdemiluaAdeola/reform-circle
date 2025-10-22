// Main JavaScript for The Reform Circle Website
// Professional startup website with advanced interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initCounters();
    initProgramExplorer();
    initPartnershipForm();
    initScrollAnimations();
    initTimelineAnimations();
    initTypewriter();
    
    console.log('The Reform Circle website initialized successfully');
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const nav = document.querySelector('nav');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu button
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                anime({
                    targets: icon,
                    rotate: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            } else {
                anime({
                    targets: icon,
                    rotate: 90,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero section animations
function initHeroAnimations() {
    // Animate hero elements on load
    anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    })
    .add({
        targets: '.hero-content h1',
        opacity: [0, 1],
        translateY: [50, 0],
        delay: 300
    })
    .add({
        targets: '.hero-content p',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: 200
    }, '-=800')
    .add({
        targets: '.hero-content .counter',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100)
    }, '-=600')
    .add({
        targets: '.hero-content button',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        delay: anime.stagger(100)
    }, '-=400');
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Program explorer functionality
function initProgramExplorer() {
    const filterButtons = document.querySelectorAll('.program-filter');
    const programCards = document.querySelectorAll('.program-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-secondary', 'text-white');
                btn.classList.add('bg-gray-100', 'text-text');
            });
            
            this.classList.add('active', 'bg-secondary', 'text-white');
            this.classList.remove('bg-gray-100', 'text-text');
            
            // Filter cards with animation
            programCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.8, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: index * 100,
                        easing: 'easeOutCubic'
                    });
                    card.style.display = 'block';
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        scale: 0.8,
                        translateY: -20,
                        duration: 300,
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Program card hover effects
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this.querySelector('.program-overlay'),
                opacity: 1,
                translateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this.querySelector('.program-overlay'),
                opacity: 0,
                translateY: 20,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
}

// Partnership form functionality
function initPartnershipForm() {
    const form = document.getElementById('partnership-form');
    const steps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progress-bar');
    let currentStep = 1;
    
    // Next step buttons
    document.getElementById('next-step-1')?.addEventListener('click', () => goToStep(2));
    document.getElementById('next-step-2')?.addEventListener('click', () => goToStep(3));
    
    // Previous step buttons
    document.getElementById('prev-step-2')?.addEventListener('click', () => goToStep(1));
    document.getElementById('prev-step-3')?.addEventListener('click', () => goToStep(2));
    
    function goToStep(step) {
        // Hide current step
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        
        // Show new step
        document.getElementById(`step-${step}`).classList.remove('hidden');
        
        // Update progress bar
        const progress = (step / 3) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update step indicators
        updateStepIndicators(step);
        
        currentStep = step;
        
        // Animate step transition
        anime({
            targets: `#step-${step}`,
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 500,
            easing: 'easeOutCubic'
        });
    }
    
    function updateStepIndicators(activeStep) {
        for (let i = 1; i <= 3; i++) {
            const indicator = document.querySelector(`.flex.items-center.space-x-4:nth-child(${i * 2 - 1})`);
            const circle = indicator.querySelector('.w-8');
            const text = indicator.querySelector('span');
            
            if (i <= activeStep) {
                circle.classList.remove('bg-gray-200', 'text-gray-500');
                circle.classList.add('bg-secondary', 'text-white');
                text.classList.remove('text-gray-500');
                text.classList.add('text-secondary');
            } else {
                circle.classList.add('bg-gray-200', 'text-gray-500');
                circle.classList.remove('bg-secondary', 'text-white');
                text.classList.add('text-gray-500');
                text.classList.remove('text-secondary');
            }
        }
    }
    
    // Form submission
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-50 border border-green-200 rounded-lg p-6 text-center';
        successMessage.innerHTML = `
            <div class="text-green-600 mb-4">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
            <p class="text-green-600">Your partnership inquiry has been submitted successfully. We'll contact you within 24 hours.</p>
        `;
        
        form.innerHTML = '';
        form.appendChild(successMessage);
        
        // Animate success message
        anime({
            targets: successMessage,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            easing: 'easeOutCubic'
        });
    });
    
    // Form validation
    const inputs = form?.querySelectorAll('input, select, textarea');
    inputs?.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidationError);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address');
        } else {
            clearFieldError(field);
        }
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-500 text-sm mt-1 field-error';
        errorDiv.textContent = message;
        
        field.classList.add('border-red-500');
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.classList.remove('border-red-500');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function clearValidationError(e) {
        const field = e.target;
        if (field.value.trim()) {
            clearFieldError(field);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.card-hover, .program-card');
                if (children.length > 0) {
                    anime({
                        targets: children,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 600,
                        delay: anime.stagger(100),
                        easing: 'easeOutCubic'
                    });
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    duration: 800,
                    easing: 'easeOutCubic'
                });
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Typewriter effect for hero
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        new Typed('#typed-text', {
            strings: [
                'Youth Leaders',
                'Social Change',
                'Community Impact',
                'Future Leaders'
            ],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

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

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize performance optimizations
optimizeImages();

// Add CSS animations for marquee
const style = document.createElement('style');
style.textContent = `
    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    
    .animate-marquee {
        animation: marquee 20s linear infinite;
    }
    
    .animate-marquee:hover {
        animation-play-state: paused;
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Analytics and tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Implement actual analytics tracking here
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('cta_click', { button: 'primary' });
    }
    if (e.target.matches('.program-card')) {
        trackEvent('program_card_click', { 
            program: e.target.querySelector('h3')?.textContent || 'unknown' 
        });
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initCounters,
        initProgramExplorer,
        initPartnershipForm,
        validateField,
        isValidEmail
    };
}