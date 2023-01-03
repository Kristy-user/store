import IData from '../interfaces/data';
import ICart from '../interfaces/storage';

class ProductDetailsCard {
  draw(data: IData['products']): DocumentFragment | null {
    const cartInStorage: string | null = localStorage.getItem('cart');
    let shopInfo: ICart = {};
    if (cartInStorage) {
      shopInfo = JSON.parse(cartInStorage);
    }
    const inCart = shopInfo && shopInfo.inCart ? shopInfo.inCart : [];
    const cartId: number[] = inCart.map((item) => item.id);
    const fragment: DocumentFragment = document.createDocumentFragment();
    const cardItemTemp: HTMLElement | null =
      document.querySelector('#productDetails');
    if (data.length === 1 && cardItemTemp instanceof HTMLTemplateElement) {
      const product = data[0];
      const cardClone = cardItemTemp.content.cloneNode(true) as HTMLElement;
      const crumbEl: HTMLLinkElement | null =
        cardClone.querySelector('.crumb-category');
      if (crumbEl) {
        crumbEl.textContent = product.category;
        crumbEl.href = `#?/category=${product.category.toLowerCase()}`;
      }
      const brandCrumb: HTMLLinkElement | null =
        cardClone.querySelector('.crumb-brand');
      if (brandCrumb) {
        brandCrumb.textContent = product.brand;
        brandCrumb.href = `#?/brand=${product.brand.toLowerCase()}`;
      }
      const titleCrumb: HTMLElement | null =
        cardClone.querySelector('.crumb-title');
      if (titleCrumb) {
        titleCrumb.textContent = product.title;
      }
      const titleEl: HTMLElement | null =
        cardClone.querySelector('.product-item');
      if (titleEl) {
        titleEl.textContent = product.title;
      }
      const imgEl: HTMLImageElement | null =
        cardClone.querySelector('.img-one');
      if (imgEl) {
        imgEl.src = product.thumbnail;
      }
      const imgElTwo: HTMLImageElement | null =
        cardClone.querySelector('.img-two');
      if (imgElTwo) {
        imgElTwo.src = product.images[1];
      }
      const imgElThree: HTMLImageElement | null =
        cardClone.querySelector('.img-three');
      if (imgElThree) {
        imgElThree.src = product.images[2] || product.images[0];
      }
      const imgMain: HTMLImageElement | null =
        cardClone.querySelector('.img-main');
      if (imgMain) {
        imgMain.src = product.thumbnail;
      }
      const descriptionEl: HTMLElement | null = cardClone.querySelector(
        '.product-description-text'
      );
      if (descriptionEl) {
        descriptionEl.textContent = product.description;
      }
      const ratingEl: HTMLElement | null = cardClone.querySelector(
        '.product-rating-value'
      );
      if (ratingEl) {
        ratingEl.textContent = `${product.rating}`;
      }
      const stockEl: HTMLElement | null = cardClone.querySelector(
        '.product-stock-value'
      );
      if (stockEl) {
        stockEl.textContent = `${product.stock}`;
      }
      const brandEl: HTMLElement | null = cardClone.querySelector(
        '.product-brand-value'
      );
      if (brandEl) {
        brandEl.textContent = product.brand;
      }
      const categoryEl: HTMLElement | null = cardClone.querySelector(
        '.product-category-value'
      );
      if (categoryEl) {
        categoryEl.textContent = product.category;
      }
      const priceEl: HTMLElement | null =
        cardClone.querySelector('.product-price');
      if (priceEl) {
        priceEl.textContent = `Price: $${product.price}.00`;
      }
      const buttonAdd: HTMLButtonElement | null =
        cardClone.querySelector('.card__buttons-add');
      if (buttonAdd) {
        buttonAdd.id = `${product.id}`;
      }
      if (cartId.includes(product.id) && buttonAdd) {
        buttonAdd.classList.remove('card__buttons-add');
        buttonAdd.classList.add('card__buttons-remove');
        buttonAdd.textContent = 'Remove from cart';
      }

      fragment.append(cardClone);
      return fragment;
    } else return null;
  }
}
export default ProductDetailsCard;
