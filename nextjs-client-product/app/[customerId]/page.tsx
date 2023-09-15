"use client"
import { Heading } from '@/components/ui/heading'
import { useParams } from 'next/navigation'
import React from 'react'
import { customerDetailsFetcher } from "@/lib/fetcher/customer-fetcher";
import useSWR from 'swr'

type Props = {}

const CustomerPage = (props: Props) => {
  const params = useParams()
  const { data: customer, error, isLoading } = useSWR(`/api/customer/${params.customerId}`, customerDetailsFetcher)
  if (isLoading) return <div>Loading</div>
  if (!customer || error) return <div>Could not find customer</div>
  return (
    <div className='flex p-10'>
      <Heading title={`Customer: ${customer.name}`} />
    </div>
  )
}

export default CustomerPage