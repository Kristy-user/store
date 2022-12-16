import Storage from '../utils/Storage';

class FilterListener {
  constructor() {
    this.filter = new Storage('shop');
  }
  listen = () => {
    const category = document.querySelector('#category');
    const currentCheckedCategories = this.filter.get('category') || [];
    if (currentCheckedCategories.length > 0) {
      this.addChecked(currentCheckedCategories);
    }
    return category.addEventListener('change', (e) => {
      if (e.target.name === 'category') {
        const allCheckedInputs = document.querySelectorAll(
          "[name='category']:checked"
        );
        const hashCategory = [];
        allCheckedInputs.forEach((category) =>
          hashCategory.push(category.value)
        );
        this.filter.set('category', hashCategory);
        if (hashCategory.length > 0) {
          window.location.hash = `/category=${
            hashCategory.length > 1
              ? hashCategory.join('+')
              : hashCategory.join('')
          }`;
        } else window.location.hash = '';
      }
    });
  };
  addChecked = (checkedCategory) => {
    const inputs = document.querySelectorAll('[name="category"]');
    inputs.forEach((input) => {
      if (checkedCategory.includes(input.value)) {
        input.checked = true;
      }
    });
  };
}
export default FilterListener;
