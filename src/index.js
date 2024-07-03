import './pages/index.css';
import { closeModal, openModal, activeModal} from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { initProfile, initCards, editProfile, addCard, editAvatar, like} from './components/api';
import { createWidget, handleDeleteCard } from './components/card';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const buttonEditAvatar = document.querySelector('.edit__avatar')
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
const image = document.querySelector('.popup__image');
const imageName =  document.querySelector('.popup__caption');
let profile;
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
  clearValidation(activeModal,validatonModalConfig);
});
buttonAddCard.addEventListener('click', function(evt){
  openModal(popupNewCard);
  clearInputValuesIfExist();
  clearValidation(activeModal,validatonModalConfig);
});
profileImage.addEventListener('click', function(evt){
  openModal(popupEditAvatar);
  clearInputValuesIfExist();
  clearValidation(activeModal,validatonModalConfig);
})
buttonEditAvatar.addEventListener('click', function(evt){
  openModal(popupEditAvatar);
  clearInputValuesIfExist();
  clearValidation(activeModal,validatonModalConfig);
})

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);
formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);

function openPopupImage(evt) {
  fillNewImage(evt);
  openModal(popupImage);
}

function fillNewImage(evt) {
  const target = evt.target;
  imageName.textContent = target.closest('.places__item').querySelector('.card__title').textContent;
  image.src = target.src;
  image.alt = target.alt;
}

function attachCard(elementValue, handleDeleteCard, like, openPopupImage, isNewCard) {
  const newCard = createWidget(elementValue, openPopupImage);
  if (isNewCard) { 
    placesList.prepend(newCard); 
  }  else {  
    placesList.append(newCard); 
  }
}


function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  setButtonText(activeModal,false);
  editProfile()
  .then((result) => {
    profileName.textContent = inputNameProfile.value;
    profileDescription.textContent = inputJobProfile.value;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setButtonText(activeModal,true);
    closeModal(popupEditProfile);
  })
}

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  setButtonText(activeModal,false);
  addCard()
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
    attachCard(cardData, handleDeleteCard, like, openPopupImage,true);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setButtonText(activeModal,true);
    closeModal(popupNewCard);
  })
  evt.target.reset();
}

function clearInputValuesIfExist() {
  const inputs = Array.from(activeModal.querySelectorAll(validatonModalConfig.inputSelector));
  inputs.forEach(inputElement => {
    inputElement.value = "";
  });
}

function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  setButtonText(activeModal,false);
  editAvatar()
  .then((result) => {
    const avatar = document.querySelector('.profile__image');
    avatar.src = inputLinkAvatar.value;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    setButtonText(activeModal,true);
    closeModal(popupEditAvatar);
  })
}

enableValidation(validatonModalConfig);

function setButtonText(activeModal,isOpen) {
  const buttonSave = activeModal.querySelector('.popup__button');
  if (buttonSave != null) {
    if (isOpen) {
      buttonSave.textContent = 'Сохранить';
    } else {
      buttonSave.addEventListener('click', function () {
        buttonSave.textContent = 'Сохранение...';
      });
    }
  }
}

initProfile()
.then((result) => {
  profileName.textContent = result.name;
  profileDescription.textContent = result.about;
  const avatar = document.querySelector('.profile__image');
  avatar.src = result.avatar;
  profile = result;
  initCards()
  .then((result) => {
    result.forEach((elementValue) => attachCard(elementValue, handleDeleteCard, like, openPopupImage, false));
  })
  .catch((err) => {
    console.log(err);
  })
})
.catch((err) => {
  console.log(err);
});


export {placesList, formAddCard,validatonModalConfig, profileName, profileDescription, inputNameProfile,inputJobProfile,inputLinkCard,inputNameCard,popupNewCard,popupEditProfile, inputLinkAvatar, popupEditAvatar,  openPopupImage, profile, clearInputValuesIfExist, setButtonText};
