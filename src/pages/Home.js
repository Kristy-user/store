import Cards from '../components/Cards.js';
import FilterListener from '../components/FilterListener.js';
import { AbstractView } from './AbstractView.js';
import { data } from '../index';

class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
    this.listener = new FilterListener();
  }
  async getAllProducts() {
    const allData = await this.search(data)
    console.log(allData);
    const productsList = this.productsView.draw(allData);

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
  async search(data) {
    const inputValue = document.querySelector('.search__input').value;
    const myData = await data;

    const searchData = myData.products.filter(item => {
      for (let key in item) {
        if (typeof item[key] === 'string' &&
          item[key].toUpperCase().includes(inputValue.toUpperCase())) return true;
      }
      return false;
    })

    return searchData;
  }
}
export { Home };
