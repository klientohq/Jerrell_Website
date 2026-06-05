// === NAV ===
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
const currentPath = location.pathname.split('/').pop() || 'index.html';

// Active link
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPath) a.classList.add('active');
});

// Scroll state
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile toggle
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on link click
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// === HERO SLIDESHOW ===
function initSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  document.querySelector('.hero-prev')?.addEventListener('click', () => { goTo(current - 1); startTimer(); });
  document.querySelector('.hero-next')?.addEventListener('click', () => { goTo(current + 1); startTimer(); });

  startTimer();
}

// === LIGHTBOX ===
function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  const lightbox = document.querySelector('.lightbox');
  const lightImg = lightbox?.querySelector('.lightbox-img');
  if (!lightbox) return;

  const srcs = Array.from(items).map(el => el.querySelector('img')?.src || '');
  let lightboxIdx = 0;

  function open(idx) {
    lightboxIdx = idx;
    lightImg.src = srcs[idx];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function shift(dir) {
    lightboxIdx = (lightboxIdx + dir + srcs.length) % srcs.length;
    lightImg.src = srcs[lightboxIdx];
  }

  items.forEach((item, i) => item.addEventListener('click', () => open(i)));
  lightbox.querySelector('.lightbox-close')?.addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev')?.addEventListener('click', () => shift(-1));
  lightbox.querySelector('.lightbox-next')?.addEventListener('click', () => shift(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') shift(-1);
    if (e.key === 'ArrowRight') shift(1);
  });
}

// === FADE IN ON SCROLL ===
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// === CONTACT FORM ===
function initContactForm() {
  const form = document.querySelector('.contact-form form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.disabled = true;
    btn.style.background = '#4a9a5a';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  initSlideshow();
  initLightbox();
  initFadeIn();
  initContactForm();
});
