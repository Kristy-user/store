import IData, { IProduct } from '../interfaces/data';
import { Cart } from '../pages/Basket/Cart';
import RouterHelper from '../utils/RouterHelper';
import Storage from '../utils/Storage';

export default class CartComponent {
  private storage: Storage;
  public cartData: IProduct[] | string[];
  constructor() {
    this.storage = new Storage('cart');
    this.cartData = this.storage.get('inCart') || [];
  }
  listenCart(allData: IData['products']): void {
    this.setCurrentAmountHeader();
    const allProducts: HTMLElement | null =
      document.querySelector('.products-items');
    const productDetail: HTMLElement | null =
      document.querySelector('.product-wrapper');
    const currentContent = allProducts ? allProducts : productDetail;
    if (currentContent) {
      currentContent.addEventListener('click', (e: Event) => {
        this.cartData = this.storage.get('inCart') || [];
        const currentId =
          e.target instanceof HTMLElement ? Number(e.target.id) : '';
        const checkedProduct = allData.find((item) => item.id === currentId);
        if (
          checkedProduct &&
          e.target instanceof HTMLElement &&
          e.target.className === 'card__buttons-add'
        ) {
          checkedProduct.count = 1;
          (this.cartData as IProduct[]).push(checkedProduct);
          this.storage.set('inCart', this.cartData);
          this.toggleButton(e.target, e.target.id, 'Remove from cart');
        } else if (
          e.target instanceof HTMLButtonElement &&
          e.target.className === 'card__buttons-remove' &&
          checkedProduct
        ) {
          checkedProduct.count = 0;
          const id = e.target.id;
          const newData = (this.cartData as IProduct[]).filter(
            (item: IProduct) => String(item.id) !== id
          );
          this.storage.set('inCart', newData);
          this.toggleButton(e.target, e.target.id, 'Add to cart');
        }
        this.setCurrentAmountHeader();
      });
    }
  }

