import { escButton } from "..";

function openModal(modalForOpen) {
  modalForOpen.classList.add('popup_is-opened', 'popup_is-animated');
}

function modalHandle(activeModal,isNeedClose) {
  if (isNeedClose) {
    closeModalExec();
  } else {
    document.addEventListener('click', closeByClickOverlay);
    document.addEventListener('keydown', closeByEsc);
    activeModal.querySelector('.popup__close').addEventListener('click', function(evt){
      closeModalExec(activeModal,true);
    });
  }
  
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

export {openModal, modalHandle}