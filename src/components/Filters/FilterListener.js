import Storage from '../../utils/Storage';
import PriceFilterListener, { listenPrice } from './PriceFilterSlider';
import Search from '../Filters/SearchListener';
import StockFilterListener from './StockFilterSlider';
import Sort from '../Sort/Sort';

class FilterListener {
  constructor() {
    this.filters = ['category', 'brand', 'price', 'stock'];
    this.storage = new Storage('shop');
    this.search = new Search();
    this.price = new PriceFilterListener();
    this.stock = new StockFilterListener();
    this.sort = new Sort();
  }
  listen = (minPrice, maxPrice, minStock, maxStock) => {
    const filtersBox = document.querySelector('.filters__box');
    filtersBox.addEventListener('change', (e) => {
      if (this.filters.includes(e.target.name)) {
        const allCheckedInputs = document.querySelectorAll(
          `[name=${e.target.name}]:checked`
        );
        const checkedValues = [];
        allCheckedInputs.forEach((name) => checkedValues.push(name.value));
        this.storage.set(`${e.target.name}`, checkedValues);
        const currentFilters = this.storage.getAll();
        let hash = `#?/`;
        const currentHash = window.location.hash;
        const hashToAdd = currentHash
          .slice(3, currentHash.length)
          .split('&')
          .filter(
            (item) =>
              item.slice(0, 5) === 'price' || item.slice(0, 5) === 'stock'
          );

        this.filters.forEach((item, i) => {
          if (currentFilters[item] && currentFilters[item].length > 0) {
            hash += `${
              i > 0 && hash.length > 3 ? '&' : ''
            }${item}=${currentFilters[item].join('+')}`;
          }
        });
        hashToAdd.forEach((item) => (hash += `&${item}`));
        hash[3] === '&' ? (hash = hash.replace('&', '')) : hash;
        return (window.location.hash = hash.length === 3 ? '' : hash);
      }
    });
    const buttonRemove = document.querySelector('#remove');
    buttonRemove.addEventListener('click', (e) => {
      if (e.target.closest('div').id === 'remove') {
        this.clearFilters();
        window.location.hash = '';
      }
    });
    this.search.listenSearch();
    this.price.listenPrice(minPrice, maxPrice);
    this.stock.listenStock(minStock, maxStock);
    this.sort.listen();
  };
  addChecked = () => {
    this.filters.forEach((filter) => {
      const currentCheckedCategories = this.storage.get(`${filter}`) || [];
      if (currentCheckedCategories.length > 0) {
        const inputs = document.querySelectorAll(`[name=${filter}]`);
        inputs.forEach((input) => {
          if (currentCheckedCategories.includes(input.value)) {
            input.checked = true;
          }
        });
      }
    });
  };
  clearFilters() {
    this.filters.forEach((filter) => this.storage.drop(filter));
  }
}
export default FilterListener;
