export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeButton,
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeButton = handleLikeButton;
    this.id = cardData._id;
    this.isLiked = cardData.isLiked;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button-active");
    } else {
      this._likeButton.classList.remove("card__like-button-active");
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(".card__delete-button");
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.updateLikes();

    this._setEventListeners();
    return this._cardElement;
  }
}
