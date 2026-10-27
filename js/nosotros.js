(() => {
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderDots = document.getElementById('sliderDots');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const slides = document.querySelectorAll('.slider-card');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentSlide = 0;
  let autoplayId = null;

  const goToSlide = (index) => {
    if (!sliderTrack || !slides.length) return;

    currentSlide = (index + slides.length) % slides.length;
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    document.querySelectorAll('[data-dot]').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentSlide);
    });
  };

  const renderDots = () => {
    if (!sliderDots) return;

    sliderDots.innerHTML = Array.from(slides, (_, index) => `
      <button type="button" data-dot="${index}" class="slider-dot ${index === 0 ? 'is-active' : ''}" aria-label="Ir al slide ${index + 1}"></button>
    `).join('');
  };

  const startAutoplay = () => {
    if (reduceMotion || slides.length < 2) return;
    stopAutoplay();
    autoplayId = setInterval(() => goToSlide(currentSlide + 1), 7000);
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  if (!sliderTrack || !slides.length) return;

  renderDots();
  goToSlide(0);
  startAutoplay();

  sliderPrev?.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
    startAutoplay();
  });

  sliderNext?.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
    startAutoplay();
  });

  sliderDots?.addEventListener('click', (event) => {
    const dot = event.target.closest('[data-dot]');
    if (!dot) return;
    goToSlide(Number(dot.dataset.dot));
    startAutoplay();
  });

  sliderTrack.addEventListener('mouseenter', stopAutoplay);
  sliderTrack.addEventListener('mouseleave', startAutoplay);
})();
