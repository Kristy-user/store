import IData from './data';

export default interface ICart {
  inCart?: IData['products'];
  page?: string[];
  limit?: string[];
}
