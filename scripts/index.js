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
const editCloseButton = document.querySelector("#modal-close-button");
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal__closed");
  editCloseButton.classList.remove("modal__closed");
  profileEditModal.classList.add("modal__opened");
  editCloseButton.classList.add("modal__opened");
});

editCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal__opened");
  editCloseButton.classList.remove("modal__opened");
  profileEditModal.classList.add("modal__closed");
  editCloseButton.classList.add("modal__closed");
});
