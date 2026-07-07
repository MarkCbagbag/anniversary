(() => {
  const enteredKey = 'annivProfileEntered';

  function initSelectOverlay() {
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach((card) => {
      if (card.dataset.overlayInit === '1') return;
      card.dataset.overlayInit = '1';

      const overlay = document.createElement('div');
      overlay.className = 'profile-select-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = '<div class="profile-select-pill">Select</div>';

      card.appendChild(overlay);

      const show = () => overlay.classList.add('show');
      const hide = () => overlay.classList.remove('show');

      card.addEventListener('pointerenter', show);
      card.addEventListener('pointerleave', hide);

      card.addEventListener('click', () => {
        overlay.classList.add('pressed');
        window.setTimeout(() => overlay.classList.remove('pressed'), 350);
      });
    });
  }

  function initOncePerVisit() {
    const already = sessionStorage.getItem(enteredKey);
    if (!already) sessionStorage.setItem(enteredKey, '1');
    initSelectOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOncePerVisit);
  } else {
    initOncePerVisit();
  }
})();
