(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.mobile-menu').forEach((menu) => {
    const trigger = menu.querySelector('summary');
    const closeMenu = () => {
      menu.open = false;
      trigger?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    };

    trigger?.setAttribute('aria-expanded', String(menu.open));
    menu.addEventListener('toggle', () => {
      trigger?.setAttribute('aria-expanded', String(menu.open));
      document.body.classList.toggle('menu-open', menu.open);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('pointerdown', (event) => {
      if (menu.open && !menu.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        closeMenu();
        trigger?.focus();
      }
    });
  });

  document.querySelectorAll('form').forEach((form) => {
    let status = form.querySelector('.form-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('aria-live', 'polite');
      status.setAttribute('aria-atomic', 'true');
      form.append(status);
    }

    form.addEventListener('invalid', () => {
      status.textContent = 'Перевірте, будь ласка, обов’язкові поля.';
    }, true);
    form.addEventListener('input', () => {
      status.textContent = '';
    });
  });

  const mobileCta = document.createElement('nav');
  mobileCta.className = 'mobile-cta';
  mobileCta.setAttribute('aria-label', 'Швидкий зв’язок');
  mobileCta.innerHTML = `
    <a class="mobile-cta__primary" href="https://t.me/marrrakuya" rel="me">Написати в Telegram</a>
    <a href="./contacts.html#contact-form">Залишити заявку</a>
  `;
  document.body.append(mobileCta);

  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.type = 'button';
  backToTop.setAttribute('aria-label', 'Повернутися нагору');
  backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.append(backToTop);

  const updateBackToTop = () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  };
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
})();
