import ProductCards from '../../components/ProductCards';
import { AbstractView } from '../AbstractView';
import RouterHelper from '../../utils/RouterHelper';
import { homeRoot } from './htmlData';
import AllListener from '../../components/Listeners/AllListener';
import CartComponent from '../../components/CartComponent';
import IData from '../../interfaces/data';
import IFilters from '../../interfaces/filters';
import Sort from '../../utils/Sort';

class Home extends AbstractView {
  private productsView: ProductCards;
  private listener: AllListener;
  private cart: CartComponent;
  private minPrice: number;
  private maxPrice: number;
  private minStock: number;
  private maxStock: number;
  private currentFilters: IFilters;

  constructor(params: string) {
    super(params);
    this.setTitle('Home');
    this.productsView = new ProductCards();
    this.listener = new AllListener();
    this.currentFilters = RouterHelper.setFilter(this.params);
    this.cart = new CartComponent();
    this.minPrice = 0;
    this.maxPrice = 0;
    this.minStock = 0;
    this.maxStock = 0;
  }
  getCategoryProducts(data: IData['products']) {
    let keys = Object.keys(this.currentFilters);
    let productsList = data;
    keys.forEach((key) => {
      productsList = productsList.filter((item) => {
        if (key === 'price' && this.currentFilters[key] != undefined) {
          this.minPrice = Number(this.currentFilters[key][0]);
          this.maxPrice = Number(this.currentFilters[key][1]);
          return (
            item.price >= Number(this.currentFilters[key][0]) &&
            item.price <= Number(this.currentFilters[key][1])
          );
        } else if (key === 'stock') {
          this.minStock = Number(this.currentFilters[key][0]);
          this.maxStock = Number(this.currentFilters[key][1]);
          return (
            item.stock >= Number(this.currentFilters[key][0]) &&
            item.stock <= Number(this.currentFilters[key][1])
          );
        } else if (key === 'search') {
          return (
            item.title
              .toLowerCase()
              .includes(String(this.currentFilters[key][0])) ||
            item.description
              .toLowerCase()
              .includes(String(this.currentFilters[key][0])) ||
            String(item.price) === this.currentFilters[key][0] ||
            String(item.count) === this.currentFilters[key][0]
          );
        } else if (key === 'sort') {
          return item;
        } else if (key === 'view') {
          return item;
        } else if (key === 'brand') {
          return (this.currentFilters[key] as string[]).includes(
            item[key].split(' ').join('-').toLowerCase()
          );
        } else if (key === 'category') {
          return (this.currentFilters[key] as string[]).includes(item[key]);
        }
      });
      if (key === 'sort') {
        this.sortData(productsList);
      }
    });
    return productsList;
  }
  afterRootRender(data: IData) {
    this.cart.clearStorage();
    const productsList: IData['products'] = this.getCategoryProducts(
      data.products
    );
    const productsElement = this.productsView.draw(productsList);

    const productListContainer: HTMLElement | null =
      document.querySelector('.products-items');
    if (productsElement) {
      if (productListContainer) {
        productListContainer.append(productsElement);
      }
    } else {
      const wrapper: HTMLElement | null = document.createElement('div');
      wrapper.classList.add('not__found');
      if (productListContainer) {
        productListContainer.append(wrapper);
      }
    }
    const maxPrice: number = Math.max(
      ...productsList.map((item) => item.price)
    );
    const minPrice: number = Math.min(
      ...productsList.map((item) => item.price)
    );
    const maxStock: number = Math.max(
      ...productsList.map((item) => item.stock)
    );
    const minStock: number = Math.min(
      ...productsList.map((item) => item.stock)
    );

    this.listener.listenDynamicData(
      this.minPrice ? this.minPrice : minPrice,
      this.maxPrice ? this.maxPrice : maxPrice,
      this.minStock ? this.minStock : minStock,
      this.maxStock ? this.maxStock : maxStock,
      productsList.length
    );
  }

  render(root: HTMLElement, data: IData): void {
    const categories: Set<string> = new Set(
      data.products.map((item) => item.category)
    );
    const brands: Set<string> = new Set(
      data.products.map((item) => item.brand.toLowerCase())
    );
    root.innerHTML = homeRoot;
    this.renderFilterData(categories, brands);
    this.listener.listenStaticData(data.products);
    this.afterRootRender(data);
  }

  renderFilterData(categories: Set<string>, brands: Set<string>) {
    const categoryContainer: HTMLElement | null =
      document.querySelector('#category');
    const brandContainer: HTMLElement | null = document.querySelector('#brand');
    categories.forEach((item) => {
      const div: HTMLElement | null = document.createElement('div');
      div.innerHTML = `
  <input
    type="checkbox"
    id=${item.toLowerCase()}
    name="category"
    value=${item.toLowerCase()}
  /><label class="filters__box-label" for=${item.toLowerCase()}
    >${
      item[0].toUpperCase() + item.slice(1, item.length).toLowerCase()
    }</label>`;
      if (categoryContainer) {
        categoryContainer.append(div);
      }
    });
    brands.forEach((item) => {
      const div = document.createElement('div');
      div.innerHTML = `
  <input
    type="checkbox"
    id=${item.toLowerCase()}
    name="brand"
    value=${item.split(' ').join('-')}
  /><label class="filters__box-label" for=${item.toLowerCase()}
    >${
      item[0].toUpperCase() + item.slice(1, item.length).toLowerCase()
    }</label>`;
      if (brandContainer) {
        brandContainer.append(div);
      }
    });
  }
  sortData(data: IData['products']): void {
    switch (this.currentFilters['sort'][0]) {
      case 'price-asc':
        data = Sort.directSort(data, 'price');
        break;
      case 'price-desc':
        data = Sort.reverseSort(data, 'price');
        break;
      case 'rating-asc':
        data = Sort.directSort(data, 'rating');
        break;
      case 'rating-desc':
        data = Sort.reverseSort(data, 'rating');
        break;
      default:
        break;
    }
  }
}
export { Home };
