initialCards.forEach((elementValue) => handleCard(elementValue));

function handleCard(element) {
  
  const newCardTemplate = getClonableCard();
  
  fillCard(newCardTemplate, element);
  handleDeleteButton(newCardTemplate,function (event) {
    const cardToDelete = event.target.closest('.card');
    cardToDelete.remove();
  })
 
  attachCard(newCardTemplate);
}

function getClonableCard() {
  const cardTemplate = document.querySelector("#card-template");
  const cardTemplateContent = cardTemplate.content;
  return cardTemplateContent.querySelector(".places__item").cloneNode(true);
}

function fillCard(newCardTemplate, element) {
  newCardTemplate.querySelector(".card__image").src = element.link;
  newCardTemplate.querySelector(".card__image").alt = element.alt;
  newCardTemplate.querySelector(".card__title").textContent = element.name;
}

function handleDeleteButton(newCard,funcDelCard) {
  const deleteButton = newCard.querySelector(".card__delete-button");
  deleteButton.addEventListener("click",funcDelCard);
}

function attachCard(newCardTemplate) {
  const placesList = document.querySelector(".places__list");
  placesList.append(newCardTemplate);
}


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
