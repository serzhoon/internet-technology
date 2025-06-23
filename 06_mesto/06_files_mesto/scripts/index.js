// ===== КОНСТАНТЫ И ПЕРЕМЕННЫЕ =====
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Настройки валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// ===== ФУНКЦИИ ВАЛИДАЦИИ =====
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement);
    });
}

// ===== ФУНКЦИИ ДЛЯ РАБОТЫ С ПОПАПАМИ =====
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function closeByOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.currentTarget);
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

// ===== ФУНКЦИИ ДЛЯ КАРТОЧЕК =====
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', () => openImagePopup(cardData));
    
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function openImagePopup(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imagePopup);
}

function renderCard(cardData, container) {
    const card = createCard(cardData);
    container.prepend(card);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    // Включение валидации
    enableValidation();
    
    // Настройка обработчиков закрытия попапов
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', closeByOverlay);
        popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup));
    });
    
    // Анимация попапов
    document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.add('popup_is-animated');
    });
    
    // Инициализация карточек
    initialCards.forEach(card => {
        renderCard(card, placesList);
    });
});

// ===== ОБРАБОТЧИКИ СОБЫТИЙ =====
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

addCardButton.addEventListener('click', () => {
    cardForm.reset();
    openModal(cardPopup);
});

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
});

cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    
    const newCard = {
        name: cardForm.elements['place-name'].value,
        link: cardForm.elements.link.value
    };
    
    renderCard(newCard, placesList);
    closeModal(cardPopup);
    cardForm.reset();
});