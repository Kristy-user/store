export default class Search {
  listenSearch() {
    document.querySelector('.search__input').addEventListener('input', (e) => {
      e.preventDefault();
      this.changeHash(e.target.value.toLowerCase());
    });
  }
  changeHash(text) {
    const currentHash = location.hash;
    if (!currentHash || currentHash.slice(3, 9) === 'search') {
      text.length > 0
        ? (window.location.hash = `#?/search=${text}`)
        : (window.location.hash = '');
    } else {
      const hash = text.length > 0 ? `&search=${text}` : '';
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 6) !== 'search')
        .join('&')}${hash}`;
    }
  }
}
