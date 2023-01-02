export default interface IData {
    products: IProduct,
}

interface IProduct {
    brand: string,
    category: string,
    description: string,
    id: number,
    images: string[],
    price: number,
    rating: number,
    stock: number,
    title: string,
}
