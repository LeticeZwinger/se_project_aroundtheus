// Prettier adds a bunch of space characters aroud the word "explorer", if the space characters are not deleted, the "save" button still show as valid, even if there is no letter (since space is valid input, but gives an impression that the form input is empty). The way around it that I found was to add the index.html to prettierignore, but it is much harder to get things done. Any suggestion on how to fix it?

import Card from "../components/Card.js";
import FormValidator from "../components/formValidator.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewImageButton = document.querySelector("#profile-add-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addImageModal = document.querySelector("#add-image-modal");
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-input-title");
const profileDescriptionInput = document.querySelector(
  "#modal-input-description",
);
const imageTitleInput = document.querySelector("#modal-image-title");
const imageLinkInput = document.querySelector("#modal-image-link");
const cardListEl = document.querySelector(".cards__list");
const addImageForm = document.forms["modal-image-form"];
const profileEditForm = document.forms["modal-profile-form"];
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewDescription = previewImageModal.querySelector(
  ".modal__preview-description",
);

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

function handleEscKey(event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.modal_opened").forEach(closeModal);
  }
}

function handleCardClick(link, name) {
  previewImage.src = link;
  previewImage.alt = name;
  previewDescription.textContent = name;
  openModal(previewImageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

addImageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newCardData = {
    name: imageTitleInput.value,
    link: imageLinkInput.value,
  };
  renderCard(newCardData);
  closeModal(addImageModal);
  event.target.reset();
  addFormValidator.disableButton();
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent.trim();
  profileDescriptionInput.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
  editFormValidator.resetValidation();
});

addNewImageButton.addEventListener("click", () => {
  openModal(addImageModal);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
});

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addImageForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("modal_opened") ||
      evt.target.classList.contains("modal__close-button")
    ) {
      closeModal(modal);
    }
  });
});
