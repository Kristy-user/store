import ProductCards from '../../components/ProductCards';
import CartComponent from '../../components/CartComponent';
import { AbstractView } from '../AbstractView';
import { cartLayout } from './htmlCart';
import Header from '../../components/Header';
import Modal from './ModalWindow';

class Cart extends AbstractView {
  constructor(params) {
    super(params);
    this.productId = params;
    this.setTitle('Basket');
    this.productsView = new ProductCards();
    this.cart = new CartComponent();
  }

  executeViewScript() {
    const currentCart = this.cart.getCart();
    this.cart.setCurrentAmountHeader();
    const cartWrapper = document.querySelector('.basket-list');
    document.querySelector('.order').classList.remove('hidden');
    if (currentCart && currentCart.length > 0) {
      const content = currentCart.map(
        (item, i) =>
          `<li class="basket-list-item">
          <div  class="basket-item-container">
          <div class="basket-item-number">
          <p >${i + 1}.</p></div>
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
    Header.listener();
    this.cart.listenCount();
    this.cart.listenCardDetails();
  }
  render(root) {
    root.innerHTML = cartLayout;
    this.executeViewScript();
    this.afterRootRender();
  }

  afterRootRender() {
    const modalWindow = new Modal();
    modalWindow.listener();
  }
}
export { Cart };
