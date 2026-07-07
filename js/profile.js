const audioCtx = window.AudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;

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

function revealProfile() {
    const stage = document.querySelector('.profile-stage');
    const message = document.querySelector('.profile-message');
    const profiles = document.querySelector('.profiles');

    message.classList.add('show');
    playMagicNote();

    window.setTimeout(() => {
        message.classList.add('fade-out');
        stage.classList.add('open');
        profiles.classList.remove('hidden');
        profiles.classList.add('revealed');
    }, 3200);
}

function enterHome() {
    const stage = document.querySelector('.profile-stage');
    stage.classList.add('fade-out-stage');
    window.setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    revealProfile();
});