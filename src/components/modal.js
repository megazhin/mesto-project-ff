import { clearValidation } from "./validation";
import { validatonModalConfig } from "..";


const escButton = 'Escape' 
let activeModal;

function closeByEsc(evt) { 
    if(evt.key === escButton){ 
      closeModal(); 
    } 
  }

 function closeByClickOverlay(evt) { 
    if(activeModal === evt.target || evt.target.classList.contains('popup__close')){ 
      closeModal(); 
    } 
  } 

function openModal(modalForOpen) { 
  activeModal = modalForOpen;
  modalForOpen.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('click', closeByClickOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closeModal() { 
  activeModal.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', closeByEsc); 
  document.removeEventListener('click', closeByClickOverlay);
  clearValidation(activeModal,validatonModalConfig);
  clearInputValuesIfExist();
  activeModal = null;
} 

function clearInputValuesIfExist() {
  let inputs = Array.from(activeModal.querySelectorAll(validatonModalConfig.inputSelector));
  inputs.forEach(inputElement => {
    inputElement.value = "";
  });
}

export {openModal, closeModal}


