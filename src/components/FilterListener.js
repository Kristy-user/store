import Storage from '../utils/Storage';

export const filters = ['category', 'brand', 'price', 'stock'];

class FilterListener {
  constructor() {
    this.storage = new Storage('shop');
  }
  listen = () => {
    const filtersBox = document.querySelector('.filters__box');
    filters.forEach((filter) => {
      const currentCheckedCategories = this.storage.get(`${filter}`) || [];
      if (currentCheckedCategories.length > 0) {
        this.addChecked(currentCheckedCategories, filter);
      }
    });
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
  };
  addChecked = (checkedCategory, filter) => {
    const inputs = document.querySelectorAll(`[name=${filter}]`);
    inputs.forEach((input) => {
      if (checkedCategory.includes(input.value)) {
        input.checked = true;
      }
    });
  };
}
export default FilterListener;
