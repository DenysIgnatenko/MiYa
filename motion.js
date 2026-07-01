(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sections = document.querySelectorAll('main > section, main > article, .privacy-page > *');

  sections.forEach((section, index) => {
    section.dataset.reveal = index % 3 === 1 ? 'left' : index % 3 === 2 ? 'right' : 'up';
  });

  document.querySelectorAll(
    '.metric-card, .fit-grid article, .approach-list article, .case-card, .service-grid article, .testimonial-grid article, .process li, .package-grid article, .method-grid article, .case-method-grid article, .contact-channel-list article'
  ).forEach((item, index) => {
    item.dataset.reveal = 'up';
    item.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`);
  });

  document.documentElement.classList.add('motion-ready');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item));
})();
