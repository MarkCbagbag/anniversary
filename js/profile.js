/* ===========================
   Background Slider
=========================== */

const bgSlider = (() => {
    const slider = document.getElementById('bgSlider');
    if (!slider) return {};

    const slides = Array.from(slider.querySelectorAll('.bg-slide'));
    if (!slides.length) return {};

    let current = 0;
    let timer = null;
    const intervalMs = 6000; // 6 seconds per slide

    const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const goTo = (index) => {
        slides[current].classList.remove('active');
        current = ((index % slides.length) + slides.length) % slides.length;
        slides[current].classList.add('active');
    };

    const next = () => goTo(current + 1);

    const start = () => {
        if (prefersReducedMotion || slides.length <= 1) return;
        stop();
        timer = setInterval(next, intervalMs);
    };

    const stop = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    return { start, stop, goTo, slides, intervalMs };
})();

/* ===========================
   Audio (magic note on reveal)
=========================== */

const audioCtx = window.AudioContext
    ? new (window.AudioContext || window.webkitAudioContext)()
    : null;

function playMagicNote() {
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
    gain.connect(audioCtx.destination);

    const notes = [330, 440, 550];

    notes.forEach((frequency, index) => {
        const osc = audioCtx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = frequency;
        osc.connect(gain);
        osc.start(now + index * 0.02);
        osc.stop(now + 2.8);
    });
}

/* ===========================
   Profile Reveal Sequence
=========================== */

function revealProfile() {
    const stage = document.querySelector('.profile-stage');
    const message = document.querySelector('.profile-message');
    const profiles = document.querySelector('.profiles');
    const title = document.querySelector('.who-watching');

    if (!stage || !message || !profiles) return;

    message.classList.add('show');
    playMagicNote();

    setTimeout(() => {
        message.classList.add('fade-out');
        stage.classList.add('open');

        if (title) {
            title.classList.remove('hidden');
            title.classList.add('show');
        }

        profiles.classList.remove('hidden');
        profiles.classList.add('revealed');

        // Start background slider after reveal
        if (bgSlider.start) {
            bgSlider.start();
        }
    }, 3200);
}

/* ===========================
   Profile Selection
=========================== */

function selectProfile(url) {
    const stage = document.querySelector('.profile-stage');
    if (!stage) {
        window.location.href = url;
        return;
    }

    stage.classList.add('fade-out-stage');

    // Also fade out the background slider for a smooth exit
    const sliderEl = document.getElementById('bgSlider');
    if (sliderEl) {
        sliderEl.style.transition = 'opacity 0.8s ease';
        sliderEl.style.opacity = '0';
    }

    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

// Keep backward compatibility with the old enterHome()
function enterHome() {
    selectProfile('home.php');
}

/* ===========================
   Init on DOM Ready
=========================== */

window.addEventListener('DOMContentLoaded', () => {
    revealProfile();
});
