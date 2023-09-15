import { supabase } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { customerId: string } }) {
    try {
        const { customerId } = params
        const { data: products } = await supabase.from("products").select("*").eq("customerId", customerId)
        if (products) return NextResponse.json(products)
        else return new NextResponse("Products Not Found", { status: 404 })
    } catch (error) {
        console.log('[PRODUCTS_BY_CUSTOMER_ID_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}
export async function POST(req: Request, { params }: { params: { customerId: string } }) {
    try {
        const { customerId } = params

        const body = await req.json()
        const { name, price } = body

        if (!name) {
            return new NextResponse("Product name is required", { status: 400 })
        }
        const product = await supabase.from("products").insert({ name, price, customerId })
        return NextResponse.json(product)
    } catch (error) {
        console.log('[PRODUCT_POST]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}