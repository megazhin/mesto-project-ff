import { placesList } from "..";
import { formAddCard } from "..";

function createWidget(element, deleteCard, like, openPopupImage) {
  
    const newCardTemplate = getClonableCard();
    fillCard(newCardTemplate, element);
    
    const deleteButton = newCardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
  
    const cardLikeButton = newCardTemplate.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', like);

    newCardTemplate.querySelector('.card__image').addEventListener('click', openPopupImage)

    return newCardTemplate;
  }

  function getClonableCard() {
    const cardTemplate = document.querySelector('#card-template');
    const cardTemplateContent = cardTemplate.content;
    return cardTemplateContent.querySelector('.places__item').cloneNode(true);
  }
  
  function fillCard(newCardTemplate, element) {
    newCardTemplate.querySelector('.card__image').src = element.link;
    newCardTemplate.querySelector('.card__title').textContent = element.name;
    newCardTemplate.querySelector('.card__image').alt = element.alt;
  }
  
  function deleteCard(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
  
  function attachCard(elementValue, deleteCard, like, openPopupImage, isNewCard) {
    const newCard = createWidget(elementValue, deleteCard, like, openPopupImage);
    if (isNewCard) { 
      placesList.prepend(newCard); 
    }  else {  
      placesList.append(newCard); 
    }
  
  }

  

  
  export {attachCard, deleteCard, createWidget}