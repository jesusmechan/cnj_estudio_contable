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
  '.contact-intro',
  '.contact-form',
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

const contactForm = document.getElementById('contactForm');
const contactError = document.getElementById('contactError');
const contactSuccess = document.getElementById('contactSuccess');

const contactFields = {
  nombre: document.getElementById('contactName'),
  correo: document.getElementById('contactEmail'),
  telefono: document.getElementById('contactPhone'),
  servicio: document.getElementById('contactService'),
  mensaje: document.getElementById('contactMessage'),
};

const contactMessages = {
  nombre: {
    valueMissing: 'El nombre es obligatorio.',
    tooShort: 'El nombre debe tener al menos 3 letras.',
    patternMismatch: 'El nombre solo puede contener letras y espacios.',
  },
  correo: {
    valueMissing: 'El correo es obligatorio.',
    typeMismatch: 'Ingresa un correo válido (ejemplo: nombre@empresa.com).',
    patternMismatch: 'Ingresa un correo válido (ejemplo: nombre@empresa.com).',
  },
  telefono: {
    valueMissing: 'El teléfono es obligatorio.',
    tooShort: 'El teléfono debe tener exactamente 9 dígitos.',
    tooLong: 'El teléfono debe tener exactamente 9 dígitos.',
    patternMismatch: 'El teléfono solo puede contener números (9 dígitos).',
  },
  servicio: {
    valueMissing: 'Selecciona un servicio de interés.',
  },
  mensaje: {
    valueMissing: 'El mensaje es obligatorio.',
    tooShort: 'El mensaje debe tener al menos 15 caracteres.',
  },
};

const getFieldErrorEl = (field) => document.getElementById(`${field.id}Error`);

const clearFieldError = (field) => {
  field.classList.remove('is-invalid');
  const errorEl = getFieldErrorEl(field);
  if (errorEl) errorEl.textContent = '';
};

const setFieldError = (field, message) => {
  field.classList.add('is-invalid');
  const errorEl = getFieldErrorEl(field);
  if (errorEl) errorEl.textContent = message;
};

const getValidationMessage = (field) => {
  const key = field.name;
  const map = contactMessages[key] || {};
  const validity = field.validity;

  if (validity.valueMissing) return map.valueMissing || 'Este campo es obligatorio.';
  if (validity.typeMismatch) return map.typeMismatch || 'Formato inválido.';
  if (validity.patternMismatch) return map.patternMismatch || 'Formato inválido.';
  if (validity.tooShort) return map.tooShort || 'El texto es demasiado corto.';
  if (validity.tooLong) return map.tooLong || 'El texto es demasiado largo.';
  return field.validationMessage || 'Revisa este campo.';
};

const validateContactField = (field, { requireFilled = true } = {}) => {
  if (!field) return true;

  if (field.id === 'contactName') {
    const lettersOnly = field.value.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]/g, '').replace(/\s+/g, ' ');
    if (field.value !== lettersOnly) field.value = lettersOnly;
  }

  if (field.id === 'contactPhone') {
    const digitsOnly = field.value.replace(/\D/g, '').slice(0, 9);
    if (field.value !== digitsOnly) field.value = digitsOnly;
  }

  if (field.id === 'contactEmail') {
    field.value = field.value.trim().toLowerCase();
  }

  if (field.id === 'contactMessage') {
    field.value = field.value.replace(/^\s+/, '');
  }

  const isEmpty = !String(field.value || '').trim();

  if (!requireFilled && isEmpty) {
    clearFieldError(field);
    return true;
  }

  if (field.checkValidity()) {
    clearFieldError(field);
    return true;
  }

  setFieldError(field, getValidationMessage(field));
  return false;
};

if (contactForm) {
  Object.values(contactFields).forEach((field) => {
    if (!field) return;

    field.addEventListener('input', () => {
      if (contactSuccess) contactSuccess.classList.add('hidden');
      validateContactField(field, { requireFilled: false });

      const hasInvalid = Object.values(contactFields).some((item) => item && item.classList.contains('is-invalid'));
      if (!hasInvalid && contactError) contactError.classList.add('hidden');
    });

    field.addEventListener('blur', () => validateContactField(field, { requireFilled: true }));
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (contactSuccess) contactSuccess.classList.add('hidden');
    if (contactError) contactError.classList.add('hidden');

    let firstInvalid = null;
    let isValid = true;

    Object.values(contactFields).forEach((field) => {
      if (!validateContactField(field, { requireFilled: true })) {
        isValid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!isValid) {
      if (contactError) contactError.classList.remove('hidden');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    contactForm.reset();
    Object.values(contactFields).forEach((field) => {
      if (field) clearFieldError(field);
    });
    if (contactSuccess) contactSuccess.classList.remove('hidden');
  });
}
