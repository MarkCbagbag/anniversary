
(() => {
  const enteredKey = 'annivProfileEntered';

  const stage = () => document.querySelector('.profile-stage');
  const profiles = () => document.querySelector('.profiles');
  const message = () => document.querySelector('.profile-message');
  const backfillExisting = () => {


  };

  function initSelectOverlay() {
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach((card) => {

      if (card.dataset.overlayInit === '1') return;
      card.dataset.overlayInit = '1';

      const overlay = document.createElement('div');
      overlay.className = 'profile-select-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `
        <div class="profile-select-pill">Select</div>
      `;

      card.appendChild(overlay);

      const show = () => overlay.classList.add('show');
      const hide = () => overlay.classList.remove('show');

      card.addEventListener('pointerenter', show);
      card.addEventListener('pointerleave', hide);



      card.addEventListener('click', (e) => {
        overlay.classList.add('pressed');
        window.setTimeout(() => overlay.classList.remove('pressed'), 350);



        if (e && e.target && e.target.id === 'profileMusicToggle') {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  }

  function initMusicToggle() {

    const root = stage();
    if (!root) return;

    // Only create the profile music toggle when the site intends to show music controls.
    if (document.body && document.body.dataset && document.body.dataset.musicVisible !== '1') return;

    if (document.getElementById('profileMusicToggle')) return;

    const toggle = document.createElement('button');
    toggle.id = 'profileMusicToggle';
    toggle.type = 'button';
    toggle.className = 'profile-music-toggle';
    toggle.textContent = '🎵 Music: ON';

    root.appendChild(toggle);

    const syncStateFromAudio = () => {
      const audio = document.getElementById('bgMusic');
      if (!audio || typeof audio.muted !== 'boolean') return;

      if (audio.muted) {
        toggle.textContent = '🎵 Music: OFF';
      } else {
        toggle.textContent = '🎵 Music: ON';
      }
    };

    const toggleMusic = () => {
      const audio = document.getElementById('bgMusic');

      if (!window.anniversaryMusic) {

        toggle.textContent = '🎵 Music';
        return;
      }

      if (audio && !audio.paused && !audio.muted) {
        window.anniversaryMusic.pause?.();

        syncStateFromAudio();
        toggle.blur();
        return;
      }


      window.anniversaryMusic.play?.();

      if (audio) audio.muted = false;
      syncStateFromAudio();
      toggle.blur();
    };

    toggle.addEventListener('click', toggleMusic);


    const t = window.setInterval(() => {
      const audio = document.getElementById('bgMusic');
      if (audio) {
        syncStateFromAudio();
        window.clearInterval(t);
      }
    }, 400);
  }

  function initOncePerVisit() {
    const already = sessionStorage.getItem(enteredKey);
    if (!already) {
      sessionStorage.setItem(enteredKey, '1');
    }

    backfillExisting();
    initSelectOverlay();
    initMusicToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOncePerVisit);
  } else {
    initOncePerVisit();
  }
})();

