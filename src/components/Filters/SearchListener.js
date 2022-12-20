export default class Search {
  listenSearch(data) {
    document.querySelector('.search__input').addEventListener('input', (e) => {
      e.preventDefault();
      this.changeHash(e.target.value.toLowerCase(), data);
    });
  }
  changeHash(text) {
    const currentHash = location.hash;
    if (!currentHash || currentHash.slice(3, 9) === 'search') {
      window.location.hash = `#?/search=${text}`;
    } else {
      const hash = `&search=${text}`;
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 6) !== 'search')
        .join('&')}${hash}`;
    }
  }
}
