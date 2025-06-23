// Закрытие по Escape
export function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

// Закрытие по оверлею
export function closeByOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.currentTarget);
    }
}

// Универсальное открытие попапа
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
}

// Универсальное закрытие попапа
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
}

// Инициализация обработчиков закрытия
export function initModalCloseHandlers() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('mousedown', closeByOverlay);
        popup.querySelector('.popup__close').addEventListener('click', () => closeModal(popup));
    });
}