import CartComponent from '../../components/CartComponent';
import { AbstractView } from '../AbstractView';
import { cartLayout } from './htmlCart';
import Modal from './ModalWindow';
import PromoCode from './PromoCode';
import IData, { IProduct } from '../../interfaces/data';

class Cart extends AbstractView {
  private cart: CartComponent;
  constructor(params: string) {
    super(params);
    this.params = params;
    this.setTitle('Basket');
    this.cart = new CartComponent();
  }
  fillCartList(): void {
    const currentCart = this.cart.getCart();
    const orderEl: HTMLElement | null = document.querySelector('.order');
    if (currentCart && currentCart.length > 0) {
      this.cart.pagination();
      const limit: HTMLInputElement | null = document.querySelector('#limit');
      const limitValue: number = limit ? Number(limit.value) : 4;
      const currentPage: HTMLElement | null = document.querySelector(
        '.pagination .active'
      );
      const currentPageValue: number = currentPage
        ? Number(currentPage.textContent)
        : 1;
      const start: number =
        currentPageValue > 1 ? limitValue * currentPageValue - limitValue : 0;
      let lastIndex: number = currentPageValue * limitValue - limitValue;
      const end: number = start + limitValue;
      const dataToShow = currentCart.slice(start, end);
      this.cart.setCurrentAmountHeader();
      const cartWrapper: HTMLElement | null =
        document.querySelector('.basket-list');
      orderEl ? orderEl.classList.remove('hidden') : null;
      const content = (dataToShow as IProduct[]).map(
        (item, i) =>
          `<li class="basket-list-item">
          <div  class="basket-item-container">
          <div class="basket-item-number">
          <p >${
            currentPage && Number(currentPage) > 1 ? lastIndex : i + 1
          }.</p></div>
           <div id=${
             item.id
           }  class = "basket-item-photo" style = background-image:url('${
            item.thumbnail
          }') ></div>
            <div class="basket-item-description">
              <p>${item.title} (${
            item.category[0].toUpperCase() +
            item.category.slice(1, item.category.length)
          })</p>
              <p>${item.description}</p>
              <p>Rating: ${item.rating}</p>
            </div>
            <div class="basket-item-price" >
              <p>$ ${item.price}.00</p>
            </div>
            <div id =${item.id} class="basket-item-count">
              <button class="basket-item-add">+</button>
            <div class="item-count-info">
              <p class="basket-item-stock">Stock: ${item.stock}</p>
              <p>${item.count}</p>
            </div>  
              <button class="basket-item-remove">-</button>
            </div>
            <div class="basket-item-total">
              <p>$${item.count ? item.count * item.price : 0}.00</p>
            </div>
          </div>
        </li>`
      );
      cartWrapper && content.length > 0
        ? (cartWrapper.innerHTML = content.reduce((a, b) => a + b))
        : null;
    } else {
      const cartSection: HTMLElement | null =
        document.querySelector('.basket-products');
      const textForEmpty: HTMLDivElement = document.createElement('div');
      textForEmpty.classList.add('basket-empty');
      textForEmpty.textContent = 'Cart is empty';
      if (cartSection) {
        cartSection.innerHTML = '';
        cartSection.append(textForEmpty);
      }
      orderEl ? orderEl.classList.add('hidden') : null;
    }
    this.cart.listenCount();
    this.cart.listenCardDetails();
  }
  render(root: HTMLElement, data?: IData): void {
    root.innerHTML = cartLayout;
    this.fillCartList();
    this.afterRootRender(data);
  }
  afterRootRender(data?: IData): void {
    const modalWindow: Modal = new Modal();
    data ? modalWindow.listener(data.products) : modalWindow.listener();
    const promo: PromoCode = new PromoCode();
    promo.listener();
  }
}
export { Cart };
