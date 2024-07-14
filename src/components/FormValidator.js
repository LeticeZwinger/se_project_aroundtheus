export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
  }

  _showInputError(inputEl) {
    const errorMsgElement = this._form.querySelector(`#${inputEl.id}-error`);
    if (errorMsgElement) {
      inputEl.classList.add(this._inputErrorClass);
      errorMsgElement.textContent = inputEl.validationMessage;
      errorMsgElement.classList.add(this._errorClass);
    } else {
      console.error(`Error message element not found for input: ${inputEl.id}`);
    }
  }

  _hideInputError(inputEl) {
    const errorMsgElement = this._form.querySelector(`#${inputEl.id}-error`);
    if (errorMsgElement) {
      inputEl.classList.remove(this._inputErrorClass);
      errorMsgElement.textContent = "";
      errorMsgElement.classList.remove(this._errorClass);
    } else {
      console.error(`Error message element not found for input: ${inputEl.id}`);
    }
  }

  _checkInputValidity(inputEl) {
    const trimmedValue = inputEl.value.trim();
    if (!inputEl.validity.valid || trimmedValue === "") {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(
      (inputEl) => !inputEl.validity.valid || inputEl.value.trim() === "",
    );
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        inputEl.value = inputEl.value.trim();
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      inputEl.value = inputEl.value.trim(); // Trim value on reset
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
}
