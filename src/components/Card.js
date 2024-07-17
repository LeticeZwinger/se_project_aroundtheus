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
    this.id = cardData._id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeButton = handleLikeButton;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton(this);
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  updateLikes(likes) {
    // this._cardElement.querySelector(".card__like-count").textContent = likes;
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button-active");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  handleDeleteButton() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__title").textContent = this._name;
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;

    // this._cardElement.querySelector(".card__like-count").textContent =
    //   this._likes.length; /undifined

    if (this._isLiked) {
      this._cardElement
        .querySelector(".card__like-button")
        .classList.add("card__like-button-active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}

// toggle card likes not functioning properly, toggling when page refreshes - FIXED
// create span for like count? didnt work - NOT NEEDED
// how to style it in order to chage number when like is triggered? - NOT NEEDED
// does the original USA cards should be on the final project? - NOPE, ACCORDING TO KEVIN
// added card goes to the end of the list when page refresh, is it okay? change prepend to apend - DONE
// fix trim so the user can add space - DONE
