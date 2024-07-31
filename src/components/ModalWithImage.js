import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalImage = this._modalElement.querySelector(".modal__preview");
    this._imagePreview = this._modalImage.querySelector(
      ".modal__preview-image",
    );
    this._caption = this._modalImage.querySelector(
      ".modal__preview-description",
    );
  }

  open({ name, link }) {
    this._imagePreview.src = link;
    this._imagePreview.alt = name;
    this._caption.textContent = name;

    super.open();
  }
}
