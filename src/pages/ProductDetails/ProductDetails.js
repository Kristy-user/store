import { AbstractView } from '../AbstractView';
import RouterHelper from '../../utils/RouterHelper';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import Header from '../../components/Header';
import CartComponent from '../../components/CartComponent';
import Modal from '../Basket/ModalWindow';
import PhotoListener from '../../components/Filters/PhotoListener';

class ProductDetails extends AbstractView {
  constructor(params) {
    super(params);
    this.productId = params;
    this.setTitle('Product Details');
    this.productsView = new ProductDetailsCard();
    this.cart = new CartComponent();
    this.modalWindow = new Modal();
    this.photo = new PhotoListener();
  }

  showIncorrect() {
    const div = document.createElement('div');
    div.classList.add('not-found');
    div.textContent = `Product number
  ${this.productId.split('/').slice(-1).join('')}
    not found`;
    return div;
  }

  getItem(data) {
    const id = RouterHelper.checkId(this.productId);
    if (id) {
      const item = data.products.filter((x) => x.id === id);
      return item.length > 0
        ? this.productsView.draw(item)
        : this.showIncorrect();
    } else return this.showIncorrect();
  }
  afterRootRender(data) {
    const productItem = this.getItem(data);
    const productItemContainer = document.querySelector('.product-details');
    productItemContainer.append(productItem);
    Header.listener();
    this.cart.listenCart(data.products);
    this.modalWindow.listener();
    this.photo.listenPhoto();
  }
  render(root, data) {
    root.innerHTML = '<div class="product-details container"></div>';
    this.afterRootRender(data);
  }
}
export { ProductDetails };
