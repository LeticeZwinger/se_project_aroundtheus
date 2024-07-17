import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import ModalWithForm from "../components/ModalWithForm.js";
import ModalWithImage from "../components/ModalWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { config } from "../utils/constants.js";
import api from "../components/Api.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";
import Modal from "../components/Modal.js";

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

const userInfo = new UserInfo({
  nameSelector: "#profile-title",
  descriptionSelector: "#profile-description",
  avatarSelector: ".profile__image",
});

const deleteConfirmationModal = new ModalWithConfirmation({
  modalSelector: "#delete-confirmation-modal",
  handleFormSubmit: () => {},
});
deleteConfirmationModal.setEventListeners();

const profileEditModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    profileEditFormValidator.renderLoading(true);
    api
      .updateUserInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
        });
        profileEditModal.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profileEditFormValidator.renderLoading(false);
      });
  },
});

const addImageModal = new ModalWithForm({
  modalSelector: "#add-image-modal",
  handleFormSubmit: (formData) => {
    addFormValidator.renderLoading(true);
    api
      .addCard({
        name: formData.title,
        link: formData.link,
      })
      .then((cardData) => {
        cardSection.addItem(createCard(cardData));
        addImageModal.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        addFormValidator.renderLoading(false);
      });
  },
});

const profileImageModal = new ModalWithForm({
  modalSelector: "#profile-image-modal",
  handleFormSubmit: (formData) => {
    addFormValidator.renderLoading(true);
    api
      .updateProfileImage({
        profileImage: formData.link,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          avatar: userData.avatar,
        });
        profileImageModal.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        profileImageFormValidator.renderLoading(false);
      });
  },
});

const imagePreviewModal = new ModalWithImage("#image-preview-modal");

function handleCardClick(link, name) {
  imagePreviewModal.open({ name, link });
}

const modals = document.querySelectorAll(".modal");
modals.forEach((modalElement) => {
  const modalDelete = new Modal({ modalSelector: `#${modalElement.id}` });
  modalDelete.setEventListeners();
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleLikeButton,
  );
  return card.getView();
}

const cardSection = new Section(
  {
    items: api.getInitialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addImageForm);
const profileImageFormValidator = new FormValidator(config, profileImageForm);
const profileEditFormValidator = new FormValidator(config, profileEditForm);

profileImageFormValidator.enableValidation();

function handleDeleteClick(cardToDelete) {
  deleteConfirmationModal.open();

  deleteConfirmationModal.setSubmitHandler(() => {
    if (cardToDelete) {
      api
        .deleteCard(cardToDelete.id)
        .then(() => {
          cardToDelete.handleDeleteButton();
          cardToDelete = null;
          deleteConfirmationModal.close();
        })
        .catch((err) => console.error(err));
    }
  });
}

function handleLikeButton(card) {
  if (card._isLiked) {
    api
      .unlikeCard(card.id)
      .then((cardData) => {
        card._isLiked = false;
        card.updateLikes();
      })
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card.id)
      .then(() => {
        card._isLiked = true;
        card.updateLikes();
      })
      .catch((err) => console.error(err));
  }
}

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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    console.log("User Data:", userData);
    console.log("Initial Cards:", cards);

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error(err));
