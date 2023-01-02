import IData from "../interfaces/data";

export default class ProductsData {
    static async getData(url: string): Promise<IData> {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
}
