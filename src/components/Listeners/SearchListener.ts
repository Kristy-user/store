import RouterHelper from '../../utils/RouterHelper';

export default class Search {
  listenSearch(): void {
    const currentFilters = RouterHelper.setFilter(location.hash);
    const inputSearch: HTMLInputElement | null =
      document.querySelector('.search__input');
    if (currentFilters.search && inputSearch) {
      inputSearch.value = currentFilters.search[0] as string;
    }
    if (inputSearch) {
      inputSearch.addEventListener('input', (e: Event) => {
        e.preventDefault();
        if (e.target instanceof HTMLInputElement) {
          this.changeHash(e.target.value.toLowerCase());
        }
      });
    }
  }
  changeHash(text: string): void {
    const currentHash: string = location.hash;
    if (!currentHash || currentHash.slice(3, 9) === 'search') {
      text.length > 0
        ? (window.location.hash = `#?/search=${text}`)
        : (window.location.hash = '');
    } else {
      const hash: string = text.length > 0 ? `&search=${text}` : '';
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 6) !== 'search')
        .join('&')}${hash}`;
    }
  }
}
