const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.getElementById(href.slice(1));
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
