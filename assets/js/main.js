// main.js
// Orchestrates component loading and page-specific rendering.

(async function init() {
  // 1) Load shared header & footer
  await window._components.loadComponents();

  // 2) Apply brand (colors, texts, links)
  await window._brand.applyBrand();

  // 3) Page-specific data-driven rendering
  window._services.renderServices();
  window._projects.renderProjects();

  // 4) Activate current nav link
  highlightActiveNav();

  // 5) Mobile menu toggle
  enableHamburger();
  
  // 6) Scroll animations
  enableScrollAnimations();
  
  // 7) Intersection observer for animations
  setupIntersectionObserver();
  
  // 8) Initialize talent network visualization
  initTalentNetwork();
})();

function highlightActiveNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const path = location.pathname.split('/').pop() || 'index.html';
  [...nav.querySelectorAll('a')].forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.style.color = 'var(--color-primary)';
      a.style.fontWeight = '700';
    }
  });
}

function enableHamburger() {
  const btn = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (!btn || !nav) return;
  
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = nav.classList.toggle('open');
    btn.classList.toggle('active');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = open ? 'hidden' : '';
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking nav links
  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

function enableScrollAnimations() {
  // Smooth scroll for internal links
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
  
  // Header scroll effect
  const header = document.querySelector('.site-header-inner');
  if (header) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(16px)';
        header.style.boxShadow = 'none';
      }
      
      lastScrollY = currentScrollY;
    });
  }
}

function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Special handling for cards in grid
        if (entry.target.classList.contains('card') || 
            entry.target.classList.contains('testimonial-card')) {
          const cards = entry.target.parentElement.querySelectorAll('.card, .testimonial-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate-in');
            }, index * 100);
          });
        }
        
        // Special handling for stat counters
        if (entry.target.classList.contains('stat-num')) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll(`
    .section-title,
    .section-sub,
    .card,
    .testimonial-card,
    .hero-copy,
    .hero-art,
    .stat,
    .achievement,
    .team-card,
    .contact-card
  `);
  
  animateElements.forEach(el => {
    el.classList.add('animate-target');
    observer.observe(el);
  });
}

function animateCounter(element) {
  const target = element.textContent;
  const isNumber = /^\d+/.test(target);
  
  if (!isNumber) return;
  
  const numTarget = parseInt(target.match(/\d+/)[0]);
  const suffix = target.replace(/\d+/, '');
  let current = 0;
  const increment = numTarget / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= numTarget) {
      current = numTarget;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 30);
}

function initTalentNetwork() {
  // Just handle the stats animation - keep it simple
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length === 0) return;
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateNetworkStat(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statObserver.observe(stat);
  });
}

function animateNetworkStat(element) {
  const target = parseInt(element.dataset.target);
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 30);
}
