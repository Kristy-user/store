import { Home } from '../pages/Home';
import { ProductDetails } from '../pages/productDetails';
import { getParams, pathToRegex } from './routerHelpers';

class Router {
  async router() {
    const routes = [
      { path: '/', view: Home },
      { path: '/product-details/:id', view: ProductDetails },
    ];
    const potentialMatches = routes.map((route) => {
      const hash = location.hash.slice(1).toLocaleLowerCase() || '/';
      return {
        route: route,
        result: hash.match(pathToRegex(route.path)),
      };
    });
    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.result !== null
    );
    if (!match) {
      match = {
        route: routes[0],
        result: [location.pathname],
      };
    }
    const view = new match.route.view(getParams(match));
    const root = document.querySelector('#root');
    root.innerHTML = await view.render();
    await view.executeViewScript();
  }

  navigateTo(url) {
    history.pushState(null, null, url);
    this.router();
  }
}
export default Router;
