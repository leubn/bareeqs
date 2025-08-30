// services.js
// Renders Services cards from assets/data/services.json whenever
// an element with id="services-grid" is present on the page.

async function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  try {
    const res = await fetch('assets/data/services.json');
    const services = await res.json();
    grid.innerHTML = services.map(svc => `
      <article class="card">
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
        ${svc.bullets?.length ? `<ul class="list">${svc.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      </article>
    `).join('');
  } catch (err) {
    console.error('Failed to render services:', err);
  }
}

window._services = { renderServices };
