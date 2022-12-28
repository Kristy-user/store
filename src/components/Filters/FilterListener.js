import Storage from '../../utils/Storage';
import RouterHelper from '../../utils/RouterHelper';

class FilterListener {
  constructor() {
    this.filters = ['category', 'brand', 'price', 'stock'];
    this.storage = new Storage('shop');
    this.storageData = this.storage.getAll();
  }
  listen = () => {
    this.addChecked();
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

        window.location.hash = hash.length === 3 ? '' : hash;
      }
    });
    const buttonRemove = document.querySelector('#remove');
    buttonRemove.addEventListener('click', (e) => {
      if (e.target.closest('div').id === 'remove') {
        this.clearFilters();
        window.location.hash = '';
      }
    });
  };
  addChecked = () => {
    let currentFilters = RouterHelper.setFilter(location.hash);
    this.filters.forEach((filter) => {
      if (currentFilters[filter]) {
        const inputs = document.querySelectorAll(`[name=${filter}]`);
        inputs.forEach((input) => {
          if (currentFilters[filter].includes(input.value)) {
            input.checked = true;
          }
        });
      }
    });
  };
  clearFilters() {
    this.filters.forEach((filter) => this.storage.drop(filter));
    const allCheckedInputs = document.querySelectorAll(
      `[type="checkbox"]:checked`
    );
    allCheckedInputs.forEach((input) => (input.checked = false));
  }
}
export default FilterListener;
