import Cards from '../../components/Cards.js';
import FilterListener, { filters } from '../../components/FilterListener.js';
import { AbstractView } from '../AbstractView.js';
import { data } from '../../index';

import RouterHelper from '../../utils/RouterHelper.js';
import { homeRoot } from '../Home/htmlData.js';
import { getMinMaxPrice } from '../../components/PriceSlider.js';

class ProductsFilter extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new Cards();
    this.listener = new FilterListener();
    this.currentFilters = RouterHelper.setFilter(this.params);
  }
  async getCategoryProducts() {
    const allData = await data;
    let keys = Object.keys(this.currentFilters);
    let productsList = allData.products;
    keys.forEach((key) => {
      return (productsList = productsList.filter((item) => {
        if (key === 'price') {
          return (
            item.price >= this.currentFilters[key][0] &&
            item.price <= this.currentFilters[key][1]
          );
        } else
          return this.currentFilters[key].includes(item[key].toLowerCase());
      }));
    });
    return productsList;
  }
  async afterRootRender() {
    const productsList = await this.getCategoryProducts();
    const productsElement = this.productsView.draw(productsList);
    const productListContainer = document.querySelector('.products__wrapper');
    productListContainer.append(productsElement);
    const maxPrice = Math.max(...productsList.map((item) => item.price));
    const minPrice = Math.min(...productsList.map((item) => item.price));
    this.listener.listen(minPrice, maxPrice);
  }
  async render(root) {
    root.innerHTML = homeRoot;
    await this.afterRootRender();
  }
}
export { ProductsFilter };
