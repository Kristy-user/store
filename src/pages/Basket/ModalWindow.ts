import { modalLayout } from './htmlModal';
import Validator from '../../utils/Validator';
import IData from '../../interfaces/data';
import { IProduct } from '../../interfaces/data';

export default class Modal {
  private root: HTMLDivElement;
  constructor() {
    this.root = document.getElementById('root') as HTMLDivElement;
  }

  listener(data: IData) {
    let modal: HTMLDivElement;
    const buyBtn = document.querySelector('.buy__order') as HTMLButtonElement;
    buyBtn.addEventListener('click', () => {
      const hash = location.hash;
      console.log(hash);
      
      if (hash !== '#cart') {
        this.buyFromProductDetails(data);
      }
      modal = this.createModal();
      const form = document.querySelector('.form') as HTMLFormElement;
      const cardNumber = form.querySelector('.input-card-number') as HTMLInputElement,
        validThru = form.querySelector('.input-valid-thru') as HTMLInputElement,
        inputName = form.querySelector('.input-name') as HTMLInputElement,
        inputNumber = form.querySelector('.input-number') as HTMLInputElement,
        inputAddress = form.querySelector('.input-address') as HTMLInputElement,
        inputEmail = form.querySelector('.input-email') as HTMLInputElement,
        inputValidThru = form.querySelector('.input-valid-thru') as HTMLInputElement,
        inputCvv = form.querySelector('.input-cvv') as HTMLInputElement;

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

      if (inputName) {
        inputName.addEventListener('blur', (e) => {
          this.validName(inputName);
        });
      }
      if (inputNumber) {
        inputNumber.addEventListener('focus', function (e: Event) {
          const currentTarget = e.target as HTMLInputElement;
          const currentValue = currentTarget.value;
          (e.target as HTMLInputElement).value = `+ ${currentValue.replace(/[^\d.]/g, '')}`;
          // currentTarget.value = `+ ${currentValue.replace(/[^\d.]/g, '')}`;
        });
      }
      if (inputNumber) {
        inputNumber.addEventListener('blur', (e) => {
          this.validPhone(inputNumber);
        });
      }
      if (inputAddress) {
        inputAddress.addEventListener('blur', (e) => {
          this.validAddress(inputAddress);
        });
      }
      if (inputEmail) {
        inputEmail.addEventListener('blur', (e) => {
          this.validEmail(inputEmail);
        });
      }
      if (cardNumber) {
        cardNumber.addEventListener('blur', (e) => {
          this.validCardNumber(cardNumber);
        });
      }
      if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
          this.cardNumberHandler(e, cardNumber);
        });
      }
      if (inputValidThru) {
        inputValidThru.addEventListener('input', (e) => {
          this.validThruHandler(e, validThru);
        });
      }
      if (inputValidThru) {
        inputValidThru.addEventListener('blur', () => {
          this.validThru(validThru);
        });
      }
      if (inputCvv) {
        inputCvv.addEventListener('input', (e) => {
          this.cvvHandler(e, inputCvv);
        });
      }
      if (inputCvv) {
        inputCvv.addEventListener('blur', (e) => {
          this.validCvv(inputCvv);
        });
      }

