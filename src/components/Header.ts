export default class Header {
  static listener() {
    const header = document.querySelector('header');
    header.addEventListener('click', (e) => {
      if (e.target.classList.contains('header', 'basket')) {
        window.location.hash = '#cart';
      }
      if (e.target.classList.contains('logo')) {
        window.location.hash = '';
      }
    });
  }
}
