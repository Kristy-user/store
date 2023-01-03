export default interface IData {
  products: IProduct[];
  find(cb: Function): IProduct;
}
interface IObjectKeys {
  [key: string]: string | number | string[] | undefined;
}

export interface IProduct extends IObjectKeys {
  brand: string;
  category: string;
  description: string;
  id: number;
  thumbnail: string;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  title: string;
  count?: number;
}
