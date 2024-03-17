/**
 * открывает по клику на указанный линк модальное окно, закрывает его по клику по кнопке или нажатием "esc",
 * либо по клику на оверлэй, если оно инициализированно. Есть метод закрытия по таймауту
 * 
 * @param {string} popup - элемент документа, ссылка на который получена методом querySelector
 * @param {string} buttonClose - класс кнопки для закрытия
 * @param {string} classShow - класс, при котором модальное окно получает display: block
 * @param {number} time - время в миллисекундах для метода setClosePopupTimeOut, через которое закроется модальное окно и вызванный с ним оверлэй
 * @param {number} top - вычесленное значение высоты для попапа с учетом прокрутки страницы и заданной константы от верха
 * 
 * инициализируется методом setPopup()
 * для оверлэй запускается метод setOverlay()
 * метод setClosePopupTimeOut(time) скроет модальное оено через указанный time
 */

export default class Popup {
    constructor(popup, buttonClose, classShow, top) {
        this.popup = popup;
        this.button = buttonClose;
        this.classButton = '.' + this.button;
        this.selectorButton = this.popup.querySelector(this.classButton);
        this.classShow = classShow;
        this.overlay = document.querySelector(`.overlay`);
        this.modalWindow = this.popup.querySelector('.popup__wrap');
        this.hideTimeout = null;
        this.top = top;

        this.overlayClickHandler = this.overlayClickHandler.bind(this);
        this.buttonCloseClickHandler = this.buttonCloseClickHandler.bind(this);
        this.popupEscHandler = this.popupEscHandler.bind(this);
        this.animateIn = this.animateIn.bind(this);
        this.animateOut = this.animateOut.bind(this);
    }

    setPopup() {

        if (this.overlay !== null) {
            this.overlay.addEventListener(`click`, this.overlayClickHandler);
        }
        this.openPopup();
        this.selectorButton.addEventListener(`click`, this.buttonCloseClickHandler);
        document.addEventListener(`keydown`, this.popupEscHandler);
    }

    setOverlay() {
        if (this.overlay !== null) {
            this.overlay.classList.add(`overlay--show`);
        }
    }

    setClosePopupTimeOut(time) {
        this.hideTimeout = setTimeout(() => {
            this.buttonCloseClickHandler()
        }, time)

    }

    openPopup() {
        if (this.popup !== null) {
            
            this.popup.addEventListener('animationend', this.animateIn);
            this.popup.classList.add('modal-in');
            this.popup.classList.add(this.classShow);
            
            const widthWindow = document.documentElement.clientWidth;
            const widthPopup = this.popup.offsetWidth;
            
            this.popup.style.left = (widthWindow / 2 - widthPopup / 2) + 'px';
            this.popup.style.top = this.top + 'px';
        }
    }

    closePopup() {
        // this.popup.classList.remove(this.classShow);
        this.popup.classList.add('modal-out'); 
        this.popup.addEventListener('animationend', this.animateOut);
    }

    overlayClickHandler() {
        this.closePopup();
        this.overlay.classList.remove(`overlay--show`);
        document.removeEventListener(`keydown`, this.popupEscHandler);
        clearTimeout(this.hideTimeout);
    }

    buttonCloseClickHandler() {
        if (this.overlay !== null) {
            if (this.overlay.classList.contains(`overlay--show`)) {
                this.overlay.classList.remove(`overlay--show`);
            }
        }

        this.closePopup();
        document.removeEventListener(`keydown`, this.popupEscHandler);
        clearTimeout(this.hideTimeout);
    }

    animateIn() {
        this.popup.classList.remove('modal-in');
        this.popup.removeEventListener('animationend', this.animateIn);
        
    }

    animateOut(){
        this.popup.classList.remove('modal-out');
        this.popup.classList.remove(this.classShow);
        this.popup.removeEventListener('animationend', this.animateOut);
    }

    popupEscHandler(evt) {
        if (evt.key === `Escape` || evt.key === `Esc`) {
            evt.preventDefault();

            this.closePopup();
            if (this.overlay !== null) {
                this.overlay.classList.remove(`overlay--show`);
            }
            document.removeEventListener(`keydown`, this.popupEscHandler);
        }
    }
}