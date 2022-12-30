import { modalLayout } from './htmlModal';
import Validator from '../../utils/Validator';

export default class Modal {
  constructor() {
    this.root = document.getElementById('root');
  }

  listener(data) {
    let modal;
    const buyBtn = document.querySelector('.buy__order');
    buyBtn.addEventListener('click', () => {
      const hash = location.hash;
      if (hash !== '#cart') {
        this.buyFromProductDetails(data);
      }
      modal = this.createModal(modal);
      const form = document.querySelector('.form');
      const cardNumber = form.querySelector('.input-card-number'),
        validThru = form.querySelector('.input-valid-thru'),
        inputName = form.querySelector('.input-name'),
        inputNumber = form.querySelector('.input-number'),
        inputAddress = form.querySelector('.input-address'),
        inputEmail = form.querySelector('.input-email'),
        inputValidThru = form.querySelector('.input-valid-thru'),
        inputCvv = form.querySelector('.input-cvv');

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        return this.isValidForm(
          inputName,
          inputNumber,
          inputAddress,
          inputEmail,
          cardNumber,
          inputCvv,
          inputValidThru
        );
      });

      inputName.addEventListener('blur', (e) => {
        this.validName(inputName);
      });
      inputNumber.addEventListener('focus', function (e) {
        const currentValue = e.target.value;
        this.value = `+ ${currentValue.replace(/[^\d.]/g, '')}`;
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
      cardNumber.addEventListener('blur', (e) => {
        this.validCardNumber(cardNumber);
      });
      cardNumber.addEventListener('input', (e) => {
        this.cardNumberHandler(e, cardNumber);
      });
      inputValidThru.addEventListener('input', (e) => {
        this.validThruHandler(e, validThru);
      });
      inputValidThru.addEventListener('blur', () => {
        this.validThru(validThru);
      });
      inputCvv.addEventListener('input', (e) => {
        this.cvvHandler(e, inputCvv);
      });
      inputCvv.addEventListener('blur', (e) => {
        this.validCvv(inputCvv);
      });

      inputValidThru.addEventListener('blur', () => {
        if (!Validator.isValidValidThru(inputValidThru.value)) {
          inputValidThru.classList.add('error');
        } else {
          inputValidThru.classList.remove('error');
        }
      });
      inputCvv.addEventListener('blur', () => {
        if (!Validator.isValidCvv(inputCvv.value)) {
          inputCvv.classList.add('error');
        } else {
          inputCvv.classList.remove('error');
        }
      });
    });

    window.addEventListener('click', (e) => {
      if (e.target.className === 'modal') {
        e.target.remove();
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

  isValidForm(
    inputName,
    inputNumber,
    inputAddress,
    inputEmail,
    inputCardNumber,
    inputCvv,
    inputValidThru
  ) {
    let isValid = true;
    this.validName(inputName);
    this.validPhone(inputNumber);
    this.validEmail(inputEmail);
    this.validAddress(inputAddress);
    this.validCardNumber(inputCardNumber);
    this.validThru(inputValidThru);
    this.validCvv(inputCvv);
    isValid = document.querySelectorAll('.error').length === 0;

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
  validCardNumber(input) {
    if (!Validator.isValidCardNumber(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-card-number').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-card-number').classList.remove('show');
    }
  }
  validThru(input) {
    if (!Validator.isValidValidThru(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-thru').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-thru').classList.remove('show');
    }
  }
  validCvv(input) {
    if (!Validator.isValidCvv(input.value)) {
      input.classList.add('error');
      document.querySelector('.error-cvv').classList.add('show');
    } else {
      input.classList.remove('error');
      document.querySelector('.error-cvv').classList.remove('show');
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
  buyFromProductDetails(data) {
    const currentId = location.hash.split('/').slice(-1)[0];
    window.location.hash = '#cart';
    const itemsInCart = JSON.parse(localStorage.getItem('cart'));
    if (itemsInCart) {
      if (
        itemsInCart.inCart.map((item) => item.id).includes(Number(currentId))
      ) {
      } else {
        const previousProducts =
          JSON.parse(localStorage.getItem('cart')).inCart || [];
        const currentProduct = data.find(
          (item) => item.id === Number(currentId)
        );
        currentProduct.count = 1;
        previousProducts.push(currentProduct);
        const newData = JSON.stringify({ ['inCart']: previousProducts });
        localStorage.setItem('cart', newData);
      }
    }
    {
    }
  }
}
