// Функция создания карточки
export function createCard(cardData, deleteCallback, likeCallback, openImageCallback) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    deleteButton.addEventListener('click', () => deleteCallback(cardElement));
    likeButton.addEventListener('click', likeCallback);
    cardImage.addEventListener('click', () => openImageCallback(cardData));
    
    return cardElement;
}

// Удаление карточки
export function deleteCard(cardElement) {
    cardElement.remove();
}

// Обработка лайка
export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Открытие изображения
export function openImagePopup(cardData, imagePopup) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    
    return { popupImage, popupCaption };
}