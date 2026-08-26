const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (link === backToTop) return;

  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    const id = href && href.slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (nav && menuToggle) {
      nav.classList.remove('nav--open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    history.replaceState(null, '', window.location.pathname + window.location.search);
  });
});

if (backToTop) {
  const updateBackToTop = () => {
    const nearEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 120;
    backToTop.classList.toggle('is-visible', nearEnd);
  };

  backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', window.location.pathname + window.location.search);
  });

  window.addEventListener('scroll', updateBackToTop, { passive: true });
  window.addEventListener('resize', updateBackToTop);
  updateBackToTop();
}
