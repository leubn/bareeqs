// components.js — inject shared components
async function injectComponent(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(path);
  el.innerHTML = await res.text();
}
async function loadComponents() {
  await injectComponent('site-header', 'assets/components/header.html');
  await injectComponent('site-footer', 'assets/components/footer.html');
}
window._components = { loadComponents };
