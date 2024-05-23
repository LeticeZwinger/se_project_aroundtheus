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

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(
  inputElements,
  submitButton,
  { inactiveButtonClass },
) {
  if (hasInvalidInput(inputElements)) {
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
  const submitButton = formEl.querySelector(".modal__button");
  const profileOpener = document.querySelector("#profile-edit-button");
  const imagePostOpener = document.querySelector("#profile-add-button");
  inputElements.forEach((inputEl) => {
    console.log(inputEl);
    inputEl.addEventListener("input", (event) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
  profileOpener.addEventListener("click", (event) => {
    console.log("adding click listeners");
    toggleButtonState(inputElements, submitButton, options);
  });
  imagePostOpener.addEventListener("click", (event) => {
    console.log("adding click listeners");
    toggleButtonState(inputElements, submitButton, options);
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
