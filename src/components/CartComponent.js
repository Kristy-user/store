import { Cart } from '../pages/Basket/Cart';
import Storage from '../utils/Storage';

export default class CartComponent {
  constructor() {
    this.storage = new Storage('shop');
    this.cartData = this.storage.get('cart') || [];
  }
  listenCart(allData) {
    this.setCurrentAmountHeader();
    const allProducts = document.querySelector('.products__wrapper');
    allProducts.addEventListener('click', (e) => {
      if (e.target.className !== 'card__buttons-add') {
        return;
      } else {
        const currentId = Number(e.target.id);
        const checkedProduct = allData.find((item) => item.id === currentId);

        this.cartData.forEach((item) => {
          if (item.id === currentId && item.stock >= item.count + 1) {
            item.count += 1;
          }
        });
        if (
          this.cartData.length === 0 ||
          !this.cartData.map((item) => item.id).find((id) => id === currentId)
        ) {
          checkedProduct.count = 1;
          this.cartData.push(checkedProduct);
        }
        this.storage.set('cart', this.cartData);
        this.setCurrentAmountHeader();
      }
      this.storage.set('cart', this.cartData);
    });
  }
  listenCount() {
    const cartList = document.querySelector('.basket-list');
    cartList.addEventListener('click', (e) => {
      if (e.target.classList.contains('basket-item-add')) {
        const currentId = Number(e.target.closest('div').id);
        this.cartData.forEach((item) =>
          item.id === currentId && item.stock >= item.count + 1
            ? (item.count += 1)
            : item
        );
        this.storage.set('cart', this.cartData);
      } else if (e.target.classList.contains('basket-item-remove')) {
        const currentId = Number(e.target.closest('div').id);
        this.cartData.forEach((item) => {
          if (item.id === currentId && item.count > 1) {
            item.count -= 1;
          } else if (item.id === currentId && item.count === 1) {
            this.cartData = this.cartData.filter((prod) => prod.id !== item.id);
          }
          this.storage.set('cart', this.cartData);
        });
      }
      const view = new Cart('#cart');
      view.render(document.querySelector('#root'));
    });
    document.querySelector(
      '.buy__total-amount'
    ).textContent = `$ ${this.getTotalAmount()}.00`;
    this.setCurrentAmountHeader();
  }
  setCurrentAmountHeader() {
    const totalAmount = this.getTotalAmount();
    const amountEl = document.querySelector('#totalAmount');
    amountEl.textContent = totalAmount
      ? `Total: $ ${totalAmount}`
      : 'Total: $ 0';
  }
  listenCardDetails() {
    const productsList = document.querySelector('.basket-list');

    productsList.addEventListener('click', (e) => {
      if (e.target.classList.contains('basket-item-photo')) {
        const id = e.target.id;
        window.location.hash = `#product-details/${id}`;
      }
    });
  }
  getTotalAmount() {
    const currentCart = this.cartData;

    const totalAmount =
      currentCart && currentCart.length > 0
        ? currentCart
            .map((item) => item.price * item.count)
            .reduce((prev, curr) => prev + curr)
        : 0;
    return totalAmount;
  }
  getCart() {
    return this.cartData;
  }
}
