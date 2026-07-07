const intro = document.getElementById("intro");
const login = document.getElementById("login");

document.getElementById("startBtn").onclick = () => {
    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
        login.style.opacity = "1";
        login.style.pointerEvents = "auto";
    }, 900);
};

document.getElementById("loginBtn").onclick = () => {
    const name = document.getElementById("love").value.trim().toLowerCase();
    const date = document.getElementById("date").value.trim();
    const error = document.getElementById("error");


    const girlfriend = "kimmy";
    const anniversary = "2023";

    if (name === girlfriend && date === anniversary) {
        error.style.color = "#8cff8c";
        error.innerHTML = "❤️ Identity Confirmed...";

        setTimeout(() => {
            window.location.href = "verify.php";
        }, 1800);
    } else {
        error.style.color = "#ff7373";
        error.innerHTML = "That's not quite right... ❤️ Try again.";
    }
};


(() => {
    const backBtn = document.getElementById("backBtn");
    if (!backBtn) return;

    backBtn.addEventListener("click", () => {

        login.style.opacity = "0";
        login.style.pointerEvents = "none";


        const error = document.getElementById("error");
        if (error) {
            error.innerHTML = "";
            error.style.color = "";
        }

        setTimeout(() => {
            login.style.display = "none";
            intro.style.display = "flex";
            intro.style.opacity = "1";
        }, 150);
    });
})();



(() => {
    const sliderRoot = document.querySelector(".mini-slider");
    if (!sliderRoot) return;

    const slides = Array.from(sliderRoot.querySelectorAll(".slide"));
    const dots = Array.from(sliderRoot.querySelectorAll(".dot"));
    if (!slides.length || !dots.length) return;

    let index = slides.findIndex((s) => s.classList.contains("active"));
    if (index < 0) index = 0;

    const prefersReducedMotion =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = prefersReducedMotion ? 0 : 4200;

    const render = () => {
        slides.forEach((s, i) => s.classList.toggle("active", i === index));
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    };

    render();

    let timer = null;
    const start = () => {
        if (!intervalMs) return;
        timer = window.setInterval(() => {
            index = (index + 1) % slides.length;
            render();
        }, intervalMs);
    };

    const stop = () => {
        if (timer) {
            window.clearInterval(timer);
            timer = null;
        }
    };

    sliderRoot.addEventListener("mouseenter", stop);
    sliderRoot.addEventListener("mouseleave", start);

    start();
})();

