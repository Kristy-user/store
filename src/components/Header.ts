export default class Header {
  static listener() {
    const header: HTMLElement | null = document.querySelector('header');
    header
      ? header.addEventListener('click', (e) => {
          if (e.target instanceof HTMLElement) {
            if (e.target.classList.contains('basket')) {
              window.location.hash = '#cart';
            }
            if (e.target.classList.contains('logo')) {
              window.location.hash = '';
            }
          }
        })
      : null;
  }
}
