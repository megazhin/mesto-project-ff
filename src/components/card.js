import { placesList } from "..";
import { formAddCard } from "..";

function createWidget(element, deleteCard, like, openPopupImage, isNewCard) {
  
    const newCardTemplate = getClonableCard();
    isNewCard ? fillNewCard(newCardTemplate, element) : fillCard(newCardTemplate, element);
    
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
    newCardTemplate.querySelector('.card__image').alt = element.alt;
    newCardTemplate.querySelector('.card__title').textContent = element.name;
  }
  
  function fillNewCard(cardTemplate) {
    const inputName = formAddCard.elements.placeName;
    const inputLink = formAddCard.elements.link;
    cardTemplate.querySelector('.card__image').src = inputLink.value;
    cardTemplate.querySelector('.card__title').textContent = inputName.value;
  }

  function deleteCard(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
  
  function attachCard(elementValue, deleteCard, like, openPopupImage, isNewCard) {
    if (isNewCard) {
      placesList.prepend(createWidget(elementValue, deleteCard, like, openPopupImage, isNewCard));
    }  else { 
      placesList.append(createWidget(elementValue, deleteCard, like, openPopupImage, isNewCard));
    }
  
  }

  

  
  export {attachCard, deleteCard, createWidget}