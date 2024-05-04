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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addImageModal = document.querySelector("#add-image-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button",
);
const addImageCloseButton = addImageModal.querySelector(
  "#add-image-close-button",
);
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileTitleInput = document.querySelector("#modal-input-title");
const profileDescriptionInput = document.querySelector(
  "#modal-input-description",
);
const imageTitleInput = document.querySelector("#modal-image-title");
const imageLinkInput = document.querySelector("#modal-image-link");
const addNewImageButton = document.querySelector("#profile-add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const addImageForm = document.querySelector("#add-image-modal .modal__form");
const previewImageModal = document.querySelector("#image-preview-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewDescription = previewImageModal.querySelector(
  ".modal__preview-description",
);
const closePreviewImageButton = document.querySelector(
  "#image-preview-close-button",
);

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function updateProfileFromInputs() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewDescription.textContent = cardData.name;
    openModal(previewImageModal);
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}
closePreviewImageButton.addEventListener("click", () =>
  closeModal(previewImageModal),
);

function renderCard(cardData, container) {
  const cardElement = getCardElement(cardData);
  container.prepend(cardElement);
}
addImageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = document.querySelector("#modal-image-title").value;
  const link = document.querySelector("#modal-image-link").value;
  const newCardData = { name: title, link: link };
  renderCard(newCardData, cardListEl);
  closeModal(addImageModal);
});

profileEditButton.addEventListener("click", () => openModal(profileEditModal));
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal),
);
addNewImageButton.addEventListener("click", () => openModal(addImageModal));
addImageCloseButton.addEventListener("click", () => closeModal(addImageModal));

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateProfileFromInputs();
  closeModal(profileEditModal);
});

initialCards.forEach((cardData) => {
  renderCard(cardData, cardListEl);
});

// =======================
// add click listener event to cardImageEl
// openModal with previewImageModal
// =======================
