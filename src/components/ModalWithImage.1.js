import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  open({ name, link }) {
    const image = this._modalElement.querySelector("#image-preview-modal");
    const caption = this._modalElement.querySelector(
      ".modal__preview-description",
    );

    image.src = link;
    image.alt = name;
    caption.textContent = name;

    super.open();
  }
}
