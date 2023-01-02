import ProductCards from '../../components/ProductCards';
import CartComponent from '../../components/CartComponent';
import { AbstractView } from '../AbstractView';
import { cartLayout } from './htmlCart';
import Modal from './ModalWindow';
import PromoCode from './PromoCode';
import Storage from '../../utils/Storage';

class Cart extends AbstractView {
  constructor(params) {
    super(params);
    this.params = params;
    this.setTitle('Basket');
    this.productsView = new ProductCards();
    this.cart = new CartComponent();
    this.storage = new Storage('cart');
  }

  fillCartList() {
    const currentCart = this.cart.getCart();
    if (currentCart && currentCart.length > 0) {
      this.cart.pagination();
      const limit = document.querySelector('#limit').value;
      const currentPage = document.querySelector(
        '.pagination .active'
      ).textContent;
      const start = currentPage > 1 ? limit * currentPage - limit : 0;
      let lastIndex = currentPage * limit - limit;
      const end = Number(start) + Number(limit);
      const dataToShow = currentCart.slice(start, end);
      this.cart.setCurrentAmountHeader();
      const cartWrapper = document.querySelector('.basket-list');
      document.querySelector('.order').classList.remove('hidden');
      const content = dataToShow.map(
        (item, i) =>
          `<li class="basket-list-item">
          <div  class="basket-item-container">
          <div class="basket-item-number">
          <p >${currentPage > 1 ? ++lastIndex : i + 1}.</p></div>
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
              <p>$${item.count * item.price}.00</p>
            </div>
          </div>
        </li>`
      );
      cartWrapper.innerHTML = content.reduce((a, b) => a + b);
    } else {
      const cartSection = document.querySelector('.basket-products');
      const textForEmpty = document.createElement('div');
      textForEmpty.classList.add('basket-empty');
      textForEmpty.textContent = 'Cart is empty';
      cartSection.innerHTML = '';
      cartSection.append(textForEmpty);
      document.querySelector('.order').classList.add('hidden');
    }
    this.cart.listenCount();
    this.cart.listenCardDetails();
  }
  render(root) {
    root.innerHTML = cartLayout;
    this.fillCartList();
    this.afterRootRender();
  }

  afterRootRender() {
    const modalWindow = new Modal();
    modalWindow.listener();
    const promo = new PromoCode();
    promo.listener();
  }
}
export { Cart };
