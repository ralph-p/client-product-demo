
import { customerList } from "@/lib/constants/customers"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { customerId: string } }) {
    try {
        const { customerId } = params
        const customer = customerList.find((customer) => customer.id === customerId)
        if (customer) return NextResponse.json(customer)
        else return new NextResponse("Customer Not Found", { status: 404 })
    } catch (error) {
        console.log('[CUSTOMER_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}