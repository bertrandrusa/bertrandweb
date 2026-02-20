/* =========================
   MAIN.JS
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAV
     ========================= */
  const hamburger = document.querySelector(".hamburger");
  const navList = document.querySelector("nav.nav-bar ul");

  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("active");
    });

    navList.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navList.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideNav = navList.contains(e.target);
      const clickedHamburger = hamburger.contains(e.target);
      if (!clickedInsideNav && !clickedHamburger) {
        navList.classList.remove("active");
      }
    });
  }


  /* =========================
     RESUME BUTTON CLICK
     ========================= */
  document.querySelectorAll(".container-button").forEach((wrap) => {
    const link = wrap.querySelector(".resume-btn");
    if (!link) return;

    wrap.addEventListener("click", () => {
      window.open(link.href, "_blank");
    });
  });


  /* =========================
     DARK MODE TOGGLE
     ========================= */
  const darkToggle = document.getElementById("dark-mode-toggle");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  const animateTheme = (isDark) => {
    if (typeof gsap !== "undefined") {
      gsap.to(document.body, {
        backgroundColor: isDark ? "#2f2f2f" : "#fbfbf0",
        color: isDark ? "#f6f6dc" : "#2f2f2f",
        duration: 0.25
      });

      const footer = document.querySelector("footer");
      if (footer) {
        gsap.to(footer, {
          borderColor: isDark ? "#f6f6dc" : "#2f2f2f",
          duration: 0.15
        });
      }
    }
  };

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      animateTheme(isDark);
    });
  }


  /* =========================
     SWIPER (NO PROGRESS BAR)
     ========================= */
  if (typeof Swiper !== "undefined") {
    const sliderEl = document.querySelector(".swiper-slider");
    if (sliderEl) {
      new Swiper(".swiper-slider", {
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
        }
      });
    }
  }


  /* =========================
     LOCOMOTIVE SCROLL + SMOOTH NAV
     ========================= */
  let scroller = null;

  const scrollContainer = document.querySelector("[data-scroll-container]");
  const canUseLoco = scrollContainer && typeof LocomotiveScroll !== "undefined";

  if (canUseLoco) {
    scroller = new LocomotiveScroll({
      el: scrollContainer,
      smooth: true
    });
  }

  document.querySelectorAll(".nav-bar a").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      if (scroller) {
        scroller.scrollTo(targetSection);
      } else {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const logoLink = document.querySelector('a.logo[href="#home"]');
  if (logoLink) {
    logoLink.addEventListener("click", (e) => {
      e.preventDefault();
      const home = document.getElementById("home");
      if (!home) return;

      if (scroller) {
        scroller.scrollTo(home);
      } else {
        home.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

});


