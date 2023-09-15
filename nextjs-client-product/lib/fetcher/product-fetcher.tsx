import { ProductDTO } from "../DTO/product";

export const productListFetcher = (args: string) => fetch(args).then(res => res.json() as unknown as ProductDTO[])
