initialCards.forEach((elementValue) => createWidget(elementValue, deleteCard));

function createWidget(element, deleteCard) {
  
  const newCardTemplate = getClonableCard();
  
  fillCard(newCardTemplate, element);
  
  const deleteButton = newCardTemplate.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  attachCard(newCardTemplate);
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

function attachCard(newCardTemplate) {
  const placesList = document.querySelector('.places__list');
  placesList.append(newCardTemplate);
}


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
