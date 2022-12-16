export default class ProductsData {
    static async getData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
}