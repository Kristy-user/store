class ProductDetailsCard {
  draw(data) {
    const shopInfo = JSON.parse(localStorage.getItem('cart'));
    const inCart = shopInfo && shopInfo.inCart ? shopInfo.inCart : [];
    const cartId = inCart.map((item) => item.id);
    const fragment = document.createDocumentFragment();
    const cardItemTemp = document.querySelector('#productDetails');
    if (data.length === 1) {
      const product = data[0];
      const cardClone = cardItemTemp.content.cloneNode(true);
      cardClone.querySelector('.crumb-category').textContent = product.category;
      cardClone.querySelector(
        '.crumb-category'
      ).href = `#?/category=${product.category.toLowerCase()}`;
      cardClone.querySelector('.crumb-brand').textContent = product.brand;
      cardClone.querySelector(
        '.crumb-brand'
      ).href = `#?/brand=${product.brand.toLowerCase()}`;
      cardClone.querySelector('.crumb-title').textContent = product.title;
      cardClone.querySelector('.product-item').textContent = product.title;
      cardClone.querySelector('.img-one').src = product.thumbnail;
      cardClone.querySelector('.img-two').src = product.images[2];
      cardClone.querySelector('.img-three').src =
        product.images[3] || product.images[1];
      cardClone.querySelector('.img-main').src = product.thumbnail;
      cardClone.querySelector('.product-description-text').textContent =
        product.description;
      cardClone.querySelector('.product-rating-value').textContent =
        product.rating;
      cardClone.querySelector('.product-stock-value').textContent =
        product.stock;
      cardClone.querySelector('.product-brand-value').textContent =
        product.brand;
      cardClone.querySelector('.product-category-value').textContent =
        product.category;
      cardClone.querySelector(
        '.product-price'
      ).textContent = `Price: $${product.price}.00`;

      cardClone.querySelector('.card__buttons-add').id = `${product.id}`;
      if (cartId.includes(product.id)) {
        const button = cardClone.querySelector('.card__buttons-add');
        button.classList.remove('card__buttons-add');
        button.classList.add('card__buttons-remove');
        button.textContent = 'Remove from cart';
      }
      fragment.append(cardClone);
      return fragment;
    } else return null;
  }
}
export default ProductDetailsCard;
