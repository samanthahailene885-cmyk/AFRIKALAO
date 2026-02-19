const $ = (sel, root = document) => root.querySelector(sel);

const nav = $('#site-nav');
const toggle = $('.menu-toggle');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

const expertiseRow = $('#expertises-row');
const expertiseNavButtons = document.querySelectorAll('[data-expertise-nav]');

if (expertiseRow && expertiseNavButtons.length) {
  const getStep = () => {
    const card = expertiseRow.querySelector('.expertise-card');
    if (!card) return 280;
    const styles = window.getComputedStyle(expertiseRow);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  };

  expertiseNavButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = btn.getAttribute('data-expertise-nav');
      const delta = dir === 'left' ? -getStep() : getStep();
      expertiseRow.scrollBy({ left: delta, behavior: 'smooth' });
    });
  });
}

const year = $('#year');
if (year) year.textContent = String(new Date().getFullYear());

const form = $('#contact-form');
const hint = $('#form-hint');

if (form && hint) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !message) {
      hint.textContent = 'Merci de remplir tous les champs.';
      return;
    }

    hint.textContent = 'Message prêt à être envoyé. Branche un backend ou un service email pour l’envoi réel.';
    form.reset();
  });
}
