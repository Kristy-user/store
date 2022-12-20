import Cards from '../../components/Cards';
import { AbstractView } from '../AbstractView';
import { data } from '../../index';
import RouterHelper from '../../utils/RouterHelper';

class ProductDetails extends AbstractView {
  constructor(params) {
    super(params);
    this.productId = params;
    this.setTitle('Product Details');
    this.productsView = new Cards();
  }

  showIncorrect() {
    const div = document.createElement('div');
    div.classList.add('not-found');
    div.textContent = `Product number
  ${this.productId.split('/').slice(-1).join('')}
    not found`;
    return div;
  }

  async getItem() {
    const id = RouterHelper.checkId(this.productId);
    if (id) {
      const allData = await data;
      const item = allData.products.filter((x) => x.id === id);
      return item.length > 0
        ? this.productsView.draw(item)
        : this.showIncorrect();
    } else return this.showIncorrect();
  }
  async executeViewScript() {
    const productItem = await this.getItem();
    const productItemContainer = document.querySelector('#root .container');
    productItemContainer.append(productItem);
  }
  async render(root) {
    root.innerHTML = `<div class="container"></div>`;
    await this.executeViewScript();
  }
}
export { ProductDetails };
