import { initialCards } from './components/cards';
import './pages/index.css';
import { attachCard, deleteCard} from './components/card';
import { openModal, closeModal, buttonEditProfile, buttonAddCard, formAddCard, formEditProfile, handleFormAddCardSubmit, handleFormEditProfileSubmit} from './components/modal';


const buttonsClose = document.querySelectorAll('.popup__close');
const escButton = 'Escape'
const placesList = document.querySelector('.places__list');

initialCards.forEach((elementValue) => attachCard(elementValue, deleteCard));

buttonEditProfile.addEventListener('click', openModal);
buttonAddCard.addEventListener('click', openModal);
buttonsClose.forEach( item => item.addEventListener('click', function(evt){
  closeModal(evt.target.closest('.popup'))
}));
document.addEventListener('keydown', function(evt) {
  const activeModal = document.querySelector('.popup_is-opened');
  if(evt.key === escButton && activeModal !== null){
    closeModal(activeModal);
  }
})
document.addEventListener('click', function(evt) {
  const activeModal =  document.querySelector('.popup_is-opened');
  if(activeModal === evt.target){
    closeModal(activeModal);
  }
});

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);

export {placesList};
