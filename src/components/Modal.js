// Modal.js
export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeModalOnClick = this._closeModalOnClick.bind(this);
  }

  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _closeModalOnClick(event) {
    if (
      event.target.classList.contains("modal_opened") ||
      event.target.classList.contains("modal__close-button")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._modalElement.addEventListener("mousedown", this._closeModalOnClick);
  }
}
