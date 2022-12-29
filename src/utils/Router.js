import { ProductDetails } from '../pages/ProductDetails/ProductDetails';
import Error from '../pages/404/404';
import { Cart } from '../pages/Basket/Cart';
import { Home } from '../pages/Home/Home';
import { data } from '../index.js';

class Router {
  constructor() {
    this.root = document.querySelector('#root');
  }
  async router() {
    const routes = [
      { path: '/', view: Home },
      { path: '#product-details', view: ProductDetails },
      { path: '#?', view: Home },
      { path: '#cart', view: Cart },
    ];
    const currentProducts = await data;
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
    const productList = document.querySelector('.products-items');
    const view =
      pathInd >= 0 ? new routes[pathInd].view(hash) : new Error(hash);
    if ((pathInd === 0 || pathInd === 2) && hash.length > 3 && productList) {
      productList.innerHTML = '';
      await view.afterRootRender(currentProducts);
    } else {
      this.root.innerHTML = '';
      await view.render(this.root, currentProducts);
    }
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.router();
  }
}
export default Router;
