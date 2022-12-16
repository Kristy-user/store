import './styles/main.scss';
import Router from './utils/Router';

const routing = new Router();

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

const category = document.querySelector('.category');
category.addEventListener('change', (e) => {
  if (e.target.name === 'category') {
    window.location.hash = `/category=${e.target.value}`;
  }
});
