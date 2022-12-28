class ProductCards {
  draw(data) {
    const products = data;
    const shopInfo = JSON.parse(localStorage.getItem('cart'));
    const inCart = shopInfo && shopInfo.inCart ? shopInfo.inCart : [];
    const cartId = inCart.map((item) => item.id);
    const fragment = document.createDocumentFragment();
    const cardItemTemp = document.querySelector('#cardTemplate');
    if (products.length > 0) {
      products.forEach((item, idx) => {
        const cardClone = cardItemTemp.content.cloneNode(true);

        cardClone.children[0].classList.add(`id-${item.id}`);
        cardClone.querySelector('.card__body-photo').src = item.thumbnail;
        cardClone.querySelector('.card__body-title').textContent =
          item.title.length > 15 ? item.title.slice(0, 15) + '..' : item.title;
        cardClone.querySelector(
          '.list__item-brand'
        ).textContent = `${item.brand}`;
        cardClone.querySelector(
          '.list__item-price'
        ).textContent = `${item.price} $`;
        cardClone.querySelector(
          '.list__item-rating'
        ).innerHTML = `Rating: <strong>${item.rating}</strong>`;
        cardClone.querySelector('.card__buttons-add').id = `${item.id}`;
        cardClone.querySelector(
          '.card__link-details'
        ).href = `#product-details/${item.id}`;
        if (cartId.includes(item.id)) {
          cardClone.children[0].classList.add('in-cart');
          const button = cardClone.querySelector('.card__buttons-add');
          button.classList.remove('card__buttons-add');
          button.classList.add('card__buttons-remove');
          button.textContent = 'Remove from cart';
        }
        fragment.append(cardClone);
      });
      return fragment;
    } else return null;
  }
}
export default ProductCards;
