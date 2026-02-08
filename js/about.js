(function () {
  "use strict";
  const initSwipers = () => {
    if (document.querySelector(".hero-slider-layout .swiper")) {
      new Swiper(".hero-slider-layout .swiper", {
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 0,
        loop: true,
        autoplay: { delay: 4000 },
        pagination: { el: ".swiper-pagination", clickable: true },
      });
    }

    if (document.querySelector(".testimonial-slider .swiper")) {
      new Swiper(".testimonial-slider .swiper", {
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: { 768: { slidesPerView: 2 }, 991: { slidesPerView: 3 } },
      });
    }

    if (document.querySelector(".service-images-slider .swiper")) {
      new Swiper(".service-images-slider .swiper", {
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        autoplay: { delay: 5000 },
        navigation: {
          nextEl: ".swiper-arrow-next",
          prevEl: ".swiper-arrow-prev",
        },
      });
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    initSwipers();
  });
})();
