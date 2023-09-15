"use client"

import Link from "next/link"
import { CustomerSelect } from "./customer-select"
import { useParams, useRouter } from "next/navigation";
import useSWR from 'swr'
import { customerListFetcher } from "@/lib/fetcher/customer-fetcher";
export const Navbar = () => {
  const params = useParams()
  const router = useRouter();
  const { data: customerList, error, isLoading } = useSWR('/api/customer', customerListFetcher)
  if (isLoading) return <div>Loading</div>
  if (error) return <div>Error fetching customers</div>
  const selectedCustomer = customerList?.find((customer) => customer.id === params.customerId)
  return (
    <aside className="z-30 -ml-2 h-full w-full shrink-0 sticky block bg-white">
      <div className="flex flex-col p-5 space-y-2">
        <CustomerSelect
          customerList={customerList}
          selectedCustomer={selectedCustomer}
          onCustomerSelect={(id: string) => router.push(`/${id}`)}
        />
        <Link href={`/${selectedCustomer?.id}`}>Customer Info</Link>
        <Link href={`/${selectedCustomer?.id}/products`}>Product Details</Link>
      </div>
    </aside>
  )
}