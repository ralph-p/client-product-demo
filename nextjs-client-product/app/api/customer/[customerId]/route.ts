
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

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string } }
) {
  const { customerId } = params
  try {
    const body = await req.json()
    const { name, description } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!customerId) {
      return new NextResponse("Customer ID is required", { status: 400 });
    }
    let customer = customerList.find((customer) => customer.id === customerId)
    if (!customer) {
      return new NextResponse("Customer Not Found", { status: 404 })
    }

    customer = { ...customer, name, description }

    return NextResponse.json(customer);
  } catch (error) {
    console.log('[CUSTOMER_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}