  listenCount() {
    const cartList: HTMLElement | null = document.querySelector('.basket-list');
    if (cartList) {
      cartList.addEventListener('click', (e: Event) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains('basket-item-add')
        ) {
          const closestEl: HTMLDivElement | null = e.target.closest('div');
          if (closestEl) {
            const currentId = Number(closestEl.id);
            (this.cartData as IProduct[]).forEach((item) =>
              item.id === currentId &&
              item.count &&
              item.stock >= item.count + 1
                ? (item.count += 1)
                : item
            );
          }
          this.storage.set('inCart', this.cartData);
        } else if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains('basket-item-remove')
        ) {
          const closestEl: HTMLDivElement | null = e.target.closest('div');
          if (closestEl) {
            const currentId = Number(closestEl.id);
            (this.cartData as IProduct[]).forEach((item) => {
              if (item.id === currentId && item.count && item.count > 1) {
                item.count -= 1;
                this.storage.set('inCart', this.cartData);
              } else if (item.id === currentId && item.count === 1) {
                const newData = (this.cartData as IProduct[]).filter(
                  (prod) => prod.id !== item.id
                );
                this.storage.set('inCart', newData);
              }
            });
          }
        }
        const view: Cart = new Cart('#cart');
        const root: HTMLElement | null = document.querySelector('#root');
        root ? view.render(root) : null;
      });
    }
    const totalAmount: HTMLElement | null =
      document.querySelector('.buy__total-amount');
    if (totalAmount) {
      totalAmount.textContent = `$ ${this.getTotalAmount()}.00`;
    }
    this.setCurrentAmountHeader();
  }
  setCurrentAmountHeader(): void {
    const totalAmount = this.getTotalAmount() || 0;
    const amountEl: HTMLElement | null = document.querySelector('#totalAmount');
    if (amountEl) {
      amountEl.textContent = totalAmount
        ? `Total: $ ${totalAmount}`
        : 'Total: $ 0';
    }
    this.setProductsInCart();
  }
  setProductsInCart(): void {
    const cartHeader: HTMLElement | null =
      document.querySelector('.basket-count');
    const basketAmount: HTMLElement | null =
      document.querySelector('.basket-amount');
    const productInCart =
      this.cartData && this.cartData.length > 0
        ? (this.cartData as IProduct[])
            .map((item) => item.count)
            .reduce((a, b) => {
              if (a && b) {
                return a + b;
              }
            })
        : 0;
    if (productInCart && productInCart > 0 && cartHeader) {
      cartHeader.style.display = 'block';
      cartHeader.textContent = `${productInCart}`;
      basketAmount
        ? (basketAmount.textContent = `Products: ${productInCart}`)
        : null;
    } else {
      cartHeader ? (cartHeader.style.display = 'none') : null;
    }
  }
  listenCardDetails(): void {
    const productsList: HTMLElement | null =
      document.querySelector('.basket-list');
    if (productsList) {
      productsList.addEventListener('click', (e) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains('basket-item-photo')
        ) {
          const id = e.target.id;
          window.location.hash = `#product-details/${id}`;
        }
      });
    }
  }
  getTotalAmount(): number | undefined {
    this.cartData = this.storage.get('inCart') || [];
    const totalAmount: number | undefined =
      this.cartData && this.cartData.length > 0
        ? (this.cartData as IProduct[])
            .map((item) => {
              if (item.count) {
                return item.price * item.count;
              }
            })
            .reduce((prev, curr) => {
              if (prev && curr) {
                return prev + curr;
              }
            })
        : 0;
    return totalAmount;
  }
  getCart(): string[] | IProduct[] {
    return this.storage.get('inCart') ? this.storage.get('inCart') : [];
  }
  toggleButton(target: HTMLElement, id: string, text: string) {
    const addedItem: HTMLElement | null = document.querySelector(
      `.card__item.id-${id}`
    );
    target.textContent = `${text}`;
    target.classList.toggle('card__buttons-remove');
    target.classList.toggle('card__buttons-add');
    addedItem ? addedItem.classList.toggle('in-cart') : null;
  }
  pagination(): void {
    const currentLimit =
      this.storage.get('limit') && this.storage.get('limit')[0]
        ? this.storage.get('limit')[0]
        : 4;
    let currentPage =
      this.storage.get('page') && this.storage.get('page')[0]
        ? this.storage.get('page')[0]
        : 1;
    const limitElement: HTMLElement | null =
      document.querySelector('.pagination-limit');
    if (limitElement) {
      limitElement.innerHTML = `<label for="limit">Limit: </label>
        <input id="limit" type="number" value="4" min="1"/>`;
    }

    const inputLimit: HTMLInputElement | null =
      document.querySelector('#limit');
    const paginator: HTMLElement | null = document.querySelector('.pagination');
    if (inputLimit && paginator) {
      inputLimit.value = `${currentLimit}`;
      const countItems = this.getCart().length;
      const itemsOnPage = inputLimit.value;
      const countPages: number = Math.ceil(countItems / Number(itemsOnPage));
      if (countPages < currentPage) {
        currentPage = String(countPages);
        this.storage.set('page', [currentPage]);
      }
      let page: string = '';
      for (let i = 0; i < countPages; i++) {
        page += `<div id="page${i + 1}">${i + 1}</div>`;
      }
      paginator.innerHTML = page;
      const prev: string =
        currentPage > 1
          ? `<div class="prev"><</div>`
          : `<div class="prev0"><</div>`;
      const next: string =
        currentPage < countPages
          ? `<div class="next">></div> `
          : `<div class="next-last">></div>`;
      paginator.insertAdjacentHTML('afterbegin', prev);
      paginator.insertAdjacentHTML('beforeend', next);
      const currentPageEl: HTMLElement | null = paginator.querySelector(
        `#page${currentPage}`
      );
      if (currentPageEl) {
        currentPageEl.classList.add('active');
      }
      paginator.addEventListener('click', (e: Event) => {
        if (
          e.target instanceof HTMLElement &&
          !e.target.classList.contains('prev0') &&
          !e.target.classList.contains('next-last')
        ) {
          if (e.target.id) {
            paginator
              .querySelectorAll('div')
              .forEach((item) => item.classList.remove('active'));
            e.target.classList.add('active');
            const checkedPage: string = e.target.textContent || '';
            this.checkPage(checkedPage);
          } else if (e.target.classList.contains('prev')) {
            const page: number = Number(currentPage) - 1;
            this.checkPage(String(page));
          } else if (e.target.classList.contains('next')) {
            const page: number = Number(currentPage) + 1;
            this.checkPage(String(page));
          }
        }
      });
      inputLimit.addEventListener('input', (e) => {
        if (e.target instanceof HTMLInputElement) {
          this.storage.set('limit', [e.target.value]);

          const currentFilters = RouterHelper.setFilter(location.hash);
          const prevHash: string = location.hash.includes('page')
            ? `page=${currentFilters.page[0]}&`
            : '';
          window.location.hash = `#cart/?${prevHash}limit=${e.target.value}`;
        }
      });
    }
  }
  checkPage(page: string): void {
    const currentFilters = RouterHelper.setFilter(location.hash);
    this.storage.set('page', [page]);
    const prevHash: string = location.hash.includes('limit')
      ? `limit=${currentFilters.limit[0]}&`
      : '';
    window.location.hash = `#cart/?${prevHash}page=${page}`;
  }
  clearStorage(): void {
    ['limit', 'page'].forEach((item: string) => this.storage.drop(item));
  }
}
