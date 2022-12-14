import Cards from '../components/Cards.js';
import { AbstractView } from './AbstractView.js';

class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
  }
  async getAllProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    const productsList = this.productsView.draw(data.products);

    return productsList;
  }
  async executeViewScript() {
    const productsList = await this.getAllProducts();
    const productListContainer = document.querySelector('.products');
    productListContainer.append(productsList);
  }
  async render() {
    return '<section class="products container"></section>';
  }
}
export { Home };
