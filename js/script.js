const intro = document.getElementById("intro");
const login = document.getElementById("login");
const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
            login.style.opacity = "1";
            login.style.pointerEvents = "auto";
        }, 900);
    });
}

const loginForm = document.querySelector("#login form");
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        const name = document.getElementById("love")?.value.trim().toLowerCase() || "";
        const date = document.getElementById("date")?.value.trim() || "";
        const error = document.getElementById("error");
        const girlfriend = "kimmy";
        const anniversary = "2023";

        if (name !== girlfriend || date !== anniversary) {
            event.preventDefault();
            if (error) {
                error.style.color = "#ff7373";
                error.innerHTML = "That's not quite right... ❤️ Try again.";
            }
        } else if (error) {
            error.style.color = "#8cff8c";
            error.innerHTML = "❤️ Identity Confirmed...";
        }
    });
}

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
    document.querySelectorAll(".password-toggle").forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (!input) return;

            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            button.textContent = isPassword ? "Hide" : "Show";
            button.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
        });
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

