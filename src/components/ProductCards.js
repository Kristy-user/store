class ProductCards {
  draw(data) {
    console.log(data);
    const products = data;
    const fragment = document.createDocumentFragment();
    const cardItemTemp = document.querySelector('#cardTemplate');
    if (products.length > 0) {
      products.forEach((item, idx) => {
        const cardClone = cardItemTemp.content.cloneNode(true);
        // cardClone.querySelector(
        //   '.card__body-photo'
        // ).style.backgroundImage = `url(${item.thumbnail})`;
        cardClone.querySelector(
          '.card__body-photo'
        ).src = item.thumbnail;
        cardClone.querySelector('.card__body-title').textContent = item.title.length > 15
        ? item.title.slice(0, 15) + '..' : item.title;
        // cardClone.querySelector(
        //   '.list__item-category'
        // ).textContent = `Category ${item.category}`;
        cardClone.querySelector(
          '.list__item-brand'
        ).textContent = `${item.brand}`;
        cardClone.querySelector(
          '.list__item-price'
        ).textContent = `${item.price} $`;
        cardClone.querySelector(
          '.list__item-rating'
        ).innerHTML = `Rating: <strong>${item.rating}</strong>`;
        // cardClone.querySelector(
        //   '.list__item-stock'
        // ).textContent = `Stock: ${item.stock} `;
        cardClone.querySelector('.card__buttons-add').id = `${item.id}`;
        cardClone.querySelector(
          '.card__link-details'
        ).href = `#product-details/${item.id}`;
        fragment.append(cardClone);
      });
      return fragment;
    } else return null;
  }
}
export default ProductCards;
