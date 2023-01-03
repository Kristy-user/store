import Storage from '../../utils/Storage';
import RouterHelper from '../../utils/RouterHelper';
import IFilters from '../../utils/interface';

const enum Filters {
  Category = 'category',
  Brand = 'brand',
  Price = 'price',
  Stock = 'stock',
}

class FilterListener {
  private filters: string[];
  private storage: Storage;

  constructor() {
    this.filters = [
      Filters.Category,
      Filters.Brand,
      Filters.Price,
      Filters.Stock,
    ];
    this.storage = new Storage('shop');
  }
  listen = (): void => {
    this.addChecked();
    const filtersBox: HTMLElement | null =
      document.querySelector('.filters__box');
    if (filtersBox) {
      filtersBox.addEventListener('change', (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
          if (this.filters.includes(e.target.name)) {
            const allCheckedInputs: NodeListOf<HTMLInputElement> =
              document.querySelectorAll(`[name=${e.target.name}]:checked`);
            const checkedValues: string[] = [];
            allCheckedInputs.forEach((name) => {
              checkedValues.push(name.value);
            });

            this.storage.set(`${e.target.name}`, checkedValues);
            const currentFilters: IFilters = this.storage.getAll();
            let hash: string = `#?/`;
            const currentHash: string = window.location.hash;
            const hashToAdd: string[] = currentHash
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
        }
      });
    }
    const buttonRemove: HTMLButtonElement | null =
      document.querySelector('#remove');
    if (buttonRemove) {
      buttonRemove.addEventListener('click', (e: Event) => {
        if (e.target instanceof HTMLElement) {
          const closestEl: HTMLDivElement | null = e.target.closest('div');
          if (closestEl && closestEl.id === 'remove') {
            this.clearFilters();
            window.location.hash = '';
          }
        }
      });
    }
  };
  addChecked = (): void => {
    let currentFilters: IFilters = RouterHelper.setFilter(location.hash);
    this.filters.forEach((filter) => {
      if (currentFilters[filter]) {
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(
          `[name=${filter}]`
        );
        inputs.forEach((input) => {
          if (currentFilters[filter].includes(input.value)) {
            input.checked = true;
          }
        });
      }
    });
  };
  clearFilters(): void {
    this.filters.forEach((filter) => this.storage.drop(filter));
    const allCheckedInputs: NodeListOf<HTMLInputElement> =
      document.querySelectorAll(`[type="checkbox"]:checked`);
    allCheckedInputs.forEach((input) => (input.checked = false));
  }
}
export default FilterListener;
