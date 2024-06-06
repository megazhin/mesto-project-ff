const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonClose = document.querySelectorAll('.popup__close');


buttonEditProfile.addEventListener('click', openModal);
buttonAddCard.addEventListener('click', openModal);
buttonClose.forEach( item => item.addEventListener('click', closeModal));
document.addEventListener('keydown', function(evt) {
  if(evt.key === 'Escape'){
    closeModal();
  }
})
document.addEventListener('click', function(evt) {
  if(evt.target === popupEditProfile || evt.target === popupNewCard) {
    closeModal();
  } 
});

function closeModal() {
  popupEditProfile.classList.remove('popup_is-opened');
  popupNewCard.classList.remove('popup_is-opened');
}

function openModal(evt) {
  const target = evt.target;
  if(target === buttonEditProfile){
    popupEditProfile.classList.add('popup_is-opened');
  } else if (target === buttonAddCard){
    popupNewCard.classList.add('popup_is-opened');
  }
}

export {openModal, closeModal}