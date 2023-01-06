import IData from '../interfaces/data';

export default class Sort {
  static directSort(
    data: IData['products'],
    field: 'price' | 'rating'
  ): IData['products'] {
    return data.sort((a, b) => Number(a[field]) - Number(b[field]));
  }
  static reverseSort(
    data: IData['products'],
    field: 'price' | 'rating'
  ): IData['products'] {
    return data.sort((a, b) => Number(b[field]) - Number(a[field]));
  }
}
