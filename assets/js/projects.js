// projects.js
// Renders Projects cards from assets/data/projects.json whenever
// an element with id="projects-grid" is present on the page.

async function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  try {
    const res = await fetch('assets/data/projects.json');
    const projects = await res.json();
    grid.innerHTML = projects.map(p => `
      <article class="card">
        <div class="muted" style="font-size: 13px;">${p.year} • ${p.location}</div>
        <h3 style="margin-top:6px;">${p.title}</h3>
        <p>${p.summary}</p>
        ${p.metrics?.length ? `<ul class="list">${p.metrics.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
      </article>
    `).join('');
  } catch (err) {
    console.error('Failed to render projects:', err);
  }
}

window._projects = { renderProjects };
