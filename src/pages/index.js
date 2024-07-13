import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { initialCards, config } from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewImageButton = document.querySelector("#profile-add-button");
const profileImageButton = document.querySelector("#profile-image-button");

const profileTitleInput = document.querySelector("#modal-input-title");
const profileDescriptionInput = document.querySelector(
  "#modal-input-description",
);

const addImageForm = document.forms["modal-image-form"];
const profileEditForm = document.forms["modal-profile-form"];
const profileImageForm = document.forms["profile-image-modal-form"];
const deleteConfirmationForm = document.forms["delete-confirmation-modal-form"];

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
});

const profileEditModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      description: formData.description,
    });
    profileEditModal.close();
  },
});

const addImageModal = new ModalWithForm({
  modalSelector: "#add-image-modal",
  handleFormSubmit: (formData) => {
    const cardData = { name: formData.title, link: formData.link };
    cardSection.addItem(createCard(cardData));
    addImageModal.close();
  },
});

const profileImageModal = new ModalWithForm({
  modalSelector: "#profile-image-modal",
  handleFormSubmit: (formData) => {
    handleProfileImageChange(formData.link);
    profileImageModal.close();
  },
});

const imagePreviewModal = new ModalWithImage("#image-preview-modal");

function handleCardClick(link, name) {
  imagePreviewModal.open({ name, link });
}

let cardToDelete = null;

function handleDeleteClick(card) {
  cardToDelete = card;
  openModal(document.querySelector("#delete-confirmation-modal"));
}

function handleProfileImageChange(link) {
  const profileImage = document.querySelector(".profile__image");
  profileImage.src = link;
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
  );
  return card.getView();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

cardSection.renderItems();

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addImageForm);
const profileImageFormValidator = new FormValidator(config, profileImageForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
profileImageFormValidator.enableValidation();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  profileEditModal.open();
  editFormValidator.resetValidation();
});

addNewImageButton.addEventListener("click", () => {
  addImageModal.open();
  addFormValidator.resetValidation();
});

profileImageButton.addEventListener("click", () => {
  profileImageModal.open();
  profileImageFormValidator.resetValidation();
});

profileEditModal.setEventListeners();
addImageModal.setEventListeners();
profileImageModal.setEventListeners();
imagePreviewModal.setEventListeners();

document
  .querySelector("#delete-confirmation-modal-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    if (cardToDelete) {
      cardToDelete._handleDeleteButton();
      cardToDelete = null;
    }
    closeModal(document.querySelector("#delete-confirmation-modal"));
  });

// Open modal helper function
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
}

// Close modal helper function
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
}

// Handle escape key close
function handleEscKey(event) {
  if (event.key === "Escape") {
    const openModals = document.querySelectorAll(".modal_opened");
    openModals.forEach((modal) => closeModal(modal));
  }
}

// Handle overlay and close button click
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
