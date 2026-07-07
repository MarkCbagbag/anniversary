const player = document.getElementById("videoPlayer");

if (player) {
    player.muted = true;
    player.autoplay = true;
    player.playsInline = true;

    player.addEventListener("ended", () => {
        window.location.href = "profiles.html";
    });

    player.addEventListener("error", () => {
        setTimeout(() => {
            window.location.href = "profiles.html";
        }, 3000);
    });

    setTimeout(() => {
        if (player.paused && !player.ended) {
            window.location.href = "profiles.html";
        }
    }, 7000);
}