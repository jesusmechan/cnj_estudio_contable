const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('navbarMain');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const inicioSection = document.getElementById('inicio');
const currentYear = document.getElementById('currentYear');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const closeMenu = () => {
  if (nav && menuToggle) {
    nav.classList.remove('nav-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }
};

const clearHash = () => {
  history.replaceState(null, '', window.location.pathname + window.location.search);
};

const scrollToInicio = () => {
  if (inicioSection) {
    inicioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('nav-open')) return;
    if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('nav-open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (link === backToTop) return;

  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    const id = href && href.slice(1);

    if (id === 'inicio') {
      event.preventDefault();
      scrollToInicio();
      closeMenu();
      clearHash();
      return;
    }

    const target = id && document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    closeMenu();
    clearHash();
  });
});

if (backToTop) {
  const updateBackToTop = () => {
    const nearEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
    backToTop.classList.toggle('is-visible', nearEnd);
  };

  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    scrollToInicio();
    clearHash();
  });

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  window.addEventListener('resize', updateBackToTop);
  updateBackToTop();
}

const revealSelectors = [
  '.section-header',
  '.about-intro',
  '.value-card',
  '.service-card',
  '.video-player',
  '.video-info',
  '.testimonial-card',
  '.search-panel',
];

document.querySelectorAll(revealSelectors.join(', ')).forEach((el) => {
  el.classList.add('reveal');
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

const sections = document.querySelectorAll('section[id], footer[id]');
const isHomePage = Boolean(document.getElementById('empresa'));

const updateHeader = () => {
  if (header) {
    header.classList.toggle('header--scrolled', window.scrollY > 12);
  }
};

const updateActiveNav = () => {
  if (!isHomePage || !navLinks.length || !sections.length) return;

  const scrollPos = window.scrollY + 120;
  let currentId = 'inicio';

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === 'productos.html') {
      link.classList.remove('active');
      return;
    }
    link.classList.toggle('active', href === `#${currentId}`);
  });
};

const onScroll = () => {
  updateHeader();
  updateActiveNav();
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();
