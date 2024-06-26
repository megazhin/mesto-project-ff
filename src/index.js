import { initialCards } from './components/cards';
import './pages/index.css';
import { attachCard, deleteCard} from './components/card';
import { openModal , closeModal} from './components/modal';
import { enableValidation } from './components/validation';

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
const inputNameCard = formAddCard.elements.placeName; 
const inputLinkCard = formAddCard.elements.link;
const placesList = document.querySelector('.places__list');

initialCards.forEach((elementValue) => attachCard(elementValue, deleteCard, like, openPopupImage, false));

function inputValues() {
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileDescription.textContent;
}

buttonEditProfile.addEventListener('click', function(evt){
  openModal(popupEditProfile);
  inputValues();
});
buttonAddCard.addEventListener('click', function(evt){
  openModal(popupNewCard);
});

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

function like(evt) {
  const liked = evt.target.closest('.card__like-button');
  liked.classList.toggle('card__like-button_is-active');
}

function openPopupImage(evt) {
  fillNewImage(evt);
  openModal(popupImage);
}

function fillNewImage(evt) {
  const target = evt.target;
  const image = document.querySelector('.popup__image');
  const imageName =  document.querySelector('.popup__caption');
  imageName.textContent = target.closest('.places__item').querySelector('.card__title').textContent;
  image.src = target.src;
  image.alt = target.alt;
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputNameProfile.value;
  profileDescription.textContent = inputJobProfile.value;
  closeModal(popupEditProfile);
}

function handleFormAddCardSubmit(evt) {
  const cardData = {
    link: inputLinkCard.value,
    name: inputNameCard.value
  }
  evt.preventDefault();
  attachCard(cardData, deleteCard, like, openPopupImage,true);
  evt.target.reset();
  closeModal(popupNewCard);
}

enableValidation();

export {placesList, like, formAddCard};
