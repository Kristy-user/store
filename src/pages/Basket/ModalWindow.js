import { modalLayout } from "./htmlModal";
import Validator from "../../utils/Validator";

export default class Modal {
    constructor() {
        this.buyBtn = document.querySelector('.buy__order');
        this.root = document.getElementById('root');
    }

    listener() {
        let modal;
        let form;
        this.buyBtn.addEventListener('click', () => {
            modal = this.createModal(modal);
            form = document.querySelector('.form');
            let cardNumber = form.querySelector('.input-card-number'),
                validThru = form.querySelector('.input-valid-thru'),
                cvv = form.querySelector('.input-cvv');

            form.onsubmit = () => {
                return this.isValidForm(form);
            }
            cardNumber.addEventListener('input', (e) => {
                this.cardNumberHandler(e, cardNumber);
            })
            validThru.addEventListener('input', (e) => {
                this.validThruHandler(e, validThru);
            })
            cvv.addEventListener('input', (e) => {
                this.cvvHandler(e, cvv);
            })
        })

        window.addEventListener('click', (e) => {
            if (e.target.className === 'modal') {
                modal.remove();
            }
        });
    }

    createModal(modal) {
        modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = modalLayout;
        this.root.after(modal)
        return modal;
    }

    isValidForm(form) {
        let isValid = true;

        let inputName = form.querySelector('.input-name'),
            inputNumber = form.querySelector('.input-number'),
            inputAddress = form.querySelector('.input-address'),
            inputEmail = form.querySelector('.input-email'),
            inputCardNumber = form.querySelector('.input-card-number'),
            inputValidThru = form.querySelector('.input-valid-thru'),
            inputCvv = form.querySelector('.input-cvv');

        let nameValue = inputName.value,
            numberValue = inputNumber.value,
            addressValue = inputAddress.value,
            emailValue = inputEmail.value,
            cardNumberValue = inputCardNumber.value,
            validThruValue = inputValidThru.value,
            cvvValue = inputCvv.value;

        if (!Validator.isValidName(nameValue)) {
            inputName.classList.add('error');
            isValid = false;
        } else {
            inputName.classList.remove('error');
        }


        if (!Validator.isValidPhone(numberValue)) {
            inputNumber.classList.add('error');
            isValid = false;
        } else {
            inputNumber.classList.remove('error');
        }


        if (!Validator.isValidAddress(addressValue)) {
            inputAddress.classList.add('error');
            isValid = false;
        } else {
            inputAddress.classList.remove('error');
        }


        if (!Validator.isValidEmail(emailValue)) {
            inputEmail.classList.add('error');
            isValid = false;
        } else {
            inputEmail.classList.remove('error');
        }


        if (!Validator.isValidCardNumber(cardNumberValue)) {
            inputCardNumber.classList.add('error');
            isValid = false;
        } else {
            inputCardNumber.classList.remove('error');
        }

        if (!Validator.isValidValidThru(validThruValue)) {
            inputValidThru.classList.add('error');
            isValid = false;
        } else {
            inputValidThru.classList.remove('error');
        }

        if (!Validator.isValidCvv(cvvValue)) {
            inputCvv.classList.add('error');
            isValid = false;
        } else {
            inputCvv.classList.remove('error');
        }

        if (isValid) {
            localStorage.clear();
            window.location.hash = '#';
        }

        return isValid;
    }

    cardNumberHandler(e, cardNumber) {
        // при удалении символов сразу возврат
        if (!e.data) return;

        // сами не можем вводить пробелы
        if (e.data === ' ') {
            cardNumber.value = cardNumber.value.slice(0, -1);
            return;
        }

        // меняем все символы в строке на '' кроме цифр и пробелов
        cardNumber.value = cardNumber.value.replace(/[^0-9\s]+/g, '');
        if (cardNumber.value.replace(/\s/g, '').length % 4 === 0
            && cardNumber.value.length > 0) {
            cardNumber.value += ' ';
        }

        // если в строке есть 16 цифр запрещаем ввод
        if (cardNumber.value.replace(/\s/g, '').length > 15) {
            cardNumber.value = cardNumber.value.slice(0, -1);
        }

        let bankCardImg = document.querySelector('.bankcard-img');
        if (Number(cardNumber.value[0]) === 4) {
            bankCardImg.src = "./assets/visa.png";
        } else if (Number(cardNumber.value[0]) === 5) {
            bankCardImg.src = "./assets/masterCard.png";
        } else if (Number(cardNumber.value[0]) === 6) {
            bankCardImg.src = "./assets/maestro.png";
        } else {
            bankCardImg.src = "./assets/bankCard.png";
        }
    }

    validThruHandler(e, validThru) {
        if (!e.data) return;

        if (e.data === '/' || e.data === ' ') {
            validThru.value = validThru.value.slice(0, -1);
            return;
        }

        validThru.value = validThru.value.replace(/[^0-9\/]+/g, '');
        if (validThru.value.replace(/\//g, '').length % 2 === 0
            && validThru.value.length > 0) {
            validThru.value += '/';
        }

        if (validThru.value.replace(/\//g, '').length > 3) {
            validThru.value = validThru.value.slice(0, -1);
        }
    }

    cvvHandler(e, cvv) {
        if (!e.data) return;

        cvv.value = cvv.value.replace(/[^0-9]+/g, '');

        if (cvv.value.length > 3) {
            cvv.value = cvv.value.slice(0, -1);
        }
    }
}
