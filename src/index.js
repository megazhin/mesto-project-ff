import './pages/index.css';
import { closeModal, openModal} from './components/modal';
import { enableValidation } from './components/validation';
import { initProfile, initCards, editProfile, addCard, editAvatar} from './components/api';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditAvatar = document.querySelector('.profile__image');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_update_avatar');
const formEditProfile = document.forms.editProfile;
const inputNameProfile = formEditProfile.elements.name;
const inputJobProfile = formEditProfile.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formAddCard = document.forms.newPlace;
const inputNameCard = formAddCard.elements.placeName; 
const inputLinkCard = formAddCard.elements.link;
const formEditAvatar = document.forms.editAvatar;
const inputLinkAvatar = formEditAvatar.elements.avatarLink;
const placesList = document.querySelector('.places__list');
const validatonModalConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  inputErrorTextColor: 'popup__input-error'
}


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
buttonEditAvatar.addEventListener('click', function(evt){
  openModal(popupEditAvatar);
})

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);
formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);

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
  editProfile();
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  addCard();
  evt.target.reset();
}

function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  editAvatar();
}

enableValidation(validatonModalConfig);

initProfile();

initCards();

export {placesList, like, formAddCard,validatonModalConfig, profileName, profileDescription, inputNameProfile,inputJobProfile,inputLinkCard,inputNameCard,popupNewCard,popupEditProfile, inputLinkAvatar, popupEditAvatar,  openPopupImage};
