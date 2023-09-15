import { productList } from "@/lib/constants/products";
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { customerId: string, productId: string } }
) {
  try {
    const { customerId, productId } = params

    const body = await req.json()
    const { name, price } = body;

    if (!customerId) {
      return new NextResponse("Customer ID is required", { status: 400 });
    }
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    let product = productList.find((product) => product.id === productId)

    if (product?.customerID !== customerId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    product = { ...product, name, price }
    return NextResponse.json(product);
  } catch (error) {
    console.log('[CLIENT_PLAN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { customerId: string, productId: string } }
) {
  try {
    const { customerId, productId } = params


    if (!customerId) {
      return new NextResponse("Customer ID is required", { status: 400 });
    }
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    let product = productList.find((product) => product.id === productId)

    if (product?.customerID !== customerId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    productList.filter((product) => product.id !== productId)
    return NextResponse.json(productList);
  } catch (error) {
    console.log('[CLIENT_PLAN_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}