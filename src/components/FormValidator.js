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
    this._normalSubmitTextContent = this._submitButton.textContent;
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
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
    this._toggleButtonState();
  }
}
