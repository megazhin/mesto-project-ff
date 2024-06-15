
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
const escButton = 'Escape'

function inputValues() {
  inputNameProfile.value = profileName.textContent;
  inputJobProfile.value = profileDescription.textContent;
}

function openModal(modalForOpen) {
  modalForOpen.classList.add('popup_is-opened', 'popup_is-animated');
  inputValues();
}

function closeModalHandle(activeModal) {
  // add events 
    document.addEventListener('click', closeByClickOverlay);
    document.addEventListener('keydown', closeByEsc);
    activeModal.querySelector('.popup__close').addEventListener('click', function(evt){
      closeModalExec(activeModal,true);
    });
    // if (activeModal != popupImage) {
    //   activeModal.querySelector('.popup__button').addEventListener('click', function(evt) {
    //     closeModalExec(activeModal,true);
    //   });
    // }

  function closeByEsc(evt) {
    if(evt.key === escButton){
      closeModalExec();
    }
  }

  function closeByClickOverlay(evt) {
    if(activeModal === evt.target){
      closeModalExec();
    }
  }

  function closeModalExec() {
    activeModal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    document.removeEventListener('click', closeByClickOverlay);
  }

}

export {openModal, buttonEditProfile, buttonAddCard, formAddCard, formEditProfile, closeModalHandle,popupEditProfile, popupNewCard, popupImage, profileName, profileDescription, inputNameProfile, inputJobProfile}