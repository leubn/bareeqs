// carousel.js — simple, accessible carousel for testimonials
async function renderTestimonials() {
  const track = document.getElementById('testimonials-track');
  if (!track) return;
  const res = await fetch('assets/data/testimonials.json');
  const items = await res.json();
  track.innerHTML = items.map(t => `
    <article class="card carousel-card">
      <p>“${t.quote}”</p>
      <div class="muted" style="margin-top:10px; font-weight:700;">— ${t.name}, ${t.title}</div>
    </article>
  `).join('');

  const prev = document.querySelector('.carousel-nav.prev');
  const next = document.querySelector('.carousel-nav.next');
  function scrollBy(cards=1) {
    const card = track.querySelector('.carousel-card');
    if (!card) return;
    track.scrollBy({ left: (card.clientWidth + 18) * cards, behavior: 'smooth' });
  }
  prev?.addEventListener('click', () => scrollBy(-1));
  next?.addEventListener('click', () => scrollBy(1));

  let auto = setInterval(() => scrollBy(1), 3800);
  track.addEventListener('pointerenter', () => clearInterval(auto));
  track.addEventListener('pointerleave', () => auto = setInterval(() => scrollBy(1), 3800));
}

async function renderClients() {
  const row = document.getElementById('clients-row');
  if (!row) return;
  const res = await fetch('assets/data/clients.json');
  const items = await res.json();
  row.innerHTML = items.map(c => `<div class="client" title="${c.name}">${c.name}</div>`).join('');
}

window._carousel = { renderTestimonials, renderClients };
