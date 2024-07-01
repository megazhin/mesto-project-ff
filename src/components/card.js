import { placesList } from "..";
import { profile, deleteCard, like, unlike } from "./api";

function createWidget(element,  openPopupImage) {
  
    const newCardTemplate = getClonableCard();
   
    fillCard(newCardTemplate, element);
   
    const deleteButton = newCardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    if(profile._id != element.owner._id) {
      deleteButton.style.visibility = 'hidden';
    }

    const cardLikeButton = newCardTemplate.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', handleLike);

    newCardTemplate.querySelector('.card__image').addEventListener('click', openPopupImage);
    
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
    newCardTemplate.querySelector('.like__counter').textContent = element.likes.length;
    newCardTemplate.querySelector('.cardId').textContent = element._id;
    element.likes.forEach(like => {
      if(like._id == profile._id) {
        newCardTemplate.querySelector('.card__like-button').classList.add('card__like-button_is-active');
      }
    });
  }
  
  function handleLike(evt) {
    if(evt.target.classList.contains('card__like-button_is-active')){
      unlike(evt);
    } else {
      like(evt);
    }
  }

  function attachCard(elementValue, deleteCard, like, openPopupImage, isNewCard) {
    const newCard = createWidget(elementValue, openPopupImage);
    if (isNewCard) { 
      placesList.prepend(newCard); 
    }  else {  
      placesList.append(newCard); 
    }
  }

  export {attachCard, createWidget}