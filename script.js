// Smooth active year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Close nav when clicking a link
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Simple slider
const slides = Array.from(document.querySelectorAll('.slide'));
let current = slides.findIndex(s => s.classList.contains('is-active')) || 0;

function show(index) {
  if (!slides.length) return;
  slides[current].classList.remove('is-active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('is-active');
}

function next() { show(current + 1); }
function prev() { show(current - 1); }

// Click on image advances
slides.forEach(img => img.addEventListener('click', next));

// Buttons
document.querySelector('.slider-btn.next')?.addEventListener('click', next);
document.querySelector('.slider-btn.prev')?.addEventListener('click', prev);

// Keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

// Touch support (basic swipe)
let touchStartX = 0;
let touchEndX = 0;
const slidesContainer = document.querySelector('.slides');
if (slidesContainer) {
  slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 30) {
      if (delta < 0) next(); else prev();
    }
  });
}

// Offset scroll for fixed header (focus target highlight, optional)
// Using CSS scroll-behavior for smooth; here we ensure anchors land nicely
function offsetAnchor() {
  if (location.hash.length < 2) return;
  const el = document.querySelector(location.hash);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

window.addEventListener('hashchange', offsetAnchor);
// If page loads with hash
if (location.hash) {
  setTimeout(offsetAnchor, 0);
}


