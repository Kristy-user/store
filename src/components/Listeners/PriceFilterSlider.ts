export default class PriceFilterListener {
  changeHash(min: number, max: number): void {
    const currentHash: string = location.hash;
    if (!currentHash || currentHash.slice(3, 8) === 'price') {
      window.location.hash = `#?/price=${min.toString()}+${max.toString()}`;
    } else {
      const hash: string = `&price=${min.toString()}+${max.toString()}`;
      window.location.hash = `${currentHash
        .split('&')
        .filter((item) => item.slice(0, 5) !== 'price')
        .join('&')}${hash}`;
    }
    this.validateRange(min, max);
  }

  validateRange(minPrice: number, maxPrice: number): void {
    const minPriceInput: HTMLInputElement | null =
      document.querySelector('.min-price');
    const maxPriceInput: HTMLInputElement | null =
      document.querySelector('.max-price');
    const minValue: HTMLElement | null =
      document.getElementById('min-value-price');
    const maxValue: HTMLElement | null =
      document.getElementById('max-value-price');
    if (minPriceInput && maxPriceInput && minValue && maxValue) {
      if (minPrice === Infinity || minPrice === -Infinity) {
        minValue.innerHTML = '—';
        maxValue.innerHTML = '—';
      } else {
        minValue.innerHTML = '$' + minPrice;
        maxValue.innerHTML = '$' + maxPrice;
      }
      minPriceInput.value = `${minPrice}`;
      maxPriceInput.value = `${maxPrice}`;
    }
  }

  listenPrice(minPrice: number, maxPrice: number): void {
    this.validateRange(minPrice, maxPrice);
    const inputElements: NodeListOf<HTMLInputElement> =
      document.querySelectorAll('#price input[type="range"]');
    inputElements.forEach((input) => {
      input.addEventListener('change', (e: Event) => {
        const minPrice =
          parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        const maxPrice =
          parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
            ? parseInt(inputElements[0].value)
            : parseInt(inputElements[1].value);
        this.changeHash(minPrice, maxPrice);
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
        this.changeHash(minPrice, maxPrice);
      });
    });
  }
}
