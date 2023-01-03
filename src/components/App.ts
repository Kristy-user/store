import Router from '../utils/Router';
import Header from '../components/Header';

export default class App {
  start(): void {
    const routing = new Router('https://dummyjson.com/products?limit=100');
    window.addEventListener('popstate', routing.router);
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener('click', (e: Event) => {
        const { target } = e;
        if (
          target instanceof HTMLLinkElement &&
          target.matches('[data-link]')
        ) {
          e.preventDefault();
          routing.navigateTo(target.href);
        }
      });
      routing.router();
      Header.listener();
    });
  }
}
