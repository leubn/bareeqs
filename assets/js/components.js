// components.js
// Dynamically injects shared components (header & footer) into each page.
// This keeps common UI in one place and avoids duplication.

async function injectComponent(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const res = await fetch(filePath);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    console.error('Failed to inject component:', filePath, err);
  }
}

async function loadComponents() {
  await injectComponent('site-header', 'assets/components/header.html');
  await injectComponent('site-footer', 'assets/components/footer.html');
}

// Expose for other scripts
window._components = { loadComponents };
