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

  // Contact form (works without backend + optional Formspree)
  const CONTACT_TO = 'contact@tranqimmo.fr'; // TODO: remplacez par votre email officiel
  // Option 1 (recommandé) : Formspree. Créez un formulaire puis collez l’URL ici :
  // ex : https://formspree.io/f/xxxxxxx
  const FORMSPREE_ENDPOINT = ''; // laissez vide pour utiliser l’envoi via email

  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const copyBtn = document.getElementById('copyBtn');

  const buildPayload = (data) => {
    const subject = 'Tranqimmo — Demande de contact (prototype investisseurs)';
    const lines = [];
    for (const [k, v] of data.entries()) {
      if (!v) continue;
      lines.push(`${k}: ${v}`);
    }
    return { subject, lines, body: lines.join('\n') };
  };

  const showStatus = (msg, ok=true) => {
    if (!statusEl) return;
    statusEl.style.display = 'block';
    statusEl.textContent = msg;
    statusEl.style.opacity = ok ? '1' : '.9';
  };

  if (copyBtn && form) {
    copyBtn.addEventListener('click', async () => {
      const data = new FormData(form);
      const { body } = buildPayload(data);
      try {
        await navigator.clipboard.writeText(body);
        showStatus('Message copié ✅ Vous pouvez le coller dans un email ou un message.', true);
      } catch (e) {
        showStatus('Impossible de copier automatiquement. Sélectionnez le texte et copiez manuellement.', false);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const { subject, body } = buildPayload(data);

      // If Formspree endpoint is configured, submit via fetch
      if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.startsWith('https://')) {
        try {
          const res = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
          });
          if (res.ok) {
            form.reset();
            showStatus('Envoyé ✅ Merci, on revient vers vous rapidement.', true);
          } else {
            showStatus('Erreur d’envoi. Utilisez l’envoi par email en attendant.', false);
            // fallback mailto
            const mailto = `mailto:${encodeURIComponent(CONTACT_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailto;
          }
        } catch (err) {
          showStatus('Erreur réseau. Ouverture de votre email…', false);
          const mailto = `mailto:${encodeURIComponent(CONTACT_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailto;
        }
        return;
      }

      // Default: mailto (works everywhere for a prototype)
      const mailto = `mailto:${encodeURIComponent(CONTACT_TO)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      showStatus('Ouverture de votre email… ✅', true);
    });
  }
})();