(function () {
  const MUSIC_SRC = "assets/bg-music/[FREE] Acoustic Guitar x Piano Type Beat _ Pop Instrumental _ _when you so in love_.mp3";

  if (window.__anniversaryMusicBootstrapped) {
    return;
  }
  window.__anniversaryMusicBootstrapped = true;

  let audioElement = null;
  let initialized = false;
  let manuallyPaused = false; // true when user intentionally stopped music

  function getStoredState() {
    try {
      return JSON.parse(localStorage.getItem("anniversaryMusicState") || "{}") || {};
    } catch (error) {
      return {};
    }
  }

  function saveState() {
    if (!audioElement) return;
    const state = {
      playing: !audioElement.paused,
      currentTime: Number(audioElement.currentTime || 0),
      updatedAt: Date.now()
    };
    localStorage.setItem("anniversaryMusicState", JSON.stringify(state));
  }

  function createAudio() {
    if (audioElement) return audioElement;

    audioElement = document.createElement("audio");
    audioElement.id = "bgMusic";
    audioElement.src = MUSIC_SRC;
    audioElement.loop = true;
    audioElement.preload = "auto";
    audioElement.autoplay = false;
    audioElement.muted = false;
    audioElement.volume = 1;
    audioElement.style.display = "none";
    audioElement.setAttribute("aria-hidden", "true");

    audioElement.addEventListener("timeupdate", saveState);
    audioElement.addEventListener("play", saveState);
    audioElement.addEventListener("pause", saveState);
    audioElement.addEventListener("ended", () => {
      if (audioElement && !manuallyPaused) {
        audioElement.currentTime = 0;
        audioElement.play().catch(function () {});
      }
    });

    document.body.appendChild(audioElement);

    window.addEventListener("pagehide", saveState);
    window.addEventListener("beforeunload", saveState);

    return audioElement;
  }

  function startPlayback() {
    const audio = createAudio();
    if (manuallyPaused) return Promise.resolve(false);

    audio.muted = false;
    audio.volume = 1;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === "function") {
      return playPromise
        .then(function () {
          saveState();
          return true;
        })
        .catch(function () {
          saveState();
          return false;
        });
    }

    saveState();
    return Promise.resolve(true);
  }

  function pausePlayback() {
    if (!audioElement) return;
    audioElement.pause();
    saveState();
  }

  function resumePlayback() {
    if (!audioElement) return;
    if (manuallyPaused) return;
    audioElement.muted = false;
    audioElement.volume = 1;
    audioElement.play().catch(function () {});
    saveState();
  }

  function stopPlayback() {
    if (!audioElement) return;
    audioElement.pause();
    audioElement.currentTime = 0;
    saveState();
  }

  function ensurePlaying() {
    const audio = createAudio();
    if (manuallyPaused) {
      audio.pause();
      saveState();
      return;
    }

    audio.muted = false;
    audio.volume = 1;

    if (audio.paused) {
      startPlayback().catch(function () {});
    } else {
      audio.play().catch(function () {});
    }

    saveState();
  }

  function initialize() {
    if (initialized) return;
    initialized = true;

    const audio = createAudio();
    const state = getStoredState();

    if (state.currentTime) {
      audio.currentTime = Math.min(
        Number(state.currentTime),
        Number(audio.duration || state.currentTime || 0)
      );
    }

    startPlayback().catch(function () {});

    // Resume on first user gesture (browser autoplay policy)
    var onFirstGesture = function () {
      ensurePlaying();
      [
        "pointerdown", "keydown", "touchstart", "touchend", "click", "mouseup"
      ].forEach(function (eventName) {
        document.removeEventListener(eventName, onFirstGesture, { capture: true });
      });
    };

    [
      "pointerdown", "keydown", "touchstart", "touchend", "click", "mouseup"
    ].forEach(function (eventName) {
      document.addEventListener(eventName, onFirstGesture, { capture: true });
    });

    // Also resume on any button click
    var buttons = ["startBtn", "loginBtn", "playButton", "logoutBtn"];
    buttons.forEach(function (buttonId) {
      var button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener("click", function () {
          ensurePlaying();
        });
      }
    });

    window.anniversaryMusicPlayAndUnmute = ensurePlaying;
  }

  window.anniversaryMusic = {
    init: initialize,
    play: startPlayback,
    pause: pausePlayback,
    resume: resumePlayback,
    stop: stopPlayback,
    ensurePlaying: ensurePlaying,
    isPaused: function () {
      return audioElement ? audioElement.paused : true;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }

  window.anniversaryMusicPlayAndUnmute = ensurePlaying;
})();
