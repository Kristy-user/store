import { IProduct } from '../interfaces/data';
import IFilters from './interface';

class Storage {
  private store: string;
  private obj: IFilters;
  constructor(name: string) {
    this.store = name;
    this.obj = this.getAll();
  }
  set(key: string, value: IProduct[] | string[]): void {
    const data = this.obj;
    data[key] = value;
    const newData = JSON.stringify(data);
    localStorage.setItem(this.store, newData);
  }
  get(key: string): string[] | IProduct[] {
    return this.obj[key];
  }
  drop(key: string): void {
    this.obj[key] && this.obj[key].length > 0
      ? (this.obj[key].length = 0)
      : this.obj[key];
    const data = this.obj;
    const newData = JSON.stringify(data);
    localStorage.setItem(this.store, newData);
  }
  getAll(): IFilters {
    const data = localStorage.getItem(this.store);
    return data ? JSON.parse(data) : {};
  }

  dropAll(): void {
    localStorage.clear();
  }
}
export default Storage;
