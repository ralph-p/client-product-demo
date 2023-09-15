import { productList } from "@/lib/constants/products"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { customerId: string } }) {
    try {
        const { customerId } = params
        const products = productList.filter((product) => product.customerID === customerId) || []
        if (products) return NextResponse.json(products)
        else return new NextResponse("Products Not Found", { status: 404 })
    } catch (error) {
        console.log('[PRODUCTS_BY_CUSTOMER_ID_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}