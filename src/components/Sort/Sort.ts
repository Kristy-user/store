import { IProduct } from '../../interfaces/data';
import IFilters from '../../interfaces/filters';
import RouterHelper from '../../utils/RouterHelper';

export default class Sort {
  private currentFilters: IFilters;
  constructor() {
    this.currentFilters = RouterHelper.setFilter(location.hash);
  }
  listen(count: number): void {
    this.listenSort();
    this.listenFound(count);
    this.listenView();
  }
  listenSort(): void {
    const inputSort: HTMLElement | null = document.getElementById('input');
    const currentSort: string | IProduct = this.currentFilters['sort']
      ? this.currentFilters['sort'][0]
      : '';
    if (currentSort) {
      const currentSortEl = document.querySelector(`#${currentSort}`);
      currentSortEl ? currentSortEl.classList.add('selected') : null;
      if (inputSort instanceof HTMLInputElement) {
        const selectedSort: HTMLElement | null = document.querySelector(
          `#${currentSort}.selected`
        );
        if (selectedSort) {
          const sortValue = selectedSort.textContent;
          sortValue ? (inputSort.value = sortValue) : null;
        }
      }
    }

    const selectContainer: HTMLElement | null =
      document.querySelector('.sort-bar');
    const select: HTMLElement | null = document.querySelector('.select');
    const options: NodeListOf<HTMLElement> =
      document.querySelectorAll('.sort-bar .option');
    const root: HTMLElement | null = document.querySelector('#root');
    let checkedSort: string = '';
    if (select && selectContainer && root) {
      select.addEventListener('click', () => {
        selectContainer.classList.add('active');
      });
      selectContainer.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          const closestTarget: HTMLDivElement | null = e.target.closest('div');
          if (
            e.target.classList.contains('option') ||
            (closestTarget && closestTarget.classList.contains('option'))
          ) {
            const value: HTMLDivElement | null = e.target.closest('div');
            options.forEach((option) => {
              option.classList.remove('selected');
              if (value && inputSort instanceof HTMLInputElement) {
                value.classList.add('selected');
                const sortValue = value.children[0].textContent;
                sortValue ? (inputSort.value = sortValue) : null;
              }
              selectContainer.classList.remove('active');
            });
            value ? (checkedSort = value.id) : null;
            this.changeHash('sort', checkedSort);
          }
        }
      });
      root.addEventListener('click', (e) => {
        const sortBar: HTMLElement | null =
          document.querySelector('.sort-bar.active');
        if (e.target instanceof HTMLElement) {
          const targetClosest = e.target.closest('div');
          if (
            targetClosest &&
            !targetClosest.classList.contains('select') &&
            sortBar
          ) {
            selectContainer.classList.remove('active');
          }
        }
      });
    }
  }
  changeHash(property: string, value: string): void {
    const currentHash: string = location.hash;
    if (!currentHash || currentHash.slice(3, 7) === `${property}`) {
      value.length > 0
        ? (window.location.hash = `#?/${property}=${value}`)
        : (window.location.hash = '');
    } else {
      const hash: string = value.length > 0 ? `&${property}=${value}` : '';
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 4) !== `${property}`)
        .join('&')}${hash}`;
    }
  }
  listenFound(count: number): void {
    const statElement: HTMLElement | null =
      document.querySelector('.stat-count');
    statElement ? (statElement.textContent = `${count}`) : null;
  }
  listenView(): void {
    const viewMode: HTMLElement | null = document.querySelector('.view-mode');
    const productContainer: HTMLElement | null =
      document.querySelector('.products-items');
    const currentView = this.currentFilters['view']
      ? this.currentFilters['view'][0]
      : '';
    if (currentView) {
      const viewCurrent: HTMLElement | null =
        document.querySelector('.view-mode .active');
      viewCurrent ? viewCurrent.classList.remove('active') : null;
      const currentViewEl = document.querySelector(`.${currentView}`);
      currentViewEl ? currentViewEl.classList.add('active') : null;
      if (productContainer) {
        currentView === 'two'
          ? productContainer.classList.add('big')
          : productContainer.classList.remove('big');
      }
    }

    viewMode
      ? viewMode.addEventListener('click', (e) => {
          if (e.target instanceof HTMLElement) {
            if (e.target.classList.contains('active')) {
              this.changeHash('view', e.target.classList[0]);
            } else {
              const viewCurrent: HTMLElement | null =
                document.querySelector('.view-mode .active');
              viewCurrent ? viewCurrent.classList.remove('active') : null;

              e.target.classList.add('active');
              if (productContainer) {
                e.target.classList.contains('two')
                  ? productContainer.classList.add('big')
                  : productContainer.classList.remove('big');
              }
              this.changeHash('view', e.target.classList[0]);
            }
          }
        })
      : null;
  }
}
