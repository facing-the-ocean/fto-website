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

  // ── Photo gallery arrows ──
  document.querySelectorAll('.gallery').forEach(gallery => {
    const strip = gallery.querySelector('.photo-strip');
    const btns  = gallery.querySelectorAll('.gallery-btn');
    if (!strip || !btns.length) return;

    // Photos vary in width, so step to real photo boundaries rather than by a
    // fixed pixel amount — that keeps the strip aligned after every click.
    const offsetOf = fig =>
      fig.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;

    const page = dir => {
      const figs = [...strip.querySelectorAll('figure')];
      const view = strip.clientWidth;
      const left = strip.scrollLeft;
      let target;

      if (dir > 0) {
        // first photo not yet fully visible on the right
        const next = figs.find(f => offsetOf(f) + f.offsetWidth > left + view + 1);
        target = next ? offsetOf(next) : strip.scrollWidth;
      } else {
        // last photo starting before the current view, then back up a full page
        const prevFig = figs.filter(f => offsetOf(f) < left - 1).pop();
        if (!prevFig) {
          target = 0;
        } else {
          const end = offsetOf(prevFig) + prevFig.offsetWidth;
          const start = figs.find(f => end - offsetOf(f) <= view);
          target = start ? offsetOf(start) : 0;
        }
      }
      strip.scrollTo({ left: target, behavior: 'smooth' });
    };

    btns.forEach(btn => {
      btn.addEventListener('click', () => page(Number(btn.dataset.dir)));
    });

    const sync = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      btns.forEach(btn => {
        btn.disabled = Number(btn.dataset.dir) < 0
          ? strip.scrollLeft <= 8
          : strip.scrollLeft >= max - 8;
      });
    };
    strip.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    // Widths settle as images decode; re-check once everything has loaded.
    window.addEventListener('load', sync);
    sync();
  });
});
