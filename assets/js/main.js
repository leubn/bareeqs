(async function init() {
  await window._components.loadComponents();
  await window._brand.applyBrand();
  await window._services.renderServices();
  await window._projects.renderProjects();
  await window._carousel.renderTestimonials();
  await window._carousel.renderClients();

  window._ui.enableReveal();
  window._ui.smoothAnchors();
  window._ui.enableHamburger();

  // Highlight current nav link
  const nav = document.querySelector('.nav');
  if (nav) {
    const path = location.pathname.split('/').pop() || 'index.html';
    [...nav.querySelectorAll('a')].forEach(a => {
      if (a.getAttribute('href') === path) {
        a.style.color = 'var(--color-primary)';
        a.style.fontWeight = '800';
      }
    });
  }
})();
