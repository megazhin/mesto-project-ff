import { placesList } from "..";

function createWidget(element, deleteCard) {
  
    const newCardTemplate = getClonableCard();
    
    fillCard(newCardTemplate, element);
    
    const deleteButton = newCardTemplate.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
  
    const cardLikeButton = newCardTemplate.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', like);

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
  
  function deleteCard(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
  }
  
  function attachCard(elementValue, deleteCard) {
    placesList.append(createWidget(elementValue, deleteCard));
  }

  function like(evt) {
    const liked = evt.target.closest('.card__like-button');
    liked.classList.toggle('card__like-button_is-active');
  }

  export {attachCard, deleteCard}