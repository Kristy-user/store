import Cards from '../components/Cards.js';
import { AbstractView } from './AbstractView.js';

class FilterView extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
  }
  async getCategoryProducts() {
    const category = this.params.name;
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();

    const productsList = this.productsView.draw(data.products);

    return productsList;
  }
  async executeViewScript() {
    const productsList = await this.getCategoryProducts();
    const productListContainer = document.querySelector('.products');
    productListContainer.append(productsList);
  }
  async render() {
    return '<section class="products container"></section>';
  }
}
export { FilterView };
