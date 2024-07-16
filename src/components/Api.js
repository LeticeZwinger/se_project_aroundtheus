class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._checkResponse = this._checkResponse.bind(this);
    this._catchError = this._catchError.bind(this);
    this.getInitialCards = this.getInitialCards.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.updateProfileImage = this.updateProfileImage.bind(this);
    this.addCard = this.addCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.likeCard = this.likeCard.bind(this);
    this.dislikeCard = this.dislikeCard.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res);
    return Promise.reject(`Error: ${res.status}`);
  }

  _catchError(err) {
    console.error(err);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        console.log("Fetched User Info:", data);
        return data;
      })
      .catch(this._catchError);
  }

  updateUserInfo(data) {
    console.log("Updated user info:", data);
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  updateProfileImage(data) {
    console.log("Updated profile image: ", data);
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.profileImage,
      }),
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  addCard(data) {
    console.log("Added card: ", data);
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  deleteCard(cardId) {
    console.log("Deleted card: ", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  likeCard(cardId) {
    console.log("Liked card: ", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }

  dislikeCard(cardId) {
    console.log("Disliked card: ", cardId);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._catchError);
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9a90ec5a-14f2-498a-9ea3-2f40d91524b3",
    "Content-Type": "application/json",
  },
});

export default api;
