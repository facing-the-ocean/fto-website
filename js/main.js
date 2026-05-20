// ===== FACING THE OCEAN =====

// ── Grain texture overlay ──
(function createGrain() {
  const size = 220;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255 | 0;
    img.data[i]     = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 22; // ~8% opacity per pixel
  }
  ctx.putImageData(img, 0, 0);
  const overlay = document.createElement('div');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:9000',
    'pointer-events:none', 'user-select:none',
    `background-image:url(${canvas.toDataURL()})`,
    'background-repeat:repeat',
    'opacity:1',
    'mix-blend-mode:overlay',
  ].join(';');
  document.body.appendChild(overlay);
})();

// ── Mobile nav toggle ──
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.textContent = open ? '✕' : '☰';
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!e.target.closest('.site-nav')) {
        links.classList.remove('open');
        toggle.textContent = '☰';
      }
    });
  }

  // ── Active nav link ──
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href').split('/').pop() === path) {
      a.classList.add('active');
    }
  });
});
