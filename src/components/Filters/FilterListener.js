import Storage from '../../utils/Storage';
import PriceFilterListener, { listenPrice } from './PriceFilterSlider';
import Search from '../Filters/SearchListener';
export const filters = ['category', 'brand', 'price', 'stock'];

class FilterListener {
  constructor() {
    this.storage = new Storage('shop');
    this.search = new Search();
    this.price = new PriceFilterListener();
  }
  listen = (minPrice, maxPrice) => {
    const filtersBox = document.querySelector('.filters__box');
    filtersBox.addEventListener('change', (e) => {
      if (filters.includes(e.target.name)) {
        const allCheckedInputs = document.querySelectorAll(
          `[name=${e.target.name}]:checked`
        );
        const checkedValues = [];
        allCheckedInputs.forEach((name) => checkedValues.push(name.value));
        this.storage.set(`${e.target.name}`, checkedValues);
        const currentFilters = this.storage.getAll();
        let hash = `#?/`;
        filters.forEach((item, i) => {
          if (currentFilters[item] && currentFilters[item].length > 0) {
            hash += `${
              i > 0 && hash.length > 3 ? '&' : ''
            }${item}=${currentFilters[item].join('+')}`;
          }
        });
        return (window.location.hash = hash.length === 3 ? '' : hash);
      }
    });

    this.search.listenSearch();
    this.price.listenPrice(minPrice, maxPrice);
  };
  addChecked = () => {
    filters.forEach((filter) => {
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
}
export default FilterListener;
