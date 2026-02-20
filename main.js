// =========================
// DARK MODE TOGGLE
// =========================
const darkToggle = document.getElementById('dark-mode-toggle');

if (darkToggle) {
    darkToggle.addEventListener('click', function () {
        const body = document.body;
        const footer = document.querySelector('footer');
        const isDark = body.classList.toggle('dark-mode');

        gsap.to(body, {
            backgroundColor: isDark ? '#2f2f2f' : '#fbfbf0',
            color: isDark ? '#f6f6dc' : '#2f2f2f',
            duration: 0.25
        });

        if (footer) {
            gsap.to(footer, {
                borderColor: isDark ? '#f6f6dc' : '#2f2f2f',
                duration: 0.15
            });
        }
    });
}


// =========================
// SWIPER
// =========================
if (typeof Swiper !== "undefined") {
    const swiper = new Swiper(".swiper-slider", {
        centeredSlides: true,
        speed: 800,
        slidesPerView: 1,
        grabCursor: true,
        loop: true,
        touchRatio: 1.5,
        keyboard: { enabled: true },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        }
    });
}


// =========================
// LOCOMOTIVE SCROLL
// =========================
let scroller = null;

const scrollContainer = document.querySelector('[data-scroll-container]');
if (scrollContainer && typeof LocomotiveScroll !== "undefined") {
    scroller = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true
    });
}


// =========================
// NAV SMOOTH SCROLL
// =========================
document.querySelectorAll('.nav-bar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (scroller && targetSection) {
            scroller.scrollTo(targetSection);
        } else if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// =========================
// TOP LOGO SCROLL (SAFE)
// =========================
const topLink = document.querySelector('.go');

if (topLink) {
    topLink.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (scroller && targetSection) {
            scroller.scrollTo(targetSection);
        } else if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}
