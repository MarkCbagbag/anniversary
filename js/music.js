(function () {
  const MUSIC_KEY = "anniversaryMusicState";
  const MUSIC_SRC = "assets/bg-music/Acoustic Guitar x Piano Type Beat _ Pop Instrumental _ _when you so in love_.mp3";
  let audioElement = null;

  function getStoredState() {
    try {
      return JSON.parse(localStorage.getItem(MUSIC_KEY) || "{}") || {};
    } catch (error) {
      return {};
    }
  }

  function saveState() {
    if (!audioElement) {
      return;
    }

    const state = {
      playing: !audioElement.paused,
      currentTime: Number(audioElement.currentTime || 0),
      updatedAt: Date.now()
    };

    localStorage.setItem(MUSIC_KEY, JSON.stringify(state));
  }

  function createAudio() {
    if (audioElement) {
      return audioElement;
    }

    audioElement = document.createElement("audio");
    audioElement.id = "bgMusic";
    audioElement.src = MUSIC_SRC;
    audioElement.loop = true;
    audioElement.preload = "auto";
    // Start muted to allow autoplay in browsers that block unmuted autoplay.
    audioElement.muted = true;
    audioElement.style.display = "none";
    audioElement.setAttribute("aria-hidden", "true");

    audioElement.addEventListener("timeupdate", saveState);
    audioElement.addEventListener("play", saveState);
    audioElement.addEventListener("pause", saveState);
    audioElement.addEventListener("ended", () => {
      audioElement.currentTime = 0;
      audioElement.play().catch(() => {});
    });

    document.body.appendChild(audioElement);

    window.addEventListener("pagehide", saveState);
    window.addEventListener("beforeunload", saveState);

    return audioElement;
  }

  function startPlayback() {
    const audio = createAudio();
    const playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === "function") {
      return playPromise
        .then(() => {
          saveState();
          return true;
        })
        .catch(() => {
          saveState();
          return false;
        });
    }

    saveState();
    return Promise.resolve(true);
  }

  function pausePlayback() {
    if (!audioElement) {
      return;
    }

    audioElement.pause();
    saveState();
  }

  function stopPlayback() {
    if (!audioElement) {
      return;
    }

    audioElement.pause();
    audioElement.currentTime = 0;
    saveState();
  }

  function initialize() {
    const audio = createAudio();
    const state = getStoredState();

    if (state.currentTime) {
      audio.currentTime = Math.min(Number(state.currentTime), Number(audio.duration || state.currentTime || 0));
    }

    const tryPlay = () => {
      if (audio.paused) {
        startPlayback();
      }
    };

    // Attempt to autoplay muted immediately; many browsers allow muted autoplay.
    startPlayback().catch(() => {});

    // On first user gesture, unmute and resume playback so sound becomes audible.
    const onFirstGesture = () => {
      try {
        audio.muted = false;
        audio.play().catch(() => {});
      } catch (e) {}

      document.removeEventListener("pointerdown", onFirstGesture, { capture: true });
      document.removeEventListener("keydown", onFirstGesture, { capture: true });
      document.removeEventListener("touchstart", onFirstGesture, { capture: true });
      document.removeEventListener("click", onFirstGesture, { capture: true });
    };

    document.addEventListener("pointerdown", onFirstGesture, { capture: true });
    document.addEventListener("keydown", onFirstGesture, { capture: true });
    document.addEventListener("touchstart", onFirstGesture, { capture: true });
    document.addEventListener("click", onFirstGesture, { capture: true });
  }

  window.anniversaryMusic = {
    init: initialize,
    play: startPlayback,
    pause: pausePlayback,
    stop: stopPlayback
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
