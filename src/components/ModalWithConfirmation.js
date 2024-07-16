import Modal from "./Modal";

class ModalWithConfirmation extends Modal {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }
}

export default ModalWithConfirmation;
