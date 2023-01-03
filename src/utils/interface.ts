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

export default interface IFilters {
  [key: string]: string[];
}
