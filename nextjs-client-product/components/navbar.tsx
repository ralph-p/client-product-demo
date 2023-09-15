"use client"

import Link from "next/link"
import { CustomerSelect } from "./customer-select"
import { useParams, useRouter, usePathname } from "next/navigation";
import useSWR from 'swr'
import { customerListFetcher } from "@/lib/fetcher/customer-fetcher";
import { cn } from "@/lib/utils"
import { Loading } from "./loading";

export const Navbar = () => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data: customerList, error, isLoading } = useSWR('/api/customer', customerListFetcher)

  if (isLoading) return <Loading />
  if (error) return <div>Error fetching customers</div>
  // have to check with `==` to loosely equal the customer id and the params 
  const selectedCustomer = customerList?.find((customer) => customer.id == params.customerId)
  const routes = [
    {
      href: `/${selectedCustomer?.id}`,
      label: "Customer Info",
      active: pathname === `/${selectedCustomer?.id}`,
    },
    {
      href: `/${selectedCustomer?.id}/products`,
      label: "Product Details",
      active: pathname === `/${selectedCustomer?.id}/products`,
    },
  ];
  return (
    <aside className="z-30 ml-2 h-full w-full shrink-0 sticky block bg-white">
      <div className="flex flex-col p-5 space-y-2">
        <CustomerSelect
          customerList={customerList}
          selectedCustomer={selectedCustomer}
          onCustomerSelect={(id: string) => router.push(`/${id}`)}
        />
        <div className="flex flex-col py-5">
          {
            routes.map((route) => (
              <Link
                key={route.href}
                className={cn("text-slate-700 p-4 rounded font-semibold hover:bg-blue-200 hover:text-blue-600", route.active && "bg-blue-200 text-blue-600")}
                href={route.href}
              >
                {route.label}
              </Link>
            ))
          }
        </div>
      </div>
    </aside>
  )
}