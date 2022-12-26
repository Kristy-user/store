import { modalLayout } from './htmlModal';
import Validator from '../../utils/Validator';

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
        cvv = form.querySelector('.input-cvv'),
        inputName = form.querySelector('.input-name'),
        inputNumber = form.querySelector('.input-number'),
        inputAddress = form.querySelector('.input-address'),
        inputEmail = form.querySelector('.input-email');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        return this.isValidForm(form);
      });
      inputName.addEventListener('blur', (e) => {
        this.validName(inputName);
      });
      inputNumber.addEventListener('blur', (e) => {
        this.validPhone(inputNumber);
      });
      inputAddress.addEventListener('blur', (e) => {
        this.validAddress(inputAddress);
      });
      inputEmail.addEventListener('blur', (e) => {
        this.validEmail(inputEmail);
      });
      cardNumber.addEventListener('input', (e) => {
        this.cardNumberHandler(e, cardNumber);
      });
      validThru.addEventListener('input', (e) => {
        this.validThruHandler(e, validThru);
      });
      cvv.addEventListener('input', (e) => {
        this.cvvHandler(e, cvv);
      });

      let inputName = form.querySelector('.input-name'),
        inputNumber = form.querySelector('.input-number'),
        inputAddress = form.querySelector('.input-address'),
        inputEmail = form.querySelector('.input-email'),
        inputCardNumber = form.querySelector('.input-card-number'),
        inputValidThru = form.querySelector('.input-valid-thru'),
        inputCvv = form.querySelector('.input-cvv');

      inputName.addEventListener('blur', () => {
        if (!Validator.isValidName(inputName.value)) {
          inputName.classList.add('error');
          isValid = false;
        } else {
          inputName.classList.remove('error');
        }
      })
      inputNumber.addEventListener('blur', () => {
        if (!Validator.isValidPhone(inputNumber.value)) {
          inputNumber.classList.add('error');
          isValid = false;
        } else {
          inputNumber.classList.remove('error');
        }
      })
      inputAddress.addEventListener('blur', () => {
        if (!Validator.isValidAddress(inputAddress.value)) {
          inputAddress.classList.add('error');
          isValid = false;
        } else {
          inputAddress.classList.remove('error');
        }
      })
      inputEmail.addEventListener('blur', () => {
        if (!Validator.isValidEmail(inputEmail.value)) {
          inputEmail.classList.add('error');
          isValid = false;
        } else {
          inputEmail.classList.remove('error');
        }
      })
      inputCardNumber.addEventListener('blur', () => {
        if (!Validator.isValidCardNumber(inputCardNumber.value)) {
          inputCardNumber.classList.add('error');
          isValid = false;
        } else {
          inputCardNumber.classList.remove('error');
        }
      })
      inputValidThru.addEventListener('blur', () => {
        if (!Validator.isValidValidThru(inputValidThru.value)) {
          inputValidThru.classList.add('error');
          isValid = false;
        } else {
          inputValidThru.classList.remove('error');
        }
      })
      inputCvv.addEventListener('blur', () => {
        if (!Validator.isValidCvv(inputCvv.value)) {
          inputCvv.classList.add('error');
          isValid = false;
        } else {
          inputCvv.classList.remove('error');
        }
      })
    });

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
    this.root.after(modal);
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

    let cardNumberValue = inputCardNumber.value,
      validThruValue = inputValidThru.value,
      cvvValue = inputCvv.value;

    this.validName(inputName, isValid);
    this.validPhone(inputNumber, isValid);
    this.validEmail(inputEmail, isValid);
    this.validAddress(inputAddress, isValid);
    isValid = document.querySelectorAll('.error').length === 0;

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
      window.location.hash = '';
      const modalContent = document.querySelector('.modal-content');
      modalContent.innerHTML = '';
      modalContent.style.top = '25%';
      modalContent.innerHTML =
        '<p class="info"> Thank you for your order! </p><p class="info"> Click anywhere to continue.</p>';
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
    if (
      cardNumber.value.replace(/\s/g, '').length % 4 === 0 &&
      cardNumber.value.length > 0
    ) {
      cardNumber.value += ' ';
    }

    // если в строке есть 16 цифр запрещаем ввод
    if (cardNumber.value.replace(/\s/g, '').length > 15) {
      cardNumber.value = cardNumber.value.slice(0, -1);
    }

    let bankCardImg = document.querySelector('.bankcard-img');
    if (Number(cardNumber.value[0]) === 4) {
      bankCardImg.src = './assets/visa.png';
    } else if (Number(cardNumber.value[0]) === 5) {
      bankCardImg.src = './assets/masterCard.png';
    } else if (Number(cardNumber.value[0]) === 6) {
      bankCardImg.src = './assets/maestro.png';
    } else {
      bankCardImg.src = './assets/bankCard.png';
    }
  }
  validEmail(input) {
    if (!Validator.isValidEmail(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-email').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-email').classList.remove('show');
    }
  }
  validPhone(input) {
    if (!Validator.isValidPhone(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-number').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-number').classList.remove('show');
    }
  }
  validName(input) {
    if (!Validator.isValidName(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-name').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-name').classList.remove('show');
    }
  }
  validAddress(input) {
    if (!Validator.isValidAddress(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-address').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-address').classList.remove('show');
    }
  }
  validThruHandler(e, validThru) {
    if (!e.data) return;

    if (e.data === '/' || e.data === ' ') {
      validThru.value = validThru.value.slice(0, -1);
      return;
    }

    validThru.value = validThru.value.replace(/[^0-9\/]+/g, '');
    if (
      validThru.value.replace(/\//g, '').length % 2 === 0 &&
      validThru.value.length > 0
    ) {
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
