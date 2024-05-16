initialCards.forEach(elementValue => createWidget(elementValue));

function createWidget(element) {
const cardTemplate = document.querySelector('#card-template');
const placesList = document.querySelector('.places__list');
const cardTemplateContent = cardTemplate.content;
// клонируем содержимое тега template
const newCardTemplate = cardTemplateContent.querySelector('.places__item').cloneNode(true);

// наполняем содержимым
newCardTemplate.querySelector('.card__image').src = element.link;
newCardTemplate.querySelector('.card__title').textContent = element.name;
const deleteButton = newCardTemplate.querySelector('.card__delete-button');
deleteButton.addEventListener('click', function() {
    deleteCard(newCardTemplate);
} );
// отображаем на странице
placesList.append(newCardTemplate);

function deleteCard() {
    newCardTemplate.remove();
};

}


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
