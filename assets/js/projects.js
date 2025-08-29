async function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const res = await fetch('assets/data/projects.json');
  const projects = await res.json();
  grid.innerHTML = projects.map(p => `
    <article class="card lift reveal carousel-card">
      <div class="muted" style="font-size: 13px;">${p.year} • ${p.location}</div>
      <h3 style="margin-top:6px;">${p.title}</h3>
      <p>${p.summary}</p>
      ${p.metrics?.length ? `<ul class="list">${p.metrics.map(m => `<li>${m}</li>`).join('')}</ul>` : ''}
    </article>
  `).join('');
}
window._projects = { renderProjects };
