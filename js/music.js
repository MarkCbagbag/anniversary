(function () {
  const MUSIC_KEY = "anniversaryMusicState";
  const MUSIC_SRC = "assets/bg-music/[FREE] Acoustic Guitar x Piano Type Beat _ Pop Instrumental _ _when you so in love_.mp3";
  const TOGGLE_SELECTOR = "[data-music-toggle]";

  if (window.__anniversaryMusicBootstrapped) {
    return;
  }
  window.__anniversaryMusicBootstrapped = true;

  let audioElement = null;
  let initialized = false;

  function getStoredState() {
    try {
      return JSON.parse(localStorage.getItem(MUSIC_KEY) || "{}") || {};
    } catch (error) {
      return {};
    }
  }

  function saveState() {
    if (!audioElement) return;

    const state = {
      enabled: audioElement.dataset.enabled !== "false",
      playing: !audioElement.paused,
      currentTime: Number(audioElement.currentTime || 0),
      updatedAt: Date.now()
    };

    localStorage.setItem(MUSIC_KEY, JSON.stringify(state));
  }

  function syncToggleButtons() {
    const enabled = Boolean(audioElement && audioElement.dataset.enabled !== "false");
    document.querySelectorAll(TOGGLE_SELECTOR).forEach((button) => {
      button.setAttribute("aria-pressed", enabled ? "true" : "false");
      button.textContent = enabled ? "🎵 Music: ON" : "🔇 Music: OFF";
      button.classList.toggle("is-off", !enabled);
    });
  }

  function createAudio() {
    if (audioElement) return audioElement;

    audioElement = document.createElement("audio");
    audioElement.id = "bgMusic";
    audioElement.src = MUSIC_SRC;
    audioElement.loop = true;
    audioElement.preload = "auto";
    audioElement.autoplay = false;
    audioElement.muted = true;
    audioElement.dataset.enabled = "true";
    audioElement.style.display = "none";
    audioElement.setAttribute("aria-hidden", "true");

    audioElement.addEventListener("timeupdate", saveState);
    audioElement.addEventListener("play", saveState);
    audioElement.addEventListener("pause", saveState);
    audioElement.addEventListener("ended", () => {
      if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.play().catch(() => {});
      }
    });

    document.body.appendChild(audioElement);

    window.addEventListener("pagehide", saveState);
    window.addEventListener("beforeunload", saveState);

    return audioElement;
  }

  function startPlayback() {
    const audio = createAudio();
    if (audio.dataset.enabled === "false") {
      audio.pause();
      saveState();
      syncToggleButtons();
      return Promise.resolve(false);
    }

    audio.muted = false;
    audio.volume = 1;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      return playPromise
        .then(() => {
          saveState();
          syncToggleButtons();
          return true;
        })
        .catch(() => {
          saveState();
          syncToggleButtons();
          return false;
        });
    }

    saveState();
    syncToggleButtons();
    return Promise.resolve(true);
  }

  function pausePlayback() {
    if (!audioElement) return;
    audioElement.pause();
    saveState();
    syncToggleButtons();
  }

  function setEnabled(enabled) {
    const audio = createAudio();
    audio.dataset.enabled = enabled ? "true" : "false";
    if (!enabled) {
      audio.pause();
      saveState();
      syncToggleButtons();
      return;
    }

    audio.muted = false;
    audio.volume = 1;
    startPlayback().catch(() => {});
    saveState();
    syncToggleButtons();
  }

  function stopPlayback() {
    if (!audioElement) return;
    audioElement.pause();
    audioElement.currentTime = 0;
    saveState();
    syncToggleButtons();
  }

  function unmuteAndEnsurePlaying() {
    const audio = createAudio();

    if (audio.dataset.enabled === "false") {
      audio.pause();
      saveState();
      syncToggleButtons();
      return;
    }

    audio.muted = false;
    audio.volume = 1;

    if (audio.paused) {
      const p = startPlayback();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      audio.play().catch(() => {});
    }

    saveState();
    syncToggleButtons();
  }

  function bindToggleButtons() {
    document.querySelectorAll(TOGGLE_SELECTOR).forEach((button) => {
      if (button.dataset.musicBound === "1") return;
      button.dataset.musicBound = "1";
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const currentEnabled = audioElement ? audioElement.dataset.enabled !== "false" : true;
        setEnabled(!currentEnabled);
      });
    });
  }

  function initialize() {
    if (initialized) return;
    initialized = true;

    const audio = createAudio();
    const state = getStoredState();
    const enabled = state.enabled === undefined ? true : Boolean(state.enabled);
    audio.dataset.enabled = enabled ? "true" : "false";

    if (state.currentTime) {
      audio.currentTime = Math.min(
        Number(state.currentTime),
        Number(audio.duration || state.currentTime || 0)
      );
    }

    syncToggleButtons();
    bindToggleButtons();
    startPlayback().catch(() => {});

    const onFirstGesture = () => {
      unmuteAndEnsurePlaying();
      [
        "pointerdown",
        "keydown",
        "touchstart",
        "touchend",
        "click",
        "mouseup"
      ].forEach((eventName) => {
        document.removeEventListener(eventName, onFirstGesture, { capture: true });
      });
    };

    [
      "pointerdown",
      "keydown",
      "touchstart",
      "touchend",
      "click",
      "mouseup"
    ].forEach((eventName) => {
      document.addEventListener(eventName, onFirstGesture, { capture: true });
    });

    const startButtons = ["startBtn", "loginBtn", "playButton", "logoutBtn"];
    startButtons.forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener("click", () => {
          unmuteAndEnsurePlaying();
        });
      }
    });

    window.anniversaryMusicPlayAndUnmute = unmuteAndEnsurePlaying;
  }

  window.anniversaryMusic = {
    init: initialize,
    play: startPlayback,
    pause: pausePlayback,
    stop: stopPlayback,
    setEnabled
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.anniversaryMusicPlayAndUnmute = unmuteAndEnsurePlaying;
})();
