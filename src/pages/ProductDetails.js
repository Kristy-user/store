import Cards from '../components/Cards';
import { AbstractView } from './AbstractView';

class ProductDetails extends AbstractView {
  constructor(params) {
    super(params);
    this.productId = params.id;
    this.setTitle('Product Details');
    this.productsView = new Cards();
  }
  async getItem() {
    const response = await fetch(
      `https://dummyjson.com/products/${this.productId}`
    );
    const data = await response.json();
    const productItem = this.productsView.draw([data]);

    return productItem;
  }
  async executeViewScript() {
    const productItem = await this.getItem();
    const productItemContainer = document.querySelector('#root .container');
    productItemContainer.append(productItem);
  }
  async render() {
    return `
    <div class="container">
  </div>`;
  }
}
export { ProductDetails };
