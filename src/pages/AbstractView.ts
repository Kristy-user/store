import IData from '../interfaces/data';

class AbstractView {
  public params: string;
  constructor(params: string) {
    this.params = params;
  }

  setTitle(title: string): void {
    document.title = title;
  }

  render(root: HTMLElement, data: IData): void {}
}
export { AbstractView };
