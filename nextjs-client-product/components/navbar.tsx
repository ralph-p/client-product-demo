"use client"

import Link from "next/link"
import { CustomerSelect } from "./customer-select"

export const Navbar = () => {
  return (
    <aside className="z-30 -ml-2 h-full w-full shrink-0 sticky block bg-white">
      <div className="flex flex-col p-5 space-y-2">
        <CustomerSelect customerName="Bob" />
        <Link href={'/customer'}>Customer Info</Link>
        <Link href={'/customer/products'}>Product Details</Link>
      </div>
    </aside>
  )
}