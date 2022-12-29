import { Cart } from '../pages/Basket/Cart';
import Storage from '../utils/Storage';

export default class CartComponent {
  constructor() {
    this.storage = new Storage('cart');
    this.cartData = this.storage.get('inCart') || [];
  }
  listenCart(allData) {
    this.setCurrentAmountHeader();
    const allProducts = document.querySelector('.products-items');
    const productDetail = document.querySelector('.product-wrapper');
    const currentContent = allProducts ? allProducts : productDetail;
    currentContent.addEventListener('click', (e) => {
      this.cartData = this.storage.get('inCart') || [];
      const currentId = Number(e.target.id);
      console.log;
      const checkedProduct = allData.find((item) => item.id === currentId);
      if (e.target.className === 'card__buttons-add') {
        checkedProduct.count = 1;
        this.cartData.push(checkedProduct);
        this.storage.set('inCart', this.cartData);
        this.toggleButton(e.target, e.target.id, 'Remove from cart');
      } else if (e.target.className === 'card__buttons-remove') {
        checkedProduct.count = 0;
        const newData = this.cartData.filter(
          (item) => String(item.id) !== e.target.id
        );
        this.storage.set('inCart', newData);
        this.toggleButton(e.target, e.target.id, 'Add to cart');
      }
      this.setCurrentAmountHeader();
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
        this.storage.set('inCart', this.cartData);
      } else if (e.target.classList.contains('basket-item-remove')) {
        const currentId = Number(e.target.closest('div').id);
        this.cartData.forEach((item) => {
          if (item.id === currentId && item.count > 1) {
            item.count -= 1;
            this.storage.set('inCart', this.cartData);
          } else if (item.id === currentId && item.count === 1) {
            const newData = this.cartData.filter((prod) => prod.id !== item.id);
            this.storage.set('inCart', newData);
          }
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
    this.setProductsInCart();
  }
  setProductsInCart() {
    const cartHeader = document.querySelector('.basket-count');
    const basketAmount = document.querySelector('.basket-amount');
    const productInCart =
      this.cartData && this.cartData.length > 0
        ? this.cartData.map((item) => item.count).reduce((a, b) => a + b)
        : 0;
    if (productInCart > 0) {
      cartHeader.style.display = 'block';
      cartHeader.textContent = productInCart;
      basketAmount
        ? (basketAmount.textContent = `Products: ${productInCart}`)
        : null;
    } else {
      cartHeader.style.display = 'none';
    }
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
    this.cartData = this.storage.get('inCart') || [];
    const totalAmount =
      this.cartData && this.cartData.length > 0
        ? this.cartData
            .map((item) => item.price * item.count)
            .reduce((prev, curr) => prev + curr)
        : 0;
    return totalAmount;
  }
  getCart() {
    return this.storage.get('inCart') ? this.storage.get('inCart') : [];
  }
  toggleButton(target, id, text) {
    const addedItem = document.querySelector(`.card__item.id-${id}`);
    target.textContent = `${text}`;
    target.classList.toggle('card__buttons-remove');
    target.classList.toggle('card__buttons-add');
    addedItem ? addedItem.classList.toggle('in-cart') : null;
  }
}
