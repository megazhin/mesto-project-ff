import { profileName, profileDescription, inputNameProfile, inputJobProfile, inputLinkCard, inputNameCard, popupNewCard, popupEditProfile, openPopupImage, inputLinkAvatar, popupEditAvatar } from "..";
import { attachCard } from "./card";
import { closeModal } from "./modal";

let profile;
const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-17';
const authToken = 'e184ef3f-b81c-46e4-b802-f92c44d2ab87';

function initProfile(){
    return fetch(`${baseUrl}/users/me`, {
      headers: {
        authorization: authToken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        profileName.textContent = result.name;
        profileDescription.textContent = result.about;
        const avatar = document.querySelector('.profile__image');
        avatar.src = result.avatar;
        profile = result;
        initCards();
      })
      .catch((err) => {
        console.log(err);
      })
}

  function initCards(){
    return fetch(`${baseUrl}/cards`, {
      headers: {
        authorization: authToken
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        result.forEach((elementValue) => attachCard(elementValue, deleteCard, like, openPopupImage, false));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function editProfile() {
    return fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputNameProfile.value,
        about: inputJobProfile.value
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
      .then((result) => {
        profileName.textContent = inputNameProfile.value;
        profileDescription.textContent = inputJobProfile.value;
        closeModal(popupEditProfile);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function addCard() {
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: inputLinkCard.value,
        name: inputNameCard.value
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        const cardData = {
          link: result.link,
          name: result.name,
          _id: result._id,
          likes: [],
          owner: {
            _id : profile._id
          }
        }
        attachCard(cardData, deleteCard, like, openPopupImage,true);
        closeModal(popupNewCard);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function editAvatar() {
    return fetch(`${baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: inputLinkAvatar.value
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      const avatar = document.querySelector('.profile__image');
      avatar.src = inputLinkAvatar.value;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function deleteCard(evt) {
    const cardId = evt.target.parentElement.querySelector('.cardId').textContent;
    return fetch(`${baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: authToken
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      const cardToDelete = evt.target.closest('.card');
      cardToDelete.remove();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function like(evt) {
    const cardLikeButton = evt.target;
    const cardId = cardLikeButton.closest('.places__item').querySelector('.cardId').textContent;
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: authToken
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      cardLikeButton.parentElement.querySelector('.like__counter').textContent = result.likes.length;

      cardLikeButton.classList.add('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function unlike(evt) {
    const cardLikeButton = evt.target;
    const cardId = cardLikeButton.closest('.places__item').querySelector('.cardId').textContent;
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: authToken
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      cardLikeButton.parentElement.querySelector('.like__counter').textContent = result.likes.length;
      cardLikeButton.classList.remove('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    })
  }


export {initProfile , initCards, editProfile, addCard, editAvatar, profile, deleteCard, like, unlike}