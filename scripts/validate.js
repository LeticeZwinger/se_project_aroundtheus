function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMsgElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMsgElement.textContent = inputEl.validationMessage;
  errorMsgElement.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMsgElement = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMsgElement.textContent = " ";
  errorMsgElement.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputEl) {
  return !inputEl.validity.valid;
}

function toggleButtonState(
  formEl,
  { inactiveButtonClass, submitButtonSelector },
) {
  const submitButton = formEl.querySelector(submitButtonSelector);
  const isInvalid = [...formEl.querySelectorAll("input")].some(
    (inputEl) => !inputEl.validity.valid,
  );
  if (isInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputElements = [...formEl.querySelectorAll(inputSelector)];

  inputElements.forEach((inputEl) => {
    inputEl.addEventListener("input", (event) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(formEl, options);
    });
  });
}

function enableValidation(options) {
  const formElements = [...document.querySelectorAll(options.formSelector)];
  formElements.forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
