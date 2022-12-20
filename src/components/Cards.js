class Cards {
  draw(data) {
    const products = data;

    const fragment = document.createDocumentFragment();
    const cardItemTemp = document.querySelector('#cardTemplate');
    if (products.length > 0) {
      products.forEach((item, idx) => {
        const cardClone = cardItemTemp.content.cloneNode(true);
        cardClone.id = `${item.id}`;
        cardClone.querySelector(
          '.card__body-photo'
        ).style.backgroundImage = `url(${item.thumbnail})`;
        cardClone.querySelector('.card__body-title').textContent = item.title;
        cardClone.querySelector(
          '.list__item-category'
        ).textContent = `Category ${item.category}`;

        cardClone.querySelector(
          '.list__item-brand'
        ).textContent = `Brand: ${item.brand}`;
        cardClone.querySelector(
          '.list__item-price'
        ).textContent = `Price: ${item.price}`;
        cardClone.querySelector(
          '.list__item-rating'
        ).textContent = `Rating: ${item.rating}`;
        cardClone.querySelector(
          '.list__item-stock'
        ).textContent = `Stock: ${item.stock} `;
        cardClone.querySelector(
          '.card__link-details'
        ).href = `#product-details/${item.id}`;
        fragment.append(cardClone);
      });

      return fragment;
    } else return null;
  }
}
export default Cards;
