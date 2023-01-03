import IData from '../../interfaces/data';
import CartComponent from '../CartComponent';
import Sort from '../Sort/Sort';
import FilterListener from './FilterListener';
import PriceFilterListener from './PriceFilterSlider';
import Search from './SearchListener';
import StockFilterListener from './StockFilterSlider';
import UrlCopyListener from './UrlCopyListener';

class AllListener {
  private search: Search;
  private price: PriceFilterListener;
  private stock: StockFilterListener;
  private sort: Sort;
  private filters: FilterListener;
  private cart: CartComponent;
  private copyUrl: UrlCopyListener;
  constructor() {
    this.search = new Search();
    this.price = new PriceFilterListener();
    this.stock = new StockFilterListener();
    this.sort = new Sort();
    this.filters = new FilterListener();
    this.cart = new CartComponent();
    this.copyUrl = new UrlCopyListener();
  }

  listenDynamicData = (
    minPrice: number,
    maxPrice: number,
    minStock: number,
    maxStock: number,
    count: number
  ): void => {
    this.price.listenPrice(minPrice, maxPrice);
    this.stock.listenStock(minStock, maxStock);
    this.sort.listen(count);
  };
  listenStaticData(data: IData['products']): void {
    this.filters.listen();
    this.search.listenSearch();
    this.cart.listenCart(data);
    this.copyUrl.listen();
    if (location.hash.length < 1) {
      this.clearFilters();
    }
  }
  clearFilters(): void {
    this.filters.clearFilters();
  }
}
export default AllListener;
