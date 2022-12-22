import ProductCards from '../../components/ProductCards.js';
import FilterListener from '../../components/Filters/FilterListener.js';
import { AbstractView } from '../AbstractView.js';
import { data } from '../../index';
import RouterHelper from '../../utils/RouterHelper.js';
import { homeRoot } from '../Home/htmlData.js';
import Header from '../../components/Header.js';
import CartComponent from '../../components/CartComponent.js';

class ProductsFilter extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new ProductCards();
    this.listener = new FilterListener();
    this.currentFilters = RouterHelper.setFilter(this.params);
    this.minPrice = '';
    this.maxPrice = '';
    this.minStock = '';
    this.maxStock = '';
    this.cart = new CartComponent();
  }
  async getCategoryProducts() {
    const allData = await data;
    let keys = Object.keys(this.currentFilters);
    let productsList = allData.products;
    keys.forEach((key) => {
      return (productsList = productsList.filter((item) => {
        if (key === 'price') {
          this.minPrice = this.currentFilters[key][0];
          this.maxPrice = this.currentFilters[key][1];
          return (
            item.price >= this.currentFilters[key][0] &&
            item.price <= this.currentFilters[key][1]
          );
        } else if (key === 'stock') {
          this.minStock = this.currentFilters[key][0];
          this.maxStock = this.currentFilters[key][1];
          return (
            item.stock >= this.currentFilters[key][0] &&
            item.stock <= this.currentFilters[key][1]
          );
        } else if (key === 'search') {
          return (
            item.title.toLowerCase().includes(this.currentFilters[key][0]) ||
            item.description.toLowerCase().includes(this.currentFilters[key][0])
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
    const productListContainer = document.querySelector('.products-items');
    if (productsElement) {
      productListContainer.append(productsElement);
    } else {
      const wrapper = document.createElement('div');
      wrapper.classList.add('not__found');
      document.querySelector('.products-items').append(wrapper);
    }
    const maxPrice = Math.max(...productsList.map((item) => item.price));
    const minPrice = Math.min(...productsList.map((item) => item.price));
    const maxStock = Math.max(...productsList.map((item) => item.stock));
    const minStock = Math.min(...productsList.map((item) => item.stock));
    this.listener.listen(
      this.minPrice ? this.minPrice : minPrice,
      this.maxPrice ? this.maxPrice : maxPrice,
      this.minStock ? this.minStock : minStock,
      this.maxStock ? this.maxStock : maxStock
    );
    this.listener.addChecked();
    this.cart.listenCart(productsList);
    Header.listener();
  }

  async render(root) {
    root.innerHTML = homeRoot;
    await this.afterRootRender();
  }
}
export { ProductsFilter };
