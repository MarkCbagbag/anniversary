/* ===========================
   Video ↔ Background Music Sync
   When any <video> on the page plays, pause BG music.
   When all videos are paused, resume BG music.
=========================== */

(function () {
  if (window.__annivVideoSyncInit) return;
  window.__annivVideoSyncInit = true;

  var videos = document.querySelectorAll('video');
  if (!videos.length) return;

  var musicPausedByVideo = false;

  function pauseMusic() {
    if (!musicPausedByVideo && window.anniversaryMusic) {
      musicPausedByVideo = true;
      window.anniversaryMusic.pause();
    }
  }

  function resumeMusic() {
    // Check if ANY video on the page is still playing
    var anyPlaying = false;
    var allVideos = document.querySelectorAll('video');
    for (var i = 0; i < allVideos.length; i++) {
      if (!allVideos[i].paused) {
        anyPlaying = true;
        break;
      }
    }

    if (!anyPlaying && musicPausedByVideo && window.anniversaryMusic) {
      musicPausedByVideo = false;
      window.anniversaryMusic.resume();
    }
  }

  videos.forEach(function (video) {
    video.addEventListener('play', pauseMusic);
    video.addEventListener('pause', resumeMusic);
    video.addEventListener('ended', resumeMusic);

    // If video starts playing immediately (autoplay), pause music
    if (!video.paused) {
      pauseMusic();
    }
  });
})();
