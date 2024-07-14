import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._modalImage = this._modalElement.querySelector(".modal__preview");
  }
  open({ name, link }) {
    const imagePreview = this._modalImage.querySelector(
      ".modal__preview-image",
    );
    const caption = this._modalImage.querySelector(
      ".modal__preview-description",
    );

    imagePreview.src = link;
    imagePreview.alt = name;
    caption.textContent = name;

    super.open();
  }
}
