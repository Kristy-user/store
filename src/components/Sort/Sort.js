export default class Sort {
  listen() {
    const selectContainer = document.querySelector('.sort-bar');
    const select = document.querySelector('.select');
    const input = document.getElementById('input');
    const options = document.querySelectorAll('.sort-bar .option');
    const sortContainer = document.querySelector('.option-container');
    const root = document.querySelector('#root');

    select.addEventListener('click', () =>
      selectContainer.classList.toggle('active')
    );

    sortContainer.addEventListener('click', (e) => {
      const value = e.target.closest('div');
      if (value.classList.contains('option')) {
        options.forEach((option) => {
          option.classList.remove('selected');
          value.classList.add('selected');
          input.value = value.children[0].textContent;
          selectContainer.classList.remove('active');
        });
      }
    });
    root.addEventListener('click', (e) => {
      const sortBar = document.querySelector('.sort-bar.active');
      if (!e.target.closest('div').classList.contains('select') && sortBar) {
        selectContainer.classList.remove('active');
      }
    });
  }
}
