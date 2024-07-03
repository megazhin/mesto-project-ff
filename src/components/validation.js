
function showInputError(formElement, inputElement, errorMessage, validatonModalConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validatonModalConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validatonModalConfig.inputErrorTextColor);
};
  
function hideInputError(formElement, inputElement,validatonModalConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validatonModalConfig.inputErrorClass);
  errorElement.classList.remove(validatonModalConfig.inputErrorTextColor);
  errorElement.textContent = '';
};
  
function checkInputValidity(formElement, inputElement, validatonModalConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validatonModalConfig);
  } else {
    hideInputError(formElement, inputElement,validatonModalConfig);
  }
};
  
function setEventListeners(formElement,validatonModalConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validatonModalConfig.inputSelector));
  const buttonElement = formElement.querySelector(validatonModalConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement,validatonModalConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
 
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function enableValidation(validatonModalConfig) {
  const formList = Array.from(document.querySelectorAll(validatonModalConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement,validatonModalConfig);
  })
}

function toggleButtonState(inputList,buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function clearValidation(formElement,validatonModalConfig) {
  const inputs = Array.from(formElement.querySelectorAll(validatonModalConfig.inputSelector))
  inputs.forEach(inputElement => hideInputError(formElement,inputElement,validatonModalConfig));
  const buttonElement = formElement.querySelector(validatonModalConfig.submitButtonSelector)
  if (buttonElement != null ) {
    buttonElement.disabled = true;
  }
}

export {enableValidation, clearValidation};