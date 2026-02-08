(function () {
  "use strict";

  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.display = "none";
    }
  });

  const header = document.querySelector(".active-sticky-header");
  if (header) {
    const stickyHeader = header.querySelector(".header-sticky");
    const mainLogo = document.querySelector("#mainLogo");

    function handleHeaderHeight() {
      if (stickyHeader) {
        header.style.height = stickyHeader.offsetHeight + "px";
      }
    }

    let scrollTimeout;
    function handleScroll() {
      const scrollTop = window.scrollY;
      handleHeaderHeight();

      const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;

      if (stickyHeader) {
        stickyHeader.classList.toggle("hide", scrollTop > headerHeight + 100);
        stickyHeader.classList.toggle("active", scrollTop > 600);
      }

      if (mainLogo) {
        if (scrollTop > 600) {
          mainLogo.src = "images/white-logo.png";
        } else {
          mainLogo.src = "images/logo.png";
        }
      }
    }

    function throttledScroll() {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 10);
      }
    }

    window.addEventListener("resize", handleHeaderHeight);
    window.addEventListener("scroll", throttledScroll);
    handleHeaderHeight();
  }

  // Responsive Menu
  const mainMenu = document.querySelector(".main-menu");
  const responsiveMenu = document.querySelector(".responsive-menu");
  const navbarToggle = document.querySelector(".navbar-toggle");
  const bodyOverlay = document.querySelector(".body-overlay");

  if (mainMenu && responsiveMenu) {
    const menuWrapper = mainMenu.querySelector(".nav-menu-wrapper");
    if (menuWrapper) {
      responsiveMenu.innerHTML = menuWrapper.innerHTML;
    }

    if (navbarToggle) {
      navbarToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        responsiveMenu.classList.toggle("active");
        if (bodyOverlay) bodyOverlay.classList.toggle("active");
      });
    }

    if (bodyOverlay) {
      bodyOverlay.addEventListener("click", function () {
        if (navbarToggle) navbarToggle.classList.remove("active");
        responsiveMenu.classList.remove("active");
        this.classList.remove("active");
      });
    }
  }
})();
