class AbstractView {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  async render() {
    return '';
  }
  async executeViewScript() {} // !!! The fix
}
export { AbstractView };
