class Storage {
  constructor(store) {
    this.store = store;
    this.obj = this.getAll();
  }
  set(key, value) {
    const data = this.obj;
    data[key] = value;
    const newData = JSON.stringify(data);
    localStorage.setItem(this.store, newData);
  }
  get(key) {
    return this.obj[key];
  }
  getAll() {
    const data = localStorage.getItem(this.store);
    return data ? JSON.parse(data) : {};
  }

  dropAll() {
    localStorage.clear();
  }
}
export default Storage;
