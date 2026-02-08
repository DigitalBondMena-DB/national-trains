(function () {
  "use strict";

  // Swiper Initializations
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

  // Contact Form Validation
  const initFormValidation = () => {
    document.querySelectorAll(".preventNumbers").forEach((input) => {
      input.addEventListener("input", function () {
        this.value = this.value.replace(/[0-9]/g, "");
      });
    });
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    // الحقول
    const name = document.getElementById("nameInput");
    const email = document.getElementById("emailInput");
    const phone = document.getElementById("phoneInput");
    const subject = document.getElementById("subjectInput");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("validMsg");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");
    const actualPhone = document.getElementById("actualPhone");

    let iti;
    if (phone && window.intlTelInput) {
      iti = window.intlTelInput(phone, {
        initialCountry: "sa",
        preferredCountries: ["eg", "sa", "ae", "kw", "qa", "jo"],
        separateDialCode: true,
        loadUtils: () =>
          import("https://cdn.jsdelivr.net/npm/intl-tel-input@26.0.6/build/js/utils.js"),
      });
    }

    // دوال التحقق
    const validateName = () => {
      if (!name) return true;
      const value = name.value.trim();
      const hasNumber = /\d/.test(value);

      const smalls = nameError ? nameError.querySelectorAll("small") : [];
      smalls[0]?.classList.add("hidden");
      smalls[1]?.classList.add("hidden");

      if (value.length < 3) {
        smalls[0]?.classList.remove("hidden");
        return false;
      }
      if (hasNumber) {
        smalls[1]?.classList.remove("hidden");
        return false;
      }
      return true;
    };

    const validateEmail = () => {
      if (!email) return true;
      const value = email.value.trim();
      const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;
      if (!regex.test(value)) {
        emailError?.classList.remove("hidden");
        return false;
      }
      emailError?.classList.add("hidden");
      return true;
    };

    const validatePhone = () => {
      if (!phone) return true;
      const value = phone.value.trim();
      phoneError?.classList.add("hidden");

      if (!value) {
        if (phoneError) {
          phoneError.textContent = "Phone number is required.";
          phoneError.classList.remove("hidden");
        }
        return false;
      }

      if (iti && !iti.isValidNumber()) {
        if (phoneError) {
          phoneError.textContent = "Invalid phone number.";
          phoneError.classList.remove("hidden");
        }
        return false;
      }

      return true;
    };

    const validateSubject = () => {
      if (!subject) return true;
      if (!subject.value.trim()) {
        subjectError?.classList.remove("hidden");
        return false;
      }
      subjectError?.classList.add("hidden");
      return true;
    };

    const validateMessage = () => {
      if (!message) return true;
      if (message.value.trim().length < 10) {
        messageError?.classList.remove("hidden");
        return false;
      }
      messageError?.classList.add("hidden");
      return true;
    };

    // الأحداث الفورية
    if (name) name.addEventListener("input", validateName);
    if (email) email.addEventListener("input", validateEmail);
    if (phone) {
      phone.addEventListener("input", validatePhone);
      phone.addEventListener("blur", validatePhone);
    }
    if (subject) subject.addEventListener("input", validateSubject);
    if (message) message.addEventListener("input", validateMessage);

    // عند الإرسال
    contactForm.addEventListener("submit", function (e) {
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      const valid =
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isSubjectValid &&
        isMessageValid;

      if (valid) {
        if (iti) {
          const countryData = iti.getSelectedCountryData();
          const phoneValue = phone.value.trim();
          const dialCode = countryData?.dialCode || "20";
          const phoneWithCode = `+${dialCode}${phoneValue}`;
          if (actualPhone) actualPhone.value = phoneWithCode;
        }
        alert("Form submitted successfully!");
      } else {
        e.preventDefault();
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initSwipers();
    initFormValidation();
  });
})();
