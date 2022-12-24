import RouterHelper from '../../utils/RouterHelper';

export default class Sort {
  constructor() {
    this.currentFilters = RouterHelper.setFilter(location.hash);
  }
  listen(count) {
    this.listenSort();
    this.listenFound(count);
    this.listenView();
  }
  listenSort() {
    const input = document.getElementById('input');
    const currentSort = this.currentFilters['sort']
      ? this.currentFilters['sort'][0]
      : '';
    if (currentSort) {
      document.querySelector(`#${currentSort}`).classList.add('selected');
      input.value = document.querySelector(
        `#${currentSort}.selected`
      ).textContent;
    }

    const selectContainer = document.querySelector('.sort-bar');
    const select = document.querySelector('.select');
    const options = document.querySelectorAll('.sort-bar .option');
    const root = document.querySelector('#root');
    let checkedSort = '';
    select.addEventListener('click', () => {
      selectContainer.classList.add('active');
    });
    selectContainer.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('option') ||
        e.target.closest('div').classList.contains('option')
      ) {
        const value = e.target.closest('div');
        options.forEach((option) => {
          option.classList.remove('selected');
          value.classList.add('selected');
          input.value = value.children[0].textContent;
          selectContainer.classList.remove('active');
        });
        checkedSort = value.id;
        this.changeHash('sort', checkedSort);
      }
    });
    root.addEventListener('click', (e) => {
      const sortBar = document.querySelector('.sort-bar.active');
      if (!e.target.closest('div').classList.contains('select') && sortBar) {
        selectContainer.classList.remove('active');
      }
    });
  }
  changeHash(property, value) {
    const currentHash = location.hash;
    if (!currentHash || currentHash.slice(3, 7) === `${property}`) {
      value.length > 0
        ? (window.location.hash = `#?/${property}=${value}`)
        : (window.location.hash = '');
    } else {
      const hash = value.length > 0 ? `&${property}=${value}` : '';
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 4) !== `${property}`)
        .join('&')}${hash}`;
    }
  }
  listenFound(count) {
    const statElement = document.querySelector('.stat-count');
    statElement.textContent = count;
  }
  listenView() {
    const viewMode = document.querySelector('.view-mode');
    const productContainer = document.querySelector('.products-items');

    const currentView = this.currentFilters['view']
      ? this.currentFilters['view'][0]
      : '';

    if (currentView) {
      const viewCurrent = document.querySelector('.view-mode .active');
      viewCurrent.classList.remove('active');
      document.querySelector(`.${currentView}`).classList.add('active');
      currentView === 'two'
        ? productContainer.classList.add('big')
        : productContainer.classList.remove('big');
    }

    viewMode.addEventListener('click', (e) => {
      if (e.target.classList.contains('active')) {
        this.changeHash('view', e.target.classList[0]);
      } else {
        const viewCurrent = document.querySelector('.view-mode .active');
        viewCurrent.classList.remove('active');

        e.target.classList.add('active');
        e.target.classList.contains('two')
          ? productContainer.classList.add('big')
          : productContainer.classList.remove('big');
        this.changeHash('view', e.target.classList[0]);
      }
    });
  }
}
