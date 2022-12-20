import './styles/main.scss';
import ProductsData from './utils/ProductsData';
import Router from './utils/Router';

export const data = ProductsData.getData('https://dummyjson.com/products');
const routing = new Router();
localStorage.removeItem('shop');
window.addEventListener('popstate', routing.router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      routing.navigateTo(e.target.href);
    }
  });

  routing.router();
});
