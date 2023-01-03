export default class StockFilterListener {
  changeHash(min: number | string, max: number | string): void {
    const currentHash: string = location.hash;
    if (!currentHash || currentHash.slice(3, 8) === 'stock') {
      window.location.hash = `#?/stock=${min.toString()}+${max.toString()}`;
    } else {
      const hash: string = `&stock=${min.toString()}+${max.toString()}`;
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 5) !== 'stock')
        .join('&')}${hash}`;
    }
    this.validateRange(min, max);
  }

  validateRange(minStock: number | string, maxStock: number | string): void {
    const minStockInput: HTMLInputElement | null =
      document.querySelector('.min-stock');
    const maxStockInput: HTMLInputElement | null =
      document.querySelector('.max-stock');
    const minValue: HTMLElement | null =
      document.getElementById('min-value-stock');
    const maxValue: HTMLElement | null =
      document.getElementById('max-value-stock');
    if (minValue && maxValue && minStockInput && maxStockInput) {
      if (minStock === Infinity || minStock === -Infinity) {
        minValue.innerHTML = '—';
        maxValue.innerHTML = '—';
      } else {
        minValue.innerHTML = `${minStock}`;
        maxValue.innerHTML = `${maxStock}`;
      }

      minStockInput.value = `${minStock}`;
      maxStockInput.value = `${maxStock}`;
    }
  }

  listenStock(minStock: number | string, maxStock: number | string): void {
    this.validateRange(minStock, maxStock);
    const inputElements: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#stock input[type="range"]');
    inputElements.forEach((input) => {
      input.addEventListener('change', (e: Event) => {
        const minStock =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxStock =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minStock, maxStock);
      });
      input.addEventListener('input', (e: Event) => {
        const minStock =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxStock =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minStock, maxStock);
      });
    });
  }
}
