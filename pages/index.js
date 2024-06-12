import Card from "../components/cards.js";
import FormValidator from "../components/formValidator.js";

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
const addImageForm = document.querySelector("#add-image-modal .modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
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

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  cardListEl.prepend(card.getView());
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
});

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

addNewImageButton.addEventListener("click", () => openModal(addImageModal));

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

document.querySelectorAll(".modal__close-button").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

document.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
});