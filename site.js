(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-overlay');
  const menuButton = document.querySelector('.menu-button');
  let lastY = window.scrollY;

  const setMenu = (open) => {
    if (!menu || !menuButton) return;
    body.classList.toggle('menu-open', open);
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) menu.querySelector('a')?.focus();
  };

  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
    if (event.key === 'Tab' && body.classList.contains('menu-open')) {
      const focusable = [...menu.querySelectorAll('a, button')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header?.classList.toggle('scrolled', y > 16);
    header?.classList.toggle('hidden', y > 180 && y > lastY + 4 && !body.classList.contains('menu-open'));
    if (y < lastY - 6) header?.classList.remove('hidden');
    lastY = y;
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  const rail = document.querySelector('[data-work-rail]');
  document.querySelectorAll('[data-rail-direction]').forEach((button) => {
    button.addEventListener('click', () => {
      rail?.scrollBy({ left: (button.dataset.railDirection === 'next' ? 1 : -1) * Math.min(innerWidth * .72, 900), behavior: 'smooth' });
    });
  });

  const filterButtons = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-project]');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        item.classList.toggle('active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      projects.forEach((project) => {
        project.hidden = filter !== 'all' && !String(project.dataset.project).split(' ').includes(filter);
      });
    });
  });

  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    status.textContent = 'Sending…';
    submit.disabled = true;
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not send your message.');
      form.reset();
      status.textContent = 'Message received. I’ll be in touch shortly.';
    } catch (error) {
      status.textContent = error.message + ' You can also email contact@paulhartmann.dev.';
    } finally { submit.disabled = false; }
  });

  document.querySelectorAll('[data-checkout]').forEach((button) => {
    button.addEventListener('click', async () => {
      const card = button.closest('.price-card');
      const status = card.querySelector('.purchase-status');
      const original = button.innerHTML;
      button.disabled = true;
      button.textContent = 'Opening secure checkout…';
      status.textContent = '';
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: button.dataset.checkout })
        });
        const data = await response.json();
        if (!response.ok || !data.url) throw new Error(data.error || 'Checkout is temporarily unavailable.');
        window.location.assign(data.url);
      } catch (error) {
        status.textContent = error.message;
        button.disabled = false;
        button.innerHTML = original;
      }
    });
  });

  const authRoot = document.querySelector('[data-auth-root]');
  if (authRoot) {
    fetch('/api/auth/session').then((r) => r.json()).then(({ user }) => {
      if (!user) return;
      authRoot.innerHTML = `<div class="user-panel"><div class="user-row">${user.avatar ? `<img src="${escapeHtml(user.avatar)}" alt="">` : ''}<div><strong>${escapeHtml(user.name || user.email)}</strong><div class="muted">${escapeHtml(user.email || user.provider)}</div></div></div><div class="action-row"><a class="ghost-button" href="/api/auth/logout">Sign out <span class="arrow">→</span></a></div></div>`;
    }).catch(() => {});
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[char]);
  }
})();
