import { AbstractView } from './AbstractView';

class Error extends AbstractView {
  constructor(params) {
    super(params);
  }
  render(root) {
    console.log(this.params);
    const div = document.createElement('div');
    div.classList.add('error-page');
    const errorWrapper = document.createElement('div');
    errorWrapper.textContent = `404`;
    div.append(errorWrapper);
    root.append(div);
  }
}
export default Error;
