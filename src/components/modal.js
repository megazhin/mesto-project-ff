
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonClose = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup_type_image');
const escButton = 'Escape'

buttonEditProfile.addEventListener('click', openModal);
buttonAddCard.addEventListener('click', openModal);
buttonClose.forEach( item => item.addEventListener('click', function(evt){
  closeModal(evt.target.closest('.popup'))
}));
document.addEventListener('keydown', function(evt) {
  if(evt.key === escButton){
    const activeModal =  document.querySelector('.popup_is-opened');
    closeModal(activeModal);
  }
})
document.addEventListener('click', function(evt) {
  const activeModal =  document.querySelector('.popup_is-opened');
  if(activeModal === evt.target){
    closeModal(activeModal);
  }
});

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

function openModal(evt) {
  const target = evt.target;
  if(target === buttonEditProfile){
    popupEditProfile.classList.add('popup_is-opened');
  } else if (target === buttonAddCard){
    popupNewCard.classList.add('popup_is-opened');
  }
}

function openImage() {
  popupImage.classList.add('popup_is-opened');
}

export {openModal, closeModal, openImage}