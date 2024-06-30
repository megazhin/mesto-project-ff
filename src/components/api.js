import { profileName, profileDescription, inputNameProfile, inputJobProfile, inputLinkCard, inputNameCard, popupNewCard, popupEditProfile, like, openPopupImage, inputLinkAvatar, popupEditAvatar } from "..";
import { attachCard, deleteCard } from "./card";
import { closeModal } from "./modal";

function initProfile(){
    return fetch('https://nomoreparties.co/v1/wff-cohort-17/users/me', {
      headers: {
        authorization: 'e184ef3f-b81c-46e4-b802-f92c44d2ab87'
      }
    })
      .then(res => res.json())
      .then((result) => {
        profileName.textContent = result.name;
        profileDescription.textContent = result.about;
        const avatar = document.querySelector('.profile__image');
        avatar.src = result.avatar;
      });
}

  function initCards(){
    return fetch('https://nomoreparties.co/v1/wff-cohort-17/cards', {
      headers: {
        authorization: 'e184ef3f-b81c-46e4-b802-f92c44d2ab87'
      }
    })
      .then(res => res.json())
      .then((result) => {
        result.forEach((elementValue) => attachCard(elementValue, deleteCard, like, openPopupImage, false));
        
      });
  }

  function editProfile() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-17/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'e184ef3f-b81c-46e4-b802-f92c44d2ab87',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputNameProfile.value,
        about: inputJobProfile.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        profileName.textContent = inputNameProfile.value;
        profileDescription.textContent = inputJobProfile.value;
        closeModal(popupEditProfile);
      });
  }

  function addCard() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-17/cards', {
      method: 'POST',
      headers: {
        authorization: 'e184ef3f-b81c-46e4-b802-f92c44d2ab87',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: inputLinkCard.value,
        name: inputNameCard.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        const cardData = {
          link: inputLinkCard.value,
          name: inputNameCard.value
        }
        attachCard(cardData, deleteCard, like, openPopupImage,true);
        closeModal(popupNewCard);
      });
  }

  function editAvatar() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-17/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'e184ef3f-b81c-46e4-b802-f92c44d2ab87',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: inputLinkAvatar.value
      })
    })
    .then(res => res.json())
    .then((result) => {
      const avatar = document.querySelector('.profile__image');
      avatar.src = inputLinkAvatar.value;
      closeModal(popupEditAvatar);
    })
  }

export {initProfile , initCards, editProfile, addCard, editAvatar}