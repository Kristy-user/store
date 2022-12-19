import Cards from '../../components/Cards.js';
import FilterListener from '../../components/FilterListener.js';
import { AbstractView } from '../AbstractView.js';
import { data } from '../../index';
import { homeRoot } from './htmlData.js';

class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
    this.listener = new FilterListener();
  }

  async afterRootRender() {
    const myData = await data;
    const productsList = this.productsView.draw(myData.products);
    const productListContainer = document.querySelector('.products__wrapper');
    productListContainer.append(productsList);
    const maxPrice = Math.max(...myData.products.map((item) => item.price));
    const minPrice = Math.min(...myData.products.map((item) => item.price));
    this.listener.listen(minPrice, maxPrice);
  }
  async render(root) {
    root.innerHTML = homeRoot;
    await this.afterRootRender();
  }
  async search(data) {
    const inputValue = document.querySelector('.search__input').value;
    const myData = await data;
    const searchData = myData.products.filter((item) => {
      for (let key in item) {
        if (
          typeof item[key] === 'string' &&
          item[key].toUpperCase().includes(inputValue.toUpperCase())
        )
          return true;
      }
      return false;
    });
    return searchData;
  }
}
export { Home };
