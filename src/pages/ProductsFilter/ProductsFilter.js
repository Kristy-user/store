import Cards from '../../components/Cards.js';
import FilterListener from '../../components/FilterListener.js';
import { AbstractView } from '../AbstractView.js';
import { data } from '../../index';
import { homeFilterRoot } from './htmlData.js';
import RouterHelper from '../../utils/RouterHelper.js';

class ProductsFilter extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
    this.listener = new FilterListener();
  }
  async getCategoryProducts() {
    const currentFilters = RouterHelper.setFilter(this.params); /// нужно еще написать эту ф-ию
    const category = [];
    const allData = await data;
    const productsList = this.productsView.draw(
      allData.products.filter((item) => category.includes(item.category))
    );
    return productsList;
  }
  async afterRootRender() {
    const productsList = await this.getCategoryProducts();
    const productListContainer = document.querySelector('.products__wrapper');
    productListContainer.append(productsList);
    this.listener.listen();
  }
  async render(root) {
    root.innerHTML = homeFilterRoot;
    await this.afterRootRender();
  }
}
export { ProductsFilter };
