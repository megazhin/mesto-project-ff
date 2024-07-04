import { checkResponse } from "./utils";

const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-17';
const authToken = 'e184ef3f-b81c-46e4-b802-f92c44d2ab87';
let cardLikeButton;
let cardId;

function initProfile(){
    return fetch(`${baseUrl}/users/me`, {
      headers: {
        authorization: authToken
      }
    })
      .then(checkResponse)
}

  function initCards(){
    return fetch(`${baseUrl}/cards`, {
      headers: {
        authorization: authToken
      }
    })
      .then(checkResponse)
  }

  function editProfile(name, job) {
    return fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    })
    .then(checkResponse)
  }

  function addCard(link, name) {
    return fetch(`${baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: link,
        name: name
      })
    })
      .then(checkResponse)
  }

  function editAvatar(avatar) {
    return fetch(`${baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(checkResponse)
  }

  function handleDeleteCard(evt) {
    const cardId = evt.target.parentElement.querySelector('.cardId').textContent;
    return fetch(`${baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: authToken
      },
    })
    .then(checkResponse)
  }

  function like(evt) {
    cardLikeButton = evt.target;
    cardId = cardLikeButton.closest('.places__item').querySelector('.cardId').textContent;
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: authToken
      },
    })
    .then(checkResponse)
  }

  function unlike(evt) {
    cardLikeButton = evt.target;
    cardId = cardLikeButton.closest('.places__item').querySelector('.cardId').textContent;
    return fetch(`${baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: authToken
      },
    })
    .then(checkResponse)
  }


export {initProfile , initCards, editProfile, addCard, editAvatar, handleDeleteCard, like, unlike, cardLikeButton}