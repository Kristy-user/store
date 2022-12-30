import CartComponent from '../CartComponent';
import Header from '../Header';
import Sort from '../Sort/Sort';
import FilterListener from './FilterListener';
import PriceFilterListener from './PriceFilterSlider';
import Search from './SearchListener';
import StockFilterListener from './StockFilterSlider';
import UrlCopyListener from './UrlCopyListener';

class AllListener {
  constructor() {
    this.search = new Search();
    this.price = new PriceFilterListener();
    this.stock = new StockFilterListener();
    this.sort = new Sort();
    this.filters = new FilterListener();
    this.cart = new CartComponent();
    this.copyUrl = new UrlCopyListener();
  }

  listenDynamicData = (minPrice, maxPrice, minStock, maxStock, count) => {
    this.price.listenPrice(minPrice, maxPrice);
    this.stock.listenStock(minStock, maxStock);
    this.sort.listen(count);
  };
  listenStaticData(data) {
    this.filters.listen();
    this.search.listenSearch();
    this.cart.listenCart(data);
    this.copyUrl.listen();
    Header.listener();
    if (location.hash < 1) {
      this.clearFilters();
    }
  }
  clearFilters() {
    this.filters.clearFilters();
  }
}
export default AllListener;
