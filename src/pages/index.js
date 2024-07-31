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

function handleSubmit(request, modalInstance, loadingText = "Saving...") {
  modalInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      modalInstance.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      modalInstance.renderLoading(false);
    });
}

const deleteConfirmationModal = new ModalWithConfirmation({
  modalSelector: "#delete-confirmation-modal",
  handleFormSubmit: () => {},
});
deleteConfirmationModal.setEventListeners();

const profileEditModal = new ModalWithForm({
  modalSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    handleSubmit(() => {
      return api
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
        });
    }, profileEditModal);
  },
});

const addImageModal = new ModalWithForm({
  modalSelector: "#add-image-modal",
  handleFormSubmit: (formData) => {
    handleSubmit(() => {
      return api
        .addCard({
          name: formData.title,
          link: formData.link,
        })
        .then((cardData) => {
          cardSection.addItem(createCard(cardData));
        });
    }, addImageModal);
  },
});

const profileImageModal = new ModalWithForm({
  modalSelector: "#profile-image-modal",
  handleFormSubmit: (formData) => {
    handleSubmit(() => {
      return api
        .updateProfileImage({
          profileImage: formData.link,
        })
        .then((userData) => {
          userInfo.setUserInfo({
            avatar: userData.avatar,
          });
        });
    }, profileImageModal);
  },
});

const imagePreviewModal = new ModalWithImage("#image-preview-modal");
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addImageForm);
const profileImageFormValidator = new FormValidator(config, profileImageForm);

function handleCardClick(link, name) {
  imagePreviewModal.open({ name, link });
}

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

profileImageFormValidator.enableValidation();

function handleDeleteClick(cardToDelete) {
  console.log("is this working?", cardToDelete);
  deleteConfirmationModal.open();

  deleteConfirmationModal.setSubmitHandler(() => {
    console.log("whatabout this?");
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
  if (card.isLiked) {
    api
      .unlikeCard(card.id)
      .then(() => {
        card.isLiked = false;
        card.updateLikes();
      })
      .catch((err) => console.error(err));
  } else {
    api
      .likeCard(card.id)
      .then(() => {
        card.isLiked = true;
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
  profileEditModal.setInputValues({
    title: userData.name,
    description: userData.description,
    avatar: userData.avatar,
  });
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

// profile name keep changing to undefined fixed
// delete modal not deleting AGAAAIIN ò.ó
// like button not liking :(
