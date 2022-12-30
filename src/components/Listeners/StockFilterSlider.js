export default class StockFilterListener {
  changeHash(min, max) {
    const currentHash = location.hash;
    if (!currentHash || currentHash.slice(3, 8) === 'stock') {
      window.location.hash = `#?/stock=${min.toString()}+${max.toString()}`;
    } else {
      const hash = `&stock=${min.toString()}+${max.toString()}`;
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 5) !== 'stock')
        .join('&')}${hash}`;
    }
    this.validateRange(min, max);
  }

  validateRange(minStock, maxStock) {
    const minStockInput = document.querySelector('.min-stock');
    const maxStockInput = document.querySelector('.max-stock');
    const minValue = document.getElementById('min-value-stock');
    const maxValue = document.getElementById('max-value-stock');
    if (minStock === Infinity || minStock === -Infinity) {
      minValue.innerHTML = '—';
      maxValue.innerHTML = '—';
    } else {
      minValue.innerHTML = minStock;
      maxValue.innerHTML = maxStock;
    }

    minStockInput.value = minStock;
    maxStockInput.value = maxStock;
  }

  listenStock(minStock, maxStock) {
    this.validateRange(minStock, maxStock);
    const inputElements = document.querySelectorAll(
      '#stock input[type="range"]'
    );
    inputElements.forEach((input) => {
      input.addEventListener('change', (e) => {
        const minStock =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxStock =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minStock, maxStock, e.target.value);
      });
      input.addEventListener('input', (e) => {
        const minStock =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxStock =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minStock, maxStock, e.target.value);
      });
    });
  }
}