      if (inputValidThru) {
        inputValidThru.addEventListener('blur', () => {
          if (!Validator.isValidValidThru(inputValidThru.value)) {
            inputValidThru.classList.add('error');
          } else {
            inputValidThru.classList.remove('error');
          }
        });
      }
      if (inputCvv) {
        inputCvv.addEventListener('blur', () => {
          if (!Validator.isValidCvv(inputCvv.value)) {
            inputCvv.classList.add('error');
          } else {
            inputCvv.classList.remove('error');
          }
        }); 
      }
    });

    window.addEventListener('click', (e: Event) => {
      const currentTarget = e.target as HTMLDivElement;
      if (currentTarget.className === 'modal') {
        currentTarget.remove();
      }
    });
  }

  createModal(): HTMLDivElement {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = modalLayout;
    this.root.after(modal);
    return modal;
  }

  isValidForm(
    inputName: HTMLInputElement,
    inputNumber: HTMLInputElement,
    inputAddress: HTMLInputElement,
    inputEmail: HTMLInputElement,
    inputCardNumber: HTMLInputElement,
    inputCvv: HTMLInputElement,
    inputValidThru: HTMLInputElement
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
      const modalContent = document.querySelector('.modal-content') as HTMLDivElement;
      modalContent.innerHTML = '';
      modalContent.style.top = '25%';
      modalContent.innerHTML =
        '<p class="info"> Thank you for your order! </p><p class="info"> Click anywhere to continue.</p>';
    }
    return isValid;
  }

  cardNumberHandler(e: Event, cardNumber: HTMLInputElement) {
    // при удалении символов сразу возврат
    if (e instanceof InputEvent) {
      if (!e.data) return;
    }
    // сами не можем вводить пробелы
    if (e instanceof InputEvent) {
      if (e.data === ' ') {
        cardNumber.value = cardNumber.value.slice(0, -1);
        return;
      }
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

    let bankCardImg = document.querySelector('.bankcard-img') as HTMLImageElement;
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
  validEmail(input: HTMLInputElement) {
    if (!Validator.isValidEmail(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-email') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-email') as HTMLDivElement).classList.remove('show');
    }
  }
  validPhone(input: HTMLInputElement) {
    if (!Validator.isValidPhone(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-number') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-number') as HTMLDivElement).classList.remove('show');
    }
  }
  validName(input: HTMLInputElement) {
    if (!Validator.isValidName(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-name') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-name') as HTMLDivElement).classList.remove('show');
    }
  }
  validAddress(input: HTMLInputElement) {
    if (!Validator.isValidAddress(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-address') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-address') as HTMLDivElement).classList.remove('show');
    }
  }
  validCardNumber(input: HTMLInputElement) {
    if (!Validator.isValidCardNumber(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-card-number') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-card-number') as HTMLDivElement).classList.remove('show');
    }
  }
  validThru(input: HTMLInputElement) {
    if (!Validator.isValidValidThru(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-thru') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-thru') as HTMLDivElement).classList.remove('show');
    }
  }
  validCvv(input: HTMLInputElement) {
    if (!Validator.isValidCvv(input.value)) {
      input.classList.add('error');
      (document.querySelector('.error-cvv') as HTMLDivElement).classList.add('show');
    } else {
      input.classList.remove('error');
      (document.querySelector('.error-cvv') as HTMLDivElement).classList.remove('show');
    }
  }
  validThruHandler(e: Event, validThru: HTMLInputElement) {
    if (e instanceof InputEvent) {
      if (!e.data) return;
    }

    if (e instanceof InputEvent) {
      if (e.data === '/' || e.data === ' ') {
        validThru.value = validThru.value.slice(0, -1);
        return;
      }
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

  cvvHandler(e: Event, cvv: HTMLInputElement) {
    if (e instanceof InputEvent) {
      if (!e.data) return;
    }
    cvv.value = cvv.value.replace(/[^0-9]+/g, '');
    if (cvv.value.length > 3) {
      cvv.value = cvv.value.slice(0, -1);
    }
  }
  buyFromProductDetails(data: IData) {
    const currentId = location.hash.split('/').slice(-1)[0];
    window.location.hash = '#cart';
    const itemsInCart = JSON.parse(localStorage.getItem('cart') as string);
    if (itemsInCart) {
      if (
        itemsInCart.inCart.map((item: IProduct) => item.id).includes(Number(currentId))
      ) {
      } else {
        const previousProducts =
          JSON.parse(localStorage.getItem('cart') as string).inCart || [];
        console.log(data);
        
        const currentProduct = data.find(
          (item: IProduct) => item.id === Number(currentId)
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
