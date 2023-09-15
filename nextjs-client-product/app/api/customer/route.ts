

import { NextResponse } from "next/server"
import { supabase } from "@/lib/utils";


export async function GET(req: Request) {
  try {
    const { data } = await supabase.from("customers").select()
    return NextResponse.json(data)
  } catch (error) {
    console.log('[CUSTOMER_LIST_GET]', error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}