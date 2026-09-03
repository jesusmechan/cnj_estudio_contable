const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav__link');
const inicioSection = document.getElementById('inicio');

const closeMenu = () => {
  if (nav && menuToggle) {
    nav.classList.remove('nav--open');
    menuToggle.classList.remove('is-open');
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
    const open = nav.classList.toggle('nav--open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  // Si se pasa a desktop, cerrar menú móvil abierto
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('nav--open')) return;
    if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu();
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
      menuToggle.setAttribute('aria-label', 'Abrir menú');
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
  '.about__intro',
  '.about__value',
  '.service-card',
  '.video-section__player',
  '.video-section__info',
  '.testimonial-card',
  '.footer__col',
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

const updateHeader = () => {
  if (header) {
    header.classList.toggle('header--scrolled', window.scrollY > 12);
  }
};

const updateActiveNav = () => {
  if (!navLinks.length || !sections.length) return;

  const scrollPos = window.scrollY + 120;
  let currentId = 'inicio';

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPos) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    link.classList.toggle('nav__link--active', href === `#${currentId}`);
  });
};

const onScroll = () => {
  updateHeader();
  updateActiveNav();
};

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();
