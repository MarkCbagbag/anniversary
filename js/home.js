document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const season1Card = document.getElementById("season1Card");
  const logoutBtn = document.getElementById("logoutBtn");

  if (playButton && season1Card) {
    playButton.addEventListener("click", () => {
      season1Card.scrollIntoView({ behavior: "smooth", block: "center" });
      season1Card.classList.add("active");
      setTimeout(() => {
        season1Card.classList.remove("active");
      }, 1800);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      // Prevent default anchor navigation so we can stop the music cleanly first.
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }

      if (window.anniversaryMusic && typeof window.anniversaryMusic.stop === "function") {
        window.anniversaryMusic.stop();
      }

      localStorage.removeItem("anniversaryMusicState");
      // Navigate after a short delay to ensure audio state is saved/stopped.
      setTimeout(() => {
        window.location.href = "index.html";
      }, 50);
    });
  }
});
