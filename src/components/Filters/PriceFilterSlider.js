const changeHash = (min, max) => {
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
};

function validateRange(minPrice, maxPrice) {
  const minPriceInput = document.querySelector('.min-price');
  const maxPriceInput = document.querySelector('.max-price');
  const minValue = document.getElementById('min-value');
  const maxValue = document.getElementById('max-value');
  minValue.innerHTML = '$' + minPrice;

  maxValue.innerHTML = '$' + maxPrice;
  minPriceInput.value = minPrice;
  maxPriceInput.value = maxPrice;
}

const listenPrice = (minPrice, maxPrice) => {
  validateRange(minPrice, maxPrice);
  const inputElements = document.querySelectorAll('input[type="range"]');
  inputElements.forEach((input) =>
    input.addEventListener('change', (e) => {
      const minPrice =
        parseInt(inputElements[0].value) < parseInt(inputElements[1].value)
          ? parseInt(inputElements[0].value)
          : parseInt(inputElements[1].value);
      const maxPrice =
        parseInt(inputElements[0].value) > parseInt(inputElements[1].value)
          ? parseInt(inputElements[0].value)
          : parseInt(inputElements[1].value);
      validateRange(minPrice, maxPrice);
      changeHash(minPrice, maxPrice);
    })
  );
};

const getMinMaxPrice = () => {
  const minValue = document.getElementById('min-value');
  const maxValue = document.getElementById('max-value');
  return {
    min: Number(minValue.textContent.slice(1)),
    max: Number(maxValue.textContent.slice(1)),
  };
};
export { listenPrice, getMinMaxPrice };
