document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("image_slider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".slider_dot");
    const prevBtn = slider.querySelector(".slider_prev");
    const nextBtn = slider.querySelector(".slider_next");

    const AUTOPLAY_DELAY = 5000; // 5 seconds between auto slides
    let currentIndex = 0;
    let autoplayTimer = null;

    function goToSlide(index) {
        // wrap around in both directions
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentIndex);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        if (autoplayTimer) clearInterval(autoplayTimer);
    }

    // manual controls
    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoplay(); // reset the timer after manual interaction
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoplay();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            goToSlide(parseInt(dot.dataset.index, 10));
            startAutoplay();
        });
    });

    // pause automatic sliding while the user is hovering over it
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    // kick things off
    goToSlide(0);
    startAutoplay();
});