(function () {
  function initServiceImageSlider() {
    const property_photos_carousel = new Swiper(
      ".service-images-slider .swiper",
      {
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 10,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: ".swiper-arrow-next",
          prevEl: ".swiper-arrow-prev",
        },
      },
    );
  }
  document.addEventListener("DOMContentLoaded", function () {
    initServiceImageSlider();
  });
})();
