import IData from '../interfaces/data';
import ICart from '../interfaces/storage';

class ProductCards {
  draw(data: IData['products']): DocumentFragment | null {
    const products = data;
    const cartInStorage: string | null = localStorage.getItem('cart');
    let shopInfo: ICart = {};
    if (cartInStorage) {
      shopInfo = JSON.parse(cartInStorage);
    }
    const inCart = shopInfo && shopInfo.inCart ? shopInfo.inCart : [];
    const cartId: number[] = inCart.map((item) => item.id);
    const fragment: DocumentFragment = document.createDocumentFragment();
    const cardItemTemp: HTMLTemplateElement | null =
      document.querySelector('#cardTemplate');
    if (products.length > 0 && cardItemTemp) {
      products.forEach((item, idx) => {
        const cardClone = cardItemTemp.content.cloneNode(true) as HTMLElement;
        cardClone.children[0].classList.add(`id-${item.id}`);
        const imgEl: HTMLImageElement | null =
          cardClone.querySelector('.card__body-photo');
        if (imgEl) {
          imgEl.src = item.thumbnail;
        }
        const titleEl: null | HTMLTitleElement =
          cardClone.querySelector('.card__body-title');
        if (titleEl) {
          titleEl.textContent = item.title;
        }
        const brandEl: HTMLElement | null =
          cardClone.querySelector('.list__item-brand');
        if (brandEl) {
          brandEl.textContent = `${item.brand}`;
        }
        const priceEl: HTMLElement | null =
          cardClone.querySelector('.list__item-price');
        if (priceEl) {
          priceEl.textContent = `${item.price} $`;
        }
        const ratingEl: HTMLElement | null =
          cardClone.querySelector('.list__item-rating');
        if (ratingEl) {
          ratingEl.innerHTML = `Rating: <strong>${item.rating}</strong>`;
        }
        const buttonAdd: HTMLButtonElement | null =
          cardClone.querySelector('.card__buttons-add');
        if (buttonAdd) {
          buttonAdd.id = `${item.id}`;
        }
        const linkEl: HTMLLinkElement | null = cardClone.querySelector(
          '.card__link-details'
        );
        if (linkEl) {
          linkEl.href = `#product-details/${item.id}`;
        }

        if (cartId.includes(item.id)) {
          cardClone.children[0].classList.add('in-cart');
          const button: HTMLButtonElement | null =
            cardClone.querySelector('.card__buttons-add');
          if (button) {
            button.classList.remove('card__buttons-add');
            button.classList.add('card__buttons-remove');
            button.textContent = 'Remove from cart';
          }
        }

        fragment.append(cardClone);
      });

      return fragment;
    } else return null;
  }
}
export default ProductCards;
