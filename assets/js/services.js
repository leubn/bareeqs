async function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  const res = await fetch('assets/data/services.json');
  const services = await res.json();
  grid.innerHTML = services.map(s => `
    <article class="card lift reveal">
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      ${s.bullets?.length ? `<ul class="list">${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
    </article>
  `).join('');
}
window._services = { renderServices };
