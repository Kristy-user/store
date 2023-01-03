import IFilters from './interface';

class Storage {
  private store: string;
  private obj: IFilters;
  constructor(name: string) {
    this.store = name;
    this.obj = this.getAll();
  }
  set(key: string, value: []) {
    const data = this.obj;
    data[key] = value;
    const newData = JSON.stringify(data);
    localStorage.setItem(this.store, newData);
  }
  get(key: string) {
    return this.obj[key];
  }
  drop(key: string) {
    this.obj[key] && this.obj[key].length > 0
      ? (this.obj[key].length = 0)
      : this.obj[key];
    const data = this.obj;
    const newData = JSON.stringify(data);
    localStorage.setItem(this.store, newData);
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
