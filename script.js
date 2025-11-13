/**
 * SyntheticLabs - JavaScript principale
 * Gestion des animations, interactions et formulaire de contact
 */

// ============================================
// Configuration et Utilitaires
// ============================================

const config = {
    particleCount: 50,
    animationDuration: 300,
    scrollOffset: 100,
};

/**
 * Utilitaire pour animer les nombres (compteurs)
 */
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(current);
        }
    }, 16);
}

/**
 * Utilitaire pour vérifier si un élément est visible dans le viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Intersection Observer pour les animations au scroll
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// ============================================
// Navigation
// ============================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Gestion du scroll pour la navbar
        window.addEventListener('scroll', () => this.handleScroll());

        // Toggle menu mobile
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMenu());
        }

        // Navigation smooth et activation des liens
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Mise à jour du lien actif selon la section visible
        this.updateActiveLink();
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    handleNavClick(e, link) {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Fermer le menu mobile après clic
            if (this.navMenu.classList.contains('active')) {
                this.toggleMenu();
            }
        }
    }

    handleOutsideClick(e) {
        if (this.navMenu.classList.contains('active') &&
            !this.navMenu.contains(e.target) &&
            !this.navToggle.contains(e.target)) {
            this.toggleMenu();
        }
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ============================================
// Hero Section - Particules animées
// ============================================

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.init();
    }

    init() {
        if (!this.container) return;

        for (let i = 0; i < config.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Propriétés aléatoires
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// ============================================
// Hero Stats - Animation des compteurs
// ============================================

class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkPosition());
        this.checkPosition(); // Vérifier au chargement
    }

    checkPosition() {
        if (this.animated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        if (isElementInViewport(heroStats)) {
            this.animate();
            this.animated = true;
        }
    }

    animate() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateNumber(stat, target, 2000);
        });
    }
}

// ============================================
// Service Cards - Animations au hover
// ============================================

class ServiceCards {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleHover(e, card));
        });

        // Observer pour l'animation d'apparition
        this.cards.forEach(card => {
            observer.observe(card);
        });
    }

    handleHover(e, card) {
        // Effet de parallaxe subtil
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }
}

// ============================================
// Formulaire de Contact
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form?.querySelector('.btn-submit');
        this.messageContainer = document.getElementById('formMessage');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validation en temps réel
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');

        if (isRequired && !value) {
            this.setFieldError(field, 'Ce champ est requis');
            return false;
        }

        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.setFieldError(field, 'Email invalide');
                return false;
            }
        }

        this.clearFieldError(field);
        return true;
    }

    setFieldError(field, message) {
        field.style.borderColor = 'var(--error)';
        // Vous pouvez ajouter un message d'erreur sous le champ si nécessaire
    }

    clearFieldError(field) {
        field.style.borderColor = '';
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validation de tous les champs
        const inputs = this.form.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showMessage('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }

        // Récupération des données
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Afficher le loader
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            // Simulation d'envoi (à remplacer par votre API)
            await this.submitToServer(data);

            this.showMessage('Message envoyé avec succès ! Nous vous recontacterons bientôt.', 'success');
            this.form.reset();
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.showMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.', 'error');
        } finally {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    async submitToServer(data) {
        // Cette fonction simule l'envoi au serveur
        // À REMPLACER par votre véritable endpoint API

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('Données du formulaire:', data);

                // Simulation: succès dans 90% des cas
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Erreur simulée'));
                }
            }, 1500);
        });

        // Exemple avec FormSubmit (service gratuit):
        /*
        const response = await fetch('https://formsubmit.co/your-email@example.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Erreur serveur');
        }

        return await response.json();
        */

        // Exemple avec EmailJS:
        /*
        return emailjs.send(
            'your_service_id',
            'your_template_id',
            data,
            'your_public_key'
        );
        */
    }

    showMessage(message, type) {
        this.messageContainer.textContent = message;
        this.messageContainer.className = `form-message ${type}`;

        // Auto-masquer après 5 secondes pour les succès
        if (type === 'success') {
            setTimeout(() => {
                this.messageContainer.className = 'form-message';
            }, 5000);
        }
    }
}

// ============================================
// Animations au scroll
// ============================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Observer tous les éléments avec animation
        const animatedElements = document.querySelectorAll(
            '.service-card, .expertise-item, .stat-item, .contact-method'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        // Animation au scroll pour les sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// ============================================
// Performance - Lazy Loading des images
// ============================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback pour les navigateurs anciens
            this.images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
}

// ============================================
// Gestion des technologies (animation)
// ============================================

class TechStack {
    constructor() {
        this.techItems = document.querySelectorAll('.tech-item');
        this.init();
    }

    init() {
        this.techItems.forEach((item, index) => {
            // Animation décalée pour chaque item
            observer.observe(item);
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }
}

// ============================================
// Easter Egg - Code Konami
// ============================================

class KonamiCode {
    constructor() {
        this.pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.pattern[this.current]) {
                this.current++;
                if (this.current === this.pattern.length) {
                    this.activate();
                    this.current = 0;
                }
            } else {
                this.current = 0;
            }
        });
    }

    activate() {
        // Easter egg: mode matrix
        document.body.style.animation = 'hue-rotate 10s linear infinite';
        console.log('🎮 Konami Code activé ! Mode Matrix ON');

        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
}

// ============================================
// Initialisation au chargement de la page
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SyntheticLabs - Site initialisé');

    // Initialiser tous les modules
    new Navigation();
    new ParticleSystem();
    new StatsCounter();
    new ServiceCards();
    new ContactForm();
    new ScrollAnimations();
    new LazyLoader();
    new TechStack();
    new KonamiCode(); // Easter egg pour les curieux 😉

    // Masquer le loader si présent
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 300);
        }, 500);
    }

    // Log pour debug (à retirer en production)
    console.log('📊 Modules chargés:', {
        navigation: '✓',
        particles: '✓',
        stats: '✓',
        services: '✓',
        contactForm: '✓',
        animations: '✓',
        lazyLoading: '✓',
        techStack: '✓'
    });
});

// ============================================
// Gestion des erreurs globales
// ============================================

window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
    // Vous pouvez envoyer ces erreurs à un service de monitoring comme Sentry
});

// ============================================
// Performance Monitoring (optionnel)
// ============================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📈 Performance:', {
                'Temps de chargement': `${perfData.loadEventEnd - perfData.fetchStart}ms`,
                'DOM prêt': `${perfData.domContentLoadedEventEnd - perfData.fetchStart}ms`,
            });
        }, 0);
    });
}

// ============================================
// Export pour utilisation modulaire (optionnel)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ParticleSystem,
        StatsCounter,
        ServiceCards,
        ContactForm,
        ScrollAnimations,
        LazyLoader,
        TechStack
    };
}
