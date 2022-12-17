import Cards from '../components/Cards';
import { AbstractView } from './AbstractView';
import { data } from '../index';

class ProductDetails extends AbstractView {
  constructor(params) {
    super(params);
    this.productId = params.id;
    this.setTitle('Product Details');
    this.productsView = new Cards();
  }
  async getItem() {
    const allData = await data;
    const item = allData.products.filter(x => x.id === Number(this.productId));
    const productItem = this.productsView.draw(item);

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
