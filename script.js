// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.process-step, .service-card, .portfolio-card, .about-text, .stat-item, .timeline-item, .testimonial-card, .pricing-card, .statement-content, .image-section-content'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    initializeCounters();
});

// ===================================
// COUNTER ANIMATION
// ===================================

function initializeCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach(counter => animateCounter(counter));
            }
        });
    }, { threshold: 0.5 });
    
    if (statNumbers.length) hooking(counterObserver, statNumbers[0].parentElement);
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    let start = 0;
    
    function update() {
        start += target / (duration / 16);
        if (start < target) {
            el.textContent = Math.floor(start);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }
    update();
}

function hooking(observer, el) {
    observer.observe(el);
}

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        window.scrollTo({
            top: target.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// ===================================
// NAVBAR SCROLL SHADOW
// ===================================

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,.5)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// ===================================
// CONTACT FORM
// ===================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        // Get form field values correctly
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');

        const data = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            message: messageField.value.trim()
        };

        // Validate fields
        if (!data.name || !data.email || !data.message) {
            return showFormStatus('Please fill in all fields.', 'error');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return showFormStatus('Please enter a valid email address.', 'error');
        }

        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            return showFormStatus('Please complete the reCAPTCHA verification.', 'error');
        }

        const btn = contactForm.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            // Add reCAPTCHA token to data
            data.recaptchaToken = recaptchaResponse;
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                grecaptcha.reset(); // Reset reCAPTCHA
            } else {
                showFormStatus(result.error || 'Something went wrong. Please try again later.', 'error');
            }
        } catch (error) {
            showFormStatus('Failed to send message. Please check your connection and try again.', 'error');
            console.error('Form submission error:', error);
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send Message';
        }
    });
}

function showFormStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    setTimeout(() => formStatus.className = 'form-status', 5000);
}

// ===================================
// PRICING TOGGLE (MONTHLY/ANNUAL)
// ===================================

const pricingToggle = document.getElementById('pricingToggle');
if (pricingToggle) {
    pricingToggle.addEventListener('change', (e) => {
        const isAnnual = e.target.checked;
        const priceAmounts = document.querySelectorAll('.price-amount');
        
        priceAmounts.forEach(amount => {
            const monthly = amount.dataset.monthly;
            const annual = amount.dataset.annual;
            amount.textContent = isAnnual ? annual : monthly;
        });
    });
}

// ===================================
// TECH CAROUSEL PAUSE
// ===================================

const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
    carouselTrack.onmouseenter = () => carouselTrack.style.animationPlayState = 'paused';
    carouselTrack.onmouseleave = () => carouselTrack.style.animationPlayState = 'running';
}

// ===================================
// LIVE CLOCK
// ===================================

function updateClock() {
    const now = new Date();
    const t = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    const el = document.getElementById('localTime');
    if (el) el.textContent = t;
}
setInterval(updateClock, 1000);
updateClock();

// ===================================
// PIXI + GSAP HERO GLITCH
// ===================================

class HeroGlitch {
    constructor() {
        this.canvas = document.getElementById('pixiCanvas');
        if (!this.canvas || typeof PIXI === 'undefined') return;
        this.init();
    }

    init() {
        this.app = new PIXI.Application({
            view: this.canvas,
            width: window.innerWidth,
            height: window.innerHeight,
            transparent: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true
        });

        // ✅ YOUR REAL IMAGE
        const imgLink = 'images/paul-portrait.jpeg';

        PIXI.Assets.load(imgLink)
            .then(texture => this.setupImage(texture))
            .catch(error => {
                console.error('Failed to load image:', error);
                console.log('Trying alternative image loading method...');
                const texture = PIXI.Texture.from(imgLink);
                this.setupImage(texture);
            });
        
        window.addEventListener('resize', () => this.resize());
    }

    setupImage(texture) {
        this.img = new PIXI.Sprite(texture);

        const hero = document.querySelector('.hero');
        const rect = hero.getBoundingClientRect();

        /**
         * IMPORTANT:
         * We are explicitly sizing the image relative to HERO HEIGHT
         * so that head + shoulders + chest are visible.
         */

        const targetHeight = rect.height * 1.25; // SHOW HALF BODY
        const scale = targetHeight / this.img.height;

        this.img.scale.set(scale);

        // Anchor top-center so body extends downward
        this.img.anchor.set(0.5, 0);

        // Center horizontally
        this.img.x = this.app.screen.width / 2;

        // Small upward offset so face is not too low
        this.img.y = -60;

        // Opacity so PAUL stays dominant
        this.img.alpha = 0.85;

        // RGB filter (idle state)
        this.rgb = new PIXI.filters.RGBSplitFilter();
        this.rgb.red.set(0, 0);
        this.rgb.green.set(0, 0);
        this.rgb.blue.set(0, 0);

        this.img.filters = [this.rgb];
        this.app.stage.addChild(this.img);

        this.startGlitchPulse();
    }

    startGlitchPulse() {
        const pulse = () => {
            const tl = gsap.timeline();

            tl.to(this.rgb.red, {
                x: gsap.utils.random(-6, 6),
                y: 0,
                duration: 0.06
            });

            tl.to(this.rgb.blue, {
                x: gsap.utils.random(6, -6),
                y: 0,
                duration: 0.06
            }, '<');

            // IMPORTANT: reset immediately to avoid ghosting
            tl.to([this.rgb.red, this.rgb.green, this.rgb.blue], {
                x: 0,
                y: 0,
                duration: 0.04
            });
        };

        // Run pulse occasionally, not constantly
        gsap.timeline({ repeat: -1 })
            .call(pulse)
            .to({}, { duration: gsap.utils.random(3, 5) });
    }

    resize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        if (this.layers) {
            const hero = document.querySelector('.hero');
            const rect = hero.getBoundingClientRect();
            
            this.layers.forEach(layer => {
                const scale = Math.max(
                    rect.width / layer.texture.width,
                    rect.height / layer.texture.height
                );
                layer.scale.set(scale * 0.9);
                layer.x = this.app.screen.width / 2;
                layer.y = this.app.screen.height / 2;
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof PIXI !== 'undefined' && typeof gsap !== 'undefined') {
        new HeroGlitch();
    }
});

// ===================================
// ANALYTICS PLACEHOLDER
// ===================================

console.log('👋 Looking for a developer?');
console.log('📧 Reach out through the contact form.');