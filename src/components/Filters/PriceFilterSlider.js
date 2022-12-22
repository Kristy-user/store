export default class PriceFilterListener {
  changeHash(min, max) {
    const currentHash = location.hash;
    if (!currentHash || currentHash.slice(3, 8) === 'price') {
      window.location.hash = `#?/price=${min.toString()}+${max.toString()}`;
    } else {
      const hash = `&price=${min.toString()}+${max.toString()}`;
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 5) !== 'price')
        .join('&')}${hash}`;
    }
    this.validateRange(min, max);
  }

  validateRange(minPrice, maxPrice) {
    const minPriceInput = document.querySelector('.min-price');
    const maxPriceInput = document.querySelector('.max-price');
    const minValue = document.getElementById('min-value-price');
    const maxValue = document.getElementById('max-value-price');
    if (minPrice === Infinity || minPrice === -Infinity) {
      minValue.innerHTML = '—';
      maxValue.innerHTML = '—';
    } else {
      minValue.innerHTML = '$' + minPrice;
      maxValue.innerHTML = '$' + maxPrice;
    }
    minPriceInput.value = minPrice;
    maxPriceInput.value = maxPrice;
  }

  listenPrice(minPrice, maxPrice) {
    this.validateRange(minPrice, maxPrice);
    const inputElements = document.querySelectorAll(
      '#price input[type="range"]'
    );
    inputElements.forEach((input) => {
      input.addEventListener('change', (e) => {
        const minPrice =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxPrice =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minPrice, maxPrice, e.target.value);
      });
      input.addEventListener('input', (e) => {
        const minPrice =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxPrice =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minPrice, maxPrice, e.target.value);
      });
    });
  }
}
