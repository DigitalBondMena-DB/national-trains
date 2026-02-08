(function () {
  "use strict";
  const initFormValidation = () => {
    document.querySelectorAll(".preventNumbers").forEach((input) => {
      input.addEventListener("input", function () {
        this.value = this.value.replace(/[0-9]/g, "");
      });
    });
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    const name = document.getElementById("nameInput");
    const email = document.getElementById("emailInput");
    const phone = document.getElementById("phoneInput");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("validMsg");
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

    const validateMessage = () => {
      if (!message) return true;
      if (message.value.trim().length < 10) {
        messageError?.classList.remove("hidden");
        return false;
      }
      messageError?.classList.add("hidden");
      return true;
    };

    if (name) name.addEventListener("input", validateName);
    if (email) email.addEventListener("input", validateEmail);
    if (phone) {
      phone.addEventListener("input", validatePhone);
      phone.addEventListener("blur", validatePhone);
    }
    if (message) message.addEventListener("input", validateMessage);

    contactForm.addEventListener("submit", function (e) {
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const valid =
        isNameValid && isEmailValid && isPhoneValid && isMessageValid;

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
    initFormValidation();
  });
})();
