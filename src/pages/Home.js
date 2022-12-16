import Cards from '../components/Cards.js';
import FilterListener from '../components/FilterListener.js';
import { AbstractView } from './AbstractView.js';

class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
    this.listener = new FilterListener();
  }
  async getAllProducts() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    const productsList = this.productsView.draw(data.products);

    return productsList;
  }
  async executeViewScript() {
    const productsList = await this.getAllProducts();
    const productListContainer = document.querySelector('.products__wrapper');
    productListContainer.append(productsList);
    this.listener.listen();
  }
  async render() {
    return '<section class="products container"><aside class="products__filter"><div class="category__box"><div id="category"><h3>Category</h3>   <div><input        type="checkbox" id="smartphones" name="category" value="smartphones"/><label for="smartphones">Smartphones</label></div><div>      <input type="checkbox" id="laptops" name="category" value="laptops"/><label for="laptops">Laptops</label></div></div><div id="brand"><div><h3>Brand</h3><input type="checkbox" id="apple" name="brand" value="apple"/><label for="apple">Apple</label></div><div>      <input type="checkbox" id="samsung" name="brand" value="samsung"/><label for="samsung">Samsung</label></div></div></aside><div class="products__wrapper"></div></section>';
  }
}
export { Home };
