// export default interface IFilters {
//   brand?: string[];
//   category?: string[];
//   price?: string[];
//   stock?: string[];
//   limit?: string[];
//   page?: string[];
//   cart?: string[];
//   search?: string[];
//   view?: string[];
//   sort?: string[];
// }

import { IProduct } from '../interfaces/data';

export default interface IFilters {
  [key: string]: string[] | IProduct[];
}
