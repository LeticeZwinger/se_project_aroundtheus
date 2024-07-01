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

const profileTitleInput = document.querySelector("#modal-input-title");
const profileDescriptionInput = document.querySelector(
  "#modal-input-description",
);

const addImageForm = document.forms["modal-image-form"];
const profileEditForm = document.forms["modal-profile-form"];

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
});

const profileEditModal = new ModalWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      description: formData.description,
    });
    profileEditModal.close();
  },
);

const addImageModal = new ModalWithForm("#add-image-modal", (formData) => {
  const cardData = { name: formData.title, link: formData.link };
  cardSection.addItem(createCard(cardData));
  addImageModal.close();
});

const imagePreviewModal = new ModalWithImage("#image-preview-modal");

function handleCardClick(link, name) {
  imagePreviewModal.open({ name, link });
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
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

editFormValidator.enableValidation();
addFormValidator.enableValidation();

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

profileEditModal.setEventListeners();
addImageModal.setEventListeners();
imagePreviewModal.setEventListeners();
