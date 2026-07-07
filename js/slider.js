document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.mini-slider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dots = Array.from(slider.querySelectorAll('.dot'));
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle('active', slideIndex === index);
        });

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 3000);

    showSlide(currentIndex);
});
