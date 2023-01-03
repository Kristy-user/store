import IData from '../interfaces/data';

export default class ProductsData {
  static async getData(url: string): Promise<IData> {
    const response: Response = await fetch(url);
    const data: IData = await response.json();
    console.log(data);
    return data;
  }
}
