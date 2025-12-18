(() => {
  // Mobile nav
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('#nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // Mailto fallback (useful if Formspree isn't configured)
  const mailtoBtn = document.getElementById('mailtoBtn');
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      const to = 'contact@tranqimmo.fr'; // TODO: change to your email
      const form = document.getElementById('leadForm');
      const data = new FormData(form);

      const subject = encodeURIComponent('Tranqimmo — Demande de contact (prototype investisseurs)');
      const lines = [];
      for (const [k, v] of data.entries()) {
        if (!v) continue;
        lines.push(`${k}: ${v}`);
      }
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
})();