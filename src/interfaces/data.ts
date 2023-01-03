export default interface IData {
  products: IProduct[];
  find(cb: Function): IProduct;
}

export interface IProduct {
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
