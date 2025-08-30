// brand.js
// Loads brand settings from assets/data/brand.json
// and applies them (colors, text, links) across the site.

async function applyBrand() {
  try {
    const res = await fetch('assets/data/brand.json');
    const brand = await res.json();

    // 1) Apply color tokens as CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', brand.primaryColor || '#0A192F');
    root.style.setProperty('--color-secondary', brand.secondaryColor || '#E7B23B');
    root.style.setProperty('--color-accent', brand.accentColor || '#FDFDFD');

    // 2) Update brand text in header/footer
    const brandNameEl = document.getElementById('brand-name');
    if (brandNameEl) brandNameEl.textContent = brand.companyName || 'Bareeqs';
    const footerBrandName = document.getElementById('footer-brand-name');
    if (footerBrandName) footerBrandName.textContent = brand.companyName || 'Bareeqs';
    const footerBrandShort = document.getElementById('footer-brand-short');
    if (footerBrandShort) footerBrandShort.textContent = brand.companyName || 'Bareeqs';

    const footerTagline = document.getElementById('footer-tagline');
    if (footerTagline) footerTagline.textContent = brand.tagline || 'Empowering People. Enabling Success.';

    const emailLink = document.getElementById('footer-email');
    if (emailLink) {
      emailLink.href = 'mailto:' + (brand.email || 'info@example.com');
      emailLink.textContent = brand.email || 'info@example.com';
    }

    const phoneLink = document.getElementById('footer-phone');
    if (phoneLink) {
      phoneLink.href = 'tel:' + (brand.phone || '+971');
      phoneLink.textContent = brand.phone || '+971';
    }

    const contactEmailBtn = document.getElementById('contact-email');
    if (contactEmailBtn) {
      contactEmailBtn.href = 'mailto:' + (brand.email || 'info@example.com');
    }

    const contactPhoneBtn = document.getElementById('contact-phone');
    if (contactPhoneBtn) {
      contactPhoneBtn.href = 'tel:' + (brand.phone || '+971');
    }

    const loc = document.getElementById('footer-location');
    if (loc) loc.textContent = brand.location || 'United Arab Emirates';

    const socialWrap = document.getElementById('footer-social');
    if (socialWrap && brand.social) {
      socialWrap.innerHTML = '';
      for (const [net, url] of Object.entries(brand.social)) {
        if (!url || url === '#') continue;
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = net[0].toUpperCase() + net.slice(1);
        socialWrap.appendChild(a);
      }
    }

    // Optional: scheduling link (Calendly/Cal.com) if provided
    const sched = document.getElementById('schedule-link');
    if (sched && brand.scheduleLink) {
      const a = document.createElement('a');
      a.href = brand.scheduleLink;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'btn btn-outline';
      a.textContent = 'Schedule a Meeting';
      sched.appendChild(a);
    }

    // Footer year
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) {
    console.error('Failed to apply brand:', err);
  }
}

window._brand = { applyBrand };
