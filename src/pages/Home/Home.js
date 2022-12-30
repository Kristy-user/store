import ProductCards from '../../components/ProductCards.js';
import { AbstractView } from '../AbstractView.js';
import RouterHelper from '../../utils/RouterHelper.js';
import { homeRoot } from './htmlData.js';

import AllListener from '../../components/Listeners/AllListener.js';

class Home extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
    this.productsView = new ProductCards();
    this.listener = new AllListener();
    this.currentFilters = RouterHelper.setFilter(this.params);
    this.minPrice = '';
    this.maxPrice = '';
    this.minStock = '';
    this.maxStock = '';
  }
  getCategoryProducts(data) {
    let keys = Object.keys(this.currentFilters);
    let productsList = data;
    keys.forEach((key) => {
      productsList = productsList.filter((item) => {
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
        } else if (key === 'sort') {
          return item;
        } else if (key === 'view') {
          return item;
        }
        return this.currentFilters[key].includes(
          item[key].split(' ').join('-').toLowerCase()
        );
      });
      if (key === 'sort') {
        this.sortData(productsList);
      }
    });
    return productsList;
  }
  afterRootRender(data) {
    const productsList = this.getCategoryProducts(data.products);
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
    this.listener.listenDynamicData(
      this.minPrice ? this.minPrice : minPrice,
      this.maxPrice ? this.maxPrice : maxPrice,
      this.minStock ? this.minStock : minStock,
      this.maxStock ? this.maxStock : maxStock,
      productsList.length,
      productsList
    );
  }

  render(root, data) {
    const categories = new Set(data.products.map((item) => item.category));
    const brands = new Set(
      data.products
        .filter((item) => !!item.title)
        .map((item) => item.brand.toLowerCase())
    );
    root.innerHTML = homeRoot;
    this.renderFilterData(categories, brands);
    this.listener.listenStaticData(data.products);
    this.afterRootRender(data);
  }

  renderFilterData(categories, brands) {
    const categoryContainer = document.querySelector('#category');
    const brandContainer = document.querySelector('#brand');
    categories.forEach((item) => {
      const div = document.createElement('div');
      div.innerHTML = `
  <input
    type="checkbox"
    id=${item.toLowerCase()}
    name="category"
    value=${item.toLowerCase()}
  /><label class="filters__box-label" for=${item.toLowerCase()}
    >${
      item[0].toUpperCase() + item.slice(1, item.length).toLowerCase()
    }</label>`;
      categoryContainer.append(div);
    });
    brands.forEach((item) => {
      const div = document.createElement('div');
      div.innerHTML = `
  <input
    type="checkbox"
    id=${item.toLowerCase()}
    name="brand"
    value=${item.split(' ').join('-')}
  /><label class="filters__box-label" for=${item.toLowerCase()}
    >${
      item[0].toUpperCase() + item.slice(1, item.length).toLowerCase()
    }</label>`;
      brandContainer.append(div);
    });
  }
  sortData(data) {
    switch (this.currentFilters['sort'][0]) {
      case 'price-asc':
        data = data.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        data = data.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'rating-asc':
        data = data.sort((a, b) => Number(a.rating) - Number(b.rating));
        break;
      case 'rating-desc':
        data = data.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      default:
        break;
    }
  }
}
export { Home };
