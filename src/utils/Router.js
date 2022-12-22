import { ProductsFilter } from '../pages/ProductsFilter/ProductsFilter';
import { Home } from '../pages/Home/Home.js';
import { ProductDetails } from '../pages/ProductDetails/ProductDetails';
import Error from '../pages/404/404';
import { Cart } from '../pages/Basket/Cart';

class Router {
  constructor() {
    this.root = document.querySelector('#root');
  }
  router() {
    const routes = [
      { path: '/', view: Home },
      { path: '#product-details', view: ProductDetails },
      { path: '#?', view: ProductsFilter },
      { path: '#cart', view: Cart },
    ];
    const hash = location.hash.toLocaleLowerCase() || '/';

    const isAppRoute = () => {
      if (hash === '/') {
        return 0;
      } else {
        const hashStart = hash.split('/').slice(0, 1).join('');
        let matchInd;
        routes.forEach((route, i) => {
          if (route.path.startsWith(hashStart)) {
            matchInd = i;
          }
        });
        return matchInd;
      }
    };
    const pathInd = isAppRoute();
    const view =
      pathInd >= 0 ? new routes[pathInd].view(hash) : new Error(hash);
    if ((pathInd === 0 || pathInd === 2) && hash.length > 3 && root.innerHTML) {
      document.querySelector('.products-items').innerHTML = '';
      view.afterRootRender();
    } else {
      this.root.innerHTML = '';
      view.render(this.root);
    }
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.router();
  }
}
export default Router;
