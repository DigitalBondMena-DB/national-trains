window.GlobalValidation = (function () {
  "use strict";

  function showError(input, message) {
    // If it's a phone input with intl-tel-input, we might want to append to the container
    const container = input.closest(".form-group") || input.parentElement;
    let errorContainer = container.querySelector(".error-message");
    if (!errorContainer) {
      errorContainer = document.createElement("div");
      errorContainer.className = "error-message text-danger small mt-1";
      container.appendChild(errorContainer);
    }
    errorContainer.innerText = message;
    input.classList.add("is-invalid");
  }

  function clearError(input) {
    const container = input.closest(".form-group") || input.parentElement;
    const errorContainer = container.querySelector(".error-message");
    if (errorContainer) {
      errorContainer.remove();
    }
    input.classList.remove("is-invalid");
  }

  return {
    validateRequired: function (input) {
      if (input.value.trim() === "") {
        showError(input, "This field is required.");
        return false;
      }
      clearError(input);
      return true;
    },
    validateEmail: function (input) {
      if (input.value.trim() === "") {
        showError(input, "Email is required.");
        return false;
      }
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(input.value.trim())) {
        showError(input, "Please enter a valid email address.");
        return false;
      }
      clearError(input);
      return true;
    },
    validatePhone: function (input, iti) {
      if (input.value.trim() === "") {
        showError(input, "Phone number is required.");
        return false;
      }
      if (!iti.isValidNumber()) {
        const errorCode = iti.getValidationError();
        let message = "Invalid phone number.";

        // Defensive check for intlTelInput validation constants
        const validationError =
          (window.intlTelInput &&
            window.intlTelInput.utils &&
            window.intlTelInput.utils.validationError) ||
          (window.intlTelInputUtils &&
            window.intlTelInputUtils.validationError);

        if (validationError) {
          if (errorCode === validationError.TOO_SHORT) {
            message = "Phone number is too short.";
          } else if (errorCode === validationError.TOO_LONG) {
            message = "Phone number is too long.";
          } else if (errorCode === validationError.INVALID_COUNTRY_CODE) {
            message = "Invalid country code.";
          }
        }
        showError(input, message);
        return false;
      }
      clearError(input);
      return true;
    },
    attachRealTimeValidation: function (input, validationFn) {
      input.addEventListener("blur", validationFn);
      input.addEventListener("input", function () {
        if (input.classList.contains("is-invalid")) {
          validationFn();
        }
      });
    },
    clearError: clearError,
    showError: showError,
  };
})();
