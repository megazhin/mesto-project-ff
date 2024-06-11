import { getClonableCard, deleteCard, like } from "./card";
import { placesList } from "..";

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const formEditProfile = document.forms.editProfile;
const inputNameProfile = formEditProfile.elements.name;
const inputJobProfile = formEditProfile.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formAddCard = document.forms.newPlace;

function setInputForm() {
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileDescription.textContent;
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameProfile.value;
  profileDescription.textContent = inputJobProfile.value;
  closeModal(evt.target.closest('.popup'));
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  attachCard(deleteCard);
  closeModal(evt.target.closest('.popup'));
  evt.target.reset();
}

function attachCard(deleteCard) {
  placesList.prepend(createWidget(deleteCard, like))
}

function createWidget(deleteCard, like) {

  const cardTemplate = getClonableCard();

  fillCard(cardTemplate);

  const deleteButton = cardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const cardLikeButton = cardTemplate.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', like);

  cardTemplate.querySelector('.card__image').addEventListener('click', function(evt) {
    const target = evt.target;
    const image = document.querySelector('.popup__image');
    image.src = target.src;
    image.alt = target.alt;
    openImage();
})
  return cardTemplate;
}

function fillCard(cardTemplate) {
  const inputName = formAddCard.elements.placeName;
  const inputLink = formAddCard.elements.link;
  cardTemplate.querySelector('.card__image').src = inputLink.value;
  cardTemplate.querySelector('.card__title').textContent = inputName.value;
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function openModal(evt) {
  const target = evt.target;
  
  if(target === buttonEditProfile){
    popupEditProfile.classList.add('popup_is-opened', 'popup_is-animated');
    setInputForm();
  } else if (target === buttonAddCard){
    popupNewCard.classList.add('popup_is-opened', 'popup_is-animated');
  }
  
}

function openImage() {
  popupImage.classList.add('popup_is-opened', 'popup_is-animated');
}

export {openModal, closeModal, openImage, buttonEditProfile, buttonAddCard, formAddCard, formEditProfile, handleFormAddCardSubmit, handleFormEditProfileSubmit}