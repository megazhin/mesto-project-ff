import { initialCards } from './components/cards';
import './pages/index.css';
import { attachCard, deleteCard} from './components/card';
import { openModal, buttonEditProfile, buttonAddCard, formAddCard, formEditProfile, closeModalHandle, popupEditProfile, popupNewCard, popupImage, profileName, profileDescription, inputNameProfile, inputJobProfile} from './components/modal';

const placesList = document.querySelector('.places__list');

initialCards.forEach((elementValue) => attachCard(elementValue, deleteCard, like, openPopupImage, false));

buttonEditProfile.addEventListener('click', function(evt){
  openModal(popupEditProfile);
  closeModalHandle(popupEditProfile);
});
buttonAddCard.addEventListener('click', function(evt){
  openModal(popupNewCard);
  closeModalHandle(popupNewCard);
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
  closeModalHandle(popupImage);
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
  closeModalHandle(popupEditProfile);
  // if(inputJobProfile.value != "") {
    
  // }
  
}
function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  attachCard(null, deleteCard, like, openPopupImage,true);
  evt.target.reset();
  closeModalHandle(popupNewCard);
}

export {placesList, like};
