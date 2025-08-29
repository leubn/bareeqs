// brand.js — apply brand.json tokens + content
async function applyBrand() {
  const res = await fetch('assets/data/brand.json');
  const brand = await res.json();

  const root = document.documentElement;
  root.style.setProperty('--color-primary', brand.primaryColor || '#0B1020');
  root.style.setProperty('--color-secondary', brand.secondaryColor || '#D1A954');
  root.style.setProperty('--color-accent', brand.accentColor || '#F5F7FB');

  const names = [
    ['brand-name', 'companyName'],
    ['footer-brand-name', 'companyName'],
    ['footer-brand-short', 'companyName'],
    ['footer-tagline', 'tagline'],
    ['footer-location', 'location']
  ];
  names.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && brand[key]) el.textContent = brand[key];
  });

  const email = brand.email || 'info@example.com';
  const phone = brand.phone || '+971';
  const emailEls = [document.getElementById('footer-email'), document.getElementById('contact-email')];
  emailEls.forEach(a => { if (a) { a.href = 'mailto:' + email; a.textContent = email; } });
  const phoneEls = [document.getElementById('footer-phone'), document.getElementById('contact-phone')];
  phoneEls.forEach(a => { if (a) { a.href = 'tel:' + phone; a.textContent = phone; } });

  const socialWrap = document.getElementById('footer-social');
  if (socialWrap && brand.social) {
    socialWrap.innerHTML = '';
    for (const [net, url] of Object.entries(brand.social)) {
      if (!url || url === '#') continue;
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = net[0].toUpperCase() + net.slice(1);
      socialWrap.appendChild(a);
    }
  }

  const sched = document.getElementById('schedule-link');
  if (sched && brand.scheduleLink) {
    const a = document.createElement('a');
    a.href = brand.scheduleLink; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.className = 'btn btn-outline'; a.textContent = 'Schedule a Meeting';
    sched.appendChild(a);
  }

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
window._brand = { applyBrand };
