"use client"
import { Heading } from '@/components/ui/heading'
import { useParams } from 'next/navigation'
import React from 'react'
import { customerDetailsFetcher } from "@/lib/fetcher/customer-fetcher";
import useSWR from 'swr'
import { CustomerForm } from '@/components/customer-form';
import { Loading } from '@/components/loading';


const CustomerPage = () => {
  const params = useParams()
  const { data: customer, error, isLoading } = useSWR(`/api/customer/${params.customerId}`, customerDetailsFetcher)
  if (isLoading) return <Loading />
  if (!customer || error) return <div>Could not find customer</div>
  return (
    <div className='flex flex-col p-10'>
      <Heading title={`Customer: ${customer.name}`} />
      <CustomerForm customer={customer} />
    </div>
  )
}

export default CustomerPage