import { IProduct } from './data';

export default interface IFilters {
  [key: string]: string[] | IProduct[];
}
