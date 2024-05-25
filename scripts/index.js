const placesList = document.querySelector('.places__list');

initialCards.forEach((elementValue) => attachCard(elementValue, deleteCard));

function createWidget(element, deleteCard) {
  
  const newCardTemplate = getClonableCard();
  
  fillCard(newCardTemplate, element);
  
  const deleteButton = newCardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

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

function deleteCard(event) {
  const cardToDelete = event.target.closest('.card');
  cardToDelete.remove();
}

function attachCard(elementValue, deleteCard) {
  placesList.append(createWidget(elementValue, deleteCard));
}
