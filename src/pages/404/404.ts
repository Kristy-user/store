import { AbstractView } from '../AbstractView';

class Error extends AbstractView {
  constructor(params: string) {
    super(params);
  }
  afterRootRender(): void {}
  render(root: HTMLElement) {
    const div: HTMLDivElement = document.createElement('div');
    div.classList.add('error-page');
    const errorWrapper: HTMLDivElement = document.createElement('div');
    errorWrapper.textContent = `404`;
    div.append(errorWrapper);
    root.append(div);
  }
}
export default Error;
