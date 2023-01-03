import { AbstractView } from '../AbstractView';
import RouterHelper from '../../utils/RouterHelper';
import ProductDetailsCard from '../../components/ProductDetailsCard';
import CartComponent from '../../components/CartComponent';
import Modal from '../Basket/ModalWindow';
import PhotoListener from '../../components/Listeners/PhotoListener';
import IData from '../../interfaces/data';

class ProductDetails extends AbstractView {
  private productsView: ProductDetailsCard;
  private cart: CartComponent;
  private modalWindow: Modal;
  private photo: PhotoListener;
  constructor(params: string) {
    super(params);
    this.params = params;
    this.setTitle('Product Details');
    this.productsView = new ProductDetailsCard();
    this.cart = new CartComponent();
    this.modalWindow = new Modal();
    this.photo = new PhotoListener();
  }

  showIncorrect(): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('not-found');
    div.textContent = `Product number
  ${this.params.split('/').slice(-1).join('')}
    not found`;
    return div;
  }

  getItem(data: IData): void | HTMLDivElement {
    const id = RouterHelper.checkId(this.params);
    if (id) {
      const item = data.products.filter((x) => x.id === id);
      return item.length > 0
        ? this.productsView.draw(item)
        : this.showIncorrect();
    } else return this.showIncorrect();
  }
  afterRootRender(data: IData) {
    const productItem = this.getItem(data);
    const productItemContainer: HTMLElement | null =
      document.querySelector('.product-details');
    if (productItemContainer && productItem instanceof HTMLDivElement) {
      productItemContainer.append(productItem);
    }
    this.cart.listenCart(data.products);
    this.modalWindow.listener(data.products);
    this.photo.listenPhoto();
  }
  render(root: HTMLElement, data: IData) {
    root.innerHTML = '<div class="product-details container"></div>';
    this.afterRootRender(data);
  }
}
export { ProductDetails };
