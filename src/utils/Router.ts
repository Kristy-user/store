import { ProductDetails } from '../pages/ProductDetails/ProductDetails';
import Error from '../pages/404/404';
import { Cart } from '../pages/Basket/Cart';
import { Home } from '../pages/Home/Home';

import ProductsData from './ProductsData';

export interface Path {
  path: string;
  view: typeof Home | typeof ProductDetails | typeof Cart | typeof Error;
}

class Router {
  private url: string;
  private root: HTMLElement | null;
  constructor(url: string) {
    this.url = url;
    this.root = document.querySelector('#root');
  }
  async router(): Promise<void> {
    const routes: Path[] = [
      { path: '/', view: Home },
      { path: '#product-details', view: ProductDetails },
      { path: '#?', view: Home },
      { path: '#cart', view: Cart },
    ];
    const data = ProductsData.getData(this.url);
    const currentProducts = await data;
    const hash: string = location.hash.toLocaleLowerCase() || '/';

    const isAppRoute = (): number | undefined => {
      if (hash === '/') {
        return 0;
      } else {
        const hashStart: string = hash.split('/').slice(0, 1).join('');
        let matchInd: number | undefined;
        routes.forEach((route, i) => {
          if (route.path.startsWith(hashStart)) {
            matchInd = i;
          }
        });
        return matchInd;
      }
    };
    const pathInd = isAppRoute();
    const productList: HTMLElement | null =
      document.querySelector('.products-items');
    const view =
      pathInd !== undefined && pathInd >= 0
        ? new routes[pathInd].view(hash)
        : new Error(hash);
    if (
      (pathInd === 0 || pathInd === 2) &&
      hash.length > 3 &&
      productList &&
      currentProducts.products.length > 0
    ) {
      productList.innerHTML = '';
      view.afterRootRender(currentProducts);
    } else {
      if (this.root && currentProducts.products.length > 0) {
        this.root.innerHTML = '';

        view.render(this.root, currentProducts);
      }
    }
  }

  navigateTo(url: string): void {
    history.pushState(null, '', url);
    this.router();
  }
}
export default Router;
