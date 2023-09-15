
import { CustomerDTO } from "@/lib/DTO/customer";
import { customerList } from "@/lib/constants/customers";
import { NextResponse } from "next/server"



export async function GET(req: Request) {
    try {

        return NextResponse.json(customerList)
    } catch (error) {
        console.log('[CUSTOMER_LIST_GET]', error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}